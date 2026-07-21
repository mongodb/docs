import fs from 'fs/promises';
import nodePath from 'path';
import { getPathArraysFromFilesystem } from '@/utils/scan-mdx-files';
import { loadDirNameToPrefixMap, remapDiskRelativeToBlobRelative } from '@/mdx-utils/blob-path-remap';
import { CONTENT_MDX_DIR } from '@/mdx-utils/content-constants';

/**
 * Enumerates all routable docs page paths for the current DOCS_PROJECT.
 * Shared by the main page route and the markdown export route so both
 * produce the same set of static params at build time.
 */
export async function generateDocsStaticPaths(): Promise<Array<{ path: string[] }>> {
  const docsProject = process.env.DOCS_PROJECT;
  // This should error if the DOCS_PROJECT is not set.
  // Returning an empty array would result in all pages being 404.
  if (!docsProject) throw new Error('DOCS_PROJECT is not set');

  const projectDir = nodePath.join(CONTENT_MDX_DIR, docsProject);
  const dirName = docsProject.split('/')[0];
  const prefixMap = await loadDirNameToPrefixMap();

  const toUrlPath = (diskSegments: string[]): string[] =>
    remapDiskRelativeToBlobRelative(diskSegments.join('/'), prefixMap).split('/');

  let isLeaf = false;
  try {
    await fs.access(nodePath.join(projectDir, '_site.json'));
    isLeaf = true;
  } catch {
    isLeaf = false;
  }

  if (isLeaf) {
    const paths = await getPathArraysFromFilesystem(projectDir);
    return paths.map(({ path: p }) => ({ path: toUrlPath([dirName, ...p]) }));
  }

  const entries = await fs.readdir(projectDir, { withFileTypes: true });
  const prefixedPaths: Array<{ path: string[] }> = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    try {
      await fs.access(nodePath.join(projectDir, entry.name, '_site.json'));
    } catch {
      continue;
    }
    const versionPaths = await getPathArraysFromFilesystem(nodePath.join(projectDir, entry.name));
    prefixedPaths.push(...versionPaths.map(({ path: p }) => ({ path: toUrlPath([dirName, entry.name, ...p]) })));
  }
  return prefixedPaths;
}
