import fs from 'fs/promises';
import path from 'path';
import { CONTENT_MDX_DIR } from './content-constants';

/**
 * Walk `rootDir` and map each `.mdx` file's lowercased relative path to the
 * on-disk relative path. Public routes are lowercase; conversion may still
 * leave mixed-case filenames until content is reconverted.
 */
export async function buildMdxRelativePathIndex(rootDir: string): Promise<Map<string, string>> {
  const index = new Map<string, string>();

  async function walk(dir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return;
      throw err;
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (!entry.name.endsWith('.mdx')) continue;
      const rel = path.relative(rootDir, full).split(path.sep).join('/');
      index.set(rel.toLowerCase(), rel);
    }
  }

  await walk(rootDir);
  return index;
}

export function lookupMdxRelativePath(index: Map<string, string>, relativePath: string): string {
  const norm = relativePath.split(/[\\/]/).join('/');
  return index.get(norm.toLowerCase()) ?? relativePath;
}

// Cache the in-flight promise, not the resolved map: SSG resolves many pages
// concurrently, and awaiting a bare map would let every early caller kick off
// its own full directory walk.
let cached: { rootDir: string; index: Promise<Map<string, string>> } | undefined;

/** Resolve a content-mdx-relative `.mdx` path, ignoring filename case. */
export async function resolveMdxRelativePath(
  relativePath: string,
  rootDir: string = CONTENT_MDX_DIR,
): Promise<string> {
  if (cached?.rootDir !== rootDir) {
    cached = { rootDir, index: buildMdxRelativePathIndex(rootDir) };
  }
  return lookupMdxRelativePath(await cached.index, relativePath);
}
