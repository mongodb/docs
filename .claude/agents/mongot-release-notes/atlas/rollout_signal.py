#!/usr/bin/env python3
"""
rollout_signal.py

Confirms the 100% PROD rollout of a mongot version from a
"MongoDB Atlas Software Release" bot message in the
#search-mongot-releases Slack channel (C08SD1243EU).

Input is the Slack message permalink plus the message text, as returned
by Glean for that permalink (read_document snippet):

    MongoDB Atlas Software Release (2026-09-14 17:52): ...
    ... updated in PROD · MONGOT v1.73.2 (PHASED)
    Criteria: {"versionPercent":100} - previously {"versionPercent":50,...}

The message confirms the rollout when all checks pass:
    - the message is from channel C08SD1243EU
    - environment is PROD and the version matches --version
    - current criteria have versionPercent 100
    - previous criteria have any versionPercent other than 100
    - the header time (UTC) matches the permalink timestamp

Usage:
    python3 rollout_signal.py --version 1.73.2 \\
        --url https://mongodb.slack.com/archives/C08SD1243EU/p1789408356864419 \\
        --text message.txt [--output rollout.json]

--text accepts '-' for stdin. Exit code 2 when any check fails.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone

ROLLOUT_CHANNEL = "C08SD1243EU"
PERMALINK_RE = re.compile(r"/archives/([A-Z0-9]+)/p(\d{10})(\d{6})")
# Header shows minutes only; the bot posts within seconds of the change.
MAX_CLOCK_SKEW_SECONDS = 120

HEADER_RE = re.compile(
    r"MongoDB Atlas Software Release \((\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})\)"
)
TARGET_RE = re.compile(
    r"updated in\s+([A-Z][A-Z0-9_-]*)\s*[·•|\-]\s*MONGOT\s+v?(\d+\.\d+\.\d+)",
    re.IGNORECASE,
)
CRITERIA_RE = re.compile(
    r"Criteria:\s*(\{.*?\})(?:\s*-\s*previously\s*(\{.*?\}))?\s*(?:$|\n)",
    re.IGNORECASE | re.MULTILINE,
)


def _criteria(raw: str | None) -> dict | None:
    if not raw:
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


def _percent(criteria: dict | None) -> object:
    return (criteria or {}).get("versionPercent")


def is_change_to_100(current: dict | None, previous: dict | None) -> bool:
    return _percent(current) == 100 and previous is not None and _percent(previous) != 100


def parse_permalink(url: str) -> dict | None:
    match = PERMALINK_RE.search(url)
    if not match:
        return None
    ts = datetime.fromtimestamp(int(match.group(2)), tz=timezone.utc)
    return {"channel": match.group(1), "posted_at_utc": ts.strftime("%Y-%m-%dT%H:%M:%SZ")}


def parse_messages(text: str) -> list[dict]:
    """Split message text on bot headers and parse each message."""
    headers = list(HEADER_RE.finditer(text))
    events = []
    for idx, header in enumerate(headers):
        end = headers[idx + 1].start() if idx + 1 < len(headers) else len(text)
        body = text[header.start():end]
        target = TARGET_RE.search(body)
        crit = CRITERIA_RE.search(body)
        if not target or not crit:
            sys.stderr.write(f"WARNING: skipped unparseable message at {header.group(0)}\n")
            continue
        current = _criteria(crit.group(1))
        previous = _criteria(crit.group(2))
        events.append({
            "timestamp_utc": f"{header.group(1)}T{header.group(2)}:00Z",
            "environment": target.group(1).upper(),
            "version": target.group(2),
            "criteria": current,
            "previous_criteria": previous,
            "change_to_100": is_change_to_100(current, previous),
        })
    return events


def verify_rollout(url: str, text: str, version: str, environment: str = "PROD") -> dict:
    """Check one bot message against the 100% rollout criteria."""
    version = version.lstrip("v")
    link = parse_permalink(url)
    events = parse_messages(text)
    event = events[0] if len(events) == 1 else None

    skew = None
    if link and event:
        posted = datetime.strptime(link["posted_at_utc"], "%Y-%m-%dT%H:%M:%SZ")
        header = datetime.strptime(event["timestamp_utc"], "%Y-%m-%dT%H:%M:%SZ")
        skew = abs((posted - header).total_seconds())

    checks = [
        ("Permalink is a Slack message URL", link is not None),
        (f"Message is from channel {ROLLOUT_CHANNEL}", bool(link) and link["channel"] == ROLLOUT_CHANNEL),
        (f"Text contains exactly one bot message (found {len(events)})", event is not None),
        (f"Environment is {environment}", bool(event) and event["environment"] == environment),
        (f"Version is v{version}" + (f" (message: v{event['version']})" if event else ""),
         bool(event) and event["version"] == version),
        ("Current versionPercent is 100", bool(event) and _percent(event["criteria"]) == 100),
        ("Previous versionPercent is not 100"
         + (f" (was {_percent(event['previous_criteria'])})" if event else ""),
         bool(event) and event["previous_criteria"] is not None
         and _percent(event["previous_criteria"]) != 100),
        ("Header time matches permalink timestamp",
         skew is not None and skew <= MAX_CLOCK_SKEW_SECONDS),
    ]
    confirmed = all(ok for _, ok in checks)
    return {
        "version": version,
        "environment": environment,
        "confirmed": confirmed,
        "reached_100_at_utc": link["posted_at_utc"] if confirmed else None,
        "source_url": url,
        "message": event,
        "checks": [{"check": label, "passed": ok} for label, ok in checks],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--version", required=True, help="mongot version, e.g. 1.73.2")
    parser.add_argument("--url", required=True, help="Slack permalink of the bot message.")
    parser.add_argument("--text", required=True, help="File with the message text ('-' for stdin).")
    parser.add_argument("--environment", default="PROD")
    parser.add_argument("--output", help="Write JSON here instead of stdout.")
    args = parser.parse_args()

    if args.text == "-":
        text = sys.stdin.read()
    else:
        with open(args.text, encoding="utf-8") as fh:
            text = fh.read()
    result = verify_rollout(args.url, text, args.version, args.environment.upper())

    out = json.dumps(result, indent=2)
    if args.output:
        with open(args.output, "w", encoding="utf-8") as fh:
            fh.write(out + "\n")
        print(args.output)
    else:
        print(out)
    for check in result["checks"]:
        sys.stderr.write(f"[{'x' if check['passed'] else ' '}] {check['check']}\n")
    if not result["confirmed"]:
        sys.exit(2)


if __name__ == "__main__":
    main()
