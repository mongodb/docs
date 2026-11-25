import fs from 'node:fs';
import path from 'node:path';
import { extractContentSitesWithPages } from './extract-content-sites.js';
import { getRequiredContentPathsForBundle } from './required-content-paths.js';
import type { AllContentData, OfflineBundlesToBuild } from './types.js';

export interface BundleJob {
  tocFile: string;
  /** Build version; non-versioned bundles use `main` */
  version: string;
  /** Content dirs under `content/` that must be converted to MDX before the build */
  contentPaths: string[];
}

export interface BundleShard {
  shard: number;
  bundles: BundleJob[];
}

export const toBundleJobs = (
  bundles: OfflineBundlesToBuild,
  offlineDocsDir: string,
  allContentData: AllContentData,
): BundleJob[] =>
  Object.entries(bundles).flatMap(([tocFile, versions]) => {
    const source = fs.readFileSync(path.join(offlineDocsDir, tocFile), 'utf-8');
    const contentSites = extractContentSitesWithPages(source);
    const buildVersions = versions.length ? versions : ['main'];

    // A versioned TOC file with no active versions has nothing to build
    const isVersioned = tocFile.includes('.versioned.');
    if (isVersioned && versions.length === 0) return [];

    return buildVersions.map((version) => ({
      tocFile: tocFile.replace(/\.ts$/, ''),
      version,
      contentPaths: [
        ...getRequiredContentPathsForBundle(
          tocFile,
          versions.length ? [version] : [],
          contentSites,
          allContentData,
        ),
      ].sort(),
    }));
  });

/** Round-robin so a run of heavy bundles from one TOC file is spread across shards. */
export const shardBundles = (
  jobs: readonly BundleJob[],
  shardSize: number,
): BundleShard[] => {
  const shardCount = Math.ceil(jobs.length / shardSize);
  const shards: BundleShard[] = Array.from({ length: shardCount }, (_, shard) => ({
    shard,
    bundles: [],
  }));
  jobs.forEach((job, index) => shards[index % shardCount].bundles.push(job));
  return shards;
};
