/** Strip leading "docs/", "/docs/", "docs", or "/docs" from an Atlas prefix */
export const stripDocsPrefix = (prefix: string): string =>
  prefix.replace(/^\/?docs(\/|$)/, '');
