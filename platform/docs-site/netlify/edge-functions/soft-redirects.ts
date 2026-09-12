// Runs on Netlify's Deno edge runtime (excluded from the app tsconfig). Deno
// needs the JSON assertion, and path-to-regexp is imported from a CDN: the edge
// bundler resolves neither a bare name (pnpm's node_modules) nor an npm: specifier,
// so a plain HTTPS module is the reliable option. Keep pinned to package.json's version.
import type { Config, Context } from '@netlify/edge-functions';
import { match, compile, type MatchFunction } from 'https://esm.sh/path-to-regexp@6.3.0';
import allRedirects from '../../src/redirects/all-redirects.json' with { type: 'json' };
import { hasUppercase, lowercaseRedirectPath } from '../../src/redirects/case-canonical.ts';

/**
 * Applies soft (non-force) redirects on the static site, which has no
 * request-time server. On a would-be 404, matches the soft redirect table and
 * redirects; otherwise passes the response through. Force redirects go through
 * next.config.mjs. Matching is a port of redirect-utils.ts / soft-redirects.ts
 * (which can't be imported here) — keep in sync.
 *
 * Also 301s mixed-case page URLs to lowercase *before* calling origin, so the
 * redirect does not depend on whether the mixed-case path 404s. Page MDX is
 * emitted lowercase; leftover mixed-case requests (old links, TOC, cached
 * Google URLs) 301 there. Authored soft redirects on mixed-case sources still
 * take precedence; a slash-only fix never consults the redirect table.
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

function redirectTo(destination: string, statusCode: number): Response {
  return new Response(null, {
    status: statusCode,
    headers: { Location: destination },
  });
}

export default async function handler(request: Request, context: Context): Promise<Response> {
  const { pathname, search } = new URL(request.url);

  // Mixed-case (and missing-slash) page URLs 301 to the public form before
  // origin. Waiting on context.next() misses the cases we care about: a
  // case-insensitive FS (local) 200s the mixed-case path, and some hosts
  // serve the static 404 page as 200.
  const lowerPath = lowercaseRedirectPath(pathname);
  if (lowerPath) {
    // Authored soft redirects on mixed-case sources still win — but only for
    // paths that are actually mixed-case. findSoftRedirect adds the trailing
    // slash itself before matching, so consulting the table for a merely
    // slashless path answers live pages out of the redirect table:
    // `/docs/:version/release-notes/:path*` -> `/docs/manual/release-notes`
    // 301s that page to itself. Normalize the slash first and let the
    // reissued request reach origin.
    if (hasUppercase(pathname)) {
      const softMatch = findSoftRedirect(pathname);
      if (softMatch) {
        return redirectTo(softMatch.destination, softMatch.statusCode);
      }
    }
    return redirectTo(`${lowerPath}${search}`, 301);
  }

  const res = await context.next();
  if (res.status !== 404) {
    return res;
  }

  // Authored soft redirects (Netlify force=false: 404 only).
  const softMatch = findSoftRedirect(pathname);
  if (softMatch) {
    return redirectTo(softMatch.destination, softMatch.statusCode);
  }

  return res;
}

export const config: Config = {
  path: '/docs/*',
};
