import fs from 'node:fs/promises';
import path from 'node:path';
import type { NetlifyPluginUtils } from '@netlify/build';
import type { AllContentData } from '../contentMetadata/processContentMetadata';
import { getOfflineBundlesToRebuild } from './offline-bundles-to-rebuild/index';
import { getRepoPaths } from '../paths';

const DOCS_NEXTJS_DIR = getRepoPaths().docsNextjsDir;
const OFFLINE_BUNDLE_OUTPUT_DIR = path.resolve(DOCS_NEXTJS_DIR, 'offline-bundle-output');

/**
 * Runs the offline build for a single bundle at a specific version by delegating
 * to the `build:offline` script (`scripts/build-offline.ts`), which handles the full pipeline:
 *   1. TOC selection (writes offline-toc-selected.ts)
 *   2. Next.js static export (pnpm run build:offline:generate)
 *   3. Post-processing (CSS merge, image copy, link rewriting, verification)
 *
 * The resulting `out/` directory is copied to
 * `offline-bundle-output/<bundleStem>/<version>/` so successive bundle
 * builds do not overwrite each other.
 */
const runOfflineBuild = async ({
  bundleStem,
  version,
  run,
}: {
  bundleStem: string;
  version: string;
  run: NetlifyPluginUtils['run'];
}): Promise<void> => {
  const label = `${bundleStem}@${version}`;
  console.log(`[offline-docs] Starting build for ${label}`);

  await run.command(
    `pnpm run build:offline -- --tocFile=${bundleStem} --version=${version}`,
    { cwd: DOCS_NEXTJS_DIR },
  );

  // Preserve per-bundle output so successive builds don't overwrite each other
  const destDir = path.join(OFFLINE_BUNDLE_OUTPUT_DIR, bundleStem, version);
  const srcDir = path.join(DOCS_NEXTJS_DIR, 'out');

  await fs.mkdir(destDir, { recursive: true });
  await fs.cp(srcDir, destDir, { recursive: true, force: true });

  console.log(`[offline-docs] Bundle written to ${destDir}`);
};

/**
 * Handles the offline docs build process based on changed projects/versions.
 * Iterates over the bundles that need rebuilding and runs the offline build
 * for each bundle/version combination.
 *
 * Outputs are stored locally under `offline-bundle-output/` — no S3 upload.
 *
 * @param allContentData - Content data including atlas documents, paths to build, and doc paths
 * @param gitChangedFiles - List of files changed in the current git commit/PR
 * @param run - Netlify plugin run utility for executing commands
 */
export const handleOfflineDownloads = async (
  allContentData: AllContentData,
  gitChangedFiles: readonly string[],
  run: NetlifyPluginUtils['run'],
): Promise<void> => {
  console.log("[offline-docs] allContentData", allContentData);
  console.log("[offline-docs] gitChangedFiles", gitChangedFiles);
  const bundlesToRebuild = getOfflineBundlesToRebuild(
    allContentData,
    gitChangedFiles,
  );
  console.log("[offline-docs] bundlesToRebuild", bundlesToRebuild);
  const bundleEntries = Object.entries(bundlesToRebuild);
  if (bundleEntries.length === 0) {
    console.log('[offline-docs] No bundles need rebuilding.');
    return;
  }

  console.log(`[offline-docs] Bundles to rebuild: ${JSON.stringify(bundlesToRebuild, null, 2)}`);

  for (const [filename, versions] of bundleEntries) {
    const bundleStem = filename.replace(/\.ts$/, '');
    const buildVersions = versions.length === 0 ? ['main'] : versions;

    for (const version of buildVersions) {
      try {
        await runOfflineBuild({ bundleStem, version, run });
      } catch (err) {
        console.error(`[offline-docs] Failed to build ${bundleStem}@${version}:`, err);
      }
    }
  }

  console.log('[offline-docs] Offline bundle rebuild complete.');
};
