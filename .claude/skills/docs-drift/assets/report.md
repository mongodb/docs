# {{property}} Documentation Accuracy Report

- **Docs version:** {{resolved_version}} ({{docs.path}})
- **Source repo:** {{source.repo}} @ {{source.ref}}
- **Date:** {{run_date}}
- **Prepared by:** docs-drift skill

## Summary

{{n_total}} candidate findings. After triage:

| Classification | Count | Action |
|---|---|---|
| **Confirmed** | {{n_confirmed}} | Draft tickets prepared (held for review) |
| **Tracked** | {{n_tracked}} | Existing DOCSP ticket named below |
| **Upcoming** | {{n_upcoming}} | No action — tied to an unreleased version |
| **Intentional** | {{n_intentional}} | No action — hidden/internal/legacy/illustrative by design |
| **Needs engineering confirmation** | {{n_needs_eng}} | Flagged for SME; not filed |

> Only **Confirmed** findings become draft tickets. Upcoming and Intentional
> findings are listed for transparency and are never turned into tickets.

### Coverage scores

| Score | Value | Formula |
|---|---|---|
| **Coverage** | {{coverage_pct}}% | Source items with any docs presence ÷ documentable surface (total − Intentional) |
| **Accuracy** | {{accuracy_pct}}% | Documented items with no Confirmed finding ÷ documented items |

- **Coverage** measures how much of the documentable surface is documented at all. Needs-engineering-confirmation items count as undocumented.
- **Accuracy** measures how much of what is documented is correct. Tracked and Upcoming items are counted as accurate (the documentation is correct for the current released version).
- Track these numbers across runs to measure progress. Coverage and accuracy are independent: a docset can score high on one and low on the other.

---

## Confirmed drift

> Each Confirmed finding has a matching held draft ticket (see below).

### {{severity}}: {{finding.title}}

- **Affected files:** {{finding.docs_files}}
- **Docs say:** {{finding.docs_say}} *(`{{finding.docs_location}}`)*
- **Source says:** {{finding.source_say}} *(`{{finding.source_symbol}}` — `{{finding.source_file}}:{{finding.source_line}}`)*
- **Recommended action:** {{finding.action}}

*(repeat per Confirmed finding, ordered by severity)*

---

## Tracked

| Finding | Affected file(s) | Matching DOCSP ticket |
|---|---|---|
| {{finding.title}} | {{finding.docs_files}} | {{finding.tracked_ticket}} |

## Upcoming

| Finding | Affected file(s) | Blocking version / eng ticket |
|---|---|---|
| {{finding.title}} | {{finding.docs_files}} | {{finding.blocking_version_or_ticket}} |

## Intentional

| Finding | Affected file(s) | Why intentional (source evidence) |
|---|---|---|
| {{finding.title}} | {{finding.docs_files}} | {{finding.intent_evidence}} |

## Needs engineering confirmation

| Finding | Affected file(s) | Open question for SME |
|---|---|---|
| {{finding.title}} | {{finding.docs_files}} | {{finding.open_question}} |

---

## Findings table (all)

| # | Finding | Affected file(s) | Severity | Classification | Linked ticket / version |
|---|---|---|---|---|---|
| {{n}} | {{finding.title}} | {{finding.docs_files}} | {{finding.severity}} | {{finding.label}} | {{finding.link}} |
