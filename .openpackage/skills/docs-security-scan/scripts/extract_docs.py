#!/usr/bin/env python3
"""
extract_docs.py — Stage 1 (extract) of the docs-security-scan skill.

Builds (or reads) a Snooty AST bundle for a docset and emits the three content
classes a security scan judges, each with per-file provenance and line numbers:

  - code_blocks : every code-block / literalinclude, with language, content,
                  nearest preceding heading, and the callout (if any) it sits in.
  - advisory    : paragraphs most likely to give or omit security advice — all
                  paragraphs inside warning/important/note/tip callouts, plus
                  paragraphs outside callouts that contain advisory markers
                  (must, should, avoid, do not, never, enable, disable, ...).
  - topics      : per-page metadata (page_id, filename, headings, callout
                  inventory) to support category #3 (absence) checks per topic.

Includes are RESOLVED (rendered AST), so a code example defined in a shared
include is extracted once with its true provenance and never double-counted.

This script is deterministic. Security judgment happens later, in the
agent-driven scan stage; this stage only faithfully extracts what the rendered
docs contain.

Must run under the Snooty venv python (needs the `bson` module):
  ~/.cache/docs-mongodb-internal/local-build-check/.venv/bin/python

Usage:
  extract_docs.py --bundle <dir|zip>            # parse an existing snooty bundle
  extract_docs.py --docs-path <snooty_root>     # build with snooty, then parse
  extract_docs.py ... [--out FILE] [--snooty PATH] [--pages GLOB ...]

Output JSON shape:
  {
    "docset_path": "...",
    "built_from": "...",
    "pages": [
      {
        "page_id": "...", "filename": "...",
        "headings": [ {text, provenance, line} ],
        "callouts": [ {directive, heading, provenance, line} ],
        "code_blocks": [ {language, content, heading, inside_callout,
                          provenance, line} ],
        "advisory": [ {text, heading, callout, provenance, line} ]
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

# Directives treated as security-relevant callouts. (admonition/caution/danger/
# example/see/seealso/topic are deprecated per the RST conventions guide and are
# not scanned as callouts; if present, their paragraphs still surface via the
# advisory-marker pass.)
CALLOUT_DIRECTIVES = {"warning", "important", "note", "tip"}

CODE_DIRECTIVES = {"code-block", "literalinclude"}

# Paragraphs outside callouts are captured as advisory when they contain one of
# these markers (word-ish, case-insensitive). Paragraphs inside callouts are
# always captured.
ADVISORY_MARKERS = [
    "must", "should", "recommend", "recommends", "recommended",
    "avoid", "do not", "don't", "never", "always",
    "use ", "enable", "disable", "ensure", "make sure",
    "consider", "required", "necessary", "insecure", "secure",
    "encrypt", "tls", "ssl", "authenticat", "credential", "password",
    "untrusted", "untrusted input", "validate",
]

# Bounds to keep agent-input size manageable.
MAX_CODE_CHARS = 2500
MAX_ADVISORY_CHARS = 1500

# Infer a code-block language from a literalinclude file path's extension when
# the directive has no explicit :language: option.
EXT_LANG = {
    ".py": "python", ".js": "javascript", ".ts": "typescript", ".jsx": "jsx",
    ".tsx": "tsx", ".go": "go", ".java": "java", ".kt": "kotlin",
    ".scala": "scala", ".cs": "csharp", ".rs": "rust", ".c": "c", ".cpp": "cpp",
    ".h": "cpp", ".rb": "ruby", ".php": "php", ".swift": "swift",
    ".sh": "bash", ".bash": "bash", ".zsh": "bash", ".ps1": "powershell",
    ".json": "json", ".yaml": "yaml", ".yml": "yaml", ".xml": "xml",
    ".html": "html", ".css": "css", ".sql": "sql", ".rst": "rst",
    ".md": "markdown", ".txt": "text", ".toml": "toml", ".ini": "ini",
    ".cfg": "ini", ".conf": "ini",
}


def infer_language(path):
    if not path:
        return ""
    _, ext = os.path.splitext(path)
    return EXT_LANG.get(ext.lower(), "")


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


def walk_ctx(node, provenance, dir_stack, heading):
    """Yield (node, provenance, dir_stack, heading).

    `dir_stack` is the list of enclosing directive names (outermost first) at
    this node. `heading` is the nearest preceding heading text. `provenance`
    is the fileid of the nearest enclosing `root` (the actual source file).
    """
    if isinstance(node, dict):
        if node.get("type") == "root" and node.get("fileid"):
            provenance = node["fileid"]
        t = node.get("type")
        new_stack = dir_stack
        new_heading = heading
        if t == "heading":
            new_heading = text_of(node).strip()
        elif t == "directive" and node.get("name"):
            new_stack = dir_stack + [node["name"]]
        yield node, provenance, new_stack, new_heading
        for c in node.get("children", []) or []:
            yield from walk_ctx(c, provenance, new_stack, new_heading)
    elif isinstance(node, list):
        for c in node:
            yield from walk_ctx(c, provenance, dir_stack, heading)


def enclosing_callout(dir_stack):
    """Return the nearest enclosing callout directive name, or None."""
    for d in reversed(dir_stack):
        if d in CALLOUT_DIRECTIVES:
            return d
    return None


def as_text(value):
    """Coerce a Snooty directive argument/option value to a trimmed string.

    Snooty represents these as plain strings, lists of values, or single
    {'type': 'text', 'value': '...'} nodes. Handle all three."""
    if value is None:
        return ""
    if isinstance(value, dict):
        return str(value.get("value", "")).strip()
    if isinstance(value, list):
        return " ".join(as_text(v) for v in value).strip()
    return str(value).strip()


def is_field_paragraph(node):
    """Skip `*Label*: value` field-list paragraphs (option/config scaffolding);
    they are not advisory prose."""
    if not (isinstance(node, dict) and node.get("type") == "paragraph"):
        return False
    kids = node.get("children", []) or []
    if not kids or kids[0].get("type") != "emphasis":
        return False
    return True


def advisory_match(text):
    low = text.lower()
    return any(m in low for m in ADVISORY_MARKERS)


def resolve_include_path(source_root, arg_path):
    """Resolve a literalinclude argument path against the snooty source root.

    Snooty treats a leading '/' as the source root, so '/includes/foo.py' maps
    to '<source_root>/includes/foo.py'. Returns the resolved path or None."""
    if not arg_path:
        return None
    path = source_root
    parts = arg_path.lstrip("/").split("/")
    for i, part in enumerate(parts):
        path = os.path.join(path, part)
        # With core.symlinks=false, git checks a symlink out as a plain file
        # whose content is the link target. Follow it when more path remains.
        if i < len(parts) - 1 and os.path.isfile(path):
            with open(path, "r", errors="replace") as fh:
                target = fh.read().strip()
            path = os.path.normpath(os.path.join(os.path.dirname(path), target))
    return path if os.path.isfile(path) else None


def extract_page(doc, source_root=""):
    ast = doc.get("ast", doc)
    filename = doc.get("filename", "")
    # Snooty's page_id is <project>/<user>/<branch>/<slug>, which varies by git
    # branch. Derive a branch-independent id from the source filename so runs
    # on different branches produce comparable finding sets.
    page_id = os.path.splitext(filename)[0] if filename else doc.get("page_id", "")

    headings, callouts, code_blocks, advisory = [], [], [], []

    for node, prov, dstack, heading in walk_ctx(ast, filename, [], ""):
        t = node.get("type")

        if t == "heading":
            headings.append({"text": heading, "provenance": prov,
                             "line": line_of(node)})
            continue

        # Snooty renders every `.. code-block::` as a `code` node (type "code")
        # with `lang` and `value` fields — NOT as a directive named "code-block".
        # This includes all tabbed examples (`.. tabs::` / `.. tab::` whose
        # children are `code` nodes). Capture them here; literalinclude stays a
        # directive and is handled below.
        if t == "code":
            # A literalinclude's rendered content is a child `code` node; the
            # directive branch below already records it.
            if dstack and dstack[-1] == "literalinclude":
                continue
            code_blocks.append({
                "language": node.get("lang", "") or "",
                "content": (node.get("value", "") or "")[:MAX_CODE_CHARS],
                "heading": heading,
                "inside_callout": enclosing_callout(dstack),
                "include_path": None,
                "provenance": prov,
                "line": line_of(node),
            })
            continue

        if t == "directive" and node.get("name") in CODE_DIRECTIVES:
            name = node.get("name")
            argument = as_text(node.get("argument"))
            options = node.get("options", {}) or {}
            if name == "code-block":
                language = argument
            else:  # literalinclude
                language = as_text(options.get("language")) or infer_language(argument)
            children = node.get("children", []) or []
            content = next((c.get("value", "") for c in children
                            if isinstance(c, dict) and c.get("type") == "code"), "")
            content = content or text_of({"children": children})
            include_path = None
            if name == "literalinclude" and source_root:
                include_path = resolve_include_path(source_root, argument)
            if not content and include_path:
                # Snooty did not render the include (e.g. the target is missing
                # from its view of the tree). Read it from disk instead.
                try:
                    with open(include_path, "r", errors="replace") as fh:
                        content = fh.read()
                except OSError:
                    content = ""
            if not content:
                # Could not resolve or read; record what we know so the agent
                # is aware an included example exists at this site.
                content = f"[literalinclude: {argument}]" if argument else "[literalinclude]"
            code_blocks.append({
                "language": language,
                "content": content[:MAX_CODE_CHARS],
                "heading": heading,
                "inside_callout": enclosing_callout(dstack),
                "include_path": include_path,
                "provenance": prov,
                "line": line_of(node),
            })
            continue

        if t == "directive" and node.get("name") in CALLOUT_DIRECTIVES:
            callouts.append({
                "directive": node.get("name"),
                "heading": heading,
                "provenance": prov,
                "line": line_of(node),
            })
            # Fall through: paragraphs inside the callout are captured below.

        if t == "paragraph" and not is_field_paragraph(node):
            txt = text_of(node).strip()
            if not txt:
                continue
            callout = enclosing_callout(dstack)
            if callout is not None or advisory_match(txt):
                advisory.append({
                    "text": txt[:MAX_ADVISORY_CHARS],
                    "heading": heading,
                    "callout": callout,
                    "provenance": prov,
                    "line": line_of(node),
                })

    return {
        "page_id": page_id,
        "filename": filename,
        "headings": headings,
        "callouts": callouts,
        "code_blocks": code_blocks,
        "advisory": advisory,
    }


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
    out = tempfile.mktemp(prefix="docs-security-ast-")
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
    ap.add_argument("--pages", nargs="+", metavar="GLOB",
                    help="restrict extraction to pages whose filename matches "
                         "any of these globs (set from manifest docs.surface_pages)")
    ap.add_argument("--out")
    args = ap.parse_args()

    bundle = args.bundle or build_bundle(args.docs_path, args.snooty)
    source_root = os.path.join(args.docs_path, "source") if args.docs_path else ""
    pages = [extract_page(d, source_root) for d in load_bundle(bundle)]
    pages.sort(key=lambda p: p["filename"])

    if args.pages:
        pages = [p for p in pages
                 if any(fnmatch.fnmatch(p["filename"], g) for g in args.pages)]

    total_code = sum(len(p["code_blocks"]) for p in pages)
    total_adv = sum(len(p["advisory"]) for p in pages)

    result = {
        "docset_path": args.docs_path or args.bundle,
        "built_from": bundle,
        "pages": pages,
    }
    text = json.dumps(result, indent=2, default=str)
    if args.out:
        with open(args.out, "w") as f:
            f.write(text)
        scope = f" (filtered to {len(args.pages)} glob(s))" if args.pages else ""
        print(f"wrote {args.out}: {len(pages)} pages, "
              f"{total_code} code blocks, {total_adv} advisory paragraphs{scope}",
              file=sys.stderr)
    else:
        print(text)


if __name__ == "__main__":
    main()
