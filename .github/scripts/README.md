# `.github/scripts`

## `detect-mdx-content-paths.mjs`

Maps changed files under `content/` to Snooty content paths, filtered to
versions the docs site actually publishes.

    node .github/scripts/detect-mdx-content-paths.mjs \
      --content-dir content \
      --catalog platform/versioning/generated/docsets.json \
      --mode incremental --changed-files changed.txt

`--mode full` returns every active content path. The catalog is produced by
`pnpm --filter versioning run emit` and must exist first.

Unversioned projects are active when the docset has any active version;
versioned projects are active only when that exact `versionName` is active.

Tests: `node --test .github/scripts/detect-mdx-content-paths.test.mjs`

## Operating the MDX mirror sync

`mdx-en-us-sync.yml` runs on merges to `main` and pushes regenerated MDX to
`10gen/docs-mdx-en-us`. `mode: full` is both the initial backfill and the
repair lever after a failed run:

    gh workflow run mdx-en-us-sync.yml --ref main -f mode=full

Use `-f dry_run=true` to generate and report without pushing, and
`-f paths="voyageai manual/v8.0"` to force specific paths.

Each run writes the commit it synced from to `sync-manifest.json` in the
target repo, and the next run diffs from that commit instead of from the push
that triggered it. This is what makes a superseded run safe: if several merges
land while a sync is running, GitHub cancels the older pending run, and the
surviving run still picks up everything merged since the last successful sync.
A run with `-f paths=...` regenerates only the named paths and deliberately
does not update `sync-manifest.json`, so it never advances that marker. The
next normal run therefore re-covers that range.

### Credentials

The sync mints its token from the `mongodb-server-docs-sync-bot` GitHub App
(ID 867845), reading `vars.APP_ID` and `secrets.SERVER_DOCS_PRIVATE_KEY`
from the `Copy To Public` environment. It reuses that App instead of a
dedicated one because the App's private key cannot be read back out of
secrets. The token is scoped to the target repo with `owner: 10gen` and
`repositories: docs-mdx-en-us`.

## Operating the locale MDX sync

`mdx-locale-sync.yml` mirrors `10gen/docs-mdx-en-us` into a per-locale repo,
translating only the files that changed since the last run. Dispatch it with
the target locale and the content path to translate:

    gh workflow run mdx-locale-sync.yml --ref main -f locale=es -f scope=voyageai

`mode: incremental` (the default) translates only files whose source hash
changed since the previous run. `mode: full` translates every file in scope,
ignoring the manifest; it is the backfill for a new locale repo and the
repair lever after a failed run. Use `-f dry_run=true` to translate and
report without writing anything to the target repo.

The target repo is resolved from the locale by
`platform/tools/translation-sync/src/locale-targets.ts`, which maps each
locale to its `10gen/docs-mdx-<locale>` repo. Each run records the source
commit it synced from in the target repo's `translation-manifest.json` as
`sourceCommit`. That field is informational: the next run detects changes by
comparing each file's content hash against the manifest, not by diffing
commits.

### Prerequisites

The locale repo must already exist, and the `mongodb-server-docs-sync-bot`
App must be installed on it — the workflow mints one token scoped to both
the source and target repos. The `AI_GATEWAY_API_KEY` secret must be set in
the `Copy To Public` environment.
