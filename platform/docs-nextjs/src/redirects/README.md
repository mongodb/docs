# Redirect System

How redirects work in the platform/docs-nextjs app: how they are migrated from Netlify config, and how the app handles redirect matching at request time.

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

Auto-generates `all-redirects.ts` by scanning for all `*-redirects.json` files in this directory.

Run: `pnpm generate:redirects`

**Run all three in sequence:** `pnpm import:redirects <product>`

---

## Part 2: Request-time redirect handling

The app uses a two-tier strategy. Whether a redirect fires depends on whether the target page exists.

### Tier 1 — Force redirects

**File:** `next.config.mjs`

At startup, Next.js loads all `*-redirects.json` files and registers entries with `force: true` via the `async redirects()` config. These fire before Next.js checks whether a page exists.

### Tier 2 — Soft redirects

**Files:** `redirect-utils.ts`, `soft-redirects.ts`, `src/app/docs/[[...path]]/page.tsx`

Soft redirects only fire when a page is not found:

1. Request arrives for a URL.
2. `page.tsx` calls `loadMDX()` to fetch the page content.
3. MDX found → render page (200). Done.
4. MDX not found → `page.tsx` calls `findSoftRedirect(urlPath)`.
5. Match found → redirect response (301/302).
6. No match → 404.

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
page.tsx: loadMDX() found? ─────────────yes──▶ 200
    │ no
    ▼
page.tsx: findSoftRedirect() match? ────yes──▶ 301/302
    │ no
    ▼
404
```

---

## Key files

| File | Purpose |
|---|---|
| `scripts/parse-netlify-redirects.ts` | Parse `netlify.toml` → JSON |
| `scripts/migrate-redirects.ts` | Sanitize JSON for Next.js |
| `scripts/generate-all-redirects.ts` | Generate `all-redirects.ts` barrel |
| `src/redirects/*-redirects.json` | Per-product redirect data (21 files) |
| `src/redirects/all-redirects.ts` | Auto-generated barrel — do not edit |
| `src/redirects/redirect-utils.ts` | URL matching logic |
| `src/redirects/soft-redirects.ts` | Soft redirect aggregation |
| `src/app/docs/[[...path]]/page.tsx` | Request handler |
| `next.config.mjs` | Force redirect registration |
| `src/tests/scripts/migrate-redirects.test.ts` | Migration tests |
| `src/tests/redirects/redirect-utils.test.ts` | Matching tests |
| `src/tests/redirects/soft-redirects.test.ts` | Soft redirect tests |
