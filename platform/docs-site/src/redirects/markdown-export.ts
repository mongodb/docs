/**
 * Returns the extensionless page path that middleware can negotiate to
 * markdown when Netlify receives an explicit `.md` request that prefers
 * markdown. Other `.md` requests keep using the static CDN rewrite.
 */
export function markdownExportRewritePath(pathname: string, wantsMarkdown: boolean): string | null {
  if (!wantsMarkdown) {
    return null;
  }

  if (pathname.endsWith('/index.md/')) {
    return pathname.slice(0, -'index.md/'.length);
  }

  if (pathname.endsWith('.md/')) {
    return `${pathname.slice(0, -'.md/'.length)}/`;
  }

  if (!pathname.endsWith('.md')) {
    return null;
  }

  if (pathname.endsWith('/index.md')) {
    return pathname.slice(0, -'index.md'.length);
  }

  return `${pathname.slice(0, -'.md'.length)}/`;
}

/**
 * Maps a markdown export request back to its public page path. Netlify hands
 * the edge function the URL that middleware rewrote to, which redirect sources
 * never match.
 */
export function publicDocsPath(pathname: string): string {
  const withoutExportRoute = pathname.replace('/api/markdown-tabs/', '/').replace('/api/markdown/', '/');

  if (withoutExportRoute.endsWith('/index.md/')) {
    return withoutExportRoute.slice(0, -'index.md/'.length);
  }

  if (withoutExportRoute.endsWith('/index.md')) {
    return withoutExportRoute.slice(0, -'index.md'.length);
  }

  if (withoutExportRoute.endsWith('.md/')) {
    return `${withoutExportRoute.slice(0, -'.md/'.length)}/`;
  }

  if (withoutExportRoute.endsWith('.md')) {
    return `${withoutExportRoute.slice(0, -'.md'.length)}/`;
  }

  return withoutExportRoute;
}
