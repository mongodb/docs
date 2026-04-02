#!/usr/bin/env python3
"""
Fetch and filter Aha! features for Atlas release notes.

Usage:
    python fetch_aha_features.py --start-date 2026-02-25 --end-date 2026-03-04 --output /tmp/features.json

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
BASE_URL = f"https://mongodb.aha.io/api/v1/bookmarks/custom_pivots/{PIVOT_ID}"
AHA_BASE = "https://mongodb.aha.io/api/v1"

# Excluded product areas (handled elsewhere or not customer-facing Atlas features)
EXCLUDED_PRODUCT_AREAS = [
    # Original exclusions
    "Drivers/Client Libraries",
    "MongoDB University",
    "Documentation",
    "Backups (Ops/Cloud Manager)",
    # Additional exclusions - separate release notes or not Atlas-specific
    "Retention",
    "Search Community and EA",
    "Model Context Protocol (MCP)",
    "Monetization",
    "Activation",
    "IDEs",
    "Ecosystem and Partner Integrations",
    "Terraform, CFN, CDK, Vault and Atlas SDKs",
    "Marketing",
    "App Frameworks, ODMs and Integrations",
    "MongoDB Shell",
    "Disaggregated Storage",
    "Atlas CLI",
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
        # Extract from href="/features/ATLDEDICAT-286"
        match = re.search(r'href="/features/([^"]+)"', html)
        return match.group(1) if match else None
    except (IndexError, TypeError):
        return None


def fetch_feature_details(feature_ref):
    """Fetch full feature details from Aha! API and return description and risk_status."""
    if not feature_ref:
        return None, None
    headers = {"Authorization": f"Bearer {AHA_API_TOKEN}"}
    try:
        resp = requests.get(f"{AHA_BASE}/features/{feature_ref}", headers=headers)
        resp.raise_for_status()
        data = resp.json()
        feature = data.get("feature", {})

        # Get description
        desc = feature.get("description", {})
        if isinstance(desc, dict):
            description = desc.get("body", "")
        else:
            description = desc or ""

        # Get risk_status from workflow_status or custom field
        # Risk status may be in different locations depending on Aha! config
        risk_status = None

        # Check custom fields
        custom_fields = feature.get("custom_fields", [])
        for field in custom_fields:
            if field.get("key") == "risk_status" or field.get("name", "").lower() == "risk status":
                risk_status = field.get("value")
                break

        # Also check workflow_status as fallback
        if not risk_status:
            workflow = feature.get("workflow_status", {})
            if isinstance(workflow, dict):
                risk_status = workflow.get("name")

        return description, risk_status
    except Exception as e:
        print(f"  Warning: Could not fetch details for {feature_ref}: {e}", file=sys.stderr)
        return None, None


def parse_date(date_str):
    """Parse date string from Aha! (YYYY-MM-DD format)."""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        return None


def fetch_all_pages(max_pages=None):
    """Fetch all pages from Aha! API."""
    if not AHA_API_TOKEN:
        print("ERROR: AHA_API_TOKEN environment variable not set", file=sys.stderr)
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
        total_pages = data.get("pagination", [{}])[0].get("total_pages", 1)
        print(f"Fetched page {page}/{total_pages} ({len(rows)} features)", file=sys.stderr)
        if page >= total_pages:
            break
        if max_pages and page >= max_pages:
            break
        page += 1

    return all_rows


def filter_features(rows, start_date, end_date):
    """Filter features by date range and product area."""
    features = []
    stats = {
        "total": len(rows),
        "date_excluded": 0,
        "product_area_excluded": 0,
        "included": 0
    }

    for row in rows:
        # Column mapping: 0=Name, 1=Product Area, 4=Assigned To, 5=Status, 6=Release date, 8=Jira URL
        name = get_field(row, 0)
        product_area = get_field(row, 1)
        assigned_to = get_field(row, 4)
        status = get_field(row, 5)
        release_date_str = get_field(row, 6)
        jira_url = get_field(row, 8)
        feature_ref = get_feature_ref(row)

        release_date = parse_date(release_date_str)

        # Date filter
        if not release_date or release_date < start_date or release_date > end_date:
            stats["date_excluded"] += 1
            continue

        # Product area filter
        if product_area in EXCLUDED_PRODUCT_AREAS:
            stats["product_area_excluded"] += 1
            continue

        stats["included"] += 1
        features.append({
            "name": name,
            "product_area": product_area,
            "status": status,
            "release_date": release_date_str,
            "assigned_to": assigned_to,
            "jira_url": jira_url,
            "feature_ref": feature_ref
        })

    return features, stats


def enrich_with_details(features):
    """Fetch full descriptions and risk_status for each filtered feature."""
    print(f"\nFetching details for {len(features)} features...", file=sys.stderr)
    for i, feat in enumerate(features):
        ref = feat.get("feature_ref")
        if ref:
            print(f"  [{i+1}/{len(features)}] Fetching {ref}...", file=sys.stderr)
            desc, risk_status = fetch_feature_details(ref)
            feat["description"] = desc or ""
            feat["risk_status"] = risk_status or ""
        else:
            feat["description"] = ""
            feat["risk_status"] = ""
    return features


def main():
    parser = argparse.ArgumentParser(description="Fetch Aha! features for Atlas release notes")
    parser.add_argument("--start-date", required=True, help="Start date (YYYY-MM-DD)")
    parser.add_argument("--end-date", required=True, help="End date (YYYY-MM-DD)")
    parser.add_argument("--output", required=True, help="Output JSON file path")
    parser.add_argument("--max-pages", type=int, default=None, help="Limit number of pages fetched (e.g. 1 for testing)")
    args = parser.parse_args()

    start_date = datetime.strptime(args.start_date, "%Y-%m-%d")
    end_date = datetime.strptime(args.end_date, "%Y-%m-%d")

    print(f"Fetching Aha! features for {args.start_date} to {args.end_date}...", file=sys.stderr)
    rows = fetch_all_pages(max_pages=args.max_pages)
    print(f"Total features fetched: {len(rows)}", file=sys.stderr)

    features, stats = filter_features(rows, start_date, end_date)

    print(f"\n=== Filtering Stats ===", file=sys.stderr)
    print(f"Total: {stats['total']}", file=sys.stderr)
    print(f"Excluded by date: {stats['date_excluded']}", file=sys.stderr)
    print(f"Excluded by product area: {stats['product_area_excluded']}", file=sys.stderr)
    print(f"Included: {stats['included']}", file=sys.stderr)

    # Fetch full details (descriptions and risk_status) for filtered features
    features = enrich_with_details(features)

    output = {"features": features, "stats": stats}
    with open(args.output, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nWritten to {args.output}", file=sys.stderr)

    # Print summary grouped by date to stdout
    by_date = {}
    for feat in features:
        d = feat["release_date"]
        if d not in by_date:
            by_date[d] = []
        by_date[d].append(feat)

    for date in sorted(by_date.keys()):
        print(f"\n{date}:")
        for feat in by_date[date]:
            desc_preview = feat.get('description', '')[:80] + '...' if feat.get('description') else '(no description)'
            print(f"  - {feat['name']} ({feat['product_area']})")
            print(f"    Status: {feat['status']} | Risk Status: {feat.get('risk_status', 'N/A')}")
            print(f"    Description: {desc_preview}")


if __name__ == "__main__":
    main()

