import type { AllContentData } from '../contentMetadata/processContentMetadata.js';
import { stripDocsPrefix } from './utils.js';

/** Replace the projectDirName (directory name in the first segment of file path) with the stripped prefix.
 *  If stripped prefix is empty (e.g. landing), drop the dir name entirely.
 *
 * ex:
 * manual/manual/v1/index.mdx -> manual/v1/index.mdx
 * django-mongodb/current/get-started.mdx -> languages/python/django-mongodb/current/get-started.mdx
 * landing/get-started.mdx -> get-started.mdx (landing prefix strips to empty, dirName dropped)
 * */
export const remapFilePath = ({
  filePath,
  dirNameToPrefix,
}: {
  filePath: string;
  dirNameToPrefix: Record<string, string>;
}): string => {
  const firstSlash = filePath.indexOf('/');
  if (firstSlash === -1) {
    return filePath;
  }
  const dirName = filePath.slice(0, firstSlash);
  const rest = filePath.slice(firstSlash + 1);
  const prefix = dirNameToPrefix[dirName];
  if (!prefix) {
    console.warn(`No prefix found for ${filePath}`);
    return filePath;
  }
  const stripped = stripDocsPrefix(prefix);
  if (!stripped) return rest;
  return `${stripped}/${rest}`;
};

/** Build projectDirName → docsetsEntry.prefix map */
export const getDirNameToPrefix = (
  allContentData: AllContentData,
): Record<string, string> => {
  const dirNameToPrefix: Record<string, string> = {};
  for (const entry of Object.values(allContentData.docsPaths)) {
    const projectDocs = allContentData.atlasProjectDocuments[entry.projectName];
    if (projectDocs?.docsetsEntry?.prefix) {
      dirNameToPrefix[entry.projectDirName] = projectDocs.docsetsEntry.prefix;
    }
  }
  return dirNameToPrefix;
};
