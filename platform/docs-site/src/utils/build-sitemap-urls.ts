/**
 * Builds the URL list for a per-docset sitemap-0.xml.
 * Page URLs come from the MDX walk; composable tutorials add query-string
 * variants from `_site.json` `composablePages`.
 */

export function slugToUrl(baseDocUrl: string, slug: string): string {
  const base = baseDocUrl.replace(/\/+$/, '');
  const normalized = slug.replace(/^\/+|\/+$/g, '');
  if (!normalized || normalized === 'index') {
    return `${base}/`;
  }
  return `${base}/${normalized}/`;
}

export function buildSitemapUrls(
  baseDocUrl: string,
  pageSlugs: string[],
  composablePages?: Record<string, Array<Record<string, string>>>,
): string[] {
  const urls = [...new Set(pageSlugs.map((slug) => slugToUrl(baseDocUrl, slug)))];

  if (composablePages) {
    for (const [slug, selectionsList] of Object.entries(composablePages)) {
      const base = slugToUrl(baseDocUrl, slug);
      for (const selections of selectionsList) {
        const qs = new URLSearchParams(selections).toString();
        if (qs) urls.push(`${base}?${qs}`);
      }
    }
  }

  return urls.sort();
}
