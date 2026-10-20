"""
schema.py

Canonical release-item schema shared by the mongot release-notes agents.
Both the raw fetch output and the per-agent normalized output use this
item shape. Agent-specific normalizers may only change field values;
they must not add or rename item fields.

Documents are written as YAML when PyYAML is installed, and as JSON
(a valid YAML subset) otherwise. Both formats load with load_document().
"""

from __future__ import annotations

import json
import re

SCHEMA_VERSION = 1

ITEM_TYPES = ("feature", "fix", "compatibility", "deprecation", "operational")
AVAILABILITY = ("atlas_only", "self_managed_only", "enterprise", "community", "both")
PRODUCTS = ("search", "vector_search", "unknown")
MATURITY = ("ga", "preview", "unknown")

ATLAS_ONLY_SIGNALS = [
    r"\batlas[- ]only\b",
    r"\batlas[- ]managed\b",
    r"xgen/atlas",
    r"bazel/atlas",
    r"com\.xgen\.atlas",
]
SELF_MANAGED_ONLY_SIGNALS = [
    r"\bself[- ]managed[- ]only\b",
    r"\bcommunity[- ]only\b",
]
ENTERPRISE_SIGNALS = [
    r"\benterprise[- ]only\b",
    r"\benterprise advanced\b",
    r"\benterprise edition\b",
    r"xgen/enterprise",
    r"com\.xgen\.enterprise",
]
VECTOR_SIGNALS = [
    r"\$vectorsearch",
    r"\bvector",
    r"\bembedding",
    r"\bquantiz",
    r"\bhnsw\b",
    r"\bknn\b",
]


def _match_any(text: str, patterns: list[str]) -> bool:
    lower = text.lower()
    return any(re.search(p, lower) for p in patterns)


def new_item(**fields) -> dict:
    """Return an item with every canonical field, in canonical order."""
    item = {
        "id": "",
        "type": "feature",
        "title": "",
        "description": "",
        "section": "",
        "product": "unknown",
        "availability": "both",
        "rollback_risk": False,
        "rollback_signals": [],
        "aha_maturity": "unknown",
        "requires_manual_review": False,
        "review_reasons": [],
        "review_decision": "",
        "source_url": "",
        "source_kind": "github_release",
        "evidence": {},
    }
    unknown = set(fields) - set(item)
    if unknown:
        raise ValueError(f"Unknown item fields: {sorted(unknown)}")
    item.update(fields)
    return item


def signal_text(item: dict) -> str:
    """Text used for classification: title, description, and PR labels."""
    labels = []
    for pr in item.get("evidence", {}).get("prs", []):
        labels.extend(pr.get("labels", []))
    return " ".join([item.get("title", ""), item.get("description", ""), *labels])


def classify_availability(text: str) -> str:
    if _match_any(text, ATLAS_ONLY_SIGNALS):
        return "atlas_only"
    if _match_any(text, SELF_MANAGED_ONLY_SIGNALS):
        return "self_managed_only"
    if _match_any(text, ENTERPRISE_SIGNALS):
        return "enterprise"
    return "both"


def classify_product(text: str) -> str:
    return "vector_search" if _match_any(text, VECTOR_SIGNALS) else "search"


def flag_for_review(item: dict, reason: str) -> None:
    item["requires_manual_review"] = True
    if reason not in item["review_reasons"]:
        item["review_reasons"].append(reason)


def validate_item(item: dict) -> list[str]:
    errors = []
    label = item.get("id") or item.get("title") or "(unnamed)"
    missing = set(new_item()) - set(item)
    if missing:
        errors.append(f"{label}: missing fields {sorted(missing)}")
    for field, allowed in (
        ("type", ITEM_TYPES),
        ("availability", AVAILABILITY),
        ("product", PRODUCTS),
        ("aha_maturity", MATURITY),
    ):
        if item.get(field) not in allowed:
            errors.append(f"{label}: invalid {field} {item.get(field)!r}")
    if item.get("requires_manual_review") and not item.get("review_reasons"):
        errors.append(f"{label}: flagged for review without a reason")
    return errors


def validate_document(doc: dict) -> list[str]:
    errors = []
    for key in ("version", "items"):
        if key not in doc:
            errors.append(f"document: missing {key!r}")
    for item in doc.get("items", []):
        errors.extend(validate_item(item))
    return errors


def dump_document(doc: dict, path: str) -> None:
    with open(path, "w", encoding="utf-8") as fh:
        try:
            import yaml
        except ImportError:
            json.dump(doc, fh, indent=2, ensure_ascii=False)
            return
        yaml.safe_dump(doc, fh, default_flow_style=False, allow_unicode=True, sort_keys=False)


def load_document(path: str) -> dict:
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        import yaml
        return yaml.safe_load(text)
