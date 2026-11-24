import path from 'path';

export const BLOB_STORE_NAME = process.env.NETLIFY_BLOB_STORE || 'mdx-content';
export const CONTENT_MDX_DIR = path.join(process.cwd(), '..', '..', 'content-mdx');
