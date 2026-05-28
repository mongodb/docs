import { getStore, type Store } from '@netlify/blobs';
import { BLOB_STORE_NAME } from './blob-constants';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { createLocalFileStore } from './blob-store-local-file';

const isDev = process.env.NODE_ENV === 'development';

// Netlify sets NETLIFY=true in its build container, so we use it to distinguish
// "offline build running on Netlify CI" (e.g. the nextjs-extension invoking
// `pnpm run build:offline`) from "offline build running on a developer machine".
// On Netlify we want the remote production store; locally we want the seeded
// `.netlify/blobs-serve/` sandbox on disk.
const isNetlifyBuild = process.env.NETLIFY === 'true';
const useLocalFileStore = isOfflineBuild && !isNetlifyBuild;

export const productionStore: Store = useLocalFileStore
  ? createLocalFileStore()
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
