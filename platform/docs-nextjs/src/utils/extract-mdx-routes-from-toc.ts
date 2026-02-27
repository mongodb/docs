import type { TocItem } from '@/components/unified-sidenav/types';

export function getStaticVersion(): string {
  return process.env.STATIC_BUILD_VERSION || 'current';
}

// Convert TOC URL to path array (same shape as content-mdx).
// e.g. /docs/foo/:version/install → [foo, ':version', install].
function urlToPathArray(url: string): string[] | null {
  let urlPath = url.split('?')[0];
  if (urlPath.startsWith('/docs')) urlPath = urlPath.slice(6);
  else if (urlPath.startsWith('/')) urlPath = urlPath.slice(1);
  const pathArray = urlPath.split('/').filter((s) => s.length > 0);
  return pathArray.length === 0 ? null : pathArray;
}

// Get all path arrays from TOC items, for static build.
export function getPathArraysFromTocItems(items: TocItem[]): Array<{ path: string[] }> {
  const paths: Array<{ path: string[] }> = [];
  for (const item of items) {
    if (item.isExternal) continue;
    if (item.url && !item.url.startsWith('http')) {
      const pathArray = urlToPathArray(item.url);
      if (pathArray && pathArray.length > 0) paths.push({ path: pathArray });
    }
    if (item.items?.length) {
      paths.push(...getPathArraysFromTocItems(item.items));
    }
  }
  const unique = Array.from(new Set(paths.map((p) => JSON.stringify(p.path)))).map((s) => ({
    path: JSON.parse(s) as string[],
  }));
  return unique.sort((a, b) => {
    if (a.path.length !== b.path.length) return a.path.length - b.path.length;
    return JSON.stringify(a.path).localeCompare(JSON.stringify(b.path));
  });
}
