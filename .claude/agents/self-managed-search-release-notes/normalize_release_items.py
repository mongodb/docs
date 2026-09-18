#!/usr/bin/env python3
"""
normalize_release_items.py

Reads the raw JSON output from fetch_mongot_release.py and produces a
canonical YAML file of release items for downstream writing skills.

Responsibilities:
  1. Remove Atlas-only items (hard filter — never published in self-managed docs).
  2. Confirm availability labels (enterprise vs. community vs. both).
  3. Force compatibility type when rollback/reindex risk is detected.
  4. Attempt an Aha! cross-reference for feature items; set aha_maturity.
  5. Flag items that require manual operator review before publishing.
  6. Write the normalized YAML to the output path.

Usage:
    python3 normalize_release_items.py \\
        --input /tmp/mongot_1.71.0_abc.json \\
        --version 1.71.0 \\
        --release-date 2026-07-15 \\
        --output normalized_items.yaml

The Aha! lookup requires AHA_API_KEY and AHA_SUBDOMAIN environment
variables. If these are not set, aha_maturity defaults to 'unknown' and
the item is flagged for manual review.

Python 3.9+, stdlib + PyYAML. Install: pip install pyyaml
"""

import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.parse
from datetime import date

try:
    import yaml
except ImportError:
    sys.exit(
        "ERROR: PyYAML is required. Install with: pip install pyyaml"
    )


# ---------------------------------------------------------------------------
# Aha! integration
# ---------------------------------------------------------------------------

AHA_API_KEY = os.environ.get("AHA_API_KEY", "")
AHA_SUBDOMAIN = os.environ.get("AHA_SUBDOMAIN", "mongodb")
AHA_PRODUCT_LINE = "mongot"  # adjust if Aha product line key differs


def query_aha_for_feature(title: str, description: str) -> str:
    """
    Cross-reference a feature title/description against Aha! and return
    the maturity state: 'ga' | 'preview' | 'unknown'.

    Uses the Aha! features search API. Returns 'unknown' on any error.
    """
    if not AHA_API_KEY:
        return "unknown"

    query = urllib.parse.quote(title[:80])
    url = (
        f"https://{AHA_SUBDOMAIN}.aha.io/api/v1/features"
        f"?q={query}&per_page=5"
    )
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {AHA_API_KEY}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception as exc:  # noqa: BLE001
        sys.stderr.write(f"Aha! lookup failed for '{title}': {exc}\n")
        return "unknown"

    features = data.get("features", [])
    if not features:
        return "unknown"

    # Use the first match; in practice the operator should review mismatches
    first = features[0]
    workflow_status = (
        first.get("workflow_status", {}).get("name", "").lower()
    )

    if any(k in workflow_status for k in ("shipped", "released", "ga", "general availability")):
        return "ga"
    if any(k in workflow_status for k in ("preview", "beta", "early access")):
        return "preview"

    return "unknown"


# ---------------------------------------------------------------------------
# Filtering helpers
# ---------------------------------------------------------------------------

ATLAS_ONLY_SIGNALS = [
    r"\batlas[- ]only\b",
    r"\batlas[- ]managed\b",
    r"xgen/atlas",
    r"bazel/atlas",
    r"atlas search atlas",
    r"com\.xgen\.atlas",
]

ENTERPRISE_SIGNALS = [
    r"\benterprise[- ]only\b",
    r"\benterprise advanced\b",
    r"xgen/enterprise",
    r"com\.xgen\.enterprise",
    r"\benterprise edition\b",
]

ROLLBACK_SIGNALS = [
    r"on[- ]disk format",
    r"reindex",
    r"re[- ]index",
    r"rolling back",
    r"\brollback\b",
    r"lucene codec",
    r"segment format",
    r"ondiskformat",
]


def _match(text: str, patterns: list[str]) -> bool:
    lower = text.lower()
    for pat in patterns:
        if re.search(pat, lower):
            return True
    return False


def refine_availability(item: dict) -> str:
    """Re-check availability based on title + description text."""
    text = f"{item.get('title', '')} {item.get('description', '')}"
    if _match(text, ATLAS_ONLY_SIGNALS):
        return "atlas_only"
    if _match(text, ENTERPRISE_SIGNALS):
        return "enterprise"
    return item.get("availability", "both")


def refine_type(item: dict) -> str:
    """
    Force 'compatibility' when rollback/reindex risk is present and the
    type hasn't already been set to compatibility or operational.
    """
    current = item.get("type", "feature")
    if current in ("compatibility", "operational"):
        return current
    text = f"{item.get('title', '')} {item.get('description', '')}"
    if _match(text, ROLLBACK_SIGNALS):
        return "compatibility"
    return current


def should_flag_for_review(item: dict) -> bool:
    """Return True when manual review is required before publishing."""
    if item.get("requires_manual_review"):
        return True
    # Any item with no reliable description
    if not item.get("description", "").strip():
        return True
    # Features with unknown Aha! maturity
    if item.get("type") == "feature" and item.get("aha_maturity") == "unknown":
        return True
    return False


# ---------------------------------------------------------------------------
# Main normalization
# ---------------------------------------------------------------------------

def normalize(
    raw: dict,
    version: str,
    release_date: str,
) -> dict:
    raw_items: list[dict] = raw.get("items", [])
    normalized: list[dict] = []
    atlas_only_dropped = 0

    for raw_item in raw_items:
        # Re-run classification with updated signals
        availability = refine_availability(raw_item)

        # Hard filter: drop Atlas-only items
        if availability == "atlas_only":
            sys.stderr.write(
                f"  [DROPPED] Atlas-only: {raw_item.get('title', '(no title)')}\n"
            )
            atlas_only_dropped += 1
            continue

        item_type = refine_type(raw_item)

        # Aha! cross-reference for feature items
        aha_maturity = raw_item.get("aha_maturity", "unknown")
        if item_type == "feature" and aha_maturity == "unknown":
            aha_maturity = query_aha_for_feature(
                raw_item.get("title", ""),
                raw_item.get("description", ""),
            )

        item = {
            "type": item_type,
            "title": raw_item.get("title", ""),
            "description": raw_item.get("description", ""),
            "source_url": raw_item.get("source_url", ""),
            "source_kind": raw_item.get("source_kind", "github_release"),
            "availability": availability,
            "rollback_risk": raw_item.get("rollback_risk", False) or _match(
                f"{raw_item.get('title', '')} {raw_item.get('description', '')}",
                ROLLBACK_SIGNALS,
            ),
            "aha_maturity": aha_maturity,
            "requires_manual_review": False,
            "section": raw_item.get("section", ""),
        }

        # Final review flag (after Aha! lookup)
        item["requires_manual_review"] = should_flag_for_review(item)

        normalized.append(item)

    # Summary
    sys.stderr.write(
        f"Normalized {len(normalized)} items "
        f"({atlas_only_dropped} Atlas-only dropped, "
        f"{sum(1 for i in normalized if i['requires_manual_review'])} flagged for review).\n"
    )

    return {
        "version": version,
        "release_date": release_date,
        "source_tag": raw.get("tag_name", f"v{version}"),
        "source_url": raw.get("html_url", ""),
        "published_at": raw.get("published_at", ""),
        "item_count": len(normalized),
        "atlas_only_dropped": atlas_only_dropped,
        "items": normalized,
    }


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Normalize raw mongot release JSON into structured YAML."
    )
    parser.add_argument("--input", required=True, help="Path to raw_release.json")
    parser.add_argument("--version", required=True, help="mongot version (e.g. 1.71.0)")
    parser.add_argument(
        "--release-date",
        required=True,
        help="Release date in ISO format (e.g. 2026-07-15)",
    )
    parser.add_argument(
        "--output",
        default="normalized_items.yaml",
        help="Output YAML path (default: normalized_items.yaml)",
    )
    args = parser.parse_args()

    version = args.version.lstrip("v")

    # Validate date format
    try:
        date.fromisoformat(args.release_date)
    except ValueError:
        sys.exit(f"ERROR: release-date must be ISO format (YYYY-MM-DD), got: {args.release_date}")

    with open(args.input, encoding="utf-8") as fh:
        raw = json.load(fh)

    result = normalize(raw, version, args.release_date)

    with open(args.output, "w", encoding="utf-8") as fh:
        yaml.dump(result, fh, default_flow_style=False, allow_unicode=True, sort_keys=False)

    print(args.output)
    sys.stderr.write(f"Written to: {args.output}\n")

    # Surface items needing review
    flagged = [i for i in result["items"] if i.get("requires_manual_review")]
    if flagged:
        sys.stderr.write(
            f"\n{len(flagged)} item(s) flagged for manual review:\n"
        )
        for item in flagged:
            sys.stderr.write(f"  - [{item['type']}] {item['title']}\n")
        sys.stderr.write(
            "Review these items before running the writing skills.\n"
        )


if __name__ == "__main__":
    main()
