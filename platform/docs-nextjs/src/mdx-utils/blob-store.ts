import { getStore, type Store } from '@netlify/blobs';
import { BLOB_STORE_NAME } from './blob-constants';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

const isDev = process.env.NODE_ENV === 'development';

// This cast is to prevent netlify blob store from throwing an error in offline builds as a result of not having a siteID or token.
export const productionStore: Store = isOfflineBuild
  ? (null as unknown as Store)
  : isDev
  ? getStore(BLOB_STORE_NAME)
  : getStore({
      name: BLOB_STORE_NAME,
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_ACCESS_TOKEN,
    });

function initBranchSpecificStore(): { store: Store; name: string } | null {
  if (isOfflineBuild) return null;
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
