import path from 'path';
import fs from 'fs/promises';
import { store } from './blob-store';

const BUILD_STATIC_PAGES = process.env.BUILD_STATIC_PAGES === 'true';
const CONTENT_MDX_DIR = process.env.CONTENT_MDX_DIR;

/** Key → path under CONTENT_MDX_DIR (strip "mdx/", "image/", etc.). */
function keyToLocalPath(key: string): string {
  return key.slice(key.indexOf('/') + 1);
}

export const getBlobString = async (key: string) => {
  if (BUILD_STATIC_PAGES) {
    if (!CONTENT_MDX_DIR) {
      throw new Error('CONTENT_MDX_DIR is required when BUILD_STATIC_PAGES is true.');
    }
    try {
      const buf = await fs.readFile(path.join(CONTENT_MDX_DIR, keyToLocalPath(key)));
      return buf.toString('utf-8');
    } catch (err) {
      const isENOENT = err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT';
      if (isENOENT) return null;
      throw err;
    }
  }
  try {
    const result = await store.get(key);
    if (!result) return null;
    return result.toString();
  } catch (error) {
    // Missing key: return null so callers can try alternatives (e.g. other project path candidates)
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.toLowerCase().includes('not found') || msg.includes('404') || msg.includes('no such key')) {
      return null;
    }
    throw error;
  }
};

export const getBlob = async (key: string) => {
  if (BUILD_STATIC_PAGES) {
    if (!CONTENT_MDX_DIR) {
      throw new Error('CONTENT_MDX_DIR is required when BUILD_STATIC_PAGES is true.');
    }
    try {
      const buf = await fs.readFile(path.join(CONTENT_MDX_DIR, keyToLocalPath(key)));
      return new Blob([new Uint8Array(buf)]);
    } catch (err) {
      const isENOENT = err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT';
      if (isENOENT) return null;
      throw err;
    }
  }
  try {
    const result = await store.get(key, { type: 'blob' });
    if (!result) throw new Error('not found');

    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return null;
    }
    throw error;
  }
};
