import type { PageRef } from '../types.js';

export function slugFor(urlPath: string, query?: string): string {
  // The first segment is the site prefix (e.g. `docs`), which is not part of the slug.
  const segments = urlPath.replace(/^\//, '').replace(/\/$/, '').split('/').slice(1);
  const base = segments.join('/').replace(/\//g, '__').replace(/[^a-zA-Z0-9_-]/g, '_');
  if (!query) return base || 'index';
  const q = query.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${base || 'index'}__${q}`;
}

export function buildPageRefs(
  project: string,
  diskPaths: string[][],
  dirNameToPrefix: Record<string, string>,
  siteJson: { composablePages?: Record<string, Array<Record<string, string>>> },
): PageRef[] {
  const siteSegments = project.split('/');
  const dirName = siteSegments[0]!;
  const rawPrefix = dirNameToPrefix[dirName];
  if (!rawPrefix) throw new Error(`No dir-name-to-prefix entry for "${dirName}"`);
  const versionSegments = siteSegments.slice(1);
  const basePath = `/${rawPrefix}`;
  const refs: PageRef[] = [];
  for (const disk of diskPaths) {
    // disk is root-relative and starts with the site path; rel is site-relative.
    const rel = disk.slice(siteSegments.length).join('/');
    const urlPath = [basePath, ...versionSegments, rel].filter(Boolean).join('/').toLowerCase();
    const mdxPath = disk.join('/') + '.mdx';
    const variants = siteJson.composablePages?.[rel];
    if (variants?.length) {
      // Composable pages exist only in their variants, so no query-less ref is emitted.
      for (const v of variants) {
        const query = Object.entries(v).map(([k, val]) => `${k}=${val}`).join('&');
        refs.push({ slug: slugFor(urlPath, query), urlPath, mdxPath, query });
      }
    } else {
      refs.push({ slug: rel.replace(/\//g, '__') || 'index', urlPath, mdxPath });
    }
  }
  return refs;
}
