# Translation Evals Tool — Design

Date: 2026-10-07
Status: draft for review

## 1. Context & goal

We want to evaluate how well an LLM translates MongoDB docs, by comparing
our LLM translation against the production (human/vendor, Smartling)
translation, on **rendered** page content.

The loop, for a given docs project and a set of target locales:

1. Scrape the production site for the project (per locale) — the reference.
2. Translate the project's pages locally with our own translation tools.
3. Start the translated site locally.
4. Scrape the locally running translated site.
5. Store both scraped sets.
6. Run Braintrust evals comparing the local output against the production
   reference.

Each step must be runnable independently.

This is a **new tool**. It is not built on `origin/llm-evals` (stale, out of
scope) and does not build on the planning docs in `translation/` or
`tools/content-scraper/` (also stale). It reuses only current `main` code:
the `mdx-translation-adapter` and the `translation` service.

## 2. Non-goals

- Not a replacement for the shipping MDX translation pipeline's own tests.
- Not evaluating the *adapter* in isolation (that is a different eval).
- Not translating whole projects (only the transitive closure of the eval
  pages — see §8).
- No staging environment; production only.

## 3. Key decisions

| Decision | Choice | Why |
|---|---|---|
| Local translated site | **Content substitution**: translate MDX into `content-mdx/<project>/`, build/serve `docs-site` with it swapped in, scrape at the **same URL paths** as production (no locale prefix) | `docs-site` has no locale routing (locales are done by Smartling's CDN); the `ai-translation-poc` locale work lives in the out-of-scope `docs-nextjs` app. Content substitution needs **zero docs-site changes** and renders through the real app, so local ≈ production minus Smartling. |
| Translate scope | **Transitive closure** of the eval pages (pages + reachable includes + referenced substitutions) | Measured: a 25-page set needs ~4% of the project's content; whole-project translation is unnecessary and expensive. |
| Locales (v1) | `pt-br, es, ko-kr, ja-jp, zh-cn` (+ `en` as source) | Matches the existing content-scraper's set; all served in production. |
| Eval model | **Score pre-computed output** — the Braintrust task echoes stored local text | Matches the step separation (translate → scrape → then eval); scorers re-run cheaply without re-translating; runs are reproducible over a frozen dataset. |
| Packaging | One new package `platform/tools/translation-evals/`, absorbing `content-scraper` | Single discoverable home; stages as independently-runnable subcommands; reuses `translation/` and `mdx-translation-adapter` as deps. |
| Project enumeration | From the project's generated MDX tree (+ composable variants) | We can only build pages we have MDX for; a production crawl would surface pages we can't build. Production URLs are derived by adding the `/<locale>/` prefix. |
| Serve mode | Default `next dev` on `:3000`; `--production` for SSG `build` + `start` | Dev is cheap and `<main>` text is identical; production build for high-fidelity runs. |
| Translator / judge | Translator = `translation` service via Grove; judge = a **different** Grove model | Avoids self-preference bias in LLM-as-judge scoring. |

## 4. Architecture — seven stages

```
resolve ─▶ scrape-prod ─▶ translate ─▶ serve ─▶ scrape-local ─▶ dataset ─▶ eval
```

| # | Stage | In → Out |
|---|---|---|
| 0 | `resolve` | `--project` → run manifest: page list (URL path + MDX path + composable variants), locales, and the transitive translatable set (pages, includes, substitutions) |
| 1 | `scrape-prod` | pages × `{en + targets}` → `prod/<locale>/<slug>.json` |
| 2 | `translate` | translatable set → translated MDX + `_references.json` overlay, per locale |
| 3 | `serve` | translated overlay for locale L → `docs-site` running on `:3000` |
| 4 | `scrape-local` | local URLs → `local/<locale>/<slug>.json` |
| 5 | `dataset` | prod (expected) + local (output) + prod-en (input) → `dataset/rows.json` |
| 6 | `eval` | rows → Braintrust experiment |

Stages communicate only through the run directory (§6), so any stage can be
re-run alone.

## 5. Package layout & CLI

`platform/tools/translation-evals/` — a pnpm workspace member.
TypeScript, run with `tsx`; tests with `vitest` (matches
`mdx-translation-adapter`). Hand-rolled subcommand parser (matches the
existing tools; no new CLI dependency).

```
translation-evals resolve      --project <DOCS_PROJECT> [--locales ...] [--pages <file>]
translation-evals scrape-prod  --project <p> [--run <id>] [--locale <l>]
translation-evals translate    --project <p> [--run <id>] [--locale <l>]
translation-evals serve        --project <p> [--run <id>] --locale <l> [--production]
translation-evals scrape-local --project <p> [--run <id>] [--locale <l>]
translation-evals dataset      --project <p> [--run <id>]
translation-evals eval         --project <p> [--run <id>]
```

```
src/
  cli.ts                 subcommand dispatch
  config.ts              env resolution, paths
  run/manifest.ts        run dir, manifest read/write, stage status
  resolve/
    enumerate.ts         walk content-mdx/<project> (mirrors scan-mdx-files.ts)
    urls.ts              dir-name-to-prefix -> URL paths; composable variants
    closure.ts           include graph BFS + referenced substitutions
  scrape/
    browser.ts           Playwright launch/context, jitter, skip policy
    extract.ts           <main>.innerText + title
    prod.ts  local.ts
  translate/
    batch.ts             drive adapter + service over the translatable set
    references.ts        translate _references.json substitutions
    overlay.ts           write translated MDX + references into content-mdx
  serve/
    materialize.ts       English base + translated overlay -> content-mdx
    server.ts            start/stop docs-site (dev or production)
  dataset/
    rows.ts              join prod/local/en -> Braintrust rows
  eval/
    eval.ts              Eval() entrypoint
    scorers/             factuality, fluency, terminology, reference-similarity
    judge/               judge prompt/request/response/orchestrator (Grove)
  types.ts
test/                    vitest
docs/superpowers/specs/  this design
```

## 6. Run model & storage

A **run** = `data/<project>/<runId>/`, `runId` default `<date>-<shorthash>`,
override with `--run`. Gitignored.

```
data/<project>/<run>/
  manifest.json                    pages[], locales[], translatable set, stage status, versions
  prod/<locale>/<slug>.json        {url,title,content}   (reference; en = source)
  local/<locale>/<slug>.json       {url,title,content}   (LLM output)
  translated/<locale>/<mdxPath>    translated MDX overlay (pages + includes)
  translated/<locale>/_references.json
  dataset/rows.json                Braintrust rows
```

`manifest.json` records per-stage status + timestamps so the CLI can report
which stages have run and with what inputs.

`content-mdx/` is treated as **scratch** — the `serve` stage materializes it
per locale and must not leave generated content in git (add a `.gitignore`
entry; `content-mdx/` is currently not ignored).

## 7. Stage contracts

### 7.1 `resolve`

- Ensure English MDX exists for the project (`convert:rst-to-mdx`), then walk
  `content-mdx/<project>` mirroring `scan-mdx-files.ts` (skip
  `_includes`/`includes`/`sharedinclude`, strip `index`, handle leaf vs.
  versioned via `_site.json`).
- Derive URL paths via `dir-name-to-prefix.json` (basePath = `/<rawPrefix>`,
  e.g. `node` → `/docs/drivers/node`).
- Expand **composable variants** from `_site.json` `composablePages`
  (query-string variants such as `?interface=atlas-cli`) into distinct pages.
- Compute the transitive translatable set (§8).
- Output: `manifest.json`.

### 7.2 `scrape-prod`

- For each page × `{en + targets}`: GET
  `https://www.mongodb.com/<locale>/<urlPath>`, extract `<main>.innerText` +
  `<title>`.
- Playwright with the existing rate-limit policy (5–8s jitter, 60s cooldown
  per 50); 403/404 → skip and record.
- Ported from `content-scraper/scrape.js`, made project-scoped and
  locale-parameterized.
- `en` output is the eval **source** (`input`).

### 7.3 `translate`

- Per locale, translate the translatable set:
  - each **eval page** via `translateMdx(mdx, translateFn)` where
    `translateFn` wraps `translate(request, { backend: createGroveBackend() })`;
  - each **distinct reachable include** the same way (once each — they are
    shared);
  - the referenced `_references.json` **substitutions** (strings and the
    `.text` of rich values) through the flat `{key:string}` service API.
- Term protection: pass `non_translatable_terms` (product names) merged with
  the adapter's own placeholder tokens.
- Failures (`ReconstructionError`) recorded per file; the stage reports a
  success/failure summary rather than aborting the run.
- **Batching:** group multiple files' payloads into a single request where
  beneficial (many includes have payloads smaller than the per-request
  overhead). Batch size is configurable.
- Output: translated MDX + `_references.json` under `translated/<locale>/`.

### 7.4 `serve`

- Materialize `content-mdx/<project>` = English base + translated overlay for
  locale L (pages + includes + `_references.json`).
- Start `docs-site` on `:3000`:
  - default `next dev` (via `platform/` `pnpm dev` selection or direct
    `next dev` with `DOCS_PROJECT`);
  - `--production`: `DOCS_PROJECT=<p> pnpm build && pnpm start`.
- Lifecycle-managed child process (start/stop, PID recorded); `scrape-local`
  assumes `localhost:3000` is up so a human can also start it manually.

### 7.5 `scrape-local`

- Same extractor as `scrape-prod`, base `http://localhost:3000`, no locale
  prefix (paths match production-English).
- Output: `local/<locale>/<slug>.json`.

### 7.6 `dataset`

- One row per (page, target locale):
  - `input` = `{ source_text: <prod-en content>, target_locale, local_text:
    <local content> }`
  - `expected` = `<prod-<locale> content>`
  - `metadata` = `{ project, url, slug, locale, run }`
- The task echoes `input.local_text`; scorers compare `output` vs `expected`
  and `input.source_text`.
- Skip rows missing either side; record skips.

### 7.7 `eval`

- `Eval("docs-translations-rendered", { data: rows, task: identityEcho, scores:
  [...], metadata })` via the `braintrust` CLI.
- Judge model via Grove, distinct from the translator.

## 8. The transitive translatable set

A page's rendered text is the union of:
- its own MDX,
- the bodies of every `<Include src>` reachable **transitively**,
- the values of every substitution (`_references.json`) it references.

`resolve` computes this closure:

1. Parse `<Include src="…">` from each page and each include → include graph.
2. BFS from the eval pages; collect distinct includes.
3. Collect `refKey="…"` usages in all closure files; intersect with
   `_references.json.substitutions`.

Measured on real atlas data:

| Eval set | Includes pulled in | Substitutions used | Closure payload | % of project |
|---|---|---|---|---|
| 25 pages | 99 / 1,705 | 13 / 95 | 176 K chars | 3.9 % |
| 100 pages | 444 / 1,705 | 34 / 95 | 893 K chars | 19.7 % |
| whole tree | 1,705 | 95 | 4.53 M chars | 100 % |

**Known residual gaps** (small; would appear as English leakage in scores):
- `<Reference value="…">` baked substitution text — the adapter treats
  `<Reference>` as opaque, so these values stay English (mostly product names).
- Rich substitutions' `nodes` (inline markup) — translating `.text` alone may
  leave text inside `nodes`.
- Ref-link *display* text is inline in the MDX and is already covered.

## 9. Data contracts

**Scraped page** (unchanged from content-scraper):
```json
{ "url": "…", "title": "…", "content": "…" }
```

**Braintrust row:**
```json
{
  "input":  { "source_text": "…", "target_locale": "es", "local_text": "…" },
  "expected": "…",
  "metadata": { "project": "atlas", "url": "…", "slug": "…", "locale": "es", "run": "…" }
}
```

## 10. Scorers

| Scorer | Kind | Compares |
|---|---|---|
| `factuality` | LLM judge (source-anchored) | output vs the **English source** (ground truth); the production translation is a calibration aid, not the answer key |
| `fluency` | LLM judge | output alone, in the target locale |
| `terminology_preserved` | deterministic | configured product/technical terms survive verbatim |
| `reference_similarity` | deterministic | output vs the production reference (a calibration signal, not pass/fail) |

- Judge model ≠ translator model (`JUDGE_MODEL`).
- Judge reuses the current `translation` service seams: `resolveGroveConfigFromEnv`,
  the abstract `Transport`, and the Grove request/response pattern.
- Scorer design is written fresh here; it does not import from `origin/llm-evals`.

## 11. Environment & config

| Variable | Required | Notes |
|---|---|---|
| `GROVE_API_KEY` | yes | translator backend + judge |
| `GROVE_MODEL` | no | default `gpt-5.5` (service default) |
| `JUDGE_MODEL` | yes | must differ from the translator |
| `BRAINTRUST_API_KEY` | yes | read by the `braintrust` CLI (`.env.braintrust` or shell) |
| `BRAINTRUST_PROJECT` | no | default `docs-translations-rendered` |
| `TARGET_LOCALES` | no | default the v1 set; filters rows |
| `TERMS_FILE` | no | non-translatable product terms |

`.env.example` documents all. Note: the `braintrust` CLI does **not**
auto-load a plain `.env` — document the `.env.braintrust` / exported-vars story.

## 12. PR breakdown

Small, independently reviewable PRs:

1. **Scaffold** — package, tsconfig, CLI skeleton, config/env, run/manifest
   storage, gitignore, tests.
2. **`resolve`** — enumeration walker, URL derivation, composable variants,
   closure computation, tests.
3. **`scrape-prod`** — port scraper, project-scoped, locale-parameterized, tests.
4. **`translate`** — adapter + service wiring, closure batch, references,
   overlay, tests.
5. **`serve` + `scrape-local`** — materialize, server lifecycle, local scrape, tests.
6. **`dataset`** — join + row builder, tests.
7. **Scorers** — judge + deterministic, tests.
8. **`eval` entrypoint + README/runbook**.
9. **Retire `content-scraper`** — mechanical.

## 13. Open verification items (confirm during implementation, do not assume)

- Exact Grove model ids for translator + judge.
- `convert:rst-to-mdx` output location + `DOCS_PROJECT` semantics for one project.
- Whether `next dev` renders basePath URLs identically to production for
  `<main>` extraction.
- Composable-variant enumeration correctness against production.
- The `<Reference value>` and rich-substitution gaps (§8) — decide whether to
  fix in the adapter or accept as documented noise.
- Grove gateway pricing (affects cost estimates, not correctness).

## 14. Cost (informational)

Whole atlas project, Sonnet 5, 5 locales ≈ **$74**; a 25-page eval set ≈
**$3**; 100 pages ≈ **$15**. Output tokens dominate (~85%); batching files per
request matters because per-request overhead is large relative to small
includes.
