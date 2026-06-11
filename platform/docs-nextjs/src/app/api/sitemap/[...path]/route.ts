import { NextResponse } from 'next/server';
import { getSiteMetadata } from '@/mdx-utils/load-metadata';
import { getClient, getPoolDbName } from '@/services/db/client';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';
import envConfig from '@/utils/env-config';
import type { ReposBranchesDocument } from '@/types/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mongodb.com';

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

// Returns true if the branch is marked noIndexing in repos_branches.
// Fails open (returns false) if the DB is unavailable, so a transient
// connection error doesn't suppress a legitimate sitemap.
async function isBranchNoIndexing(project: string, gitBranch: string): Promise<boolean> {
  try {
    const client = getClient();
    const db = client.db(getPoolDbName(envConfig.DB_ENV));
    const repoDoc = await db
      .collection<ReposBranchesDocument>('repos_branches')
      .findOne({ project }, { projection: { branches: 1 } });
    const branchData = repoDoc?.branches.find((b) => b.gitBranchName === gitBranch);
    return branchData?.noIndexing ?? false;
  } catch {
    return false;
  }
}

// Mirrors hapley's sitemap_index_generator.py: queries docsets+repos_branches and
// applies the same filtering to produce a cross-project sitemap index.
async function generateSitemapIndexFull(): Promise<NextResponse> {
  let docsets;
  try {
    docsets = await getAllDocsetsWithVersionsCached();
  } catch {
    // DB unavailable — return 503 so crawlers retry rather than de-indexing.
    return new NextResponse('Service Unavailable', { status: 503 });
  }
  const sitemapUrls: string[] = [];

  for (const docset of docsets) {
    if (docset.internalOnly || !docset.prodDeployable) continue;
    const prefix = docset.prefix?.dotcomprd;
    if (!prefix) continue;
    // hapley hardcodes https://www.mongodb.com as the base regardless of environment
    const baseUrl = `https://www.mongodb.com/${prefix}`;

    for (const branch of docset.branches ?? []) {
      if (!branch.active) continue;
      if (branch.eol_type) continue;
      if (branch.urlSlug === 'upcoming' || branch.urlSlug === 'beta') continue;
      if (branch.gitBranchName === 'master' && branch.urlSlug === 'master') continue;

      const urlSuffix =
        branch.urlSlug ||
        (branch.publishOriginalBranchName ? branch.gitBranchName : '');
      const extension = branch.buildsWithSnooty !== false ? 'sitemap-0.xml' : 'sitemap.xml.gz';
      const url = urlSuffix
        ? `${baseUrl}/${urlSuffix}/${extension}`.toLowerCase()
        : `${baseUrl}/${extension}`.toLowerCase();

      sitemapUrls.push(url);
    }
  }

  return new NextResponse(buildSitemapIndexXml(sitemapUrls.sort()), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

// Serves sitemaps generated dynamically from _site.json blob data.
// Rewrites map /docs/sitemap-:n.xml and /docs/:path*/sitemap-:n.xml to this handler.
export async function GET(_req: Request, { params }: { params: { path: string[] } }) {
  try {
    const segments = params.path;
    const filename = segments[segments.length - 1];

    if (filename === 'sitemap-index-full.xml') {
      return generateSitemapIndexFull();
    }

    if (filename !== 'sitemap-0.xml' && filename !== 'sitemap-index.xml') {
      return new NextResponse('Not Found', { status: 404 });
    }
    // Drop the sitemap filename to get the project path segments for metadata lookup.
    // If there's only the filename (landing page sitemap), pass it as-is so
    // getSiteMetadata falls back to the empty-prefix landing page.
    const metadataPath = segments.length > 1 ? segments.slice(0, -1) : segments;

    const { projectPath, siteMetadata } = await getSiteMetadata(metadataPath);

    // getSiteMetadata does a prefix match, so /bi-connector/current/asdf would
    // resolve to projectPath='bi-connector/current'. Reject any path with extra
    // segments after the known project prefix.
    const pathBeforeFilename = segments.length > 1 ? segments.slice(0, -1).join('/') : '';
    if (projectPath !== pathBeforeFilename) {
      return new NextResponse('Not Found', { status: 404 });
    }

    if (await isBranchNoIndexing(siteMetadata.project, siteMetadata.branch)) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const baseDocUrl = `${SITE_URL}/docs${projectPath ? `/${projectPath}` : ''}`;

    const xmlHeaders = {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    };

    if (filename === 'sitemap-index.xml') {
      const xml = buildSitemapIndexXml([`${baseDocUrl}/sitemap-0.xml`]);
      return new NextResponse(xml, { status: 200, headers: xmlHeaders });
    }

    const urls = [
      ...new Set(siteMetadata.toctreeOrder.map((slug) => slugToUrl(baseDocUrl, slug))),
    ];

    // Composable tutorial pages get additional sitemap entries for each selection
    // permutation, mirroring the query-string variants snooty/Gatsby added via resolvePages.
    if (siteMetadata.composablePages) {
      for (const [slug, selectionsList] of Object.entries(siteMetadata.composablePages)) {
        const base = slugToUrl(baseDocUrl, slug);
        for (const selections of selectionsList) {
          const qs = new URLSearchParams(selections).toString();
          if (qs) urls.push(`${base}?${qs}`);
        }
      }
    }

    const xml = buildSitemapXml(urls.sort());
    return new NextResponse(xml, { status: 200, headers: xmlHeaders });
  } catch (error) {
    console.error('[sitemap] Error generating sitemap:', error);
    return new NextResponse('Not Found', { status: 404 });
  }
}
