#!/usr/bin/env python3
"""
batch_content.py — splits Stage 1 output into batches for Stage 2 (scan) of
the docs-security-scan skill, and merges the per-batch candidates afterward.

A docset's extracted content can be too large for one agent read. `split`
writes whole pages, in filename order, into batches of at most --max-bytes
each; every page lands in exactly one batch. `merge` concatenates each batch's
candidates file and fails if any batch has no candidates file, so a batch that
was never scanned can't pass silently.

Usage:
  batch_content.py split --content /tmp/<docset>-content.json --out-dir /tmp/<docset>-batches [--max-bytes 300000]
  batch_content.py merge --batch-dir /tmp/<docset>-batches --out /tmp/<docset>-candidates.json

Layout: split writes <out-dir>/000.json, 001.json, ... Stage 2 writes its
candidates for batch NNN to <out-dir>/NNN-candidates.json (a JSON array).
"""

import argparse
import json
import re
import sys
from pathlib import Path

BATCH = re.compile(r"^(\d{3})\.json$")


def split(args):
    content = json.loads(Path(args.content).read_text())
    out = Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)
    if any(out.glob("*.json")):
        sys.exit(f"{out} already has .json files; use an empty directory")

    # Count the {"pages": [...]} wrapper and the ", " between pages, so each
    # written file is at most --max-bytes.
    wrapper = len(json.dumps({"pages": []}))
    batches, current, size = [], [], wrapper
    for page in content["pages"]:
        page_size = len(json.dumps(page, default=str)) + (2 if current else 0)
        if current and size + page_size > args.max_bytes:
            batches.append(current)
            current, size = [], wrapper
            page_size -= 2
        current.append(page)
        size += page_size
    if current:
        batches.append(current)

    for i, pages in enumerate(batches):
        (out / f"{i:03d}.json").write_text(json.dumps({"pages": pages}, default=str))
    oversized = [p["filename"] for b in batches if len(b) == 1 for p in b if len(json.dumps(p, default=str)) > args.max_bytes]
    print(f"wrote {len(batches)} batches for {len(content['pages'])} pages to {out}", file=sys.stderr)
    for f in oversized:
        print(f"warning: page larger than --max-bytes, in its own batch: {f}", file=sys.stderr)


def merge(args):
    d = Path(args.batch_dir)
    ids = sorted(m.group(1) for f in d.iterdir() if (m := BATCH.match(f.name)))
    if not ids:
        sys.exit(f"no batches in {d}")
    missing = [i for i in ids if not (d / f"{i}-candidates.json").exists()]
    if missing:
        sys.exit(f"batches with no candidates file: {', '.join(missing)}")

    merged = []
    for i in ids:
        candidates = json.loads((d / f"{i}-candidates.json").read_text())
        if not isinstance(candidates, list):
            sys.exit(f"{i}-candidates.json is not a JSON array")
        merged.extend(candidates)
    Path(args.out).write_text(json.dumps(merged, indent=2) + "\n")
    print(f"merged {len(merged)} candidates from {len(ids)} batches into {args.out}", file=sys.stderr)


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("split")
    s.add_argument("--content", required=True)
    s.add_argument("--out-dir", required=True)
    s.add_argument("--max-bytes", type=int, default=300000)
    s.set_defaults(func=split)
    m = sub.add_parser("merge")
    m.add_argument("--batch-dir", required=True)
    m.add_argument("--out", required=True)
    m.set_defaults(func=merge)
    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
