import fsExists from 'fs.promises.exists';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { AllContentData } from './processContentMetadata.js';

/** DFS search for dirs that contain a snooty.toml up to maxDepth, baseDir depth is 0
 ** @param baseDir - absolute path to the starting directory to search from
 ** @param maxDepth - maximum depth to search to below baseDir
 ** @returns absolute paths of dirs that contain a snooty.toml
 */
export const findAllContentPaths = async (
  baseDir: string,
  maxDepth: number,
): Promise<string[]> => {
  const dirsWithToml: string[] = [];
  const directoryStack: Array<{ dir: string; depth: number }> = [
    { dir: baseDir, depth: 0 },
  ];

  while (directoryStack.length) {
    const { dir: currentDir, depth } = directoryStack.pop() as {
      dir: string;
      depth: number;
    };
    if (currentDir.includes('snooty-parser')) {
      continue;
    }

    const currentToml = path.join(currentDir, 'snooty.toml');

    if (await fsExists(currentToml)) {
      dirsWithToml.push(currentDir);
    }

    // stop searching subdirs of current dir if we've reached the max depth
    if (depth >= maxDepth) {
      continue;
    }

    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      // skip if not a directory, we already checked for snooty.toml at current dir level
      if (!entry.isDirectory()) continue;
      // skip node_modules and .git directories
      if (entry.name === 'node_modules' || entry.name === '.git') continue;

      const subdir = path.join(currentDir, entry.name);
      directoryStack.push({ dir: subdir, depth: depth + 1 });
    }
  }
  return dirsWithToml.map((contentPath) =>
    path.relative('/opt/build/repo', contentPath),
  );
};
