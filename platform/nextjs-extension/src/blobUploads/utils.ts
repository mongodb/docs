/** Strip leading "docs/" or "docs" from an Atlas prefix */
export const stripDocsPrefix = (prefix: string): string => {
  // strip leading "docs/" or "/docs/"
  if (/^\/?docs\//.test(prefix)) return prefix.replace(/^\/?docs\//, '');
  return prefix;
};
