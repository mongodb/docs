---
name: docs-drift
internal: true
description: >
  Detect drift between a documentation property and its source code, classify
  each finding (Confirmed / Tracked / Upcoming / Intentional / Needs-eng-
  confirmation / Not-drift), and draft held DOCSP tickets for confirmed drift
  only. Runs
  against any property given a manifest (docs source, code repo(s)). Use when a
  docs engineer wants an accuracy/drift check of a property against its source.
  Trigger phrases: "check docs drift", "accuracy report", "docs vs source
  audit", "find documentation drift", "drift check".
---

# docs-drift

Compares what the docs *say* against what the source *does*, then triages each mismatch so reviewers spend time only on real, actionable drift. Property behavior is driven entirely by a **manifest** (`references/<property>.yaml`, contract in `references/SCHEMA.md`) — there is no property-specific logic in the skill itself.

**This skill never files Jira tickets and never edits docs.** It produces a report and *held* draft tickets for human review.

## Scope

Products whose public surface is declared in code: CLI flags, config options, HTTP API request/response shapes, enums, and states. UI-driven products (primary interface a web or desktop UI) are out of scope.

## Prerequisites

- **Snooty parser** at `~/.cache/docs-mongodb-internal/local-build-check/.venv/` (shared with `local-build-check`; install per that skill if missing). All Python below uses that venv's interpreter: `PY=~/.cache/docs-mongodb-internal/local-build-check/.venv/bin/python`
  <!-- TODO: update this prereq when the team migrates off the Snooty parser -->
- **`/jira` skill** — for the optional final "file the held tickets" step and triage ticket lookups. Never call jira-cli directly; delegate to `/jira`.
- **`gh` CLI** authenticated against the source repo's org (triage signals: linked eng tickets, merged-but-unreleased PRs, release state).

## Inputs

One argument: the property name. If `references/<property>.yaml` exists, run the pipeline below; otherwise run **Discovery mode** first.

**Draft coverage review.** To check how well an in-progress docs branch covers a new feature's source, point `docs.path` at the draft branch's snooty source root and run normally — the scores show what is and isn't documented, and Needs-eng-confirmation findings flag unclear intent. Revert `docs.path` after.

## Discovery mode (first run on a new docset)

Each docset has its own conventions — where the public surface lives, its "do not document" idiom, which eng project tracks it — and a fresh docset has none recorded. Do not guess silently, do not hard-stop — **scaffold a draft manifest and confirm it with the user**:

1. **Run `/source-explorer` first** if the writer is unfamiliar with the codebase — plain-language understanding produces more accurate `surface_hints` and fewer calibration errors.
2. Inspect `content/<property>/` and the source repo(s): propose `source.surface_hints` from the repo layout, scan comments for recurring "don't-document" idioms as `triage.intent_markers` candidates, detect the hidden-surface mechanism, infer `triage.eng_project` from linked tickets, set `component`.
3. Write the draft to `references/<property>.yaml` with `calibrated: false`.
4. Present it for confirmation — do not invent details you cannot see; flag gaps instead.

The first run is a **draft for review**, not an authoritative report. Human corrections fold back into `intent_markers` / `hidden_surface`, then `calibrated` flips to `true` — the manifest is a living per-docset calibration artifact.

## Adding a new idiom

A new language needs **one thin extractor module** — `scripts/idiom_<name>.py` (shipped: `scripts/idiom_java_jaxrs.py`, `scripts/idiom_go_flags.py`), exposing the `extract(repo_dir, roots)` contract documented in `references/SCHEMA.md`. Regexes and language recognition only; no engine changes ever. Shipped extractors run ~210 lines (Go flags) to ~425 lines (Java JAX-RS) — size scales with the language's declaration surface, so treat the line count as a scope smell-test for engine logic drifting into an idiom module, not a hard cap.

Onboard by **harvest**, never by speculation: Stage 2b logs every hand-seeded item on the first run; when the same mechanical fact appears twice across seed logs, harvest it into the extractor as a regex or recognition rule. Never write idiom code speculatively — harvest only what a real run proved the scripts cannot see.

## Pipeline

Run the five stages in order: 1 (extract docs) and 3 (diff) are scripted and deterministic; 2 (extract source) is script-seeded (2a) then agent-verified (2b); 4 (triage) and 5 (report + draft tickets) are agent work guided by the manifest.

### Stage 1 — Extract documented surface (scripted)

```bash
$PY scripts/extract_docs.py --docs-path <manifest.docs.path> --out /tmp/docs-surface.json
```

Builds the docs with Snooty and walks the **rendered AST with includes resolved**, emitting documented names, types, defaults, and each field's enumerated `values`, plus symbol mentions and per-file provenance. Content defined in an include is never reported as missing.

Manifest flags (semantics in `references/SCHEMA.md`): if `docs.option_tables` is `true`, add `--option-tables` so options documented as `list-table` rows enter the documented surface instead of being skipped as table scaffolding. If `docs.surface_pages` is set, add `--pages <globs>` to restrict extraction to those pages (e.g. `--pages "*/reference/api/*"` for the REST API reference within a larger property like Ops Manager) — pages not matched are excluded from extraction and the diff, so scope `surface_pages` and the matching `source.surface_hints` together.

**Sub-family scoping.** Some docsets (Ops Manager) group one large reference surface into API families, and a run is best scoped to a single family: restrict the docs side with the family's page glob (`--pages "*/reference/api/admin/*"`) and the source side with the matching `families:` entry's `source_roots` (the Stage 2a `--roots` preset). For a concrete routing example, see the ADMIN entry in `references/ops-manager.yaml`: it routes an admin-family run to the `reference/api/admin/*` page globs (all admin reference pages, no others) and to the 15 admin `source_roots` classes — the JAX-RS resources, `Api*View` models, and backing enums for the admin/keyVault/backup-settings endpoints — passed straight to Stage 2a as `--roots`.

### Stage 2 — Extract source surface (script-seeded 2a + agent-verified 2b)

> For plain-language understanding of the source first, use `/source-explorer` — Stage 2 is structured extraction: it does not explain, it enumerates.

**2a** emits a deterministic draft with `scripts/scan_source.py` — a thin CLI over the language-agnostic engine (`scripts/surface_engine.py`) plus one recognizer module per language (architecture in `references/SCHEMA.md`). **2b** reviews and fills the draft with everything needing reading judgment; the draft is not final.

**2a — Scripted draft.** Fetch the source at `manifest.source.repos[].ref` (or default branch for a live run) — for a large monorepo (Ops Manager) prefer a partial + sparse checkout (`git clone --filter=blob:none --sparse <url> <tree>`, then `git -C <tree> sparse-checkout set <the same dirs you pass to --roots>`); a plain `git clone --depth 1 -b <ref>` is fine for smaller repos (mongosync). If the fetch fails (repo moved, bad URL, stale ref) or the checkout is missing any `--roots` path, stop and fix it before scanning — an empty or partial source surface diffs as spuriously "documented", a false-clean report that is worse than a loud failure. Re-locate the surface with gh code search, correct the manifest (or the roots), and re-fetch. Then run the scanner:

```bash
$PY scripts/scan_source.py --idiom java_jaxrs \
  --repo-dir <tree> \
  --roots 'server/src/main/com/xgen/svc/mms/api/res/*' \
         'server/src/main/com/xgen/**/_public/view/*' \
         'server/src/main/com/xgen/**/_public/model/*' \
  --path-transform '{"strip_base":"/api/public/v1.0","placeholders":{"groupId":"PROJECT-ID"}}' \
  --nested-naming dotted \
  --out /tmp/source-surface.draft.json
```

For a Go property (e.g. mongosync: `--idiom go --roots 'internal/<module>/msoptions/*' 'internal/<module>/constants/*' 'shared/publicapi/*' 'internal/webserver/*'`). Pass `--intent-markers` (comma-separated `triage.intent_markers`) to auto-tag items from their enclosing block; read the stderr summary and its `HUMAN-VERIFY` / `hint` notices. `confidence: auto` items still get a review pass, and `endpoint_hints` are a completeness checklist, **not** diff input.

The engine automates only the lossless subset: enum constants (as `allowed_values` on their typed fields), JSON field names from `@JsonProperty`/`json:"..."` tags, `@QueryParam`/`@PathParam` params with `@DefaultValue`, structural hidden markers, and nested-member emission (`--nested-naming`, per `docs.nested_naming`). The rest is deliberately left to 2b.

**2b — Agent review & fill.** Guided `only` by `manifest.source.surface_hints`, review every `confidence: auto` item, verify the `hint`-confidence items (hidden mounts, unresolved `@JsonProperty(CONST)`, const-name Go flags), and fill what needs reading judgment:

**Seed, don't reconstruct.** Seed what regexes structurally cannot see — dependency-jar types, enforced constraints, envelope params — and log every seed; the seed log is the harvest backlog (Stage 5a). Nested members and enum `allowed_values` are **not** seeded: the engine emits them deterministically, so verify rather than rebuild. Do not hand-reconstruct nested `<parent>.<member>` chains or enum values — if a walk stops short, fix `source_roots` / `docs.nested_naming` so the next run is deterministic instead of hand-filling this one.

- **Endpoint names.** `endpoint_hints` carry raw source paths (`GET /api/public/v1.0/...`). For API-reference docsets do **not** copy endpoint items into the final file — the docs side has no endpoint tokens, so they can never match at Stage 3; use `doc_name` for any endpoint you keep.
- **Enumerate exhaustively — do not sample.** For each surface location a hint points to, list *every* member the script missed: every public API field, CLI flag, surviving constraint.
- **Defaults — including conditional ones.** If a value has more than one default constant, record *all* of them and the condition.
- **Behavioral constraints.** Record only usage restrictions *enforced* in source — "only valid on restart", "errors if X", min/max bounds, mutually-exclusive-with — even when expressed as a validation error or usage string rather than a type. **Do not** record implementation or serialization details (struct tags, `#[serde(...)]`, "not serialized"), plain descriptive prose, or type-system null guards and range validators (C# `ArgumentNullException`-style guards, `Ensure.*` helpers, `Objects.requireNonNull()`, Go nil checks) — those enforce language-level type contracts, not user-visible restrictions, so they can never be actionable drift.
- **Constraint coverage per endpoint.** Walk enforced validation endpoint by endpoint — pagination caps, required vs optional, mutually-exclusive parameters — so constraint drift re-surfaces every run; re-derive from source each run, never carry forward from a prior surface builder.
- **Language deprecation markers.** Capture attribute/annotation text as `intent_marker` per the property's calibration; the engine does **not** auto-tag `@Deprecated` (for Ops Manager, deprecated surface is documented as deprecated, not classed as intentional).
- **Hidden surface.** Record which `manifest.source.hidden_surface` locations are intentionally hidden and any `triage.intent_markers` substring on an item's source comment — these feed triage, not drift. Verify any `_private/` or `ApiPrivate*` class is not mounted on a public path before marking it hidden.

Do not hardcode anything property-specific; the hints tell you where to look.

**Emit the final `source-surface.json`** (schema in `scripts/compare_surfaces.py`): each item carries `name`, `kind`, `type`, `defaults[]` (each `{value, condition}`), `allowed_values[]`, `constraints[]`, `hidden`, `intent_marker`, `symbol`/`file`/`line`. Write it to `/tmp/source-surface.json`; `confidence` and `doc_name` are draft-only — drop them if carried. Your job is faithful extraction into this schema — not judgment.

### Stage 3 — Diff (scripted — deterministic)

```bash
$PY scripts/compare_surfaces.py --docs /tmp/docs-surface.json --source /tmp/source-surface.json --out /tmp/candidates.json
```

Matches every source item against the documented surface and emits a candidate for **every** mismatch — presence, type, conditional defaults, constraints, enum values — no curation, no early stop. Guards apply mechanically: content present in the docs surface (any include provenance) is never "missing", and hedged/illustrative value lists are never "missing values". Each candidate carries `triage_signals` (`hidden`, `intent_marker`) for Stage 4.

Do not hand-diff here — the determinism is the point. If a real mismatch class is missed, fix `compare_surfaces.py` (or the Stage 2 extraction feeding it), never ad-hoc agent judgment.

### Stage 4 — Triage (agent, over the complete candidate set)

Read `/tmp/candidates.json` and classify **every** candidate into exactly one of six labels — Stage 3 is exhaustive, so triage the whole list; do not re-discover or drop items. **Start from each candidate's `suggested_label`** (assigned deterministically by `compare_surfaces.py` from kind and triage signals) and apply the full decision order — first match wins — documented in `references/SCHEMA.md`. Record the deciding signal per candidate, and note any `suggested_label` override. Overrides worth calling out:

- **Rename → Confirmed.** An `undocumented_surface` candidate whose source name is a near-variant of a documented name that does not exist in source (e.g. source `metricsLogPath` vs docs `metricsLoggingFilepath`) — the docs assert a flag that does not exist.
- **Tracked / Upcoming** — only with an external signal established in this run: an open DOCSP ticket by `manifest.component` (Tracked), or surface tied to an unreleased version (Upcoming), from source release state / an open fix version in any `triage.eng_project` project. Name the ticket/version. **Tracked** requires a **live Jira lookup in this run** (via `/jira`) citing ticket key and status; a remembered ticket or README is not evidence.
- **Not-drift** — when the source/docs read shows the candidate is an extractor or differ artifact (a `:header-rows: 0` data row dropped as a header, an option-name regex rejection, a name-collision merge, an inverse-condition constraint phrasing), not real drift: the tooling failed to see it.

**Uncalibrated docset (`manifest.calibrated` false or absent):** triage signals are not yet human-confirmed, so be conservative — bias `Confirmed` candidates resting only on absence-of-a-marker, including enum gaps, toward **Needs-eng-confirmation**, and present the report as a draft for human review. Clear signature-level mismatches (renames, wrong types) may still be Confirmed; intent judgment calls defer. Human corrections are calibration input for the manifest.

After classifying every candidate, write the results to `/tmp/classified.json` — same structure as `candidates.json` with a `label` field added per item. This file feeds Stage 5a.

### Stage 5a — Report (agent)

Before filling the report, run the scoring script:

```bash
$PY scripts/score.py --classified /tmp/classified.json --source /tmp/source-surface.json --out /tmp/scores.json
```

Coverage is measured against the **source surface**, not the candidate set: the denominator is every documentable source item (all of `source-surface.json`, minus hidden / intent-marked / items triaged Intentional, Upcoming, or Not-drift on a presence gap); an item with no open presence gap counts as documented.

**Harvest the seeds.** Diff the final `/tmp/source-surface.json` (2b) against the 2a draft it grew from — the hand-seeded items are that diff, and they are the improvement backlog: extractor harvest candidates, `source_roots` additions, convention knobs worth setting. List the backlog in the report so the next run is cheaper.

Read `coverage_pct` and `accuracy_pct` from `/tmp/scores.json`, fill the matching placeholders plus the rest of `assets/report.md`, and write it to `/tmp/<property>-accuracy-report.md`. Confirmed findings appear with full Docs-say / Source-say / action; Upcoming and Intentional are listed separately, marked "no action". Set `{{resolved_version}}` to the released-version anchor from Stage 4 — not a manifest field; if undeterminable, use the source `ref`.

### Stage 5b — Held draft tickets (agent)

For each **Confirmed** finding only, fill `assets/draft-ticket.md` and write it to `/tmp/<property>-draft-tickets/<n>.md`. Map severity to priority (High→Critical-P2, Medium→Major-P3, Low→Minor-P4). Tag with `manifest.component` and the `bug` label. **Do not file them.** Present the report and held drafts to the user; only on explicit approval, file selected drafts via the `/jira` skill.

## Reading the classifications

- **Confirmed** — real drift; act on it (the held drafts).
- **Tracked** — real drift, already ticketed; no new ticket.
- **Upcoming** — accurate vs source but tied to an unreleased version; revisit after that version ships.
- **Intentional** — hidden/internal/legacy/illustrative by design; leave as is.
- **Needs-eng-confirmation** — can't be settled from source alone; ask the SME.
- **Not-drift** — an extractor/differ artifact, not real drift; nothing to act on.

## Validation

When you run docs-drift on a new property, add its manifest here — the validator only discovers literal paths, not `references/<property>.yaml` placeholders. Registered: `references/mongosync.yaml` (mongosync pilot), `references/ops-manager.yaml` (Ops Manager REST API reference pilot).

`references/expected-mongosync.json` is the adjudicated mongosync answer key (pinned 2026-03-23): a worked **classification exemplar** of all six labels for calibrating triage, and a **regression baseline** — run the pipeline against the pinned fixture and compare directly against it (three Confirmed items appear as Confirmed; the two known false positives, `hotDocIDs` and `createIndexesBatchSize`, do not). Other pilots are validated qualitatively: a coherent classified report plus either a correctly-formed draft ticket or a clear "no confirmed drift" result.
