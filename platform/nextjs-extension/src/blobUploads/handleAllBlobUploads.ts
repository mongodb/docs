import type { Store } from '@netlify/blobs';
import fs from 'node:fs/promises';
import path from 'node:path';
import pLimit from 'p-limit';
import type { AllContentData } from '../contentMetadata/processContentMetadata.js';
import { computeHash, getStoredHash } from './computeFileHash.js';
import { getDirNameToPrefix, remapFilePath } from './mapFilesToUrlPaths.js';
import { IMAGE_EXTENSIONS, constructBlobKey, uploadWithRetry } from './uploadIndividualBlob.js';

export async function handleAllBlobUploads({
  mdxOutputPath,
  relativeFilePaths,
  allContentData,
  isMain,
  mdxContentStore,
  productionStore,
}: {
  mdxOutputPath: string;
  relativeFilePaths: string[];
  allContentData: AllContentData;
  isMain: boolean;
  mdxContentStore: Store;
  productionStore: Store;
}): Promise<void> {
  const dirNameToPrefix = getDirNameToPrefix(allContentData);

  let uploaded = 0;
  let skipped = 0;
  const failedUploads: string[] = [];
  const uploadedKeys: string[] = [];
  const failuresByCode: Record<string, number> = {};

  const processFile = async (relativeFilePath: string) => {
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
      ? (raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength) as ArrayBuffer)
      : raw.toString();
    const localHash = computeHash(isImage ? raw : raw.toString());

    if (isMain) {
      const prodHash = await getStoredHash(key, mdxContentStore);
      if (prodHash === localHash) {
        skipped++;
        return;
      }
    } else {
      const branchHash = await getStoredHash(key, mdxContentStore);
      if (branchHash === localHash) {
        skipped++;
        return;
      }
      if (branchHash === null) {
        const prodHash = await getStoredHash(key, productionStore);
        if (prodHash === localHash) {
          skipped++;
          return;
        }
      }
    }

    const errorCode = await uploadWithRetry(
      key,
      uploadContent,
      localHash,
      mdxContentStore,
    );
    if (errorCode === null) {
      uploaded++;
      if (uploadedKeys.length < 5) uploadedKeys.push(key);
    } else {
      failedUploads.push(key);
      failuresByCode[errorCode] = (failuresByCode[errorCode] ?? 0) + 1;
    }
  };

  const limit = pLimit(10);
  await Promise.allSettled(
    relativeFilePaths.map((f) => limit(() => processFile(f))),
  );

  console.log(
    `[blob upload] ${uploaded} uploaded, ${skipped} skipped (unchanged), ${failedUploads.length} failed`,
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
