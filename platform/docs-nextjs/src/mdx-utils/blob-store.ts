import { getStore } from '@netlify/blobs';
import { BLOB_STORE_NAME } from './blob-constants';

const isDev = process.env.NODE_ENV === 'development';

export const store = isDev
  ? getStore(BLOB_STORE_NAME)
  : getStore({
      name: BLOB_STORE_NAME,
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_ACCESS_TOKEN,
    });
