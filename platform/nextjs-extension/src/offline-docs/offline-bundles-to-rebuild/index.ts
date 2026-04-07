import fs from 'node:fs';
import path from 'node:path';
import type { AtlasProjectDocuments } from '../../contentMetadata/fetchAndStoreAtlasData';
import type { AllContentData } from '../../contentMetadata/processContentMetadata';
import { filterActiveVersions } from '../../util/filter-active-versions';
import { getChangedProjectAndVersions } from '../../util/changed-projects-and-versions';
import { findAllActiveVersionsForProject } from '../../util/active-versions-for-project';

/** Maps a filename (e.g. `"development.versioned.docs.ts"`) to the list of bundle version names that need to be rebuilt (e.g. `["manual", "upcoming"]`). */
export type OfflineBundlesToBuild = Record<string, string[]>;

// Path relative to docs-nextjs root (where the extension runs from)
// This is where the table of contents for the offline docs is stored
const OFFLINE_DOCS_DIR = 'src/context/table-of-contents/offline-docs';
const FULL_PATH_TO_OFFLINE_DOCS_DIR =
  'platform/docs-nextjs/src/context/table-of-contents/offline-docs/';

// filename format: <label>.versioned.<projectName>.ts (e.g., "development.versioned.docs.ts" → "docs")
const getProjectNameFromFilename = (filename: string): string | undefined => {
  const match = filename.match(/\.versioned\.([^.]+)/);
  return match?.[1];
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
  atlasProjectDocuments: AtlasProjectDocuments,
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

  const allVersions = findAllActiveVersionsForProject(
    versionedProject,
    atlasProjectDocuments,
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
 * @param allContentData - Content data including atlas documents, paths to build, and doc paths
 * @param gitChangedFiles - List of files changed in the current git commit/PR
 * @returns Record of filename -> versions[] that need rebuilding
 */
export const getOfflineBundlesToRebuild = (
  allContentData: AllContentData,
  gitChangedFiles: readonly string[],
): OfflineBundlesToBuild => {
  const { atlasProjectDocuments, pathsToBuild, docsPaths } = allContentData;
  const offlineDocsPath = path.resolve(process.cwd(), OFFLINE_DOCS_DIR);

  const changedOfflineDocTocFiles = gitChangedFiles
    .filter((file) => file.startsWith(FULL_PATH_TO_OFFLINE_DOCS_DIR))
    .map((file) => file.slice(FULL_PATH_TO_OFFLINE_DOCS_DIR.length));

  // Only build offline docs for active versions
  const changedProjects = getChangedProjectAndVersions(pathsToBuild, docsPaths);
  const activeChangedProjects = filterActiveVersions(
    changedProjects,
    atlasProjectDocuments,
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
      atlasProjectDocuments,
    );
    if (!versions) {
      console.warn(
        `No active versions found for project ${project} in filename ${file}, skipping offline bundle rebuild`,
      );
      continue;
    }
    updateBundleVersionsToBuild(offlineBundlesToRebuild, file, versions);
  }

  const allOfflineDocFiles = readOfflineDocFiles(offlineDocsPath);

  // Maps changed projects and versions to the offline doc files that need to be rebuilt
  for (const [project, versions] of Object.entries(activeChangedProjects)) {
    for (const filename of allOfflineDocFiles) {
      if (offlineBundlesToRebuild[filename]) continue; // already added all versions to the record
      processFileForProject(
        filename,
        offlineDocsPath,
        project,
        versions,
        atlasProjectDocuments,
        offlineBundlesToRebuild,
      );
    }
  }

  return offlineBundlesToRebuild;
};
