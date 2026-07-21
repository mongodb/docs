import type { RemoteMetadata } from '@/types/data';
import { getContentString } from './get-content-string';

async function readSiteJsonFromFilesystem(projectPath: string): Promise<RemoteMetadata | null> {
  try {
    const str = await getContentString(`${projectPath}/_site.json`);
    if (str) return JSON.parse(str);
  } catch {
    // JSON.parse can throw for invalid JSON; try next path candidate
  }
  return null;
}

/**
 * Find _site.json by trying 2-segment then 1-segment project paths from the filesystem.
 * Used by the SSG offline build path.
 *
 * Versioned projects (e.g. django-mongodb/current) have _site.json at 2 segments,
 * non-versioned (e.g. atlas) have it at 1 segment.
 */
export async function findProjectPathAndSiteJson(
  urlPath: string[],
): Promise<{ projectPath: string; siteMetadata: RemoteMetadata }> {
  if (urlPath.length === 0) {
    throw new Error('[findProjectPathAndSiteJson] urlPath must have at least one segment');
  }

  const candidates = [urlPath.length >= 2 ? urlPath.slice(0, 2).join('/') : null, urlPath.slice(0, 1).join('/')].filter(
    (p): p is string => p !== null && p.length > 0,
  );
  const unique = [...new Set(candidates)];

  for (const projectPath of unique) {
    const siteMetadata = await readSiteJsonFromFilesystem(projectPath);
    if (siteMetadata) return { projectPath, siteMetadata };
  }
  throw new Error(
    `[findProjectPathAndSiteJson] blob not found or contains invalid JSON for [${urlPath.join('/')}]`,
  );
}
