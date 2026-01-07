import { getStore } from '@netlify/blobs';

export const BLOB_STORE_NAME = process.env.NETLIFY_BLOB_STORE || 'mdx-content';

export const store = getStore({
  name: BLOB_STORE_NAME,
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_ACCESS_TOKEN,
});
