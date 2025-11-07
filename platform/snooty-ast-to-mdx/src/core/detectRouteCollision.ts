import fs from 'node:fs/promises';
import { posix as path } from 'node:path';

export interface RouteCollision {
  route: string;
  files: string[];
}

type RouteCollisionMap = Map<string, string[]>;

/**
 * Detects route collisions in MDX files based on Next.js routing conventions.
 *
 * Route collision occurs when multiple files would create the same route:
 * - `about.mdx` creates route `/about`
 * - `about/index.mdx` also creates route `/about`
 */
export const detectRouteCollisions = async (directory: string): Promise<RouteCollisionMap> => {
  const routeMap = new Map<string, string[]>();

  const scanDirectory = async (currentDirectory: string) => {
    const entries = await fs.readdir(currentDirectory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDirectory, entry.name);
      const relativePath = path.relative(directory, fullPath);

      if (entry.isDirectory()) {
        // Check if there's an index.mdx in this directory
        try {
          const indexPath = path.join(fullPath, 'index.mdx');
          await fs.access(indexPath);
          // Directory with index.mdx creates a route based on the directory name
          const route = '/' + relativePath;
          if (!routeMap.has(route)) {
            routeMap.set(route, []);
          }
          routeMap.get(route)!.push(path.join(relativePath, 'index.mdx'));
        } catch {
          // No index.mdx, ignore (fs.access throws an error if the file does not exist)
        }

        // Recursively scan subdirectories
        await scanDirectory(fullPath);
      } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
        // MDX file creates a route based on its name
        const route = '/' + relativePath.replace(/\.mdx$/, '');
        if (!routeMap.has(route)) {
          routeMap.set(route, []);
        }
        routeMap.get(route)!.push(relativePath);
      }
    }
  };

  await scanDirectory(directory);

  const collisions = new Map<string, string[]>();
  for (const [route, files] of routeMap) {
    if (files.length > 1) {
      collisions.set(route, files);
    }
  }

  return collisions;
};

interface ResolveRouteCollisionsArgs {
  outputDirectory: string;
  collisions: RouteCollisionMap;
}

/** Resolves route collisions by renaming conflicting files */
export const resolveRouteCollisions = async ({ outputDirectory, collisions }: ResolveRouteCollisionsArgs) => {
  for (const [_, files] of collisions) {
    // Sort files to prioritize which one to keep
    // Priority: index.mdx files > regular files (alphabetically)
    const sortedFiles = [...files].sort((a, b) => {
      const aIsIndex = a.endsWith('/index.mdx');
      const bIsIndex = b.endsWith('/index.mdx');
      if (aIsIndex && !bIsIndex) return -1;
      if (!aIsIndex && bIsIndex) return 1;
      return a.localeCompare(b);
    });

    // Keep the first file, rename the rest
    const [_, ...filesToRename] = sortedFiles;

    for (const fileToRename of filesToRename) {
      const oldPath = path.join(outputDirectory, fileToRename);

      let newName = fileToRename.replace(/\.mdx$/, '-copy.mdx');
      let newPath = path.join(outputDirectory, newName);
      let counter = 1;
      // Ensure the new name doesn't exist
      while (
        await fs
          .access(newPath)
          .then(() => true)
          .catch(() => false)
      ) {
        newName = fileToRename.replace(/\.mdx$/, `-copy-${counter}.mdx`);
        newPath = path.join(outputDirectory, newName);
        counter++;
      }

      await fs.rename(oldPath, newPath);
    }
  }
};
