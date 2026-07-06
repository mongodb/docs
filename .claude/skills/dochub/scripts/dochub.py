#!/usr/bin/env python3
"""dochub.py — deterministic helper for DocHub link create/update.

DocHub links live in `dochub.mongodb.org/netlify.toml` in the separate repo
`10gen/docs-subdomains`. This script handles the parts that must be
deterministic (no LLM judgment): fetching the file, looking up whether a key
already exists, mapping a destination docs URL to its `# Category` section, and
splicing a new/updated `[[redirects]]` block into the correct alphabetical slot
within that section while leaving the rest of the file byte-for-byte unchanged.

The SKILL.md prose orchestrates: it gathers inputs, calls these subcommands,
shows the diff, waits for confirmation, then runs the gh branch/PR steps.

Subcommands:
  fetch                      Fetch netlify.toml from GitHub to a cache path (stdout: path).
  lookup   --key K [--file F]    Report status for a key: absent | exists-same | exists-different.
  section-for --to URL           Map a destination URL to its section header (stdout: section or "").
  apply    --key K --to URL [--section S] [--file F]
                             Produce the edited file + a unified diff. Writes the new
                             file to --out (default: <file>.new) and prints the diff.

Conventions enforced (sources: repo README, wiki 2.0 page, live file):
  - `from` must start with `/core/`.
  - Entries are grouped by `# Category` section, ordered alphanumerically by
    `from` WITHIN the section (verified empirically; the README's "to" is stale).
  - Never create a duplicate `from` (Netlify reads top-to-bottom, only the first
    match resolves) — an existing key is edited in place.
  - Splat/wildcard `from` values sort to the bottom of their section.
"""
from __future__ import annotations

import argparse
import base64
import difflib
import json
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlparse

REPO = "10gen/docs-subdomains"
TOML_PATH = "dochub.mongodb.org/netlify.toml"
CACHE = Path("/tmp/dochub-netlify.toml")

# Destination URL first-path-segment (after an optional leading "docs/") ->
# exact `# Category` header text as it appears in the file. Derived empirically
# from the live file (see DOCSP-60864 analysis). When a URL's segment is not in
# this map, section-for returns "" and the caller must ask the user.
SECTION_MAP = {
    "atlas": "Atlas",
    "vector-search": "Atlas Vector Search",
    "search": "Atlas Search",
    "blog": "Blog",
    "charts": "Charts",
    "cloud-manager": "Cloud Manager",
    "cluster-to-cluster-sync": "Cluster-to-Cluster Sync",
    "compass": "Compass",
    "database-tools": "Database Tools",
    "datalake": "Datalake",
    "developer": "Developer Center",
    "drivers": "Drivers",
    "languages": "Drivers",
    "kubernetes-operator": "Kubernetes Operator",
    "kubernetes": "Kubernetes Operator",
    "manual": "Manual",
    "mongocli": "MongoCLI",
    "mongodb-analyzer": "MongoDB Analyzer",
    "mongodb-shell": "MongoDB Shell",
    "mongodb-vscode": "MongoDB VSCode",
    "ops-manager": "Ops Manager",
    "realm": "Realm",
    "mcp-server": "MCP Server",
    "relational-migrator": "Relational Migrator",
    "solutions": "Solutions",
}


# --------------------------------------------------------------------------- #
# Fetch
# --------------------------------------------------------------------------- #
def fetch(dest: Path = CACHE) -> Path:
    """Fetch netlify.toml via the gh API and write it to `dest`."""
    out = subprocess.run(
        ["gh", "api", f"repos/{REPO}/contents/{TOML_PATH}",
         "--jq", ".content"],
        capture_output=True, text=True,
    )
    if out.returncode != 0:
        sys.exit(f"gh api failed: {out.stderr.strip()}")
    content = base64.b64decode(out.stdout.strip())
    dest.write_bytes(content)
    return dest


def _load(file: str | None) -> list[str]:
    path = Path(file) if file else CACHE
    if not path.exists():
        if file:
            sys.exit(f"file not found: {path}")
        fetch(path)
    return path.read_text().splitlines(keepends=True)


# --------------------------------------------------------------------------- #
# Key / URL helpers
# --------------------------------------------------------------------------- #
def normalize_key(key: str) -> str:
    """Return a canonical `from` path: always starts with /core/."""
    key = key.strip()
    if key.startswith("https://dochub.mongodb.org"):
        key = urlparse(key).path
    key = key.lstrip("/")
    if key.startswith("core/"):
        key = key[len("core/"):]
    return "/core/" + key


def _url_segments(url: str) -> list[str]:
    """Non-empty path segments of a URL."""
    return [s for s in urlparse(url).path.split("/") if s]


def url_section(url: str) -> str:
    """Map a destination docs URL to its section header, or "" if unknown."""
    segs = _url_segments(url)
    if segs and segs[0] == "docs":
        segs = segs[1:]
    if not segs:
        return ""
    return SECTION_MAP.get(segs[0], "")


# --------------------------------------------------------------------------- #
# Parse into blocks
# --------------------------------------------------------------------------- #
@dataclass
class Block:
    """A single [[redirects]] block: its line span, section, from, to."""
    start: int
    end: int
    section: str
    frm: str
    to: str


_SECTION_RE = re.compile(r"^#\s*([A-Za-z][^\n]{0,80})\s*$")


def _current_section(header: str) -> str | None:
    """Return a clean section name for a `# ...` comment, or None if the
    comment is prose/instructional rather than a category header."""
    m = _SECTION_RE.match(header)
    if not m:
        return None
    text = m.group(1).strip()
    low = text.lower()
    if "redirect" in low or "keep at" in low or "fastly" in low:
        return None
    return text


def parse(lines: list[str]) -> list[Block]:
    blocks: list[Block] = []
    section = None
    i = 0
    while i < len(lines):
        s = lines[i].strip()
        sec = _current_section(s) if s.startswith("#") else None
        if sec is not None:
            section = sec
            i += 1
            continue
        if s == "[[redirects]]":
            start = i
            frm = to = ""
            j = i + 1
            while j < len(lines):
                t = lines[j].strip()
                if t == "[[redirects]]" or t.startswith("#") or t == "":
                    break
                fm = re.match(r'from\s*=\s*"(.*)"', t)
                tm = re.match(r'to\s*=\s*"(.*)"', t)
                if fm:
                    frm = fm.group(1)
                if tm:
                    to = tm.group(1)
                j += 1
            blocks.append(Block(start, j, section or "", frm, to))
            i = j
            continue
        i += 1
    return blocks


# --------------------------------------------------------------------------- #
# lookup
# --------------------------------------------------------------------------- #
def lookup(key: str, to: str | None, file: str | None) -> dict:
    frm = normalize_key(key)
    blocks = parse(_load(file))
    for b in blocks:
        if b.frm == frm:
            if to is not None and b.to.rstrip("/").lower() == to.rstrip("/").lower():
                return {"status": "exists-same", "from": frm,
                        "to": b.to, "section": b.section}
            return {"status": "exists-different", "from": frm,
                    "current_to": b.to, "section": b.section}
    return {"status": "absent", "from": frm}


# --------------------------------------------------------------------------- #
# drift — find dochub targets pointing at an old/removed docs URL
# --------------------------------------------------------------------------- #
def canon_url(url: str) -> str:
    """Canonicalize a docs URL to a host-agnostic, anchor/query/slash-free path.

    Both `www.mongodb.com/docs/atlas/x` and legacy `docs.mongodb.com/atlas/x`
    normalize to `/atlas/x`, so targets written in either form compare equal.
    """
    p = urlparse(url)
    path = p.path
    if path.startswith("/docs/"):
        path = path[len("/docs"):]      # -> /atlas/x
    elif path == "/docs":
        path = "/"
    return path.rstrip("/").lower() or "/"


def drift(old_urls: list[str], file: str | None) -> list[dict]:
    """Return dochub entries whose `to` points at (or under) any old URL.

    - exact  : the target page equals the old URL (ignoring #anchor/query).
    - prefix : the target is under a moved directory (old URL is a path prefix).
    """
    olds = [canon_url(u) for u in old_urls if u.strip()]
    hits: list[dict] = []
    for b in parse(_load(file)):
        if not b.to:
            continue
        c = canon_url(b.to)
        for o in olds:
            if c == o:
                match = "exact"
            elif o != "/" and c.startswith(o + "/"):
                match = "prefix"
            else:
                continue
            hits.append({
                "from": b.frm, "to": b.to, "section": b.section,
                "match": match, "old_url": old_urls[olds.index(o)],
                "has_anchor": "#" in b.to,
            })
            break
    return hits


# --------------------------------------------------------------------------- #
# page-refs — cheap heuristic used by the page-move hook
# --------------------------------------------------------------------------- #
# Ultra-generic page slugs that appear across many docs URLs; matching on these
# would fire the hook constantly, so they are not treated as a reliable signal.
# The precise check happens in the invoked skill (snooty URL derivation + drift).
GENERIC_SLUGS = {
    "index", "overview", "introduction", "intro", "connect", "get-started",
    "getting-started", "faq", "reference", "tutorial", "tutorials", "about",
    "configuration", "settings", "install", "installation", "quick-start",
}


def page_slug(content_path: str) -> str:
    """Filename slug of a content page path (basename without .txt)."""
    return Path(content_path).stem


def page_refs(content_paths: list[str], file: str | None) -> list[dict]:
    """Heuristic: dochub entries whose target URL contains a moved page's slug
    as a path segment. Deliberately fuzzy — a fast signal for the hook, not a
    precise match. Generic slugs are skipped to avoid noise."""
    blocks = parse(_load(file))
    hits: list[dict] = []
    for cp in content_paths:
        slug = page_slug(cp)
        if not slug or slug in GENERIC_SLUGS:
            continue
        for b in blocks:
            if not b.to:
                continue
            if slug in _url_segments(b.to):
                hits.append({"page": cp, "slug": slug,
                             "from": b.frm, "to": b.to, "section": b.section})
    return hits


# --------------------------------------------------------------------------- #
# apply
# --------------------------------------------------------------------------- #
def _is_splat(frm: str) -> bool:
    return "*" in frm


def _new_block_text(frm: str, to: str) -> list[str]:
    return ["[[redirects]]\n", f'from = "{frm}"\n', f'to = "{to}"\n']


def apply(key: str, to: str, section: str | None,
          file: str | None, out: str | None) -> str:
    frm = normalize_key(key)
    lines = _load(file)
    blocks = parse(lines)

    # Update path: key already exists -> edit its `to` in place.
    for b in blocks:
        if b.frm == frm:
            new = lines[:]
            for k in range(b.start, b.end):
                if re.match(r'\s*to\s*=', lines[k]):
                    new[k] = f'to = "{to}"\n'
                    break
            return _finish(lines, new, out, file)

    # Create path: find the section, then the alphabetical slot within it.
    section = section or url_section(to)
    if not section:
        sys.exit("ERROR: could not determine section from URL; "
                 "pass --section explicitly.")
    sec_blocks = [b for b in blocks if b.section == section
                  and not _is_splat(b.frm)]
    if not sec_blocks:
        sys.exit(f"ERROR: section '{section}' not found in file; "
                 "verify the section name.")

    # Insert before the first block whose `from` sorts after ours; if none,
    # after the last non-splat block in the section (splats stay at the bottom).
    insert_at = None
    for b in sec_blocks:
        if frm < b.frm:
            insert_at = b.start
            break
    if insert_at is None:
        insert_at = sec_blocks[-1].end

    new_block = _new_block_text(frm, to)
    # Keep exactly one blank line on each side of the new block: add a
    # separator only when the neighbor line isn't already blank. (Without the
    # conditional suffix, an end-of-section insert doubles the blank line that
    # already precedes the next `# Category` header.)
    prefix = [] if (insert_at == 0 or lines[insert_at - 1].strip() == "") \
        else ["\n"]
    suffix = [] if (insert_at < len(lines) and lines[insert_at].strip() == "") \
        else ["\n"]
    new = lines[:insert_at] + prefix + new_block + suffix + lines[insert_at:]
    return _finish(lines, new, out, file)


def _finish(old: list[str], new: list[str], out: str | None,
            file: str | None) -> str:
    src = Path(file) if file else CACHE
    out_path = Path(out) if out else src.with_suffix(src.suffix + ".new")
    out_path.write_text("".join(new))
    diff = "".join(difflib.unified_diff(
        old, new, fromfile=str(src), tofile=str(out_path)))
    return diff


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("fetch")
    p.add_argument("dest", nargs="?", help="output path (default: cache path)")

    p = sub.add_parser("lookup")
    p.add_argument("--key", required=True)
    p.add_argument("--to")
    p.add_argument("--file")

    p = sub.add_parser("section-for")
    p.add_argument("--to", required=True)

    p = sub.add_parser("drift")
    p.add_argument("--old-url", action="append", dest="old_urls", required=True,
                   help="a docs URL that was moved/removed (repeatable)")
    p.add_argument("--file")

    p = sub.add_parser("page-refs")
    p.add_argument("--path", action="append", dest="paths", required=True,
                   help="a moved/removed content page path (repeatable)")
    p.add_argument("--file")

    p = sub.add_parser("apply")
    p.add_argument("--key", required=True)
    p.add_argument("--to", required=True)
    p.add_argument("--section")
    p.add_argument("--file")
    p.add_argument("--out")

    args = ap.parse_args()

    def as_json(obj) -> str:
        return json.dumps(obj, indent=2)

    handlers = {
        "fetch": lambda: str(fetch(Path(args.dest) if args.dest else CACHE)),
        "lookup": lambda: as_json(lookup(args.key, args.to, args.file)),
        "section-for": lambda: url_section(args.to),
        "drift": lambda: as_json(drift(args.old_urls, args.file)),
        "page-refs": lambda: as_json(page_refs(args.paths, args.file)),
        "apply": lambda: apply(args.key, args.to, args.section, args.file,
                               args.out),
    }
    print(handlers[args.cmd]())


if __name__ == "__main__":
    main()
