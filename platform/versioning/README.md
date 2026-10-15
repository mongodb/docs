# Docs versioning

This package is the source of truth for **which docs sites exist and which versions each one publishes**. It replaced two Atlas collections, `pool.docsets` and `pool.repos_branches`, which meant shipping a version was two steps: merge the content, then edit the database in Compass.

Versioning is now git. Adding a version is a pull request, and it can be the same pull request that adds the content.

```
platform/versioning/
  types.ts            schema + JSDoc
  define.ts           defineDocset(): defaults and author-time invariants
  index.ts            the barrel -- every project file is registered here
  lint.ts             checks that need the filesystem or cross-file state
  projects/<name>.ts  one file per docs site
  scripts/
    emit-catalog.ts   writes generated/docsets.json for consumers that
                      cannot import TypeScript
```

## The one rule that matters

**`versionName` is the version's only identity.** For a site with more than one version, the same string is all of these at once:

- the content directory: `content/<contentDir>/<versionName>/`
- the URL segment after the prefix: `/docs/atlas/cli/v1.57/`
- the `--branch` value the parser is built with, and `metadata.branch` in the documents DB
- the suffix of the docs-search key: `atlas-cli-v1.57`

A single-version site is the exception. Its `versionName` is a stub, by convention `main`. It still names the search key and the offline bundle, but it is **not** a URL segment — that site publishes at its prefix alone (`/docs/compass/`, not `/docs/compass/main/`), and its content lives directly at `content/compass/`.

The old schema split this across `gitBranchName`, `urlSlug` and `urlAliases`. Those are gone. If you find yourself wanting a second name for a version, you want a Netlify redirect instead.

## Authoring

A project file is small. `defineDocset()` fills in the defaults:

```ts
import { defineDocset } from "../define";

export default defineDocset({
  project: "atlas-cli",              // must match the filename AND snooty.toml `name`
  displayName: "Atlas CLI",
  prefix: "docs/atlas/cli",          // no leading or trailing slash
  search: { categoryTitle: "Atlas CLI" },
  versions: [                        // order = version dropdown order, newest first
    { name: "upcoming", noIndexing: true },
    { name: "current", label: "current (v1.58.2)", stable: true },
    { name: "v1.57" },
    { name: "v1.52", active: false, eol: "download" },
  ],
});
```

Version fields, all optional except `name`:

| Field | Default | Meaning |
|---|---|---|
| `name` | required | the `versionName` — see above |
| `label` | `name` | what the version dropdown shows |
| `active` | `true` | `false` removes it from the dropdown, sitemap, and search |
| `stable` | `false` | the version readers land on by default; at most one per site |
| `noIndexing` | `false` | keep out of search indexing and the sitemap; still reachable by direct link |
| `eol` | — | `"download"` or `"link"`; how an inactive version is still offered |
| `offlineUrl` | — | direct URL to the offline archive |

Docset fields: `project`, `displayName` and `prefix` are required, `versions` needs at least one entry. `search` is optional — omit it and the site contributes no search keys. `search.categoryName` defaults to `project` and is only needed where they differ (the Manual's `project` is `docs`, its `categoryName` is `manual`). `internalOnly: true` hides a site from sitemaps, health checks and `llms.txt`; it does not make it private. `groups` splits the dropdown into labelled sections, like the Manual's Major/Minor Release.

## Common tasks

**Add a version to an existing site.** Create `content/<dir>/<version>/`, then add `{ name: "<version>" }` to that project's `versions` array in the position you want it to appear. Same PR is fine.

**Cut a new current release.** Move `stable: true` to the new version and update the `label`. Two active versions with `stable: true` fails the build.

**End-of-life a version.** Set `active: false` and usually `eol: "download"` alongside it, with an `offlineUrl` if an archive exists. Leave `eol` off entirely for a version that should just disappear.

**Add a whole new site.** Create `projects/<project>.ts` named after the `name` in that site's `snooty.toml` — not after the content directory, which often differs (project `docs` lives in `content/manual/`). Then register it in `index.ts`, in both the import list and the `projects` array. CI fails if you forget; the barrel is explicit on purpose, so a new site can't appear by accident.

**Retire a site.** Remove it from `index.ts` and delete its file. If the content directory is gone but you want the EOL versions to stay listed, keep the file with every version `active: false` — the lint only requires content directories for active versions.

## What depends on this

| Consumer | How it reads the catalog |
|---|---|
| `docs-site`, `docs-nextjs` | `import { docsets } from "versioning"` |
| `GET /api/docsets`, `/api/docsets/[project]` | the catalog, plus a host map for snooty-data-api |
| `GET /api/search-mapping` | derived — keys are `${categoryName}-${versionName}`, skipping inactive and `noIndexing` versions |
| prefix map (`build-prefix-map.ts`) | derived — `prefix/versionName` for multi-version sites, `prefix` alone for single-version |
| `nextjs-extension`, `nextjs-ssg-extension` | `loadVersioningFromCheckout()` — runs `pnpm emit` in the build checkout and reads `generated/docsets.json` |
| `tools/generate-llms` | reads `internalOnly` from the emitted JSON |

The extensions deliberately do **not** import the TypeScript. They are published artifacts, so a module-scope import would freeze the catalog at publish time — a branch adding a new version would then build against a catalog that has never heard of it. Reading the checkout keeps the catalog bound to the branch being built.

`generated/docsets.json` is gitignored. It is literally `JSON.stringify(docsets)` with no reshaping, so it cannot drift from the TypeScript.

> **Renaming a `versionName` renames its search key.** Search manifests are S3 files named after the key, so a rename empties global search for that property until the manifests are renamed or reindexed. Renaming is a migration, not an edit.

## Checks

```bash
pnpm --filter versioning lint        # the catalog checks
pnpm --filter versioning typecheck   # tsc
pnpm --filter versioning emit        # write generated/docsets.json
```

`lint` runs in CI on every PR that touches `platform/` or `content/table-of-contents/`. Errors fail the build; warnings don't.

Some invariants are enforced earlier, by `defineDocset()` at import time, so they fail anything that loads the catalog — a missing `project`, `prefix` or `versions`; a version with no `name`; a duplicate `versionName`; more than one active `stable`; or a `groups` entry naming a version the site doesn't have.

`lint.ts` covers what a single file can't see:

1. **Barrel agreement** — every file in `projects/` is registered in `index.ts`, and vice versa. *Error.*
2. **Unique project ids.** *Error.*
3. **Unique prefixes** — `docs` and `landing` are the one allowed pair, since `landing` serves `/docs/` itself while `docs` serves `/docs/<version>/`. *Error.*
4. **Active versions have content** — `content/<dir>/<versionName>/` must exist for a multi-version site, `content/<dir>/` for a single-version one. *Error.* This is the check that catches a version added to the catalog before its content lands.
5. **Content without a catalog entry** — a version directory under `content/` that no project lists. *Warning*, because it is usually work in progress.
6. **TOC version gates** — TOC items can be gated with `versions: { includes/excludes }`, and those names must be real `versionName` values. *Warning.* This one matters more than it looks: an unmatched gate **fails open**, so an `excludes` silently stops hiding its item and an `includes` silently stops showing it. Nothing else catches it.

Rule 6 reads the TOC *source*, not `content/table-of-contents/output/toc.json`. That artifact is gitignored, so it is missing in CI and stale locally. Only hand-written literal arrays are checked — gates built by the version-array helpers (`manualVersions.after('v8.2')`) pass through `Versions.clean()`, which maps release numbers to catalog names, and are correct by construction.
