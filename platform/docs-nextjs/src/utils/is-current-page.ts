import { isOfflineBuild } from '@/utils/isOfflineBuild';

const trimSlashes = (str: string) => str.replace(/^\/|\/$/g, '');

/** Offline: strip /index.html and /docs/ so pathname and slug can be compared. */
const normalizeForOffline = (str: string) => {
  let s = trimSlashes(str).replace(/\/index\.html$/i, '') || '';
  if (s.startsWith('docs/')) s = s.replace(/^docs\/?/, '');
  return s;
};

export const isCurrentPage = (currentUrl: string, slug = '') => {
  if (!currentUrl || !slug) return false;
  if (isOfflineBuild) {
    return normalizeForOffline(currentUrl) === normalizeForOffline(slug);
  }
  return trimSlashes(currentUrl) === trimSlashes(slug);
};
