import type {
  ContentBundleData,
  DocsetsByProject,
  ProjectVersionsMap,
} from './types.js';

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
