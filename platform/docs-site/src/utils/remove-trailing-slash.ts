const removeTrailingSlash = (url: string): string => {
  if (url && url.endsWith('/')) {
    return url.replace(/\/$/, '');
  }

  return url;
};

export { removeTrailingSlash };
