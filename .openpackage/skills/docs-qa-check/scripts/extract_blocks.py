#!/usr/bin/env python3
"""Extract citable blocks from a Snooty-built page AST (Step 2 of docs-qa-check).

Usage:
    extract_blocks.py <build.zip> <page-fileid> <out.json> [--diff-lines FILE]
    extract_blocks.py <build.zip> --scan --out scan.json

Emits one JSON entry per citable block: paragraph, list item, table row,
procedure step, admonition body, heading, or code block. With --scan, emits
every fileid each page in the zip renders content from instead. Requires the
venv cached by the local-build-check skill (for the `bson` dependency).

Two decomposition rules matter, and both exist because the naive
"flatten the whole node" approach produces unusable citations:

1.  A list-table row is emitted as ONE block with its cells joined by " | ".
    Flattening without a separator runs the cells together
    ("New deployment on MongoDB 9.0On"), which destroys the
    column-to-value mapping the row exists to convey.

2.  A list item that contains multiple block-level children (several
    paragraphs, or a nested list-table) is NOT flattened into one block.
    Each child paragraph and each nested table row becomes its own block,
    so a citation resolves to a sentence rather than to a whole subsection.
    Such blocks carry a `lead` field naming the bullet they came from, so a
    continuation paragraph is still attributable to its parent bullet.
"""
import argparse
import json
import os
import sys
import zipfile

import bson

CELL_SEP = " | "

# Directives that splice another file's code inline into the page AST.
# Snooty gives these NO nested root — the code lands in a <code> node under
# the directive, the page's own root stays the nearest enclosing root, and
# the source path survives only as the directive's argument (verified
# against the snooty-parser source, parser.py's literalinclude/input/output
# branch). Attribution to the snippet file must go through that argument.
SPLICED_DIRECTIVES = ("input", "output", "literalinclude")


def flatten(node, cell_sep=CELL_SEP):
    """Flatten a node to plain reader-facing text."""
    t = node.get("type")
    if t == "text":
        return node.get("value", "")
    if t == "literal":
        inner = "".join(flatten(c, cell_sep) for c in node.get("children", []))
        return f"``{inner}``"
    if t == "list":
        # A list reached during flattening is a table row's cell list (or a
        # nested table). Preserve the cell boundaries.
        parts = [flatten(c, cell_sep).strip() for c in node.get("children", [])]
        return cell_sep.join(p for p in parts if p)
    if t in ("paragraph", "line"):
        return "".join(flatten(c, cell_sep) for c in node.get("children", [])) + " "
    return "".join(flatten(c, cell_sep) for c in node.get("children", []))


def norm(text):
    return " ".join(text.split())


def fileid_keys(value):
    """Every spelling of a fileid a caller or the AST might use."""
    base = value.replace("\\", "/")
    stripped = base.lstrip("/")
    stem = base.rsplit("/", 1)[-1]
    out = {base, stripped, stem}
    for v in list(out):
        for ext in (".txt", ".rst"):
            if v.endswith(ext):
                out.add(v[: -len(ext)])
            else:
                out.add(v + ext)
    return out


def directive_path(node):
    """The file a spliced directive (input/output/literalinclude) names."""
    arg = node.get("argument")
    if isinstance(arg, str):
        return arg.strip() or None
    if isinstance(arg, list):
        path = norm(flatten({"type": "paragraph", "children": arg})).strip()
        return path or None
    return None


def is_list_table(node):
    return node.get("type") == "directive" and node.get("name") == "list-table"


def block_children(node):
    """Block-level children of a list item, ignoring inline content."""
    return [
        c
        for c in node.get("children", [])
        if c.get("type") in ("paragraph", "list", "code", "directive")
    ]


class Extractor:
    def __init__(self, diff_lines=None, complete=False):
        self.blocks = []
        self.n = 0
        self.diff_lines = diff_lines
        self.complete = complete
        self.unmatched = set()

    def line_of(self, node):
        pos = node.get("position") or {}
        line = (pos.get("start") or {}).get("line")
        return line + 1 if isinstance(line, int) else None

    def emit(self, node, fileid, headings, text=None, prefix="", lead=None):
        body = norm(text if text is not None else flatten(node))
        if not body:
            return
        self.n += 1
        line = self.line_of(node)
        entry = {
            "marker": f"P{self.n}",
            "text": prefix + body,
            "fileid": fileid,
            "line": line,
            "heading_path": " > ".join(headings),
        }
        if lead:
            entry["lead"] = lead
        self.blocks.append(entry)

    def finalize(self, eof_lines=None):
        """Assign each block a line extent, then a provenance status.

        Snooty's AST carries only `position.start.line` — there is no end
        line — so a block's extent is derived as [start, next_start - 1],
        where next_start is the next larger start line among blocks in the
        same file. Blocks that share a start line (a bullet list, or a
        list-table whose rows all report the directive's line) share an
        extent; that is the correct granularity, since the AST gives us no
        way to tell those rows apart by line.

        Status is then a RANGE INTERSECTION against the changed-line set,
        not a start-line membership test. Testing only the start line marks
        a reworded paragraph pre-existing whenever the edit landed on any
        line but its first — which silently strips attribution from exactly
        the new prose the run is meant to credit.
        """
        eof_lines = eof_lines or {}

        by_file = {}
        for b in self.blocks:
            by_file.setdefault(b["fileid"], []).append(b)

        for fileid, blocks in by_file.items():
            starts = sorted({b["line"] for b in blocks if b["line"] is not None})
            next_start = {}
            for i, ln in enumerate(starts):
                next_start[ln] = starts[i + 1] if i + 1 < len(starts) else None

            eof = None
            for key in fileid_keys(fileid):
                if key in eof_lines:
                    eof = eof_lines[key]
                    break

            for b in blocks:
                start = b["line"]
                if start is None:
                    b["line_end"] = None
                    continue
                nxt = next_start.get(start)
                if nxt is not None:
                    b["line_end"] = max(start, nxt - 1)
                elif eof is not None:
                    b["line_end"] = max(start, eof)
                else:
                    # Last block and no EOF known: stay conservative rather
                    # than claiming an extent we cannot substantiate.
                    b["line_end"] = start
                    b["extent_truncated"] = True

        for b in self.blocks:
            b["new_or_existing"] = self._status(b)

    def _status(self, b):
        if self.diff_lines is None:
            # No diff map supplied: caller asserted the whole page is new.
            return "new"
        fid = b.get("provenance_fileid") or b["fileid"]
        touched = None
        for key in fileid_keys(fid):
            if key in self.diff_lines:
                touched = self.diff_lines[key]
                break
        if touched is None:
            if self.complete:
                # The map enumerates every changed file, so absence means
                # this file was not touched at all.
                return "pre-existing"
            # No completeness guarantee: refuse to guess. Never fall back to
            # "new" — that would tag every block attributable and silently
            # defeat the provenance check Step 4 depends on.
            self.unmatched.add(fid)
            return "unknown"
        if b["line"] is None:
            return "unknown"
        if b.get("provenance_fileid"):
            # A spliced snippet is cited as a whole: the AST carries no
            # line positions inside the snippet file (the block's line is
            # the directive's line in the page), so any change to the
            # snippet file makes the rendered block new.
            return "new"
        lo, hi = b["line"], b.get("line_end") or b["line"]
        return "new" if any(lo <= t <= hi for t in touched) else "pre-existing"

    def walk(self, node, fileid, headings, in_list_table=False):
        t = node.get("type")

        if t == "root":
            fid = node.get("fileid", fileid)
            fileid = fid[0] if isinstance(fid, list) else fid

        if t == "section":
            stack = headings
            for c in node.get("children", []):
                if c.get("type") == "heading":
                    stack = headings + [norm(flatten(c))]
                    break
            for c in node.get("children", []):
                self.walk(c, fileid, stack, in_list_table)
            return

        if t == "heading":
            self.emit(node, fileid, headings, prefix="[heading] ")
            return

        if t == "code":
            self.emit(node, fileid, headings, text=node.get("value", ""),
                      prefix="[code] ")
            return

        if t == "directive" and node.get("name") in SPLICED_DIRECTIVES:
            # The code is spliced inline from another file, but its
            # positions belong to the page. Cite at the directive's page
            # line (that is where a reader and a writer find it) while
            # recording the snippet file as the provenance side for the
            # new/pre-existing status.
            src = directive_path(node)
            for c in node.get("children", []):
                if c.get("type") == "code":
                    self.emit(c, fileid, headings, text=c.get("value", ""),
                              prefix="[code] ")
                    if src:
                        self.blocks[-1]["provenance_fileid"] = src
                else:
                    self.walk(c, fileid, headings, in_list_table)
            return

        if is_list_table(node):
            for c in node.get("children", []):
                self.walk(c, fileid, headings, in_list_table=True)
            return

        if t == "listItem":
            # Rule 1: a list-table row stays one block, cells separated.
            if in_list_table:
                self.emit(node, fileid, headings)
                return
            # Rule 2: a multi-block list item decomposes.
            kids = block_children(node)
            if len(kids) > 1:
                lead = norm(flatten(kids[0]))[:60]
                for i, c in enumerate(kids):
                    if i == 0:
                        self.emit(c, fileid, headings)
                    else:
                        self.walk(c, fileid, headings, in_list_table=False)
                        if self.blocks:
                            self.blocks[-1].setdefault("lead", lead)
                return
            self.emit(node, fileid, headings)
            return

        if t == "step":
            self.emit(node, fileid, headings)
            return

        if t == "paragraph":
            self.emit(node, fileid, headings)
            return

        for c in node.get("children", []):
            self.walk(c, fileid, headings, in_list_table)


def collect_fileids(node, out):
    """Every file a page's AST renders content from: the page's own root,
    any nested include root, and any spliced directive's argument path."""
    if isinstance(node, dict):
        t = node.get("type")
        if t == "root":
            fid = node.get("fileid")
            if fid:
                out.add(fid[0] if isinstance(fid, list) else fid)
        elif t == "directive" and node.get("name") in SPLICED_DIRECTIVES:
            p = directive_path(node)
            if p:
                out.add(p)
        for c in node.get("children", []) or []:
            collect_fileids(c, out)
        for c in node.get("argument", []) or []:
            collect_fileids(c, out)
    elif isinstance(node, list):
        for x in node:
            collect_fileids(x, out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("zip")
    ap.add_argument("page", nargs="?", help="required for extraction; ignored with --scan")
    ap.add_argument("out")
    ap.add_argument("--diff-lines", help="JSON {fileid: [changed line numbers]}")
    ap.add_argument("--source-root", help="snooty source/ dir, for block end lines")
    ap.add_argument("--scan", action="store_true",
                    help="emit {page: [referenced fileids]} for every page in the zip and exit")
    args = ap.parse_args()

    diff_lines = None
    complete = False
    if args.diff_lines:
        raw = json.load(open(args.diff_lines))
        # Callers key this off git diff paths; the AST's fileid carries the
        # source extension and may be a full repo path. Index under every
        # form so a lookup can't miss on a cosmetic mismatch.
        complete = bool(raw.pop("__complete__", False))
        diff_lines = {}
        for k, v in raw.items():
            for key in fileid_keys(k):
                diff_lines[key] = set(v)

    z = zipfile.ZipFile(args.zip)

    if args.scan:
        pages = {}
        for name in z.namelist():
            if not name.startswith("documents/") or not name.endswith(".bson"):
                continue
            page = name[len("documents/"):-len(".bson")]
            fids = set()
            collect_fileids(bson.decode(z.read(name))["ast"], fids)
            pages[page] = sorted(fids)
        json.dump(pages, open(args.out, "w"), indent=1)
        n_w_refs = sum(1 for v in pages.values() if len(v) > 1)
        print(f"{len(pages)} page(s) scanned, {n_w_refs} referencing other files -> {args.out}")
        return

    if not args.page:
        ap.error("page is required unless --scan is given")

    ast = bson.decode(z.read(f"documents/{args.page}.bson"))["ast"]

    root_fileid = ast.get("fileid", args.page)
    if isinstance(root_fileid, list):
        root_fileid = root_fileid[0]

    ex = Extractor(diff_lines, complete=complete)
    ex.walk(ast, root_fileid, [])

    # Line counts let the final block on each page get a real extent instead
    # of collapsing to its start line.
    eof_lines = {}
    if args.source_root:
        for b in ex.blocks:
            fid = b["fileid"]
            if fid in eof_lines:
                continue
            for cand in fileid_keys(fid):
                path = os.path.join(args.source_root, cand)
                if os.path.isfile(path):
                    with open(path, encoding="utf-8", errors="replace") as fh:
                        eof_lines[fid] = sum(1 for _ in fh)
                    break

    ex.finalize(eof_lines)
    json.dump(ex.blocks, open(args.out, "w"), indent=1)
    print(f"{len(ex.blocks)} blocks -> {args.out}")

    truncated = [b["marker"] for b in ex.blocks if b.get("extent_truncated")]
    if truncated and diff_lines is not None:
        print(
            "NOTE: no --source-root given, so these trailing blocks were "
            "scored on their start line only: " + ", ".join(truncated),
            file=sys.stderr,
        )
    if ex.unmatched:
        print(
            "WARNING: no --diff-lines entry matched these fileids, so their "
            "blocks are marked new_or_existing=unknown rather than new: "
            + ", ".join(sorted(ex.unmatched)),
            file=sys.stderr,
        )
    counts = {}
    for b in ex.blocks:
        counts[b["new_or_existing"]] = counts.get(b["new_or_existing"], 0) + 1
    print("  status: " + ", ".join(f"{k}={v}" for k, v in sorted(counts.items())))


if __name__ == "__main__":
    main()
