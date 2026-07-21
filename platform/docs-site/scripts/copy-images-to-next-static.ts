/**
 * Copies content images from content-mdx into .next/static/images/ so they serve
 * as static assets at /docs/docs_static_nextjs/_next/static/images/<rel> (via the
 * netlify.toml /docs/docs_static_nextjs/_next/* rewrite + b2k strip) — out of the
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

async function main() {
  const startTime = Date.now();

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    console.log(`Content directory not found (${CONTENT_MDX_DIR}); skipping.`);
    return;
  }

  try {
    await fs.access(path.join(process.cwd(), '.next'));
  } catch {
    console.error('.next output not found — run this after `next build`.');
    process.exit(1);
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

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Copied ${copied} content image(s) to .next/static/images/ in ${elapsed}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
