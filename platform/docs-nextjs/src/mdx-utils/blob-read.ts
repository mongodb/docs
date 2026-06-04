import { cache } from './react-cache';
import type { Store } from '@netlify/blobs';
import { productionStore, branchSpecificStore, branchSpecificStoreName } from './blob-store';
import { BLOB_STORE_NAME } from './blob-constants';
import { getBlobKey, getBlobKeyOriginalCase } from './get-blob-key';

/**
 * Thrown when a blob read fails for a reason other than the key being absent
 * (timeouts, 5xx, connection resets — i.e. transient infrastructure errors).
 * A genuinely-missing key returns `null` instead of throwing. Callers use this
 * type to tell "page does not exist" (a legitimate, cacheable 404) apart from
 * "storage hiccup" (must NOT be frozen into a cached 404).
 */
export class BlobStoreReadError extends Error {
  readonly key: string;
  constructor(key: string, attemptedStores: string, cause: unknown) {
    const causeMsg = cause instanceof Error ? cause.message : String(cause);
    super(`Blob store read failed for key "${key}" (stores: ${attemptedStores}): ${causeMsg}`);
    this.name = 'BlobStoreReadError';
    this.key = key;
    this.cause = cause;
  }
}

/** A "not found" response is a legitimate miss, not a transient failure. */
const isNotFoundError = (msg: string): boolean =>
  msg.toLowerCase().includes('not found') ||
  msg.includes('404') ||
  msg.includes('401') ||
  msg.includes('no such key');

/** Try branchSpecificStore first, fall back to productionStore. */
async function getFromStores(key: string, type: 'string' | 'blob'): Promise<string | Blob | null> {
  const storeEntries: Array<{ store: Store; name: string }> =
    branchSpecificStore !== null
      ? [
          { store: branchSpecificStore, name: branchSpecificStoreName! },
          { store: productionStore, name: BLOB_STORE_NAME },
        ]
      : [{ store: productionStore, name: BLOB_STORE_NAME }];

  for (const { store } of storeEntries) {
    try {
      if (type === 'blob') {
        const result = await store.get(key, { type: 'blob' });
        if (result) return result;
      } else {
        const result = await store.get(key, { type: 'text' });
        if (result) return result;
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      if (isNotFoundError(msg)) {
        continue;
      }
      const attempted = storeEntries.map((e) => `"${e.name}"`).join(', ');
      console.error(`Blob store error for key "${key}", attempted stores: ${attempted}`);
      throw new BlobStoreReadError(key, attempted, error);
    }
  }
  return null;
}

export const getBlobString = cache(async (key: string): Promise<string | null> => {
  return (await getFromStores(key, 'string')) as string | null;
});

export const getBlob = async (key: string): Promise<Blob | null> => {
  return (await getFromStores(key, 'blob')) as Blob | null;
};

/**
 * Try lowercase key first; if not found, fall back to the original-case key and warn.
 * Remove this and all call sites once the blob store is fully migrated to lowercase keys.
 */
export const getBlobStringWithFallback = async (relativePath: string): Promise<string | null> => {
  const key = getBlobKey(relativePath);
  const result = await getBlobString(key);
  if (result !== null) return result;

  const fallbackKey = getBlobKeyOriginalCase(relativePath);
  if (fallbackKey !== key) {
    const fallback = await getBlobString(fallbackKey);
    if (fallback !== null) {
      console.warn(`[blob-read] camelCase fallback used for "${key}" — safe to remove once all blobs are migrated to lowercase`);
      return fallback;
    }
  }
  return null;
};

/** Same as getBlobStringWithFallback but for binary Blob responses */
export const getBlobWithFallback = async (relativePath: string): Promise<Blob | null> => {
  const key = getBlobKey(relativePath);
  const result = await getBlob(key);
  if (result !== null) return result;

  const fallbackKey = getBlobKeyOriginalCase(relativePath);
  if (fallbackKey !== key) {
    const fallback = await getBlob(fallbackKey);
    if (fallback !== null) {
      console.warn(`[blob-read] camelCase fallback used for "${key}" — safe to remove once all blobs are migrated to lowercase`);
      return fallback;
    }
  }
  return null;
};
