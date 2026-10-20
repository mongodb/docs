"""
github_client.py

Thin wrapper around the GitHub CLI (gh) shared by the mongot release-notes
agents. The caller must have read access to the private 10gen/mongot repo
through an authenticated gh session.
"""

from __future__ import annotations

import json
import subprocess
import sys

MONGOT_REPO = "10gen/mongot"


def _run(args: list[str]) -> str | None:
    try:
        result = subprocess.run(
            ["gh", *args],
            capture_output=True,
            text=True,
            check=True,
        )
    except FileNotFoundError:
        sys.stderr.write("gh error: GitHub CLI (gh) not found on PATH\n")
        return None
    except subprocess.CalledProcessError as exc:
        sys.stderr.write(f"gh error: {exc.stderr.strip()}\n")
        return None
    return result.stdout


def run_gh_json(args: list[str]) -> dict | list | None:
    """Run a gh command and return parsed JSON output, or None on error."""
    stdout = _run(args)
    if stdout is None:
        return None
    try:
        return json.loads(stdout)
    except json.JSONDecodeError as exc:
        sys.stderr.write(f"JSON parse error: {exc}\n")
        return None


def run_gh_text(args: list[str]) -> str | None:
    """Run a gh command and return raw stdout, or None on error."""
    return _run(args)


def run_gh_lines(args: list[str]) -> list[str] | None:
    """Run a gh command and return non-empty output lines, or None on error."""
    stdout = _run(args)
    if stdout is None:
        return None
    return [line.strip() for line in stdout.splitlines() if line.strip()]
