import fs from 'node:fs/promises';
import path from 'node:path';
import type { NetlifyPluginUtils } from '@netlify/build';
import type { AllContentData } from '../../../nextjs-extension/src/contentMetadata/processContentMetadata';
import type { StaticEnvVars } from '../../../nextjs-extension/src/util/assertDbEnvVars';
import type { ConfigEnvironmentVariables } from '../../../nextjs-extension/src/util/extension';
import { getOfflineBundlesToRebuild } from './offline-bundles-to-rebuild/index';
import { ensureContentConvertedForBundles } from './ensure-content-converted';
import { getRepoPaths } from '../../../nextjs-extension/src/paths';
import { createOfflineTarball } from '../../../nextjs-extension/src/offline-docs/offline-utils/convertToTar';
import { upload } from '../../../nextjs-extension/src/s3Connection/s3connector';
import { createReadStream } from 'node:fs';
import { join } from 'node:path/posix';

// docs-site-specific copy of nextjs-extension/src/offline-docs/index.ts.
// Always builds offline bundles against docs-site (not docs-nextjs), since that's
// the app whose TOC/prefix-map data this extension (nextjs-ssg-extension) generates
// during onPreBuild.
const APP_DIR = 'docs-site';
const APP_ROOT_DIR = getRepoPaths(undefined, APP_DIR).docsNextjsDir;
const OFFLINE_BUNDLE_OUTPUT_DIR = path.resolve(APP_ROOT_DIR, 'offline-bundle-output');

// Bundle filenames to skip entirely for offline builds (no content conversion, no build).
const SKIPPED_OFFLINE_BUNDLES = new Set(['client-libraries.ts', 'tools.ts']);

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
    { cwd: APP_ROOT_DIR },
  );

  // Preserve per-bundle output so successive builds don't overwrite each other
  const destDir = path.join(OFFLINE_BUNDLE_OUTPUT_DIR, bundleStem, version);
  const srcDir = path.join(APP_ROOT_DIR, 'out');

  await fs.mkdir(destDir, { recursive: true });
  await fs.cp(srcDir, destDir, { recursive: true, force: true });

  console.log(`[offline-docs] Bundle written to ${destDir}`);

  const tarballName = `${bundleStem}-${version}.tar.gz`;
  const tarballPath = path.join(OFFLINE_BUNDLE_OUTPUT_DIR, tarballName);

  await createOfflineTarball({
    sourceDir: destDir,
    outputPath: tarballPath,
  });

  console.log(`[offline-docs] Tarball written to ${tarballPath}`);

  const bucketName = process.env.S3_OFFLINE_BUCKET ?? 'docs-mongodb-org-dotcomstg';
  const s3Prefix = 'docs/offline/';
  console.log('... uploading to AWS S3 ', bucketName, process.env.S3_OFFLINE_BUCKET, s3Prefix, tarballName);
  const fileStream = createReadStream(tarballPath);
  try {
    await upload({
      Bucket: bucketName,
      Key: join(s3Prefix, tarballName),
      Body: fileStream,
    });
    console.log('... uploaded to AWS S3');
  } finally {
    fileStream.destroy();
  }

};

/**
 * Handles the offline docs build process based on changed projects/versions.
 * Ensures any content those bundles need is converted to MDX (an interim step while
 * content is still being migrated to MDX elsewhere in the build), then iterates over
 * the bundles that need rebuilding and runs the offline build for each bundle/version
 * combination, always against docs-site.
 *
 * @param allContentData - Content data including atlas documents, paths to build, and doc paths
 * @param gitChangedFiles - List of files changed in the current git commit/PR
 * @param netlifyPluginUtils - Netlify plugin utils (run, cache, etc.) for executing commands and converting content
 * @param dbEnvVars - Database environment variables, needed to resolve the parser version for MDX conversion
 * @param configEnvironment - Netlify build config environment variables
 */
export const handleOfflineDownloads = async (
  allContentData: AllContentData,
  gitChangedFiles: readonly string[],
  netlifyPluginUtils: NetlifyPluginUtils,
  dbEnvVars: StaticEnvVars,
  configEnvironment: ConfigEnvironmentVariables,
): Promise<void> => {
  const allBundlesToRebuild = getOfflineBundlesToRebuild(
    allContentData,
    gitChangedFiles,
  );
  console.log("[offline-docs] bundlesToRebuild", allBundlesToRebuild);

  const skipped = Object.keys(allBundlesToRebuild).filter((filename) =>
    SKIPPED_OFFLINE_BUNDLES.has(filename),
  );
  if (skipped.length > 0) {
    console.log(`[offline-docs] Skipping bundles: ${skipped.join(', ')}`);
  }

  const bundlesToRebuild = Object.fromEntries(
    Object.entries(allBundlesToRebuild).filter(
      ([filename]) => !SKIPPED_OFFLINE_BUNDLES.has(filename),
    ),
  );
  const bundleEntries = Object.entries(bundlesToRebuild);
  if (bundleEntries.length === 0) {
    console.log('[offline-docs] No bundles need rebuilding.');
    return;
  }

  // TODO: remove this check once all the content-mdx lives in the repo 
  console.log(`[offline-docs] Bundles to rebuild: ${JSON.stringify(bundlesToRebuild, null, 2)}`);
  await ensureContentConvertedForBundles({
    bundlesToRebuild,
    allContentData,
    netlifyPluginUtils,
    dbEnvVars,
    configEnvironment,
  });

  for (const [filename, versions] of bundleEntries) {
    const bundleStem = filename.replace(/\.ts$/, '');
    const buildVersions = versions.length === 0 ? ['main'] : versions;

    for (const version of buildVersions) {
      try {
        await runOfflineBuild({ bundleStem, version, run: netlifyPluginUtils.run });
      } catch (err) {
        console.error(`[offline-docs] Failed to build ${bundleStem}@${version}:`, err);
      }
    }
  }

  console.log('[offline-docs] Offline bundle rebuild complete.');
};
