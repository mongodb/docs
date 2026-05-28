// NOTE: we're currently uing v6 of path-to-regexp, which is a few versions behind,
// however this choice was made because v7+ changes the wildcard syntax (*before instead of *after)
import { match, compile, type MatchFunction } from 'path-to-regexp';

export interface RedirectEntry {
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

export function compileRedirects(redirects: RedirectEntry[]): CompiledRedirect[] {
  return redirects.map((entry) => ({
    match: match(entry.source, { decode: decodeURIComponent }),
    destination: entry.destination,
    statusCode: entry.statusCode,
  }));
}

/**
 * Find the first matching redirect for a URL path.
 * Returns the resolved destination and status code, or null if no match.
 */
export function findMatchingRedirect(
  urlPath: string,
  compiled: CompiledRedirect[],
): { destination: string; statusCode: number } | null {
  for (const entry of compiled) {
    const result = entry.match(urlPath);
    if (result) {
      const destination = resolveDestination(entry.destination, result.params);
      return { destination, statusCode: entry.statusCode };
    }
  }
  return null;
}

const ABSOLUTE_URL_RE = /^https?:\/\//;

function resolveDestination(
  destination: string,
  params: Record<string, string>,
): string {
  if (ABSOLUTE_URL_RE.test(destination)) {
    return destination;
  }
  const toPath = compile(destination, { encode: encodeURIComponent });
  return toPath(params);
}
