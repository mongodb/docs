import { assertLeadingSlash } from './assert-leading-slash';
import { assertTrailingSlash } from './assert-trailing-slash';

export const assertLeadingAndTrailingSlash = (url: string) => {
  return assertLeadingSlash(assertTrailingSlash(url));
};
