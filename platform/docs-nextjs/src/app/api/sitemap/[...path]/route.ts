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

// Mirrors hapley's sitemap_index_generator.py: reads the docset catalog and
// applies the same filtering to produce a cross-project sitemap index.
async function generateSitemapIndexFull(): Promise<NextResponse> {
  const docsets = await getAllDocsetsWithVersionsCached();
  const sitemapUrls: string[] = [];

  for (const docset of docsets) {
    if (docset.internalOnly) continue;
    const { prefix } = docset;
    if (!prefix) continue;
    // hapley hardcodes https://www.mongodb.com as the base regardless of environment
    const baseUrl = `https://www.mongodb.com/${prefix}`;

    // Unversioned sites publish at the prefix with no version segment.
    const isMultiVersion = docset.versions.length > 1;

    for (const version of docset.versions) {
      if (!version.active) continue;
      if (version.eolType) continue;
      if (version.versionName === 'upcoming' || version.versionName === 'beta') continue;

      const extension = 'sitemap-0.xml';
      const url = isMultiVersion
        ? `${baseUrl}/${version.versionName}/${extension}`.toLowerCase()
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
