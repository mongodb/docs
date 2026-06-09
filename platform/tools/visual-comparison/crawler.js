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
  prod:               arg('prod',               'https://www.mongodb.com/docs/atlas/'),
  staging:            arg('staging',            'https://mongodbcom.staging.corp.mongodb.com/docs/atlas/'),
  concurrencyProd:    Number(arg('concurrency-prod',    arg('concurrency', '1'))),
  concurrencyStaging: Number(arg('concurrency-staging', arg('concurrency', '1'))),
  output:             arg('output',             './report.html'),
  resume:             argv.includes('--resume'),
};

// ── Directories ───────────────────────────────────────────────────────────────
const DIRS = {
  prod:    './screenshots/prod',
  staging: './screenshots/staging',
};
const URLS_FILE    = './urls.txt';
const RESULTS_FILE = './results.json';

// Paths to skip — matched against the URL pathname. Add regex patterns as needed.
const EXCLUDED_PATHS = [];

function setup() {
  Object.values(DIRS).forEach(d => fs.mkdirSync(d, { recursive: true }));
}

// ── URL helpers ───────────────────────────────────────────────────────────────
function normalize(raw) {
  try {
    const u = new URL(raw);
    u.hash   = '';
    u.search = '';
    u.pathname = u.pathname.replace(/\/+$/, '') || '/';
    return u.toString();
  } catch { return null; }
}

function urlToSlug(url) {
  const basePath = new URL(OPT.prod).pathname.replace(/\/$/, '');
  const noOrigin = url.replace(/^https?:\/\/[^/]+/, '');
  const rel = noOrigin.startsWith(basePath)
    ? noOrigin.slice(basePath.length).replace(/^\//, '')
    : noOrigin.replace(/^\//, '');
  return (rel.replace(/\//g, '__').replace(/[^a-zA-Z0-9_-]/g, '_')) || 'index';
}

function toStagingUrl(prodUrl) {
  const pOrigin = new URL(OPT.prod).origin;
  const sOrigin = new URL(OPT.staging).origin;
  return prodUrl.replace(pOrigin, sOrigin);
}

function isExcluded(url) {
  try {
    return EXCLUDED_PATHS.some(re => re.test(new URL(url).pathname));
  } catch { return false; }
}

// ── CSS to suppress noise elements ────────────────────────────────────────────
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

// ── PHASE 1: Crawl all URLs ───────────────────────────────────────────────────
async function crawlAllUrls() {
  if (fs.existsSync(URLS_FILE) && fs.readFileSync(URLS_FILE, 'utf8').trim()) {
    const urls = fs.readFileSync(URLS_FILE, 'utf8').split('\n').filter(u => u && !isExcluded(u));
    console.log(`[crawl] Loaded ${urls.length} URLs from ${URLS_FILE}`);
    return urls;
  }

  const prodBase = new URL(OPT.prod);
  const basePath = prodBase.pathname.replace(/\/$/, ''); // e.g. /docs/atlas

  console.log(`[crawl] Starting at ${OPT.prod}`);
  console.log(`[crawl] Staying within: ${prodBase.origin}${basePath}`);

  const visited = new Set();
  const pending = new Set([normalize(OPT.prod)]);
  const CRAWL_CONCURRENCY = 3;

  const browser = await chromium.launch({ headless: true });

  while (pending.size > 0) {
    const batch = [...pending].slice(0, CRAWL_CONCURRENCY);
    batch.forEach(u => { pending.delete(u); visited.add(u); });

    const linkLists = await Promise.all(
      batch.map(async url => {
        const ctx  = await browser.newContext({ ignoreHTTPSErrors: true });
        const page = await ctx.newPage();
        try {
          await page.goto(url, { timeout: 30_000, waitUntil: 'domcontentloaded' });
          return await page.$$eval('a[href]', els => els.map(e => e.href));
        } catch { return []; }
        finally {
          await page.close().catch(() => {});
          await ctx.close().catch(() => {});
        }
      })
    );

    for (const links of linkLists) {
      for (const raw of links) {
        const norm = normalize(raw);
        if (!norm || visited.has(norm)) continue;
        try {
          const u = new URL(norm);
          if (u.origin === prodBase.origin && u.pathname.startsWith(basePath) && !isExcluded(norm)) {
            pending.add(norm);
          }
        } catch {}
      }
    }

    process.stdout.write(
      `\r[crawl] visited=${visited.size}  pending=${pending.size}   `
    );
  }

  await browser.close();

  const urls = [...visited].sort();
  fs.writeFileSync(URLS_FILE, urls.join('\n'));
  console.log(`\n[crawl] Done. ${urls.length} unique pages → ${URLS_FILE}`);
  return urls;
}

// ── PHASE 2: Screenshot a single page ─────────────────────────────────────────
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

  if (OPT.resume && fs.existsSync(outFile)) return result;

  // Attach listeners before navigation so we capture everything
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const responses404 = new Set();
  page.on('response', r => {
    if (r.status() === 404) responses404.add(r.url());
  });

  try {
    // Random jitter before each navigation to break metronomic request patterns
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto(target, { timeout: 30_000, waitUntil: 'networkidle' });
    if (response && response.status() === 403) {
      console.error(`\n\n[403] Rate limited — ${env.toUpperCase()} returned 403 for: ${target}`);
      process.exit(1);
    }
    await page.addStyleTag({ content: NOISE_CSS });

    // Wait for main content to be visible
    await Promise.race([
      page.waitForSelector('article',              { timeout: 8_000 }),
      page.waitForSelector('main',                 { timeout: 8_000 }),
      page.waitForSelector('.main-content',        { timeout: 8_000 }),
      page.waitForSelector('#main-content',        { timeout: 8_000 }),
    ]).catch(() => {});

    // Wait for JS hydration to finish — resolves when the browser's event loop
    // drains (requestIdleCallback), capped at 2 s so slow pages don't stall.
    await page.waitForFunction(
      () => new Promise(resolve => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(resolve, { timeout: 2000 });
        } else {
          setTimeout(resolve, 100);
        }
      }),
      { timeout: 5_000 }
    ).catch(() => {});

    // Collect functional metrics
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
    // Flag any internal link whose resource 404'd during this page load
    result.brokenLinks   = internalLinks.filter(h => responses404.has(h));

    await page.screenshot({ path: outFile, fullPage: true });
  } catch (err) {
    result.error = err.message;
  }

  return result;
}

// ── PHASE 3: HTML report ──────────────────────────────────────────────────────
function generateReport(results) {
  const section = new URL(OPT.prod).pathname.replace(/^\/docs\//, '').replace(/\/+$/, '') || 'docs';
  const totalConsole = results.reduce((n, r) => n + (r.prodConsoleErrors    || 0), 0);
  const totalBroken  = results.reduce((n, r) => n + (r.brokenLinks          || 0), 0);

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  const rows = results.map(r => {
    const sdelta   = r.sidebarDelta != null ? (r.sidebarDelta >= 0 ? '+' : '') + r.sidebarDelta : '—';
    const tdelta   = r.tocDelta     != null ? (r.tocDelta     >= 0 ? '+' : '') + r.tocDelta     : '—';
    const cdelta   = r.copyDelta    != null ? (r.copyDelta    >= 0 ? '+' : '') + r.copyDelta    : '—';
    const shortUrl = r.url.replace('https://www.mongodb.com', '');
    const hasFn    = (r.prodConsoleErrors || 0) > 0 || (r.brokenLinks || 0) > 0;
    const hasError = !!r.error;

    const details = [];
    if (r.stagingScreenshot)
      details.push(`<figure><figcaption>Staging</figcaption><img src="${r.stagingScreenshot}" class="thumb" loading="lazy"></figure>`);
    if (r.prodScreenshot)
      details.push(`<figure><figcaption>Prod</figcaption><img src="${r.prodScreenshot}" class="thumb" loading="lazy"></figure>`);
    if (r.consoleErrorsList?.length)
      details.push(`<pre class="log"><b>Console errors:</b>\n${escHtml(r.consoleErrorsList.slice(0, 15).join('\n'))}</pre>`);
    if (r.brokenLinksList?.length)
      details.push(`<pre class="log"><b>Broken links (404 during load):</b>\n${escHtml(r.brokenLinksList.slice(0, 15).join('\n'))}</pre>`);
    if (r.error)
      details.push(`<pre class="log"><b>Load error:</b> ${escHtml(r.error)}</pre>`);

    return `<tr class="row" data-fn="${hasFn}" data-err="${hasError}">
  <td><a href="${r.url}" target="_blank">${escHtml(shortUrl)}</a></td>
  <td>${r.error ? '<span class="badge error">ERROR</span>' : ''}</td>
  <td>${r.prodConsoleErrors || 0} / ${r.stagingConsoleErrors || 0}</td>
  <td>${r.brokenLinks || 0}</td>
  <td>${sdelta}</td>
  <td>${tdelta}</td>
  <td>${cdelta}</td>
  <td>${details.length
    ? `<button class="xbtn" onclick="x('det-${r.slug}')">▼ view</button><div id="det-${r.slug}" class="detail">${details.join('\n')}</div>`
    : ''
  }</td>
</tr>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${section} — Staging vs Production</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font:14px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f4f5f7;color:#1a1a1a}

header{background:#001e2b;color:#fff;padding:20px 28px}
header h1{font-size:1.35rem;font-weight:600}
header p{font-size:.82rem;opacity:.6;margin-top:3px}

.summary{display:flex;gap:12px;flex-wrap:wrap;padding:20px 28px}
.card{background:#fff;border-radius:8px;padding:12px 20px;min-width:110px;box-shadow:0 1px 2px rgba(0,0,0,.1)}
.card .lbl{font-size:.68rem;text-transform:uppercase;letter-spacing:.05em;opacity:.55;margin-bottom:2px}
.card .val{font-size:1.9rem;font-weight:700;line-height:1}

.filters{padding:0 28px 14px;display:flex;gap:7px;flex-wrap:wrap;align-items:center}
.btn{padding:5px 14px;border:1px solid #ccc;border-radius:14px;cursor:pointer;background:#fff;font-size:.8rem;transition:border-color .15s}
.btn:hover{border-color:#001e2b}
.btn.on{background:#001e2b;color:#fff;border-color:#001e2b}

.wrap{padding:0 28px 28px;overflow-x:auto}
table{width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.1);font-size:.82rem}
th{background:#001e2b;color:#fff;padding:8px 10px;text-align:left;white-space:nowrap;font-weight:500}
td{padding:6px 10px;border-bottom:1px solid #eee;vertical-align:top}
tr:last-child td{border-bottom:none}
tr[data-err="true"] td{background:#f5f0ff}

.badge{display:inline-block;padding:1px 6px;border-radius:3px;font-size:.7rem;font-weight:700;vertical-align:1px}
.badge.error{background:#ede7f6;color:#4527a0}

a{color:#1a73e8;text-decoration:none;word-break:break-all}
a:hover{text-decoration:underline}

.xbtn{padding:2px 8px;font-size:.75rem;cursor:pointer;border:1px solid #ccc;border-radius:3px;background:#fff}
.detail{display:none;margin-top:6px;border-top:1px solid #eee;padding-top:8px}
.detail.open{display:block}
.detail figure{display:inline-block;vertical-align:top;margin:4px;text-align:center;font-size:.7rem;color:#666}
figcaption{margin-bottom:3px;font-weight:600}
.thumb{max-width:280px;border:1px solid #ddd;display:block}
.thumb.err{border-color:#e53935}
.log{background:#f5f5f5;padding:7px 10px;border-radius:4px;font-size:.72rem;max-height:110px;overflow:auto;margin-top:6px;white-space:pre-wrap;color:#333}
</style>
</head>
<body>

<header>
  <h1>${section} — Staging vs Production Comparison</h1>
  <p>Generated ${new Date().toLocaleString()} &bull; ${results.length} pages crawled &bull; Prod: ${OPT.prod}</p>
</header>

<div class="summary">
  <div class="card">
    <div class="lbl">Pages</div>
    <div class="val">${results.length}</div>
  </div>
  <div class="card">
    <div class="lbl">Console Errors (prod)</div>
    <div class="val">${totalConsole}</div>
  </div>
  <div class="card">
    <div class="lbl">Broken Resources</div>
    <div class="val">${totalBroken}</div>
  </div>
</div>

<div class="filters">
  <button class="btn on" onclick="fv(this)">All (${results.length})</button>
  <button class="btn"    onclick="ff(this)">Has functional issues</button>
</div>

<div class="wrap">
<table>
<thead>
  <tr>
    <th>URL</th>
    <th>Status</th>
    <th>Console errors<br>(prod / staging)</th>
    <th>Broken resources</th>
    <th>Sidebar Δ</th>
    <th>TOC Δ</th>
    <th>Copy btn Δ</th>
    <th>Details</th>
  </tr>
</thead>
<tbody id="tb">
${rows}
</tbody>
</table>
</div>

<script>
function fv(b) {
  document.querySelectorAll('.btn').forEach(e => e.classList.remove('on'));
  b.classList.add('on');
  document.querySelectorAll('#tb tr.row').forEach(r => r.style.display = '');
}
function ff(b) {
  document.querySelectorAll('.btn').forEach(e => e.classList.remove('on'));
  b.classList.add('on');
  document.querySelectorAll('#tb tr.row').forEach(r =>
    r.style.display = r.dataset.fn === 'true' ? '' : 'none'
  );
}
function x(id) {
  document.getElementById(id)?.classList.toggle('open');
}
</script>
</body>
</html>`;

  fs.writeFileSync(OPT.output, html);
  console.log(`[report] Written to ${OPT.output}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const section = new URL(OPT.prod).pathname.replace(/^\/docs\//, '').replace(/\/+$/, '') || 'docs';
  console.log(`${section} — Staging vs Production Comparison`);
  console.log('─'.repeat(60));
  console.log('Prod:                  ', OPT.prod);
  console.log('Staging:               ', OPT.staging);
  console.log('Concurrency (prod):    ', OPT.concurrencyProd);
  console.log('Concurrency (staging): ', OPT.concurrencyStaging);
  console.log('Output:                ', OPT.output);
  console.log('Resume:                ', OPT.resume);
  console.log('─'.repeat(60));

  setup();

  // Pre-load saved results for --resume
  const savedResults = new Map();
  if (OPT.resume && fs.existsSync(RESULTS_FILE)) {
    JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'))
      .forEach(r => savedResults.set(r.url, r));
    console.log(`[resume] Loaded ${savedResults.size} saved results from ${RESULTS_FILE}`);
  }

  // ── Phase 1: Crawl
  console.log('\n=== Phase 1: Crawl ===');
  const urls = await crawlAllUrls();

  // ── Phase 2: Screenshots (prod and staging as separate passes)
  console.log('\n=== Phase 2: Screenshots ===');
  const browser = await chromium.launch({ headless: true });

  async function runPass(env, concurrency) {
    const resultMap = new Map();
    const toProcess = urls.filter(url => {
      if (!OPT.resume) return true;
      return !fs.existsSync(path.join(DIRS[env], `${urlToSlug(url)}.png`));
    });
    const cached = urls.length - toProcess.length;
    console.log(`\n[${env}] ${toProcess.length} to screenshot${cached ? `, ${cached} cached` : ''} (concurrency=${concurrency})`);

    for (let i = 0; i < toProcess.length; i += concurrency) {
      const batch    = toProcess.slice(i, i + concurrency);
      const batchRes = await Promise.all(batch.map(async url => {
        const ctx  = await browser.newContext({ ignoreHTTPSErrors: true });
        const page = await ctx.newPage();
        const res  = await screenshotPage(page, url, env);
        await page.close().catch(() => {});
        await ctx.close().catch(() => {});
        return [url, res];
      }));
      batchRes.forEach(([url, res]) => resultMap.set(url, res));
      const done = Math.min(i + concurrency, toProcess.length);
      process.stdout.write(`\r  [${done}/${toProcess.length}] ${((done / toProcess.length) * 100).toFixed(0)}%  `);
      if (done < toProcess.length) await new Promise(r => setTimeout(r, 1000));
    }
    return resultMap;
  }

  const prodMap    = await runPass('prod',    OPT.concurrencyProd);
  const stagingMap = await runPass('staging', OPT.concurrencyStaging);
  await browser.close();

  // ── Combine prod + staging results per URL
  const empty = { consoleErrors: [], brokenLinks: [], sidebarCount: 0, tocCount: 0, copyCount: 0, error: null };
  const allResults = urls.map(url => {
    const s         = urlToSlug(url);
    const prodFile  = path.join(DIRS.prod,    `${s}.png`);
    const stageFile = path.join(DIRS.staging, `${s}.png`);
    const pRes      = prodMap.get(url);
    const sRes      = stagingMap.get(url);

    // Both skipped (resume, both screenshots existed) — reuse saved result
    if (!pRes && !sRes && savedResults.has(url)) return savedResults.get(url);

    const prodRes    = pRes || empty;
    const stagingRes = sRes || empty;
    return {
      url,
      slug: s,
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
  });

  fs.writeFileSync(RESULTS_FILE, JSON.stringify(allResults, null, 2));
  console.log(`\n[results] ${allResults.length} results saved to ${RESULTS_FILE}`);

  // ── Phase 3: Report
  console.log('\n=== Phase 3: Report ===');
  generateReport(allResults);

  const errCount = allResults.filter(r => r.error).length;
  console.log(
    `\nAll done: ${allResults.length} pages | ` +
    `${allResults.length - errCount} OK, ${errCount} errors`
  );
}

main().catch(err => {
  console.error('\nFatal:', err.message);
  process.exit(1);
});
