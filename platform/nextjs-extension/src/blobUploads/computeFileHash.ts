import type { Store } from '@netlify/blobs';
import crypto from 'node:crypto';
import { uploadWithRetry } from './uploadIndividualBlob';

export const computeHash = (content: string | Buffer): string =>
  crypto.createHash('sha256').update(content).digest('hex');

export const getStoredMetadata = async (
  key: string,
  store: Store,
): Promise<{ hash: string | null; uploadedAt: string | null }> => {
  try {
    const meta = await store.getMetadata(key);
    return {
      hash: (meta?.metadata?.hash as string) ?? null,
      uploadedAt: (meta?.metadata?.uploadedAt as string) ?? null,
    };
  } catch {
    return { hash: null, uploadedAt: null };
  }
};

// Returns true if the file was handled (skipped or timestamped), false if it needs uploading.
export const checkFileHashEquality = async ({
  storedHash,
  uploadedAt,
  store,
  key,
  uploadContent,
  localHash,
  counters,
}: {
  storedHash: string | null;
  uploadedAt: string | null;
  store: Store;
  key: string;
  uploadContent: string | ArrayBuffer;
  localHash: string;
  counters: { skipped: number; timestamped: number };
}): Promise<boolean> => {
  if (storedHash !== localHash) return false;
  // TODO: Remove timestamp re-upload once all blobs are timestamped.
  if (!uploadedAt) {
    await uploadWithRetry(key, uploadContent, localHash, store);
    counters.timestamped++;
  } else {
    counters.skipped++;
  }
  return true;
};
