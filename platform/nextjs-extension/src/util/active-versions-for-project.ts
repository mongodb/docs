import type { AtlasProjectDocuments } from '../contentMetadata/fetchAndStoreAtlasData.js';

export const findAllActiveVersionsForProject = (
  projectName: string,
  atlasProjectDocuments: AtlasProjectDocuments,
): string[] | undefined => {
  const projectEntry = atlasProjectDocuments[projectName];
  if (!projectEntry) return undefined;

  return projectEntry.reposBranchesEntry.branches
    .filter((branch) => branch.active && branch.gitBranchName !== undefined)
    .map((branch) => branch.gitBranchName as string);
};
