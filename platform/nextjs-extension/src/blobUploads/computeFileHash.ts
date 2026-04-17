import type { Store } from '@netlify/blobs';
import crypto from 'node:crypto';

export const computeHash = (content: string | Buffer): string =>
  crypto.createHash('sha256').update(content).digest('hex');

export const getStoredHash = async (
  key: string,
  store: Store,
): Promise<string | null> => {
  try {
    const meta = await store.getMetadata(key);
    return (meta?.metadata?.hash as string) ?? null;
  } catch {
    return null;
  }
};
