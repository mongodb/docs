---
name: docs-security-scan
internal: true
description: >
  Scan a documentation docset for security issues: prose advice that runs counter to security best practices, code examples containing security issues, and absence of critical security considerations on architecture/application topics. Manifest-driven like docs-drift, but the core is a criteria-guided LLM judgment pass over docs content rather than a deterministic diff against source. Classifies each finding (Confirmed / Writer-confirm / Needs-eng-confirmation / Intentional / Low-priority), writes a report, and drafts held DOCSP tickets for Confirmed findings only. Use when a docs engineer wants a security scan of a docset. Trigger phrases: "security scan", "scan docs for security", "docs security audit", "security review docs".
---

# docs-security-scan

Checks what the docs *say and show* against an explicit set of security criteria — both universal MongoDB-relevant guidelines and per-docset considerations — and triages each candidate so reviewers spend time only on real, actionable issues. Unlike `docs-drift`, there is no source-code ground truth to diff against; the "source of truth" here is the criteria set itself, so the skill is fundamentally an LLM judgment pass whose quality depends on those criteria being explicit and grounded.

**This skill never edits docs and never files Jira tickets on its own.** It produces a report and *held* draft tickets for human review.

## Scope

This skill scans documentation *content* for security problems in three categories:

1. **Counter-best-practice advice** — prose that instructs or recommends something contrary to security best practice (e.g. telling users to disable authentication, recommending string concatenation into query/JSON strings, advising TLS-off without justification).
2. **Insecure code examples** — `code-block`/`literalinclude` examples that demonstrate an insecure pattern (e.g. examples teaching inline secrets rather than environment variables or external secret management — actionable only via a per-docset consideration, see "Notes for Stage 2" in `references/universal-guidelines.md`; unvalidated untrusted input fed to a query; disabled TLS; `eval`-style server-side JS from user input).
3. **Absence of critical considerations** — architecture or application-code topics that omit a security consideration the manifest declares should appear for that area.

**Out of scope (covered by other tooling):** secret/credential scanning in the repo (GitHub secret scanning) and dependency/supply-chain issues (Dependabot). Do not raise findings in those classes. For a security review of code changes on the current branch rather than published docs content, use the `security-review` skill instead.

UI-driven docsets whose content is mostly affordance descriptions are poor fits: there is little advisory prose or code to judge. Prefer docsets where code examples appear on most pages — driver docsets, `mongosh`, Atlas CLI — and instructional/application content dominates over UI walkthroughs.

## Prerequisites

- **Snooty parser** at `~/.cache/docs-mongodb-internal/local-build-check/.venv/` (shared with the `local-build-check` and `docs-drift` skills). If missing, install per the `local-build-check` skill. All Python below uses that venv's interpreter — call it `$PY`: `PY=~/.cache/docs-mongodb-internal/local-build-check/.venv/bin/python`
- **`/jira` skill** — for the optional final "file the held tickets" step and for ticket lookups. Never call jira-cli directly; delegate to `/jira`.

## Inputs

One argument: the docset name — a directory under `content/` (e.g. `pymongo-driver`), resolved to `content/<docset>/`. The skill scans only docsets in this repository's `content/` directory. When writing or reading a manifest, load `references/SCHEMA.md` for its field contract and the label decision order. If `references/<docset>.yaml` exists, run the pipeline below. If it does not, run **Stage 0 (Manifest setup)** first.

## Stage 0 — Manifest setup (first run on a new docset)

Every docset has its own security-relevant surface: which topics are covered, what code-example idioms appear, what counts as a *deliberate* pedagogical simplification versus a real lapse. A fresh docset has none of this recorded, so do not guess silently. Instead, scaffold a draft manifest and confirm it with the user.

This is the analog of `docs-drift`'s Discovery mode, but **narrower**: there is no source-code repo to walk, no hidden-surface registry to locate, no engineering release state to derive. The only genuinely-unknown, can't-be-guessed pieces are (a) the per-docset security-consideration checklist and (b) the docset's "intentional exception" idiom. Everything else is either universal (in `references/universal-guidelines.md`) or mechanically extractable (Stage 1).

1. **Inspect the docset.** Read `content/<docset>/`'s `snooty.toml` (for the component, version layout, and `toc_landing_pages`), and skim the security-relevant sections (anything under `/security`, `/connect`, `/auth`, plus code-example-heavy CRUD/integration pages). Note which `.. warning::` / `.. important::` / `.. note::` callouts already caveat insecure patterns — those are the docset's existing exception idiom.
2. **Scaffold the per-docset `security_considerations` list** from in-repo material: the docset's own security pages, the shared drivers best-practices page (`content/drivers/source/client-libraries-best-practices.txt`) — applicable to driver docsets and to non-driver docsets whose examples go through a driver, such as framework/integration guides — and the universal guidelines. Each consideration is a short, named rule keyed to a topic area (e.g. `connection-strings-must-use-tls`, `validate-untrusted-input-before-json-to-bson`, `no-server-side-js-from-user-input`).
3. **Record the exception idiom** as `exception_markers`: the RST callout directive + phrasing the docset already uses to flag a deliberately-simplified insecure example (e.g. a `.. warning::` saying "for demonstration purposes only"). A code example carrying one → **Intentional**, not Confirmed.
4. **Write the draft manifest** to `references/<docset>.yaml`. Set `component` from `snooty.toml` / the docset's Jira component (verify it; don't guess).
5. **Present it to the user** and ask them to confirm/correct the consideration list and exception markers before running the pipeline. Flag any consideration you could not ground in in-repo material rather than inventing it.

The manifest is a living per-docset artifact: fold the human's triage corrections back into it after each run.

## Pipeline

Run the four stages in order. Stage 1 (extract) is scripted and deterministic; Stages 2 (scan), 3 (classify), and 4 (report + draft tickets) are agent work guided by the manifest and the universal guidelines.

### Stage 1 — Extract scannable content (scripted)

```bash
$PY scripts/extract_docs.py --docs-path <manifest.docs.path> --out /tmp/<docset>-content.json
```

This builds the docs with Snooty and walks the **rendered AST with includes resolved**, emitting the three content classes a security scan judges, each with per-file provenance and line numbers:

- **code blocks** — every `code-block` / `literalinclude` (including tabbed examples), with language, content, and the nearest preceding heading. Snooty renders `.. code-block::` as `code` nodes, not directives; a `literalinclude` is recorded once, with its rendered excerpt.
- **advisory prose** — instructional/recommending paragraphs, with the enclosing heading and whether it sits inside a `.. warning::` / `.. important::` / `.. note::` callout;
- **topic pages** — page-level metadata (page id, headings, callout inventory) so category #3 (absence) can be assessed per topic.

If `manifest.docs.surface_pages` is set, add `--pages <globs>` to restrict extraction. Otherwise all built pages are scanned.

**Include provenance:** Snooty attributes tabbed examples to the *include file* (e.g. `includes/connect/insecure-tls-tabs.rst`), so a tabbed code block's `inside_callout` is `None` and its `heading` may be empty even when the *page* carries a warning about that exact code. Stage 2's cross-reference rule handles this.

### Stage 2 — Scan (agent)

Read `/tmp/<docset>-content.json`. For each extracted unit, judge it against the criteria in `references/universal-guidelines.md` **plus** the manifest's `security_considerations`, across the three categories. A unit may produce zero, one, or several candidate findings.

For each candidate record: `category` (one of `counter_best_practice_advice` / `insecure_code_example` / `absent_consideration`), `severity` (High / Medium / Low), `docs_say` (what the content asserts or demonstrates), `guideline` (the named rule it appears to violate or that is absent), `provenance` (file + line + heading), and a one-line `evidence` quote.

**Enumerate conservatively but do not manufacture.** Only raise a candidate when the content genuinely matches or omits a named guideline. Do not infer insecure behavior the example doesn't actually demonstrate (e.g. a `<password>` placeholder is not a leaked secret). A manifest consideration about how examples retrieve credentials can still flag an inline placeholder; apply its own exemptions. When in doubt, raise it and let Stage 3 demote it — but do not raise pure stylistic nits that map to no guideline.

For category #3 (`absent_consideration`): only assess pages whose topic matches a manifest consideration's `applies_to` area. A consideration is "absent" only if the page covers that area with advisory or code content and none of it addresses the consideration. Do not flag absence on pages that merely mention a topic in passing.

**Exception-marker cross-reference for tabbed code.** Before raising a candidate for an insecure code block whose `inside_callout` is `None` (especially TLS-disable patterns), check the same page's `advisory` entries for a callout carrying an `exception_markers` phrase that addresses the code's pattern. If one exists, note the same-page caveat in the candidate's `deciding_signal` so Stage 3 can classify it Intentional.

Emit a structured `candidates.json` (array of the above) to `/tmp/<docset>-candidates.json`.

### Stage 3 — Classify (agent)

Read the candidates and classify **each** into exactly one label:

- **Confirmed** — the content demonstrably violates a named guideline, or a topic that should cover a manifest consideration omits it with no caveat. Gets a held draft ticket.
- **Writer-confirm** — likely an issue, but the question is "is this deliberate?", which a writer can settle from in-repo evidence (sibling pages, docset conventions). Example: `connect.txt` omits TLS while sibling auth pages use `tls=True`. The default for judgment calls answerable from the docs. No ticket.
- **Needs-eng-confirmation** — the question requires a product/engineering judgment: the pattern may be unavoidable for the API, the behavior may be correct-but-undocumented, or the absence may reflect a product constraint. Not for "is this a deliberate simplification?" questions. No ticket until an SME confirms.
- **Intentional** — the insecure pattern is shown with an explicit caveat carrying an `exception_marker`. Verify the caveat in the *built AST* (a `sharedinclude/...` provenance counts): shared admonitions are pulled via `sharedinclude_root` and don't appear in a local `content/` grep. No action.
- **Low-priority** — real but minor (e.g. a placeholder that could be clearer). No ticket unless the user asks.

**Route judgment calls to Writer-confirm.** Reserve Confirmed for clear-cut, signature-level violations (prose that explicitly recommends disabling auth) and, for category #3, for unambiguous in-scope omissions. Reserve Needs-eng-confirmation for genuine product questions.

Write the results to `/tmp/<docset>-classified.json` — same structure as the candidates plus a `label` and `deciding_signal` per item.

### Stage 4a — Report (agent)

Fill `assets/report.md` and write it to `/tmp/<docset>-security-report.md`. Confirmed findings appear with full Docs-says / guideline / evidence / recommended-action; Writer-confirm, Needs-eng-confirmation, Intentional, and Low-priority are listed separately and clearly marked "no ticket drafted." The findings table lists every finding with its classification. Set `{{resolved_version}}` to the docset version directory scanned (e.g. `upcoming` / `current` / `v4.17`), derived from `manifest.docs.path`.

### Stage 4b — Held draft tickets (agent)

For each **Confirmed** finding only, fill `assets/draft-ticket.md` and write it to `/tmp/<docset>-draft-tickets/<n>.md`. Map severity to priority (High→Critical-P2, Medium→Major-P3, Low→Minor-P4). Tag with `manifest.component` and the `bug` label. **Do not file them.**

Present the report and the list of held drafts to the user. Only if the user explicitly approves, file selected drafts via the `/jira` skill.

If the writer or an SME later confirms a Writer-confirm or Needs-eng-confirmation finding as real, draft it in the same format as this stage — held, and filed only on explicit user approval. If the confirmation instead shows the pattern was deliberate, fold the exception into the manifest's `exception_markers` or `security_considerations` rather than drafting a ticket.

## Validation

Unlike `docs-drift`, this skill has no objective ground truth to adjudicate against — security findings are judgments, not facts, so a per-finding answer key in the `expected-mongosync.json` sense does not fit. Validation is **spot-check based**, in three parts:

1. **False-positive regression set (the stable half).** "A caveat-bearing insecure example must NOT be Confirmed" is close to a deterministic rule applied to a fact (does the callout text carry an `exception_markers` phrase?). Pin a small set of known-Intentional fixtures per docset — e.g. for PyMongo, the `security/tls.txt` insecure-TLS tabbed examples and the `data-formats/extended-json.txt` `json_util` examples — and confirm each run keeps them at Intentional/Needs-eng, never Confirmed. Re-run after any change to the universal guidelines, a manifest's considerations, or its exception markers.

2. **Recall spot-check (the revisable half).** A short list of pages the writer agrees contain real issues, confirmed to surface in the report. These are reviewer judgments, not ground truth — a reviewer can later decide one isn't ticket-worthy. Treat as a living list, not an oracle.

3. **Stability check.** The core is LLM judgment, so run the scan twice on the same content and diff the finding sets. Large run-to-run drift signals that the criteria or the scan prompt need tightening, not that the content changed.

Record the false-positive fixtures inline in the manifest (`validation.known_intentional`) rather than a separate answer-key file, so they live next to the exception markers they depend on.
