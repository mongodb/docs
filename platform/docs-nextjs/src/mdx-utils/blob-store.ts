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

function initBranchSpecificStore(): { store: Store; name: string } | null {
  try {
    const branch = process.env.NEXT_PUBLIC_GIT_BRANCH || null;
    if (!branch || branch === 'main') return null;
    const storeName = `${branch}-mdx-content`;
    const store = isDev
      ? getStore(storeName)
      : getStore({
          name: storeName,
          siteID: process.env.NETLIFY_SITE_ID,
          token: process.env.NETLIFY_ACCESS_TOKEN,
        });
    return { store, name: storeName };
  } catch {
    return null;
  }
}

const branchStoreResult = initBranchSpecificStore();
export const branchSpecificStore: Store | null = branchStoreResult?.store ?? null;
export const branchSpecificStoreName: string | null = branchStoreResult?.name ?? null;
