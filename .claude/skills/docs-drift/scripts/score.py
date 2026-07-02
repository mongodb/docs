#!/usr/bin/env python3
"""
Compute coverage and accuracy scores from a classified candidates file.

Input: /tmp/classified.json — candidates.json enriched with a "label" field
on each item, written by the Stage 4 triage agent.

Coverage %  = documented_items / documentable_surface * 100
Accuracy %  = (documented_items - accuracy_confirmed) / documented_items * 100

Definitions:
  documentable_surface = total candidates - Intentional
  undocumented_items   = Needs-eng-confirmation
                         + Confirmed where kind == "undocumented_surface"
  documented_items     = documentable_surface - undocumented_items
  accuracy_confirmed   = Confirmed where kind != "undocumented_surface"

Intentional items are excluded from both denominators.
Tracked and Upcoming items are counted as documented and accurate.
"""

import argparse
import json
import sys

# Candidate kinds that indicate the item is absent from the docs entirely.
# These reduce coverage, not accuracy.
COVERAGE_REDUCING_KINDS = {"undocumented_surface"}


def score(classified):
    candidates = classified.get("candidates", [])
    total = len(candidates)
    intentional = sum(1 for c in candidates if c.get("label") == "Intentional")
    documentable = total - intentional

    if documentable == 0:
        return {
            "coverage_pct": 100.0,
            "accuracy_pct": 100.0,
            "documented_items": 0,
            "documentable_surface": 0,
            "total": total,
        }

    undocumented = sum(
        1 for c in candidates
        if c.get("label") == "Needs-eng-confirmation"
        or (c.get("label") == "Confirmed"
            and c.get("kind") in COVERAGE_REDUCING_KINDS)
    )
    documented = documentable - undocumented
    coverage_pct = round(documented / documentable * 100, 1)

    if documented == 0:
        accuracy_pct = 0.0
    else:
        accuracy_confirmed = sum(
            1 for c in candidates
            if c.get("label") == "Confirmed"
            and c.get("kind") not in COVERAGE_REDUCING_KINDS
        )
        accuracy_pct = round((documented - accuracy_confirmed) / documented * 100, 1)

    return {
        "coverage_pct": coverage_pct,
        "accuracy_pct": accuracy_pct,
        "documented_items": documented,
        "documentable_surface": documentable,
        "total": total,
    }


def main():
    ap = argparse.ArgumentParser(
        description="Compute coverage and accuracy scores from classified candidates.")
    ap.add_argument("--classified", required=True,
                    help="path to classified.json (candidates enriched with label fields)")
    ap.add_argument("--out", help="write JSON result to this path (default: stdout)")
    args = ap.parse_args()

    with open(args.classified) as f:
        classified = json.load(f)

    result = score(classified)

    text = json.dumps(result, indent=2)
    if args.out:
        with open(args.out, "w") as f:
            f.write(text)
        print(
            f"coverage: {result['coverage_pct']}%  "
            f"accuracy: {result['accuracy_pct']}%  "
            f"({result['documented_items']}/{result['documentable_surface']} items documented)",
            file=sys.stderr,
        )
    else:
        print(text)


if __name__ == "__main__":
    main()
