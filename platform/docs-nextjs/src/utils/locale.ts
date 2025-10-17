import { SIDE_NAV_CONTAINER_ID, TEMPLATE_CONTAINER_ID } from '@/constants';
import { assertTrailingSlash } from './assert-trailing-slash';
import { isBrowser } from './is-browser';
import { normalizePath } from '@/utils/normalize-path';
import { removeLeadingSlash } from '@/utils/remove-leading-slash';

export type AvailableLocaleType = 'en-us' | 'pt-br' | 'es' | 'ko-kr' | 'ja-jp' | 'it-it' | 'de-de' | 'fr-fr' | 'zh-cn';

export type AvailableLanguageData = {
  language: string;
  localeCode: AvailableLocaleType;
  fontFamily?: string;
};

// Prevents Smartling from translating content within HTML block
// (https://help.smartling.com/hc/en-us/articles/13274689281307-Default-Translatable-Content-In-The-GDN)
export const NOTRANSLATE_CLASS = 'notranslate';

/**
 * Key used to access browser storage for user's preferred locale
 */
export const STORAGE_KEY_PREF_LOCALE = 'preferredLocale';
// Should be the same as what B2K expects
export const COOKIE_KEY_PREF_LOCALE = 'mdb_docsPrefLocale';

// Update this as more languages are introduced
// Because the client-side redirect script cannot use an import, PLEASE remember to update the list of supported languages
// in redirect-based-on-lang.js
const AVAILABLE_LANGUAGES: AvailableLanguageData[] = [
  { language: 'English', localeCode: 'en-us' },
  { language: '简体中文', localeCode: 'zh-cn', fontFamily: 'Noto Sans SC' },
  { language: '한국어', localeCode: 'ko-kr', fontFamily: 'Noto Sans KR' },
  { language: 'Português', localeCode: 'pt-br' },
  { language: '日本語', localeCode: 'ja-jp', fontFamily: 'Noto Sans JP' },
];

// GTM locale
export const BETA_LOCALE: { [key: string]: AvailableLanguageData } = {
  es: {
    language: 'Español',
    localeCode: 'es',
  },
};

// Languages in current development that we do not want displayed publicly yet
const HIDDEN_LANGUAGES: AvailableLanguageData[] = [BETA_LOCALE['es']];

/**
 * @param {boolean} forceAll - Bypasses feature flag requirements if necessary
 * @returns An array of languages supported for translation
 */
export const getAvailableLanguages = (forceAll = false) => {
  const langs = [...AVAILABLE_LANGUAGES];

  if (forceAll || process.env.GATSBY_FEATURE_SHOW_HIDDEN_LOCALES === 'true') {
    langs.push(...HIDDEN_LANGUAGES);
  }

  return langs;
};

const validateLocaleCode = (potentialCode: string) =>
  // Include hidden languages in validation to ensure current locale of hidden sites can still be captured correctly
  !!getAvailableLanguages(true).find(({ localeCode }) => potentialCode === localeCode);

/**
 * Strips the first locale code found in the slug. This function should be used to determine the original un-localized path of a page.
 * This assumes that the locale code is the first part of the URL slug. For example: "/zh-cn/docs/foo".
 * @param {string} slug
 * @returns {string}
 */
const stripLocale = (slug: string) => {
  // Smartling has extensive replace logic for URLs and slugs that follow the pattern of "https://www.mongodb.com/docs". However,
  // there are instances where we can't rely on them for certain components
  if (!slug) {
    return '';
  }

  // Normalize the slug in case any malformed slugs appear like: "//zh-cn/docs"
  const slugWithSlash = slug.startsWith('/') ? slug : `/${slug}`;
  const normalizedSlug = normalizePath(slugWithSlash);
  const firstPathSlug = normalizedSlug.split('/', 2)[1];

  // Replace from the original slug to maintain original form
  const res = validateLocaleCode(firstPathSlug) ? normalizePath(slug.replace(firstPathSlug, '')) : slug;
  if (res.startsWith('/') && !slug.startsWith('/')) {
    return removeLeadingSlash(res);
  } else if (!res.startsWith('/') && slug.startsWith('/')) {
    return `/${res}`;
  } else {
    return res;
  }
};

export const getAllLocaleCssStrings = () => {
  const strings: string[] = [];
  // We want to bypass feature flag requirements to ensure fonts for hidden languages are always included
  const allLangs = getAvailableLanguages(true);

  allLangs.forEach(({ localeCode, fontFamily }) => {
    if (!fontFamily) {
      return;
    }
    const [languageCode] = localeCode.split('-');
    // Only check that languageCode is in the beginning to be flexible when region code is capitalized
    // For example: zh-cn and zh-CN will be treated the same.
    // We want to target everything except for inline code, code blocks, and the consistent-nav components
    strings.push(`
      html[lang^=${languageCode}] {
        #${TEMPLATE_CONTAINER_ID} *:not(:is(code, code *)),
        #${SIDE_NAV_CONTAINER_ID} * {
          font-family: ${fontFamily};
        }

        // Italicized non-latin characters may look confusing, so we want to replace them with bold
        // without changing the source HTML tag (and potentially causing errors with Smartling)
        em,
        h1 .guilabel,
        h2 .guilabel,
        h3 .guilabel,
        h4 .guilabel,
        h5 .guilabel,
        h6 .guilabel {
          font-style: normal;
          font-weight: bold;
        }
      }
    `);
  });

  return strings;
};

/**
 * Returns the locale code based on the current location pathname of the page.
 */
export const getCurrLocale = (): AvailableLocaleType => {
  const defaultLang = 'en-us';

  if (!isBrowser) {
    return defaultLang;
  }

  // This currently needs to be client-side because the source page doesn't know about locale at
  // build time. Smartling's GDN handles localization
  // Example on https://www.mongodb.com/zh-cn/docs/manual/introduction:
  // expected pathname - /zh-cn/docs/manual/introduction; expected locale - "zh-cn"
  const pathname = window.location.pathname;
  const expectedDocsPrefixes = ['docs', 'docs-qa'];
  const firstPathSlug = pathname.split('/', 2)[1];
  if (expectedDocsPrefixes.includes(firstPathSlug)) {
    return defaultLang;
  }

  const slugMatchesCode = validateLocaleCode(firstPathSlug);
  return slugMatchesCode ? (firstPathSlug as AvailableLocaleType) : defaultLang;
};

/**
 * Returns the pathname with its locale code prepended. Leading slashes are preserved, if they exist.
 * @param {string} pathname - Path name or slug of the page
 * @param {string?} localeCode - Optional locale code. By default, the code is determined based on the current location of the page
 */
export const localizePath = (pathname: string, localeCode?: string) => {
  if (!pathname) {
    return '';
  }

  const unlocalizedPath = stripLocale(pathname);
  const code = localeCode && validateLocaleCode(localeCode) ? localeCode : getCurrLocale();
  const languagePrefix = code === 'en-us' ? '' : `${code}/`;
  let newPath = languagePrefix + unlocalizedPath;
  if (pathname.startsWith('/')) {
    newPath = `/${newPath}`;
  }
  return normalizePath(newPath);
};

/**
 * Returns a mapping of a page's URL and its equivalent URLs for different languages.
 * @param {string} siteUrl
 * @param {string} fullPath
 * @returns {object}
 */
export const getLocaleMapping = (siteUrl: string, fullPath: string) => {
  // handle the `/` path
  const slugForUrl = fullPath === '/' ? '' : fullPath;
  const normalizedSiteUrl = siteUrl?.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const localeHrefMap: { [k: string]: string } = {};

  getAvailableLanguages().forEach(({ localeCode }) => {
    const localizedPath = localizePath(slugForUrl, localeCode);
    const targetUrl = normalizedSiteUrl + localizedPath;
    localeHrefMap[localeCode] = assertTrailingSlash(targetUrl);
  });

  return localeHrefMap;
};

export const onSelectLocale = (locale: string) => {
  try {
    // Set cookie to expire in 1 year
    const maxAge = 60 * 60 * 24 * 365;
    const cookieMaxAge = `max-age=${maxAge}`;
    // Set for all paths on the MongoDB domain so that it persists for every site and locale
    const cookiePath = 'path=/';
    window.document.cookie = `${COOKIE_KEY_PREF_LOCALE}=${locale};${cookieMaxAge};${cookiePath}`;
  } catch (err) {
    console.error(err);
  }

  const location = window.location;
  const localizedPath = localizePath(location.pathname, locale);
  window.location.pathname = localizedPath;
};

/**
 * Ensures that a locale code has an all lowercase language code with an all uppercase region code,
 * as described in https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang#region_subtag.
 * @param {string} localeCode - A valid locale code with either 1 or 2 parts. Example: `zh-cn` or `zh`
 */
export const getHtmlLangFormat = (localeCode: string) => {
  const parts = localeCode.split('-');
  if (parts.length < 2) {
    return localeCode;
  }

  const [langCode, regionCode] = parts;
  return `${langCode.toLowerCase()}-${regionCode.toUpperCase()}`;
};
