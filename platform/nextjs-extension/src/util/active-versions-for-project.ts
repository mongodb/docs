import type { DocsetsByProject } from '../contentMetadata/loadVersioningFromCheckout.js';

export const findAllActiveVersionsForProject = (
  projectName: string,
  docsetsByProject: DocsetsByProject,
): string[] | undefined => {
  const docset = docsetsByProject[projectName];
  if (!docset) return undefined;

  return docset.versions
    .filter((version) => version.active)
    .map((version) => version.versionName);
};
