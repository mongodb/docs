import path from 'path';
import fs from 'fs/promises';
import { cache } from './react-cache';
import type { Store } from '@netlify/blobs';
import { productionStore, branchSpecificStore, branchSpecificStoreName } from './blob-store';
import { BLOB_STORE_NAME } from './blob-constants';
import { blobRelativeToDiskCandidates, loadDirNameToPrefixMap } from './blob-path-remap';

const BUILD_STATIC_PAGES = process.env.BUILD_STATIC_PAGES === 'true';
const CONTENT_MDX_DIR = process.env.CONTENT_MDX_DIR;

/** Key → path under CONTENT_MDX_DIR (strip "mdx/", "image/", etc.). */
function keyToLocalPath(key: string): string {
  return key.slice(key.indexOf('/') + 1);
}

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

/** Read from local CONTENT_MDX_DIR using blob-key → disk path mapping. Returns null if unset or missing. */
async function readLocalFile(key: string): Promise<Buffer | null> {
  if (!CONTENT_MDX_DIR) {
    return null;
  }
  const blobRelative = keyToLocalPath(key);
  const map = await loadDirNameToPrefixMap();
  const candidates = blobRelativeToDiskCandidates(blobRelative, map);
  for (const rel of candidates) {
    try {
      return await fs.readFile(path.join(CONTENT_MDX_DIR, rel));
    } catch (err) {
      const isENOENT = err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT';
      if (isENOENT) continue;
      throw err;
    }
  }
  return null;
}

export const getBlobString = cache(async (key: string): Promise<string | null> => {
  if (BUILD_STATIC_PAGES) {
    if (!CONTENT_MDX_DIR) {
      throw new Error('CONTENT_MDX_DIR is required when BUILD_STATIC_PAGES is true.');
    }
    const buf = await readLocalFile(key);
    return buf ? buf.toString('utf-8') : null;
  }
  const fromStore = (await getFromStores(key, 'string')) as string | null;
  if (fromStore) return fromStore;
  // Blobs may omit `reference/.../_references.json` while MDX is present; use local content-mdx when set.
  const buf = await readLocalFile(key);
  return buf ? buf.toString('utf-8') : null;
});

export const getBlob = async (key: string): Promise<Blob | null> => {
  if (BUILD_STATIC_PAGES) {
    if (!CONTENT_MDX_DIR) {
      throw new Error('CONTENT_MDX_DIR is required when BUILD_STATIC_PAGES is true.');
    }
    const buf = await readLocalFile(key);
    return buf ? new Blob([new Uint8Array(buf)]) : null;
  }
  const fromStore = (await getFromStores(key, 'blob')) as Blob | null;
  if (fromStore) return fromStore;
  const buf = await readLocalFile(key);
  return buf ? new Blob([new Uint8Array(buf)]) : null;
};
