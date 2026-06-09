#!/usr/bin/env node
'use strict';

const http    = require('http');
const fs      = require('fs');
const path    = require('path');
const { chromium } = require('playwright');

const PORT         = 3000;
const RESULTS_FILE = './results.json';
const STATE_FILE   = './review-state.json';
const DIRS = {
  prod:    './screenshots/prod',
  staging: './screenshots/staging',
};

// ── Helpers (self-contained) ──────────────────────────────────────────────────
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
    'https://mongodbcom-cdn.staging.corp.mongodb.com/'
  );
}

const NOISE_CSS = `
  #cookie-banner,.consent-banner,[data-testid="cookie-banner"],
  #CybotCookiebotDialog,.CookieBanner,[class*="cookie-consent"],
  .feedback-widget,#delighted-web-sdk,
  .promotional-banner,.announcement-bar,
  time,.last-modified,.updated-at,[class*="lastUpdated"],
  [class*="chat-widget"],[id*="chat-widget"],
  .drift-frame-controller,#drift-widget,
  [class*="hubspot"],[class*="intercom"],
  .floating-widget { visibility:hidden!important;opacity:0!important }
`;

async function screenshotPage(page, url, env) {
  const s       = urlToSlug(url);
  const target  = env === 'staging' ? toStagingUrl(url) : url;
  const outFile = path.join(DIRS[env], `${s}.png`);
  const result  = { slug: s, screenshotPath: outFile, error: null };

  try {
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto(target, { timeout: 30_000, waitUntil: 'networkidle' });
    if (response && response.status() === 403) {
      throw new Error(`403 rate-limited on ${env}: ${target}`);
    }
    await page.addStyleTag({ content: NOISE_CSS });
    await Promise.race([
      page.waitForSelector('article',       { timeout: 8_000 }),
      page.waitForSelector('main',          { timeout: 8_000 }),
      page.waitForSelector('.main-content', { timeout: 8_000 }),
    ]).catch(() => {});
    await page.screenshot({ path: outFile, fullPage: true });
  } catch (err) {
    result.error = err.message;
  }
  return result;
}

// ── State management ──────────────────────────────────────────────────────────
function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  }
  return { currentIndex: 0, reviewed: {}, retryQueue: {} };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ── Queue: all pages with both screenshots, sorted by URL ─────────────────────
function buildQueue() {
  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
  return results
    .filter(r => r.prodScreenshot && r.stagingScreenshot)
    .sort((a, b) => a.url.localeCompare(b.url));
}

// ── Inline review UI ──────────────────────────────────────────────────────────
const UI_HTML = String.raw/* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Docs Review</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font:14px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  background:#0d1117;color:#e6edf3;height:100vh;display:flex;flex-direction:column;overflow:hidden}

#topbar{
  background:#161b22;border-bottom:1px solid #30363d;
  padding:10px 20px;display:flex;flex-direction:column;gap:6px;flex-shrink:0;
}
.top-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
#page-counter{font-size:.85rem;color:#8b949e;white-space:nowrap}
#page-url{font-family:monospace;font-size:.85rem;color:#58a6ff;flex:1;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.ext-links{display:flex;gap:8px;flex-shrink:0}
.ext-links a{font-size:.8rem;color:#58a6ff;text-decoration:none;
  padding:3px 10px;border:1px solid #30363d;border-radius:4px}
.ext-links a:hover{background:#21262d}
#badge{padding:2px 8px;border-radius:4px;font-size:.72rem;font-weight:700;flex-shrink:0;display:none}
#badge.error{display:inline;background:#1a1a3b;color:#9090ff}

.progress-row{display:flex;align-items:center;gap:10px}
#progress-bar{flex:1;height:6px;background:#30363d;border-radius:3px;overflow:hidden}
#progress-fill{height:100%;background:#238636;border-radius:3px;transition:width .3s}
#progress-label{font-size:.75rem;color:#8b949e;white-space:nowrap}

#screenshots{
  flex:1;display:grid;grid-template-columns:1fr 1fr;
  overflow:hidden;min-height:0;
}
.panel{display:flex;flex-direction:column;overflow:hidden;border-right:1px solid #30363d}
.panel:last-child{border-right:none}
.panel-label{
  padding:5px 14px;font-size:.72rem;font-weight:600;
  color:#8b949e;background:#161b22;border-bottom:1px solid #30363d;
  text-transform:uppercase;letter-spacing:.06em;flex-shrink:0;
}
.panel-img{flex:1;overflow-y:auto;overflow-x:hidden;background:#010409}
.panel-img img{display:block;width:100%;height:auto}

#buttons{
  background:#161b22;border-top:1px solid #30363d;
  padding:12px 20px;display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;
  align-items:center;
}
button{
  padding:8px 18px;border:1px solid #30363d;border-radius:6px;
  cursor:pointer;font-size:.85rem;font-weight:500;
  background:#21262d;color:#e6edf3;transition:background .15s,opacity .15s;
}
button:hover:not(:disabled){background:#30363d}
button:disabled{opacity:.4;cursor:not-allowed}
#btn-retry-prod{border-color:#1f6feb;color:#58a6ff}
#btn-retry-prod:hover:not(:disabled){background:#1f6feb22}
#btn-retry-staging{border-color:#388bfd;color:#79c0ff}
#btn-retry-staging:hover:not(:disabled){background:#388bfd22}
#btn-retry-both{border-color:#3fb950;color:#56d364}
#btn-retry-both:hover:not(:disabled){background:#3fb95022}
#btn-doesnt-work{border-color:#b94e00;color:#f0883e}
#btn-doesnt-work:hover:not(:disabled){background:#b94e0022}
#btn-skip{background:#238636;border-color:#2ea043;color:#fff;margin-left:auto}
#btn-skip:hover:not(:disabled){background:#2ea043}
#btn-back{color:#8b949e}
.kbd{
  display:inline-block;padding:1px 5px;border:1px solid #30363d;
  border-radius:3px;font-size:.68rem;color:#8b949e;font-family:monospace;
  vertical-align:2px;margin-left:4px;
}
#done-msg{
  display:none;flex:1;align-items:center;justify-content:center;
  flex-direction:column;gap:14px;font-size:1.1rem;color:#8b949e;
}
#done-summary{font-size:.9rem;line-height:2;text-align:center}
#done-summary b{color:#e6edf3}
#btn-run-retries{
  padding:10px 28px;border:1px solid #3fb950;border-radius:6px;
  background:#238636;color:#fff;font-size:.95rem;font-weight:600;cursor:pointer;
}
#btn-run-retries:hover:not(:disabled){background:#2ea043}
#btn-run-retries:disabled{opacity:.4;cursor:not-allowed}
#done-log{
  background:#010409;border:1px solid #30363d;border-radius:6px;
  padding:10px 14px;font-family:monospace;font-size:.78rem;
  max-height:220px;overflow-y:auto;width:100%;max-width:640px;
  color:#8b949e;white-space:pre-wrap;
}
</style>
</head>
<body>

<div id="topbar">
  <div class="top-row">
    <span id="page-counter">—</span>
    <span id="badge" class="fail">—</span>
    <span id="page-url">Loading…</span>
    <div class="ext-links">
      <a id="link-prod" href="#" target="_blank" rel="noopener">Prod ↗</a>
      <a id="link-staging" href="#" target="_blank" rel="noopener">Staging ↗</a>
    </div>
  </div>
  <div class="progress-row">
    <div id="progress-bar"><div id="progress-fill" style="width:0%"></div></div>
    <span id="progress-label">0 reviewed</span>
  </div>
</div>

<div id="screenshots">
  <div class="panel">
    <div class="panel-label">Production</div>
    <div class="panel-img"><img id="img-prod" src="" alt="prod"></div>
  </div>
  <div class="panel">
    <div class="panel-label">Staging</div>
    <div class="panel-img"><img id="img-staging" src="" alt="staging"></div>
  </div>
</div>

<div id="done-msg">
  <div>✓ Review complete</div>
  <div id="done-summary"></div>
  <button id="btn-run-retries" style="display:none">Run Retries</button>
  <pre id="done-log" style="display:none"></pre>
</div>

<div id="buttons">
  <button id="btn-back">← Back<span class="kbd">←</span></button>
  <button id="btn-retry-prod">Retry Prod<span class="kbd">P</span></button>
  <button id="btn-retry-staging">Retry Staging<span class="kbd">S</span></button>
  <button id="btn-retry-both">Retry Both<span class="kbd">B</span></button>
  <button id="btn-doesnt-work">Doesn't Work<span class="kbd">X</span></button>
  <button id="btn-skip">Skip →<span class="kbd">Space</span></button>
</div>

<script>
let state = null;

async function api(method, path, body) {
  const res = await fetch(path, {
    method,
    headers: { 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function loadPage() {
  state = await api('GET', '/api/state');
  if (state.done) {
    document.getElementById('screenshots').style.display = 'none';
    document.getElementById('buttons').style.display = 'none';
    document.getElementById('done-msg').style.display = 'flex';

    const vals     = Object.values(state.reviewed);
    const skipped  = vals.filter(v => v === 'skipped').length;
    const broken   = vals.filter(v => v === 'doesnt-work').length;
    const queued   = Object.keys(state.retryQueue || {}).length;
    const lines    = [
      '<b>' + skipped + '</b> skipped',
      '<b>' + broken  + '</b> doesn\'t work',
      '<b>' + queued  + '</b> queued for retry',
    ];
    document.getElementById('done-summary').innerHTML = lines.join('<br>');
    const runBtn = document.getElementById('btn-run-retries');
    runBtn.style.display = queued > 0 ? '' : 'none';
    return;
  }

  const p = state.page;
  const shortUrl = p.url.replace('https://www.mongodb.com', '');
  const stagingUrl = p.url.replace('https://www.mongodb.com/', 'https://mongodbcom-cdn.staging.corp.mongodb.com/');

  document.getElementById('page-counter').textContent =
    'Page ' + (state.currentIndex + 1) + ' / ' + state.total;
  document.getElementById('page-url').textContent = shortUrl;
  document.getElementById('link-prod').href    = p.url;
  document.getElementById('link-staging').href = stagingUrl;

  const badge = document.getElementById('badge');
  badge.textContent = 'ERROR';
  badge.className   = p.error ? 'error' : '';

  const t = Date.now();
  document.getElementById('img-prod').src    = '/' + p.prodScreenshot    + '?t=' + t;
  document.getElementById('img-staging').src = '/' + p.stagingScreenshot + '?t=' + t;

  // Scroll both panels back to top
  document.querySelectorAll('.panel-img').forEach(el => el.scrollTop = 0);

  const vals2    = Object.values(state.reviewed);
  const skipped2 = vals2.filter(v => v === 'skipped').length;
  const broken2  = vals2.filter(v => v === 'doesnt-work').length;
  const queued2  = Object.keys(state.retryQueue || {}).length;
  const pct2     = Math.round((state.currentIndex / state.total) * 100);
  document.getElementById('progress-fill').style.width  = pct2 + '%';
  const parts = [skipped2 + ' skipped'];
  if (broken2)  parts.push(broken2  + " doesn't work");
  if (queued2)  parts.push(queued2  + ' queued');
  document.getElementById('progress-label').textContent = parts.join(' · ');
}

async function retry(env) {
  if (!state || !state.page) return;
  // Queue the retry intent and advance — no live Playwright here
  await api('POST', '/api/retry', { url: state.page.url, env });
  await loadPage();
}

async function runRetries() {
  const btn = document.getElementById('btn-run-retries');
  const log = document.getElementById('done-log');
  btn.disabled = true;
  log.style.display = '';
  log.textContent = 'Starting retries…\n';

  const res = await fetch('/api/run-retries', { method: 'POST' });
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const lines = decoder.decode(value).split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        const ev = JSON.parse(line);
        if (ev.type === 'progress') {
          const short = ev.url.replace('https://www.mongodb.com', '');
          log.textContent += '[' + ev.done + '/' + ev.total + '] ' + short + ' → ' + ev.result + '\n';
        } else if (ev.type === 'done') {
          log.textContent += '\nDone. ' + ev.succeeded + ' succeeded, ' + ev.failed + ' failed.\n';
          // Refresh summary counts
          await loadPage();
        } else if (ev.type === 'error') {
          log.textContent += 'ERROR: ' + ev.message + '\n';
        }
        log.scrollTop = log.scrollHeight;
      } catch {}
    }
  }
}

async function skip() {
  if (!state || !state.page) return;
  setBtns(true);
  await api('POST', '/api/skip', { url: state.page.url });
  await loadPage();
  setBtns(false);
}

async function nav(delta) {
  setBtns(true);
  await api('POST', '/api/nav', { delta });
  await loadPage();
  setBtns(false);
}

async function markDoesntWork() {
  if (!state || !state.page) return;
  setBtns(true);
  await api('POST', '/api/doesnt-work', { url: state.page.url });
  await loadPage();
  setBtns(false);
}

function setBtns(disabled) {
  ['btn-back','btn-retry-prod','btn-retry-staging','btn-retry-both','btn-doesnt-work','btn-skip']
    .forEach(id => document.getElementById(id).disabled = disabled);
}

document.getElementById('btn-retry-prod').onclick    = () => retry('prod');
document.getElementById('btn-retry-staging').onclick = () => retry('staging');
document.getElementById('btn-retry-both').onclick    = () => retry('both');
document.getElementById('btn-doesnt-work').onclick   = () => markDoesntWork();
document.getElementById('btn-skip').onclick          = () => skip();
document.getElementById('btn-back').onclick          = () => nav(-1);
document.getElementById('btn-run-retries').onclick   = () => runRetries();

document.addEventListener('keydown', e => {
  if (!state) return;
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); skip(); }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); nav(-1); }
  if (e.key === 'p' || e.key === 'P') retry('prod');
  if (e.key === 's' || e.key === 'S') retry('staging');
  if (e.key === 'b' || e.key === 'B') retry('both');
  if (e.key === 'x' || e.key === 'X') markDoesntWork();
});

loadPage().catch(err => {
  console.error('loadPage error:', err);
  document.getElementById('page-url').textContent = 'Error: ' + err.message;
});
</script>
</body>
</html>`;

// ── HTTP server ───────────────────────────────────────────────────────────────
let queue = null;   // built once on startup
let appState = null;

function getQueue() {
  if (!queue) queue = buildQueue();
  return queue;
}

function getState() {
  if (!appState) appState = loadState();
  return appState;
}

function persistState() {
  saveState(appState);
}

function buildQueue() {
  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
  return results
    .filter(r => r.prodScreenshot && r.stagingScreenshot)
    .sort((a, b) => a.url.localeCompare(b.url));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = { '.png': 'image/png', '.jpg': 'image/jpeg', '.html': 'text/html',
                 '.json': 'application/json', '.js': 'text/javascript' }[ext] || 'application/octet-stream';
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
}

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function handleRunRetries(res) {
  const st = getState();
  const retryQueue = st.retryQueue || {};
  const entries = Object.entries(retryQueue); // [ [url, env], ... ]

  res.writeHead(200, {
    'Content-Type': 'application/x-ndjson',
    'Transfer-Encoding': 'chunked',
    'Cache-Control': 'no-cache',
  });

  function send(obj) { res.write(JSON.stringify(obj) + '\n'); }

  if (entries.length === 0) {
    send({ type: 'done', succeeded: 0, failed: 0 });
    return res.end();
  }

  const browser = await chromium.launch({ headless: true });
  let succeeded = 0, failed = 0;

  try {
    for (let i = 0; i < entries.length; i++) {
      const [url, env] = entries[i];
      const s         = urlToSlug(url);
      const prodFile  = path.join(DIRS.prod,    `${s}.png`);
      const stageFile = path.join(DIRS.staging, `${s}.png`);

      const envs  = env === 'both' ? ['prod', 'staging'] : [env];
      const ctxs  = await Promise.all(envs.map(() => browser.newContext({ ignoreHTTPSErrors: true })));
      const pages = await Promise.all(ctxs.map(c => c.newPage()));

      const results = await Promise.all(envs.map((e, j) => screenshotPage(pages[j], url, e)));

      await Promise.all([
        ...pages.map(p => p.close().catch(() => {})),
        ...ctxs.map(c => c.close().catch(() => {})),
      ]);

      const hasError = results.some(r => r.error);
      const errorMsg = results.find(r => r.error)?.error || null;

      // Patch results.json entry
      const allResults = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
      const idx = allResults.findIndex(r => r.url === url);
      if (idx !== -1) {
        allResults[idx] = {
          ...allResults[idx],
          prodScreenshot:    fs.existsSync(prodFile)  ? path.relative('.', prodFile)  : null,
          stagingScreenshot: fs.existsSync(stageFile) ? path.relative('.', stageFile) : null,
          error: errorMsg,
        };
        fs.writeFileSync(RESULTS_FILE, JSON.stringify(allResults, null, 2));
      }

      if (hasError) {
        failed++;
        send({ type: 'progress', done: i + 1, total: entries.length, url, result: 'ERROR' });
      } else {
        succeeded++;
        send({ type: 'progress', done: i + 1, total: entries.length, url, result: 'OK' });
      }

      // Rate-limit delay between pages (skip after last)
      if (i < entries.length - 1) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    // Clear the retry queue from state
    st.retryQueue = {};
    persistState();
    queue = null; // force rebuild so badge reflects updates

    // Regenerate visual-report.html
    try {
      const { execSync } = require('child_process');
      execSync('node report-visual.js', { stdio: 'ignore' });
    } catch {}

    send({ type: 'done', succeeded, failed });
  } catch (err) {
    send({ type: 'error', message: err.message });
    send({ type: 'done', succeeded, failed });
  } finally {
    await browser.close().catch(() => {});
    res.end();
  }
}

const server = http.createServer(async (req, res) => {
  try {
  const url    = new URL(req.url, `http://localhost:${PORT}`);
  const method = req.method;

  // ── Static files
  if (method === 'GET' && url.pathname.startsWith('/screenshots/')) {
    return serveFile(res, '.' + url.pathname);
  }

  // ── UI
  if (method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(UI_HTML);
  }

  // ── API: state
  if (method === 'GET' && url.pathname === '/api/state') {
    const q   = getQueue();
    const st  = getState();
    const idx = Math.min(st.currentIndex, q.length);
    if (idx >= q.length) {
      return json(res, { done: true, total: q.length, reviewed: st.reviewed, retryQueue: st.retryQueue || {} });
    }
    return json(res, {
      done: false,
      currentIndex: idx,
      total: q.length,
      reviewed: st.reviewed,
      retryQueue: st.retryQueue || {},
      page: q[idx],
    });
  }

  // ── API: skip
  if (method === 'POST' && url.pathname === '/api/skip') {
    const body = await readBody(req);
    const st   = getState();
    st.reviewed[body.url] = 'skipped';
    st.currentIndex = Math.min(st.currentIndex + 1, getQueue().length);
    persistState();
    return json(res, { ok: true });
  }

  // ── API: doesn't work
  if (method === 'POST' && url.pathname === '/api/doesnt-work') {
    const body = await readBody(req);
    const st   = getState();
    st.reviewed[body.url] = 'doesnt-work';
    st.currentIndex = Math.min(st.currentIndex + 1, getQueue().length);
    persistState();
    return json(res, { ok: true });
  }

  // ── API: nav
  if (method === 'POST' && url.pathname === '/api/nav') {
    const body = await readBody(req);
    const st   = getState();
    st.currentIndex = Math.max(0, Math.min(st.currentIndex + (body.delta || 0), getQueue().length));
    persistState();
    return json(res, { ok: true });
  }

  // ── API: retry (queue intent, advance)
  if (method === 'POST' && url.pathname === '/api/retry') {
    const body = await readBody(req);
    const st   = getState();
    st.reviewed[body.url]              = 'retry-' + body.env;
    st.retryQueue = st.retryQueue || {};
    st.retryQueue[body.url]            = body.env;
    st.currentIndex = Math.min(st.currentIndex + 1, getQueue().length);
    persistState();
    return json(res, { ok: true });
  }

  // ── API: run-retries (batch, streaming NDJSON)
  if (method === 'POST' && url.pathname === '/api/run-retries') {
    return handleRunRetries(res);
  }

  res.writeHead(404); res.end('Not found');

  } catch (err) {
    console.error('[handler error]', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  }
});

server.listen(PORT, () => {
  const q  = buildQueue();
  const st = loadState();
  queue    = q;
  appState = st;
  const reviewed = Object.keys(st.reviewed).length;
  console.log(`Review server running at http://localhost:${PORT}`);
  console.log(`Queue: ${q.length} pages | Position: ${st.currentIndex + 1} | Reviewed: ${reviewed}`);
  console.log('Press Ctrl+C to stop.\n');
});
