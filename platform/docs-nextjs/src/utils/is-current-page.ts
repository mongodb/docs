import { isOfflineBuild } from '@/utils/isOfflineBuild';

const trimSlashes = (str: string) => str.replace(/^\/|\/$/g, '');

/** Offline: strip /index.html and /mdx/ so pathname and slug can be compared. */
const normalizeForOffline = (str: string) => {
  let s = trimSlashes(str).replace(/\/index\.html$/i, '') || '';
  if (s.startsWith('mdx/')) s = s.replace(/^mdx\/?/, '');
  return s;
};

export const isCurrentPage = (currentUrl: string, slug = '') => {
  if (!currentUrl || !slug) return false;
  if (isOfflineBuild) {
    return normalizeForOffline(currentUrl) === normalizeForOffline(slug);
  }
  return trimSlashes(currentUrl) === trimSlashes(slug);
};
