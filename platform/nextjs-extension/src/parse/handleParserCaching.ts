import type { NetlifyPluginUtils } from '@netlify/build';
import { readdir } from 'node:fs';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';

const readdirAsync = promisify(readdir);

export const restoreParserCache = async (
  cache: NetlifyPluginUtils['cache'],
) => {
  const files: string[] = await cache.list();

  const cacheFiles = getCacheFilePaths(files);

  if (!cacheFiles.length) {
    console.log('No parser cache files found');
    return;
  }

  // Don't want to restore duplicates, only restore Snooty parser cache files
  console.log('Restoring parser cache files');
  await Promise.all(cacheFiles.map((cacheFile) => cache.restore(cacheFile)));
};

export const getCacheFilePaths = (filesPaths: string[]): string[] =>
  filesPaths.filter((filePath) => filePath.endsWith('.cache.gz'));

export const removeCachedParserOutput = async (
  cache: NetlifyPluginUtils['cache'],
) => {
  const files: string[] = await cache.list();

  const cacheFiles = getCacheFilePaths(files);

  if (!cacheFiles.length) {
    console.log('No parser cache files found');
    return;
  }
  await Promise.all(cacheFiles.map((cacheFile) => cache.remove(cacheFile)));
};

export const cacheParserFiles = async (
  run: NetlifyPluginUtils['run'],
  cache: NetlifyPluginUtils['cache'],
) => {
  await run.command('./snooty-parser/snooty/snooty create-cache .');

  const filesPaths = await readdirAsync(process.cwd());
  const cacheFiles = getCacheFilePaths(filesPaths);

  await Promise.all(
    cacheFiles.map(async (filePath) => {
      if (!(await cache.has(filePath))) {
        console.log(`Adding cache file: ${filePath}`);
        await cache.save(filePath);
      }
    }),
  );
};

// Compare the version found in the filenames of the cached parser output artifacts to the current parser version
// TODO: DOP-6104 Update how we find the version of the cached parser
export const getVersionFromParserArtifacts = async (
  snootyCacheFiles: string[],
  targetVersion: string,
): Promise<string> => {
  try {
    if (snootyCacheFiles?.length) {
      // Check all cache files for the target version
      const matchingFile = snootyCacheFiles.find((file) => {
        // Extract semantic version from cache filename (e.g., ".snooty-parser-1.2.3_" -> "1.2.3")
        const versionMatch = file.match(/\.snooty-.*?-(\d+\.\d+\.\d+)_/);
        if (versionMatch) {
          // Add 'v' prefix to match expected format
          const version = `v${versionMatch[1]}`;
          return version === targetVersion;
        }
        return false;
      });

      if (matchingFile) {
        console.log(`Found target parser version ${targetVersion} in cache`);
        return targetVersion;
      }
      console.log(
        `Target parser version ${targetVersion} not found in cached parser artifacts`,
      );
    } else {
      console.log('No parser cache files found');
    }
    return ''; // Return empty string if no matching version is found as a fallback so that clone parser is called
  } catch (err) {
    console.log(
      `Could not determine parser version from cached parser artifacts: ${err}`,
    );
    return '';
  }
};

export const cleanupExistingParserCache = async (
  cache: NetlifyPluginUtils['cache'],
  parserPath: string,
) => {
  console.log('Removing cached parser artifacts and parser directory');
  // Clear cached parser output artifacts
  await removeCachedParserOutput(cache);
  try {
    // Remove parser directory
    await cache.remove(parserPath);
    await fs.rm(parserPath, { recursive: true, force: true });
    console.log(`Removed parser at path ${parserPath}`);
  } catch (err) {
    console.error(`Failed to remove ${parserPath}:`, err);
    throw err;
  }
};
