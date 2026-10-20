"""
aha.py

Best-effort Aha! maturity lookup for feature items, shared by the mongot
release-notes agents. Requires the AHA_API_KEY environment variable
(and optionally AHA_SUBDOMAIN). Returns 'unknown' when unavailable.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.parse
import urllib.request

AHA_API_KEY = os.environ.get("AHA_API_KEY", "")
AHA_SUBDOMAIN = os.environ.get("AHA_SUBDOMAIN", "mongodb")


def query_aha_maturity(title: str) -> str:
    """Return 'ga' | 'preview' | 'unknown' for a feature title."""
    if not AHA_API_KEY:
        return "unknown"

    query = urllib.parse.quote(title[:80])
    url = f"https://{AHA_SUBDOMAIN}.aha.io/api/v1/features?q={query}&per_page=5"
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
        sys.stderr.write(f"Aha! lookup failed for '{title}': {type(exc).__name__}\n")
        return "unknown"

    features = data.get("features", [])
    if not features:
        return "unknown"

    status = (features[0].get("workflow_status") or {}).get("name", "").lower()
    if any(k in status for k in ("shipped", "released", "general availability")) or status == "ga":
        return "ga"
    if any(k in status for k in ("preview", "beta", "early access")):
        return "preview"
    return "unknown"
