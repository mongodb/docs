const assertLeadingSlash = (url: string) => {
  if (url && url.match(/^\//)) {
    return url;
  }
  return `/${url}`;
};

export { assertLeadingSlash };
