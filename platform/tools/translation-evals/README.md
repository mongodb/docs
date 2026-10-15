# translation-evals

Evaluate LLM translations of MongoDB docs by comparing our local LLM
translation against the production (human/vendor, Smartling) translation, on
**rendered** page content.

Design: `docs/superpowers/specs/2026-10-07-translation-evals-design.md`
Plan: `docs/superpowers/plans/2026-10-07-translation-evals.md`

## Status

`resolve`, `scrape-prod`, `translate`, `serve`, `scrape-local` and `dataset`
are implemented. The remaining stage (`eval`) lands in its own PR,
registering its handler in `src/commands/index.ts`.

## The seven stages

Each stage is an independent subcommand and communicates only through a
per-run directory on disk:

```
resolve ─▶ scrape-prod ─▶ translate ─▶ serve ─▶ scrape-local ─▶ dataset ─▶ eval
```

Each stage is a package script (run from this directory). Stage scripts are
added as each stage lands. Only `resolve`, `scrape-prod`, `translate`,
`serve`, `scrape-local` and `dataset` are runnable today; the other command
below is planned and does not exist yet.

| Stage | Command | Status |
|---|---|---|
| Resolve the project's pages + transitive translatable set | `pnpm resolve --project atlas` | Available |
| Scrape production (reference + English source) | `pnpm scrape-prod --project atlas` | Available |
| Translate the closure locally (Grove) | `pnpm translate --project atlas` | Available |
| Serve the translated site locally | `pnpm serve --project atlas --locale es` | Available |
| Scrape the local site | `pnpm scrape-local --project atlas --locale es` | Available |
| Build Braintrust rows | `pnpm dataset --project atlas` | Available |
| Run the eval | `pnpm eval` | Not yet implemented |

## Setup

Run these once before running any stage.

1. Use Node 24, the version in `platform/.nvmrc`. Older versions fail with
   `The "paths[0]" argument must be of type string` or
   `bad option: --env-file-if-exists=.env`.

   ```
   cd platform
   nvm use
   ```

2. Install dependencies from `platform/`. This package is a pnpm workspace
   member, so installing from this directory alone is not enough. The
   install may need `NPM_AWS_AUTH` set for the private registry in
   `platform/.npmrc`. See "Getting Started" in `platform/README.md` for
   how to get a token.

   ```
   pnpm install
   ```

3. Create your environment file from this directory:

   ```
   cp .env.example .env
   ```

   The package scripts load `.env` automatically if it exists. Set
   `GROVE_API_KEY` for `translate`. See [Environment](#environment) for the
   other variables.

4. Generate the MDX content that `resolve` reads. From `platform/`:

   ```
   pnpm convert:rst-to-mdx -- atlas
   ```

   This writes `content-mdx/atlas/` at the repo root. Replace `atlas` with
   the project you are evaluating.

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
   "translation-mdx-adapter"`. Turbo does this for you when it runs `test`
   and `typecheck`.

## Running `resolve`

From this directory:

```
pnpm resolve --project atlas
```

`resolve` decides **what to translate**. It makes no network calls, does
not translate anything, and does not change any content. It reads
`content-mdx/<project>/` and writes a manifest that the later stages use.

#### Why it is needed

The text a reader sees on a page does not all live in that page's `.mdx`
file. Consider these three files:

```
alerts.mdx:
  <Include src="/_includes/a" />

_includes/a.mdx:
  text <Include src="/_includes/b" />

_includes/b.mdx:
  deep <Reference refKey="service" type="substitution" />
```

The rendered `alerts` page contains text from `alerts.mdx`, from
`_includes/a.mdx`, from `_includes/b.mdx`, and the value of the `service`
substitution (defined in `_references.json`). If you translated only
`alerts.mdx`, the local page would still show English for the included
text and the substituted name. It would then differ from the production
page for reasons that have nothing to do with translation quality, and the
comparison would be meaningless.

#### What it does

1. **Picks the eval pages.** These are every page in the project, or only
   the pages listed in `--pages`. It also works out each page's production
   URL path, which later stages use to find the matching production page.
2. **Maps the includes.** It scans every `.mdx` file and records which
   `<Include>` tags point at which other files, and which substitutions
   (`refKey`) each file references.
3. **Follows them to the end.** Starting from the eval pages, it follows
   every `<Include>`, and the includes of those includes, until nothing new
   appears. It collects the substitutions used along the way. For the
   example above, the result is `alerts.mdx`, `_includes/a.mdx`,
   `_includes/b.mdx` and the `service` substitution. This is the
   **translatable set**, also called the transitive closure.
4. **Writes the manifest** to `data/<project>/<runId>/manifest.json`. It
   records the eval pages, the translatable set, and the locales.

Later stages read the manifest and do not rescan the project. `translate`
translates exactly the translatable set, and the scrape stages fetch
exactly the eval pages. A 25-page eval set is about 4% of a project's
content, so this avoids translating the whole project.

Flags:

| Flag | Description |
|---|---|
| `--project` | Required. The path under `content-mdx/` to a directory that contains `_site.json`, for example `atlas`. For a versioned docset, pass `<project>/<version>`, for example `manual/v8.0`. Passing a versioned project without a version lists the available versions. |
| `--pages <file>` | Optional. A file with one URL path or MDX path per line. Restricts the eval set to those pages. Errors if an entry matches no page. Defaults to every page in the project. |
| `--locales <list>` | Optional. Comma-separated locales, for example `es,ja-jp`. Overrides `TARGET_LOCALES`. The default is `pt-br,es,ko-kr,ja-jp,zh-cn`. |
| `--run <id>` | Optional. Uses this run ID instead of generating a new one. |

`resolve` fails with `content-mdx/<project> not found` if you skipped setup
step 4, and with `dir-name-to-prefix.json not found` if you skipped step 5.

## How localization works

`docs-site` has no locale routing — production locales are produced by
Smartling's CDN. So we **substitute content**: translated MDX is overlaid into
`content-mdx/<project>/` and the real `docs-site` is served at
production-identical URL paths. Local renders then differ from production only
by Smartling's rewriting, which is exactly the comparison we want.

`content-mdx/` is treated as scratch and is never committed.

## Related packages

The `translate` stage (not yet implemented) will use two sibling packages:

- `platform/tools/translation-service/`: the translation service and Grove
  backend. It is a private pnpm workspace package.
- `platform/tools/translation-mdx-adapter/`: flattens MDX into the strings
  the service translates and reapplies them afterward.

## Environment

See `.env.example`. Note: the `braintrust` CLI does **not** load a plain
`.env`; put `BRAINTRUST_API_KEY` in `.env.braintrust` or export it.

The package scripts load `.env` through `--env-file-if-exists`. A variable
that is already exported in your shell takes precedence over `.env`.

### Grove settings for `translate`

`translate` calls Grove through `translation-service`, which speaks the
OpenAI Responses API. Set these in `.env`:

```
GROVE_API_KEY=<your key>
GROVE_ENDPOINT=https://ai-gateway.corp.mongodb.com/openai/v1/responses
GROVE_MODEL=gpt-6-astra
```

- A key from the new AI Gateway only works with the `ai-gateway.corp.mongodb.com`
  endpoint. The service's built-in default is the legacy Azure gateway
  (`grove-gateway-prod.azure-api.net`), which rejects those keys with
  HTTP 401.
- The model must be one that the gateway serves on the `/openai/v1/responses`
  path. List them with `GET https://ai-gateway.corp.mongodb.com/openai/v1/models`.
  Claude models are served on `/anthropic/v1/messages`, a format this service
  does not support yet, and fail here with HTTP 404.
- A failed request is recorded in `data/<project>/<runId>/translate-failures.json`
  with the gateway's error, for example `Grove returned HTTP 401`.

## Development

```
pnpm test        # vitest
pnpm typecheck   # tsc --noEmit
```
