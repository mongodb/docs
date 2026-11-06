# translation-snapshot

Takes full-page screenshots of docs pages from a locally running docs site. Use it to hand translated pages to native speakers for review as plain images, without asking them to read MDX.

It only takes screenshots. It does not translate, serve, or upload anything. To produce and serve translated pages, use [`translation-evals`](../translation-evals) (`translate`, then `serve`).

## Setup

```bash
cd platform
pnpm install
pnpm exec playwright install chromium
```

The tool is part of the `platform/` pnpm workspace, so the install at `platform/` covers it. The Chromium download is needed once per Playwright version and is shared with `translation-evals`. Node 20 or later is required.

## Usage

Start a docs server that serves the pages you want to capture, then run:

```bash
cd platform/tools/translation-snapshot
node src/snapshot.mjs \
  --base-url http://localhost:3000 \
  --pages pages.txt \
  --out out/es
```

| Option | Description | Default |
| --- | --- | --- |
| `--base-url` | Origin of the running docs server. | required |
| `--pages` | Text file with one URL path per line. Blank lines and lines starting with `#` are ignored. | required |
| `--out` | Directory for the PNGs and `summary.json`. | required |
| `--skip` | Comma-separated URL paths to leave out of the `--pages` list. | none |
| `--width` | Viewport width in px. | `1440` |
| `--max-height` | Pages taller than this many px are split into tiles. | `15000` |
| `--timeout` | Per-page navigation timeout in ms. | `120000` |

Example `pages.txt`:

```text
/docs/manual/core/sharding-shard-key
/docs/manual/aggregation
```

The tool exits with a non-zero code if any page fails to capture, so a partial run is not mistaken for a complete one.

## Output

For each page the tool writes `<slug>.png`, where the slug is the URL path without the leading `/docs/` and with `/` replaced by `__`. For example, `/docs/manual/core/sharding-shard-key` becomes `manual__core__sharding-shard-key.png`.

Pages taller than `--max-height` are written as `<slug>-part1of2.png`, `<slug>-part2of2.png`, and so on.

`summary.json` lists every page with its status, height, and files, or the error if it failed.

## Capturing a translated locale

Run `translation-evals` first so the locale's translated pages are in place, then serve it:

```bash
cd platform/tools/translation-evals
pnpm serve --project manual/manual --locale es
```

Use the `Local:` URL Next prints for `--base-url`. If port 3000 is taken, Next picks another one, and the banner printed by `serve` can show the wrong port.

`serve` copies the translated files over the English source and does not restore it. Serve and capture one locale at a time, and stop the server before starting the next.

## Known limits

- Only the article body is translated. The header, sidebar, footer, and text inside diagrams stay in English, and reviewers should be told this.
- Slashless URLs redirect to themselves on docs-site, so the tool always requests the URL with a trailing slash.
