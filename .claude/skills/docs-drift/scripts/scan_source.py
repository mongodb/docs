#!/usr/bin/env python3
"""
scan_source.py — Stage 2a (script-seeded draft) of the docs-drift skill.

Thin launcher: selects a per-language idiom module (scripts/idiom_<name>.py),
runs its `extract(repo_dir, roots)` for raw member records, runs the
language-agnostic engine (scripts/surface_engine.py) to assemble the draft
source-surface.json, and writes it out. Deterministic: same tree in, same
output out. Pure stdlib.

Usage:
  $PY scripts/scan_source.py --idiom java_jaxrs --repo-dir <tree> \\
      --roots '**/api/res/*' '**/_public/model/*' \\
      [--path-transform '{"strip_base":"/api/public/v1.0","placeholders":{"groupId":"PROJECT-ID"}}'] \\
      [--nested-naming dotted] [--intent-markers 'internal use,private preview'] [--out out.json]

Output (draft): {"items": [...], "endpoint_hints": [...]} — see surface_engine.
"""
import argparse
import importlib
import json
import sys

IDIOMS = {"java_jaxrs": "idiom_java_jaxrs", "go": "idiom_go_flags"}


def main():
    ap = argparse.ArgumentParser(
        description="Stage 2a: emit a DRAFT source-surface.json for docs-drift Stage 2.")
    ap.add_argument("--idiom", required=True, choices=sorted(IDIOMS),
                    help="source idiom to scan (java_jaxrs | go)")
    ap.add_argument("--repo-dir", required=True, help="local checkout of the source repo")
    ap.add_argument("--roots", nargs="+", required=True,
                    help="globs (relative to --repo-dir) to scan for the public surface")
    ap.add_argument("--path-transform",
                    help='JSON {"strip_base": str, "placeholders": {k: v}} used only to '
                         "derive a doc_name candidate on endpoint hints")
    ap.add_argument("--intent-markers",
                    help="comma-separated manifest triage.intent_markers substrings to "
                         "auto-tag onto items from their enclosing block")
    ap.add_argument("--nested-naming", choices=("dotted", "indexed", "sub-table"),
                    default="dotted",
                    help="how nested members are named: dotted (parent.member, the "
                         "default), indexed (parent[n].member), or sub-table (emit no "
                         "nested names; fill in Stage 2b)")
    ap.add_argument("--out", help="write draft JSON to this path (default: stdout)")
    args = ap.parse_args()

    from surface_engine import build_surface

    path_transform = {}
    if args.path_transform:
        try:
            path_transform = json.loads(args.path_transform)
        except ValueError:
            sys.exit("error: --path-transform must be valid JSON")

    extracted = importlib.import_module(IDIOMS[args.idiom]).extract(
        args.repo_dir, args.roots)
    opts = {
        "repo_dir": args.repo_dir,
        "nested_naming": args.nested_naming,
        "intent_markers": [s for s in (args.intent_markers or "").split(",")
                           if s.strip()],
        "path_transform": path_transform,
        "notices": [],
    }
    result = build_surface(extracted, opts)

    text = json.dumps(result, indent=2)
    if args.out:
        with open(args.out, "w") as f:
            f.write(text)
    else:
        sys.stdout.write(text)

    items, hints = result["items"], result["endpoint_hints"]
    counts = {}
    any_hint = False
    for it in items:
        counts[it.get("kind")] = counts.get(it.get("kind"), 0) + 1
        any_hint = any_hint or it.get("confidence") == "hint"
    print(f"wrote {args.out or 'stdout'}: {len(items)} items ({counts or 'none'}) "
          f"across {len(hints)} endpoint hints — "
          f"{'contains hint-confidence items to verify' if any_hint else 'all auto-confidence'}",
          file=sys.stderr)
    for n in opts["notices"]:
        print(n, file=sys.stderr)


if __name__ == "__main__":
    main()
