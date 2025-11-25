export const isCurrentPage = (currentUrl: string, slug = '') => {
  const trimSlashes = (str: string) => str.replace(/^\/|\/$/g, '');
  if (!currentUrl || !slug) return false;
  return trimSlashes(currentUrl) === trimSlashes(slug);
};
