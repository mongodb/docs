#!/usr/bin/env python3
"""
normalize_release_items.py

Normalizes fetched mongot release items (fetch_mongot_release.py output,
optionally annotated by feature_flags.py) for the Atlas Search changelog.

Rules:
  1. Drop self_managed_only items (never published in Atlas docs).
  2. Keep atlas_only and both items. Flag enterprise items for review,
     because enterprise signals usually describe self-managed builds.
  3. Flag items whose product is unknown.
  4. Flag operational items, which are often not customer-facing.
  5. Flag rollback/reindex risk items, because Atlas changelog bullets
     carry no warning admonition.
  6. Look up Aha! maturity for features; flag features that stay unknown.

Usage:
    python3 normalize_release_items.py --input flagged.json \\
        --output normalized.yaml

Writes a schema.py document with excluded_availability set to
self_managed_only, for validation.py check-output.
"""

from __future__ import annotations

import argparse
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "common"))
from aha import query_aha_maturity  # noqa: E402
from schema import dump_document, flag_for_review, load_document, validate_document  # noqa: E402

EXCLUDED_AVAILABILITY = "self_managed_only"


def normalize_item(item: dict) -> None:
    if item["availability"] == "enterprise":
        flag_for_review(item, "enterprise signal; confirm the change applies to Atlas")
    if item["product"] == "unknown":
        flag_for_review(item, "product unknown; choose Search or Vector Search")
    if item["type"] == "operational":
        flag_for_review(item, "operational item; confirm it is customer-facing")
    if item["rollback_risk"]:
        flag_for_review(item, "rollback/reindex risk: " + ", ".join(item["rollback_signals"]))
    if not item["description"].strip():
        flag_for_review(item, "empty description")
    if item["type"] == "feature" and item["aha_maturity"] == "unknown":
        item["aha_maturity"] = query_aha_maturity(item["title"])
        if item["aha_maturity"] == "unknown":
            flag_for_review(item, "Aha! maturity unknown")


def normalize(doc: dict) -> dict:
    kept, dropped = [], 0
    for item in doc["items"]:
        if item["availability"] == EXCLUDED_AVAILABILITY:
            sys.stderr.write(f"  [DROPPED] self-managed only: {item['title']}\n")
            dropped += 1
            continue
        normalize_item(item)
        kept.append(item)
    result = dict(doc)
    result["items"] = kept
    result["item_count"] = len(kept)
    result["excluded_availability"] = EXCLUDED_AVAILABILITY
    result["excluded_count"] = dropped
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--input", required=True, help="fetch or feature_flags output")
    parser.add_argument("--output", required=True, help="normalized document path")
    args = parser.parse_args()

    doc = load_document(args.input)
    errors = validate_document(doc)
    if errors:
        sys.exit("ERROR: invalid input document:\n  " + "\n  ".join(errors))

    result = normalize(doc)
    dump_document(result, args.output)
    print(args.output)

    flagged = [i for i in result["items"] if i["requires_manual_review"]]
    counts = {p: sum(1 for i in result["items"] if i["product"] == p)
              for p in ("search", "vector_search")}
    sys.stderr.write(
        f"Normalized {len(result['items'])} item(s) "
        f"({counts['search']} Search, {counts['vector_search']} Vector Search, "
        f"{result['excluded_count']} self-managed only dropped, "
        f"{len(flagged)} flagged for review).\n"
    )


if __name__ == "__main__":
    main()
