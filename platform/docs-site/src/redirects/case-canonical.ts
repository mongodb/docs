/**
 * Case-insensitive URL canonicalization, sourced from the sitemap.
 *
 * The docs routes set `dynamicParams = false`, so a request whose casing does not
 * exactly match a real page 404s at the routing layer. Many pages have
 * legitimately mixed-case URLs (e.g. `.../changeStreams/`, atlas-cli / manual
 * command reference), so we cannot force lowercase — we canonicalize instead.
 *
 * Rather than generate a dedicated path index at build time, the post-404
 * Netlify edge function (netlify/edge-functions/soft-redirects.ts) reads the
 * already-deployed `sitemap-0.xml` and reuses the helpers below. This module has
 * NO imports so it is safe to import from both jest and the Deno edge runtime.
 *
 * Coverage note: the sitemap is built from each `_site.json`'s `toctreeOrder`, so
 * a handful of orphan pages that are not part of any toctree are not covered.
 */

/**
 * Extract page pathnames from a sitemap's `<loc>` entries as canonical
 * (case-preserving) pathnames, each ending in a trailing slash. The origin and
 * any query string (composable-tutorial `?tabs=` variants) are dropped so only
 * the base path remains.
 */
export function sitemapLocsToCanonicalPaths(sitemapXml: string): string[] {
  const paths: string[] = [];
  const locRe = /<loc>([^<]+)<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = locRe.exec(sitemapXml)) !== null) {
    const loc = m[1].trim().replace(/&amp;/g, '&');
    let pathname: string;
    try {
      pathname = new URL(loc).pathname;
    } catch {
      // Not an absolute URL — treat the value as a path, dropping any query/hash.
      pathname = loc.split(/[?#]/)[0];
    }
    if (!pathname) continue;
    paths.push(pathname.endsWith('/') ? pathname : `${pathname}/`);
  }
  return paths;
}

/**
 * Build a `lowercased-pathname -> canonical-pathname` lookup. Distinct pages that
 * differ only by case would be ambiguous; none exist in the corpus, and if one
 * ever appears the first-seen canonical wins (deterministic by sitemap order).
 */
export function buildCaseMap(canonicalPaths: string[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const p of canonicalPaths) {
    const key = p.toLowerCase();
    if (!map.has(key)) map.set(key, p);
  }
  return map;
}

/**
 * If `pathname` resolves case-insensitively to a canonical page whose casing
 * differs, return that canonical pathname (trailing slash preserved); otherwise
 * null (already canonical, or unknown page). `pathname` should be the page path
 * (no `.md` suffix, no query/hash).
 */
export function canonicalizeCasing(pathname: string, caseMap: Map<string, string>): string | null {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const canonical = caseMap.get(normalized.toLowerCase());
  return canonical && canonical !== normalized ? canonical : null;
}
