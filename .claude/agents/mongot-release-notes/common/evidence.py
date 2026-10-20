"""
evidence.py

Evidence and source-link capture shared by the mongot release-notes
agents. Every item carries an `evidence` block so reviewers can trace
each published entry back to the release, PRs, Jira tickets, and
commits it came from. Evidence is for reviewers only and must never
appear in customer-facing output.
"""

from __future__ import annotations

from release_metadata import (
    extract_commit_shas,
    extract_jira_keys,
    extract_pr_numbers,
    fetch_pr_metadata,
    jira_url,
    pr_url,
)


def build_evidence(
    text: str,
    release_url: str,
    commit_sha: str = "",
    enrich_prs: bool = False,
) -> dict:
    """Build the evidence block for one item from its source text."""
    pr_numbers = extract_pr_numbers(text)
    jira_keys = extract_jira_keys(text)
    shas = extract_commit_shas(text)
    if commit_sha and commit_sha not in shas:
        shas.insert(0, commit_sha)

    prs = []
    for number in pr_numbers:
        meta = fetch_pr_metadata(number) if enrich_prs else None
        if meta:
            for key in meta["jira_keys"]:
                if key not in jira_keys:
                    jira_keys.append(key)
            prs.append(meta)
        else:
            prs.append({"number": number, "url": pr_url(number)})

    return {
        "release_url": release_url,
        "prs": prs,
        "jira": [{"key": k, "url": jira_url(k)} for k in jira_keys],
        "commits": shas,
        "feature_flags": [],
        "source_excerpt": text[:500],
    }


def evidence_identifiers(evidence: dict) -> list[str]:
    """Internal identifiers that must not appear in customer-facing text."""
    ids = [f"#{pr['number']}" for pr in evidence.get("prs", [])]
    ids += [j["key"] for j in evidence.get("jira", [])]
    ids += [sha[:7] for sha in evidence.get("commits", [])]
    return ids


def evidence_links(evidence: dict) -> list[str]:
    """All reviewer-facing source links for an item, release link first."""
    links = [evidence.get("release_url", "")]
    links += [pr["url"] for pr in evidence.get("prs", [])]
    links += [j["url"] for j in evidence.get("jira", [])]
    return [link for link in links if link]


def evidence_summary(item: dict) -> str:
    """One-line source summary for review queues and PR descriptions."""
    ev = item.get("evidence", {})
    parts = []
    if ev.get("prs"):
        parts.append("PRs: " + ", ".join(f"#{p['number']}" for p in ev["prs"]))
    if ev.get("jira"):
        parts.append("Jira: " + ", ".join(j["key"] for j in ev["jira"]))
    if ev.get("commits"):
        parts.append("commits: " + ", ".join(s[:7] for s in ev["commits"]))
    return "; ".join(parts) or "release body only"
