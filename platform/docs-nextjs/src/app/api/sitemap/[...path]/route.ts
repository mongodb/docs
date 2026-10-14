import { NextResponse } from 'next/server';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';

function escapeXml(url: string): string {
  return url.replace(/&/g, '&amp;');
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

// Mirrors hapley's sitemap_index_generator.py: queries docsets and applies the
// same filtering to produce a cross-project sitemap index.
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

// Per-project sitemaps are served by the product sites, so only the
// cross-docset index is handled here. Reached via the /docs/sitemap-:n.xml
// rewrite in next.config.mjs.
export async function GET(_req: Request, { params }: { params: { path: string[] } }) {
  const filename = params.path?.[params.path.length - 1];

  if (filename !== 'sitemap-index-full.xml') {
    return new NextResponse('Not Found', { status: 404 });
  }

  return generateSitemapIndexFull();
}
