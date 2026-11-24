import fs from 'node:fs/promises';
import path from 'node:path';
import type { Store } from '@netlify/blobs';

/**
 * Path layout that the local Netlify Blobs sandbox uses on disk. `netlify dev`
 * (and therefore `pnpm blobs:seed` / `pnpm blobs:watch`) writes blob entries
 * under this directory using the blob key as the relative path, e.g.
 *
 *   .netlify/blobs-serve/entries/unlinked/site:mdx-content/reference/<key>
 */
const LOCAL_BLOBS_ROOT = path.join(
  process.cwd(),
  '.netlify',
  'blobs-serve',
  'entries',
  'unlinked',
  'site:mdx-content',
);

type ResponseType = 'arrayBuffer' | 'blob' | 'json' | 'stream' | 'text';

const isNotFound = (err: unknown): boolean => (err as NodeJS.ErrnoException)?.code === 'ENOENT';

async function readKey(key: string, type: ResponseType | undefined): Promise<unknown> {
  const fullPath = path.join(LOCAL_BLOBS_ROOT, key);
  try {
    if (type === 'arrayBuffer') {
      const buf = await fs.readFile(fullPath);
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
    }
    if (type === 'blob') {
      const buf = await fs.readFile(fullPath);
      return new Blob([buf]);
    }
    if (type === 'json') {
      const text = await fs.readFile(fullPath, 'utf-8');
      return JSON.parse(text);
    }
    return await fs.readFile(fullPath, 'utf-8');
  } catch (err) {
    if (isNotFound(err)) return null;
    throw err;
  }
}

/**
 * Returns a minimal `Store`-shaped object that reads from the local Netlify
 * Blobs sandbox on disk (populated by `pnpm blobs:seed` / `blobs:watch`).
 *
 * Only `get` is implemented because offline builds (the only caller) never
 * `set`/`delete`/`list`. The returned object is cast to the full `Store`
 * type because the rest of the surface is unreachable in this code path.
 */
export function createLocalFileStore(): Store {
  const get = (key: string, options?: { type?: ResponseType }) => readKey(key, options?.type);
  return { get } as unknown as Store;
}
