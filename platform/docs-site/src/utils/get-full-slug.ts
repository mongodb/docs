import { removeLeadingSlash } from './remove-leading-slash';
import { removeTrailingSlash } from './remove-trailing-slash';
import { getAvailableLanguages, stripLocale } from './locale';
import { isBrowser } from './is-browser';

export const getFullSlug = (initialSlug: string, pathPrefix: string): string => {
  // In browser, derive slug from the actual URL so Smartling locale-prefixed pages
  // always get the correct locale-free slug regardless of CDN rewrite format.
  const rawSlug = isBrowser
    ? removeLeadingSlash(removeTrailingSlash(stripLocale(window.location.pathname)))
    : removeLeadingSlash(initialSlug);

  let cleanedSlug = rawSlug;

  if (cleanedSlug === 'index') {
    cleanedSlug = '';
  }

  const langArray = getAvailableLanguages(true).map((lang) => lang.localeCode);
  const hasLang = langArray.some((lang) => cleanedSlug?.startsWith(lang + '/'));
  const alreadyCompleteSlug = cleanedSlug?.startsWith('docs/') || hasLang;

  if (alreadyCompleteSlug) {
    return cleanedSlug;
  }

  if (rawSlug === '' || rawSlug === '/') {
    return pathPrefix;
  }

  return `${pathPrefix}/${cleanedSlug}`;
};
