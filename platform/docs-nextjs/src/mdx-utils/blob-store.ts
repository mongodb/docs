import { getStore, type Store } from '@netlify/blobs';
import { BLOB_STORE_NAME } from './blob-constants';

const isDev = process.env.NODE_ENV === 'development';

export const productionStore = isDev
  ? getStore(BLOB_STORE_NAME)
  : getStore({
      name: BLOB_STORE_NAME,
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_ACCESS_TOKEN,
    });

function initBranchSpecificStore(): Store | null {
  try {
    const branch = process.env.NEXT_PUBLIC_GIT_BRANCH || null;
    if (!branch || branch === 'main') return null;
    const storeName = `${branch}-mdx-content`;
    return isDev
      ? getStore(storeName)
      : getStore({
          name: storeName,
          siteID: process.env.NETLIFY_SITE_ID,
          token: process.env.NETLIFY_ACCESS_TOKEN,
        });
  } catch {
    return null;
  }
}

export const branchSpecificStore = initBranchSpecificStore();
