import { findProjectPathAndSiteJson } from './load-metadata';
import { loadDirNameToPrefixMap, blobRelativeToDiskCandidates } from './blob-path-remap';

export async function loadSiteMetadata(urlPath: string[]) {
  const prefixMap = await loadDirNameToPrefixMap();
  const candidates = blobRelativeToDiskCandidates(urlPath.join('/'), prefixMap);
  for (const candidate of candidates) {
    const parts = candidate.split('/');
    try {
      return await findProjectPathAndSiteJson(parts);
    } catch {
      // try next candidate
    }
  }
  throw new Error(`[loadSiteMetadata] no _site.json found for urlPath=${urlPath.join('/')}`);
}
