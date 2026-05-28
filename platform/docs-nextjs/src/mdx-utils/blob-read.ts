import { cache } from './react-cache';
import type { Store } from '@netlify/blobs';
import { productionStore, branchSpecificStore, branchSpecificStoreName } from './blob-store';
import { BLOB_STORE_NAME } from './blob-constants';

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
      if (
        msg.toLowerCase().includes('not found') ||
        msg.includes('404') ||
        msg.includes('401') ||
        msg.includes('no such key')
      ) {
        continue;
      }
      const attempted = storeEntries.map((e) => `"${e.name}"`).join(', ');
      console.error(`Blob store error for key "${key}", attempted stores: ${attempted}`);
      throw error;
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
