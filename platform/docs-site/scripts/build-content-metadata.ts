/**
 * Generates per-docset sitemaps and copies static metadata files from
 * content-mdx into public/, so that with the app's per-project basePath
 * (/docs/<docsetBase>) Next serves them at their canonical URLs with no rewrites.
 *
 * A file's canonical URL is /docs/<url-prefix>/FILE (intersphinx hardcodes
 * <base-url>/objects.inv; sitemaps live at their /docs/<prefix>/ URLs). Relative
 * to basePath that's <rest>/FILE (rest = version segment(s), or empty), so
 * staging to public/<rest>/FILE serves it at <basePath>/<rest>/FILE = canonical.
 *
 * For versioned docsets, MDX conversion also writes the stable-branch
 * objects.inv at the project root (content-mdx/<dir>/objects.inv, no
 * _site.json). That file is staged to public/objects.inv so it is served at
 * /docs/<docsetBase>/objects.inv. Skipped for landing (empty docsetBase) and
 * for non-versioned docsets whose project root already has a _site.json
 * (already staged by the per-site-dir loop).
 *
 * manpages.tar.gz (when present in the parser bundle) is staged only at the
 * versioned path for versioned docsets, or at the project base for unversioned
 * ones — never also at the unversioned project root of a versioned docset.
 *
 * public/ (not _next) because .xml/.inv/.tar.gz can't ride the _next static
 * path — Next's production static handler only serves image/asset extensions
 * there. We stage only this deploy's docset; others live on their own deploys.
 * Emits sitemap-0.xml, sitemap-index.xml, objects.inv, and manpages.tar.gz
 * (when present) per _site.json dir.
 *
 * Runs prebuild so files land in public/ before next build. Generated files are
 * gitignored. Run via: pnpm build:metadata
 */

import fs from 'fs/promises';
import path from 'path';
import { CONTENT_MDX_DIR } from '../src/mdx-utils/content-constants';
import {
  loadDirNameToPrefixMap,
  remapDiskRelativeToBlobRelative,
  stripDocsPrefix,
} from '../src/mdx-utils/blob-path-remap';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mongodb.com';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const GENERATED_FILENAMES = [
  'sitemap-0.xml',
  'sitemap-index.xml',
  'objects.inv',
  'manpages.tar.gz',
];
const INVENTORY_FILENAME = 'objects.inv';
const MANPAGES_FILENAME = 'manpages.tar.gz';

/** This deploy's docset URL prefix (e.g. `languages/python/django-mongodb`, or
 * '' for the empty-prefix landing/manual deploy). Mirrors next.config.mjs. */
function getDocsetBase(dirNameToPrefix: Record<string, string>): string {
  const docsProject = process.env.DOCS_PROJECT;
  if (!docsProject) return '';
  const rawPrefix = dirNameToPrefix[docsProject.split('/')[0]];
  return rawPrefix ? stripDocsPrefix(rawPrefix) : '';
}

/** Minimal shape of _site.json needed to build a sitemap. */
interface SiteMetadata {
  toctreeOrder?: string[];
  composablePages?: Record<string, Array<Record<string, string>>>;
}

function escapeXml(url: string): string {
  return url.replace(/&/g, '&amp;');
}

function buildSitemapXml(urls: string[]): string {
  const entries = urls
    .map(
      (url) =>
        `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    )
    .join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
      ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"' +
      ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' +
      ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' +
      ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
    entries,
    '</urlset>',
  ].join('\n');
}

function buildSitemapIndexXml(sitemapUrls: string[]): string {
  const entries = sitemapUrls
    .map((url) => `  <sitemap>\n    <loc>${escapeXml(url)}</loc>\n  </sitemap>`)
    .join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</sitemapindex>',
  ].join('\n');
}

function slugToUrl(baseDocUrl: string, slug: string): string {
  const normalized = slug.replace(/^\/+|\/+$/g, '');
  if (!normalized || normalized === 'index') {
    return `${baseDocUrl}/`;
  }
  return `${baseDocUrl}/${normalized}/`;
}

function buildSitemapUrls(baseDocUrl: string, siteMetadata: SiteMetadata): string[] {
  const urls = [
    ...new Set((siteMetadata.toctreeOrder ?? []).map((slug) => slugToUrl(baseDocUrl, slug))),
  ];

  // Composable tutorial pages get an extra sitemap entry per selection permutation,
  // mirroring the query-string variants the API-route sitemap produced.
  if (siteMetadata.composablePages) {
    for (const [slug, selectionsList] of Object.entries(siteMetadata.composablePages)) {
      const base = slugToUrl(baseDocUrl, slug);
      for (const selections of selectionsList) {
        const qs = new URLSearchParams(selections).toString();
        if (qs) urls.push(`${base}?${qs}`);
      }
    }
  }

  return urls.sort();
}

/** Recursively collect content-mdx dirs (relative to baseDir) that contain a _site.json. */
async function findSiteMetadataDirs(dir: string, baseDir: string, out: string[]): Promise<void> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  if (entries.some((e) => e.isFile() && e.name === '_site.json')) {
    out.push(path.relative(baseDir, dir));
    // A docset/version root never nests another _site.json, so stop descending.
    return;
  }

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_')) {
      await findSiteMetadataDirs(path.join(dir, entry.name), baseDir, out);
    }
  }
}

async function readSiteMetadata(diskDir: string): Promise<SiteMetadata | null> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_MDX_DIR, diskDir, '_site.json'), 'utf-8');
    return JSON.parse(raw) as SiteMetadata;
  } catch {
    return null;
  }
}

/** Copy a generated static file from content-mdx/<diskDir>/ into destDir if present. */
async function copyStaticFile(
  diskDir: string,
  destDir: string,
  filename: string,
): Promise<boolean> {
  const src = path.join(CONTENT_MDX_DIR, diskDir, filename);
  try {
    await fs.access(src);
  } catch {
    return false;
  }
  await fs.copyFile(src, path.join(destDir, filename));
  return true;
}

async function copyInventory(diskDir: string, destDir: string): Promise<boolean> {
  return copyStaticFile(diskDir, destDir, INVENTORY_FILENAME);
}

async function copyManpages(diskDir: string, destDir: string): Promise<boolean> {
  return copyStaticFile(diskDir, destDir, MANPAGES_FILENAME);
}

async function main(): Promise<void> {
  const startTime = Date.now();

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    console.error(`Content directory not found: ${CONTENT_MDX_DIR}`);
    process.exit(1);
  }

  const prefixMap = await loadDirNameToPrefixMap();
  if (Object.keys(prefixMap).length === 0) {
    console.warn(
      '[build-content-metadata] dir-name-to-prefix.json is empty or missing; ' +
        'run `pnpm build:prefix-map` first. Emitting files under raw disk paths.',
    );
  }

  const docsetBase = getDocsetBase(prefixMap);

  const siteDirs: string[] = [];
  await findSiteMetadataDirs(CONTENT_MDX_DIR, CONTENT_MDX_DIR, siteDirs);

  if (siteDirs.length === 0) {
    console.log('No _site.json found in content directory; nothing to generate.');
    return;
  }

  // Clean prior generated metadata from public/ to avoid stale files.
  await removeGeneratedMetadata(PUBLIC_DIR);

  let sitemapCount = 0;
  let inventoryCount = 0;
  let manpagesCount = 0;

  for (const diskDir of siteDirs) {
    const urlPrefix = remapDiskRelativeToBlobRelative(diskDir, prefixMap);

    // Only stage THIS deploy's docset; other docsets live on their own deploys.
    // `rest` is the canonical path relative to basePath (the version segment(s),
    // or '' for a non-versioned docset root).
    let rest: string;
    if (urlPrefix === docsetBase) {
      rest = '';
    } else if (docsetBase === '') {
      rest = urlPrefix;
    } else if (urlPrefix.startsWith(`${docsetBase}/`)) {
      rest = urlPrefix.slice(docsetBase.length + 1);
    } else {
      continue;
    }

    const siteMetadata = await readSiteMetadata(diskDir);
    if (!siteMetadata) {
      console.warn(`[build-content-metadata] skipping ${diskDir}: could not read _site.json`);
      continue;
    }

    const destDir = rest ? path.join(PUBLIC_DIR, rest) : PUBLIC_DIR;
    await fs.mkdir(destDir, { recursive: true });

    // Sitemap page URLs use the full canonical prefix (unaffected by basePath).
    const baseDocUrl = `${SITE_URL}/docs/${urlPrefix}`;
    const urls = buildSitemapUrls(baseDocUrl, siteMetadata);

    await fs.writeFile(path.join(destDir, 'sitemap-0.xml'), buildSitemapXml(urls), 'utf-8');
    await fs.writeFile(
      path.join(destDir, 'sitemap-index.xml'),
      buildSitemapIndexXml([`${baseDocUrl}/sitemap-0.xml`]),
      'utf-8',
    );
    sitemapCount++;

    if (await copyInventory(diskDir, destDir)) inventoryCount++;
    // manpages.tar.gz is only staged at this site dir's path (versioned or
    // unversioned base). Unlike objects.inv, it is never dual-written to the
    // unversioned project root of a versioned docset.
    if (await copyManpages(diskDir, destDir)) manpagesCount++;
  }

  // Stage the project-root objects.inv for versioned docsets. Conversion writes
  // this for the stable branch at content-mdx/<dir>/objects.inv (no _site.json,
  // so the loop above never sees it). Skip when:
  // - docsetBase is empty (landing; /docs/objects.inv is handled above), or
  // - the project root is already a site dir (non-versioned docsets like
  //   compass — the loop already copied their inv to public/).
  // manpages.tar.gz is intentionally omitted here.
  if (docsetBase) {
    const diskRoot = process.env.DOCS_PROJECT?.split('/')[0];
    if (
      diskRoot &&
      !siteDirs.includes(diskRoot) &&
      (await copyInventory(diskRoot, PUBLIC_DIR))
    ) {
      inventoryCount++;
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(
    `Generated ${sitemapCount} sitemap(s), copied ${inventoryCount} inventory file(s), ` +
      `and ${manpagesCount} manpages bundle(s) to public/ in ${elapsed}s`,
  );
}

/** Recursively remove previously generated metadata files (fixed filenames) from
 * public/, leaving committed assets untouched. */
async function removeGeneratedMetadata(dir: string): Promise<void> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await removeGeneratedMetadata(full);
    } else if (GENERATED_FILENAMES.includes(entry.name)) {
      await fs.rm(full, { force: true });
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
