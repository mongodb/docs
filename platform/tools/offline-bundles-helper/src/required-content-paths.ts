import { getProjectNameFromFilename } from './toc-filename.js';
import type { AllContentData } from './types.js';

/**
 * Determines the `docsPaths` content path keys required for a single offline bundle
 * (its own versioned project, plus any cross-referenced contentSites).
 *
 * There is only one versioned project per offline TOC file — the one named in the
 * filename (e.g. `docs` in `development.versioned.docs.ts`) — and it needs exactly the
 * versions in `buildVersions`. Every other contentSite referenced in the file is a
 * non-versioned project, so any single active `docsPaths` entry for it satisfies the need.
 */
export const getRequiredContentPathsForBundle = (
  filename: string,
  buildVersions: string[],
  contentSites: Set<string>,
  allContentData: AllContentData,
): Set<string> => {
  const ownProjectName = getProjectNameFromFilename(filename);
  const required = new Set<string>();

  for (const [contentPath, entry] of Object.entries(allContentData.docsPaths)) {
    if (!entry.active || !contentSites.has(entry.projectName)) continue;

    if (entry.projectName === ownProjectName) {
      if (buildVersions.length === 0 || buildVersions.includes(entry.versionName)) {
        required.add(contentPath);
      }
    } else {
      required.add(contentPath);
    }
  }

  return required;
};
