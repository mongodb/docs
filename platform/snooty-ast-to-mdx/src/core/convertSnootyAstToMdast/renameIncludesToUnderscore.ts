/** Rename 'includes' directory to '_includes' in a path (works if nested as well) */
export const renameIncludesToUnderscore = (path: string): string => {
  return path.replace(/^includes\//, '_includes/').replace(/\/includes\//g, '/_includes/');
};
