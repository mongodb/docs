#!/usr/bin/env python3
"""
release_schedule.py

Looks up the planned 100% Atlas release date of a mongot version in the
Mongot Release Schedule spreadsheet:
https://docs.google.com/spreadsheets/d/1I3PKjZubZRg4ve7E2GtNcg9zavIWxjA9Mr99EHYZ6f0

The planned date is for reference in the review gate only. The changelog
date always comes from the confirmed rollout (rollout_signal.py).

Input is the spreadsheet as returned by Glean read_document (JSON or its
HTML page body), or a CSV export of one tab. Only tabs with a
"100% Release Date" column are read. When a version appears in more than
one tab, the last row wins and differing dates are reported as conflicts.

Rows whose cells do not line up with the header (some older rows omit
cells) are reported as unparsed instead of guessed.

Usage:
    python3 release_schedule.py --input schedule.json --version 1.73.2 [--output planned.json]

Exit code 2 when the version has no parsable row.
"""

from __future__ import annotations

import argparse
import csv
import html
import io
import json
import re
import sys
from datetime import datetime

SHEET_URL = "https://docs.google.com/spreadsheets/d/1I3PKjZubZRg4ve7E2GtNcg9zavIWxjA9Mr99EHYZ6f0"
DATE_FORMAT = "%A, %B %d, %Y"
DATE_COLUMNS = ("Branch Cut Date", "10% Release Date", "50% Release Date", "100% Release Date")
STATUS_RULES = (
    ("abandon", "abandoned"),
    ("cancel", "canceled"),
    ("skip", "skipped"),
    ("paused", "paused"),
    ("100% atlas release", "released"),
)
NON_ATLAS_TARGETS = ("community only", "gov only")


def _find_html(value) -> str | None:
    if isinstance(value, str):
        if value.lstrip().startswith(("{", "[")):
            try:
                return _find_html(json.loads(value))
            except json.JSONDecodeError:
                pass
        return value if "<tr" in value else None
    items = value.values() if isinstance(value, dict) else value if isinstance(value, list) else []
    for child in items:
        found = _find_html(child)
        if found:
            return found
    return None


def read_rows(text: str) -> list[list[str]]:
    try:
        text = _find_html(json.loads(text)) or text
    except json.JSONDecodeError:
        pass
    if "<tr" not in text:
        return [[c.strip() for c in row] for row in csv.reader(io.StringIO(text))]
    rows = []
    for tr in re.findall(r"<tr>(.*?)</tr>", text, re.DOTALL):
        cells = re.findall(r"<td>(.*?)</td>", tr, re.DOTALL)
        if not cells:
            continue
        line = html.unescape(re.sub(r"<[^>]+>", "", " ".join(cells)))
        rows.extend([c.strip() for c in row] for row in csv.reader(io.StringIO(line)))
    return rows


def _date(value: str) -> str | None:
    try:
        return datetime.strptime(value.strip(), DATE_FORMAT).strftime("%Y-%m-%d")
    except ValueError:
        return None


def _is_date_cell(value: str) -> bool:
    return value.strip().lower() in ("", "none") or _date(value) is not None


def _status(final_status: str, targets: str) -> str:
    if any(t in targets.lower() for t in NON_ATLAS_TARGETS):
        return "not_atlas_commercial"
    lower = final_status.lower()
    return next((status for key, status in STATUS_RULES if key in lower), "planned")


def parse_schedule(rows: list[list[str]]) -> tuple[dict, list[dict]]:
    """Return {version: [row records in order]} and unparsed rows."""
    schedule, unparsed, header = {}, [], None
    for row in rows:
        if row and row[0] == "Major Version":
            header = {name: i for i, name in enumerate(row) if name}
            if "100% Release Date" not in header:
                header = None
            continue
        if not header or len(row) <= header["Mongot Version"] or not row[header["Mongot Version"]].startswith("v"):
            continue
        version = row[header["Mongot Version"]].lstrip("v")
        cell = lambda name: row[header[name]] if header.get(name, len(row)) < len(row) else ""
        aligned = all(_is_date_cell(cell(c)) for c in DATE_COLUMNS if c in header) \
            and not _is_date_cell(cell("Release Captain"))
        if not aligned:
            unparsed.append({"version": version, "row": row})
            continue
        schedule.setdefault(version, []).append({
            "planned_100_date": _date(cell("100% Release Date")),
            "release_targets": cell("Release Targets"),
            "final_release_status": cell("Final Release Status"),
            "status": _status(cell("Final Release Status"), cell("Release Targets")),
        })
    return schedule, unparsed


def lookup(schedule: dict, unparsed: list[dict], version: str) -> dict:
    version = version.lstrip("v")
    records = schedule.get(version, [])
    result = {"version": version, "found": bool(records), "source_url": SHEET_URL, "warnings": []}
    if records:
        result.update(records[-1])
        dates = sorted({r["planned_100_date"] for r in records if r["planned_100_date"]})
        if len(dates) > 1:
            result["warnings"].append(f"tabs disagree on the 100% date {dates}; using the last row")
        if not result["planned_100_date"]:
            result["warnings"].append("no planned 100% date in the schedule")
        if result["status"] != "planned" and result["status"] != "released":
            result["warnings"].append(f"schedule status is {result['status']}: {result['final_release_status']}")
    elif any(u["version"] == version for u in unparsed):
        result["warnings"].append("row found but its cells do not line up with the header")
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--input", required=True, help="Glean read_document output, page HTML, or CSV ('-' for stdin).")
    parser.add_argument("--version", required=True, help="mongot version, e.g. 1.73.2")
    parser.add_argument("--output", help="Write JSON here instead of stdout.")
    args = parser.parse_args()

    text = sys.stdin.read() if args.input == "-" else open(args.input, encoding="utf-8").read()
    schedule, unparsed = parse_schedule(read_rows(text))
    result = lookup(schedule, unparsed, args.version)
    out = json.dumps(result, indent=2)
    if args.output:
        with open(args.output, "w", encoding="utf-8") as fh:
            fh.write(out + "\n")
        print(args.output)
    else:
        print(out)
    for warning in result["warnings"]:
        sys.stderr.write(f"WARNING: v{result['version']}: {warning}\n")
    if not result["found"]:
        sys.exit(2)


if __name__ == "__main__":
    main()
