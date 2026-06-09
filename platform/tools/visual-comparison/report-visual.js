#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const RESULTS_FILE = './results.json';
const standalone   = process.argv.includes('--standalone');
const OUTPUT_FILE  = standalone ? './visual-report-standalone.html' : './visual-report.html';

function toStagingUrl(prodUrl) {
  return prodUrl.replace(
    'https://www.mongodb.com/',
    'https://mongodbcom.staging.corp.mongodb.com/'
  );
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Resize to 720 px wide + JPEG quality 85 → base64 data URL.
// Falls back to PNG for screenshots too tall for JPEG (> 65535 px after resize).
async function toDataUrl(filePath) {
  if (!fs.existsSync(filePath)) return filePath;
  const sharp = require('sharp');
  const pipeline = sharp(filePath, { limitInputPixels: false })
    .resize({ width: 1440, withoutEnlargement: true });
  try {
    const buf = await pipeline.clone().webp({ quality: 80 }).toBuffer();
    return 'data:image/webp;base64,' + buf.toString('base64');
  } catch (e) {
    if (!e.message.includes('too large')) throw e;
    try {
      const buf = await pipeline.clone().jpeg({ quality: 80 }).toBuffer();
      return 'data:image/jpeg;base64,' + buf.toString('base64');
    } catch (e2) {
      if (!e2.message.includes('too large')) throw e2;
      const buf = await pipeline.clone().png({ compressionLevel: 8 }).toBuffer();
      return 'data:image/png;base64,' + buf.toString('base64');
    }
  }
}

// Write a string to a stream, waiting for drain if the buffer is full.
function write(stream, chunk) {
  return new Promise((resolve, reject) => {
    const ok = stream.write(chunk, 'utf8', err => { if (err) reject(err); });
    if (ok) resolve();
    else stream.once('drain', resolve);
  });
}

async function main() {
  if (!fs.existsSync(RESULTS_FILE)) {
    console.error(`Cannot find ${RESULTS_FILE} — run crawler.js first.`);
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));

  const withScreenshots = results
    .filter(r => r.prodScreenshot && r.stagingScreenshot)
    .sort((a, b) => a.url.localeCompare(b.url));

  const errors = results.filter(r => !r.prodScreenshot || !r.stagingScreenshot);

  const n = withScreenshots.length;

  if (standalone) {
    console.log(`Embedding ${n} pages as base64 WebP q80 (1440px)…`);
  }

  const stream = fs.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' });
  await new Promise((resolve, reject) => {
    stream.once('open', resolve);
    stream.once('error', reject);
  });

  // ── Header ───────────────────────────────────────────────────────────────────
  await write(stream, `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Atlas Docs — Visual Comparison</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font:14px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#111;color:#eee}

/* ── Top bar ── */
#topbar{
  position:sticky;top:0;z-index:100;
  background:#001e2b;
  padding:12px 20px;
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  border-bottom:2px solid #00684a;
}
#topbar h1{font-size:1rem;font-weight:600;white-space:nowrap;color:#fff}
#search{
  margin-left:auto;padding:6px 12px;border-radius:20px;
  border:1px solid #444;background:#1a2a35;color:#eee;
  font-size:.85rem;width:260px;outline:none;
}
#search:focus{border-color:#00684a}
#count-label{font-size:.8rem;color:#aaa;white-space:nowrap}

/* ── Page sections ── */
.page{
  border-bottom:3px solid #333;
  padding-bottom:0;
}
.page.hidden{display:none}

.page-header{
  position:sticky;top:56px;z-index:50;
  background:#1a1a1a;
  display:flex;align-items:center;gap:12px;flex-wrap:wrap;
  padding:8px 16px;
  border-bottom:1px solid #333;
}
.page-url{
  font-family:monospace;font-size:.82rem;color:#ccc;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;
}
.page-links{display:flex;gap:10px;flex-shrink:0}
.page-links a{
  font-size:.8rem;color:#5bb;text-decoration:none;
  padding:2px 8px;border:1px solid #3a6a6a;border-radius:4px;
}
.page-links a:hover{background:#1a3a3a}

/* ── Screenshot pair ── */
.pair{
  display:grid;grid-template-columns:1fr 1fr;
}
figure{
  border-right:1px solid #333;overflow:hidden;
}
figure:last-child{border-right:none}
figcaption{
  padding:4px 12px;font-size:.72rem;font-weight:600;
  color:#999;background:#161616;border-bottom:1px solid #2a2a2a;
  text-transform:uppercase;letter-spacing:.06em;
}
img{
  display:block;width:100%;height:auto;
}

/* ── Error section ── */
.error-section{padding:32px 20px}
.error-section h2{font-size:1rem;color:#9090ff;margin-bottom:12px}
.error-section ul{list-style:none;display:flex;flex-direction:column;gap:6px}
.error-section li{
  font-size:.82rem;background:#1a1a2a;padding:6px 12px;border-radius:4px;
}
.error-section a{color:#7ab}
.err-reason{margin-left:10px;color:#f88;font-size:.75rem;font-family:monospace}

/* ── No results ── */
#no-results{display:none;padding:60px;text-align:center;color:#666;font-size:1rem}
</style>
</head>
<body>

<div id="topbar">
  <h1>Atlas Docs — Visual Comparison</h1>
  <input id="search" type="search" placeholder="Filter by URL…" oninput="filterPages(this.value)">
  <span id="count-label">${n} pages</span>
</div>

<div id="pages">
`);

  // ── Page sections (streamed one at a time) ────────────────────────────────────
  for (let i = 0; i < withScreenshots.length; i++) {
    const r = withScreenshots[i];

    const prodSrc    = standalone ? await toDataUrl(r.prodScreenshot)    : r.prodScreenshot;
    const stagingSrc = standalone ? await toDataUrl(r.stagingScreenshot) : r.stagingScreenshot;

    if (standalone) {
      process.stdout.write(`  ${i + 1}/${n}\r`);
    }

    const shortUrl   = r.url.replace('https://www.mongodb.com', '');
    const stagingUrl = toStagingUrl(r.url);

    await write(stream, `<section class="page" data-url="${escHtml(shortUrl)}">
  <div class="page-header">
    <span class="page-url">${escHtml(shortUrl)}</span>
    <div class="page-links">
      <a href="${escHtml(r.url)}" target="_blank" rel="noopener">Prod ↗</a>
      <a href="${escHtml(stagingUrl)}" target="_blank" rel="noopener">Staging ↗</a>
    </div>
  </div>
  <div class="pair">
    <figure>
      <figcaption>Production</figcaption>
      <img src="${escHtml(prodSrc)}" loading="lazy" alt="Production screenshot">
    </figure>
    <figure>
      <figcaption>Staging</figcaption>
      <img src="${escHtml(stagingSrc)}" loading="lazy" alt="Staging screenshot">
    </figure>
  </div>
</section>
`);
  }

  // ── Error list ───────────────────────────────────────────────────────────────
  const errorRows = errors.map(r => {
    const stagingUrl = toStagingUrl(r.url);
    return `<li>
    <a href="${escHtml(r.url)}" target="_blank" rel="noopener">${escHtml(r.url.replace('https://www.mongodb.com', ''))}</a>
    &nbsp;·&nbsp;
    <a href="${escHtml(stagingUrl)}" target="_blank" rel="noopener">Staging ↗</a>
    <span class="err-reason">${escHtml(r.error || 'Missing screenshot')}</span>
  </li>`;
  }).join('\n');

  // ── Footer ───────────────────────────────────────────────────────────────────
  await write(stream, `</div>

<p id="no-results">No pages match.</p>

${errors.length ? `<div class="error-section">
  <h2>Pages with errors or missing screenshots (${errors.length})</h2>
  <ul>${errorRows}</ul>
</div>` : ''}

<script>
const pages = document.querySelectorAll('.page');
const label = document.getElementById('count-label');
const noRes = document.getElementById('no-results');

function filterPages(q) {
  q = q.trim().toLowerCase();
  let visible = 0;
  pages.forEach(p => {
    const match = !q || p.dataset.url.includes(q);
    p.classList.toggle('hidden', !match);
    if (match) visible++;
  });
  label.textContent = q ? visible + ' / ${n} pages' : '${n} pages';
  noRes.style.display = visible === 0 ? 'block' : 'none';
}
</script>
</body>
</html>`);

  await new Promise((resolve, reject) => {
    stream.end(err => { if (err) reject(err); else resolve(); });
  });

  const sizeMb = (fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(0);
  console.log(`\nWritten: ${OUTPUT_FILE} (${sizeMb} MB)`);
  console.log(`  ${n} pages with screenshots (sorted by URL)`);
  console.log(`  ${errors.length} error entries listed without images`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
