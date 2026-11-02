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
