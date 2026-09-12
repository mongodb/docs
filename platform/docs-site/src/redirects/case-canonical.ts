/**
 * Lowercase public-URL canonicalization.
 *
 * Page MDX is emitted at a lowercase path (snooty-ast-to-mdx). Mixed-case
 * leftovers 301 to that URL from Next.js middleware (`src/middleware.ts`,
 * including `next dev`) and from the Netlify edge function
 * (`netlify/edge-functions/soft-redirects.ts`).
 *
 * HTML pages always use a trailing slash, including slugs with dots
 * (`db.collection.findOneAndUpdate`). Next.js would otherwise 308 those to
 * the slashless "file" form; `skipTrailingSlashRedirect` in next.config.mjs
 * turns that off so this module is the only slash policy.
 *
 * This module has NO imports so it is safe to import from both jest and the
 * Deno edge runtime.
 */

function withTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function lastSegment(pathname: string): string {
  return pathname.split('/').filter(Boolean).pop() ?? '';
}

/**
 * File extensions that are static assets, not docs pages. Pages may contain
 * dots in a slug (e.g. `db.collection.findOneAndUpdate`), so "has a dot" is
 * not enough to skip the lowercase 301.
 */
const ASSET_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
  '.avif',
  '.xml',
  '.json',
  '.inv',
  '.txt',
  '.js',
  '.mjs',
  '.cjs',
  '.css',
  '.map',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
  '.gz',
  '.tar',
  '.zip',
  '.tgz',
  '.pdf',
]);

/**
 * True for HTML docs pages (including slugs with dots) and `.md` exports.
 * False for static assets so mixed-case files such as images are not 301'd.
 */
export function isPageLikePath(pathname: string): boolean {
  if (pathname.toLowerCase().endsWith('.md')) return true;
  const last = lastSegment(pathname);
  const dot = last.lastIndexOf('.');
  if (dot === -1) return true;
  return !ASSET_EXTENSIONS.has(last.slice(dot).toLowerCase());
}

/**
 * Lowercase public URL path: trailing slash for HTML pages, `.md` suffix kept.
 */
export function toLowercasePublicPath(pathname: string): string {
  const isMarkdown = pathname.toLowerCase().endsWith('.md');
  const pagePath = isMarkdown ? pathname.slice(0, -'.md'.length) : pathname;
  const lower = pagePath.toLowerCase();
  if (isMarkdown) return `${lower.replace(/\/$/, '')}.md`;
  return withTrailingSlash(lower);
}

/** True when `pathname` has any uppercase character. */
export function hasUppercase(pathname: string): boolean {
  return pathname !== pathname.toLowerCase();
}

/**
 * If `pathname` is a page-like URL whose public form differs, return the
 * lowercase path (trailing slash for HTML, `.md` kept). Otherwise null.
 */
export function lowercaseRedirectPath(pathname: string): string | null {
  if (!isPageLikePath(pathname)) return null;
  const lower = toLowercasePublicPath(pathname);
  return lower !== pathname ? lower : null;
}

/**
 * Apply {@link toLowercasePublicPath} to an absolute URL's pathname. Relative
 * paths fall through to {@link toLowercasePublicPath}.
 */
export function toLowercaseCanonicalUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.pathname = toLowercasePublicPath(parsed.pathname);
    return parsed.toString();
  } catch {
    return toLowercasePublicPath(url);
  }
}

/** Lowercase the path portion of an href, leaving any `?query` / `#hash` alone. */
function lowercaseHrefPath(href: string): string {
  const suffix = href.search(/[?#]/);
  return suffix === -1 ? href.toLowerCase() : href.slice(0, suffix).toLowerCase() + href.slice(suffix);
}

function isMongoDbDocsUrl(url: URL): boolean {
  const host = url.hostname.toLowerCase();
  return (host === 'mongodb.com' || host.endsWith('.mongodb.com')) && url.pathname.startsWith('/docs/');
}

/**
 * Lowercase a docs href for ToC output. Keeps query string and hash; does not
 * add a trailing slash (ToC sources often omit it). Absolute URLs are only
 * rewritten when they point at mongodb.com docs — GitHub, the community
 * forums, and other hosts stay as authored.
 *
 * The table-of-contents package has a copy (`lowercaseTocHref`) because it
 * cannot import this module.
 */
export function lowercaseDocsHref(href: string): string {
  if (!href) return href;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(href)) return lowercaseHrefPath(href);
  try {
    const url = new URL(href);
    if (!isMongoDbDocsUrl(url)) return href;
    url.pathname = url.pathname.toLowerCase();
    return url.toString();
  } catch {
    return href;
  }
}
