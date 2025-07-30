export const assertTrailingSlash = (url: string) => {
  if (url && url.match(/\/$/)) {
    return url;
  }
  return `${url}/`;
};
