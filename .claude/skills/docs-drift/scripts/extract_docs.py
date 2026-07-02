#!/usr/bin/env python3
"""
extract_docs.py — Stage 1 (docs-extract) of the docs-drift skill.

Builds (or reads) a Snooty AST bundle for a docs property and emits a
structured "documented surface" JSON: the names, types, defaults, enumerated
values, and symbol mentions the docs actually assert — with includes RESOLVED
and per-file provenance, so content defined in an include is never reported as
missing (the #9 regression guard).

This script is deterministic. Semantic comparison happens later, in the
agent-driven diff stage; this stage only faithfully extracts what the rendered
docs say.

Must run under the Snooty venv python (needs the `bson` module):
  ~/.cache/docs-mongodb-internal/local-build-check/.venv/bin/python

Usage:
  extract_docs.py --bundle <dir|zip>            # parse an existing snooty bundle
  extract_docs.py --docs-path <snooty_root>     # build with snooty, then parse
  extract_docs.py ... [--out FILE] [--snooty PATH]

Output JSON shape:
  {
    "property_path": "...",
    "built_from": "...",
    "pages": [
      {
        "page_id": "...",
        "filename": "...",
        "items": [ {name, provenance, line, fields:{Type,Default,...},
                    values:[...], hedged:bool, text} ],
        "symbols": [ {text, provenance, line} ],   # monospace mentions
        "labels":  [ {name, provenance, line} ]    # defined ref targets
      }
    ]
  }
"""
import argparse
import fnmatch
import json
import os
import re
import subprocess
import sys
import tempfile
import zipfile

try:
    import bson
except ImportError:
    sys.exit("error: run with the Snooty venv python (bson module required)")

# Field-list labels these docs use in option/config includes.
FIELD_LABELS = {"type", "default", "minimum", "maximum", "value", "values",
                "example", "optional", "required"}

# Non-exhaustive / illustrative phrasings: a values list under one of these is
# correct-by-design, so a "missing values" finding must be suppressed.
# (Default guard for findings #3 and #10; manifests may extend.)
HEDGE_PHRASES = ["include", "includes", "including", "for example", "such as",
                 "e.g.", "for instance", "among others", "like"]


def text_of(node):
    """Concatenate all descendant text values of a node."""
    out = []

    def rec(n):
        if isinstance(n, dict):
            if n.get("type") == "text":
                out.append(n.get("value", ""))
            for c in n.get("children", []) or []:
                rec(c)
        elif isinstance(n, list):
            for c in n:
                rec(c)

    rec(node)
    return "".join(out)


def line_of(node):
    pos = node.get("position") or {}
    return (pos.get("start") or {}).get("line")


def is_field_paragraph(node):
    """Detect `*Label*: value` paragraphs. Returns (label, value) or None."""
    if not (isinstance(node, dict) and node.get("type") == "paragraph"):
        return None
    kids = node.get("children", []) or []
    if not kids or kids[0].get("type") != "emphasis":
        return None
    label = text_of(kids[0]).strip().lower()
    if label not in FIELD_LABELS:
        return None
    rest = text_of({"children": kids[1:]}).lstrip()
    if not rest.startswith(":"):
        return None
    return label, rest[1:].strip()


def walk(node, provenance):
    """
    Yield (node, provenance) for every node. `provenance` is the fileid of the
    nearest enclosing `root` — i.e. the actual source file (page or include)
    the node came from. Lines on each node are relative to that file.
    """
    if isinstance(node, dict):
        if node.get("type") == "root" and node.get("fileid"):
            provenance = node["fileid"]
        yield node, provenance
        for c in node.get("children", []) or []:
            yield from walk(c, provenance)
    elif isinstance(node, list):
        for c in node:
            yield from walk(c, provenance)


def nearest_include_name(node):
    """If a node's provenance is a resolved INCLUDE, return the include
    basename. Returns None for page-level provenance (a .txt page is not an
    option), so page filenames are never mistaken for documented options."""
    fid = node
    if isinstance(fid, str) and "includes/" in fid:
        base = os.path.basename(fid)
        return re.sub(r"\.(rst|txt)$", "", base)
    return None


def extract_page(doc, option_tables=False):
    ast = doc.get("ast", doc)
    page_id = doc.get("page_id", "")
    filename = doc.get("filename", "")

    items, symbols, labels = [], [], []

    # Pass 1: flat indexes — monospace mentions and defined labels.
    for node, prov in walk(ast, filename):
        t = node.get("type")
        if t == "literal":
            txt = text_of(node).strip()
            if txt:
                symbols.append({"text": txt, "provenance": prov,
                                "line": line_of(node)})
        elif t == "target_identifier":
            ids = node.get("ids") or []
            for i in ids:
                labels.append({"name": i, "provenance": prov,
                               "line": line_of(node)})

    # Pass 2: field blocks + enumerated values, attributed to the enclosing
    # include name (option/config docs) or the nearest preceding heading.
    current_heading = None
    for node, prov in walk(ast, filename):
        t = node.get("type")
        if t == "heading":
            current_heading = text_of(node).strip()
            continue
        fv = is_field_paragraph(node)
        if fv:
            label, value = fv
            name = nearest_include_name(prov) or current_heading or "(page)"
            # merge into the item sharing this name+provenance
            item = next((it for it in items
                         if it["name"] == name and it["provenance"] == prov), None)
            if item is None:
                item = {"name": name, "provenance": prov, "line": line_of(node),
                        "fields": {}, "values": [], "hedged": False, "text": ""}
                items.append(item)
            item["fields"][label] = value

    # Pass 3: enumerated value lists. Each genuine bullet/ordered list becomes
    # its own item (we do NOT merge distinct lists). We skip lists that are the
    # row/cell scaffolding of a `list-table` — those aren't enums. We capture
    # the nearest preceding text as `context` and a `hedged` HINT, and let the
    # agent-driven diff stage make the final hedge call.
    seen = set()
    for node, prov, scaffolding in _walk_lists(ast, filename):
        if scaffolding:
            continue  # table row/cell scaffolding, not an enumerated value set
        vals = [text_of(li).strip() for li in node.get("children", []) or []]
        vals = [v for v in vals if v]
        if not vals:
            continue
        ln = line_of(node)
        key = (prov, ln, tuple(vals))
        if key in seen:
            continue
        seen.add(key)
        context = _preceding_text(ast, prov, ln)
        hedged = any(p in context.lower() for p in HEDGE_PHRASES)
        items.append({
            "name": nearest_include_name(prov) or current_heading or "(list)",
            "provenance": prov, "line": ln, "fields": {}, "values": vals,
            "hedged": hedged, "context": context, "text": "",
        })

    # Pass 5 (opt-in: --option-tables). Some properties document their option
    # reference as a `list-table` whose first column is the option name (a bold
    # cell) rather than as field-list includes. Pass 3 skips those names as
    # table scaffolding, so without this pass they read as undocumented. Enabled
    # per-property via manifest `docs.option_tables: true`; OFF by default so
    # field-list properties (e.g. mongosync) are byte-for-byte unaffected.
    if option_tables:
        opt_name = re.compile(r"^[A-Za-z][A-Za-z0-9._-]*$")
        for ri, cells, ln, prov in _table_rows(ast, filename):
            if ri == 0:
                continue  # header row
            name = text_of(cells[0]).strip().strip("`* ")
            if not opt_name.match(name):
                continue  # prose header/description cell, not an option name
            if any(it["name"] == name and it["provenance"] == prov
                   for it in items):
                continue
            rowtext = " ".join(text_of(c).strip() for c in cells[1:])
            items.append({
                "name": name, "provenance": prov, "line": ln, "fields": {},
                "values": [], "hedged": False, "context": "",
                "text": rowtext[:1000],
            })

    # Pass 4: attach rendered description prose per provenance. Behavioral
    # constraints ("only valid on restart") and default context ("default
    # changes to N when ...") live in prose, not in the field list — the diff
    # stage needs them to detect constraint/conditional-default drift.
    descriptions = _collect_descriptions(ast)
    for it in items:
        if not it.get("text"):
            it["text"] = descriptions.get(it["provenance"], "")[:1000]

    # Prose-only includes (e.g. an option documented purely with a description
    # and no field list or value enum) produce no structured item above. Emit a
    # prose item for each such INCLUDE so its behavioral text is available to
    # the diff. Bounded to includes — never the page root — to avoid flooding.
    represented = {it["provenance"] for it in items}
    for prov, text in descriptions.items():
        if prov in represented or "includes/" not in (prov or ""):
            continue
        items.append({
            "name": nearest_include_name(prov) or "(include)",
            "provenance": prov, "line": None, "fields": {}, "values": [],
            "hedged": False, "context": "", "text": text[:1000],
        })

    return {"page_id": page_id, "filename": filename, "items": items,
            "symbols": symbols, "labels": labels}


def _collect_descriptions(ast):
    """Map provenance file -> its rendered paragraph prose (excluding the
    `*Label*: value` field paragraphs, which are captured structurally)."""
    out = {}
    for node, prov in walk(ast, ast.get("fileid", "") or ""):
        if node.get("type") != "paragraph" or is_field_paragraph(node):
            continue
        txt = text_of(node).strip()
        if txt:
            out.setdefault(prov, [])
            if sum(len(s) for s in out[prov]) < 1200:
                out[prov].append(txt)
    return {k: " ".join(v) for k, v in out.items()}


def _walk_lists(node, provenance, table_list_depth=None):
    """Yield (list_node, provenance, is_scaffolding) for every `list` node.

    `table_list_depth` counts list-nesting levels since entering a
    `list-table`/`table` directive (None when not under one). A list-table
    nests as rows (depth 0) -> cells (depth 1) -> cell content (depth >=2).
    Depths 0 and 1 are scaffolding; deeper lists are genuine content enums
    (e.g. a bullet list of possible values inside a cell)."""
    if isinstance(node, dict):
        if node.get("type") == "root" and node.get("fileid"):
            provenance = node["fileid"]
        next_depth = table_list_depth
        if node.get("type") == "directive" and node.get("name") in (
                "list-table", "table"):
            next_depth = 0  # entering a table; its first list is the rows
        if node.get("type") == "list":
            is_scaffolding = table_list_depth in (0, 1)
            yield node, provenance, is_scaffolding
            next_depth = (table_list_depth + 1) if table_list_depth is not None else None
        for c in node.get("children", []) or []:
            yield from _walk_lists(c, provenance, next_depth)
    elif isinstance(node, list):
        for c in node:
            yield from _walk_lists(c, provenance, table_list_depth)


def _first_list(node):
    """First descendant `list` node (DFS over children), or None."""
    for c in node.get("children", []) or []:
        if not isinstance(c, dict):
            continue
        if c.get("type") == "list":
            return c
        found = _first_list(c)
        if found is not None:
            return found
    return None


def _table_rows(ast, provenance):
    """Yield (row_index, cells, line, provenance) for each row of every
    `list-table`/`table` directive. A list-table nests as a rows `list` whose
    items each contain a cells `list`. `cells` is the list of cell nodes."""
    for node, prov in walk(ast, provenance):
        if node.get("type") != "directive" or node.get("name") not in (
                "list-table", "table"):
            continue
        rows = _first_list(node)
        if rows is None:
            continue
        for ri, row in enumerate(rows.get("children", []) or []):
            cells_list = _first_list(row)
            if cells_list is None:
                continue
            cells = cells_list.get("children", []) or []
            if cells:
                yield ri, cells, line_of(row), prov


def _preceding_text(ast, provenance, list_line):
    """Concatenate paragraph text in the same provenance file appearing
    shortly before list_line — the context a reader sees introducing the list
    (e.g. 'Possible values include:'). Used as a hedge hint for the diff stage.
    """
    if list_line is None:
        return ""
    best = []
    for node, prov in walk(ast, ast.get("fileid", "") or ""):
        if prov != provenance or node.get("type") != "paragraph":
            continue
        ln = line_of(node)
        if ln is None or ln >= list_line or ln < list_line - 12:
            continue
        best.append((ln, text_of(node).strip()))
    best.sort()
    return " ".join(t for _, t in best)[-400:]


def load_bundle(path):
    """Yield decoded documents from a bundle dir or zip."""
    if zipfile.is_zipfile(path):
        with zipfile.ZipFile(path) as z:
            for name in z.namelist():
                if name.startswith("documents/") and name.endswith(".bson"):
                    yield bson.decode(z.read(name))
    elif os.path.isdir(path):
        docdir = os.path.join(path, "documents")
        base = docdir if os.path.isdir(docdir) else path
        for root, _, files in os.walk(base):
            for f in files:
                if f.endswith(".bson"):
                    with open(os.path.join(root, f), "rb") as fh:
                        yield bson.decode(fh.read())
    else:
        sys.exit(f"error: not a bundle dir or zip: {path}")


def build_bundle(docs_path, snooty):
    out = tempfile.mktemp(prefix="docs-drift-ast-")
    env = dict(os.environ, DIAGNOSTICS_FORMAT="JSON")
    r = subprocess.run([snooty, "build", docs_path, f"--output={out}"],
                       env=env, capture_output=True, text=True)
    if r.returncode != 0 and not os.path.exists(out):
        sys.exit(f"error: snooty build failed:\n{r.stderr[-2000:]}")
    return out


def main():
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--bundle", help="existing snooty bundle dir or zip")
    g.add_argument("--docs-path", help="snooty source root to build")
    default_snooty = os.path.expanduser(
        "~/.cache/docs-mongodb-internal/local-build-check/.venv/bin/snooty")
    ap.add_argument("--snooty", default=default_snooty)
    ap.add_argument("--option-tables", action="store_true",
                    help="capture option names from list-table first columns "
                         "(set when the manifest has docs.option_tables: true)")
    ap.add_argument("--pages", nargs="+", metavar="GLOB",
                    help="restrict extraction to pages whose filename matches "
                         "any of these globs (set from manifest docs.surface_pages)")
    ap.add_argument("--out")
    args = ap.parse_args()

    bundle = args.bundle or build_bundle(args.docs_path, args.snooty)
    pages = [extract_page(d, args.option_tables) for d in load_bundle(bundle)]
    pages.sort(key=lambda p: p["filename"])

    if args.pages:
        pages = [p for p in pages
                 if any(fnmatch.fnmatch(p["filename"], g) for g in args.pages)]

    result = {
        "property_path": args.docs_path or args.bundle,
        "built_from": bundle,
        "pages": pages,
    }
    text = json.dumps(result, indent=2, default=str)
    if args.out:
        with open(args.out, "w") as f:
            f.write(text)
        scope = f" (filtered to {len(args.pages)} glob(s))" if args.pages else ""
        print(f"wrote {args.out}: {len(pages)} pages{scope}", file=sys.stderr)
    else:
        print(text)


if __name__ == "__main__":
    main()
