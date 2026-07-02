# Manifest Schema

A **manifest** is one YAML file per docs property. It holds everything
property-specific so the skill's pipeline code stays generic. To onboard a
new property, write one manifest — no code changes.

This file is the **contract**: the fields a manifest may contain, their
types, whether they are required, and which pipeline stage consumes each.
`references/manifests/<property>.yaml` is one filled-in instance of this
contract (e.g. `references/manifests/mongosync.yaml`).

## Pipeline stages (for the "Consumed by" column)

1. **docs-extract** — `snooty build` the docs, walk the rendered AST (includes
   resolved) to collect documented surface: option names, types, defaults,
   enum/state values, parameters, constraints.
2. **source-extract** — read the code repo(s) to collect the real public
   surface: flags, defaults, enums, public API.
3. **diff** — compare documented vs source surface → candidate findings.
4. **triage** — classify each finding into exactly one of five labels.
5. **output** — write the report; draft held tickets for Confirmed findings.

---

## Fields

| Field | Type | Required | Consumed by | Meaning |
|---|---|---|---|---|
| `property` | string | yes | all | Short property id (e.g. `mongosync`). Used in report/ticket text and file naming. |
| `calibrated` | bool | no | triage | Whether a human has confirmed this manifest's surface hints and triage signals. Discovery mode writes a draft with `calibrated: false`; triage is conservative until a human confirms (then set `true`). Absent is treated as false. See "Discovery mode" in SKILL.md. |
| `component` | string | yes | triage, output | DOCSP Jira component. Triage searches existing tickets by it; drafted tickets are tagged with it. |
| `docs.path` | path | yes | docs-extract | Snooty source root to build (dir containing `snooty.toml`). |
| `docs.baseline_version` | string | no | triage | **Optional override.** The released version anchor for the **Upcoming** label. Omit by default — triage derives it at runtime (highest `vN.N` version directory for versioned docsets) and, more authoritatively, leans on source release state and engineering ticket fix versions. Set this only when auto-derivation is ambiguous. Never hand-maintain it as routine; it goes stale on version bumps. |
| `docs.surface_pages` | list<glob> | no | docs-extract, diff | Optional allowlist of pages/areas that constitute the reference surface. Omit to consider all built pages. |
| `docs.option_tables` | bool | no | docs-extract | Set `true` when the property documents its option/config reference as `list-table` directives whose **first column is the option name** (common in driver docsets) rather than as field-list includes. Passes `--option-tables` to `extract_docs.py` so those names enter the documented surface; without it they are skipped as table scaffolding and read as undocumented. Default/absent = false (field-list properties such as mongosync are unaffected). |
| `docs.external_api_ref` | bool | no | triage | Set `true` when part of the property's reference surface lives in an **external generated API reference** (e.g. rustdoc on `docs.rs`, Javadoc) outside the built docs site. Triage then treats API-only public surface (structs/enums/methods absent from the prose site but present in the API ref) as **Needs-eng-confirmation**, never auto-**Confirmed** — "absent from `content/`" is not "undocumented" for these docsets. Default/absent = false. |
| `source.repos[]` | list | yes | source-extract | One or more code repos to compare against. |
| `source.repos[].url` | string | yes | source-extract | `org/repo` (or git URL). |
| `source.repos[].ref` | string | no | source-extract | Pinned commit/branch. Omit for default branch on live runs; pin for reproducible validation. |
| `source.repos[].language` | string | no | source-extract | Primary language (e.g. `go`, `rust`). Hint to the source reader; helps locate idiomatic declaration sites. |
| `source.surface_hints[]` | list<string> | yes | source-extract | Natural-language pointers to **where the public surface is declared**. This is the main per-property knowledge; it replaces hand-written parsers. |
| `source.hidden_surface[]` | list<string> | no | triage | Where intentionally-hidden/internal surface is declared (hidden-options files, registries). Surface found only here → **Intentional**. |
| `triage.eng_project` | string or list\<string\> | no | triage | Engineering Jira project key (e.g. `REP`), or a list of keys for properties whose work spans multiple projects (e.g. `[OM, CLOUDP]`). Triage checks linked eng tickets and their fix versions across all listed projects for **Upcoming**. |
| `triage.intent_markers[]` | list<string> | no | triage | Source-comment substrings that signal deliberate non-documentation (e.g. `external-only`, `backward compatibility`, `internal`). A finding whose source carries one → **Intentional**. |
| `triage.hedge_phrases[]` | list<string> | no | diff, triage | Doc phrasings that make a partial list correct-by-design (e.g. `include`, `for example`, `such as`). A "missing values" finding under such phrasing is suppressed (the #3/#10 guard). Has a built-in default; override only to extend. |

---

## Defaults the skill applies (not per-property)

These are **general detection principles**, kept in code/skill defaults, not
in manifests, so they can't be overfit to one property:

- **Resolve includes** — extraction always uses the rendered Snooty AST, so
  content defined in an include is never reported as missing. (#9 guard.)
- **Hedge-phrase suppression** — default `hedge_phrases` cover common
  non-exhaustive English; manifests may extend but rarely need to.
- **Unmarked public surface defers** — public-looking source surface with no
  intent marker and no release signal is classified
  **Needs-eng-confirmation**, never auto-**Confirmed**.

## Label decision order (triage)

For each finding, the first matching rule wins:

1. Open DOCSP ticket (by `component`) covers it → **Tracked**.
2. Tied to a version not yet released — established primarily from source
   release state and open fix versions in any `eng_project` project (accepts a
   single key or a list), secondarily from the derived released-version anchor
   (`docs.baseline_version` overrides) → **Upcoming**.
3. Source carries an `intent_markers` substring, or lives only in
   `hidden_surface` → **Intentional**.
4. Doc phrasing matches `hedge_phrases` and the finding is "missing values" →
   suppressed (not a finding).
5. Real mismatch where the docs assert something the source contradicts —
   wrong name (incl. a rename: source name absent from docs while docs
   document a near-variant absent from source), wrong type, unstated
   conditional default, unstated constraint, missing non-hedged enum value →
   **Confirmed**.
6. Public source surface that is merely undocumented (the docs make no claim
   about it), no marker/release signal, intent unclear →
   **Needs-eng-confirmation**. Undocumented surface alone is never auto-Confirmed.
