---
name: docs-drift
description: >
  Detect drift between a documentation property and its source code, classify
  each finding (Confirmed / Tracked / Upcoming / Intentional / Needs-eng-
  confirmation), and draft held DOCSP tickets for confirmed drift only. Runs
  against any property given a manifest (docs source, code repo(s)). Use when a
  docs engineer wants an accuracy/drift check of a property against its source.
  Trigger phrases: "check docs drift", "accuracy report", "docs vs source
  audit", "find documentation drift", "drift check".
---

# docs-drift

Compares what the docs *say* against what the source *does*, then triages each mismatch so reviewers spend time only on real, actionable drift. Property behavior is driven entirely by a **manifest** (`references/<property>.yaml`, contract in `references/SCHEMA.md`) — there is no property-specific logic in the skill itself.

**This skill never files Jira tickets and never edits docs.** It produces a report and *held* draft tickets for human review.

## Scope

This skill covers products whose public surface is declared in code: CLI flags, config options, HTTP API request/response shapes, enums, and states. UI-driven products (those whose primary public interface is affordances in a web or desktop UI) are out of scope for this version.

## Prerequisites

- **Snooty parser** at `~/.cache/docs-mongodb-internal/local-build-check/.venv/` (shared with the `local-build-check` skill). If missing, install per that skill. All Python below uses that venv's interpreter — call it `$PY`: `PY=~/.cache/docs-mongodb-internal/local-build-check/.venv/bin/python`
  <!-- TODO: update this prereq when the team migrates off the Snooty parser -->
- **`/jira` skill** — for the optional final "file the held tickets" step and for triage ticket lookups. Never call jira-cli directly; delegate to `/jira`.
- **`gh` CLI** authenticated against the source repo's org (for triage signals: linked engineering tickets, merged-but-unreleased PRs, release state).

## Inputs

One argument: the property name. If `references/<property>.yaml` exists, run the pipeline below. If it does **not** exist, run **Discovery mode** first.

**Draft coverage review.** To check how well an in-progress docs branch covers a new feature's source — before an engineering external review — point `docs.path` in the manifest at the draft branch's snooty source root and run normally. The report's coverage and accuracy scores show engineers exactly what is and isn't documented, and Needs-eng-confirmation findings highlight surface whose documentation intent is unclear. No manifest changes are needed beyond the `docs.path` update; revert it after the review.

## Discovery mode (first run on a new docset)

Every docset has its own conventions — where the public surface lives, what its "do not document this" idiom looks like (a `// internal` comment, a hidden-options file, a naming convention, or nothing at all), which engineering project tracks it. A fresh docset has none of this recorded, so do not guess silently and do not hard-stop. Instead, **scaffold a draft manifest and confirm it with the user**:

1. **Run `/source-explorer` first** if the writer is unfamiliar with the codebase. Building a plain-language understanding of the source before writing `surface_hints` produces a more accurate manifest and avoids calibration errors on the first run.
2. Inspect `content/<property>/` and the source repo(s). Propose `source.surface_hints` from the repo layout; scan source comments for recurring "don't-document" idioms and propose them as `triage.intent_markers` candidates; detect the hidden-surface mechanism; infer `triage.eng_project` from linked tickets; set `component`.
3. Write the draft to `references/<property>.yaml` with `calibrated: false`.
4. Present it to the user and ask them to confirm/correct the surface hints and intent markers before proceeding. Do not invent details you cannot see — flag gaps instead.

The first run is a **draft for review**, not an authoritative report: its whole purpose is to surface what the docset's conventions are so the human can confirm them. Their corrections (e.g. "those `// deprecated` items are intentional") get folded back into the manifest's `intent_markers` / `hidden_surface`, and `calibrated` is flipped to `true`. The manifest is a living per-docset calibration artifact, sharpened each time a human triages.

## Pipeline

Run the five stages in order. Stages 1 (extract docs) and 3 (diff) are scripted and deterministic; Stages 2 (extract source), 4 (triage), and 5 (report + draft tickets) are agent work guided by the manifest.

### Stage 1 — Extract documented surface (scripted)

```bash
$PY scripts/extract_docs.py --docs-path <manifest.docs.path> --out /tmp/docs-surface.json
```

This builds the docs with Snooty and walks the **rendered AST with includes resolved**, emitting documented names, types, defaults, enumerated values (with a `hedged` hint and `context`), symbol mentions, and per-file provenance. Because includes are resolved, content defined in an include is never reported as missing.

If `manifest.docs.option_tables` is `true` (the property documents options as `list-table` rows whose first column is the option name, common in driver docsets), add `--option-tables` so those names enter the documented surface; otherwise they are skipped as table scaffolding and read as undocumented.

If `manifest.docs.surface_pages` is set, add `--pages <globs>` to restrict extraction to those pages only. Use this to scope a run to a sub-section of a docset — for example, the REST API reference pages within a larger property like Ops Manager:

```bash
$PY scripts/extract_docs.py --docs-path <manifest.docs.path> \
  --pages "*/reference/api/*" "*/reference/api-resources/*" \
  --out /tmp/docs-surface.json
```

Pages not matched by any glob are excluded from extraction and from the diff. Source surface items that are only documented on excluded pages will appear as candidates — apply `surface_pages` only when the corresponding `source.surface_hints` are also scoped to the same subsystem.

### Stage 2 — Extract source surface (agent)

> To understand the source in plain language before running this stage, use `/source-explorer`. Stage 2 is a structured extraction task — it does not explain; it enumerates.

Check out the source at `manifest.source.repos[].ref` (or default branch for a live run). Then, guided **only** by `manifest.source.surface_hints`, read the source and produce a structured list of the real public surface. For each item record `symbol`, `file`, `line`, and value.

**Enumerate exhaustively — do not sample.** For each surface location a hint points to, list *every* member, not just the ones that look notable:

- **Every** CLI flag / config option defined at that site (walk the whole flag registration block / option struct, not a subset). A common miss is a lone public flag amid many.
- **Every** public API request/response field (walk all struct fields, incl. nested objects and enum-typed fields and their allowed values).
- **Every** enum/state value.

For each item also capture, where present in source:

- **Defaults — including conditional ones.** If a value has more than one default constant (e.g. a base default and a different default under some condition), record *all* of them and the condition. Do not record only the first.
- **Behavioral constraints.** Usage restrictions *enforced* in source — "only valid on restart", "errors if X", min/max bounds, mutually-exclusive-with — even when expressed as a validation error or a usage string rather than a type. These are part of the public contract and are frequently the drift. Record only enforced restrictions. **Do not** record:
  - Implementation or serialization details (struct tags, `#[serde(...)]`, "not serialized")
  - Plain descriptive prose ("sent to the server during handshake")
  - Type-system null guards and range validators — e.g. C# `ArgumentNullException` / `ArgumentOutOfRangeException` guards, `Ensure.IsGreaterThanZero()` / `Ensure.IsNotNull()` helpers, Java `Objects.requireNonNull()`, Go nil checks. These enforce language-level type contracts, not user-visible behavioral restrictions. A user cannot pass a null value to a typed API — this is not drift.

  Stage 3 drops some non-enforcing strings, but excluding type-system enforcement at Stage 2 avoids generating candidates that will never be actionable.

- **Language deprecation markers.** Some languages use attributes or annotations rather than comments to mark deprecated surface: C# `[Obsolete("...")]`, Java `@Deprecated`, Python `@deprecated`. Capture the attribute/annotation text as the item's `intent_marker` field just as you would a comment substring. Do not rely solely on the manifest's `triage.intent_markers` list for these — the attribute text is on the item itself.

Also read `manifest.source.hidden_surface` locations and record which surface is intentionally hidden, and any `manifest.triage.intent_markers` substring found on an item's source comment — these feed triage, they are not drift.

Do not hardcode anything property-specific; the hints tell you where to look.

**Emit a structured `source-surface.json`** (schema in `scripts/compare_surfaces.py`) so Stage 3 can compare deterministically. Each item: `name`, `kind`, `type`, `defaults[]` (each `{value, condition}` — record *all*, conditionals included), `allowed_values[]`, `constraints[]`, `hidden`, `intent_marker`, `symbol`/`file`/`line`. Write it to `/tmp/source-surface.json`. Your job here is faithful extraction into this schema — not judgment.

### Stage 3 — Diff (scripted — deterministic)

```bash
$PY scripts/compare_surfaces.py --docs /tmp/docs-surface.json --source /tmp/source-surface.json --out /tmp/candidates.json
```

This is deterministic on purpose. The script matches every source item against the documented surface and emits a candidate for **every** mismatch — across presence, type, conditional defaults, constraints, and enum values — with no curation or early stop, so recall does not vary run to run. It applies the guards mechanically: content present in the docs surface (any include provenance) is never "missing", and hedged/illustrative value lists are never "missing values". Each candidate carries `triage_signals` (`hidden`, `intent_marker`) for the next stage.

Do not hand-diff in this stage — the determinism is the point. If a real mismatch class is being missed, fix `compare_surfaces.py` (or the Stage 2 extraction feeding it), not by adding ad-hoc agent judgment here.

### Stage 4 — Triage (agent, over the complete candidate set)

Read `/tmp/candidates.json` and classify **every** candidate into exactly one label. Because Stage 3 is exhaustive, the candidate set is complete — triage the whole list, do not re-discover or drop items.

**Start from each candidate's `suggested_label`** — the script assigns it deterministically from the candidate kind and triage signals (`undocumented_surface` → Needs-eng-confirmation; `documented_not_in_source` / `type_mismatch` / `conditional_default_undocumented` / `constraint_undocumented` / `enum_value_missing` → Confirmed; any `intent_marker` or `hidden` → Intentional). Keep `suggested_label` unless one of these overrides applies:

- **Rename → Confirmed.** An `undocumented_surface` candidate whose source name is a near-variant of a name the docs document but that does not exist in source (e.g. source `metricsLogPath` while docs document `metricsLoggingFilepath`) is a rename — the docs assert a flag that does not exist. Upgrade from Needs-eng-confirmation to **Confirmed**.
- **Tracked / Upcoming** — only when an external signal applies: an open DOCSP ticket by `manifest.component` (Tracked), or surface tied to an unreleased version (Upcoming), established from source release state / an open fix version in any `manifest.triage.eng_project` project (accepts a single key or a list), with the released anchor derived at runtime (highest `vN.N` dir; `manifest.docs.baseline_version` overrides; do not trust a single `snooty.toml` `latest-version`). Name the ticket/version.
- **External API reference (`manifest.docs.external_api_ref` is true).** When the property's reference surface is split between the prose docs site and an external generated API reference (rustdoc/`docs.rs`, Javadoc, etc.), public surface that is merely absent from `content/` is **not** drift — it is likely covered by the API reference the skill does not build. Keep such `undocumented_surface` candidates at **Needs-eng-confirmation**; never upgrade them to Confirmed on absence alone. (Renames and wrong types still apply.)

The full decision order (first match wins) lives in `references/SCHEMA.md`. Record the deciding signal for each candidate, and note any override of `suggested_label`.

**Uncalibrated docset (`manifest.calibrated` is false or absent):** the docset's intent markers and conventions are not yet human-confirmed, so the triage signals are unreliable. Be conservative — bias `Confirmed` candidates that rest only on absence-of-a-marker toward **Needs-eng-confirmation**, and present the report as a draft for human review rather than drafting tickets aggressively. Clear, signature-level mismatches (renames, wrong types) may still be Confirmed; judgment calls about intent should defer. Treat the human's corrections as calibration input for the manifest.

After classifying every candidate, write the results to `/tmp/classified.json` — same structure as `candidates.json` but with a `label` field added to each item. This file is the input to the scoring script in Stage 5a.

### Stage 5a — Report (agent)

Before filling the report, run the scoring script:

```bash
$PY scripts/score.py --classified /tmp/classified.json --out /tmp/scores.json
```

Read `coverage_pct` and `accuracy_pct` from `/tmp/scores.json` and fill the matching placeholders in the report. Then fill the rest of `assets/report.md` and write it to `/tmp/<property>-accuracy-report.md`. Confirmed findings appear with full Docs-say / Source-say / action; Upcoming and Intentional are listed separately and clearly marked "no action"; the findings table lists every finding with its classification and any linked ticket/version. Set `{{resolved_version}}` to the released-version anchor triage derived at runtime (Stage 4) — not a manifest field; if it can't be determined, use the source `ref`.

### Stage 5b — Held draft tickets (agent)

For each **Confirmed** finding only, fill `assets/draft-ticket.md` and write it to `/tmp/<property>-draft-tickets/<n>.md`. Map severity to priority (High→Critical-P2, Medium→Major-P3, Low→Minor-P4). Tag with `manifest.component` and the `bug` label. **Do not file them.**

Present the report and the list of held drafts to the user. Only if the user explicitly approves, file selected drafts via the `/jira` skill.

## Example (mongosync)

Input: `mongosync`. Representative findings and how each is classified:

- **Confirmed** — *metricsLogPath flag name.* Docs document `--metricsLoggingFilepath`; source registers the flag as `metricsLogPath` (`flags.go`) and the documented name exists nowhere in source. `documented_not_in_source` + rename → Confirmed → drafts a held ticket.
- **Confirmed** — *loadLevel conditional default.* Docs state "Default: 3"; source defines `DefaultLoadLevel=3` and `DefaultLoadLevelWithPreExistingData=2` and the option's prose never mentions the condition. `conditional_default_undocumented` → Confirmed.
- **Needs-eng-confirmation** — *enableCappedCollectionHandling.* A non-hidden public flag absent from the docs, no intent marker → undocumented public surface, intent unclear → defer to engineering, no ticket.
- **Intentional** — *INITIALIZING state.* Documented states omit it; source marks it `// external-only` → matches an intent marker → no ticket.
- *(not surfaced)* — *createIndexesBatchSize "missing type".* The type is defined in an include, which the Snooty AST resolves, so it never appears as missing — the include guard in action.

Only the two Confirmed findings become held draft tickets; the report lists all of them grouped by classification.

## Reading the five classifications

- **Confirmed** — real drift; act on it (the held drafts).
- **Tracked** — real drift, already ticketed; no new ticket.
- **Upcoming** — accurate vs source but tied to an unreleased version; revisit after that version ships.
- **Intentional** — hidden/internal/legacy/illustrative by design; leave as is.
- **Needs-eng-confirmation** — can't be settled from source alone; ask the SME.

## Validation and classification reference

`references/expected-mongosync.json` is the adjudicated answer key for mongosync — the one property with human-verified ground truth — pinned to a 2026-03-23 source/docs snapshot. It serves two purposes:

1. **Classification exemplar.** It is a worked example of all five labels with per-finding `docs_say` / `source_say` / `rationale` / `detection_notes`. Use it to calibrate triage on properties that have no answer key of their own — the reasoning (include resolution, hedged-language suppression, source intent markers, defer-when-unmarked) is property-agnostic.

2. **Regression baseline.** To check the skill still behaves, run the pipeline against the pinned mongosync fixture and compare findings to the answer key: the three Confirmed items appear as Confirmed, the two known false positives (`hotDocIDs`, `createIndexesBatchSize`) do **not** appear as Confirmed, and the remaining seven classify as Intentional / Needs-eng-confirmation as recorded. Compare directly against `expected.json`; no separate scorer is committed.

Other pilot properties are validated qualitatively, not scored: a coherent classified report plus either a correctly-formed draft ticket or a clear "no confirmed drift" result.
