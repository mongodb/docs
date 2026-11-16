#!/usr/bin/env python3
"""Fail if the `people:` table in OWNERS.yaml and the `dris` lists disagree.

The `people:` table is the single source of truth for DRI identity (name,
Jira username, Slack member ID). .github/workflows/skill-review-notify.yml
reads both of its maps from it, so a mismatch means either a DRI whose
review tickets would be filed unassigned, or an entry nobody references.

Checks:
  1. every DRI named in skills/agents/scripts has a `people:` entry
  2. every `people:` entry is referenced by at least one entry
  3. every `people:` entry has name, jira, and slack

Usage: check-people.py
"""
import sys

import yaml

OWNERS_PATH = ".claude/skills/OWNERS.yaml"
SECTIONS = ("skills", "agents", "scripts")
REQUIRED_FIELDS = ("name", "jira", "slack")


def main():
    with open(OWNERS_PATH) as f:
        manifest = yaml.safe_load(f)

    people = manifest.get("people") or {}
    referenced = {
        dri
        for section in SECTIONS
        for entry in (manifest.get(section) or [])
        for dri in (entry.get("dris") or [])
    }

    problems = []

    missing = sorted(referenced - set(people))
    if missing:
        problems.append(
            ("DRIs referenced in OWNERS.yaml but missing from the `people:` "
             "table:",
             missing,
             "Add each one under `people:` with name, jira, and slack, so "
             "skill-review-notify.yml can assign their review tickets and "
             "@-mention them.")
        )

    orphans = sorted(set(people) - referenced)
    if orphans:
        problems.append(
            ("`people:` entries referenced by no skill, agent, or script:",
             orphans,
             "Remove the entry, or point the entry that should reference it "
             "at this handle. An unreferenced entry usually means ownership "
             "moved and the old entry was left behind.")
        )

    incomplete = sorted(
        dri for dri, fields in people.items()
        if not all((fields or {}).get(f) for f in REQUIRED_FIELDS)
    )
    if incomplete:
        problems.append(
            (f"`people:` entries missing a required field "
             f"({', '.join(REQUIRED_FIELDS)}):",
             incomplete,
             None)
        )

    if problems:
        for header, dri_list, remediation in problems:
            print(f"::error::{header}")
            for dri in dri_list:
                print(f"  - {dri}")
            if remediation:
                print(f"  {remediation}")
        sys.exit(1)

    print(f"people: table is consistent — {len(people)} entries, "
          f"{len(referenced)} referenced by {', '.join(SECTIONS)}.")


if __name__ == "__main__":
    main()
