import path from 'path';

export const CONTENT_MDX_DIR = path.join(process.cwd(), '..', '..', 'content-mdx');

export const getRelativePath = (fullPath: string) => path.relative(CONTENT_MDX_DIR, fullPath);
