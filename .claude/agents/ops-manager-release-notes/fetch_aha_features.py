#!/usr/bin/env python3
"""
Fetch and filter Aha! features for Ops Manager release notes.

Usage:
    python fetch_aha_features.py \
        --cutoff-date 2026-07-09 \
        --output /tmp/om-rn/features.json

    # Enumerate all product areas in the pivot (run once to populate
    # INCLUDED_PRODUCT_AREAS):
    python fetch_aha_features.py --list-product-areas

Requires:
    - AHA_API_TOKEN environment variable set
    - requests library (pip install requests)
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime

import requests

AHA_API_TOKEN = os.environ.get("AHA_API_TOKEN")
PIVOT_ID = "7603507842466029383"
BASE_URL = (
    f"https://mongodb.aha.io/api/v1/bookmarks/custom_pivots/{PIVOT_ID}"
)
AHA_BASE = "https://mongodb.aha.io/api/v1"

# Ops Manager product areas included in release notes.
# Run with --list-product-areas to enumerate all values from the pivot,
# then confirm with the writer or PM which ones belong to Ops Manager.
# NOTE: This list is provisional — verify before the first run.
INCLUDED_PRODUCT_AREAS = [
    "Ops Manager",
    "Ops Manager / Cloud Manager",
    "On-Prem / Ops Manager",
    "Backup (Ops/Cloud Manager)",
    "Backups (Ops/Cloud Manager)",
    "MongoDB Agent",
    "Automation",
    "Monitoring",
    "Deployment",
]


def get_field(row, idx):
    """Safely extract plain_value from a row column."""
    try:
        col = row[idx]
        if isinstance(col, dict):
            return col.get("plain_value", "")
        elif isinstance(col, list) and len(col) > 0:
            return col[0].get("plain_value", "")
        return ""
    except (IndexError, TypeError):
        return ""


def get_feature_ref(row):
    """Extract feature reference (e.g., ATLDEDICAT-286) from html_value."""
    try:
        col = row[0]
        if isinstance(col, dict):
            html = col.get("html_value", "")
        elif isinstance(col, list) and len(col) > 0:
            html = col[0].get("html_value", "")
        else:
            return None
        match = re.search(r'href="/features/([^"]+)"', html)
        return match.group(1) if match else None
    except (IndexError, TypeError):
        return None


def fetch_feature_details(feature_ref):
    """Fetch full feature details from Aha! API."""
    if not feature_ref:
        return None, None
    headers = {"Authorization": f"Bearer {AHA_API_TOKEN}"}
    try:
        resp = requests.get(
            f"{AHA_BASE}/features/{feature_ref}", headers=headers
        )
        resp.raise_for_status()
        data = resp.json()
        feature = data.get("feature", {})

        desc = feature.get("description", {})
        if isinstance(desc, dict):
            description = desc.get("body", "")
        else:
            description = desc or ""

        risk_status = None
        custom_fields = feature.get("custom_fields", [])
        for field in custom_fields:
            if (
                field.get("key") == "risk_status"
                or field.get("name", "").lower() == "risk status"
            ):
                risk_status = field.get("value")
                break

        if not risk_status:
            workflow = feature.get("workflow_status", {})
            if isinstance(workflow, dict):
                risk_status = workflow.get("name")

        return description, risk_status
    except Exception as e:
        print(
            f"  Warning: Could not fetch details for {feature_ref}: {e}",
            file=sys.stderr,
        )
        return None, None


def fetch_all_pages(max_pages=None):
    """Fetch all pages from Aha! API."""
    if not AHA_API_TOKEN:
        print(
            "ERROR: AHA_API_TOKEN environment variable not set",
            file=sys.stderr,
        )
        sys.exit(1)

    headers = {"Authorization": f"Bearer {AHA_API_TOKEN}"}
    all_rows = []
    page = 1

    while True:
        resp = requests.get(f"{BASE_URL}?page={page}", headers=headers)
        resp.raise_for_status()
        data = resp.json()
        rows = data.get("rows", [])
        if not rows:
            break
        all_rows.extend(rows)
        total_pages = data.get("pagination", [{}])[0].get(
            "total_pages", 1
        )
        print(
            f"Fetched page {page}/{total_pages} ({len(rows)} features)",
            file=sys.stderr,
        )
        if page >= total_pages:
            break
        if max_pages and page >= max_pages:
            break
        page += 1

    return all_rows


def list_product_areas(rows):
    """Print all distinct product area values in the pivot."""
    areas = set()
    for row in rows:
        area = get_field(row, 1)
        if area:
            areas.add(area)
    for area in sorted(areas):
        print(area)


def filter_features_by_cutoff_date(rows, cutoff_date):
    """
    Filter features scheduled for release on or before cutoff_date.

    Includes only features whose product area is in INCLUDED_PRODUCT_AREAS
    and whose Release target date (column index 6, YYYY-MM-DD) is on or
    before the given cutoff date. Features with no release date are
    excluded.

    Args:
        rows: Raw pivot rows from the Aha! API.
        cutoff_date: datetime.date — upper bound for Release target date.
    """
    features = []
    stats = {
        "total": len(rows),
        "product_area_excluded": 0,
        "date_excluded": 0,
        "included": 0,
    }

    for row in rows:
        name = get_field(row, 0)
        product_area = get_field(row, 1)
        assigned_to = get_field(row, 4)
        status = get_field(row, 5)
        release_date_str = get_field(row, 6)
        jira_url = get_field(row, 8)
        feature_ref = get_feature_ref(row)

        # Product area filter — include-list
        if product_area not in INCLUDED_PRODUCT_AREAS:
            stats["product_area_excluded"] += 1
            continue

        # Date filter — must have a release date on or before cutoff
        if not release_date_str:
            stats["date_excluded"] += 1
            continue
        try:
            release_date = datetime.strptime(
                release_date_str, "%Y-%m-%d"
            ).date()
        except ValueError:
            stats["date_excluded"] += 1
            continue
        if release_date > cutoff_date:
            stats["date_excluded"] += 1
            continue

        stats["included"] += 1
        features.append(
            {
                "name": name,
                "product_area": product_area,
                "status": status,
                "release_date": release_date_str,
                "assigned_to": assigned_to,
                "jira_url": jira_url,
                "feature_ref": feature_ref,
            }
        )

    return features, stats


def enrich_with_details(features):
    """Fetch full descriptions and risk_status for each feature."""
    print(
        f"\nFetching details for {len(features)} features...",
        file=sys.stderr,
    )
    for i, feat in enumerate(features):
        ref = feat.get("feature_ref")
        if ref:
            print(
                f"  [{i+1}/{len(features)}] Fetching {ref}...",
                file=sys.stderr,
            )
            desc, risk_status = fetch_feature_details(ref)
            feat["description"] = desc or ""
            feat["risk_status"] = risk_status or ""
        else:
            feat["description"] = ""
            feat["risk_status"] = ""
    return features


def main():
    parser = argparse.ArgumentParser(
        description="Fetch Aha! features for Ops Manager release notes"
    )
    parser.add_argument(
        "--cutoff-date",
        help=(
            "Include features with Release target date on or before "
            "this date (YYYY-MM-DD). Typically the release date of the "
            "Ops Manager patch version (e.g., 2026-07-09)."
        ),
    )
    parser.add_argument(
        "--output", help="Output JSON file path"
    )
    parser.add_argument(
        "--max-pages",
        type=int,
        default=None,
        help="Limit number of pages fetched (e.g. 1 for testing)",
    )
    parser.add_argument(
        "--list-product-areas",
        action="store_true",
        help=(
            "Print all distinct product area values in the pivot, "
            "then exit. Use once to populate INCLUDED_PRODUCT_AREAS."
        ),
    )
    args = parser.parse_args()

    if args.list_product_areas:
        print(
            "Fetching all rows to enumerate product areas...",
            file=sys.stderr,
        )
        rows = fetch_all_pages(max_pages=args.max_pages)
        print("\n=== All Product Areas in Pivot ===")
        list_product_areas(rows)
        return

    if not args.cutoff_date or not args.output:
        parser.error(
            "--cutoff-date and --output are required "
            "unless --list-product-areas is specified"
        )

    try:
        cutoff_date = datetime.strptime(args.cutoff_date, "%Y-%m-%d").date()
    except ValueError:
        parser.error(
            f"--cutoff-date must be in YYYY-MM-DD format, "
            f"got: {args.cutoff_date}"
        )

    print(
        f"Fetching Aha! features with release date <= {args.cutoff_date}...",
        file=sys.stderr,
    )
    rows = fetch_all_pages(max_pages=args.max_pages)
    print(f"Total rows fetched: {len(rows)}", file=sys.stderr)

    features, stats = filter_features_by_cutoff_date(rows, cutoff_date)

    print(f"\n=== Filtering Stats ===", file=sys.stderr)
    print(f"Total: {stats['total']}", file=sys.stderr)
    print(
        f"Excluded by product area: {stats['product_area_excluded']}",
        file=sys.stderr,
    )
    print(
        f"Excluded by date (after {args.cutoff_date} or missing): "
        f"{stats['date_excluded']}",
        file=sys.stderr,
    )
    print(f"Included: {stats['included']}", file=sys.stderr)

    features = enrich_with_details(features)

    output = {"features": features, "stats": stats}
    with open(args.output, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nWritten to {args.output}", file=sys.stderr)

    for feat in features:
        desc_preview = (
            feat.get("description", "")[:80] + "..."
            if feat.get("description")
            else "(no description)"
        )
        print(f"\n  - {feat['name']} ({feat['product_area']})")
        print(
            f"    Status: {feat['status']} | "
            f"Risk Status: {feat.get('risk_status', 'N/A')}"
        )
        print(f"    Description: {desc_preview}")


if __name__ == "__main__":
    main()
