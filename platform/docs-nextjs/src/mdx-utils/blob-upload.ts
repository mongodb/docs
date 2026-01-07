import path from 'path';
import fs from 'fs/promises';
import { store } from './blob-store';
import { getBlobKey } from './get-blob-key';
import { MDX_EXTENSION, JSON_EXTENSION } from './get-blob-key';

export const CONTENT_MDX_DIR = path.join(process.cwd(), '..', '..', 'content-mdx');

/** get the relative path from the content-mdx directory */
export const getRelativePath = (fullPath: string) => {
  return path.relative(CONTENT_MDX_DIR, fullPath);
};

/** upload a file to the blob store */
export const uploadFile = async (fullPath: string) => {
  try {
    const relativePath = getRelativePath(fullPath);
    const blobKey = getBlobKey(relativePath);

    const content = await fs.readFile(fullPath);
    const extension = path.extname(fullPath);

    if ([MDX_EXTENSION, JSON_EXTENSION].includes(extension)) {
      await store.set(blobKey, content.toString());
    } else {
      // images need to be uploaded as array buffers, not simply strings
      const arrayBuffer = content.buffer.slice(
        content.byteOffset,
        content.byteOffset + content.byteLength,
      ) as ArrayBuffer;

      await store.set(blobKey, arrayBuffer);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

/** delete a file from the blob store */
export const deleteFile = async (fullPath: string) => {
  try {
    const relativePath = getRelativePath(fullPath);
    const blobKey = getBlobKey(relativePath);

    await store.delete(blobKey);

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};
