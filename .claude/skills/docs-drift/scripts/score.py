#!/usr/bin/env python3
"""
Compute coverage and accuracy from a Stage 4 classified candidates file and
the Stage 2b-final source surface.

  coverage = documented / documentable
  accuracy = (documented - wrong) / (documented + wrong_docs_only)

Inputs:
  --classified  candidates.json with a "label" on each item (Stage 4).
                Stage 4 may append agent-found Confirmed drift as items of
                kind "agent_finding" with no source anchor.
  --source      source-surface.json (Stage 2b-final). A Stage 2a draft is
                refused: scoring a draft denominator is meaningless.

documentable = source items minus hidden items, intent-marker items, and
               presence gaps (kind undocumented_surface) labeled Intentional,
               Upcoming, or Not-drift. Tracked and Confirmed gaps never exit:
               a ticket is a fix plan, not coverage.
documented    = documentable - uncovered. A presence gap with any other label
               (Confirmed, Needs-eng-confirmation, Tracked, unknown) is
               uncovered.
wrong         = Confirmed candidates that are not pure presence gaps:
               source-anchored mismatches (type/default/constraint/enum) plus
               agent_finding items.
wrong_docs_only = Confirmed documented_not_in_source claims. They join the
               accuracy denominator as well as the numerator, so every
               subtracting term sits in the pool it subtracts from.

Items join by (normalized name, kind, file), which compare_surfaces.py
carries verbatim from the source item it flagged. Labels match exactly —
Stage 4 writes the canonical spellings. An empty documentable surface scores
null, not 100.
"""

import argparse
import json
import re
import sys

# Candidate kinds that indicate the item is absent from the docs entirely.
COVERAGE_REDUCING_KINDS = {"undocumented_surface"}

# Presence-gap labels that mean "this absence is fine".
NON_GAP_LABELS = {"Intentional", "Upcoming", "Not-drift"}

# Labels that keep an item in the denominator even when a NON_GAP label is
# also present: the docs are still wrong about that absence.
HARD_GAP_LABELS = {"Confirmed", "Tracked"}

# Stage 4 convention for agent-found Confirmed drift the differ cannot see.
AGENT_FINDING = "agent_finding"

# Draft-only fields; their presence means the surface is a 2a draft.
DRAFT_ONLY_FIELDS = ("confidence", "doc_name")


def norm(s):
    if not s:
        return ""
    s = s.strip().strip("`'\"").lstrip("-")
    return re.sub(r"[^a-z0-9._]", "", s.lower())


def key(item):
    """Identity of a source item / candidate: (normalized name, kind, file)."""
    return (
        norm(item.get("source_name") or item.get("name") or ""),
        item.get("source_kind") or item.get("kind") or "",
        item.get("source_file") or item.get("file") or "",
    )


def score(classified, source):
    candidates = classified.get("candidates", [])

    # Anchor presence-gap candidates to the source items they came from.
    by_item = {}
    for c in candidates:
        if c.get("kind") == AGENT_FINDING:
            continue                      # anchorless by construction
        k = key(c)
        if k[0]:                          # documented_not_in_source has none
            by_item.setdefault(k, []).append(c)

    # Deduplicate the source surface: one unit per distinct (name, kind, file).
    seen = {}
    for it in source.get("items", []):
        seen.setdefault(key(it), it)

    def gap_labels(it):
        return [c.get("label") for c in by_item.get(key(it), [])
                if c.get("kind") in COVERAGE_REDUCING_KINDS]

    documentable = 0
    uncovered = 0
    for it in seen.values():
        if it.get("hidden") or it.get("intent_marker"):
            continue
        g = gap_labels(it)
        if any(x in NON_GAP_LABELS for x in g) \
                and not any(x in HARD_GAP_LABELS for x in g):
            continue                      # absence is fine: not expected
        documentable += 1
        if any(x not in NON_GAP_LABELS for x in g):
            uncovered += 1
    documented = documentable - uncovered

    wrong_anchored = sum(
        1 for c in candidates
        if c.get("label") == "Confirmed"
        and c.get("kind") not in COVERAGE_REDUCING_KINDS
        and c.get("kind") not in (AGENT_FINDING, "documented_not_in_source"))
    wrong_agent = sum(
        1 for c in candidates
        if c.get("label") == "Confirmed" and c.get("kind") == AGENT_FINDING)
    wrong_docs_only = sum(
        1 for c in candidates
        if c.get("label") == "Confirmed"
        and c.get("kind") == "documented_not_in_source")

    coverage_pct = None
    if documentable > 0:
        coverage_pct = round(documented / documentable * 100, 1)
    accuracy_denominator = documented + wrong_docs_only
    accuracy_pct = None
    if accuracy_denominator > 0:
        accuracy_pct = round(
            max(0.0, (documented - wrong_anchored - wrong_agent)
                / accuracy_denominator * 100), 1)

    return {
        "coverage_pct": coverage_pct,
        "accuracy_pct": accuracy_pct,
        "documented_items": documented,
        "documentable_surface": documentable,
        "uncovered_items": uncovered,
        "accuracy_confirmed": wrong_anchored + wrong_docs_only + wrong_agent,
        "total_candidates": len(candidates),
        "total_source": len(seen),
        "total": len(candidates),
    }


def main():
    ap = argparse.ArgumentParser(
        description=("Compute coverage and accuracy. Coverage is measured "
                     "against the full Stage 2b-final source surface "
                     "(--source), not the candidate set."))
    ap.add_argument("--classified", required=True,
                    help="path to classified.json (candidates with labels)")
    ap.add_argument("--source", required=True,
                    help="path to source-surface.json (Stage 2b-final output)")
    ap.add_argument("--out", help="write JSON result to this path (default: stdout)")
    args = ap.parse_args()

    with open(args.classified) as f:
        classified = json.load(f)
    with open(args.source) as f:
        source = json.load(f)

    if any(f in it for it in source.get("items", [])
           for f in DRAFT_ONLY_FIELDS):
        sys.exit("ERROR: --source is a Stage 2a draft (items carry "
                 "confidence/doc_name). Finalize the surface with Stage 2b "
                 "before scoring.")

    result = score(classified, source)

    text = json.dumps(result, indent=2)
    if args.out:
        with open(args.out, "w") as f:
            f.write(text)
        fmt = lambda v: "N/A" if v is None else f"{v}%"
        print(
            f"coverage: {fmt(result['coverage_pct'])}  "
            f"accuracy: {fmt(result['accuracy_pct'])}  "
            f"({result['documented_items']}/{result['documentable_surface']} "
            f"of {result['total_source']} source items documented)",
            file=sys.stderr,
        )
    else:
        print(text)


if __name__ == "__main__":
    main()
