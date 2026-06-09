# Docs Comparison

Screenshots and side-by-side visual comparison of any MongoDB docs section: production vs staging.

## Setup

```bash
pnpm install
```

## Usage

**Run a full crawl + screenshot:**
```bash
node crawler.js \
  --prod https://www.mongodb.com/docs/drivers/node/current/ \
  --staging https://mongodbcom.staging.corp.mongodb.com/docs/drivers/node/current/
# Crawls all pages under the prod URL, screenshots prod + staging, writes results.json
```

**Control concurrency:**
```bash
node crawler.js \
  --prod https://www.mongodb.com/docs/drivers/node/current/ \
  --staging https://mongodbcom.staging.corp.mongodb.com/docs/drivers/node/current/ \
  --concurrency-prod 2 \
  --concurrency-staging 5
```

**Resume an interrupted crawl:**
```bash
node crawler.js --resume
```

**Retry pages that errored:**
```bash
node retry-errors.js
```

**Generate the side-by-side HTML report:**
```bash
node report-visual.js
# → visual-report.html (images link to local files — requires a local server to open)
# e.g. npx serve . then open http://localhost:3000/visual-report.html

node report-visual.js --standalone
# → visual-report-standalone.html (all images embedded — open directly in browser)
```

**Interactive page-by-page review:**
```bash
node review-server.js
# → http://localhost:3000
```

## Files

| File | Description |
|---|---|
| `crawler.js` | Crawls all URLs under `--prod`, screenshots prod + staging, writes `results.json` |
| `retry-errors.js` | Re-screenshots any pages that errored in a previous crawl |
| `report-visual.js` | Generates side-by-side HTML report from `results.json` |
| `review-server.js` | Local web app to page through screenshot pairs and queue retries |
| `urls.txt` | Cached list of discovered URLs (empty or absent to force a re-crawl) |
| `results.json` | Output from the crawler — one entry per page |
| `screenshots/` | Raw PNG screenshots (`prod/` and `staging/` subdirs) |

## Excluded paths

To skip specific URL paths, edit `EXCLUDED_PATHS` in `crawler.js`:

```js
const EXCLUDED_PATHS = [
  // e.g. /^\/docs\/drivers\/node\/current\/reference(\/|$)/,
];
```
