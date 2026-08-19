/**
 * Port of audit-cli's internal/projectinfo version-discovery helpers
 * (grove-platform/audit-cli#7), adapted to the layout this generator
 * actually needs: given a project directory, find the source directory of
 * its *current* version.
 */
import path from 'node:path';
import fs from 'node:fs/promises';

/**
 * Checks if a directory name looks like a version directory.
 * Version directories can be:
 * - "current" or "manual" (current version)
 * - "upcoming" (upcoming version)
 * - Starting with "v" (e.g., "v8.0", "v7.3")
 */
export function isVersionDirectory(dirName: string): boolean {
  if (dirName === 'current' || dirName === 'manual' || dirName === 'upcoming') {
    return true;
  }
  return dirName.startsWith('v');
}

/**
 * Checks if a version name represents the current version.
 * The current version is either "current" or "manual" (the Manual project's
 * current-version directory is historically named "manual", not "current").
 */
export function isCurrentVersion(versionName: string): boolean {
  return versionName === 'current' || versionName === 'manual';
}

async function isDirectory(candidate: string): Promise<boolean> {
  try {
    const stat = await fs.stat(candidate);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Finds all version directories within a project directory that look like
 * version directories AND contain a `source` subdirectory.
 */
export async function discoverAllVersions(projectDir: string): Promise<string[]> {
  const entries = await fs.readdir(projectDir, { withFileTypes: true });
  const versions: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const dirName = entry.name;
    if (dirName === 'source') {
      continue;
    }
    if (isVersionDirectory(dirName)) {
      const sourceDir = path.join(projectDir, dirName, 'source');
      if (await isDirectory(sourceDir)) {
        versions.push(dirName);
      }
    }
  }

  return versions;
}

export interface CurrentSource {
  sourceDir: string;
  /** Version directory name, or "" for non-versioned projects. */
  version: string;
}

/**
 * Returns the source directory to use for a project along with its version
 * label. Non-versioned projects (content/<project>/source) return an empty
 * version. Versioned projects return the current version's source dir.
 * Returns null if no resolvable current source directory exists.
 *
 * Version directories are checked first: a few projects (e.g. php-library)
 * have a legacy top-level `source/` directory containing only shared facet
 * config alongside their real `current/upcoming/vX.Y` version directories,
 * so a project isn't treated as non-versioned just because `source/` exists.
 */
export async function currentSourceDir(projectDir: string): Promise<CurrentSource | null> {
  let versions: string[] = [];
  try {
    versions = await discoverAllVersions(projectDir);
  } catch {
    // No version directories at all; fall through to the non-versioned check.
  }
  for (const version of versions) {
    if (isCurrentVersion(version)) {
      const candidate = path.join(projectDir, version, 'source');
      if (await isDirectory(candidate)) {
        return { sourceDir: candidate, version };
      }
    }
  }

  // Non-versioned project.
  const directSource = path.join(projectDir, 'source');
  if (await isDirectory(directSource)) {
    return { sourceDir: directSource, version: '' };
  }

  return null;
}
