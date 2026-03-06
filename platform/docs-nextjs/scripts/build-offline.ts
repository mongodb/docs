/**
 * Offline docs build: produces a static snapshot that works from the filesystem (e.g. file:// or a zip).
 *
 * - Runs Next.js static export (build:offline)
 * - Merges all CSS into one file and rewrites image url()s to assets/
 * - Copies static and content-referenced images into the output
 * - Rewrites HTML so stylesheets and links are relative (scripts untouched)
 * - Flattens output: keeps only and docs/, moves it to the build root, and fixes link paths
 */

import fs from 'fs/promises';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'out');
const CONTENT_MDX_DIR = path.join(process.cwd(), '..', '..', 'content-mdx');

const DOCS_DIR = path.join(OUT_DIR, 'docs');
const NEXT_STATIC_DIR = path.join(OUT_DIR, '_next', 'static');
const NEXT_CSS_DIR = path.join(NEXT_STATIC_DIR, 'css');
const MERGED_CSS_PATH = path.join(DOCS_DIR, 'styles.css');
const ASSETS_DIR = path.join(DOCS_DIR, 'assets');

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.avif']);
const isImagePath = (name: string) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());

/** Collect content image paths from HTML: (href|src)="/docs/...file.ext" with image extension. */
function getReferencedContentImagePaths(htmlContent: string): Set<string> {
  const re = /(?:href|src)=["']\/docs\/([^"']+\.(?:png|jpg|jpeg|gif|webp|svg|ico|avif))["']/gi;
  const set = new Set<string>();
  for (const m of htmlContent.matchAll(re)) set.add(m[1].replace(/\/+/g, path.sep));
  return set;
}

function getRelativePrefix(htmlFilePath: string): string {
  const dir = path.dirname(htmlFilePath);
  const segments = path.relative(OUT_DIR, dir).split(path.sep).filter(Boolean);
  return segments.length === 0 ? './' : '../'.repeat(segments.length);
}

const stripDocsPrefix = (rest: string) => rest.replace(/^docs\/?/, '');

/** Rewrite href/src to relative paths only outside <script> (preserve RSC payload). */
function rewriteHtmlLinks(content: string, prefix: string): string {
  const scripts: string[] = [];
  const noScripts = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (match) => {
    scripts.push(match);
    return `\x00S${scripts.length - 1}\x00`;
  });
  const rewritten = noScripts.replace(
    /(href|src)=["']\/(?!\/)([^"']*)["']/g,
    (_, attr, rest) => `${attr}="${prefix}${stripDocsPrefix(rest)}"`,
  );
  return rewritten.replace(/\x00S(\d+)\x00/g, (_, i) => scripts[parseInt(i, 10)] ?? '');
}

async function findImageFiles(dir: string, baseDir: string): Promise<{ src: string; rel: string }[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: { src: string; rel: string }[] = [];
  for (const e of entries) {
    const src = path.join(dir, e.name);
    const rel = path.relative(baseDir, src);
    if (e.isDirectory()) files.push(...(await findImageFiles(src, baseDir)));
    else if (e.isFile() && isImagePath(e.name)) files.push({ src, rel });
  }
  return files;
}

async function findHtmlFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await findHtmlFiles(full)));
    else if (e.name.toLowerCase().endsWith('.html')) files.push(full);
  }
  return files;
}

/** Copy image files from srcDir to destDir (same relative paths). No-op if srcDir missing or no images. */
async function copyImageFilesTo(srcDir: string, destDir: string, logLabel: string): Promise<void> {
  let imageFiles: { src: string; rel: string }[];
  try {
    await fs.access(srcDir);
    imageFiles = await findImageFiles(srcDir, srcDir);
  } catch {
    return;
  }
  if (imageFiles.length === 0) return;
  for (const { src, rel } of imageFiles) {
    const dest = path.join(destDir, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.cp(src, dest);
  }
  console.log(`${logLabel}: ${imageFiles.length}`);
}

/** Copy content images that appear in HTML (keeps output to referenced docsets only). */
async function copyReferencedContentImages(htmlFiles: string[], contentMdxDir: string, docsDir: string): Promise<void> {
  const referenced = new Set<string>();
  for (const filePath of htmlFiles) {
    const content = await fs.readFile(filePath, 'utf-8');
    for (const rel of getReferencedContentImagePaths(content)) referenced.add(rel);
  }
  let copied = 0;
  for (const rel of referenced) {
    const src = path.join(contentMdxDir, rel);
    try {
      await fs.access(src);
    } catch {
      continue;
    }
    const dest = path.join(docsDir, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.cp(src, dest);
    copied++;
  }
  console.log(`Content images (referenced in HTML): ${copied}`);
}

async function mergeCssIntoOutput(): Promise<void> {
  try {
    await fs.access(NEXT_CSS_DIR);
  } catch {
    console.log('No _next/static/css, skipping CSS merge.');
    return;
  }
  const entries = await fs.readdir(NEXT_CSS_DIR, { withFileTypes: true });
  const cssFiles = entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.css'))
    .map((e) => path.join(NEXT_CSS_DIR, e.name))
    .sort();
  if (cssFiles.length === 0) return;
  const chunks = await Promise.all(cssFiles.map((f) => fs.readFile(f, 'utf-8')));
  let merged = chunks.join('\n');
  // Image url()s → relative assets/ so they work after we remove _next; other url()s stay absolute (e.g. fonts) and may 404 offline
  merged = merged.replace(/url\(["']?\/_next\/static\/([^"')]+)["']?\)/g, (_, rest) => {
    const norm = rest.replace(/\\/g, '/');
    return isImagePath(norm) ? `url("assets/${norm}")` : `url("/_next/static/${norm}")`;
  });
  await fs.mkdir(path.dirname(MERGED_CSS_PATH), { recursive: true });
  await fs.writeFile(MERGED_CSS_PATH, merged, 'utf-8');
  console.log(`Merged ${cssFiles.length} CSS file(s) into styles.css`);
}

/** Match one or more Next stylesheet links (so we replace the group with a single link). */
const STYLE_LINKS_RE =
  /(<link(?=[^>]*rel=["']stylesheet["'])(?=[^>]*href=["']\/_next\/static\/css\/[^"']+["'])[^>]*>\s*)+/gi;

async function replaceCssLinksInHead(htmlFiles: string[]): Promise<void> {
  for (const filePath of htmlFiles) {
    const content = await fs.readFile(filePath, 'utf-8');
    const headEnd = content.indexOf('</head>');
    if (headEnd === -1) continue;
    const head = content.slice(0, headEnd);
    const rest = content.slice(headEnd);
    const relativeToCss = path.relative(path.dirname(filePath), MERGED_CSS_PATH).split(path.sep).join('/');
    const newHead = head.replace(STYLE_LINKS_RE, `<link rel="stylesheet" href="${relativeToCss}">`);
    if (newHead !== head) await fs.writeFile(filePath, newHead + rest, 'utf-8');
  }
}

async function keepOnlyDocs(): Promise<void> {
  const entries = await fs.readdir(OUT_DIR, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'docs') continue;
    await fs.rm(path.join(OUT_DIR, e.name), { recursive: true });
  }
}

async function moveDocsContentsUp(): Promise<void> {
  const entries = await fs.readdir(DOCS_DIR, { withFileTypes: true });
  for (const e of entries) {
    await fs.rename(path.join(DOCS_DIR, e.name), path.join(OUT_DIR, e.name));
  }
  await fs.rmdir(DOCS_DIR);
}

async function postProcess(): Promise<void> {
  const htmlFiles = await findHtmlFiles(OUT_DIR);
  for (const filePath of htmlFiles) {
    const content = await fs.readFile(filePath, 'utf-8');
    const prefix = getRelativePrefix(filePath);
    const rewritten = rewriteHtmlLinks(content, prefix);
    if (rewritten !== content) await fs.writeFile(filePath, rewritten, 'utf-8');
  }
}

async function main(): Promise<void> {
  try {
    await fs.access(OUT_DIR);
  } catch {
    console.error(`Output directory ${OUT_DIR} not found.`);
    process.exit(1);
  }

  await mergeCssIntoOutput();
  await fs.mkdir(ASSETS_DIR, { recursive: true });
  await copyImageFilesTo(NEXT_STATIC_DIR, ASSETS_DIR, 'Static images');

  const htmlFiles = await findHtmlFiles(OUT_DIR);
  await replaceCssLinksInHead(htmlFiles);
  await copyReferencedContentImages(htmlFiles, CONTENT_MDX_DIR, DOCS_DIR);

  await keepOnlyDocs();
  await moveDocsContentsUp();
  await postProcess();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
