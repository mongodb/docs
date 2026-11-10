# Next.js SSG Extension

Netlify build extension for `docs-site`, the SSG app for writer content. It turns the `content/` rST into the MDX, prefix map and table of contents that `docs-site` builds from, then publishes search manifests, llms.txt and offline docs once the deploy succeeds. Built with the [Netlify SDK](https://sdk.netlify.com/get-started/introduction/).

The ISR app `docs-nextjs` uses [`nextjs-extension`](../nextjs-extension/README.md) instead.

The package is named `ssg-extension`, so use `pnpm --filter ssg-extension`. The directory and the Netlify slug are `nextjs-ssg-extension`.

## What It Does

**`onPreBuild`** (`src/prepare.ts`):

1. Sets the build config: `ENV`, branch, database names (`src/contentMetadata/config.ts`)
2. Downloads and caches the Snooty parser
3. Loads the docset catalog by running `pnpm run emit` in `platform/versioning` on the checkout being built
4. Picks the content paths to build from `FORCE_REBUILD_PATHS` (`src/util/resolvePathsToBuild.ts`)
5. Parses each path, runs the persistence module in `dotcomprd` and `dotcomstg`, and converts the AST to MDX in `content-mdx/`
6. Writes `prefix-map.json` and `dir-name-to-prefix.json` to `docs-site/src/generated/`
7. Builds the unified table of contents and writes `docs-site/src/context/toc-data/data.copied.ts`

**`onSuccess`** (`src/index.ts`, `dotcomprd` and `dotcomstg` only): search manifests (S3 and the Atlas search cluster), llms.txt, then offline docs bundles uploaded to S3. A failed search or llms.txt step is logged and does not skip the steps after it. Any other `ENV` skips all of them.

## Running Without Netlify

`pnpm --filter ssg-extension run pipeline:prepare` bundles `src/cli/prepare.ts` into `dist/prepare.mjs` and runs the same `prepare()` outside Netlify, then writes `.pipeline/state.json` under `docs-site`. `docs-site#build:deploy` depends on it in `turbo.json`, which is how Vercel builds run it. If `FORCE_REBUILD_PATHS` is unset, the CLI defaults it to `DOCS_PROJECT`.

## Configuration

| Variable | Purpose | Value or example |
| --- | --- | --- |
| `NEXTJS_SSG_EXTENSION_ENABLED` | Turns the extension on for a site. Defaults to off. | `"true"`, set in `docs-site/netlify.toml` |
| `FORCE_REBUILD_PATHS` | Comma-separated content paths to build: a docset or a version. Required. If it is empty, the build logs an error and queues nothing. On a `manual` deploy preview, only the versions touched by the PR build when every changed file is under a manual version. | `manual/v8.0,manual/v7.0` or `manual` |
| `DOCS_PROJECT` | The project directory this site serves, with no slash. Scopes search manifests and llms.txt. | `manual` |
| `ALLOW_INACTIVE_VERSIONS` | Also builds inactive versions with `eolType: link`. Defaults to off. | `true` |
| `ENV` | Build environment. Set per deploy context in `docs-site/netlify.toml`. If it is unset, the extension falls back to `prd`; `pipeline:prepare` instead derives it from the Netlify or Vercel context and fails when it can't. | `dotcomprd` (production), `dotcomstg` (`preprd`), `prd` (previews and branch deploys), `stg` (`dev`) |
| `S3_SEARCH_BUCKET` | Bucket for search manifests. | Defaults to `docs-search-indexes-test` |
| `S3_OFFLINE_BUCKET` | Bucket for offline tarballs and llms.txt. Both fail without it. | No default |
| `AWS_S3_ACCESS_KEY_ID`, `AWS_S3_SECRET_ACCESS_KEY` | S3 credentials. | Secret |
| `MONGO_ATLAS_USERNAME`, `MONGO_ATLAS_PASSWORD` | Atlas credentials used in both connection strings. | Secret |
| `MONGO_ATLAS_CLUSTER0_HOST` | Host in the `ATLAS_CLUSTER0_URI` connection string. | `cluster0.example.mongodb.net` |
| `MONGO_ATLAS_SEARCH_HOST` | Host in the `ATLAS_SEARCH_URI` connection string. | `search.example.mongodb.net` |

The full list, with defaults, is in `src/util/assertDbEnvVars.ts`.

## Testing a Change in Staging

To try an unmerged change, `isEnabled` in `src/index.ts` is pointed at a staging flag (`NEXTJS_EXTENSION_ENABLED_STAGING` or `NEXTJS_EXTENSION_ENABLED_STAGING_2`) and that flag is set to `"true"` in `docs-site/netlify.toml`. Undo both before merging: the `Netlify config check` workflow fails a PR to `main` that leaves either in place. For the shared `preprd` branch flow, see [Testing in Staging](../README.md#testing-in-staging).

## Development

```bash
pnpm --filter ssg-extension run ssg-extension:build   # builds into .ntli
pnpm --filter ssg-extension test
pnpm exec tsc --noEmit                                  # from this directory; CI has no typecheck task for this package
```

The persistence tests start a `mongodb-memory-server` and need the 8.0.4 `mongod` binary. CI downloads and caches it.

## Key Entry Points

- `src/index.ts`: extension registration and hook orchestration
- `src/prepare.ts`: the `onPreBuild` pipeline, shared with `src/cli/prepare.ts`
- `src/contentMetadata/`: build config, docset catalog and content path metadata
- `src/parse/` and `src/persistence/`: parser runs and persistence to Atlas
- `src/searchManifests/`, `src/llms-txt/` and `src/offline-docs/`: the `onSuccess` steps
- `src/prefix-map/`: prefix maps written for `docs-site`
