#!/usr/bin/env python3
"""Fail if any primary DRI in OWNERS.yaml is missing from the Slack ID map
used by .github/workflows/skill-review-notify.yml to @-mention DRIs.

Usage: check-slack-map.py
"""
import re
import sys

OWNERS_PATH = ".claude/skills/OWNERS.yaml"
WORKFLOW_PATH = ".github/workflows/skill-review-notify.yml"


def load_primary_dris(path):
    import yaml

    with open(path) as f:
        manifest = yaml.safe_load(f)
    return {skill["dris"][0] for skill in manifest["skills"]}


def load_slack_map_keys(path):
    with open(path) as f:
        content = f.read()
    # The map is a flat literal dict of 'github-username': 'SLACK_ID' pairs,
    # e.g. slack_map = { 'erabil-mdb': 'U042MBH66Q3', ... }
    return set(re.findall(r"'([\w-]+)':\s*'U[A-Z0-9]+'", content))


def main():
    dris = load_primary_dris(OWNERS_PATH)
    slack_map_keys = load_slack_map_keys(WORKFLOW_PATH)

    missing = sorted(dris - slack_map_keys)
    if missing:
        print("::error::The following DRIs in OWNERS.yaml are missing from "
              f"slack_map in {WORKFLOW_PATH}:")
        for dri in missing:
            print(f"  - {dri}")
        print(
            "\nAdd each missing DRI's Slack member ID to slack_map "
            f"(in {WORKFLOW_PATH}) so skill-review-notify.yml can @-mention "
            "them. Look up the ID via the Slack admin, or search by the "
            "DRI's real name (cross-reference `git log --author=<dri>` for "
            "their name/email) using Slack's People search."
        )
        sys.exit(1)

    print(f"All {len(dris)} primary DRI(s) in OWNERS.yaml are present in slack_map.")


if __name__ == "__main__":
    main()
