#!/usr/bin/env python3
"""
write_changelog.py

Writes Atlas-hosted Search and Vector Search changelog entries for one
mongot release into content/atlas/source/includes/changelog/fts-vs-{YYYY}.rst,
which search-changelog.txt includes under its "YYYY Releases" section.

Inputs:
    --items    normalized release document (schema.py). Each published
               item's "description" is the final RST bullet text.
    --rollout  rollout_signal.py output with "confirmed": true. The
               entry date is its reached_100_at_utc date.

An item is published when review_decision is "include", or when it needs
no review and review_decision is not "exclude". Self-managed-only items
are never published. Search items go into an fts{YYYYMMDD} entry and
Vector Search items into an avs{YYYYMMDD} entry under the same date.

New entries go at the top of the year file. If the year file does not
exist, it is created and a year section is added to search-changelog.txt.

Usage:
    python3 write_changelog.py --items normalized.json --rollout rollout.json \\
        [--atlas-source content/atlas/source] [--write]

Without --write, prints the entries and changes no files.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import textwrap
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "common"))
from schema import load_document, validate_document  # noqa: E402

DEFAULT_SOURCE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "..", "content", "atlas", "source")
CHANGELOG_PAGE = "search-changelog.txt"
WRAP = 72
ENTRY_PREFIX = {"search": "fts", "vector_search": "avs"}


def is_published(item: dict) -> bool:
    if item.get("availability") == "self_managed_only":
        return False
    decision = item.get("review_decision", "")
    if decision == "exclude":
        return False
    return decision == "include" or not item.get("requires_manual_review")


def bullet(text: str) -> str:
    text = " ".join(text.split())
    return textwrap.fill(text, WRAP, initial_indent="- ", subsequent_indent="  ",
                         break_long_words=False, break_on_hyphens=False)


def render_entry(prefix: str, date: datetime, items: list[dict]) -> str:
    heading = f"{date.day:02d} {date:%B %Y} Release"
    lines = [f".. _{prefix}{date:%Y%m%d}:", "", heading, "~" * len(heading), ""]
    lines.extend(bullet(i["description"]) for i in items)
    return "\n".join(lines) + "\n"


def build_entries(items: list[dict], date: datetime) -> list[tuple[str, str]]:
    entries = []
    for product, prefix in ENTRY_PREFIX.items():
        selected = [i for i in items if i.get("product") == product and is_published(i)]
        if selected:
            entries.append((f"{prefix}{date:%Y%m%d}", render_entry(prefix, date, selected)))
    return entries


def add_year_section(page_path: str, year: int) -> None:
    with open(page_path, encoding="utf-8") as fh:
        text = fh.read()
    section = (f".. _fts_{year}:\n\n{year} Releases\n-------------\n\n"
               f".. include::  /includes/changelog/fts-vs-{year}.rst\n\n")
    match = re.search(r"^\.\. _fts[_-]\d{4}:", text, re.MULTILINE)
    if not match:
        sys.exit(f"ERROR: no year section found in {page_path}")
    with open(page_path, "w", encoding="utf-8") as fh:
        fh.write(text[:match.start()] + section + text[match.start():])


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--items", required=True)
    parser.add_argument("--rollout", required=True)
    parser.add_argument("--atlas-source", default=DEFAULT_SOURCE)
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()

    doc = load_document(args.items)
    errors = validate_document(doc)
    if errors:
        sys.exit("ERROR: invalid items document:\n  " + "\n  ".join(errors))
    with open(args.rollout, encoding="utf-8") as fh:
        rollout = json.load(fh)
    if not rollout.get("confirmed"):
        sys.exit("ERROR: rollout is not confirmed; send the release to the review gate.")
    if rollout.get("version") != str(doc["version"]).lstrip("v"):
        sys.exit(f"ERROR: rollout version {rollout.get('version')} does not match items {doc['version']}")

    date = datetime.strptime(rollout["reached_100_at_utc"], "%Y-%m-%dT%H:%M:%SZ")
    pending = [i["id"] for i in doc["items"]
               if i.get("requires_manual_review") and not i.get("review_decision")]
    if pending:
        sys.exit(f"ERROR: items awaiting a review decision: {', '.join(pending)}")
    entries = build_entries(doc["items"], date)
    if not entries:
        sys.exit("No Atlas items to publish for this release.")

    source = os.path.normpath(args.atlas_source)
    year_file = os.path.join(source, "includes", "changelog", f"fts-vs-{date.year}.rst")
    existing = ""
    if os.path.exists(year_file):
        with open(year_file, encoding="utf-8") as fh:
            existing = fh.read()
    for anchor, _ in entries:
        if re.search(rf"^\.\. _\s*{anchor}:", existing, re.MULTILINE):
            sys.exit(f"ERROR: anchor {anchor} already exists in {year_file}")

    block = "\n".join(text for _, text in entries)
    if not args.write:
        print(f"# Would insert at top of {year_file}\n")
        print(block)
        return
    if not existing:
        add_year_section(os.path.join(source, CHANGELOG_PAGE), date.year)
    with open(year_file, "w", encoding="utf-8") as fh:
        fh.write(block + ("\n" + existing if existing else ""))
    print(year_file)


if __name__ == "__main__":
    main()
