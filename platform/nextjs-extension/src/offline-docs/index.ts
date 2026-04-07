import type { AllContentData } from '../contentMetadata/processContentMetadata';
import { getOfflineBundlesToRebuild } from './offline-bundles-to-rebuild/index';

/**
 * Handles the offline docs download process based on changed projects/versions.
 *
 * @param allContentData - Content data including atlas documents, paths to build, and doc paths
 * @param gitChangedFiles - List of files changed in the current git commit/PR
 */
export const handleOfflineDownloads = (
  allContentData: AllContentData,
  gitChangedFiles: readonly string[],
): void => {
  const bundlesToRebuild = getOfflineBundlesToRebuild(
    allContentData,
    gitChangedFiles,
  );
  console.log('Offline bundles to rebuild:', bundlesToRebuild);

  // TODO: download the bundles
};
