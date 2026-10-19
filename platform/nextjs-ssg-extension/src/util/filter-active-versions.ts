import type { DocsetsByProject } from '../contentMetadata/loadVersioningFromCheckout.js';
import { findAllActiveVersionsForProject } from './active-versions-for-project.js';
import type { ProjectVersionsMap } from './changed-projects-and-versions.js';

/**
 * Filters a map of changed projects/versions down to only the active versions for each project.
 * If no active versions are found for a project, all changed versions are kept with a warning.
 */
export const filterActiveVersions = (
  changedProjects: ProjectVersionsMap,
  docsetsByProject: DocsetsByProject,
): ProjectVersionsMap => {
  const filtered: ProjectVersionsMap = {};

  for (const [projectName, changedVersions] of Object.entries(
    changedProjects,
  )) {
    const activeVersions = findAllActiveVersionsForProject(
      projectName,
      docsetsByProject,
    );
    if (!activeVersions) {
      console.warn(
        `No active versions found for project ${projectName}, keeping all versions: ${changedVersions}`,
      );
      filtered[projectName] = changedVersions;
    } else {
      filtered[projectName] = changedVersions.filter((version) =>
        activeVersions.includes(version),
      );
    }
  }

  return filtered;
};
