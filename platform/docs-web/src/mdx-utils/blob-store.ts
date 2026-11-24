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

function getStoreForNextApp(name: string): Store {
  try {
    return getStore(name);
  } catch {
    console.error('Error getting store for Next.js app, using siteID and token from environment variables');
    return getStore({
      name,
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_ACCESS_TOKEN,
    });
  }
}

export function getProductionStore(): Store {
  return useLocalFileStore
    ? createLocalFileStore()
    : getStoreForNextApp(BLOB_STORE_NAME);
}

export function getBranchStore(): { store: Store; name: string } | null {
  if (isOfflineBuild) return null;
  try {
    const branch = process.env.NEXT_PUBLIC_GIT_BRANCH || null;
    if (!branch || branch === 'main') return null;
    const storeName = `${branch}-mdx-content`;
    const store = getStoreForNextApp(storeName);
    return { store, name: storeName };
  } catch {
    return null;
  }
}
