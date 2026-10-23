# translation-evals

Evaluate LLM translations of MongoDB docs by comparing a local LLM translation
against the production (human/vendor, Smartling) translation, on **rendered**
page content.

Design: `docs/superpowers/specs/2026-10-07-translation-evals-design.md`

## How it works

For a docs project and a set of target locales, the tool runs seven stages:

```
resolve ─▶ scrape-prod ─▶ translate ─▶ serve ─▶ scrape-local ─▶ dataset ─▶ eval
```

| Stage | What it does |
|---|---|
| `resolve` | Decides what to translate and writes the run manifest. |
| `scrape-prod` | Scrapes production for `en` and each locale. `en` is the eval source; the locale pages are the reference. |
| `translate` | Translates the translatable set locally with Grove. |
| `serve` | Overlays the translated MDX onto `content-mdx/<project>` and serves `docs-site` on `:3000`. |
| `scrape-local` | Scrapes the running local site. |
| `dataset` | Joins source, reference, and local output into Braintrust rows. |
| `eval` | Scores the rows in Braintrust. |

Each stage is an independent subcommand. Stages communicate only through a
per-run directory on disk, so any stage can be re-run on its own.

`docs-site` has no locale routing (production locales are produced by
Smartling's CDN), so the tool **substitutes content**: translated MDX is
overlaid into `content-mdx/<project>/` and the real `docs-site` is served at
production-identical URL paths. A local render then differs from production
only by Smartling's rewriting, which is the comparison the tool wants.
`content-mdx/` is scratch and is never committed.

### Runs

A run is a directory `data/<project>/<runId>/`, where `runId` defaults to
`<date>-<shorthash>`. `resolve` creates the run; every later stage defaults to
the most recent run for the project unless you pass `--run <id>`.

```
data/<project>/<run>/
  manifest.json                  eval pages, locales, translatable set, stage status
  prod/<locale>/<slug>.json      scraped production pages (en = source)
  local/<locale>/<slug>.json     scraped local pages (LLM output)
  translated/<locale>/           translated MDX overlay + _references.json
  dataset/rows.json              Braintrust rows
  translate-failures.json        per-file translate failures
```

## Setup

Run these once before the first stage.

1. Use Node 24, the version in `platform/.nvmrc`. Older versions fail with
   `The "paths[0]" argument must be of type string` or
   `bad option: --env-file-if-exists=.env`.

   ```
   cd platform
   nvm use
   ```

2. Install dependencies from `platform/`. This package is a pnpm workspace
   member, so installing from this directory alone is not enough. The install
   may need `NPM_AWS_AUTH` set for the private registry in `platform/.npmrc`.
   See "Getting Started" in `platform/README.md` for how to get a token.

   ```
   pnpm install
   ```

3. Create your environment file from this directory:

   ```
   cp .env.example .env
   ```

   The package scripts load `.env` automatically if it exists. See
   [Configuration](#configuration) for the variables.

4. Generate the MDX content that `resolve` reads. From `platform/`:

   ```
   pnpm convert:rst-to-mdx -- atlas
   ```

   This writes `content-mdx/atlas/` at the repo root. Replace `atlas` with the
   project you are evaluating.

5. Generate the URL prefix map that `resolve` uses to build page URLs. From
   `platform/`:

   ```
   pnpm --filter docs-site build:prefix-map
   ```

6. Install the Chromium build that the scraping stages use. From this
   directory:

   ```
   pnpm exec playwright install chromium
   ```

   Re-run this after the `playwright` version changes. Without it,
   `scrape-prod` fails with `Executable doesn't exist`.

7. Build the packages that `translate` imports. From `platform/`:

   ```
   pnpm --filter translation-mdx-adapter build
   ```

   Without it, `translate` fails with `Failed to resolve entry for package
   "translation-mdx-adapter"`. Turbo does this for you when it runs `test` and
   `typecheck`.

## Configuration

Environment variables are read from `.env` (loaded by the package scripts
through `--env-file-if-exists`), or from your shell. A variable already
exported in your shell takes precedence over `.env`.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `AI_GATEWAY_API_KEY` | For `translate` and `eval` | — | Shared key for the translator backend and the judge. |
| `TRANSLATOR_MODEL` | No | `gpt-5.5` | Translator model. A `claude-*` value selects the Anthropic Messages path. |
| `JUDGE_MODEL` | For `eval` | — | Judge model. Must differ from the translator model. A `claude-*` value uses the Anthropic Messages path; anything else uses the OpenAI Responses path. |
| `BRAINTRUST_API_KEY` | For `eval` | — | Read by the `braintrust` CLI. |
| `BRAINTRUST_PROJECT` | No | `docs-translations` | Braintrust project name. |
| `TARGET_LOCALES` | No | `pt-br,es,ko-kr,ja-jp,zh-cn` | Comma-separated target locales. |
| `TERMS_FILE` | No | — | Path to a JSON file of non-translatable terms, e.g. `{"terms":["MongoDB","Atlas"]}`. |

The translator model — and therefore which backend runs — is set with
`TRANSLATOR_MODEL`: a `claude-*` value selects the Anthropic Messages path, and
the model name is forwarded to that backend.

The translation service reads the per-family endpoint and timeout overrides
directly, so they are not part of this tool's configuration:
`OPENAI_ENDPOINT` and `OPENAI_TIMEOUT_MS` (default `30000`) for the OpenAI
path, and `ANTHROPIC_ENDPOINT` and `ANTHROPIC_TIMEOUT_MS` (default `120000`)
for the Anthropic path. They apply only once their path is selected.

### Grove settings

`translate` and the `eval` judge call Grove through `translation-service`,
which speaks either the OpenAI Responses API or the Anthropic Messages API
depending on the model. Set these in `.env`:

```
AI_GATEWAY_API_KEY=<your key>
TRANSLATOR_MODEL=gpt-6-astra
JUDGE_MODEL=<a different model>
```

No endpoint is needed: both backends default to the AI Gateway.

- Both backends default to the AI Gateway
  (`ai-gateway.corp.mongodb.com`), so an `AI_GATEWAY_API_KEY` works with no
  endpoint configuration. A 401 means the key does not belong to the gateway
  being called: if your key is issued for the legacy Azure gateway, override
  `OPENAI_ENDPOINT` (or `ANTHROPIC_ENDPOINT` for a `claude-*` model) to point at
  that gateway.
- The tool picks the backend from the model name: a `claude-*` model uses the
  Anthropic Messages path, and any other model uses the OpenAI Responses path.
  List the available models with
  `GET https://ai-gateway.corp.mongodb.com/openai/v1/models`.
- `JUDGE_MODEL` is required and must differ from the translator model. Falling
  back to the translator would reintroduce the self-preference bias the
  separate judge exists to avoid.
- The judge picks its wire format from the model name the same way the
  translator does: a `claude-*` judge model uses the Anthropic Messages path,
  and any other model uses the OpenAI Responses path.
- Failed requests are recorded in
  `data/<project>/<runId>/translate-failures.json` with the gateway's error,
  for example `Grove returned HTTP 401`.

### Braintrust credentials

The `braintrust` CLI does not load a plain `.env` on its own. The `eval` stage
passes this process's environment to the CLI, so for `pnpm eval` a variable in
`.env` works. To run the CLI directly, export `BRAINTRUST_API_KEY` or put it in
`.env.braintrust`.

## Commands

Run every command from this directory. Stages run in the order below; `resolve`
must run first.

### resolve

```
pnpm resolve --project atlas
```

Decides **what to translate**. Makes no network calls, translates nothing, and
changes no content. Reads `content-mdx/<project>/` and writes
`data/<project>/<runId>/manifest.json`, which every later stage reads.

The text a reader sees on a page does not all live in that page's `.mdx` file.
A page pulls in `<Include>` files, which pull in more includes, and references
`_references.json` substitutions. `resolve` follows every include and
substitution transitively from the eval pages to build the **translatable
set** (also called the closure). `translate` then translates exactly that set,
and the scrape stages fetch exactly the eval pages. A 25-page eval set is about
4% of a project's content, so this avoids translating the whole project.

Shared eval page sets are checked in under `pages/`, one file per project.
`pages/manual.txt` covers the unversioned manual (`--project manual/manual`).

Flags:

| Flag | Required | Description |
|---|---|---|
| `--project` | Yes | Path under `content-mdx/` to a directory containing `_site.json`, for example `atlas`. For a versioned docset pass `<project>/<version>`, for example `manual/v8.0`. Passing a versioned project without a version lists the available versions. |
| `--pages <file>` | No | A file with one URL path or MDX path per line. Restricts the eval set to those pages. Errors if an entry matches no page. Defaults to every page in the project. |
| `--locales <list>` | No | Comma-separated locales, for example `es,ja-jp`. Overrides `TARGET_LOCALES`. |
| `--run <id>` | No | Uses this run ID instead of generating a new one. |

Fails with `content-mdx/<project> not found` if you skipped setup step 4, and
with `dir-name-to-prefix.json not found` if you skipped step 5.

### scrape-prod

```
pnpm scrape-prod --project atlas
```

Scrapes production pages into `prod/<locale>/<slug>.json`. Scrapes `en` plus
every manifest locale. `en` is the eval source; each locale is the reference.
Pages returning 403 or 404 are skipped.

Flags:

| Flag | Required | Description |
|---|---|---|
| `--project` | Yes | The project whose run to scrape. |
| `--run <id>` | No | Scrapes this run instead of the most recent one. |
| `--locale <l>` | No | Scrapes only this locale. Defaults to all manifest locales. |

### translate

```
pnpm translate --project atlas
```

Translates the translatable set into `translated/<locale>/` as an MDX overlay,
including the referenced `_references.json` substitutions. A file that fails is
recorded in `translate-failures.json` and the stage continues; the summary
reports how many files translated and how many failed.

Flags:

| Flag | Required | Description |
|---|---|---|
| `--project` | Yes | The project whose run to translate. |
| `--run <id>` | No | Translates this run instead of the most recent one. |
| `--locale <l>` | No | Translates only this locale. Defaults to all manifest locales. |

### serve

```
pnpm serve --project atlas --locale es
```

Copies the translated overlay for one locale over `content-mdx/<project>` and
starts `docs-site` at `http://localhost:3000`. The command runs in the
foreground and blocks until you press Ctrl-C, so run `scrape-local` in a second
terminal while it is up.

Flags:

| Flag | Required | Description |
|---|---|---|
| `--project` | Yes | The project to serve. |
| `--locale` | Yes | The locale whose overlay to serve. |
| `--run <id>` | No | Serves this run instead of the most recent one. |
| `--production` | No | Runs an SSG `build` then `start` instead of `next dev`. Higher fidelity, much slower. |

Fails with `No translated overlay for locale <l>` if `translate` has not run
for that locale and run.

### scrape-local

```
pnpm scrape-local --project atlas --locale es
```

Scrapes the running local site into `local/<locale>/<slug>.json`. Uses the same
extractor as `scrape-prod` and the same URL paths, with no locale prefix. Run
`serve` first.

Flags:

| Flag | Required | Description |
|---|---|---|
| `--project` | Yes | The project whose run to scrape. |
| `--run <id>` | No | Scrapes this run instead of the most recent one. |
| `--locale <l>` | No | Scrapes only this locale. Defaults to all manifest locales. |

### dataset

```
pnpm dataset --project atlas
```

Joins the three scrapes into Braintrust rows at
`data/<project>/<runId>/dataset/rows.json`, one row per (page, locale). Pages
missing any side are skipped. Needs `scrape-prod` and `scrape-local` to have
run.

Flags:

| Flag | Required | Description |
|---|---|---|
| `--project` | Yes | The project whose run to build. |
| `--run <id>` | No | Builds this run instead of the most recent one. |

### eval

```
pnpm eval --project atlas
```

Scores the run's dataset in Braintrust. Runs the `braintrust` CLI over
`src/eval/eval.ts`, so the CLI creates the experiment and reports results. Run
`dataset` first; the stage fails if the run has no `dataset/rows.json`.

Flags:

| Flag | Required | Description |
|---|---|---|
| `--project` | Yes | The project whose run to score. |
| `--run <id>` | No | Scores this run instead of the most recent one. |

Scorers:

| Scorer | Kind | Compares |
|---|---|---|
| `factuality` | LLM judge | The output against the English source, which is ground truth. The production translation calibrates register and terminology only; it is not an answer key. |
| `fluency` | LLM judge | The output alone, in the target locale. |
| `terminology_preserved` | Deterministic | The fraction of `TERMS_FILE` terms that survive verbatim. |
| `reference_similarity` | Deterministic | Character-bigram F1 against the production translation. A calibration signal, not a pass/fail. |

The judge runs once per row and returns both `factuality` and `fluency`.

## End-to-end example

Evaluate the unversioned manual in Spanish:

```
pnpm resolve      --project manual/manual --pages pages/manual.txt --locales es
pnpm scrape-prod  --project manual/manual
pnpm translate    --project manual/manual
pnpm serve        --project manual/manual --locale es   # terminal 1, leave running
pnpm scrape-local --project manual/manual --locale es   # terminal 2
pnpm dataset      --project manual/manual
pnpm eval         --project manual/manual
```

Every stage after `resolve` picks up the run `resolve` created, so `--run` is
only needed to target an older run.

## Related packages

`translate` and the `eval` judge use two sibling packages:

- `platform/tools/translation-service/`: the translation service and its
  OpenAI and Anthropic backends. A private pnpm workspace package.
- `platform/tools/translation-mdx-adapter/`: flattens MDX into the strings the
  service translates and reapplies them afterward.

## Development

```
pnpm test        # vitest
pnpm typecheck   # tsc --noEmit
```
