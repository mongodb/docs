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

const DOCS_ORIGIN_RE = /^https:\/\/(?:www\.)?mongodb\.com(?=\/docs\/)/;

/**
 * Lands a redirect for an explicit `.md` request (soft or force) on the
 * destination's `.md` export. Leaves non-`.md` requests and external URLs
 * unchanged.
 */
export function markdownRedirectDestination(requestPath: string, destination: string): string {
  if (!requestPath.endsWith('.md') && !requestPath.endsWith('.md/')) {
    return destination;
  }

  // External destinations (GitHub, non-docs mongodb.com pages) have no `.md`
  // export. Absolute `https://(www.)mongodb.com/docs/` URLs are docs pages and
  // still convert; the bare host 301s to `www` with the path intact.
  const origin = DOCS_ORIGIN_RE.exec(destination)?.[0] ?? '';
  if (/^https?:\/\//.test(destination) && !origin) {
    return destination;
  }

  const rest = destination.slice(origin.length);
  const suffixIndex = rest.search(/[?#]/);
  const path = suffixIndex === -1 ? rest : rest.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : rest.slice(suffixIndex);
  return `${origin}${path.replace(/\/$/, '')}.md${suffix}`;
}

/**
 * `.md` copies of force redirects for next.config.mjs. Their HTML sources end
 * in `/`, which a `.md` URL never matches, and Netlify serves `.md` GETs
 * without running middleware, so the copies have to be redirect rules. `{/}?`
 * also matches `.md/`, which soft redirects accept too.
 */
export function markdownForceRedirects<T extends { source: string; destination: string }>(redirects: T[]): T[] {
  return redirects.map((redirect) => {
    const markdownPath = `${redirect.source.replace(/\/$/, '')}.md`;
    return {
      ...redirect,
      source: `${markdownPath}{/}?`,
      destination: markdownRedirectDestination(markdownPath, redirect.destination),
    };
  });
}
