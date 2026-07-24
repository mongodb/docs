/**
 * Shared helpers for locating content images under the content-mdx directory.
 * Used by both build-time image scripts so the file set and walk logic can't
 * drift:
 * - copy-content-images.ts (prebuild): stages images into public/docs/images and
 *   writes the dimensions manifest (consumed by card icons and the offline build).
 * - copy-images-to-next-static.ts (postbuild): copies images into
 *   .next/static/images for the online <Image> component.
 */

import fs from 'fs/promises';
import path from 'path';

export const IMAGE_EXT_SET = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

export interface ContentImage {
  /** Absolute path to the source file. */
  src: string;
  /** Path relative to baseDir, in posix form — matches the dimensions-manifest
   * keys and the served /_next/static/images/<rel> URL. */
  rel: string;
}

/** Recursively collect every image file under `dir`, with paths relative to `baseDir`. */
export async function collectImageFiles(dir: string, baseDir: string): Promise<ContentImage[]> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: ContentImage[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath, baseDir)));
    } else if (entry.isFile() && IMAGE_EXT_SET.has(path.extname(entry.name).toLowerCase())) {
      files.push({ src: fullPath, rel: path.relative(baseDir, fullPath).split(path.sep).join('/') });
    }
  }
  return files;
}
