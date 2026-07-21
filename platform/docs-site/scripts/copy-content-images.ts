/**
 * Copies all image files from the content-mdx directory into public/docs/images/
 * so they can be served as static assets in the SSG build (no API route needed).
 *
 * Run via: pnpm build:images
 */

import fs from 'fs/promises';
import path from 'path';
import { CONTENT_MDX_DIR } from '../src/mdx-utils/content-constants';

const DEST_DIR = path.join(process.cwd(), 'public', 'docs', 'images');

const IMAGE_EXT_SET = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

async function collectImageFiles(dir: string, baseDir: string): Promise<{ src: string; rel: string }[]> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: { src: string; rel: string }[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath, baseDir)));
    } else if (entry.isFile() && IMAGE_EXT_SET.has(path.extname(entry.name).toLowerCase())) {
      files.push({ src: fullPath, rel: path.relative(baseDir, fullPath) });
    }
  }
  return files;
}

async function main() {
  const startTime = Date.now();

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    console.error(`Content directory not found: ${CONTENT_MDX_DIR}`);
    process.exit(1);
  }

  // Clean destination to avoid stale images from previous builds
  await fs.rm(DEST_DIR, { recursive: true, force: true });
  await fs.mkdir(DEST_DIR, { recursive: true });

  const imageFiles = await collectImageFiles(CONTENT_MDX_DIR, CONTENT_MDX_DIR);

  if (imageFiles.length === 0) {
    console.log('No images found in content directory.');
    return;
  }

  let copied = 0;
  for (const { src, rel } of imageFiles) {
    const dest = path.join(DEST_DIR, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
    copied++;
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Copied ${copied} image(s) to public/docs/images/ in ${elapsed}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
