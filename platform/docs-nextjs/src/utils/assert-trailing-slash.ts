export const assertTrailingSlash = (url: string) => {
  if (!url) {
    return `${url}/`;
  }
  // Split off any query string or hash fragment so the trailing slash is added to the
  // path, not after a `?query` or `#fragment`. Appending a slash after a fragment (e.g.
  // `/path/#anchor/`) corrupts the anchor id and breaks in-page navigation.
  const splitIdx = url.search(/[?#]/);
  const path = splitIdx === -1 ? url : url.slice(0, splitIdx);
  const suffix = splitIdx === -1 ? '' : url.slice(splitIdx);
  if (path.match(/\/$/)) {
    return `${path}${suffix}`;
  }
  return `${path}/${suffix}`;
};
