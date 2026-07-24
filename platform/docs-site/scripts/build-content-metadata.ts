/**
 * Generates per-project sitemaps and copies intersphinx inventory files from the
 * content-mdx directory into .next/static/docs-metadata/<url-prefix>/, mirroring
 * how content images are staged into .next/static/images (see
 * copy-images-to-next-static.ts) — the online pipeline has no public/ dependency.
 *
 * The files serve as plain static assets at
 * /_next/static/docs-metadata/<url-prefix>/..., and netlify.toml rewrites map the
 * canonical /docs/<url-prefix>/{sitemap-*.xml,objects.inv} URLs onto them. That
 * keeps their canonical locations (intersphinx hardcodes <base-url>/objects.inv;
 * sitemaps are consumed at their /docs/<prefix>/ URLs) while riding the same
 * _next asset path images use — out of the /docs/* soft-redirect page path.
 *
 * For every directory under content-mdx that contains a _site.json, this writes:
 *   - sitemap-0.xml      (page URLs from toctreeOrder + composable-page variants)
 *   - sitemap-index.xml  (points at sitemap-0.xml for the same project)
 *   - objects.inv        (copied verbatim, when present)
 *
 * Disk paths are remapped to their docs URL prefix using the same
 * dir-name-to-prefix map the app uses at runtime, so the emitted paths mirror the
 * canonical URLs (e.g. content-mdx/manual/v8.2 -> /docs/v8.2/sitemap-0.xml).
 *
 * Runs as postbuild (after next build), alongside copy-images-to-next-static.ts;
 * the offline export doesn't need these. Run via: pnpm build:metadata
 */

import fs from 'fs/promises';
import path from 'path';
import { CONTENT_MDX_DIR } from '../src/mdx-utils/content-constants';
import { loadDirNameToPrefixMap, remapDiskRelativeToBlobRelative } from '../src/mdx-utils/blob-path-remap';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mongodb.com';
const METADATA_DEST_DIR = path.join(process.cwd(), '.next', 'static', 'docs-metadata');
const INVENTORY_FILENAME = 'objects.inv';

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

async function copyInventory(diskDir: string, destDir: string): Promise<boolean> {
  const src = path.join(CONTENT_MDX_DIR, diskDir, INVENTORY_FILENAME);
  try {
    await fs.access(src);
  } catch {
    return false;
  }
  await fs.copyFile(src, path.join(destDir, INVENTORY_FILENAME));
  return true;
}

async function main(): Promise<void> {
  const startTime = Date.now();

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    console.error(`Content directory not found: ${CONTENT_MDX_DIR}`);
    process.exit(1);
  }

  try {
    await fs.access(path.join(process.cwd(), '.next'));
  } catch {
    console.error('.next output not found — run this after `next build`.');
    process.exit(1);
  }

  const prefixMap = await loadDirNameToPrefixMap();
  if (Object.keys(prefixMap).length === 0) {
    console.warn(
      '[build-content-metadata] dir-name-to-prefix.json is empty or missing; ' +
        'run `pnpm build:prefix-map` first. Emitting files under raw disk paths.',
    );
  }

  const siteDirs: string[] = [];
  await findSiteMetadataDirs(CONTENT_MDX_DIR, CONTENT_MDX_DIR, siteDirs);

  if (siteDirs.length === 0) {
    console.log('No _site.json found in content directory; nothing to generate.');
    return;
  }

  // Clean to avoid stale sitemaps/inventories from previous builds.
  await fs.rm(METADATA_DEST_DIR, { recursive: true, force: true });

  let sitemapCount = 0;
  let inventoryCount = 0;

  for (const diskDir of siteDirs) {
    const siteMetadata = await readSiteMetadata(diskDir);
    if (!siteMetadata) {
      console.warn(`[build-content-metadata] skipping ${diskDir}: could not read _site.json`);
      continue;
    }

    const urlPrefix = remapDiskRelativeToBlobRelative(diskDir, prefixMap);
    const destDir = path.join(METADATA_DEST_DIR, urlPrefix);
    await fs.mkdir(destDir, { recursive: true });

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
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(
    `Generated ${sitemapCount} sitemap(s) and copied ${inventoryCount} inventory file(s) ` +
      `to .next/static/docs-metadata/ in ${elapsed}s`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
