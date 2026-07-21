// Runs on Netlify's Deno edge runtime (excluded from the app tsconfig). Deno
// needs the JSON assertion, and path-to-regexp is imported from a CDN: the edge
// bundler resolves neither a bare name (pnpm's node_modules) nor an npm: specifier,
// so a plain HTTPS module is the reliable option. Keep pinned to package.json's version.
import type { Config, Context } from '@netlify/edge-functions';
import { match, compile, type MatchFunction } from 'https://esm.sh/path-to-regexp@6.3.0';
import allRedirects from '../../src/redirects/all-redirects.json' with { type: 'json' };

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

const softRedirects: CompiledRedirect[] = (allRedirects as RedirectEntry[])
  .filter((r) => r.force !== true)
  .map((entry) => ({
    match: match(entry.source, { decode: decodeURIComponent }),
    destination: entry.destination,
    statusCode: entry.statusCode,
  }));

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

export default async function handler(request: Request, context: Context): Promise<Response> {
  const res = await context.next();

  // Only 404s are redirect candidates (Netlify force=false semantics).
  if (res.status !== 404) {
    return res;
  }

  const { pathname } = new URL(request.url);
  const match = findSoftRedirect(pathname);
  if (!match) {
    return res;
  }

  // Honor the JSON statusCode (301/302).
  return new Response(null, {
    status: match.statusCode,
    headers: { Location: match.destination },
  });
}

export const config: Config = {
  path: '/docs/*',
};
