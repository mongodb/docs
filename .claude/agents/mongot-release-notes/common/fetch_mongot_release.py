#!/usr/bin/env python3
"""
fetch_mongot_release.py

Shared by the self-managed and Atlas mongot release-notes agents.
Fetches a mongot GitHub release by version tag and writes raw JSON in
the canonical item schema (see schema.py) for the agent-specific
normalizers.

Usage:
    python3 fetch_mongot_release.py --version 1.71.0 \\
        [--output /tmp/raw_release.json] [--enrich-prs]

Requirements:
    - GitHub CLI (gh) installed and authenticated with read access to
      the private 10gen/mongot repository
    - Python 3.9+, standard library only

--enrich-prs fetches each referenced PR's title, labels, and linked
Jira keys into the item's evidence block (one API call per PR).
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import tempfile

from evidence import build_evidence
from github_client import MONGOT_REPO, run_gh_json, run_gh_lines
from release_metadata import extract_jira_keys
from risk import detect_rollback_risk, rollback_signals_found
from schema import (
    SCHEMA_VERSION,
    classify_availability,
    classify_product,
    flag_for_review,
    new_item,
    signal_text,
)

# Candidate tag formats: v1.71.0, 1.71.0, release-1.71.0, etc.
TAG_PREFIXES = ["v", "", "release-"]


def fetch_release(version: str) -> dict | None:
    """Try candidate tag formats and return the first matching release."""
    for prefix in TAG_PREFIXES:
        tag = f"{prefix}{version}"
        data = run_gh_json([
            "api",
            f"repos/{MONGOT_REPO}/releases/tags/{tag}",
        ])
        if data and "tag_name" in data:
            sys.stderr.write(f"Found release for tag: {tag}\n")
            return data
    return None


def find_previous_tag(version: str) -> str | None:
    """
    Find the tag that immediately precedes the given version tag in the
    repository's sorted tag list.  Returns the tag name string or None.
    """
    def version_key(tag_name: str) -> tuple:
        # Strip common prefixes so we sort numerically
        stripped = re.sub(r"^[vV]", "", tag_name)
        parts = stripped.split(".")
        try:
            return tuple(int(p) for p in parts)
        except ValueError:
            return (0,)

    # --paginate with --jq produces newline-separated strings, not a JSON array.
    tag_names = run_gh_lines(
        ["api", f"repos/{MONGOT_REPO}/tags", "--paginate", "--jq", ".[].name"]
    )
    if tag_names is None:
        return None

    # Filter to semver-looking tags only
    semver_re = re.compile(r"^v?\d+\.\d+\.\d+$")
    tag_names = [t for t in tag_names if semver_re.match(t)]

    target = f"v{version}" if not version.startswith("v") else version
    if target not in tag_names:
        return None

    sorted_tags = sorted(tag_names, key=version_key)
    idx = sorted_tags.index(target)
    if idx == 0:
        return None
    return sorted_tags[idx - 1]


def fetch_commits_between_tags(prev_tag: str, this_tag: str) -> list[dict]:
    """
    Use the GitHub compare API to get commits between two tags.
    Returns a list of dicts with 'sha' and 'message' keys.
    """
    data = run_gh_json([
        "api",
        f"repos/{MONGOT_REPO}/compare/{prev_tag}...{this_tag}",
    ])
    if not data or "commits" not in data:
        return []
    result = []
    for c in data["commits"]:
        result.append({
            "sha": c.get("sha", ""),
            "message": c.get("commit", {}).get("message", ""),
        })
    return result


def build_release_from_commits(
    version: str, commits: list[dict], tag_date: str
) -> dict:
    """
    Synthesise a release-like dict from a list of commits so it can be
    processed by the same parse_release_body / _build_item pipeline.

    Each commit message is turned into a Markdown list item under a
    section derived from signal words in the message. The commit SHA is
    appended so evidence capture can link the item to its commit.
    """
    feature_lines: list[str] = []
    fix_lines: list[str] = []
    compat_lines: list[str] = []

    for commit in commits:
        msg = commit["message"].splitlines()[0].strip()  # subject line only
        line = f"- {msg} (commit {commit['sha']})" if commit.get("sha") else f"- {msg}"
        lower = msg.lower()
        if any(k in lower for k in ("fix", "patch", "resolv", "correct", "cve", "upgrade", "backport")):
            fix_lines.append(line)
        elif any(k in lower for k in ("rollback", "reindex", "re-index", "on-disk", "compat", "breaking")):
            compat_lines.append(line)
        else:
            feature_lines.append(line)

    sections = []
    if fix_lines:
        sections.append("## Bug Fixes\n" + "\n".join(fix_lines))
    if compat_lines:
        sections.append("## Compatibility\n" + "\n".join(compat_lines))
    if feature_lines:
        sections.append("## Features\n" + "\n".join(feature_lines))

    body = "\n\n".join(sections)

    return {
        "tag_name": f"v{version}",
        "name": f"v{version}",
        "published_at": tag_date,
        "html_url": f"https://github.com/{MONGOT_REPO}/releases/tag/v{version}",
        "body": body,
        "_source": "commit_log_fallback",
    }


def fetch_tag_metadata(version: str) -> dict | None:
    """
    Fetch lightweight tag metadata (tagger date) as a fallback when the
    release has no published_at set.
    """
    for prefix in TAG_PREFIXES:
        tag = f"{prefix}{version}"
        data = run_gh_json([
            "api",
            f"repos/{MONGOT_REPO}/git/refs/tags/{tag}",
        ])
        if data:
            return data
    return None


def extract_sections(body: str) -> dict:
    """
    Parse the GitHub release body into named sections.

    Recognises Markdown headings (## or ###) as section delimiters.
    Returns a dict mapping lowercase section name → list of raw lines.
    An 'preamble' key collects any lines before the first heading.
    """
    sections: dict[str, list[str]] = {"preamble": []}
    current = "preamble"
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("## ") or stripped.startswith("### "):
            heading = stripped.lstrip("#").strip().lower()
            sections[heading] = []
            current = heading
        else:
            sections[current].append(line)
    return sections


def classify_item_type(text: str, section_name: str) -> str:
    """
    Return a normalized item type based on section heading and text signals.

    Types: feature | fix | compatibility | deprecation | operational
    """
    lower = text.lower()
    section = section_name.lower()

    if any(k in section for k in ("bug", "fix", "patch")):
        return "fix"
    if any(k in section for k in ("compat", "breaking", "rollback", "reindex")):
        return "compatibility"
    if any(k in section for k in ("deprecat",)):
        return "deprecation"
    if any(k in section for k in ("operational", "upgrade", "migration")):
        return "operational"

    # Signal words in the item text itself
    if any(k in lower for k in ("fixed", "resolv", "patch", "corrected")):
        return "fix"
    if any(k in lower for k in ("deprecated", "removed", "breaking")):
        return "deprecation"
    if any(k in lower for k in ("rollback", "reindex", "re-index", "on-disk format")):
        return "compatibility"

    return "feature"


def parse_release_body(
    body: str,
    release_url: str,
    source_kind: str = "github_release",
    enrich_prs: bool = False,
) -> list[dict]:
    """
    Parse the release body into canonical item dicts (see schema.py).
    """
    sections = extract_sections(body)
    texts: list[tuple[str, str]] = []

    for section_name, lines in sections.items():
        if section_name == "preamble":
            continue

        # Split on Markdown list markers (- or *)
        current_item_lines: list[str] = []
        for line in lines:
            stripped = line.strip()
            if stripped.startswith("- ") or stripped.startswith("* "):
                if current_item_lines:
                    texts.append((" ".join(current_item_lines).strip(), section_name))
                current_item_lines = [stripped[2:].strip()]
            elif stripped and current_item_lines:
                current_item_lines.append(stripped)
            elif not stripped and current_item_lines:
                # Blank line ends the current item
                texts.append((" ".join(current_item_lines).strip(), section_name))
                current_item_lines = []

        if current_item_lines:
            texts.append((" ".join(current_item_lines).strip(), section_name))

    return [
        _build_item(i, text, section, release_url, source_kind, enrich_prs)
        for i, (text, section) in enumerate(texts, start=1)
    ]


def _build_item(
    index: int,
    text: str,
    section_name: str,
    release_url: str,
    source_kind: str,
    enrich_prs: bool,
) -> dict:
    evidence = build_evidence(text, release_url, enrich_prs=enrich_prs)
    clean = strip_identifiers(text)

    item = new_item(
        id=f"item-{index:03d}",
        type=classify_item_type(clean, section_name),
        title=_extract_title(clean),
        description=clean,
        section=section_name,
        source_url=release_url,
        source_kind=source_kind,
        evidence=evidence,
    )
    classify_text = signal_text(item)
    item["product"] = classify_product(classify_text)
    item["availability"] = classify_availability(classify_text)
    item["rollback_risk"] = detect_rollback_risk(classify_text)
    item["rollback_signals"] = rollback_signals_found(classify_text)

    # Force compatibility type when rollback risk detected
    if item["rollback_risk"] and item["type"] not in ("compatibility", "operational"):
        item["type"] = "compatibility"

    if "internal" in clean.lower():
        flag_for_review(item, "internal-only signal in source text")
    if len(clean) < 20:
        flag_for_review(item, "description too short to publish")
    if source_kind == "commit_log_fallback":
        flag_for_review(item, "sourced from commit log, not a release body")
    return item


def strip_identifiers(text: str) -> str:
    """Remove PR refs, commit refs, and Jira keys from item prose."""
    text = re.sub(r"\(commit [0-9a-f]{7,40}\)", "", text)
    text = re.sub(r"\((?:#\d+(?:,\s*)?)+\)", "", text)
    text = re.sub(r"(?<![\w/&])#\d{2,6}\b", "", text)
    text = re.sub(r"https://github\.com/\S+/pull/\d+", "", text)
    for key in extract_jira_keys(text):
        text = re.sub(rf"\[?{re.escape(key)}\]?:?", "", text)
    text = re.sub(r"\(\s*[,;\s]*\)", "", text)
    return re.sub(r"\s{2,}", " ", text).strip()


def _extract_title(text: str) -> str:
    """
    Derive a short title from the first sentence or up to 80 chars.
    Strips trailing punctuation from partial sentences.
    """
    # Take up to the first period, colon, or 80 chars
    for sep in (".", ":", "\n"):
        idx = text.find(sep)
        if 0 < idx <= 80:
            return text[:idx].strip().rstrip(".,;:")
    return text[:80].strip().rstrip(".,;:")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fetch a mongot GitHub release and write raw JSON."
    )
    parser.add_argument(
        "--version",
        required=True,
        help="mongot version to fetch (e.g. 1.71.0)",
    )
    parser.add_argument(
        "--output",
        help="Path for the output JSON file. Defaults to a temp file.",
    )
    parser.add_argument(
        "--enrich-prs",
        action="store_true",
        help="Fetch PR titles, labels, and linked Jira keys into evidence.",
    )
    args = parser.parse_args()

    version = args.version.lstrip("v")  # normalise

    release = fetch_release(version)
    if not release:
        sys.stderr.write(
            f"WARNING: No GitHub release found for v{version}. "
            "Falling back to tag-to-tag commit comparison.\n"
        )
        prev_tag = find_previous_tag(version)
        if not prev_tag:
            sys.exit(
                f"ERROR: Could not determine previous tag for v{version}. "
                "Cannot build commit-log fallback."
            )
        this_tag = f"v{version}" if not version.startswith("v") else version
        sys.stderr.write(
            f"Comparing {prev_tag}...{this_tag} for commit log.\n"
        )
        commits = fetch_commits_between_tags(prev_tag, this_tag)
        if not commits:
            sys.exit(
                f"ERROR: No commits found between {prev_tag} and {this_tag}."
            )
        # Get tag date from the annotated tag object
        tag_meta = fetch_tag_metadata(version)
        tag_date = ""
        if tag_meta and isinstance(tag_meta, dict):
            tagger = tag_meta.get("tagger") or {}
            tag_date = tagger.get("date", "")
        release = build_release_from_commits(version, commits, tag_date)

    body = release.get("body") or ""
    if not body.strip():
        sys.stderr.write(
            "WARNING: Release body is empty. The output will have no items.\n"
        )

    release_url = release.get("html_url") or (
        f"https://github.com/{MONGOT_REPO}/releases/tag/v{version}"
    )
    items = parse_release_body(
        body,
        release_url,
        source_kind=release.get("_source", "github_release"),
        enrich_prs=args.enrich_prs,
    )

    output_data = {
        "schema_version": SCHEMA_VERSION,
        "version": version,
        "tag_name": release.get("tag_name"),
        "published_at": release.get("published_at"),
        "html_url": release.get("html_url"),
        "release_name": release.get("name"),
        "raw_body": body,
        "items": items,
        "item_count": len(items),
    }

    if args.output:
        out_path = args.output
    else:
        tmp = tempfile.mkstemp(prefix=f"mongot_{version}_", suffix=".json")
        os.close(tmp[0])
        out_path = tmp[1]

    with open(out_path, "w", encoding="utf-8") as fh:
        json.dump(output_data, fh, indent=2, ensure_ascii=False)

    print(out_path)
    sys.stderr.write(
        f"Fetched {len(items)} items from release '{release.get('name', version)}'.\n"
        f"Output: {out_path}\n"
    )


if __name__ == "__main__":
    main()
