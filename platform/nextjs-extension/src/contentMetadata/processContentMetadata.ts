import type { AtlasProjectDocuments } from './fetchAndStoreAtlasData';
import type { ProjectNames } from './readSnootyToml';
import type {
  BranchEntry,
  ReposBranchesDocument,
} from '../util/databaseConnection/types';

/** Config object storing all content data for the build */
export interface AllContentData {
  atlasProjectDocuments: AtlasProjectDocuments;
  /** Content paths to build relative to contentDir, e.g. `atlas` or `c-driver/current` */
  pathsToBuild: string[];
  /** docsPaths object keyed by content path */
  docsPaths: ContentBundleData;
}

export interface ContentBundleData {
  /** key by project path relative to contentDir, e.g. `atlas` or `c-driver/current` */
  [directoryPath: string]: {
    /** name of project as listed in Atlas; may differ from projectDirName */
    projectName: string;
    /** name of project dir: ex: atlas-cli, csharp, landing */
    projectDirName: string;
    /** Name of version or empty string if project is unversioned */
    versionName: string;
    /** whether this content path corresponds to an active branch in repos_branches.
     *  Unversioned projects are treated as active unless their sole branch is marked inactive. */
    active: boolean;
    /** whether the content has changed in the last commit */
    changed: boolean;
    /** whether the content should be rebuilt */
    shouldRebuild: boolean;
    /** full path to the content directory */
    fullPath: string;
  };
}

/** Populates docsPaths with structural metadata and initializes shouldRebuild based on clearCache.
 * @param projectNames - list of project names keyed by content path
 * @param atlasProjectDocuments - list of atlas project documents keyed by project name
 * @param clearCache - whether to clear the cache
 * @returns the docsPaths object keyed by content path
 */
export const processContentMetadata = async ({
  projectNames,
  atlasProjectDocuments,
  clearCache,
}: {
  projectNames: ProjectNames;
  atlasProjectDocuments: AtlasProjectDocuments;
  clearCache: boolean;
}): Promise<{ docsPaths: ContentBundleData }> => {
  const docsPaths: ContentBundleData = {};

  Object.entries(projectNames).map(([contentPath, projectName]) => {
    const { reposBranchesEntry } = atlasProjectDocuments[projectName];
    const { projectDirName, versionName } = splitContentPath({
      contentPath,
      reposBranchesEntry,
    });

    const active = isContentPathActive({ versionName, reposBranchesEntry });
    const shouldRebuild = active && clearCache;

    docsPaths[contentPath] = {
      projectName,
      projectDirName,
      versionName,
      active,
      changed: false,
      shouldRebuild,
      fullPath: '', // TODO: set full path
    };
  });
  return { docsPaths };
};

/** Determines whether the given content path corresponds to an active branch
 *  in its project's repos_branches entry.
 *
 *  - Unversioned projects (0 or 1 branch) are active unless their sole branch
 *    is explicitly marked `active: false`.
 *  - Versioned projects match the URL slug of the content path (the trailing
 *    segment of `contentPath`) against `branch.urlSlug` first, then fall back
 *    to `branch.name` and `branch.gitBranchName` for resilience.
 */
export const isContentPathActive = ({
  versionName,
  reposBranchesEntry,
}: {
  versionName: string;
  reposBranchesEntry: ReposBranchesDocument;
}): boolean => {
  const branches = reposBranchesEntry?.branches ?? [];
  if (branches.length <= 1) {
    const branch = branches[0];
    if (branch) {
      return branch.active === true;
    } else {
      return true;
    }
  }
  const branch = branches.find(
    (b: BranchEntry) =>
      b.urlSlug === versionName ||
      b.name === versionName ||
      b.gitBranchName === versionName,
  );
  return branch?.active === true;
};

/** Split the content path, retrieving project directory name and version name
 * @param contentPath - the content path to split (relative to contentDir, e.g. `atlas` or `c-driver/current`)
 * @param reposBranchesEntry - the repos branches entry for the project
 * @returns the project directory name and version name
 */
export const splitContentPath = ({
  contentPath,
  reposBranchesEntry,
}: { contentPath: string; reposBranchesEntry: ReposBranchesDocument }): {
  projectDirName: string;
  versionName: string;
} => {
  const versioned = reposBranchesEntry?.branches?.length > 1;
  const versionName = versioned ? (contentPath.split('/').at(-1) ?? '') : '';
  const projectDirName = versioned
    ? (contentPath.split('/').at(-2) ?? '')
    : (contentPath.split('/').at(-1) ?? '');
  return { projectDirName, versionName };
};

/**  Sets shouldRebuild on any content path in changedContentPaths or failedRestorations
 *  returns all paths where shouldRebuild = true in pathsToBuild array.
 */
export const buildPathsToBuild = ({
  allContentData,
  changedContentPaths,
  unchangedContentPathsToBuild,
}: {
  allContentData: AllContentData;
  unchangedContentPathsToBuild: string[];
  changedContentPaths: string[];
}): string[] => {
  for (const contentPath of Object.keys(allContentData.docsPaths)) {
    const bundleData = allContentData.docsPaths[contentPath];
    const changed = changedContentPaths.includes(contentPath);
    bundleData.changed = changed;
    if (changed || unchangedContentPathsToBuild.includes(contentPath)) {
      bundleData.shouldRebuild = true;
    }
  }

  return Object.entries(allContentData.docsPaths)
    .filter(([, bundleData]) => bundleData.shouldRebuild)
    .map(([contentPath]) => contentPath);
};
