import type { Store } from '@netlify/blobs';
import fs from 'node:fs/promises';
import path from 'node:path';
import pLimit from 'p-limit';
import type { AllContentData } from '../contentMetadata/processContentMetadata.js';
import {
  computeHash,
  getStoredMetadata,
  checkFileHashEquality,
} from './computeFileHash.js';
import { getDirNameToPrefix, remapFilePath } from './mapFilesToUrlPaths.js';
import {
  IMAGE_EXTENSIONS,
  constructBlobKey,
  uploadWithRetry,
} from './uploadIndividualBlob.js';

export async function handleAllBlobUploads({
  mdxOutputPath,
  relativeFilePaths,
  allContentData,
  branchStore,
  productionStore,
}: {
  mdxOutputPath: string;
  relativeFilePaths: string[];
  allContentData: AllContentData;
  branchStore: Store | false;
  productionStore: Store;
}): Promise<void> {
  const dirNameToPrefix = getDirNameToPrefix(allContentData);
  const stats: UploadStats = {
    counters: { uploaded: 0, skipped: 0, timestamped: 0 },
    failedUploads: [],
    uploadedKeys: [],
    failuresByCode: {},
  };

  const limit = pLimit(10);
  await Promise.allSettled(
    relativeFilePaths.map((f) =>
      limit(() =>
        processFile({
          relativeFilePath: f,
          mdxOutputPath,
          dirNameToPrefix,
          branchStore,
          productionStore,
          stats,
        }),
      ),
    ),
  );

  const { counters, failedUploads, uploadedKeys, failuresByCode } = stats;
  console.log(
    `[blob upload] ${counters.uploaded} uploaded, ${counters.skipped} skipped (unchanged), ${counters.timestamped} re-uploaded (missing timestamp), ${failedUploads.length} failed`,
  );
  if (uploadedKeys.length > 0) {
    console.log(
      `[blob upload] Sample uploaded keys: ${uploadedKeys.join(', ')}`,
    );
  }
  if (failedUploads.length > 0) {
    console.error('[blob upload] Failures by error type:');
    for (const [code, count] of Object.entries(failuresByCode)) {
      console.error(`  ${code}: ${count}`);
    }
  }
}

type Counters = { uploaded: number; skipped: number; timestamped: number };
type UploadStats = {
  counters: Counters;
  failedUploads: string[];
  uploadedKeys: string[];
  failuresByCode: Record<string, number>;
};

const processFile = async ({
  relativeFilePath,
  mdxOutputPath,
  dirNameToPrefix,
  branchStore,
  productionStore,
  stats,
}: {
  relativeFilePath: string;
  mdxOutputPath: string;
  dirNameToPrefix: Record<string, string>;
  branchStore: Store | false;
  productionStore: Store;
  stats: UploadStats;
}): Promise<void> => {
  const filePath = path.resolve(mdxOutputPath, relativeFilePath);
  const stat = await fs.stat(filePath);
  if (!stat.isFile()) return;

  const raw = await fs.readFile(filePath);
  const remappedPath = remapFilePath({
    filePath: relativeFilePath,
    dirNameToPrefix,
  });
  const key = constructBlobKey(remappedPath);
  const isImage = IMAGE_EXTENSIONS.some((ext) =>
    relativeFilePath.toLowerCase().endsWith(ext),
  );
  const uploadContent: string | ArrayBuffer = isImage
    ? (raw.buffer.slice(
        raw.byteOffset,
        raw.byteOffset + raw.byteLength,
      ) as ArrayBuffer)
    : raw.toString();
  const localHash = computeHash(isImage ? raw : raw.toString());

  if (!branchStore) {
    // On main, only the production store exists.
    const { hash, uploadedAt } = await getStoredMetadata(key, productionStore);
    if (
      await checkFileHashEquality({
        storedHash: hash,
        uploadedAt,
        store: productionStore,
        key,
        uploadContent,
        localHash,
        counters: stats.counters,
      })
    )
      return;
  } else {
    // On a branch, check branch store first, then fall back to production.
    const { hash: branchHash, uploadedAt: branchUploadedAt } =
      await getStoredMetadata(key, branchStore);
    if (
      await checkFileHashEquality({
        storedHash: branchHash,
        uploadedAt: branchUploadedAt,
        store: branchStore,
        key,
        uploadContent,
        localHash,
        counters: stats.counters,
      })
    )
      return;

    // If the blob isn't in the branch store yet, check if prod already has it.
    if (branchHash === null) {
      const { hash: prodHash, uploadedAt: prodUploadedAt } =
        await getStoredMetadata(key, productionStore);
      if (
        await checkFileHashEquality({
          storedHash: prodHash,
          uploadedAt: prodUploadedAt,
          store: productionStore,
          key,
          uploadContent,
          localHash,
          counters: stats.counters,
        })
      )
        return;
    }
  }

  // Content is new or changed — upload to branch store on a branch, production store on main.
  const errorCode = await uploadWithRetry(
    key,
    uploadContent,
    localHash,
    branchStore || productionStore,
  );
  if (errorCode === null) {
    stats.counters.uploaded++;
    if (stats.uploadedKeys.length < 5) stats.uploadedKeys.push(key);
  } else {
    stats.failedUploads.push(key);
    stats.failuresByCode[errorCode] =
      (stats.failuresByCode[errorCode] ?? 0) + 1;
  }
};
