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
2. **Insecure code examples** — `code-block`/`literalinclude` examples that demonstrate an insecure pattern (e.g. examples teaching inline secrets rather than environment variables or external secret management, per U-7 in `references/universal-guidelines.yaml`; unvalidated untrusted input fed to a query; disabled TLS; `eval`-style server-side JS from user input).
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

This is the analog of `docs-drift`'s Discovery mode, but **narrower**: there is no source-code repo to walk, no hidden-surface registry to locate, no engineering release state to derive. The only genuinely-unknown, can't-be-guessed pieces are (a) the per-docset security-consideration checklist and (b) the docset's "intentional exception" idiom. Everything else is either universal (in `references/universal-guidelines.yaml`) or mechanically extractable (Stage 1).

1. **Inspect the docset.** Read `content/<docset>/`'s `snooty.toml` (for the component, version layout, and `toc_landing_pages`), and skim the security-relevant sections (anything under `/security`, `/connect`, `/auth`, plus code-example-heavy CRUD/integration pages). Note which `.. warning::` / `.. important::` / `.. note::` callouts already caveat insecure patterns — those are the docset's existing exception idiom.
2. **Scaffold the per-docset `security_considerations` list** from the docset's own pages. Read `references/universal-guidelines.yaml` first: every universal guideline already applies to this docset, so do not restate one for the docset's option names or pages. Add a consideration only for an API, surface, or pattern no universal guideline covers (see "What belongs in a manifest" in `references/SCHEMA.md`), e.g. `laravel-validate-input-before-where-raw` or `pymongo-no-unsafe-deserialization`. If a universal guideline does not fit the docset, list it in `disable_universal` instead. A manifest with few or no considerations is normal; most per-docset knowledge is in the exception markers and fixtures.
3. **Record the exception idiom** as `exception_markers`: the RST callout directive + phrasing the docset already uses to flag a deliberately-simplified insecure example (e.g. a `.. warning::` saying "for demonstration purposes only"). A code example carrying one → **Intentional**, not Confirmed.
4. **Write the draft manifest** to `references/<docset>.yaml`. Set `component` from `snooty.toml` / the docset's Jira component (verify it; don't guess).
5. **Present it to the user** and ask them to confirm/correct the consideration list and exception markers before running the pipeline. Flag any consideration you could not ground in in-repo material rather than inventing it.

The manifest is a living per-docset artifact: fold the human's triage corrections back into it after each run.

## Pipeline

Run the four stages in order. Stage 1 (extract, resolve criteria, and batch) is scripted and deterministic; Stages 2 (scan), 3 (classify), and 4 (report + draft tickets) are agent work guided by the manifest and the universal guidelines.

### Stage 1 — Extract scannable content (scripted)

```bash
$PY scripts/extract_docs.py --docs-path <manifest.docs.path> --out /tmp/<docset>-content.json
```

This builds the docs with Snooty and walks the **rendered AST with includes resolved**, emitting the three content classes a security scan judges, each with per-file provenance and line numbers:

- **code blocks** — every `code-block` / `literalinclude` (including tabbed examples), with language, content, and the nearest preceding heading. Snooty renders `.. code-block::` as `code` nodes, not directives; a `literalinclude` is recorded once, with its rendered excerpt.
- **advisory prose** — instructional/recommending paragraphs, with the enclosing heading and whether it sits inside a `.. warning::` / `.. important::` / `.. note::` callout;
- **topic pages** — page-level metadata (page id, headings, callout inventory) so category #3 (absence) can be assessed per topic.

If `manifest.docs.surface_pages` is set, add `--pages <globs>` to restrict extraction. Otherwise all built pages are scanned.

Then resolve the criteria the scan applies to this docset:

```bash
$PY scripts/resolve_criteria.py --manifest references/<docset>.yaml --out /tmp/<docset>-criteria.yaml
```

The file holds the universal guidelines minus the manifest's `disable_universal`, plus the manifest's `security_considerations` and `exception_markers`. Stages 2 and 3 read their criteria only from this file, so a disabled guideline never reaches the scan. The script exits with an error if `disable_universal` lists an unknown id.

Finally, split the content into batches small enough for one agent read:

```bash
$PY scripts/batch_content.py split --content /tmp/<docset>-content.json --out-dir /tmp/<docset>-batches
```

Each batch (`000.json`, `001.json`, ...) holds whole pages, about 300 KB at most, and every page is in exactly one batch. A small docset gets a single batch.

**Repeated includes:** an include used on several pages appears once per page, with the same provenance file and line. Stage 1 keeps every copy, because a caveat can be on one page and not another. Stage 4 groups the repeats.

**Include provenance:** Snooty attributes tabbed examples to the *include file* (e.g. `includes/connect/insecure-tls-tabs.rst`), so a tabbed code block's `inside_callout` is `None` and its `heading` may be empty even when the *page* carries a warning about that exact code. Stage 2's cross-reference rule handles this.

### Stage 2 — Scan (agent)

Scan each batch in `/tmp/<docset>-batches/` separately; batches are independent and can run in parallel. Read the whole batch. For each extracted unit, judge it against each entry in `/tmp/<docset>-criteria.yaml`: every universal guideline (its `rule`, limited by `scope` and `exempt`, refined by `notes`) **plus** every `security_considerations` entry, across the three categories. A unit may produce zero, one, or several candidate findings.

Apply the criteria with these rules:

- **Leaked secrets are out of scope.** GitHub secret scanning already catches real, pattern-matching secrets committed to the repo (DOCSP-61901), and a placeholder (`<password>`, `***`, `YOUR_PASSWORD`) is not a secret. Do not raise leaked-secret findings for credentials or plaintext passwords in examples. Two exceptions, when the criteria file includes them: how an example obtains credentials (U-7), and MongoDB-specific key material that secret scanning does not recognize, such as CSFLE / Queryable Encryption keys (U-8).
- **Do not invent guidelines.** If content looks insecure but matches no entry in the criteria file, do not raise a candidate. Add the guideline to the universal file or the manifest first (with grounding), then re-run.

For each candidate record: `category` (one of `counter_best_practice_advice` / `insecure_code_example` / `absent_consideration`), `severity` (High / Medium / Low), `docs_say` (what the content asserts or demonstrates), `guideline` (the named rule it appears to violate or that is absent), `provenance` (file + line + heading), and a one-line `evidence` quote.

**Enumerate conservatively but do not manufacture.** Only raise a candidate when the content genuinely matches or omits a named guideline. Do not infer insecure behavior the example doesn't actually demonstrate (e.g. a `<password>` placeholder is not a leaked secret). U-7 can still flag an inline placeholder; apply its exemptions. When in doubt, raise it and let Stage 3 demote it — but do not raise pure stylistic nits that map to no guideline.

For category #3 (`absent_consideration`): only assess pages whose topic matches a manifest consideration's `applies_to` area. A consideration is "absent" only if the page covers that area with advisory or code content and none of it addresses the consideration. Do not flag absence on pages that merely mention a topic in passing.

**Exception-marker cross-reference for tabbed code.** Before raising a candidate for an insecure code block whose `inside_callout` is `None` (especially TLS-disable patterns), check the same page's `advisory` entries for a callout carrying an `exception_markers` phrase that addresses the code's pattern. If one exists, note the same-page caveat in the candidate's `deciding_signal` so Stage 3 can classify it Intentional.

For batch `NNN.json`, write the candidates (a JSON array of the above, `[]` if none) to `/tmp/<docset>-batches/NNN-candidates.json`. Then merge them:

```bash
$PY scripts/batch_content.py merge --batch-dir /tmp/<docset>-batches --out /tmp/<docset>-candidates.json
```

The merge fails if any batch has no candidates file, so a batch that was never scanned can't pass silently. Rerun Stage 2 on the missing batches, then merge again.

### Stage 3 — Classify (agent)

Read the candidates and `/tmp/<docset>-criteria.yaml`, and classify **each** into exactly one label:

- **Confirmed** — the content demonstrably violates a named guideline, or a topic that should cover a manifest consideration omits it with no caveat. Gets a held draft ticket.
- **Writer-confirm** — likely an issue, but the question is "is this deliberate?", which a writer can settle from in-repo evidence (sibling pages, docset conventions). Example: `connect.txt` omits TLS while sibling auth pages use `tls=True`. The default for judgment calls answerable from the docs. No ticket.
- **Needs-eng-confirmation** — the question requires a product/engineering judgment: the pattern may be unavoidable for the API, the behavior may be correct-but-undocumented, or the absence may reflect a product constraint. Not for "is this a deliberate simplification?" questions. No ticket until an SME confirms.
- **Intentional** — the insecure pattern is shown with an explicit caveat carrying an `exception_marker`. Verify the caveat in the *built AST* (a `sharedinclude/...` provenance counts): shared admonitions are pulled via `sharedinclude_root` and don't appear in a local `content/` grep. No action.
- **Low-priority** — real but minor (e.g. a placeholder that could be clearer). No ticket unless the user asks.

**Route judgment calls to Writer-confirm.** Reserve Confirmed for clear-cut, signature-level violations (prose that explicitly recommends disabling auth) and, for category #3, for unambiguous in-scope omissions. Reserve Needs-eng-confirmation for genuine product questions.

**General principles are weaker signals than grounded ones.** When a finding rests only on a universal guideline whose `grounding` is `general`, prefer Needs-eng-confirmation over Confirmed. Guidelines grounded in an in-repo page carry higher confidence.

Write the results to `/tmp/<docset>-classified.json` — same structure as the candidates plus a `label` and `deciding_signal` per item.

### Stage 4a — Report (agent)

Fill `assets/report.md` and write it to `/tmp/<docset>-security-report.md`. Confirmed findings appear with full Docs-says / guideline / evidence / recommended-action; Writer-confirm, Needs-eng-confirmation, Intentional, and Low-priority are listed separately and clearly marked "no ticket drafted." The findings table lists every finding with its classification. Set `{{resolved_version}}` to the docset version directory scanned (e.g. `upcoming` / `current` / `v4.17`), derived from `manifest.docs.path`.

### Stage 4b — Held draft tickets (agent)

For each **Confirmed** finding only, fill `assets/draft-ticket.md` and write it to `/tmp/<docset>-draft-tickets/<n>.md`. Map severity to priority (High→Critical-P2, Medium→Major-P3, Low→Minor-P4). Tag with `manifest.component` and the `bug` label. Confirmed findings that share a guideline and a provenance file and line come from one include used on several pages: write one draft for them and list every affected page. **Do not file them.**

Present the report and the list of held drafts to the user. Only if the user explicitly approves, file selected drafts via the `/jira` skill.

If the writer or an SME later confirms a Writer-confirm or Needs-eng-confirmation finding as real, draft it in the same format as this stage — held, and filed only on explicit user approval. If the confirmation instead shows the pattern was deliberate, fold the exception into the manifest's `exception_markers` or `security_considerations` rather than drafting a ticket.

## Validation

Unlike `docs-drift`, this skill has no objective ground truth to adjudicate against — security findings are judgments, not facts, so a per-finding answer key in the `expected-mongosync.json` sense does not fit. Validation is **spot-check based**, in three parts:

1. **False-positive regression set (the stable half).** "A caveat-bearing insecure example must NOT be Confirmed" is close to a deterministic rule applied to a fact (does the callout text carry an `exception_markers` phrase?). Pin a small set of known-Intentional fixtures per docset — e.g. for PyMongo, the `security/tls.txt` insecure-TLS tabbed examples and the `data-formats/extended-json.txt` `json_util` examples — and confirm each run keeps them at Intentional/Needs-eng, never Confirmed. Re-run after any change to the universal guidelines, a manifest's considerations, or its exception markers.

   **Fixture check.** A cheap re-run of this set without a full scan, for use after a universal-guideline change. A universal change affects every docset with a manifest, so run it across all of them. For each docset whose manifest has `validation.known_intentional` entries, keep only the fixture pages from the docset's Stage 1 output (filter `pages` by `filename`), then run Stages 2–3 on that subset. Pass if no fixture is Confirmed. Report any new Confirmed candidates on those pages for review, because they may come from the changed guideline. Docsets without fixtures get no check; say so in the result.

2. **Recall spot-check (the revisable half).** A short list of pages the writer agrees contain real issues, confirmed to surface in the report. These are reviewer judgments, not ground truth — a reviewer can later decide one isn't ticket-worthy. Treat as a living list, not an oracle.

3. **Stability check.** The core is LLM judgment, so run the scan twice on the same content and diff the finding sets. Large run-to-run drift signals that the criteria or the scan prompt need tightening, not that the content changed.

Record the false-positive fixtures inline in the manifest (`validation.known_intentional`) rather than a separate answer-key file, so they live next to the exception markers they depend on.
