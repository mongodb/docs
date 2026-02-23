import { getStore } from '@netlify/blobs';

export const BLOB_STORE_NAME = process.env.NETLIFY_BLOB_STORE || 'mdx-content';

const isDev = process.env.NODE_ENV === 'development';

export const store = isDev
  ? getStore(BLOB_STORE_NAME)
  : getStore({
      name: BLOB_STORE_NAME,
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_ACCESS_TOKEN,
    });
