import type { Store } from '@netlify/blobs';
import crypto from 'node:crypto';

export const computeHash = (content: string | Buffer): string =>
  crypto.createHash('sha256').update(content).digest('hex');

export const getStoredMetadata = async (
  key: string,
  store: Store,
): Promise<{ hash: string | null }> => {
  try {
    const meta = await store.getMetadata(key);
    return { hash: (meta?.metadata?.hash as string) ?? null };
  } catch {
    return { hash: null };
  }
};

// Returns true if the file was handled (skipped), false if it needs uploading.
export const checkFileHashEquality = ({
  storedHash,
  localHash,
  counters,
}: {
  storedHash: string | null;
  localHash: string;
  counters: { skipped: number };
}): boolean => {
  if (storedHash !== localHash) return false;
  counters.skipped++;
  return true;
};
