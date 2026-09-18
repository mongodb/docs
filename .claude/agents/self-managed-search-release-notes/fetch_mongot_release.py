#!/usr/bin/env python3
"""
fetch_mongot_release.py

Fetches a mongot GitHub release by version tag and writes structured
JSON to an output file for downstream normalization.

Usage:
    python3 fetch_mongot_release.py --version 1.71.0 [--output /tmp/raw_release.json]

Requirements:
    - GitHub CLI (gh) installed and authenticated, OR
    - GITHUB_TOKEN environment variable set
    - Python 3.9+, standard library only (json, subprocess, argparse, os, sys)

The mongot repository is private (10gen/mongot). The caller must have
read access via their authenticated gh session or GITHUB_TOKEN.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile


MONGOT_REPO = "10gen/mongot"
# Candidate tag formats: v1.71.0, 1.71.0, release-1.71.0, etc.
TAG_PREFIXES = ["v", "", "release-"]


def run_gh(args: list[str]) -> dict | list | None:
    """Run a gh CLI command and return parsed JSON output, or None on error."""
    cmd = ["gh"] + args
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=True,
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as exc:
        sys.stderr.write(f"gh error: {exc.stderr.strip()}\n")
        return None
    except json.JSONDecodeError as exc:
        sys.stderr.write(f"JSON parse error: {exc}\n")
        return None


def fetch_release(version: str) -> dict | None:
    """Try candidate tag formats and return the first matching release."""
    for prefix in TAG_PREFIXES:
        tag = f"{prefix}{version}"
        data = run_gh([
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

    # Use subprocess directly to avoid run_gh's JSON parsing (--paginate
    # with --jq produces newline-separated strings, not a JSON array).
    try:
        result = subprocess.run(
            ["gh", "api", f"repos/{MONGOT_REPO}/tags", "--paginate",
             "--jq", ".[].name"],
            capture_output=True, text=True, check=True,
        )
        tag_names = [t.strip() for t in result.stdout.splitlines() if t.strip()]
    except subprocess.CalledProcessError as exc:
        sys.stderr.write(f"gh error fetching tags: {exc.stderr.strip()}\n")
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
    data = run_gh([
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
    section derived from signal words in the message.
    """
    feature_lines: list[str] = []
    fix_lines: list[str] = []
    compat_lines: list[str] = []

    for commit in commits:
        msg = commit["message"].splitlines()[0].strip()  # subject line only
        lower = msg.lower()
        if any(k in lower for k in ("fix", "patch", "resolv", "correct", "cve", "upgrade", "backport")):
            fix_lines.append(f"- {msg}")
        elif any(k in lower for k in ("rollback", "reindex", "re-index", "on-disk", "compat", "breaking")):
            compat_lines.append(f"- {msg}")
        else:
            feature_lines.append(f"- {msg}")

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
        data = run_gh([
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


def classify_availability(text: str) -> str:
    """
    Classify an item's availability scope.

    Returns: 'atlas_only' | 'enterprise' | 'both' | 'community'

    Heuristics based on path signals described in the plan:
    - Atlas-only: references to Atlas-specific namespaces/infrastructure
    - Enterprise: references to enterprise-only paths or explicit enterprise labeling
    - Default: 'both' (community + enterprise)
    """
    lower = text.lower()

    atlas_signals = [
        "atlas-only", "atlas only", "xgen/atlas", "bazel/atlas",
        "atlas-managed", "atlas managed", "atlas search atlas",
    ]
    enterprise_signals = [
        "enterprise only", "enterprise-only", "enterprise advanced",
        "xgen/enterprise", "enterprise edition",
    ]

    if any(s in lower for s in atlas_signals):
        return "atlas_only"
    if any(s in lower for s in enterprise_signals):
        return "enterprise"
    return "both"


def detect_rollback_risk(text: str) -> bool:
    """Return True when the text suggests an on-disk format change."""
    signals = [
        "on-disk format", "on disk format", "disk format",
        "reindex", "re-index", "rolling back", "rollback",
        "codec", "segment format", "lucene format",
        "OnDiskFormat",
    ]
    lower = text.lower()
    return any(s.lower() in lower for s in signals)


def parse_release_body(body: str, version: str) -> list[dict]:
    """
    Parse the release body into structured item dicts.

    Each item has the shape expected by normalize_release_items.py.
    """
    sections = extract_sections(body)
    items: list[dict] = []

    for section_name, lines in sections.items():
        if section_name == "preamble":
            continue

        # Split on Markdown list markers (- or *)
        current_item_lines: list[str] = []
        for line in lines:
            stripped = line.strip()
            if stripped.startswith("- ") or stripped.startswith("* "):
                if current_item_lines:
                    item_text = " ".join(current_item_lines).strip()
                    items.append(
                        _build_item(item_text, section_name, version)
                    )
                current_item_lines = [stripped[2:].strip()]
            elif stripped and current_item_lines:
                current_item_lines.append(stripped)
            elif not stripped and current_item_lines:
                # Blank line ends the current item
                item_text = " ".join(current_item_lines).strip()
                items.append(_build_item(item_text, section_name, version))
                current_item_lines = []

        if current_item_lines:
            item_text = " ".join(current_item_lines).strip()
            items.append(_build_item(item_text, section_name, version))

    return items


def _build_item(text: str, section_name: str, version: str) -> dict:
    item_type = classify_item_type(text, section_name)
    availability = classify_availability(text)
    rollback_risk = detect_rollback_risk(text)

    # Force compatibility type when rollback risk detected
    if rollback_risk and item_type not in ("compatibility", "operational"):
        item_type = "compatibility"

    requires_review = (
        availability == "atlas_only"
        or "internal" in text.lower()
        or len(text) < 20  # very short items are likely incomplete
    )

    return {
        "type": item_type,
        "title": _extract_title(text),
        "description": text,
        "source_url": f"https://github.com/{MONGOT_REPO}/releases/tag/v{version}",
        "source_kind": "github_release",
        "availability": availability,
        "rollback_risk": rollback_risk,
        "requires_manual_review": requires_review,
        # aha_maturity is populated by normalize_release_items.py
        "aha_maturity": "unknown",
        "section": section_name,
    }


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

    items = parse_release_body(body, version)

    output_data = {
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
