# translation-sync

Keep the per-locale MDX mirror repos in sync with the English source. For a
target locale, the tool clones nothing itself: you point it at a clone of
`10gen/docs-mdx-en-us` (the source) and a clone of the locale's mirror repo
(the target), and it translates changed `.mdx` pages and `_references.json`
substitutions with `translation-service`, copies every other asset verbatim,
removes files the source no longer has, and records what it did in a manifest
at the target root.

The GitHub workflow that runs this in production is
`.github/workflows/mdx-locale-sync.yml`.

## How it works

Each run plans against the source and target trees and then acts on the plan:

| Bucket | Files in it | What the run does |
|---|---|---|
| `translate` | `.mdx` and `_references.json` whose source hash differs from the manifest (or that the manifest has never seen) | Translated through the configured backend; the target file and manifest entry are updated. |
| `copy` | Everything else — images, `_site.json`, any non-`.mdx` asset | Copied verbatim, byte for byte, with no translation pass. |
| `remove` | Files present in the target but not in the source | Deleted from the target and dropped from the manifest. |
| `unchanged` | `.mdx`/`_references.json` whose source hash matches the manifest | Left alone. A file that is unchanged but missing from the target is restored, so the mirror never silently loses content. |

`.mdx` files are translated through `translation-mdx-adapter`, which flattens
each page to translatable strings and reapplies the translations afterward.
`_references.json` gets a dedicated pass: only the `substitutions` values are
translated; `refs` and the rest of the file are preserved.

In `incremental` mode (the default) only files whose source SHA-256 changed
since the last run are translated. `--mode full` translates every file in
scope regardless of hash. `--scope` limits both trees to one directory under
`content-mdx/` (for example `voyageai` or `atlas`); pass `--scope ""` to sync
the whole `content-mdx/` tree. A scoped run preserves the manifest entries of
paths outside its scope.

## The manifest

`translation-manifest.json` is written at the target root after every
non-dry-run sync:

```json
{
  "sourceRepository": "10gen/docs-mdx-en-us",
  "sourceCommit": "abc123...",
  "targetLocale": "es",
  "files": {
    "content-mdx/voyageai/page.mdx": {
      "sourceSha256": "...",
      "translatedAt": "2026-11-03T12:00:00.000Z",
      "provider": "openai",
      "model": "gpt-5.5"
    }
  }
}
```

`files` is the incremental-sync index: one entry per translated file, keyed by
path relative to the target root, holding the source file's SHA-256, the
translation time, and the backend and model used. The next run reads this file
to decide what is unchanged; a scoped run keeps the entries of content outside
its scope.

## Failure policy

Failures are isolated per file. A file whose translation fails is recorded in
the run's failures with its error, its previous translation (if any) is kept
in the target and its previous manifest entry is retained, and the run
continues with the remaining files. The run still exits non-zero (`1`) if any
file failed, after printing the summary line to stdout and each failing file
with its error to stderr as `FAIL <file>: <error>`, so the workflow fails and
the next run retries the skipped files. `--dry-run`
plans and reports without writing anything.

## Commands

Run every command from this directory.

### sync

```
pnpm exec tsx src/cli.ts sync --source /tmp/source --target /tmp/target --locale es
```

Flags:

| Flag | Required | Default | Description |
|---|---|---|---|
| `--source` | Yes | — | Root of the English source clone (the repo that contains `content-mdx/`). |
| `--target` | Yes | — | Root of the locale mirror clone. The manifest is written here. |
| `--locale` | No | `es` | Target locale. Must be one of `es`, `zh-cn`, `ko-kr`, `pt-br`, `ja-jp`. |
| `--scope` | No | `voyageai` | Directory under `content-mdx/` to sync, or `""` for the whole tree. |
| `--mode` | No | `incremental` | `incremental` translates only changed files; `full` translates everything in scope. |
| `--backend` | No | `openai` | Translation backend: `openai`, `anthropic`, `aws-translate`, or `stub`. |
| `--model` | No | `gpt-5.5` | Model forwarded to the LLM backends. A `claude-*` model requires `--backend anthropic`; the CLI defaults `--backend` to `openai`, so a `claude-*` model alone still goes through the OpenAI path. |
| `--source-repo` | No | `10gen/docs-mdx-en-us` | Recorded in the manifest. |
| `--source-commit` | No | — | Source commit recorded in the manifest. The workflow sets this to the source clone's `HEAD`. |
| `--dry-run` | No | off | Plan and report without writing files or the manifest. |

### resolve-target

```
pnpm exec tsx src/cli.ts resolve-target --locale es
```

Prints the GitHub repository (`10gen/docs-mdx-<locale>`) that mirrors the
given locale. Unknown locales exit with an error listing the known ones.

## Running it locally

The workflow clones both repos into `$RUNNER_TEMP` and points `sync` at the
clones. To do the same locally, with the `stub` backend so no network calls
are made:

```bash
git clone --depth 1 git@github.com:10gen/docs-mdx-en-us.git /tmp/source
git clone git@github.com:10gen/docs-mdx-es.git /tmp/target
pnpm exec tsx src/cli.ts sync \
  --source /tmp/source \
  --target /tmp/target \
  --locale es \
  --scope voyageai \
  --source-commit "$(git -C /tmp/source rev-parse HEAD)" \
  --backend stub
```

Drop `--backend stub` and export `AI_GATEWAY_API_KEY` to translate for real.
For real runs the target needs credentials to commit and push; the workflow
uses a token, and locally your own Git credentials work.

## Setup

1. Use Node 24, the version in `platform/.nvmrc`:

   ```
   cd platform
   nvm use
   ```

2. Install dependencies from `platform/`. This package is a pnpm workspace
   member, so installing from this directory alone is not enough.

   ```
   pnpm install
   ```

3. Build the package `sync` imports from `dist/`. From `platform/`:

   ```
   pnpm --filter translation-mdx-adapter build
   ```

   Without it, `sync` fails with `Failed to resolve entry for package
   "translation-mdx-adapter"`.

## Related packages

- `platform/tools/translation-service/`: the translation service and its
  OpenAI, Anthropic, AWS Translate, and stub backends. `--backend` and
  `--model` select among them.
- `platform/tools/translation-mdx-adapter/`: flattens MDX into the strings
  the service translates and reapplies them afterward.
- `platform/tools/translation-evals/`: scores translation quality.

## Development

```
pnpm test        # vitest
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
```
