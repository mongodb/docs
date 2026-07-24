/**
 * Copies content images from content-mdx into public/docs/images/ (consumed by
 * card icons and the offline build) and emits src/generated/image-dimensions.json:
 * a map of each image's relative path (e.g. "atlas-cli/current/images/hero.svg")
 * to its intrinsic { width, height }. remark-image-dimensions injects those onto
 * <Image> nodes at compile time (next/image needs numeric width+height). Images
 * whose size can't be probed (e.g. some SVGs) are omitted and fall back to a
 * plain <img>.
 *
 * Run via: pnpm build:images
 */

import fs from 'fs/promises';
import path from 'path';
import { imageSize } from 'image-size';
import { CONTENT_MDX_DIR } from '../src/mdx-utils/content-constants';
import { collectImageFiles } from './lib/content-images';

const DEST_DIR = path.join(process.cwd(), 'public', 'docs', 'images');
const DIMENSIONS_FILE = path.join(process.cwd(), 'src', 'generated', 'image-dimensions.json');

type Dimensions = { width: number; height: number };

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
  // Keyed by served relative path (posix), matching the <Image> component's
  // path.join(projectPath, src) — see remark-resolve-imports injection.
  const dimensions: Record<string, Dimensions> = {};
  for (const { src, rel } of imageFiles) {
    const dest = path.join(DEST_DIR, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
    copied++;

    const dims = await readDimensions(src);
    if (dims) dimensions[rel] = dims;
  }

  await fs.mkdir(path.dirname(DIMENSIONS_FILE), { recursive: true });
  await fs.writeFile(DIMENSIONS_FILE, JSON.stringify(dimensions, null, 2) + '\n', 'utf-8');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(
    `Copied ${copied} image(s) to public/docs/images/ and wrote ${Object.keys(dimensions).length} dimension entr(y/ies) in ${elapsed}s`,
  );
}

/** Read intrinsic pixel dimensions, or null if they can't be determined
 * (unreadable file, or a format/SVG without an intrinsic size). */
async function readDimensions(filePath: string): Promise<Dimensions | null> {
  try {
    const buffer = await fs.readFile(filePath);
    const { width, height } = imageSize(buffer);
    if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
      return { width, height };
    }
  } catch {
    // Fall through — caller omits this image from the manifest.
  }
  return null;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
