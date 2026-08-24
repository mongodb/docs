/**
 * Copies content images from content-mdx into .next/static/images/ so they serve
 * as static assets at the root under /_next/static/images/<rel> — out of the
 * /docs/* soft-redirect path, without the (unusable) image optimizer.
 *
 * Sources content-mdx directly (not public/docs/images), so the online <Image>
 * pipeline has no public/ dependency. Runs as postbuild (after next build); the
 * offline export doesn't. <rel> matches the manifest keys and the served URL.
 *
 * Run via: pnpm postbuild (automatically after pnpm build)
 */

import fs from 'fs/promises';
import path from 'path';
import { CONTENT_MDX_DIR } from '../src/mdx-utils/content-constants';
import { collectImageFiles } from './lib/content-images';

const DEST_DIR = path.join(process.cwd(), '.next', 'static', 'images');

// The favicon rides the same `_next/static` path as content images, for the same
// reason. Next's `app/favicon.ico` file convention builds its href from basePath
// (not assetPrefix), so manual — basePath `/docs`, shared with landing — emitted
// `/docs/favicon.ico`, which b2k routes to neither deploy: manual is reachable
// only via MANUAL_SLUGS plus its `/docs/docs_static_manual/_next/*` asset bucket.
// Serving it from `_next/static` puts it inside that bucket, so every docset
// self-hosts its own favicon on whatever host serves the page.
const FAVICON_SRC = path.join(process.cwd(), 'public', 'favicon.ico');
const FAVICON_DEST = path.join(process.cwd(), '.next', 'static', 'images', 'favicon.ico');

async function copyFavicon() {
  try {
    await fs.access(FAVICON_SRC);
  } catch {
    console.error(`Favicon not found at ${FAVICON_SRC} — every page would render without one.`);
    process.exit(1);
  }
  await fs.mkdir(path.dirname(FAVICON_DEST), { recursive: true });
  await fs.copyFile(FAVICON_SRC, FAVICON_DEST);
  console.log('Copied favicon.ico to .next/static/images/');
}

async function main() {
  const startTime = Date.now();

  // `.next` first: without it there is nothing to copy into, favicon included.
  try {
    await fs.access(path.join(process.cwd(), '.next'));
  } catch {
    console.error('.next output not found — run this after `next build`.');
    process.exit(1);
  }

  // A content-less build (e.g. landing) still needs its favicon, so copy it
  // before the early return rather than letting it ride the image path.
  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    console.log(`Content directory not found (${CONTENT_MDX_DIR}); skipping images.`);
    await copyFavicon();
    return;
  }

  const imageFiles = await collectImageFiles(CONTENT_MDX_DIR, CONTENT_MDX_DIR);

  await fs.rm(DEST_DIR, { recursive: true, force: true });
  await fs.mkdir(DEST_DIR, { recursive: true });

  let copied = 0;
  for (const { src, rel } of imageFiles) {
    const dest = path.join(DEST_DIR, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
    copied++;
  }

  await copyFavicon();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Copied ${copied} content image(s) to .next/static/images/ in ${elapsed}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
