# Redirect System

How redirects work in the platform/docs-site app: how they are migrated from Netlify config, and how the app handles redirect matching at request time.

## Part 1: Redirect migration scripts

### `parse-netlify-redirects.ts`

Parses `content/<product>/netlify.toml` and writes `src/redirects/<product>-redirects.json`.

Run: `pnpm parse:redirects <product>`

### `migrate-redirects.ts`

Sanitizes JSON redirect files for Next.js compatibility. Some Netlify patterns cause infinite loops in Next.js; this script detects and rewrites them.

Run: `pnpm migrate:redirects`

**What it does:**

1. **Rewrite catch-all version redirects** — patterns like:
   ```
   source:      /docs/drivers/node/:path*
   destination: /docs/drivers/node/current/:path*
   ```
   loop in Next.js because the new URL still matches the same pattern. The script replaces each with two safer entries:
   - A bare root redirect: `/docs/drivers/node/` → `/docs/drivers/node/current/`
   - A regex catch-all excluding version slugs: `/docs/drivers/node/:first((?!current|upcoming|v\d)[^/]+)/:rest*` → `/docs/drivers/node/current/:first/:rest*`

2. **Remove recursive redirects** — entries where source and destination resolve to the same URL.

3. **Deduplicate** — removes exact duplicate entries.

Version slugs (`current`, `upcoming`, `v<digit>...`) are excluded from catch-all matching to prevent loops.

### `generate-all-redirects.ts`

Auto-generates two aggregates by scanning for all `*-redirects.json` files in this directory:

- `all-redirects.ts` — static-import barrel used by the Next.js app (webpack).
- `all-redirects.json` — flattened data-only array read by the Netlify edge
  function. The edge function runs on Deno and cannot import the `.ts` barrel's
  transitive graph, so it reads this file directly. Regenerate both whenever a
  `*-redirects.json` file is added or changed.

Run: `pnpm generate:redirects`

**Run all three in sequence:** `pnpm import:redirects <product>`

---

## Part 2: Request-time redirect handling

The app uses a two-tier strategy. Whether a redirect fires depends on whether the target page exists.

### Tier 1 — Force redirects

**File:** `next.config.mjs`

At startup, Next.js loads all `*-redirects.json` files and registers entries with `force: true` via the `async redirects()` config. These fire before Next.js checks whether a page exists.

### Tier 2 — Soft redirects

**Files:** `redirect-utils.ts`, `soft-redirects.ts`, `netlify/edge-functions/soft-redirects.ts`, `src/app/docs/[[...path]]/page.tsx`

Soft redirects only fire when a page is not found. Because the
production build is a **static site** (no request-time server), soft
redirects are applied at the CDN edge by
`netlify/edge-functions/soft-redirects.ts`, which applies the same
matching logic as the app (a self-contained port of `redirect-utils.ts`,
kept in sync, since the edge bundler cannot import the app's module
graph):

1. Request arrives for a URL under `/docs/*`.
2. The edge function calls `context.next()` to get the static response.
3. Status is not 404 (page exists, or a force redirect already fired) →
   return it unchanged.
4. Status is 404 → call `findSoftRedirect(pathname)`.
5. Match found → redirect response honoring the JSON status (301/302).
6. No match → return the original 404.

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

---

## Data flow

```
Request arrives
    │
    ▼
next.config.mjs: force redirect match? ──yes──▶ 301/302
    │ no
    ▼
static response: page found? ───────────yes──▶ 200
    │ no (404)
    ▼
edge function: findSoftRedirect() match? ─yes─▶ 301/302
    │ no
    ▼
404
```

The "page found?" and edge-function steps are the CDN serving a static
asset and `netlify/edge-functions/soft-redirects.ts` wrapping the 404.

---

## Key files

| File | Purpose |
|---|---|
| `scripts/parse-netlify-redirects.ts` | Parse `netlify.toml` → JSON |
| `scripts/migrate-redirects.ts` | Sanitize JSON for Next.js |
| `scripts/generate-all-redirects.ts` | Generate `all-redirects.ts` barrel |
| `src/redirects/*-redirects.json` | Per-product redirect data (21 files) |
| `src/redirects/all-redirects.ts` | Auto-generated barrel (app/webpack) — do not edit |
| `src/redirects/all-redirects.json` | Auto-generated flat data (edge function/Deno) — do not edit |
| `src/redirects/redirect-utils.ts` | URL matching logic |
| `src/redirects/soft-redirects.ts` | Soft redirect aggregation |
| `netlify/edge-functions/soft-redirects.ts` | Applies soft redirects on 404 at the CDN edge (static host) |
| `src/app/docs/[[...path]]/page.tsx` | Request handler (renders pages / returns 404; soft redirects handled by the edge function) |
| `next.config.mjs` | Force redirect registration |
| `src/tests/scripts/migrate-redirects.test.ts` | Migration tests |
| `src/tests/redirects/redirect-utils.test.ts` | Matching tests |
| `src/tests/redirects/soft-redirects.test.ts` | Soft redirect tests |
