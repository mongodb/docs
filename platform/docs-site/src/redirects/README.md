# Redirect System

How redirects work in the platform/docs-site app: how the aggregate is generated, and how the app handles redirect matching at request time.

## Part 1: Redirect aggregate generation

### `generate-all-redirects.ts`

Auto-generates two aggregates by scanning for all `*-redirects.json` files in this directory:

- `all-redirects.ts` — static-import barrel used by the Next.js app (webpack).
- `all-redirects.json` — flattened data-only array read by the Netlify edge
  function. The edge function runs on Deno and cannot import the `.ts` barrel's
  transitive graph, so it reads this file directly. Regenerate both whenever a
  `*-redirects.json` file is added or changed.

Run: `pnpm generate:redirects`

---

## Part 2: Request-time redirect handling

The app uses a two-tier strategy. Whether a redirect fires depends on whether the target page exists.

### Tier 1 — Force redirects

**File:** `next.config.mjs`

At startup, Next.js loads all `*-redirects.json` files and registers entries with `force: true` via the `async redirects()` config. These fire before Next.js checks whether a page exists.

Each force entry also gets a generated `.md` copy (`markdownForceRedirects`): `/docs/atlas/cli/` → `/docs/atlas/cli/current/` becomes `/docs/atlas/cli.md{/}?` → `/docs/atlas/cli/current.md`. The copies are registered first so a `:path*` source with a fixed destination doesn't send `.md` URLs to its HTML page.

### Tier 2 — Soft redirects

**Files:** `redirect-utils.ts`, `soft-redirects.ts`, `netlify/edge-functions/soft-redirects.ts`, `src/app/[[...path]]/page.tsx`

Soft redirects only fire when a page is not found. Because the
production build is a **static site** (no request-time server), soft
redirects are applied at the CDN edge by
`netlify/edge-functions/soft-redirects.ts`, which applies the same
matching logic as the app (a self-contained port of `redirect-utils.ts`,
kept in sync, since the edge bundler cannot import the app's module
graph).

The same edge function also 301s mixed-case page URLs to lowercase
*before* calling origin. Page MDX is emitted at a lowercase path, so
that is the static route. Mixed-case requests (old inbound links, cached
Google URLs) 301 there. Authored soft redirects on a mixed-case source
still take precedence over the casing 301.

That pre-origin table lookup is limited to paths that actually contain
uppercase characters. Matching normalizes the trailing slash first, so
consulting the table for a path that is only missing its slash would
answer live pages out of the redirect table: the entry
`/docs/:version/release-notes/:path*` 301s `/docs/manual/release-notes`
to itself. A slash-only difference is fixed with a plain 301 and the
reissued request reaches origin.

`src/middleware.ts` does the same casing 301 in `next dev` (the Netlify
edge function does not run locally). Next.js `trailingSlash: true` treats
a last-segment dot as a file; `skipTrailingSlashRedirect` in
`next.config.mjs` turns that off so dotted slugs such as
`db.collection.findOneAndUpdate` keep a trailing slash like every other
HTML page.

Because the docs route sets `dynamicParams = false`, unknown paths 404
without invoking the page component, so soft redirects are handled only
by the edge function — `page.tsx` no longer checks them.

**URL matching** uses `path-to-regexp` v6:
- `:param` — one path segment
- `:param*` — zero or more segments
- `:name(rx)` — one segment matching regex `rx`

Matchers are pre-compiled on startup and tested in array order; first match wins. Incoming paths are normalized to include a trailing slash before matching.

**Status codes:**
- `301` — permanent (stable renames)
- `302` — temporary

### Markdown (`.md`) URLs

Every redirect also applies to the page's `.md` export. Do not add `.md`
entries to `*-redirects.json`; they are derived from the HTML entries.

- **Soft:** the edge function maps a `.md` request back to its page path
  (`publicDocsPath`: `.md`, `.md/`, `/index.md`), matches it, then converts
  the destination with `markdownRedirectDestination`.
- **Force:** the generated `.md` copies described in Tier 1.

`markdownRedirectDestination` appends `.md` (keeping any `?query` or
`#fragment`), so `/docs/` becomes `/docs.md`. It leaves external
destinations (GitHub, `www.mongodb.com` pages outside `/docs/`) unchanged.

Absolute `https://www.mongodb.com/docs/...` and `https://mongodb.com/docs/...`
destinations convert and keep their host.

---

## Data flow

```
Request arrives
    │
    ▼
next.config.mjs: force redirect match? ──yes──▶ 301/302
    │ no
    ▼
edge/middleware: page-like path not already
lowercase + trailing slash?
    │ yes
    ├─ path has uppercase?
    │      └─ authored soft redirect for it? ──yes──▶ 301/302
    └─ else 301 to lowercase + trailing slash
    │ no
    ▼
static response: page found? ───────────yes──▶ 200
    │ no (404)
    ▼
edge: findSoftRedirect() match? ─yes─▶ 301/302
    │ no
    ▼
404
```

On Netlify the casing 301 is `netlify/edge-functions/soft-redirects.ts`
(matcher `/docs/*`). In `next dev` it is `src/middleware.ts`.

---

## Key files

| File | Purpose |
|---|---|
| `scripts/generate-all-redirects.ts` | Generate `all-redirects.ts` barrel |
| `src/redirects/*-redirects.json` | Per-product redirect data (21 files) |
| `src/redirects/all-redirects.ts` | Auto-generated barrel (app/webpack) — do not edit |
| `src/redirects/all-redirects.json` | Auto-generated flat data (edge function/Deno) — do not edit |
| `src/redirects/redirect-utils.ts` | URL matching logic |
| `src/redirects/soft-redirects.ts` | Soft redirect aggregation |
| `src/redirects/case-canonical.ts` | Lowercase public-URL helpers (edge 301) |
| `src/redirects/markdown-export.ts` | `.md` path mapping and redirect destination conversion (shared by the edge function, `next.config.mjs` and Jest) |
| `netlify/edge-functions/soft-redirects.ts` | Applies soft redirects on 404 and mixed-case 301s at the CDN edge (static host) |
| `src/app/[[...path]]/page.tsx` | Request handler (renders pages / returns 404; soft redirects handled by the edge function) |
| `next.config.mjs` | Force redirect registration |
| `src/tests/redirects/redirect-utils.test.ts` | Matching tests |
| `src/tests/redirects/soft-redirects.test.ts` | Soft redirect tests |
| `src/tests/redirects/markdown-export.test.ts` | `.md` redirect tests |
