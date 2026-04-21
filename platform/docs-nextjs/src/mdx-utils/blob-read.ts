import path from 'path';
import fs from 'fs/promises';
import type { Store } from '@netlify/blobs';
import { productionStore, branchSpecificStore } from './blob-store';
import { blobRelativeToDiskCandidates, loadDirNameToPrefixMap } from './blob-path-remap';

const BUILD_STATIC_PAGES = process.env.BUILD_STATIC_PAGES === 'true';
const CONTENT_MDX_DIR = process.env.CONTENT_MDX_DIR;

/** Key → path under CONTENT_MDX_DIR (strip "mdx/", "image/", etc.). */
function keyToLocalPath(key: string): string {
  return key.slice(key.indexOf('/') + 1);
}

/** Try branchSpecificStore first, fall back to productionStore. */
async function getFromStores(key: string, type: 'string' | 'blob'): Promise<string | Blob | null> {
  const stores: Store[] = branchSpecificStore !== null ? [branchSpecificStore, productionStore] : [productionStore];

  for (const store of stores) {
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
      if (msg.toLowerCase().includes('not found') || msg.includes('404') || msg.includes('no such key')) {
        continue;
      }
      throw error;
    }
  }
  return null;
}

/** Read from local filesystem when building static pages. */
async function readLocalFile(key: string): Promise<Buffer | null> {
  if (!CONTENT_MDX_DIR) {
    throw new Error('CONTENT_MDX_DIR is required when BUILD_STATIC_PAGES is true.');
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

export const getBlobString = async (key: string): Promise<string | null> => {
  if (BUILD_STATIC_PAGES) {
    const buf = await readLocalFile(key);
    return buf ? buf.toString('utf-8') : null;
  }
  return getFromStores(key, 'string') as Promise<string | null>;
};

export const getBlob = async (key: string): Promise<Blob | null> => {
  if (BUILD_STATIC_PAGES) {
    const buf = await readLocalFile(key);
    return buf ? new Blob([new Uint8Array(buf)]) : null;
  }
  return getFromStores(key, 'blob') as Promise<Blob | null>;
};
