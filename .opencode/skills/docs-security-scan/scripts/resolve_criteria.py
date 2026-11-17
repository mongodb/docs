#!/usr/bin/env python3
"""
resolve_criteria.py — runs before Stage 2 (scan) of the docs-security-scan
skill.

Writes the criteria for one docset to a single file: the universal guidelines
from references/universal-guidelines.yaml minus the manifest's
`disable_universal`, plus the manifest's `security_considerations` and
`exception_markers`. Stages 2 and 3 read this file, so a disabled guideline
never reaches the scan.

Usage:
  resolve_criteria.py --manifest references/<docset>.yaml --out /tmp/<docset>-criteria.yaml

Exits with an error if `disable_universal` lists an id that isn't a universal
guideline.
"""

import argparse
import sys
from pathlib import Path

import yaml

GUIDELINES = Path(__file__).resolve().parent.parent / "references" / "universal-guidelines.yaml"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    manifest = yaml.safe_load(Path(args.manifest).read_text()) or {}
    guidelines = yaml.safe_load(GUIDELINES.read_text())["guidelines"]
    disabled = set(manifest.get("disable_universal") or [])
    unknown = disabled - {g["id"] for g in guidelines}
    if unknown:
        sys.exit(f"disable_universal lists unknown guideline(s): {sorted(unknown)}")

    criteria = {
        "docset": manifest.get("docset"),
        "disabled_universal": sorted(disabled),
        "universal_guidelines": [g for g in guidelines if g["id"] not in disabled],
        "security_considerations": manifest.get("security_considerations") or [],
        "exception_markers": manifest.get("exception_markers") or [],
    }
    Path(args.out).write_text(yaml.safe_dump(criteria, sort_keys=False, allow_unicode=True, width=float("inf")))
    print(
        f"{len(criteria['universal_guidelines'])} universal guidelines "
        f"({len(disabled)} disabled), {len(criteria['security_considerations'])} considerations",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
