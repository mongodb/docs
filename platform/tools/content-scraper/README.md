# Content Scraper

Scrapes the core article content (title + plain text) from a defined list
of MongoDB docs pages, in English and all supported translations, for use
as a Braintrust eval dataset for docs-translation agents.

## Setup

```bash
pnpm install
```

## Usage

**Scrape all pages in `urls.txt` across every locale:**
```bash
node scrape.js
# Reads ./urls.txt, writes JSON files to ./output/<locale>/<slug>.json
```

**Resume an interrupted run:**
```bash
node scrape.js --resume
# Skips any url+locale pair whose output file already exists
```

**Use a different URL list or output directory:**
```bash
node scrape.js --urls-file my-urls.txt --output ./my-output
```

**Control concurrency:**
```bash
node scrape.js --concurrency 2
# Number of url+locale pairs fetched in parallel (default: 1)
```

**Retry previously skipped pages:**
```bash
node scrape.js --retry-skipped
# Re-fetches every entry in output/skipped.json except 404s, then rewrites
# skipped.json with whatever still fails (404s are left untouched).
```

## Locales

Each URL in `urls.txt` is expanded into 6 fetches, one per locale:

| Locale dir | URL prefix |
|---|---|
| `en`    | (none) |
| `pt-br` | `/pt-br` |
| `es`    | `/es` |
| `ko-kr` | `/ko-kr` |
| `ja-jp` | `/ja-jp` |
| `zh-cn` | `/zh-cn` |

e.g. `https://www.mongodb.com/docs/manual/` becomes
`https://www.mongodb.com/es/docs/manual/` for the `es` locale.

## Output

- `output/<locale>/<slug>.json` — one file per page per locale:
  ```json
  { "url": "...", "title": "...", "content": "..." }
  ```
- `output/skipped.json` — pages that returned a 403/404 (e.g. a
  translation that doesn't exist, or a page-level access restriction) or
  errored during scraping, with the reason. These do not stop the run.

## Content extraction

Content is extracted from the page's `<main>` element via `innerText`,
which on `platform/docs-site` already excludes the header, footer, left
nav sidebar, and right-hand in-page table of contents (they're siblings of
`<main>`, not descendants) — no additional filtering needed.

## Rate limiting

The target site is rate-limit sensitive. By default requests run
sequentially (`--concurrency 1`) with a randomized 5-8s delay before each
page, plus a 60s cooldown every 50 requests. A 403 or 404 on any page is
logged to `output/skipped.json` with the reason and the run continues — it
does not stop the whole run, since a 403 can also indicate a page-specific
access issue rather than rate limiting.

## Files

| File | Description |
|---|---|
| `scrape.js` | Main scraper: expands URLs × locales, scrapes, writes output |
| `urls.txt` | List of English source URLs (one per line) |
| `output/` | Scraped JSON output (gitignored) |
