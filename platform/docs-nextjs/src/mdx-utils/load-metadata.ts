import type { RemoteMetadata, SiteMetadata } from '@/types/data';
import { getBlobString } from './blob-read';
import { getBlobKey } from './get-blob-key';

/**
 * TODO: Replace with explicit version data once repos_branches data is available.
 *
 * Find _site.json in the blob store by trying 2-segment then 1-segment project paths.
 * Versioned projects (e.g. django-mongodb/current) have _site.json at 2 segments
 * non-versioned (e.g. atlas) have it at 1 segment
 * Returns both the project path and raw JSON string of site metadata.
 */
export async function findProjectPathAndSiteJson(
  urlPath: string[],
): Promise<{ projectPath: string; siteMetadata: RemoteMetadata }> {
  if (urlPath.length === 0) {
    throw new Error('urlPath must have at least one segment');
  }
  const candidates = [urlPath.length >= 2 ? urlPath.slice(0, 2).join('/') : null, urlPath.slice(0, 1).join('/')].filter(
    (p): p is string => p !== null && p.length > 0,
  );
  const unique = [...new Set(candidates)];

  for (const projectPath of unique) {
    const key = getBlobKey(`${projectPath}/_site.json`);
    let siteMetadata: RemoteMetadata | null = null;
    try {
      const siteMetadataString = await getBlobString(key);
      if (siteMetadataString) siteMetadata = await JSON.parse(siteMetadataString);
    } catch {
      // JSON.parse can throw for invalid JSON; try next path candidate
    }
    if (siteMetadata) return { projectPath, siteMetadata };
  }
  throw new Error('Could not load site metadata from blob store: _site.json not found at project path');
}
