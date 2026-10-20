"""
release_metadata.py

PR and Jira metadata extraction shared by the mongot release-notes
agents. Extraction is regex-based and offline; PR enrichment through
the GitHub API is optional and requires an authenticated gh session.
"""

from __future__ import annotations

import re

from github_client import MONGOT_REPO, run_gh_json

JIRA_BROWSE_BASE = "https://jira.mongodb.org/browse"

PR_REF_RE = re.compile(r"(?<![\w/&])#(\d{2,6})\b|/pull/(\d+)\b")
JIRA_KEY_RE = re.compile(r"\b([A-Z][A-Z0-9]{1,9}-\d{1,7})\b")
COMMIT_SHA_RE = re.compile(r"\b[0-9a-f]{7,40}\b")

# Uppercase prefixes that look like Jira keys but are standards or
# identifiers (UTF-8, SHA-256, CVE-2025-1234, ...).
NON_TICKET_PREFIXES = {
    "AES", "ARM", "BM25", "CVE", "HTTP", "INT", "ISO", "RFC", "SHA",
    "SSL", "TLS", "UTF", "X509",
}


def _dedupe(values: list) -> list:
    seen = set()
    out = []
    for value in values:
        if value not in seen:
            seen.add(value)
            out.append(value)
    return out


def extract_pr_numbers(text: str) -> list[int]:
    numbers = []
    for match in PR_REF_RE.finditer(text):
        numbers.append(int(match.group(1) or match.group(2)))
    return _dedupe(numbers)


def extract_jira_keys(text: str) -> list[str]:
    keys = [
        m.group(1)
        for m in JIRA_KEY_RE.finditer(text)
        if m.group(1).split("-")[0] not in NON_TICKET_PREFIXES
    ]
    return _dedupe(keys)


def extract_commit_shas(text: str) -> list[str]:
    shas = [
        m.group(0)
        for m in COMMIT_SHA_RE.finditer(text)
        if re.search(r"[a-f]", m.group(0)) and re.search(r"[0-9]", m.group(0))
    ]
    return _dedupe(shas)


def jira_url(key: str) -> str:
    return f"{JIRA_BROWSE_BASE}/{key}"


def pr_url(number: int, repo: str = MONGOT_REPO) -> str:
    return f"https://github.com/{repo}/pull/{number}"


def fetch_pr_metadata(number: int, repo: str = MONGOT_REPO) -> dict | None:
    """Fetch title, labels, and merge date for a PR. Returns None on error."""
    data = run_gh_json(["api", f"repos/{repo}/pulls/{number}"])
    if not isinstance(data, dict) or "number" not in data:
        return None
    text = f"{data.get('title') or ''}\n{data.get('body') or ''}"
    return {
        "number": data["number"],
        "url": data.get("html_url") or pr_url(number, repo),
        "title": data.get("title") or "",
        "labels": [lbl.get("name", "") for lbl in data.get("labels", [])],
        "merged_at": data.get("merged_at") or "",
        "jira_keys": extract_jira_keys(text),
    }
