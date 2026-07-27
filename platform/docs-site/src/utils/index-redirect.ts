import { getBasePath } from '@/utils/base-path';

/** If the last URL segment is "index", return the canonical parent path to redirect to.
 * e.g. <basePath>/atlas/index → <basePath>/atlas/
 *      <basePath>/index       → <basePath>/
 * `rawPath` is the basePath-relative route param (before normalization) so that
 * the basePath root (params.path = undefined) is never confused with
 * `<basePath>/index` (params.path = ['index']). The returned target includes
 * basePath because permanentRedirect does not prepend it. */
export const getIndexRedirectTarget = (rawPath: string[] | undefined): string | null => {
  if (!rawPath || rawPath[rawPath.length - 1] !== 'index') return null;
  const parent = rawPath.slice(0, -1);
  const basePath = getBasePath();
  return parent.length > 0 ? `${basePath}/${parent.join('/')}/` : `${basePath}/`;
};
