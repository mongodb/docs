import type { Store } from '@netlify/blobs';
import pLimit from 'p-limit';
import type { AllContentData } from '../contentMetadata/processContentMetadata.js';
import { constructBlobKey } from './uploadIndividualBlob.js';
import { getDirNameToPrefix, remapFilePath } from './mapFilesToUrlPaths.js';
import { getProjectVersionPaths } from './buildPrefixList.js';

const BLOB_TYPES = ['mdx', 'image', 'reference'] as const;

const MAX_CONCURRENT_PREFIX_SCANS = 5;

/** Blob keys this build still needs, derived from `relativeFilePaths` via remap and `constructBlobKey`. */
function buildExpectedBlobKeys(
  relativeFilePaths: string[],
  allContentData: AllContentData,
): Set<string> {
  const dirNameToPrefix = getDirNameToPrefix(allContentData);
  return new Set(
    relativeFilePaths.map((filePath) =>
      constructBlobKey(remapFilePath({ filePath, dirNameToPrefix })),
    ),
  );
}

/** List prefixes to pass to `store.list` for orphan scans: each of `mdx`, `image`, and `reference` paired with project version paths in `pathsToBuild`. */
export function prefixesToListForOrphanScan(
  allContentData: AllContentData,
): string[] {
  const pathsBeingRebuilt = new Set(allContentData.pathsToBuild);
  const docsPathsForThisBuild = Object.fromEntries(
    Object.entries(allContentData.docsPaths).filter(([projectKey]) =>
      pathsBeingRebuilt.has(projectKey),
    ),
  );
  const projectVersionPathSegments = getProjectVersionPaths(
    { ...allContentData, docsPaths: docsPathsForThisBuild },
    { includeLanding: true },
  );

  // Landing's broad prefixes ('mdx/', 'image/', 'reference/') subsume every
  // project-specific prefix — scanning both would cause duplicate store.delete calls.
  if (projectVersionPathSegments.includes('')) {
    return BLOB_TYPES.map((blobType) => `${blobType}/`);
  }

  return BLOB_TYPES.flatMap((blobType) =>
    projectVersionPathSegments.map((pathSegment) => `${blobType}/${pathSegment}`),
  );
}

/**
 * Resolves which project-version path segment owns a full blob key (drops the leading blob-type segment).
 * Pass `allSortedProjectPaths` longest-first so nested paths beat shorter prefixes. Exported for unit tests.
 */
export function findOwningProjectPath(
  blobKey: string,
  allSortedProjectPaths: string[],
): string | null {
  const slashIdx = blobKey.indexOf('/');
  if (slashIdx === -1) return null;
  const keyBody = blobKey.slice(slashIdx + 1); // strip blob-type segment
  const namedPaths = allSortedProjectPaths.filter(p => p !== '');
  for (const projectPath of allSortedProjectPaths) {
    if (projectPath === '') {
      // Landing catch-all: only claim this blob if its first path segment does NOT
      // match the first segment of any named project path. A blob like
      // mdx/manual/deleted-version/page.mdx has first segment 'manual', which
      // collides with 'manual/v8.0' — it belongs to that project family, not landing.
      const segEnd = keyBody.indexOf('/');
      const firstSeg = segEnd === -1 ? keyBody : keyBody.slice(0, segEnd);
      const collidesWithNamedProject = namedPaths.some(
        p => p === firstSeg || p.startsWith(firstSeg + '/'),
      );
      return collidesWithNamedProject ? null : '';
    }
    if (keyBody.startsWith(projectPath + '/') || keyBody === projectPath) {
      return projectPath;
    }
  }
  return null;
}

/** Keys under `prefix` that belong to a rebuilt project but are missing from `expectedKeys` (true orphans). */
async function listOrphanedKeysUnderPrefix(
  store: Store,
  prefix: string,
  expectedKeys: Set<string>,
  allSortedProjectPaths: string[],
  rebuiltProjectPaths: Set<string>,
): Promise<string[]> {
  const orphanKeys: string[] = [];
  for await (const { blobs } of store.list({ prefix, paginate: true })) {
    for (const blob of blobs) {
      const owner = findOwningProjectPath(blob.key, allSortedProjectPaths);
      if (owner === null || !rebuiltProjectPaths.has(owner)) continue;
      if (!expectedKeys.has(blob.key)) {
        console.log(`[blob cleanup] Orphan key: ${blob.key} → owner: ${owner}`);
        orphanKeys.push(blob.key);
      }
    }
  }
  return orphanKeys;
}

/**
 * Finds orphan keys for one store prefix and deletes them from the store.
 * Returns how many keys were removed.
 */
async function deleteOrphansUnderPrefix(
  store: Store,
  prefix: string,
  expectedKeys: Set<string>,
  allSortedProjectPaths: string[],
  rebuiltProjectPaths: Set<string>,
): Promise<number> {
  const orphanKeys = await listOrphanedKeysUnderPrefix(
    store,
    prefix,
    expectedKeys,
    allSortedProjectPaths,
    rebuiltProjectPaths,
  );
  if (orphanKeys.length === 0) {
    return 0;
  }
  console.log(
    `[blob cleanup] prefix "${prefix}": deleting ${orphanKeys.length} orphaned blob(s)`,
  );
  for (const key of orphanKeys) {
    console.log(`[blob cleanup] deleting ${key}`);
  }
  await Promise.all(orphanKeys.map((key) => store.delete(key)));
  return orphanKeys.length;
}

/** Runs `deleteOrphansUnderPrefix` for every prefix with limited concurrency; returns total orphan count. */
async function deleteOrphansAcrossPrefixes({
  store,
  expectedKeys,
  prefixes,
  allSortedProjectPaths,
  rebuiltProjectPaths,
}: {
  store: Store;
  expectedKeys: Set<string>;
  prefixes: string[];
  allSortedProjectPaths: string[];
  rebuiltProjectPaths: Set<string>;
}): Promise<number> {
  console.log(`[blob cleanup] Deleting orphans across ${prefixes.length} prefix(es)`);
  const limitConcurrency = pLimit(MAX_CONCURRENT_PREFIX_SCANS);

  const deletedCountPerPrefix = await Promise.all(
    prefixes.map((prefix) =>
      limitConcurrency(() =>
        deleteOrphansUnderPrefix(store, prefix, expectedKeys, allSortedProjectPaths, rebuiltProjectPaths),
      ),
    ),
  );

  return deletedCountPerPrefix.reduce((total, count) => total + count, 0);
}

/**
 * Scans the Netlify blob store for keys this build no longer expects (mdx, image, and reference prefixes), then deletes them.
 * No-ops when there is nothing to compare or no prefixes. Errors during cleanup are caught so the build still completes.
 */
export async function deleteOrphanedFilesFromBlobStore({
  relativeFilePaths,
  allContentData,
  store,
}: {
  relativeFilePaths: string[];
  allContentData: AllContentData;
  store: Store;
}): Promise<void> {
  console.log(`[blob cleanup] Deleting orphaned files from blob store`);
  if (relativeFilePaths.length === 0) {
    console.log(`[blob cleanup] No content changed or parsed in most recent commit`);
    return;
  }

  const expectedKeys = buildExpectedBlobKeys(
    relativeFilePaths,
    allContentData,
  );

  console.log(`[blob cleanup] Expected keys: ${expectedKeys.size}`);

  const prefixes = prefixesToListForOrphanScan(allContentData);

  console.log(`[blob cleanup] Prefixes: ${prefixes}`);

  if (prefixes.length === 0) {
    console.log(`[blob cleanup] No prefixes found`);
    return;
  }

  // Derive rebuiltProjectPaths from pathsToBuild directly rather than back-computing
  // from the scan prefixes. When landing is in the build the dedup shortcut returns
  // only broad prefixes ('mdx/', …), which would lose named-project paths from the set.
  const pathsBeingRebuilt = new Set(allContentData.pathsToBuild);
  const rebuiltProjectPaths = new Set(
    getProjectVersionPaths(
      {
        ...allContentData,
        docsPaths: Object.fromEntries(
          Object.entries(allContentData.docsPaths).filter(([k]) =>
            pathsBeingRebuilt.has(k),
          ),
        ),
      },
      { includeLanding: true },
    ),
  );

  console.log(
    `[blob cleanup] Scanning ${prefixes.length} prefix(es) for orphaned blobs`,
  );
  const allSortedProjectPaths = getProjectVersionPaths(allContentData, { includeLanding: true })
    .sort((a, b) => b.length - a.length);

  console.log(
    `[blob cleanup] Number of project version paths(sorted longest-first): (${allSortedProjectPaths.length}):`,
  );
  console.log(
    `[blob cleanup] rebuiltProjectPaths:`,
    [...rebuiltProjectPaths],
  );

  try {
    const orphanCount = await deleteOrphansAcrossPrefixes({
      store,
      expectedKeys,
      prefixes,
      allSortedProjectPaths,
      rebuiltProjectPaths,
    });
    console.log(
      `[blob cleanup] Finished: deleted ${orphanCount} orphaned blob(s)`,
    );
  } catch (err) {
    console.error(
      '[blob cleanup] Error during orphaned blob deletion (non-fatal):',
      err,
    );
  }
}
