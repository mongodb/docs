import fs from 'node:fs';
import path from 'node:path';
import {
  filterActiveVersions,
  findAllActiveVersionsForProject,
  getChangedProjectAndVersions,
} from './active-versions.js';
import { getProjectNameFromFilename } from './toc-filename.js';
import type {
  AllContentData,
  DocsetsByProject,
  OfflineBundlesToBuild,
} from './types.js';

// SUGGESTION skip rebuilding atlas-cli on atlas change -- adds an extra 20 minutes to the build
const SKIP_CROSS_REFERENCE_REBUILD: Record<string, Set<string>> = {
  'cloud-docs': new Set(['atlas-cli']),
};

const readOfflineDocFiles = (offlineDocsPath: string): string[] => {
  try {
    return fs
      .readdirSync(offlineDocsPath)
      .filter((file) => file.endsWith('.ts'));
  } catch (error) {
    console.error(`Error reading offline-docs directory: ${error}`);
    return [];
  }
};

// Returns the project name if the file contains `contentSite: '<project>'`, otherwise undefined.
const getMatchingContentSiteFromFile = (
  filePath: string,
  project: string,
): string | undefined => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const match = fileContent.match(
      new RegExp(`contentSite:\\s*'(${project})'`),
    );
    return match?.[1];
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error}`);
    return undefined;
  }
};

/**
 * Adds or merges versions into the rebuild list for a given filename.
 * If the filename already has an entry, deduplicates and combines with the new versions.
 * versions array will be empty for non-versioned files.
 */
const updateBundleVersionsToBuild = (
  bundlesToBuild: OfflineBundlesToBuild,
  filename: string,
  versions: string[],
): void => {
  const existing = bundlesToBuild[filename];
  if (existing) {
    bundlesToBuild[filename] = [...new Set([...existing, ...versions])];
  } else {
    bundlesToBuild[filename] = [...versions];
  }
};

/**
 * Determines which versions to rebuild for a single offline doc file given a changed project,
 * and adds entries to the rebuild record.
 *
 * Matching logic:
 * 1. File has `versioned.<project>` in name → add with the project's changed versions
 * 2. File contains `contentSite: '<project>'`:
 *    - Non-versioned file → add with [] (no versions needed)
 *    - Versioned file for a DIFFERENT project → add with all that project's active versions
 */
const processFileForProject = (
  filename: string,
  offlineDocsPath: string,
  project: string,
  versions: string[],
  docsetsByProject: DocsetsByProject,
  record: OfflineBundlesToBuild,
): void => {
  if (filename.includes(`versioned.${project}.`)) {
    // simple option, project is in filename so don't need to read through the file
    updateBundleVersionsToBuild(record, filename, versions);
    return;
  }

  const filePath = path.join(offlineDocsPath, filename);
  if (!getMatchingContentSiteFromFile(filePath, project)) return;

  const isVersionedFile = filename.includes('.versioned.');
  if (!isVersionedFile) {
    updateBundleVersionsToBuild(record, filename, []);
    return;
  }

  // File is versioned for a different project — rebuild all of that project's active versions
  const versionedProject = getProjectNameFromFilename(filename);
  if (!versionedProject) {
    console.error(`Could not extract project name from filename ${filename}`);
    return;
  }

  if (SKIP_CROSS_REFERENCE_REBUILD[project]?.has(versionedProject)) {
    console.log(
      `Skipping rebuild of ${filename} (${versionedProject}) for cross-referenced change in ${project}`,
    );
    return;
  }

  const allVersions = findAllActiveVersionsForProject(
    versionedProject,
    docsetsByProject,
  );
  if (!allVersions) {
    console.error(
      `No active versions found for project ${versionedProject} in filename ${filename}`,
    );
    return;
  }

  updateBundleVersionsToBuild(record, filename, allVersions);
};

/**
 * Finds offline doc files that need to be rebuilt based on changed projects/versions.
 *
 * @param allContentData - Content data including docsets, paths to build, and doc paths
 * @param gitChangedFiles - List of files changed, relative to `repoRoot`
 * @param offlineDocsDir - Absolute path of the offline TOC directory
 * @param repoRoot - Absolute repo root that `gitChangedFiles` are relative to
 * @returns Record of filename -> versions[] that need rebuilding
 */
export const getOfflineBundlesToRebuild = ({
  allContentData,
  gitChangedFiles,
  offlineDocsDir,
  repoRoot,
}: {
  allContentData: AllContentData;
  gitChangedFiles: readonly string[];
  offlineDocsDir: string;
  repoRoot: string;
}): OfflineBundlesToBuild => {
  const { docsetsByProject, pathsToBuild, docsPaths } = allContentData;
  // git reports paths relative to the repo root
  const tocDirPrefix = `${path.relative(repoRoot, offlineDocsDir)}/`;

  const changedOfflineDocTocFiles = gitChangedFiles.reduce<string[]>(
    (tocFiles, file) => {
      if (!file.startsWith(tocDirPrefix)) return tocFiles;
      const name = file.slice(tocDirPrefix.length);
      if (name.endsWith('.ts') && !name.includes('/')) tocFiles.push(name);
      return tocFiles;
    },
    [],
  );

  // Only build offline docs for active versions
  const changedProjects = getChangedProjectAndVersions(pathsToBuild, docsPaths);
  const activeChangedProjects = filterActiveVersions(
    changedProjects,
    docsetsByProject,
  );

  console.log('Changed offline doc TOC files:', changedOfflineDocTocFiles);
  console.log('Active changed projects and versions:', activeChangedProjects);

  const offlineBundlesToRebuild: OfflineBundlesToBuild = {};

  // When a TOC file itself changes, rebuild all active versions for its project
  for (const file of changedOfflineDocTocFiles) {
    const project = getProjectNameFromFilename(file);
    if (!project) {
      updateBundleVersionsToBuild(offlineBundlesToRebuild, file, []);
      continue;
    }
    const versions = findAllActiveVersionsForProject(
      project,
      docsetsByProject,
    );
    if (!versions) {
      console.warn(
        `No active versions found for project ${project} in filename ${file}, skipping offline bundle rebuild`,
      );
      continue;
    }
    updateBundleVersionsToBuild(offlineBundlesToRebuild, file, versions);
  }

  const allOfflineDocFiles = readOfflineDocFiles(offlineDocsDir);

  // Maps changed projects and versions to the offline doc files that need to be rebuilt
  for (const [project, versions] of Object.entries(activeChangedProjects)) {
    for (const filename of allOfflineDocFiles) {
      processFileForProject(
        filename,
        offlineDocsDir,
        project,
        versions,
        docsetsByProject,
        offlineBundlesToRebuild,
      );
    }
  }

  return offlineBundlesToRebuild;
};
