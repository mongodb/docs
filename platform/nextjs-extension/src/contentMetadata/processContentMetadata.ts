import type { NetlifyPluginUtils } from '@netlify/build';
import type { AtlasProjectDocuments } from './fetchAndStoreAtlasData';
import type { ProjectNames } from './readSnootyToml';
import type {
  BranchEntry,
  ReposBranchesDocument,
} from '../util/databaseConnection/types';
import path from 'node:path';

const CONTENT_DIR_NAME = 'content';
/** Config object storing all content data for the build */
export interface AllContentData {
  atlasProjectDocuments: AtlasProjectDocuments;
  /** Content paths to build ex: /content/<dirName>/<versionName> */
  pathsToBuild: string[];
  baseDir: string;
  /** path to the content dir from base dir ex: "../..". Does not include part of the path named "content" in the path*/
  relativePathToContent: string;
  /** docsPaths object keyed by content path */
  docsPaths: ContentBundleData;
}

export interface ContentBundleData {
  /** key by project path ex:  /content/<dirName>/<versionName> */
  [projectPath: string]: {
    /** name of project as listed in Atlas; may differ from projectDirName */
    projectName: string;
    /** name of project dir: ex: atlas-cli, csharp, landing */
    projectDirName: string;
    /** Name of version or empty string if project is unversioned */
    versionName: string;
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

    const active = !reposBranchesEntry.branches?.find(
      (branch: BranchEntry): boolean => branch.name === versionName,
    )?.active;
    const shouldRebuild = active && clearCache;

    docsPaths[contentPath] = {
      projectName,
      projectDirName,
      versionName,
      changed: false,
      shouldRebuild,
      fullPath: '', // TODO: set full path
    };
  });
  return { docsPaths };
};

/** Split the content path, retrieving project directory name and version name
 * @param contentPath - the content path to split
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

export const constructFullPath = ({
  relativePathToContent,
  projectDirName,
  versionName,
}: {
  relativePathToContent: string;
  projectDirName: string;
  versionName: string;
}): string => {
  return path.resolve(
    relativePathToContent,
    CONTENT_DIR_NAME,
    projectDirName,
    versionName,
  );
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

export const getBundlePathForContent = ({
  relativePathToContent,
  projectDirName,
  versionName,
}: {
  relativePathToContent: string;
  projectDirName: string;
  versionName: string;
}) => {
  return path.resolve(
    constructFullPath({ relativePathToContent, projectDirName, versionName }),
    'bundle',
  );
};
