import type { RemoteMetadata } from '@/types/data';
import { getBlobString } from './blob-read';
import { getBlobKey } from './get-blob-key';
import projectPrefixPaths from '@/generated/prefix-map.json';

/**
 * Find _site.json in the blob store by matching the URL path against
 * known project paths from prefix-map.json (pre-sorted longest-first).
 *
 *
 * projectPath is the blob key/ docset prefix for the current URL
 * (e.g. atlas, django-mongodb/current, or a longer path like languages/java/.../upcoming
 *
 *
 * usage:
 * - projectPrefixPaths: ["atlas", "upcoming", "languages/java/reactive-streams-driver/upcoming",...]
 *
 * urlPath: ["atlas", "v1", "api", "docs"], return: { prefixPath: "atlas", siteMetadata: RemoteMetadata }
 * urlPath: ["languages", "java", "reactive-streams-driver", "upcoming", "get-started"], return: { prefixPath: "languages/java/reactive-streams-driver/upcoming", siteMetadata: RemoteMetadata }
 */

export async function getSiteMetadata(
  urlPath: string[],
): Promise<{ projectPath: string; siteMetadata: RemoteMetadata }> {
  if (urlPath.length === 0) {
    throw new Error('urlPath must have at least one segment');
  }

  for (const projectPath of projectPrefixPaths) {
    const segments = projectPath.split('/');
    if (urlPath.length < segments.length) continue;
    if (!segments.every((seg: string, i: number) => seg === urlPath[i])) continue;

    const key = getBlobKey(`${projectPath}/_site.json`);
    try {
      const siteMetadataString = await getBlobString(key);
      if (siteMetadataString) {
        const siteMetadata: RemoteMetadata = JSON.parse(siteMetadataString);
        return { projectPath, siteMetadata };
      }
    } catch {
      // JSON.parse can throw for invalid JSON; try next candidate, don't actually throw or log anything
    }
  }

  // No prefix matched — fall back to landing project
  const landingKey = getBlobKey('_site.json');
  try {
    const siteMetadataString = await getBlobString(landingKey);
    if (siteMetadataString) {
      const siteMetadata: RemoteMetadata = JSON.parse(siteMetadataString);
      return { projectPath: 'landing', siteMetadata };
    }
  } catch {
    // JSON.parse can throw for invalid JSON; try next candidate, don't actually throw or log anything
  }

  throw new Error(
    `Could not load site metadata: no project path in prefix-map matched URL path [${urlPath.join(
      '/',
    )}], and landing fallback failed`,
  );
}
