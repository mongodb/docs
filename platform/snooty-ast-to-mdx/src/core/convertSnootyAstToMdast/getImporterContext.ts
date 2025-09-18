import { posix as path } from 'node:path';
import type { ConversionContext } from './types';

export const getImporterContext = (ctx: ConversionContext) => {
  const importerPosix = path.normalize(ctx.currentOutfilePath || 'index.mdx');
  const importerDir = path.dirname(importerPosix);
  return { importerPosix, importerDir };
};
