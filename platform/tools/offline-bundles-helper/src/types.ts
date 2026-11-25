import type { Docset } from '../../../versioning/types.js';

export type DocsetsByProject = {
  [projectName: string]: Docset;
};

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
    /** From the directory's snooty.toml `name`, not the dir name (dir `mongodb-intellij` → `intellij`) */
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

/** Maps a project name (e.g. `"docs"`) to its list of version names (e.g. `["manual", "upcoming"]`). */
export type ProjectVersionsMap = Record<string, string[]>;

/** Maps a filename (e.g. `"development.versioned.docs.ts"`) to the list of bundle version names that need to be rebuilt (e.g. `["manual", "upcoming"]`). */
export type OfflineBundlesToBuild = Record<string, string[]>;
