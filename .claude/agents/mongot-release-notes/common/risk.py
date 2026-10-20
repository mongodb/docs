"""
risk.py

Rollback and reindex risk detection shared by the mongot release-notes
agents. An item is considered risky when its text indicates an on-disk
format change, a Lucene codec or segment format change, or a reindex
requirement.
"""

from __future__ import annotations

import re

ROLLBACK_SIGNALS = [
    r"on[- ]disk format",
    r"\bdisk format\b",
    r"ondiskformat",
    r"\bre-?index",
    r"\bre index",
    r"rolling back",
    r"\brollback\b",
    r"\bcodec\b",
    r"lucene (codec|format)",
    r"segment format",
]

_COMPILED = [re.compile(pat, re.IGNORECASE) for pat in ROLLBACK_SIGNALS]


def rollback_signals_found(text: str) -> list[str]:
    """Return the distinct signal phrases matched in the text, in order."""
    found: list[str] = []
    for pattern in _COMPILED:
        match = pattern.search(text or "")
        if match and match.group(0).lower() not in found:
            found.append(match.group(0).lower())
    return found


def detect_rollback_risk(text: str) -> bool:
    """Return True when the text suggests an on-disk format change."""
    return bool(rollback_signals_found(text))
