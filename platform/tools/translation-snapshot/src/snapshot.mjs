#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { chromium } from 'playwright';

const USAGE = `Usage: node src/snapshot.mjs --base-url <url> --pages <file> --out <dir> [options]

  --base-url    Origin of the running docs server, e.g. http://localhost:3000   (required)
  --pages       Text file with one URL path per line, e.g. /docs/manual/aggregation  (required)
  --out         Directory to write PNGs and summary.json into                   (required)
  --skip        Comma-separated URL paths to leave out of the --pages list
  --width       Viewport width in px (default 1440)
  --max-height  Split pages taller than this many px into tiles (default 15000)
  --timeout     Per-page navigation timeout in ms (default 120000)
`;

const { values } = parseArgs({
  options: {
    'base-url': { type: 'string' },
    pages: { type: 'string' },
    out: { type: 'string' },
    skip: { type: 'string', default: '' },
    width: { type: 'string', default: '1440' },
    'max-height': { type: 'string', default: '15000' },
    timeout: { type: 'string', default: '120000' },
    help: { type: 'boolean', short: 'h' },
  },
});

if (values.help || !values['base-url'] || !values.pages || !values.out) {
  console.error(USAGE);
  process.exit(values.help ? 0 : 2);
}

const baseUrl = values['base-url'].replace(/\/+$/, '');
const out = values.out;
const width = Number(values.width);
const maxHeight = Number(values['max-height']);
const timeout = Number(values.timeout);
const skip = new Set(values.skip.split(',').map((s) => s.trim()).filter(Boolean));
const pages = fs
  .readFileSync(values.pages, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#') && !skip.has(l));

const HIDE_OVERLAYS = `
  #cookie-banner, .consent-banner, #CybotCookiebotDialog, [class*="cookie-consent"],
  [class*="chat-widget"], [id*="chat-widget"], #drift-widget, [class*="intercom"] {
    visibility: hidden !important;
  }`;

const slugFor = (p) => p.replace(/^\/+|\/+$/g, '').replace(/^docs\//, '').replace(/\//g, '__') || 'index';

fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width, height: 900 } });
const summary = [];

for (const pagePath of pages) {
  const slug = slugFor(pagePath);
  // Trailing slash matters: docs-site 301s slashless URLs back to themselves.
  const url = `${baseUrl}${pagePath.replace(/\/+$/, '')}/`;
  const page = await context.newPage();
  try {
    const res = await page.goto(url, { timeout, waitUntil: 'networkidle' });
    if (!res || res.status() !== 200) throw new Error(`HTTP ${res?.status()}`);
    await page.addStyleTag({ content: HIDE_OVERLAYS });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 800) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const files = [];
    if (height <= maxHeight) {
      const file = `${slug}.png`;
      await page.screenshot({ path: path.join(out, file), fullPage: true });
      files.push(file);
    } else {
      const parts = Math.ceil(height / maxHeight);
      for (let i = 0; i < parts; i++) {
        const file = `${slug}-part${i + 1}of${parts}.png`;
        await page.screenshot({
          path: path.join(out, file),
          fullPage: true,
          clip: { x: 0, y: i * maxHeight, width, height: Math.min(maxHeight, height - i * maxHeight) },
        });
        files.push(file);
      }
    }
    console.log(`ok   ${pagePath} (${height}px, ${files.length} file${files.length > 1 ? 's' : ''})`);
    summary.push({ path: pagePath, url, status: 'ok', height, files });
  } catch (e) {
    const error = String(e).slice(0, 200);
    console.log(`FAIL ${pagePath}: ${error}`);
    summary.push({ path: pagePath, url, status: 'failed', error });
  } finally {
    await page.close();
  }
}

await browser.close();
fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
const failed = summary.filter((s) => s.status === 'failed').length;
console.log(`\n${summary.length - failed}/${summary.length} pages captured -> ${out}`);
process.exit(failed ? 1 : 0);
