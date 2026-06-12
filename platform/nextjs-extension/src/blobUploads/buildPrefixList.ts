import path from 'node:path';
import fs from 'node:fs/promises';
import type { AllContentData } from '../contentMetadata/processContentMetadata.js';
import { stripDocsPrefix } from './utils.js';
import { getRepoPaths } from '../paths.js';
import { getDirNameToPrefix } from './mapFilesToUrlPaths.js';

/**
 * Returns the URL-style path for each project version in allContentData.
 * Pass `{ includeLanding: true }` to also include `''` (empty string) for the
 * landing project, which has no URL subdirectory prefix of its own.
 */
export const getProjectVersionPaths = (
  allContentData: AllContentData,
  options: { includeLanding?: boolean } = {},
): string[] => {
  const paths: Set<string> = new Set<string>();
  let hasLanding = false;
  for (const entry of Object.values(allContentData.docsPaths)) {
    const projectDocs = allContentData.atlasProjectDocuments[entry.projectName];
    // Landing project is the fallback, has no prefix beyond the general docs/ prefix
    if (entry.projectDirName === 'landing') {
      hasLanding = true;
      continue;
    }

    const prefix = projectDocs?.docsetsEntry?.prefix;
    if (!prefix) continue;
    const stripped = stripDocsPrefix(prefix);

    const projectPath = [stripped, entry.versionName].filter(Boolean).join('/');
    if (projectPath) paths.add(projectPath);
  }
  if (options.includeLanding && hasLanding) {
    paths.add('');
  }
  return [...paths];
};

/** Build prefix-map.json: list of all valid project paths, sorted longest-first for use in site.json lookup in next */
export const buildPrefixList = (allContentData: AllContentData): string[] => {
  const paths = getProjectVersionPaths(allContentData);
  const sortedProjectPrefixes = [...paths].sort(
    (a, b) => b.split('/').length - a.split('/').length || a.localeCompare(b),
  );
  return sortedProjectPrefixes;
};

/** Write prefix-map.json to src/generated/prefix-map.json for retrieval by Next fronted
 * Used in next to lookup _site.json by prefix given a url path
 * @param allContentData - AllContentData object containing the project prefixes
 * @returns void
 */
export const writePathPrefixListToFile = async (
  allContentData: AllContentData,
) => {
  const sortedProjectPrefixes = buildPrefixList(allContentData);
  const { generatedDir } = getRepoPaths();
  await fs.mkdir(generatedDir, { recursive: true });
  await fs.writeFile(
    path.join(generatedDir, 'prefix-map.json'),
    JSON.stringify(sortedProjectPrefixes, null, 2),
  );
  console.log('[blob upload] prefix-map.json written:', sortedProjectPrefixes);
};

/**
 * Write dir-name-to-prefix.json to src/generated/ so that the offline Next.js build
 * (BUILD_STATIC_PAGES=true) can map blob-relative paths back to local content-mdx
 * disk paths. Without this file, projects whose URL prefix differs from their
 * content directory name (e.g. django-mongodb → languages/python/django-mongodb)
 * cannot resolve _site.json or MDX files from the local filesystem.
 */
export const writeDirNameToPrefixMapToFile = async (
  allContentData: AllContentData,
) => {
  const dirNameToPrefix = getDirNameToPrefix(allContentData);
  const { generatedDir } = getRepoPaths();
  await fs.mkdir(generatedDir, { recursive: true });
  await fs.writeFile(
    path.join(generatedDir, 'dir-name-to-prefix.json'),
    JSON.stringify(dirNameToPrefix, null, 2),
  );
  console.log('[blob upload] dir-name-to-prefix.json written:', Object.keys(dirNameToPrefix).length, 'entries');
};

