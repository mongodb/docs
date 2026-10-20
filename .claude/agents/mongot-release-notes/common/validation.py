#!/usr/bin/env python3
"""
validation.py

Validation and human-approval checkpoints shared by the mongot
release-notes agents.

Checkpoint 1 (review gate), run after normalization:
    python3 validation.py review --input normalized.yaml
        Prints the review queue. Exit code 2 while any flagged item has
        no operator decision.
    python3 validation.py review --input normalized.yaml \\
        --decisions decisions.json --output verified.yaml
        Applies operator decisions ({"<item id>": "include|exclude"})
        and writes only publishable items.

Checkpoint 2 (output checks), run after assembly:
    python3 validation.py check-output --input verified.yaml \\
        --rst <generated include> [--rollback-marker ".. warning::"]
        Exit code 1 when any check fails.
"""

from __future__ import annotations

import argparse
import json
import re
import sys

from evidence import evidence_identifiers, evidence_links
from release_metadata import extract_jira_keys
from schema import dump_document, load_document, validate_document

DECISIONS = ("include", "exclude")


def pending_review(doc: dict) -> list[dict]:
    return [
        i for i in doc["items"]
        if i["requires_manual_review"] and i.get("review_decision") not in DECISIONS
    ]


def print_review_queue(doc: dict) -> None:
    queue = pending_review(doc)
    sys.stderr.write(f"{len(queue)} item(s) awaiting operator decision:\n")
    for item in queue:
        sys.stderr.write(f"\n  [{item['id']}] ({item['type']}) {item['title']}\n")
        for reason in item["review_reasons"]:
            sys.stderr.write(f"      reason: {reason}\n")
        for link in evidence_links(item["evidence"]):
            sys.stderr.write(f"      source: {link}\n")


def apply_decisions(doc: dict, decisions: dict[str, str]) -> dict:
    for item_id, decision in decisions.items():
        if decision not in DECISIONS:
            sys.exit(f"ERROR: invalid decision {decision!r} for {item_id}")
    by_id = {i["id"]: i for i in doc["items"]}
    unknown = set(decisions) - set(by_id)
    if unknown:
        sys.exit(f"ERROR: decisions reference unknown item ids: {sorted(unknown)}")
    for item_id, decision in decisions.items():
        by_id[item_id]["review_decision"] = decision

    verified = dict(doc)
    verified["items"] = [
        i for i in doc["items"]
        if not i["requires_manual_review"] or i["review_decision"] == "include"
    ]
    verified["item_count"] = len(verified["items"])
    return verified


def check_output(doc: dict, rst: str, rollback_marker: str) -> list[tuple[str, bool]]:
    leaked = [x for i in doc["items"] for x in evidence_identifiers(i["evidence"]) if x in rst]
    leaked += [k for k in extract_jira_keys(rst) if k not in leaked]
    leaked += re.findall(r"github\.com/10gen/|jira\.mongodb\.org", rst)
    rollback_items = [i for i in doc["items"] if i["rollback_risk"]]
    return [
        ("Every published item passed the review gate", not pending_review(doc)),
        ("No Atlas/self-managed scope conflicts remain", not any(
            i["availability"] == doc.get("excluded_availability") for i in doc["items"])),
        (f"Rollback marker present for {len(rollback_items)} risk item(s)",
         rst.count(rollback_marker) >= len(rollback_items)),
        ("No internal identifiers in customer-facing text"
         + (f" (found: {sorted(set(leaked))})" if leaked else ""), not leaked),
    ]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    sub = parser.add_subparsers(dest="command", required=True)

    review = sub.add_parser("review")
    review.add_argument("--input", required=True)
    review.add_argument("--decisions")
    review.add_argument("--output")

    check = sub.add_parser("check-output")
    check.add_argument("--input", required=True)
    check.add_argument("--rst", required=True)
    check.add_argument("--rollback-marker", default=".. warning::")

    args = parser.parse_args()
    doc = load_document(args.input)
    errors = validate_document(doc)
    if errors:
        sys.exit("ERROR: schema validation failed:\n  " + "\n  ".join(errors))

    if args.command == "review":
        if args.decisions:
            with open(args.decisions, encoding="utf-8") as fh:
                doc = apply_decisions(doc, json.load(fh))
        queue = pending_review(doc)
        if queue:
            print_review_queue(doc)
            sys.exit(2)
        if args.output:
            dump_document(doc, args.output)
            print(args.output)
        sys.stderr.write(f"Review gate passed: {len(doc['items'])} publishable item(s).\n")
        return

    with open(args.rst, encoding="utf-8") as fh:
        rst = fh.read()
    results = check_output(doc, rst, args.rollback_marker)
    for label, ok in results:
        print(f"[{'x' if ok else ' '}] {label}")
    if not all(ok for _, ok in results):
        sys.exit(1)


if __name__ == "__main__":
    main()
