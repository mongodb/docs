import type { RemoteMetadata } from '@/types/data';
import { getBlobString } from './blob-read';
import { getBlobKey } from './get-blob-key';

/** Load site metadata from blob store */
export const loadMetadata = async (urlPath: string[]): Promise<RemoteMetadata> => {
  // get the project path from the url, which should be the first two segments: project name and version
  // TODO: update this to determine whether or not a versioned project based on "repos_branches"
  const projectPath = urlPath.slice(0, 2).join('/');
  const relativePath = `${projectPath}/_site.json`;
  const fullPath = getBlobKey(relativePath);

  const siteMetadata = await getBlobString(fullPath);
  if (!siteMetadata) {
    throw new Error('Errored while loading site metadata from Netlify blob store');
  }
  const parsedSiteMetadata = JSON.parse(siteMetadata);

  return parsedSiteMetadata;
};
