import { removeLeadingSlash } from './remove-leading-slash';
import { getAvailableLanguages } from './locale';

const langArray = getAvailableLanguages(true).map((lang) => lang.localeCode);

export const getFullSlug = (initialSlug: string, pathPrefix: string): string => {
  let cleanedSlug = removeLeadingSlash(initialSlug);

  if (cleanedSlug === 'index') {
    cleanedSlug = '';
  }

  // Check if slug already starts with docs/ or has a language prefix
  const hasLang = langArray.some((lang) => cleanedSlug?.startsWith(lang + '/'));
  const alreadyCompleteSlug = cleanedSlug?.startsWith('docs/') || hasLang;

  if (alreadyCompleteSlug) {
    return cleanedSlug;
  }

  if (initialSlug === '/' || initialSlug === '') {
    return pathPrefix;
  }

  return `${pathPrefix}/${cleanedSlug}`;
};
