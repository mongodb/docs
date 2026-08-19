// Runs on Netlify's Deno edge runtime (excluded from the app tsconfig). Deno
// needs the JSON assertion, and path-to-regexp is imported from a CDN: the edge
// bundler resolves neither a bare name (pnpm's node_modules) nor an npm: specifier,
// so a plain HTTPS module is the reliable option. Keep pinned to package.json's version.
import type { Config, Context } from '@netlify/edge-functions';
import { match, compile, type MatchFunction } from 'https://esm.sh/path-to-regexp@6.3.0';
import allRedirects from '../../src/redirects/all-redirects.json' with { type: 'json' };
import {
  sitemapLocsToCanonicalPaths,
  buildCaseMap,
  canonicalizeCasing,
} from '../../src/redirects/case-canonical.ts';

/**
 * Applies soft (non-force) redirects on the static site, which has no
 * request-time server. On a would-be 404, matches the soft redirect table and
 * redirects; otherwise passes the response through. Force redirects go through
 * next.config.mjs. Matching is a port of redirect-utils.ts / soft-redirects.ts
 * (which can't be imported here) — keep in sync.
 */
interface RedirectEntry {
  source: string;
  destination: string;
  statusCode: number;
  force?: boolean;
}

interface CompiledRedirect {
  match: MatchFunction<Record<string, string>>;
  destination: string;
  statusCode: number;
}

const ABSOLUTE_URL_RE = /^https?:\/\//;

function resolveDestination(destination: string, params: Record<string, string>): string {
  if (ABSOLUTE_URL_RE.test(destination)) {
    return destination;
  }
  // Split off any ?/# suffix (path-to-regexp v6 would choke on it), compile the
  // path, then re-append the suffix.
  const suffixIndex = destination.search(/[?#]/);
  const pathPart = suffixIndex === -1 ? destination : destination.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : destination.slice(suffixIndex);
  const toPath = compile(pathPart, { encode: encodeURIComponent });
  return toPath(params) + suffix;
}

const softRedirects: CompiledRedirect[] = [];
for (const entry of allRedirects as RedirectEntry[]) {
  if (entry.force === true) {
    continue;
  }
  try {
    softRedirects.push({
      match: match(entry.source, { decode: decodeURIComponent }),
      destination: entry.destination,
      statusCode: entry.statusCode,
    });
  } catch (err) {
    // path-to-regexp only accepts path patterns. Sources with query/hash
    // (e.g. from Netlify toml) throw at compile time — skip so one bad
    // entry cannot prevent the edge function from loading.
    console.warn(
      `[soft-redirects] Skipping redirect that failed to compile: ${entry.source} -> ${entry.destination}`,
      err,
    );
  }
}

function findSoftRedirect(urlPath: string): { destination: string; statusCode: number } | null {
  const normalized = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  for (const entry of softRedirects) {
    const result = entry.match(normalized);
    if (result) {
      return {
        destination: resolveDestination(entry.destination, result.params),
        statusCode: entry.statusCode,
      };
    }
  }
  return null;
}

// --- Case canonicalization (mixed-case URL 404s) ------------------------------
// Both docs routes set `dynamicParams = false`, so a mis-cased URL 404s at the
// routing layer. Many pages are legitimately mixed-case (e.g. .../changeStreams/,
// atlas-cli / manual command reference), so we canonicalize rather than force
// lowercase. The valid, canonically-cased page set already ships as the deployed
// sitemap; read it here (only on a 404) instead of generating a bespoke index.

// Per sitemap URL: an in-flight/resolved promise of the lowercased -> canonical
// path map, or null when absent. Cached across invocations on a warm edge
// instance. Caching the promise (not the resolved value) means a concurrent or
// re-entrant probe for the same sitemap joins the pending fetch instead of
// starting its own — the cache entry is set synchronously, before the fetch
// awaits, so it is visible during that await.
const sitemapCaseMapCache = new Map<string, Promise<Map<string, string> | null>>();

function fetchSitemapCaseMap(sitemapUrl: string): Promise<Map<string, string> | null> {
  const cached = sitemapCaseMapCache.get(sitemapUrl);
  if (cached !== undefined) return cached;
  const pending = (async () => {
    try {
      const res = await fetch(sitemapUrl);
      if (res.ok) {
        const map = buildCaseMap(sitemapLocsToCanonicalPaths(await res.text()));
        return map.size > 0 ? map : null;
      }
    } catch {
      // fall through to null
    }
    return null;
  })();
  sitemapCaseMapCache.set(sitemapUrl, pending);
  return pending;
}

/**
 * Resolve a would-be-404 page path to its canonical casing, or null. Probes each
 * ancestor directory of `pagePath` for a `sitemap-0.xml` (build-content-metadata
 * emits one per docset version, e.g. /docs/<prefix>/<version>/sitemap-0.xml),
 * deepest first, and looks the path up in the first sitemap that contains it.
 */
async function findCanonicalCasing(pagePath: string, origin: string): Promise<string | null> {
  const segments = pagePath.replace(/\/+$/, '').split('/').filter(Boolean);
  for (let i = segments.length - 1; i >= 1; i--) {
    const dir = `/${segments.slice(0, i).join('/')}`;
    const caseMap = await fetchSitemapCaseMap(`${origin}${dir}/sitemap-0.xml`);
    // The first (deepest) sitemap found is the authoritative one for this docset
    // version and lists all of its pages, so its verdict is final: either it
    // yields a canonical casing, or the path is a genuine 404.
    if (caseMap) return canonicalizeCasing(pagePath, caseMap);
  }
  return null;
}

export default async function handler(request: Request, context: Context): Promise<Response> {
  const res = await context.next();

  // Only 404s are redirect candidates (Netlify force=false semantics).
  if (res.status !== 404) {
    return res;
  }

  const { pathname, origin, search } = new URL(request.url);

  // Authored soft redirects take precedence over casing fallback.
  const match = findSoftRedirect(pathname);
  if (match) {
    // Honor the JSON statusCode (301/302).
    return new Response(null, {
      status: match.statusCode,
      headers: { Location: match.destination },
    });
  }

  // Bail out before the casing fallback for non-page requests. The fallback
  // fetches sitemap `.xml` files, and this function's matcher (`/docs/*`) has no
  // excludedPath, so those same-origin fetches re-enter the handler. Without
  // this guard a 404 sitemap probe would itself reach findCanonicalCasing and
  // re-request the identical URL, recursing until the platform's subrequest
  // limit or loop detection trips.
  if (pathname.endsWith('.xml')) {
    return res;
  }

  // Casing fallback: a mixed-case page requested with the wrong casing (or an
  // all-lowercase page requested with stray uppercase) 404s under
  // `dynamicParams = false`. Redirect to the sitemap's canonical casing.
  const isMarkdown = pathname.endsWith('.md');
  const pagePath = isMarkdown ? pathname.slice(0, -'.md'.length) : pathname;
  const canonical = await findCanonicalCasing(pagePath, origin);
  if (canonical) {
    const basePath = isMarkdown ? `${canonical.replace(/\/$/, '')}.md` : canonical;
    // Preserve the query string (e.g. composable-tutorial `?tabs=`) so the
    // reader lands on the same tab/state rather than the page default.
    const location = `${basePath}${search}`;
    return new Response(null, { status: 301, headers: { Location: location } });
  }

  return res;
}

export const config: Config = {
  path: '/docs/*',
};
