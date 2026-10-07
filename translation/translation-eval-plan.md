# Translation Eval Plan

## Context

The primary thing under evaluation is **MDX document translation** — the
`mdx-translation-adapter` (`platform/tools/mdx-translation-adapter`)
driving the translation service over real docs pages. The **platform
strings** path (flat `key -> string` UI copy) is also supported, as a
secondary case sharing the same scorer core.

The `translation/` package (`@mongodb-docs/translation-service`) is a
standalone npm package with its own TS/jest toolchain, separate from the
`platform/` pnpm workspace. It implements a provider-agnostic translation
pipeline with a clean `TranslationBackend` seam and an injectable
`Transport` layer.

The evals live **inside `translation/`**, under a new `translation/eval/`
dir parallel to `src/`, `tests/`, `scripts/`, so eval tooling stays out
of the runtime service's public API (`src/index.ts`). The MDX adapter is
pulled in as a dependency rather than the evals moving into the pnpm
workspace.

Every seam the evals need is already exported from
`translation/src/index.ts` — `Transport`, `createGroveTransport`,
`resolveGroveConfigFromEnv`, `GROVE_DEFAULTS`, `translate`,
`createGroveBackend`, `validateOutput` — so no deep imports or new
public surface are required.

## Decisions

| Decision | Choice |
|---|---|
| Primary eval target | MDX document translation via `mdx-translation-adapter` |
| Secondary eval target | Platform strings (flat JSON UI copy) |
| Runner | `braintrust eval` CLI (verified — see Verification items; note it does **not** auto-load `translation/.env`) |
| Dataset home | In-repo, frozen files under `eval/datasets/` |
| Reference source | Real set derived from Smartling (decision updated 2026-08-07); shipped fixture data is mock — see `eval/datasets/README.md` |
| Judge model | Separate, stronger model via Grove gateway (avoids self-preference bias) |
| Judge ground truth | The **source** document; the reference is an aid, not the answer key |
| Scoring granularity | Config: `per-key`, `per-document`, or `both` (default `both`) |
| Scorer set | Deliberately minimal v1: 2 judge + 4 deterministic. Everything else parked in the research backlog until real runs show what is worth adding. |
| Locale handling | A dimension of the dataset, not a row — discovered by convention |

## Architecture — two paths, one scorer core

Both paths reduce to the same unit of comparison: `key -> {source,
output, reference}`. Platform strings already are that shape. MDX becomes
that shape after `extract()`. So the scorer core is shared, and MDX adds
document-level scorers on top — which is where the MDX-specific risk
actually lives.

```
MDX PATH (primary)                        STRINGS PATH (secondary)
row: document x target locale             row: key x target locale

  extract(source.mdx)                       payload = {key: source_text}
    -> payload + PUA tokens
         |                                          |
         v                                          v
  translate(payload, {backend: createGroveBackend()})
         |
         +--> raw response ------------------+
         |                                   |
  validateTranslation()                      |
         |                                   |
  reconstruct() -> output.mdx                |
         |                                   |
         v                                   v
  DOCUMENT-LEVEL SCORERS             PER-KEY SCORERS (shared)
```

### Task drives the three-step path, not `translateMdx`

The `translateMdx` convenience wrapper throws `ReconstructionError` and
produces nothing when anything fails (`src/validate.ts:16`). An eval that
calls it gets a crash instead of a score.

So `tasks/mdx.ts` drives `extract` -> `translate` ->
`validateTranslation` -> `reconstruct` itself, catching at each stage, and
returns a `TaskOutput` carrying:

- the raw translation response (`Record<string, string | null>`)
- the reconstructed MDX, or `null`
- the failure stage and offending key, if any

**Failure becomes a score, not an exception.** A run where 3 of 10
documents fail reconstruction reports `reconstruct_succeeded: 0.7`; it
does not die.

**Term-merging parity with `translateMdx` is a correctness requirement.**
`translateMdx` merges `content.non_translatable_terms` (the adapter's
own inline placeholder tokens) with the caller's terms before calling
`translate` (`src/translate-mdx.ts:36-38`). `tasks/mdx.ts` must do the
same merge with the manifest's `non_translatable_terms`, or the eval
exercises a pipeline that differs from the shipped one — adapter tokens
would silently skip `__PROTn__` protection. A test asserts the task's
merged term list matches what `translateMdx` would produce.

### Per-key output comes from the raw response

The judge sees what the model actually produced — the raw response — not
a re-extraction of the reconstructed document. This also means per-key
scoring still works when reconstruction fails outright.

### Reference alignment is infrastructure, not a scorer

Per-key comparison assumes `extract(reference)` yields the same key set
as `extract(source)`. If whoever produced the reference restructured a
paragraph or dropped an admonition, the key sets diverge — that is a
dataset defect, not a model failure.

`scorers/alignment.ts` (`alignKeys()`) matches the three key sets before
any per-key scoring. Unmatched keys are excluded from judge scoring
rather than counted as misses, and source-to-output and
source-to-reference divergence are recorded **separately** in the row's
scorer metadata as a dataset-health diagnostic. (A dedicated
`key_set_alignment` score is in the research backlog; for v1 the
divergence counts in metadata are enough to spot a bad reference.)

## Scorer inventory

Deliberately small. Six scorers ship in v1; everything cut from earlier
drafts is listed in the research backlog at the end of this plan, to be
added back only when real runs show a gap.

| Scorer | Per-key | Per-doc | Kind |
|---|---|---|---|
| `factuality` | yes | yes | judge, source-anchored |
| `fluency` | yes | yes | judge |
| `placeholder_integrity` | yes | — | deterministic |
| `reconstruct_succeeded` | — | yes | deterministic |
| `mdx_parses` | — | yes | deterministic |
| `structure_preserved` | — | yes | deterministic |

Braintrust score names carry explicit `_per_key` / `_per_doc` suffixes so
both scopes are legible side by side. The judge scorers are one
implementation parameterized by scope, not two copies.

### Definitions

**Per-key**

- `factuality` — semantic fidelity of the output to the **source** for
  that key, judged in the target locale. The reference is supplied as
  one example of a valid rendering (register/terminology calibration),
  not as the answer key. See "Judge design" for the rubric.
- `fluency` — naturalness/register in the target locale,
  reference-independent.
- `placeholder_integrity` — every adapter PUA token for that key
  survived, checked against the raw response. Wrap placeholders need
  both `open` and `close`; opaque placeholders need their single token.
  Mirrors `validateTranslation` semantics, but scores per key from the
  raw response — so it attributes the failure to the offending key even
  though `reconstruct` would have thrown for the whole document.

**Per-document**

- `factuality` / `fluency` — whole translated document vs whole source
  (reference as aid), one judge call, one rubric. Not derivable from the
  per-key calls: divergence between `factuality_per_doc` and the
  aggregated per-key factuality is itself diagnostic — it usually means
  coherence problems that only appear when blocks are read together,
  such as the same term translated two different ways across sections.
- `reconstruct_succeeded` — no `ReconstructionError`; records the
  failure stage when it throws.
- `mdx_parses` — the reconstructed MDX re-parses without error.
- `structure_preserved` — structural fingerprint of the source AST
  equals that of the output AST: node type sequence, nesting depth, and
  sibling counts, ignoring text values.

**Guardrail caveat:** `structure_preserved` (and to a lesser extent
`mdx_parses`) tests the **adapter**, not the model — `reconstruct`
mutates the source AST in place and re-serializes, so these should sit
at a constant 1.0 unless the adapter regresses. They stay because a
regression here silently corrupts every document, but nobody should
expect them to move run to run.

### How per-key scores roll up to the row

An MDX row is a document × locale, and a Braintrust scorer returns
numbers per row — so every `_per_key` score on the MDX path is
necessarily an **aggregate** over that document's keys. The rules:

- `factuality_per_key` and `fluency_per_key` aggregate as the **mean
  over matched keys** (keys excluded by alignment do not count).
- Per-key detail — the judge's category and rationale for every key,
  the matched/unmatched key counts, and any parse failures — goes into
  the scorer's `metadata`, so a bad aggregate is inspectable down to
  the offending key in the Braintrust UI.
- `placeholder_integrity_per_key` aggregates as the **fraction of
  token-bearing keys with all tokens intact** — "3 of 12 tokenized keys
  lost a placeholder" is the signal, and the offending keys/tokens are
  listed in metadata.
- If the judge response for a batch cannot be parsed, the affected
  keys score **null, not 0** — null drops out of aggregates instead of
  masquerading as "translated everything wrong." The parse failure is
  flagged in metadata and surfaced by the run summary.

On the strings path a row *is* a key, so `_per_key` scores need no
aggregation and `_per_doc` scorers simply don't apply.

### Judge category mapping

The judge classifies factuality into categories anchored on the
**source** (see "Judge design"), mapped to a score:

- A (omission — source meaning missing from the output) = 0.4
- B (addition — meaning not in the source was introduced) = 0.6
- C (faithful — full source meaning preserved) = 1
- D (mistranslation — contradicts or distorts the source) = 0
- E (stylistic — differs from the reference in wording only, meaning
  intact) = 1

The mapping is owned and tunable in `scorers/judge-scorers.ts`.

## Judge design — reuses existing seams

The judge does **not** use the built-in `autoevals` `Factuality` scorer
(which calls OpenAI directly). It reuses the service's `Transport` +
`GroveConfig` + the `grove/request.ts` / `grove/response.ts` pattern —
same egress, same key, same governance, and we own the rubric and
mapping. The structure mirrors `src/backends/llm/grove/` so the reuse
reads as the established pattern rather than a parallel invention:

```
eval/judge/
  prompt.ts      factuality + fluency rubric, scope-aware (key vs document),
                 locale-aware via the locale registry, placeholder-aware
  request.ts     Grove Responses body, judge_response json_schema
  response.ts    parse {category, rationale} per dimension
  judge.ts       orchestrates via injectable Transport (like grove/backend.ts),
                 chunks per-key batches, applies the parse-failure policy
  config.ts      resolveGroveConfigFromEnv + JUDGE_MODEL override
```

`config.ts` reuses `resolveGroveConfigFromEnv` but allows a `JUDGE_MODEL`
override so the judge can be a stronger model than the translator. The
judge `Transport` is injectable so unit tests use a fake, exactly like
`tests/backends/llm/grove/transport.test.ts`.

Fluency folds into the same judge call as factuality — one rubric,
multiple output dimensions — to keep cost down.

### The rubric is translation-adequacy, anchored on the source

Earlier drafts borrowed the autoevals QA-Factuality rubric
(subset/superset of a reference answer). That encodes
question-answering semantics; for translation, the **source is ground
truth** and the reference is one valid rendering among many. Judging
strictly against the reference penalizes legitimate alternative
translations. So the rubric asks: does the output carry the source's
full meaning into the target locale? The reference is provided to
calibrate register and terminology choices, and category E exists to
absorb valid divergence from it.

### The rubric explains placeholder tokens

Per-key judging shows the judge raw response strings containing adapter
PUA placeholder characters, and the reference side
(`extract(reference).payload`) carries its own tokens. Without
instruction, fluency scores would be systematically depressed and
factuality rationales would fixate on the tokens. The rubric therefore
tells the judge these are opaque placeholders standing in for protected
inline content: ignore them for fluency, and treat token presence as
out of scope (that is `placeholder_integrity`'s job).
`tests/eval/judge/prompt.test.ts` covers this rubric section.

### Batching, chunking, and failure policy

Per-key judging is **batched per document** — structured output keyed
by payload key, not one call per key. But one giant call is a single
point of failure: a truncated or malformed 40-key response would lose
every per-key judge score for the document. So:

- Batches are capped at `JUDGE_MAX_KEYS_PER_CALL` (default 20,
  configurable in `eval/config.ts`); larger documents get multiple
  calls, results merged by key.
- A batch whose response fails to parse retries once; on second
  failure its keys score null with a `judge_parse_failed` metadata
  flag (see the aggregation rules above).
- The document-scope judge call has a size budget. A document +
  reference pair exceeding it is **not silently truncated** — the
  doc-level judge scores null with a `judge_doc_too_large` metadata
  flag. Silent truncation would grade a document the judge never read.

## Multi-language support

Locale is a **dimension of the dataset, not a property of a row**. The
manifest describes documents only; the loader fans out over discovered
reference locales. `N` documents x `M` locales = `N x M` eval cases.

```
datasets/mdx/
  manifest.json                        [{ id, source, non_translatable_terms? }]
  sources/compass/connect.mdx
  references/fr-fr/compass/connect.mdx
  references/ja-jp/compass/connect.mdx    <- adding a language = drop this tree
```

The loader globs `references/*/<same relative path>` for each document,
so **a locale enters the eval by convention, with no manifest edit at
all**. `TARGET_LOCALES=fr-fr` filters to a subset for cheap iteration.

Platform strings mirrors the same shape — `platform-strings/en-us.json`
plus `references/<locale>.json`, one file per language.

### The locale registry

`eval/locales.ts` is the single place a language is defined:

```ts
export const LOCALES = {
  'fr-fr': { name: 'French',   judgeNotes: '...' },
  'ja-jp': { name: 'Japanese', judgeNotes: '...' },
};
```

The registry feeds the judge prompt: the language name and
locale-specific register guidance (formality conventions, docs-voice
notes). Adding a language is: drop a reference tree, add one registry
entry.

A locale found on disk but missing from the registry **fails loudly at
load time** rather than being silently judged with English-default
guidance.

The registry is also where per-locale scorer parameters will live when
the research backlog lands — e.g. `length_ratio` needs a per-locale
acceptable band (Japanese runs far shorter than English, German
longer), which is exactly why that scorer was deferred rather than
shipped with a single wrong band.

Deliberately not built: per-locale `non_translatable_terms` overrides (a
term translated in French but held in Japanese). Documents carry one term
list. The override point is noted in the eval README so it is a small
change if it turns out to be needed, rather than speculative config now.

## File structure (all under `translation/`)

```
eval/
  types.ts                    MdxRow | StringsRow, TaskOutput, Scope, JudgeCategory
  config.ts                   SCORING_MODE, TARGET_LOCALES, JUDGE_MODEL,
                              JUDGE_MAX_KEYS_PER_CALL, dataset paths
  locales.ts                  locale registry: name, judgeNotes
  datasets/
    mdx/
      manifest.json           document list (locale-free)
      sources/**.mdx          frozen source documents
      references/<locale>/**.mdx
      load.ts                 reads manifest, fans out over discovered locales,
                              validates every pair exists on disk
    platform-strings/
      en-us.json              source strings
      references/<locale>.json
      load.ts                 schema validation + locale fan-out
  tasks/
    mdx.ts                    extract -> translate -> validate -> reconstruct,
                              stage-aware TaskOutput, translateMdx term-merge parity
    strings.ts                payload -> translate
  scorers/
    alignment.ts              alignKeys() -> AlignedKey[] + divergence metadata
    deterministic.ts          placeholder_integrity (per-key + aggregation)
    document.ts               reconstruct_succeeded, mdx_parses, structure_preserved
    judge-scorers.ts          factuality + fluency wrappers, scope-parameterized,
                              category -> score mapping, per-key aggregation
    index.ts                  registry: assembles score list from SCORING_MODE + path
  judge/
    prompt.ts  request.ts  response.ts  judge.ts  config.ts
  mdx.eval.ts                 primary entrypoint
  strings.eval.ts             secondary entrypoint
  README.md                   how to run, env vars, dataset format, adding a locale

tests/eval/                   hermetic jest tests, matching the existing convention
  fixtures/                   small hand-built MDX source/reference pairs
  load-mdx.test.ts            manifest parsing, locale fan-out, missing-pair errors
  load-strings.test.ts        schema validation + locale fan-out
  tasks/mdx.test.ts           stub backend; failure-stage capture at each stage;
                              term-merge parity with translateMdx
  scorers/alignment.test.ts   key alignment + divergence metadata
  scorers/deterministic.test.ts  placeholder_integrity, both shapes of token,
                              fraction aggregation
  scorers/document.test.ts    structure/parse checks over fixture pairs
  judge/prompt.test.ts        rubric builder: scope, locale, and placeholder
                              sections
  judge/request.test.ts       Grove request body shape
  judge/response.test.ts      category parsing + error cases
  judge/judge.test.ts         orchestrator with fake Transport: chunking at
                              JUDGE_MAX_KEYS_PER_CALL, retry-then-null policy
```

### Build/test wiring for the new dirs

- `tsconfig.build.json` excludes `eval/` — eval tooling must not ship
  in `dist/` or the runtime package surface.
- `tsconfig.json` (typecheck) includes `eval/` and `tests/eval/`.
- `jest.config.cjs` picks up `tests/eval/**` (it should already via the
  existing `tests/` glob — verify rather than assume).

## Dataset format

`eval/datasets/mdx/manifest.json`:

```json
{
  "source_locale": "en-us",
  "documents": [
    {
      "id": "compass-connect",
      "source": "sources/compass/connect.mdx",
      "non_translatable_terms": ["MongoDB", "Compass", "mongosh"]
    }
  ]
}
```

Paths are relative to `eval/datasets/mdx/`. Documents live as real files,
not inlined in JSON — MDX pages are too large for that and the diffs
would be unreadable.

Sources are **frozen copies** vendored into the dataset dir, not pointers
into `content-mdx/`. Pointing at live content would keep sources fresh,
but the moment a page is edited the reference no longer corresponds to it
and experiments stop being comparable over time — which defeats the
purpose of an eval. Immutable pairs beat fresh ones here.

Platform strings rows are derived from `en-us.json` +
`references/<locale>.json` by key intersection, so the row shape is
implicit:

```json
{
  "key": "actions.ask_mongodb_ai",
  "source_text": "Ask MongoDB AI",
  "reference_text": "Demander à MongoDB AI",
  "target_locale": "fr-fr",
  "non_translatable_terms": ["MongoDB", "MongoDB AI"]
}
```

Reference values for both paths are **supplied by the writer**. The plan
ships the schema, loaders, validation, and small hand-built fixtures so
the loop is provable before the real set lands.

## Cost control

MDX documents are far more expensive than strings, and this drives two
choices:

- **Per-key judging is batched** — one structured-output call per
  `JUDGE_MAX_KEYS_PER_CALL` keys, not one call per key. A 40-key
  document at one call per key, times `trialCount: 3`, would be 120+
  judge calls for a single document; batched and chunked at 20 it is
  two calls per trial, three with the document-scope call.
- **`trialCount: 1` for MDX** in Phase 1, raised only once the loop is
  proven cheap enough. Platform strings keeps `trialCount: 3` — cheap
  rows, and non-determinism matters more on short text.

## Braintrust wiring

`eval/mdx.eval.ts` (primary):

```ts
Eval("docs-translation-mdx", {
  data: mdxRows,                  // documents x discovered locales;
                                  // each row carries { target_locale, document_id }
                                  // in its own metadata for filtering
  task: mdxTask,
  scores: scorersFor("mdx", SCORING_MODE),
  metadata: { model, prompt_version, judge_model, scoring_mode },
  trialCount: 1,
  maxConcurrency: 4,
});
```

Experiment-level `metadata` holds only values constant across the run
(model, prompt version, judge model, scoring mode). `target_locale`
varies per row, so it lives in **row metadata** — putting it at
experiment level would make locale filtering in the Braintrust UI
impossible.

One comparability caveat, worth stating in the README: adding a locale
(or a document) changes the row population, so aggregate scores are not
comparable across experiments with different datasets. Compare
like-for-like by filtering on row metadata, or freeze the dataset
before an A/B across prompts or models.

`eval/strings.eval.ts` (secondary) is the same wiring with
`scorersFor("strings", SCORING_MODE)` and `trialCount: 3`. Separate
entrypoints mean separate Braintrust experiments, so comparisons stay
meaningful across two datasets with different score sets.

## Package + env changes

- `translation/package.json`:
  - scripts: `"eval:mdx": "braintrust eval eval/mdx.eval.ts"`,
    `"eval:strings": "braintrust eval eval/strings.eval.ts"`, `"eval"`
    running both (exact bin name pending verification item 3)
  - devDependency: `braintrust` (ships the eval CLI)
  - dependency: `"mdx-translation-adapter":
    "file:../platform/tools/mdx-translation-adapter"`
- `translation/.env.example`: `BRAINTRUST_API_KEY`, `BRAINTRUST_PROJECT`,
  `JUDGE_MODEL`, `SCORING_MODE`, `TARGET_LOCALES`
- `translation/.gitignore`: no changes needed (`.env` already ignored)
- tsconfig/jest updates per "Build/test wiring" above

`autoevals` and `openai` are **not** added — the judge is custom via
Grove, so they would be dead weight.

## Reuse summary (no new HTTP paths, no duplicated logic)

| Eval component | Reuses |
|---|---|
| Judge HTTP egress | `Transport` + `createGroveTransport` |
| Judge config | `resolveGroveConfigFromEnv` + `GROVE_DEFAULTS` |
| Judge request/response pattern | `grove/request.ts` / `grove/response.ts` shape |
| MDX task | `extract` / `validateTranslation` / `reconstruct` from the adapter |
| MDX task term merge | `translateMdx`'s term-union semantics, replicated + tested |
| Both tasks | `translate()` + `createGroveBackend()` |
| Placeholder integrity | the adapter's `validateTranslation` semantics |

## Verification items (before wiring)

1. ~~The `file:` dependency resolves.~~ **Verified (Task 1):** npm
   symlinks the pnpm-managed adapter and all four exports resolve with
   their remark/unified deps.
2. Stale-`dist/` footgun: the adapter is consumed from `dist/`, so eval
   runs silently test old code after a `src/` edit. Needs a prebuild
   step or a documented warning in the eval README.
3. ~~The braintrust CLI bin name and `.env` loading.~~ **Verified
   (Task 1):** both `braintrust` and `bt` bins exist; scripts use
   `braintrust`. It does **not** auto-load `translation/.env` — it
   reads `BRAINTRUST_API_KEY` from the environment or from
   `.env.braintrust`, and `--env-file` errors hard when the path is
   missing. The entrypoints/README task must document the env story
   (e.g. `.env.braintrust` or exporting the vars) rather than assume
   `.env` works like the `e2e` script.
4. ~~TS resolution of `.js`-extension imports.~~ **Verified (Task 1):**
   an `eval/` file importing `../src/index.js` and
   `mdx-translation-adapter` typechecks under NodeNext.
5. The chosen stronger `JUDGE_MODEL` is available on the Grove gateway
   endpoint.

## Phased rollout

| Phase | Scope |
|---|---|
| **1 — MDX loop validation** | Shared core plus the full MDX path: locale registry, loader with locale fan-out, stage-aware task with term-merge parity, the 4 deterministic scorers, the Grove judge (both scopes, chunking, parse-failure policy), `mdx.eval.ts` wired to Braintrust, hermetic tests, and 2–3 hand-built tiny fixture pairs so the loop is provable before the real set arrives. If an earlier signal is wanted, the judge is cleanly severable: deterministic scorers + task + loader prove out first, judge lands as 1b. |
| **2 — Real data + strings path** | The supplied MDX reference set drops into `datasets/mdx/`; `strings.eval.ts` and its loader wired (small — it is the degenerate case of the same core); grow locales via the registry. |
| **3 — Research + harden** | Run the eval on real data and let the results drive which backlog scorers earn their place; CI regression gating on score deltas; tune `trialCount`. |

## Scorer research backlog

These were cut from v1 to keep the scorer set small and legible. Each
is a candidate, to be added only when real runs demonstrate the gap it
would fill. Earlier drafts contain full definitions; the one-line
sketches here are enough to recognize the need when it shows up.

- `length_ratio` — pooled output/source length vs a per-locale band
  (band lives in the locale registry). Catches truncation and padding.
- `untranslated_heuristic` — fraction of keys returned unchanged.
  Needs a real definition of "non-trivial" first: keys dominated by
  protected terms or placeholder tokens legitimately come back
  identical, so the naive version has a permanent noise floor.
- `no_leaked_tokens` — no raw `__PROTn__` or PUA characters in final
  output. Partially covered today: `validateTranslation` (and thus
  `reconstruct_succeeded`) catches *missing* tokens, not leaked ones.
- `protected_term_presence` — the row's `non_translatable_terms`
  survive verbatim in the translated value.
- `key_set_alignment` — promote the alignment divergence metadata to a
  first-class dataset-health score.
- `code_block_integrity` / `link_target_integrity` /
  `frontmatter_scope` — adapter guardrails (code, URLs, and
  frontmatter allowlisting byte-stable). Like `structure_preserved`,
  these test the adapter rather than the model, and
  `structure_preserved` + `mdx_parses` already cover the
  catastrophic-corruption case in v1.
- `roundtrip_stable` — `extract(output).payload` equals the raw
  response. **Known trap:** `reconstruct` re-serializes via
  remark-stringify, whose escaping choices (`\*`, entity handling,
  emphasis markers) make byte-equality noisy without a normalization
  pass. Do not add this one back as exact string comparison.

## Deferred to later phases

- **Tone / voice consistency** judge (UI-string register: concise,
  action-oriented; docs register: instructional).
- **Cross-key terminology consistency** — the same source term
  translated differently across keys or documents.
- **Per-locale `non_translatable_terms` overrides.**
- **Service-side ICU/tag protection** — extending the protection layer
  to auto-detect ICU `{...}` and `<...>` tokens (not just
  `non_translatable_terms`) and route them through `__PROTn__`. This is
  a service change, not an eval change — but `placeholder_integrity`
  and `icu`-shaped failures in the strings path are what would prove it
  is needed.
