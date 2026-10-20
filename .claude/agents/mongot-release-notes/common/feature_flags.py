#!/usr/bin/env python3
"""
feature_flags.py

Feature-flag detection shared by the mongot release-notes agents.

Flag definitions live in 10gen/mms under feature-flags/definitions/mongot/
(one YAML file per flag, with a per-environment `phases` map). mongot
references them through the DynamicFeatureFlags enum. An item is matched
to a flag when its text, PR titles, or (with --scan-pr-diffs) PR diffs
reference the full flag name or the enum constant.

Matches are recorded in item["evidence"]["feature_flags"]. Any item
whose flag is not `enabled` in the target phase is sent to the review
gate.

The definitions do not record the rollout percentage, and flags often
stay `controlled` after reaching 100%. For a `controlled` flag, the
match records `controlled_since`: the date of the definition commit
that set the target phase to `controlled`. That date is the earliest
date any customer could have the feature, not a confirmed rollout date.

Usage:
    python3 feature_flags.py list [--phase prod]
    python3 feature_flags.py annotate --input raw.json --output flagged.json \\
        [--phase prod] [--scan-pr-diffs]
"""

from __future__ import annotations

import argparse
import re
import sys

from github_client import MONGOT_REPO, run_gh_lines, run_gh_text
from schema import dump_document, flag_for_review, load_document

MMS_REPO = "10gen/mms"
DEFINITIONS_PATH = "feature-flags/definitions/mongot"
ENUM_PATH = "src/main/java/com/xgen/mongot/featureflag/dynamic/DynamicFeatureFlags.java"
DEFINITIONS_URL = f"https://github.com/{MMS_REPO}/tree/master/{DEFINITIONS_PATH}"

FLAG_NAME_RE = re.compile(r"mongot\.featureFlag\.[A-Za-z0-9]+")
ENUM_ENTRY_RE = re.compile(r"\b([A-Z][A-Z0-9_]+)\(\s*\"(mongot\.featureFlag\.[A-Za-z0-9]+)\"")


def _raw_file(repo: str, path: str, ref: str = "master") -> str | None:
    return run_gh_text([
        "api", f"repos/{repo}/contents/{path}?ref={ref}",
        "-H", "Accept: application/vnd.github.raw",
    ])


def parse_definition(text: str) -> dict:
    """Parse the flat flag-definition YAML without requiring PyYAML."""
    flag: dict = {"phases": {}}
    in_phases = False
    for line in text.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        key, _, value = line.strip().partition(":")
        value = value.strip().strip("'\"")
        if line.startswith((" ", "\t")):
            if in_phases:
                flag["phases"][key] = value
            continue
        in_phases = key == "phases"
        if not in_phases:
            flag[key] = value
    return flag


def load_definitions() -> dict[str, dict]:
    """Return {full flag name: definition} from the mms repository."""
    files = run_gh_lines([
        "api", f"repos/{MMS_REPO}/contents/{DEFINITIONS_PATH}?ref=master",
        "--jq", '.[] | select(.name | endswith(".yml")) | .name',
    ]) or []
    flags = {}
    for name in files:
        text = _raw_file(MMS_REPO, f"{DEFINITIONS_PATH}/{name}")
        if not text:
            continue
        flag = parse_definition(text)
        flag["file"] = name
        flag["url"] = f"https://github.com/{MMS_REPO}/blob/master/{DEFINITIONS_PATH}/{name}"
        if flag.get("name"):
            flags[flag["name"]] = flag
    return flags


def state_since(file: str, phase: str, state: str) -> dict | None:
    """Return the date and URL of the commit that set `phase` to `state`.

    Walks the definition's history from newest to oldest and returns the
    oldest commit in the current run of `state`.
    """
    path = f"{DEFINITIONS_PATH}/{file}"
    commits = run_gh_lines([
        "api", f"repos/{MMS_REPO}/commits?path={path}&per_page=100",
        "--jq", '.[] | "\\(.sha) \\(.commit.committer.date)"',
    ]) or []
    since = None
    for line in commits:
        sha, _, date = line.partition(" ")
        text = _raw_file(MMS_REPO, path, sha)
        if text is None or parse_definition(text)["phases"].get(phase) != state:
            break
        since = {"date": date[:10], "url": f"https://github.com/{MMS_REPO}/commit/{sha}"}
    return since


def load_enum_aliases() -> dict[str, str]:
    """Return {DynamicFeatureFlags constant: full flag name} from mongot."""
    text = _raw_file(MONGOT_REPO, ENUM_PATH) or ""
    return {const: name for const, name in ENUM_ENTRY_RE.findall(text)}


def referenced_flags(text: str, aliases: dict[str, str]) -> set[str]:
    found = set(FLAG_NAME_RE.findall(text))
    for const, name in aliases.items():
        if re.search(rf"\b{const}\b", text):
            found.add(name)
    return found


def pr_diff(number: int) -> str:
    return run_gh_text(["pr", "diff", str(number), "--repo", MONGOT_REPO]) or ""


def annotate_item(item: dict, flags: dict, aliases: dict, phase: str, scan_diffs: bool) -> None:
    ev = item.setdefault("evidence", {})
    text = " ".join([item.get("title", ""), item.get("description", ""), ev.get("source_excerpt", "")])
    text += " " + " ".join(pr.get("title", "") for pr in ev.get("prs", []))
    if scan_diffs:
        text += " " + " ".join(pr_diff(pr["number"]) for pr in ev.get("prs", []))

    matches = []
    for name in sorted(referenced_flags(text, aliases)):
        flag = flags.get(name, {})
        state = flag.get("phases", {}).get(phase, "undefined")
        match = {"name": name, "phase": phase, "state": state, "url": flag.get("url", DEFINITIONS_URL)}
        if state == "controlled" and flag.get("file"):
            since = state_since(flag["file"], phase, state)
            if since:
                match["controlled_since"] = since["date"]
                match["controlled_since_url"] = since["url"]
        matches.append(match)
        if state == "controlled":
            since_text = f" since {match['controlled_since']}" if "controlled_since" in match else ""
            flag_for_review(
                item,
                f"behind feature flag {name} ({phase}: controlled{since_text}); "
                "rollout percentage unknown, confirm when all customers have it",
            )
        elif state != "enabled":
            flag_for_review(item, f"behind feature flag {name} ({phase}: {state})")
    ev["feature_flags"] = matches


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    sub = parser.add_subparsers(dest="command", required=True)
    lst = sub.add_parser("list")
    lst.add_argument("--phase", default="prod")
    ann = sub.add_parser("annotate")
    ann.add_argument("--input", required=True)
    ann.add_argument("--output", required=True)
    ann.add_argument("--phase", default="prod")
    ann.add_argument("--scan-pr-diffs", action="store_true")
    args = parser.parse_args()

    flags = load_definitions()
    if not flags:
        sys.exit(f"ERROR: no flag definitions loaded from {DEFINITIONS_URL}")

    if args.command == "list":
        for name, flag in sorted(flags.items()):
            print(f"{flag.get('phases', {}).get(args.phase, 'undefined'):<10} {name}")
        return

    aliases = load_enum_aliases()
    doc = load_document(args.input)
    for item in doc["items"]:
        annotate_item(item, flags, aliases, args.phase, args.scan_pr_diffs)
    dump_document(doc, args.output)
    gated = sum(1 for i in doc["items"] if i["evidence"]["feature_flags"])
    sys.stderr.write(f"{gated} item(s) reference a feature flag.\n")
    print(args.output)


if __name__ == "__main__":
    main()
