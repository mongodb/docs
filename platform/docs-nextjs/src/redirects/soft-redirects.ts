/**
 * Matches redirects when the requested page does not exist (MDX fetch returns
 * null). Since this only executes on would-be 404s, all non-force redirects are
 * checked here — replicating Netlify's default force=false behavior.
 */
import { type RedirectEntry, compileRedirects, findMatchingRedirect } from './redirect-utils';
import atlasRedirects from './atlas-redirects.json';
import appServicesRedirects from './app-services-redirects.json';
import atlasArchitectureRedirects from './atlas-architecture-redirects.json';
import atlasCliRedirects from './atlas-cli-redirects.json';
import atlasGovernmentRedirects from './atlas-government-redirects.json';
import atlasOperatorRedirects from './atlas-operator-redirects.json';
import realmRedirects from './realm-redirects.json';
import nodeRedirects from './node-redirects.json';

const allRedirects = [...atlasRedirects, ...appServicesRedirects, ...atlasArchitectureRedirects, ...atlasCliRedirects, ...atlasGovernmentRedirects, ...atlasOperatorRedirects, ...realmRedirects, ...nodeRedirects,] as RedirectEntry[];
const softRedirects = compileRedirects(allRedirects.filter((r) => r.force !== true));

/**
 * Given a URL path (with leading /docs prefix), find a matching redirect.
 * Only called when no page exists at the path, so all non-force redirects apply.
 */
export function findSoftRedirect(urlPath: string): { destination: string; statusCode: number } | null {
  const normalizedPath = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  return findMatchingRedirect(normalizedPath, softRedirects);
}
