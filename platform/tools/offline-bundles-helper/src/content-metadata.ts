import fs from 'node:fs';
import path from 'node:path';
import type {
  AllContentData,
  ContentBundleData,
  DocsetsByProject,
} from './types.js';

// content/<dir>/snooty.toml (unversioned) or content/<dir>/<version>/snooty.toml (versioned)
const MAX_CONTENT_DEPTH = 2;

const isDirectory = (dir: string): boolean => {
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
};

/** Content paths relative to contentDir, e.g. `atlas` or `c-driver/current` */
export const findContentPaths = (contentDir: string): string[] => {
  const found: string[] = [];
  const walk = (relative: string, depth: number): void => {
    const absolute = path.join(contentDir, relative);
    if (relative && fs.existsSync(path.join(absolute, 'snooty.toml'))) {
      found.push(relative);
    }
    if (depth >= MAX_CONTENT_DEPTH) return;
    for (const entry of fs.readdirSync(absolute)) {
      if (entry === 'node_modules' || entry === '.git') continue;
      const child = path.join(relative, entry);
      if (isDirectory(path.join(contentDir, child))) walk(child, depth + 1);
    }
  };
  walk('', 0);
  return found.sort();
};

export const readProjectName = (contentDir: string, contentPath: string): string => {
  const tomlPath = path.join(contentDir, contentPath, 'snooty.toml');
  const name = fs.readFileSync(tomlPath, 'utf-8').match(/name\s*=\s*["']([^"']+)["']/m)?.[1];
  if (!name) throw new Error(`No name found in ${tomlPath}`);
  return name;
};

/** Content path that owns a repo-relative changed file, e.g. `content/atlas/source/a.txt` -> `atlas` */
export const findOwningContentPath = (
  file: string,
  contentPaths: readonly string[],
): string | undefined =>
  contentPaths
    .filter((contentPath) => file.startsWith(`content/${contentPath}/`))
    .sort((a, b) => b.length - a.length)[0];

export const buildAllContentData = ({
  contentDir,
  docsetsByProject,
  gitChangedFiles,
}: {
  contentDir: string;
  docsetsByProject: DocsetsByProject;
  gitChangedFiles: readonly string[];
}): AllContentData => {
  const contentPaths = findContentPaths(contentDir);
  const docsPaths: ContentBundleData = {};

  for (const contentPath of contentPaths) {
    const projectName = readProjectName(contentDir, contentPath);
    const docset = docsetsByProject[projectName];
    if (!docset) {
      throw new Error(
        `No docset registered for project "${projectName}" (content path ${contentPath}). ` +
          `Add platform/versioning/projects/${projectName}.ts.`,
      );
    }

    const segments = contentPath.split('/');
    const versioned = docset.versions.length > 1;
    const versionName = versioned ? (segments.at(-1) ?? '') : '';
    const projectDirName = versioned ? (segments.at(-2) ?? '') : (segments.at(-1) ?? '');
    // An unversioned project is active unless its sole version says otherwise
    const active =
      docset.versions.length <= 1
        ? (docset.versions[0]?.active ?? true)
        : docset.versions.find((v) => v.versionName === versionName)?.active === true;

    docsPaths[contentPath] = {
      projectName,
      projectDirName,
      versionName,
      active,
      changed: false,
      shouldRebuild: false,
      fullPath: path.join(contentDir, contentPath),
    };
  }

  const changed = new Set<string>();
  for (const file of gitChangedFiles) {
    const owner = findOwningContentPath(file, contentPaths);
    if (owner) changed.add(owner);
  }
  for (const contentPath of changed) {
    docsPaths[contentPath].changed = true;
    docsPaths[contentPath].shouldRebuild = docsPaths[contentPath].active;
  }

  return {
    docsetsByProject,
    docsPaths,
    pathsToBuild: [...changed].filter((p) => docsPaths[p].active),
  };
};
