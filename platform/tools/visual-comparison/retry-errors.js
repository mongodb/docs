#!/usr/bin/env node
'use strict';

const { chromium }   = require('playwright');
const fs             = require('fs');
const path           = require('path');
const { execSync }   = require('child_process');

const RESULTS_FILE = './results.json';
const DIRS = {
  prod:    './screenshots/prod',
  staging: './screenshots/staging',
};

// ── Helpers (self-contained copies from crawler.js) ───────────────────────────
function urlToSlug(url) {
  return (
    url
      .replace(/^https?:\/\/[^/]+/, '')
      .replace(/^\/docs\/atlas\/?/, '')
      .replace(/\//g, '__')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
  ) || 'index';
}

function toStagingUrl(prodUrl) {
  return prodUrl.replace(
    'https://www.mongodb.com/',
    'https://mongodbcom.staging.corp.mongodb.com/'
  );
}

const NOISE_CSS = `
  #cookie-banner, .consent-banner, [data-testid="cookie-banner"],
  #CybotCookiebotDialog, .CookieBanner, [class*="cookie-consent"],
  .feedback-widget, #delighted-web-sdk, [class*="survey-widget"],
  .promotional-banner, .announcement-bar, [class*="callout-banner"],
  time, .last-modified, .updated-at, [class*="lastUpdated"], [class*="last-updated"],
  [class*="chat-widget"], [id*="chat-widget"],
  .drift-frame-controller, #drift-widget,
  [class*="hubspot"], [class*="intercom"],
  .floating-widget, [class*="floating-action"] {
    visibility: hidden !important;
    opacity: 0 !important;
  }
`;

async function screenshotPage(page, url, env) {
  const s       = urlToSlug(url);
  const target  = env === 'staging' ? toStagingUrl(url) : url;
  const outFile = path.join(DIRS[env], `${s}.png`);

  const result = {
    env, slug: s, screenshotPath: outFile,
    consoleErrors: [], brokenLinks: [],
    sidebarCount: 0, tocCount: 0, copyCount: 0,
    error: null,
  };

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const responses404 = new Set();
  page.on('response', r => {
    if (r.status() === 404) responses404.add(r.url());
  });

  try {
    // Random jitter before navigation
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto(target, { timeout: 30_000, waitUntil: 'networkidle' });

    if (response && response.status() === 403) {
      console.error(`\n\n[403] Rate limited — ${env.toUpperCase()} returned 403 for: ${target}`);
      process.exit(1);
    }

    await page.addStyleTag({ content: NOISE_CSS });

    await Promise.race([
      page.waitForSelector('article',       { timeout: 8_000 }),
      page.waitForSelector('main',          { timeout: 8_000 }),
      page.waitForSelector('.main-content', { timeout: 8_000 }),
      page.waitForSelector('#main-content', { timeout: 8_000 }),
    ]).catch(() => {});

    const [sidebar, toc, copy, internalLinks] = await Promise.all([
      page.$$eval(
        'nav a, .sidebar a, aside a, [data-testid*="sidenav"] a, [class*="sidenav"] a',
        els => els.length
      ).catch(() => 0),
      page.$$eval(
        '.toc a, [class*="toc"] a, [class*="table-of-contents"] a',
        els => els.length
      ).catch(() => 0),
      page.$$eval(
        '[class*="copy-button"], [data-testid*="copy"], button[aria-label*="Copy"], button[title*="Copy"]',
        els => els.length
      ).catch(() => 0),
      page.$$eval(
        'a[href]',
        (els, origin) => els.map(e => e.href).filter(h => h.startsWith(origin + '/docs/')),
        new URL(url).origin
      ).catch(() => []),
    ]);

    result.consoleErrors = errors;
    result.sidebarCount  = sidebar;
    result.tocCount      = toc;
    result.copyCount     = copy;
    result.brokenLinks   = internalLinks.filter(h => responses404.has(h));

    await page.screenshot({ path: outFile, fullPage: true });
  } catch (err) {
    result.error = err.message;
  }

  return result;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(RESULTS_FILE)) {
    console.error(`Cannot find ${RESULTS_FILE} — run crawler.js first.`);
    process.exit(1);
  }

  const allResults = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));

  const toRetry = allResults.filter(
    r => r.error || !r.prodScreenshot || !r.stagingScreenshot
  );

  if (toRetry.length === 0) {
    console.log('No error entries found in results.json — nothing to retry.');
    return;
  }

  console.log(`Found ${toRetry.length} pages to retry:\n`);
  toRetry.forEach(r => console.log(' ', r.url));
  console.log();

  const browser = await chromium.launch({ headless: true });
  const patched  = new Map();

  for (let i = 0; i < toRetry.length; i++) {
    const r         = toRetry[i];
    const s         = urlToSlug(r.url);
    const prodFile  = path.join(DIRS.prod,    `${s}.png`);
    const stageFile = path.join(DIRS.staging, `${s}.png`);

    console.log(`[${i + 1}/${toRetry.length}] ${r.url.replace('https://www.mongodb.com', '')}`);

    const [pCtx, sCtx] = await Promise.all([
      browser.newContext({ ignoreHTTPSErrors: true }),
      browser.newContext({ ignoreHTTPSErrors: true }),
    ]);
    const [pPage, sPage] = await Promise.all([pCtx.newPage(), sCtx.newPage()]);

    const [prodRes, stagingRes] = await Promise.all([
      screenshotPage(pPage, r.url, 'prod'),
      screenshotPage(sPage, r.url, 'staging'),
    ]);

    await Promise.all([
      pPage.close().catch(() => {}), sPage.close().catch(() => {}),
      pCtx.close().catch(() => {}),  sCtx.close().catch(() => {}),
    ]);

    const updated = {
      url:                  r.url,
      slug:                 s,
      prodScreenshot:       fs.existsSync(prodFile)  ? path.relative('.', prodFile)  : null,
      stagingScreenshot:    fs.existsSync(stageFile) ? path.relative('.', stageFile) : null,
      prodConsoleErrors:    prodRes.consoleErrors.length,
      stagingConsoleErrors: stagingRes.consoleErrors.length,
      consoleErrorsList:    [...new Set([...prodRes.consoleErrors, ...stagingRes.consoleErrors])],
      brokenLinks:          prodRes.brokenLinks.length,
      brokenLinksList:      prodRes.brokenLinks,
      sidebarDelta:         stagingRes.sidebarCount - prodRes.sidebarCount,
      tocDelta:             stagingRes.tocCount     - prodRes.tocCount,
      copyDelta:            stagingRes.copyCount    - prodRes.copyCount,
      error:                prodRes.error || stagingRes.error || null,
    };

    patched.set(r.url, updated);
    const status = updated.error ? 'ERROR' : 'OK';
    console.log(`  → ${status}${updated.error ? ': ' + updated.error : ''}`);

    // Rate-limit delay between pages
    if (i < toRetry.length - 1) await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();

  // Patch results.json in place
  const patchedResults = allResults.map(r => patched.has(r.url) ? patched.get(r.url) : r);
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(patchedResults, null, 2));

  const succeeded = [...patched.values()].filter(r => !r.error).length;
  const stillErr  = [...patched.values()].filter(r => r.error).length;
  console.log(`\n[results] Patched ${patched.size} entries in ${RESULTS_FILE}`);
  console.log(`  Succeeded: ${succeeded} | Still ERROR: ${stillErr}`);

  // Regenerate visual-report.html
  console.log('\n[report] Regenerating visual-report.html...');
  execSync('node report-visual.js', { stdio: 'inherit' });

  console.log('\nDone.');
}

main().catch(err => {
  console.error('\nFatal:', err.message);
  process.exit(1);
});
