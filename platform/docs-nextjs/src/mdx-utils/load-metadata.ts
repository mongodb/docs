import { cache } from './react-cache';
import type { RemoteMetadata } from '@/types/data';
import { getBlobString } from './blob-read';
import { getBlobKey } from './get-blob-key';
import projectPrefixPaths from '@/generated/prefix-map.json';

/**
 * Find _site.json in the blob store by matching the URL path against
 * known project paths from prefix-map.json (pre-sorted longest-first).
 *
 *
 * projectPath is the blob key/ project's docset prefix for the current URL
 * (e.g. atlas, django-mongodb/current, or a longer path like languages/java/.../upcoming
 *
 *
 * usage:
 * - projectPrefixPaths: ["atlas", "upcoming", "languages/java/reactive-streams-driver/upcoming",...]
 *
 * urlPath: ["atlas", "getting-started"], return: { prefixPath: "atlas", siteMetadata: RemoteMetadata }
 * urlPath: ["languages", "java", "reactive-streams-driver", "upcoming", "get-started"], return: { prefixPath: "languages/java/reactive-streams-driver/upcoming", siteMetadata: RemoteMetadata }
 */

const getSiteMetadataCached = cache(
  async (pathKey: string): Promise<{ projectPath: string; siteMetadata: RemoteMetadata }> => {
    const urlPath = pathKey.split('/');

    // pure prefix matching — no I/O, falls back to '' (landing) when no prefix matches.
    const projectPath =
      projectPrefixPaths.find((prefix) => {
        const segments = prefix.split('/');
        return urlPath.length >= segments.length && segments.every((seg: string, i: number) => seg === urlPath[i]);
      }) ?? '';

    // Single fetch: picks the best matching prefix and makes one request. If that blob
    // is missing or contains invalid JSON, an error is thrown — no other prefixes are tried.
    const key = getBlobKey(projectPath ? `${projectPath}/_site.json` : '_site.json');
    try {
      const siteMetadataString = await getBlobString(key);
      if (siteMetadataString) {
        const siteMetadata: RemoteMetadata = JSON.parse(siteMetadataString);
        return { projectPath, siteMetadata };
      }
    } catch (err) {
      if (!(err instanceof SyntaxError)) {
        throw new Error(
          `[getSiteMetadata] Unexpected error reading blob for "${projectPath || 'landing'}": ${err instanceof Error ? err.message : String(err)
          }`,
        );
      }
      // SyntaxError = invalid JSON; fall through to the error below
    }

    throw new Error(
      `[getSiteMetadata] Could not load site metadata for [${urlPath.join('/')}]: ` +
      `blob not found or contains invalid JSON (key: ${key})`,
    );
  },
);

export async function getSiteMetadata(
  urlPath: string[],
): Promise<{ projectPath: string; siteMetadata: RemoteMetadata }> {
  if (urlPath.length === 0) {
    throw new Error('urlPath must have at least one segment');
  }
  return getSiteMetadataCached(urlPath.join('/'));
}
