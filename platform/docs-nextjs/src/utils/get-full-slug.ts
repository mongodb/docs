import { removeLeadingSlash } from './remove-leading-slash';
import { removeTrailingSlash } from './remove-trailing-slash';
import { isBrowser } from './is-browser';
import { getAvailableLanguages } from './locale';

// Getting a list of the available languages
const langArray = getAvailableLanguages(true).map((lang) => lang.localeCode);

// Get the full slug including the path prefix
export const getFullSlug = (initialSlug: string, pathPrefix: string): string => {
  const tempSlug = isBrowser ? removeLeadingSlash(removeTrailingSlash(window.location.pathname)) : initialSlug;
  const hasLang = langArray.some(
    (lang) =>
      removeLeadingSlash(tempSlug)?.startsWith(lang + '/') || removeLeadingSlash(tempSlug)?.startsWith(lang + '/'),
  );

  const alreadyCompleteSlug = tempSlug?.startsWith('docs/') || hasLang ? tempSlug : null;
  const withPathPrefixSlug = tempSlug === '/' || tempSlug === '' ? pathPrefix + tempSlug : `${pathPrefix}/${tempSlug}/`;

  const fullSlug = alreadyCompleteSlug ? alreadyCompleteSlug : withPathPrefixSlug;

  return fullSlug;
};
