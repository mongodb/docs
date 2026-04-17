/** Strip leading "docs/" or "docs" from an Atlas prefix */
export const stripDocsPrefix = (prefix: string): string => {
  if (prefix === 'docs') return '';
  if (prefix.startsWith('docs/')) return prefix.slice(5);
  return prefix;
};
