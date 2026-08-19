# Inline CSS Byte Baseline

docs-site inlines its LeafyGreen styles into every served HTML document. `src/app/emotion.tsx`
installs LeafyGreen's Emotion cache app-wide and serializes every generated rule into
`<style data-emotion=...>` tags through `useServerInsertedHTML`. That markup sits ahead of the page
content, so anything reading the raw HTML pays for the whole stylesheet before reaching a line of
prose. An AI agent fetching a docs page pays it in full.

This document records the measurement procedure and the numbers it produced, so the same number can
be taken again after the LeafyGreen-to-Via migration removes the Emotion plumbing. A figure measured
a different way is not a comparison, so the measurement lives in a committed script instead of
someone's terminal history.

Nothing in CI enforces a threshold on this number today.

## Running the report

The script measures served HTML, so it needs a running server. The sample holds one group per
project, because each project is a separate docs-site build served at its own base URL. Measure one
group per build and accumulate them into a single report with `--merge`.

From `platform/` for the conversion step, then `platform/docs-site/` for the rest:

```bash
# 1. Generate MDX for each sample project (from platform/, one time each)
pnpm convert:rst-to-mdx -- atlas
pnpm convert:rst-to-mdx -- django-mongodb
pnpm convert:rst-to-mdx -- manual
pnpm convert:rst-to-mdx -- node

# 2. Write the prefix map the base paths come from (from platform/docs-site/)
pnpm build:prefix-map

# 3. Per group: build, serve, measure. Repeat for each group in the sample.
DOCS_PROJECT=atlas pnpm build
DOCS_PROJECT=atlas pnpm start
#   ...and in another shell:
pnpm measure:inline-css --group atlas --merge report.json

# 4. Same for the remaining groups, merging into the same report file
DOCS_PROJECT=django-mongodb pnpm build && DOCS_PROJECT=django-mongodb pnpm start
pnpm measure:inline-css --group django-mongodb --merge report.json

DOCS_PROJECT=manual pnpm build && DOCS_PROJECT=manual pnpm start
pnpm measure:inline-css --group manual --merge report.json

DOCS_PROJECT=node pnpm build && DOCS_PROJECT=node pnpm start
pnpm measure:inline-css --group node --merge report.json
```

Each group's sample entry records the `DOCS_PROJECT` value to build it with and the base URL to
measure it at, so the two never have to be guessed.

Measure the groups in any order. `--merge` sorts them by project name, so a later report diffs
cleanly against this one instead of shifting every group block.

**Always build in the multi-version form.** Use `DOCS_PROJECT=manual`, not
`DOCS_PROJECT=manual/manual`. The single-version form takes a branch in `generateDocsStaticPaths`
that omits the version segment from the generated static params, and it fails two different ways:

- For a docset with a multi-segment prefix (`django-mongodb`), the prefix remap no-ops and the build
  dies with `Expected path "django-mongodb" to start with docset prefix
"languages/python/django-mongodb"`. You find out immediately.
- For a docset whose stripped prefix is empty (`manual`), no assertion is left to fire, so the build
  **succeeds** and serves a site where only the root page resolves. Every sub-page 404s, including
  the links the root page itself renders. This one passes for a working build, which is what
  happened while recording this baseline.

`DOCS_PROJECT=manual` builds all eight version directories rather than one. That takes about an
hour, and it is the only form that produces a working manual build today.

Base paths come from a database rather than project directory names, so read them out of the
generated `src/generated/dir-name-to-prefix.json`. That file holds the whole base path including the
leading `docs/`, so `django-mongodb` maps to `docs/languages/python/django-mongodb`.

Useful flags:

| Flag                | Effect                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| `--group <project>` | Group to measure. Required when the sample defines more than one.         |
| `--base-url <url>`  | Override the group's default base URL (e.g. to measure a deploy preview). |
| `--sample <path>`   | Use a different sample file (default `scripts/inline-css-sample.json`).   |
| `--json <path>`     | Write this run's report as JSON, replacing the file.                      |
| `--merge <path>`    | Merge this group into an existing report, so several builds accumulate.   |
| `--label <text>`    | Free-text label recorded in the report, e.g. the commit SHA measured.     |

## The page sample

The sample is fixed in [`scripts/inline-css-sample.json`](scripts/inline-css-sample.json): 27 pages
across four groups. Treat it as pinned. Changing which pages are measured invalidates the
comparison against the baseline below, so if a page has to change, re-record the baseline in the
same PR and say why.

- **`manual`** (9 pages), **`atlas`** (6 pages), and **`node`** (6 pages), drawn from the
  high-traffic list in
  [`top-pages.ts`](../docs-nextjs/netlify/functions/health-check-utils/top-pages.ts). Those three
  projects account for most of that list, so they are where the byte cost is paid. `node` is also
  the only driver docset here, and driver pages make heavy use of language tabs and composables.
- **`django-mongodb`** (6 pages), a size spread from a 71-byte page to the project's longest, and
  cheap to rebuild. Use this group for a quick check.

`top-pages.ts` holds production `mongodb.com/docs/...` URLs, and production serves most of those
pages from the Gatsby/Snooty stack rather than from docs-site. The list is used here only to choose
which pages matter; measurements always come from a local docs-site build.

Not every high-traffic project is covered. `compass`, `mongodb-shell`, `database-tools`, and
`pymongo-driver` also appear high in the list. Adding a group for one is mechanical (convert its
MDX, add a group entry, build, merge), but each addition costs another full build. The four groups
here bracket the range at 338–732 KB per page and cover three page shapes: server prose (`manual`),
product docs (`atlas`), and driver docs (`node`). A fifth would mostly confirm what these show.

## What the numbers mean

- **Inline CSS**: bytes of every `<style>` element, markup included. The shipped cost.
- **of which Emotion**: the subset carrying a `data-emotion` attribute, so attributable to
  `app/emotion.tsx`. The part the Via migration deletes.
- **Share**: inline `<style>` bytes as a fraction of the whole document.
- **Before `<main>`**: bytes a reader gets through before the first content element.

Byte counts are UTF-8 bytes of the served document, counted with `Buffer.byteLength` rather than
character counts. The parser matches complete `<style>` elements case-insensitively. Next escapes
`<` inside the RSC flight payload, so style markup repeated there is not double-counted, which was
verified against a real served page and is pinned by a test.

## Baseline

<!-- BASELINE:START -->

**Recorded 2026-08-12** (week 1 of the Via migration), against `main` at commit `2af97b210f`, with
`content-mdx/` holding `atlas`, `django-mongodb`, `manual`, and `node`. Every inline byte below sits
in a single `<style data-emotion=...>` tag per page, so the "of which Emotion" column is omitted: it
equals the inline total in every row.

**`atlas`**, built with `DOCS_PROJECT=atlas pnpm build`, served at `/docs/atlas`

| Page                                 |    Inline CSS | Tags | Share of HTML | Before `<main>` |    Total HTML |
| ------------------------------------ | ------------: | ---: | ------------: | --------------: | ------------: |
| Add database users (top-traffic)     |       726,139 |    1 |         50.4% |         834,840 |     1,440,561 |
| Troubleshoot connection              |       705,888 |    1 |         52.6% |         814,528 |     1,341,931 |
| IP access list                       |       699,177 |    1 |         56.6% |         807,932 |     1,236,319 |
| Connect to a deployment              |       651,340 |    1 |         55.6% |         759,909 |     1,172,042 |
| Create & connect deployments (short) |       613,435 |    1 |         57.0% |         721,907 |     1,075,516 |
| Connect via driver (long)            |       655,902 |    1 |         47.2% |         764,486 |     1,390,661 |
| **Total**                            | **4,051,881** |    6 |     **52.9%** |               — | **7,657,030** |

**`django-mongodb`**, built with `DOCS_PROJECT=django-mongodb pnpm build`, served at
`/docs/languages/python/django-mongodb/current`

| Page                        |    Inline CSS | Tags | Share of HTML | Before `<main>` |    Total HTML |
| --------------------------- | ------------: | ---: | ------------: | --------------: | ------------: |
| Reference (near-empty page) |       434,638 |    1 |         53.4% |         543,647 |       814,632 |
| Landing page                |       338,226 |    1 |         44.7% |         447,219 |       756,892 |
| Issues & Help (short)       |       463,264 |    1 |         52.6% |         572,436 |       880,815 |
| Connect (medium)            |       409,148 |    1 |         47.0% |         518,229 |       871,054 |
| Indexes (long)              |       427,912 |    1 |         43.8% |         537,108 |       976,925 |
| Specify a Query (longest)   |       446,001 |    1 |         38.4% |         555,260 |     1,160,043 |
| **Total**                   | **2,519,189** |    6 |     **46.1%** |               — | **5,460,361** |

**`manual/manual`**, built with `DOCS_PROJECT=manual pnpm build`, served at `/docs/manual`

| Page                               |    Inline CSS | Tags | Share of HTML | Before `<main>` |     Total HTML |
| ---------------------------------- | ------------: | ---: | ------------: | --------------: | -------------: |
| Install Community (top-traffic #1) |       407,504 |    1 |         26.2% |         516,469 |      1,553,803 |
| Connection string URI              |       700,317 |    1 |         53.7% |         809,378 |      1,304,163 |
| Installation (short hub)           |       695,345 |    1 |         59.7% |         804,343 |      1,164,869 |
| Manual landing page                |       690,499 |    1 |         59.6% |         799,385 |      1,159,288 |
| Indexes (hub)                      |       700,747 |    1 |         58.6% |         809,376 |      1,195,079 |
| CRUD (hub)                         |       691,777 |    1 |         58.9% |         800,520 |      1,174,869 |
| Query documents (tutorial)         |       731,601 |    1 |         37.8% |         840,668 |      1,936,986 |
| Built-in roles (long reference)    |       704,072 |    1 |         52.0% |         812,999 |      1,353,595 |
| Glossary (longest reference)       |       698,122 |    1 |         40.9% |         807,127 |      1,706,725 |
| **Total**                          | **6,019,984** |    9 |     **48.0%** |               — | **12,549,377** |

**`node`**, built with `DOCS_PROJECT=node pnpm build`, served at `/docs/drivers/node/current`

| Page                           |    Inline CSS | Tags | Share of HTML | Before `<main>` |    Total HTML |
| ------------------------------ | ------------: | ---: | ------------: | --------------: | ------------: |
| Node driver landing page       |       517,634 |    1 |         51.3% |         626,689 |     1,009,198 |
| Get started (top-traffic)      |       492,849 |    1 |         49.3% |         601,928 |       999,580 |
| MongoClient (top-traffic)      |       446,482 |    1 |         48.2% |         555,541 |       926,222 |
| Connect (short hub)            |       449,607 |    1 |         51.0% |         558,535 |       881,641 |
| Insert (composable/tabbed)     |       470,168 |    1 |         45.3% |         579,139 |     1,036,878 |
| Mongoose get started (longest) |       486,644 |    1 |         42.0% |         595,713 |     1,159,510 |
| **Total**                      | **2,863,384** |    6 |     **47.6%** |               — | **6,013,029** |

**All groups: 15,454,438 bytes of inline `<style>` across 27 pages, 48.8% of 31,679,797 bytes of
served HTML, all of it from `app/emotion.tsx`.**

All byte figures are bytes of UTF-8 served HTML. The raw report behind these tables is committed
beside this file as [`inline-css-baseline.json`](inline-css-baseline.json), so a later run can be
diffed against it rather than re-typed.

What the numbers say:

- **All of it is Emotion, in one tag per page.** Each page carries a single serialized blob rather
  than a long tail of small stylesheets. Deleting `app/emotion.tsx` should take this to roughly zero
  rather than reduce it.
- **The cost is boilerplate.** The near-empty django-mongodb Reference page, 71 bytes of source MDX,
  carries 434 KB of inline CSS, within 3% of the longest page in that project. Across `manual` the
  figure holds in a 690–732 KB band whether the page is a short hub or the 185 KB glossary.
- **It lands ahead of the content.** 447–841 KB precede the first `<main>` on every page measured,
  so an agent fetching any of these reads between half and eight-tenths of a megabyte before the
  first word of prose.
- **It varies by project rather than by page.** Pages cluster tightly within a project and separate
  cleanly between them: `atlas` at 613–726 KB, `manual` at 690–732 KB excluding one outlier, `node`
  at 446–518 KB, `django-mongodb` at 338–463 KB. The plausible driver is how many distinct
  LeafyGreen components a project's page templates pull in. Two of the three most expensive projects
  are also the two highest-traffic ones.
- **Composability does not explain the spread.** `manual/administration/install-community` reports
  407 KB against 690–732 KB for its siblings, on the largest page in the group, and it is the
  highest-traffic page in the docs. The `node` group was added partly to test whether heavily-tabbed
  composable pages are cheaper. They are not: within `node`, the composable `crud/insert` page
  (470 KB) sits mid-range among its siblings. The outlier is still unexplained and worth a look on
  its own.

### Precision of this metric

Two builds of the same commit did not produce identical numbers. Re-measuring `django-mongodb`
against a fresh build left three of six pages byte-identical and moved the other three by up to 7%
(`Indexes` 460,364 → 427,912; `Specify a Query` 433,559 → 446,001). The likeliest cause is that
`content-mdx/` gained the `atlas` and `manual` projects between the two runs, changing the generated
TOC and wayfinding data those pages render. Per-build variation in how Emotion serializes rules
across streaming boundaries would produce the same effect.

Treat this as an order-of-magnitude metric. It is built to show hundreds of kilobytes per page
becoming approximately zero, and it cannot attribute a few percent to any particular change. For the
closest comparison, re-measure with the same set of projects converted in `content-mdx/`, which is
why the recorded set is named above. The same limit argues for keeping the deferred CI ratchet loose
when it lands.

<!-- BASELINE:END -->

## What moves this number

Nothing in Via migration Phase 1. Phase 1 replaces component call sites while the Emotion cache
stays installed app-wide, so the LeafyGreen components not yet converted still render correctly.
`app/emotion.tsx` is untouched by design this cycle, and the baseline should hold roughly flat
through it.

The drop lands in the follow-on cycle, when the last LeafyGreen component leaves the tree and
`app/emotion.tsx` can be deleted outright. Inline `<style>` bytes should then fall to approximately
zero, with styling served as static CSS. Re-run this report against the same sample and record the
result beside the baseline.

A CI ratchet on this metric was deferred to that cycle so the guard lands with the deletion it
protects rather than months ahead of it.
