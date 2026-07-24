/** If the last URL segment is "index", return the canonical parent path to redirect to.
 * e.g. /docs/atlas/index → /docs/atlas/
 *      /docs/index       → /docs/
 * Operates on raw params.path (before normalization) so that /docs/ (params.path =
 * undefined) is never confused with /docs/index (params.path = ['index']). */
export const getIndexRedirectTarget = (rawPath: string[] | undefined): string | null => {
  if (!rawPath || rawPath[rawPath.length - 1] !== 'index') return null;
  const parent = rawPath.slice(0, -1);
  return parent.length > 0 ? `/docs/${parent.join('/')}/` : '/docs/';
};
