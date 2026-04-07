import type { ContentBundleData } from '../contentMetadata/processContentMetadata.js';

/** Maps a project name (e.g. `"docs"`) to its list of version names (e.g. `["manual", "upcoming"]`). */
export type ProjectVersionsMap = Record<string, string[]>;

/**
 * Converts a list of changed content paths to a map of project names and their changed versions.
 */
export const getChangedProjectAndVersions = (
  pathsToBuild: string[],
  docsPaths: ContentBundleData,
): ProjectVersionsMap => {
  const changedProjects: ProjectVersionsMap = {};

  for (const contentPath of pathsToBuild) {
    const entry = docsPaths[contentPath];
    if (!entry) continue;

    const { projectName, versionName } = entry;
    if (!changedProjects[projectName]) {
      changedProjects[projectName] = [];
    }
    if (versionName) {
      changedProjects[projectName].push(versionName);
    }
  }

  return changedProjects;
};
