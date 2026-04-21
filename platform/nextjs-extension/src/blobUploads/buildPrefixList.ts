import path from 'node:path';
import fs from 'node:fs/promises';
import type { AllContentData } from '../contentMetadata/processContentMetadata.js';
import { stripDocsPrefix } from './utils.js';

/** Build prefix-map.json: list of all valid project paths, sorted longest-first for use in site.json lookup in next */
const buildPrefixList = (allContentData: AllContentData): string[] => {
  const projectPrefixes: Set<string> = new Set<string>();
  for (const entry of Object.values(allContentData.docsPaths)) {
    const projectDocs = allContentData.atlasProjectDocuments[entry.projectName];
    // Landing project is the fallback, has no prefix beyond the general docs/ prefix— skip it
    if (entry.projectDirName === 'landing') continue;

    const prefix = projectDocs?.docsetsEntry?.prefix;
    if (!prefix) continue;
    const stripped = stripDocsPrefix(prefix);

    const projectPath = entry.versionName
      ? `${stripped}/${entry.versionName}`
      : stripped;
    if (projectPath) projectPrefixes.add(projectPath);
  }
  const sortedProjectPrefixes = [...projectPrefixes].sort(
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
  const generatedDir = path.resolve(process.cwd(), 'src', 'generated');
  await fs.mkdir(generatedDir, { recursive: true });
  await fs.writeFile(
    path.join(generatedDir, 'prefix-map.json'),
    JSON.stringify(sortedProjectPrefixes, null, 2),
  );
  console.log('[blob upload] prefix-map.json written:', sortedProjectPrefixes);
};
