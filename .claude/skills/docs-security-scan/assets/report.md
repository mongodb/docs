# {{docset}} Documentation Security Scan Report

- **Docset version:** {{resolved_version}} ({{docs.path}})
- **Date:** {{run_date}}
- **Prepared by:** docs-security-scan skill

## Summary

{{n_total}} candidate findings. After triage:

| Classification | Count | Action |
|---|---|---|
| **Confirmed** | {{n_confirmed}} | Draft tickets prepared (held for review) |
| **Writer-confirm** | {{n_writer}} | Writer resolves from in-repo evidence (sibling pages, conventions); not filed |
| **Needs engineering confirmation** | {{n_needs_eng}} | Flagged for SME; not filed |
| **Intentional** | {{n_intentional}} | No action — insecure pattern shown with an explicit caveat |
| **Low-priority** | {{n_low}} | Listed for transparency; no ticket unless requested |

> Only **Confirmed** findings become draft tickets. Intentional and Low-priority findings are listed for transparency and are never turned into tickets.

### Scope

- **Categories assessed:** {{categories_assessed}} (categories #1 counter-best-practice advice, #2 insecure code examples; #3 absent considerations {{absence_status}}).
- **Pages scanned:** {{n_pages}} ({{pages_scope}}).
- **Criteria:** universal guidelines (`references/universal-guidelines.md`) + per-docset considerations (`references/{{docset}}.yaml`).

---

## Confirmed findings

> Each Confirmed finding has a matching held draft ticket (see below).

### {{severity}}: {{finding.title}}

- **Category:** {{finding.category}}
- **Guideline:** {{finding.guideline}}
- **Affected files:** {{finding.docs_files}}
- **Docs say:** {{finding.docs_say}}
- **Evidence:** `{{finding.evidence}}` *(`{{finding.docs_location}}`)*
- **Recommended action:** {{finding.action}}

*(repeat per Confirmed finding, ordered by severity)*

---

## Writer-confirm

> Findings a writer can settle from in-repo evidence (sibling pages, docset conventions) without an engineer. Not filed; listed for the writer to resolve.

| Finding | Category | Guideline | Affected file(s) | Writer-resolvable question |
|---|---|---|---|---|
| {{finding.title}} | {{finding.category}} | {{finding.guideline}} | {{finding.docs_files}} | {{finding.writer_question}} |

## Needs engineering confirmation

| Finding | Category | Guideline | Affected file(s) | Open question for SME |
|---|---|---|---|---|
| {{finding.title}} | {{finding.category}} | {{finding.guideline}} | {{finding.docs_files}} | {{finding.open_question}} |

## Intentional

| Finding | Category | Affected file(s) | Why intentional (caveat evidence) |
|---|---|---|---|
| {{finding.title}} | {{finding.category}} | {{finding.docs_files}} | {{finding.intent_evidence}} |

## Low-priority

| Finding | Category | Guideline | Affected file(s) | Note |
|---|---|---|---|---|
| {{finding.title}} | {{finding.category}} | {{finding.guideline}} | {{finding.docs_files}} | {{finding.note}} |

---

## Findings table (all)

| # | Finding | Category | Guideline | Severity | Classification | Affected file(s) |
|---|---|---|---|---|---|---|
| {{n}} | {{finding.title}} | {{finding.category}} | {{finding.guideline}} | {{finding.severity}} | {{finding.label}} | {{finding.docs_files}} |
