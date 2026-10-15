import type { DocsetsByProject } from './loadVersioningFromCheckout';
import type { ProjectNames } from './readSnootyToml';
import type { Docset, Version } from '../../../versioning/types';

/** Config object storing all content data for the build */
export interface AllContentData {
  docsetsByProject: DocsetsByProject;
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
    /** whether this content path corresponds to an active version in the docset catalog.
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
 * @param docsetsByProject - the docset catalog keyed by project name
 * @param clearCache - whether to clear the cache
 * @returns the docsPaths object keyed by content path
 */
export const processContentMetadata = async ({
  projectNames,
  docsetsByProject,
  clearCache,
}: {
  projectNames: ProjectNames;
  docsetsByProject: DocsetsByProject;
  clearCache: boolean;
}): Promise<{ docsPaths: ContentBundleData }> => {
  const docsPaths: ContentBundleData = {};

  Object.entries(projectNames).map(([contentPath, projectName]) => {
    const docset = docsetsByProject[projectName];
    // The catalog is the only source of versioning truth now, so an
    // unregistered project cannot be reasoned about: it would be treated as
    // unversioned and active, quietly producing the wrong paths and prefixes
    // for what may well be a versioned site. Fail the build instead.
    if (!docset) {
      throw new Error(
        `[processContentMetadata] no docset registered for project "${projectName}" (content path ${contentPath}). ` +
          'Add platform/versioning/projects/' +
          `${projectName}.ts and register it in platform/versioning/index.ts.`,
      );
    }
    const { projectDirName, versionName } = splitContentPath({
      contentPath,
      docset,
    });

    const active = isContentPathActive({ versionName, docset });
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

/** Determines whether the given content path corresponds to an active version
 *  in its project's docset entry.
 *
 *  - Unversioned projects (a single stub version) are active unless that
 *    version is explicitly marked `active: false`.
 *  - Versioned projects match the trailing segment of `contentPath` against
 *    `versionName`, the sole identifier a version has.
 */
export const isContentPathActive = ({
  versionName,
  docset,
}: {
  versionName: string;
  docset: Docset;
}): boolean => {
  const versions = docset.versions;
  if (versions.length <= 1) {
    const version = versions[0];
    if (version) {
      return version.active === true;
    } else {
      return true;
    }
  }
  const version = versions.find((v: Version) => v.versionName === versionName);
  return version?.active === true;
};

/** Catalog version for a content path, or undefined if there is no match. */
export const getBranchForContentPath = (
  contentPath: string,
  allContentData: AllContentData,
): Version | undefined => {
  const bundle = allContentData.docsPaths?.[contentPath];
  if (!bundle?.projectName) return undefined;
  const versions = allContentData.docsetsByProject[bundle.projectName]?.versions ?? [];
  if (!bundle.versionName) {
    return versions.length <= 1 ? versions[0] : undefined;
  }
  return versions.find((v) => v.versionName === bundle.versionName);
};

/** Split the content path, retrieving project directory name and version name
 * @param contentPath - the content path to split (relative to contentDir, e.g. `atlas` or `c-driver/current`)
 * @param docset - the docset entry for the project
 * @returns the project directory name and version name
 */
export const splitContentPath = ({
  contentPath,
  docset,
}: { contentPath: string; docset: Docset }): {
  projectDirName: string;
  versionName: string;
} => {
  const versioned = docset.versions.length > 1;
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
