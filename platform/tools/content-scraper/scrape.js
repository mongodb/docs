#!/usr/bin/env node
'use strict';

const { chromium } = require('playwright');
const fs           = require('fs');
const path         = require('path');

// ── CLI args ──────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function arg(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 ? argv[i + 1] : fallback;
}
const OPT = {
  urlsFile:    arg('urls-file',   './urls.txt'),
  output:      arg('output',      './output'),
  resume:      argv.includes('--resume'),
  concurrency: Number(arg('concurrency', '1')),
  retrySkipped: argv.includes('--retry-skipped'),
};

const SKIPPED_FILE = path.join(OPT.output, 'skipped.json');

// Base per-request jitter, plus a longer cooldown every COOLDOWN_EVERY requests.
const JITTER_MIN_MS   = 5_000;
const JITTER_RANGE_MS = 3_000;
const COOLDOWN_EVERY  = 50;
const COOLDOWN_MS     = 60_000;

// Empty string = English, no locale segment in the URL.
const LOCALES = ['', 'pt-br', 'es', 'ko-kr', 'ja-jp', 'zh-cn'];
const localeDir = locale => locale || 'en';

// ── URL helpers ───────────────────────────────────────────────────────────────
function localizeUrl(url, locale) {
  if (!locale) return url;
  const u = new URL(url);
  u.pathname = `/${locale}${u.pathname}`;
  return u.toString();
}

function urlToSlug(url) {
  const u = new URL(url);
  const rel = u.pathname
    .replace(new RegExp(`^/(${LOCALES.filter(Boolean).join('|')})(?=/)`), '')
    .replace(/^\/docs\//, '')
    .replace(/\/+$/, '');
  return (rel.replace(/^\//, '').replace(/\//g, '__').replace(/[^a-zA-Z0-9_-]/g, '_')) || 'index';
}

// ── Scrape a single page ──────────────────────────────────────────────────────
async function scrapePage(page, url) {
  const response = await page.goto(url, { timeout: 30_000, waitUntil: 'domcontentloaded' });

  if (response && (response.status() === 403 || response.status() === 404)) {
    return { skipped: true, reason: String(response.status()) };
  }

  await page.waitForSelector('main', { timeout: 8_000 });

  const [title, content] = await Promise.all([
    page.title(),
    page.$eval('main', el => el.innerText),
  ]);

  return { skipped: false, title, content };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  LOCALES.forEach(locale => fs.mkdirSync(path.join(OPT.output, localeDir(locale)), { recursive: true }));

  let allPairs, skipped;

  if (OPT.retrySkipped) {
    if (!fs.existsSync(SKIPPED_FILE)) {
      console.error(`Cannot find ${SKIPPED_FILE}`);
      process.exit(1);
    }
    const previouslySkipped = JSON.parse(fs.readFileSync(SKIPPED_FILE, 'utf8'));
    const keep   = previouslySkipped.filter(e => e.reason.startsWith('404'));
    const retry  = previouslySkipped.filter(e => !e.reason.startsWith('404'));
    allPairs = retry.map(e => ({ url: e.url, locale: e.locale === 'en' ? '' : e.locale }));
    skipped  = keep;
    console.log(`content-scraper — retrying ${allPairs.length} previously skipped fetches (${keep.length} 404s kept as-is, concurrency=${OPT.concurrency})`);
  } else {
    if (!fs.existsSync(OPT.urlsFile)) {
      console.error(`Cannot find ${OPT.urlsFile}`);
      process.exit(1);
    }
    const urls = fs.readFileSync(OPT.urlsFile, 'utf8').split('\n').map(u => u.trim()).filter(Boolean);
    allPairs = urls.flatMap(url => LOCALES.map(locale => ({ url, locale })));
    console.log(`content-scraper — ${urls.length} pages × ${LOCALES.length} locales = ${allPairs.length} fetches (concurrency=${OPT.concurrency})`);
    skipped = OPT.resume && fs.existsSync(SKIPPED_FILE)
      ? JSON.parse(fs.readFileSync(SKIPPED_FILE, 'utf8'))
      : [];
  }
  console.log('─'.repeat(60));

  const browser  = await chromium.launch({ headless: true });
  const startedAt = Date.now();
  let done    = 0;
  let scraped = 0;
  let cached  = 0;

  function printProgress(label) {
    const elapsedMs = Date.now() - startedAt;
    const rate      = done > 0 ? elapsedMs / done : 0;
    const remaining = allPairs.length - done;
    const etaMin    = ((rate * remaining) / 60_000).toFixed(1);
    const pct       = ((done / allPairs.length) * 100).toFixed(0);
    process.stdout.write(
      `\r[${done}/${allPairs.length}] ${pct}%  scraped=${scraped} cached=${cached} skipped=${skipped.length}  ETA ${etaMin}m  ${label ?? ''}`.padEnd(110)
    );
  }

  async function fetchOne({ url, locale }) {
    const slug    = urlToSlug(url);
    const outFile = path.join(OPT.output, localeDir(locale), `${slug}.json`);
    const target  = localizeUrl(url, locale);
    printProgress(`→ ${localeDir(locale)} ${target}`);

    const ctx  = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await ctx.newPage();

    // Jitter before each navigation to avoid tripping the site's rate limiter.
    await new Promise(r => setTimeout(r, JITTER_MIN_MS + Math.random() * JITTER_RANGE_MS));

    try {
      const result = await scrapePage(page, target);
      if (result.skipped) {
        skipped.push({ url, locale: localeDir(locale), target, reason: result.reason });
      } else {
        fs.writeFileSync(outFile, JSON.stringify({ url: target, title: result.title, content: result.content }, null, 2));
        scraped++;
      }
    } catch (err) {
      skipped.push({ url, locale: localeDir(locale), target, reason: err.message });
    } finally {
      await page.close().catch(() => {});
      await ctx.close().catch(() => {});
    }

    done++;
    printProgress();
  }

  const toFetch = OPT.retrySkipped ? allPairs : allPairs.filter(({ url, locale }) =>
    !(OPT.resume && fs.existsSync(path.join(OPT.output, localeDir(locale), `${urlToSlug(url)}.json`)))
  );
  cached = allPairs.length - toFetch.length;
  done   = cached;

  for (let i = 0; i < toFetch.length; i += OPT.concurrency) {
    if (done > 0 && done % COOLDOWN_EVERY < OPT.concurrency) {
      printProgress(`→ cooldown ${(COOLDOWN_MS / 1000).toFixed(0)}s…`);
      await new Promise(r => setTimeout(r, COOLDOWN_MS));
    }

    const batch = toFetch.slice(i, i + OPT.concurrency);
    await Promise.all(batch.map(fetchOne));

    // Periodically flush skipped.json so progress survives an interruption.
    fs.writeFileSync(SKIPPED_FILE, JSON.stringify(skipped, null, 2));
  }

  await browser.close();

  fs.writeFileSync(SKIPPED_FILE, JSON.stringify(skipped, null, 2));

  console.log(`\n\nDone. ${scraped} scraped, ${cached} cached, ${skipped.length} skipped.`);
  if (skipped.length) console.log(`See ${SKIPPED_FILE} for details.`);
}

main().catch(err => {
  console.error('\nFatal:', err.message);
  process.exit(1);
});
