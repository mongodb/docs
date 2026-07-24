/**
 * Matches redirects when the requested page does not exist (MDX fetch returns
 * null). Since this only executes on would-be 404s, all non-force redirects are
 * checked here — replicating Netlify's default force=false behavior.
 */
import { compileRedirects, findMatchingRedirect } from './redirect-utils';
import { allRedirects } from './all-redirects';

const softRedirects = compileRedirects(allRedirects.filter((r) => r.force !== true));

/**
 * Given a URL path (with leading /docs prefix), find a matching redirect.
 * Only called when no page exists at the path, so all non-force redirects apply.
 */
export function findSoftRedirect(urlPath: string): { destination: string; statusCode: number } | null {
  const normalizedPath = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  return findMatchingRedirect(normalizedPath, softRedirects);
}
