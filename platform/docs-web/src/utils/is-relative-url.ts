export const isRelativeUrl = (url: string) => {
  // Assume that external links begin with http:// or https://
  const absolute = /^http(s)?:\/\//.test(url) || url.startsWith('mailto:');
  return !absolute;
};
