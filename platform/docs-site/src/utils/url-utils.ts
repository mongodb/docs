import { DOTCOM_BASE_URL } from '@/constants';
import { assertTrailingSlash } from './assert-trailing-slash';
import { generateVersionedPrefix } from './generate-versioned-prefix';
import { localizePath } from './locale';

export const getUrl = (branchUrlSlug: string | undefined, project: string, siteBasePrefix: string, slug?: string) => {
  if (branchUrlSlug === 'legacy') {
    // Avoid trailing slash to ensure query param remains valid
    return localizePath(`/docs/legacy/?site=${project}`);
  }
  const prefixWithVersion = generateVersionedPrefix(siteBasePrefix, branchUrlSlug);
  return assertTrailingSlash(localizePath(`${prefixWithVersion}/${slug}`));
};

export const getCompleteUrl = (path: string) => {
  return joinUrlAndPath(DOTCOM_BASE_URL, path);
};

// Used to safely join together a url (or subpath) with another path
const joinUrlAndPath = (url: string, path: string) => {
  const needsTrim = url.endsWith('/') && path.startsWith('/');
  const needsSlash = !url.endsWith('/') && !path.startsWith('/');

  return needsTrim ? url.slice(0, -1) + path : needsSlash ? `${url}/${path}` : `${url}${path}`;
};
