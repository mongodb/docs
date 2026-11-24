import path from 'path';
import { CONTENT_MDX_DIR } from './blob-constants';

export const getRelativePath = (fullPath: string) => path.relative(CONTENT_MDX_DIR, fullPath);
