import path from 'path';
import fs from 'fs/promises';
import { CONTENT_MDX_DIR } from './content-constants';

export const getContentString = async (relativePath: string): Promise<string | null> => {
  try {
    const buf = await fs.readFile(path.join(CONTENT_MDX_DIR, relativePath));
    return buf.toString('utf-8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
};
