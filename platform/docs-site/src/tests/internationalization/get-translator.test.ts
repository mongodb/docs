jest.mock('@/internationalization/catalogs', () => {
  const english = { greeting: 'Hello', only_english: 'English only' };
  const bundles: Record<string, Record<string, string>> = {
    'en-us': english,
    es: { greeting: 'Hola' },
    'ja-jp': { greeting: 'こんにちは' },
  };
  return {
    FALLBACK_LOCALE: 'en-us',
    getCatalog: (locale: string) => bundles[locale] ?? english,
  };
});

import type { AvailableLocaleType } from '@/utils/locale';
import { getTranslator } from '@/internationalization/get-translator';

const ORIGINAL_BUILD_LOCALE = process.env.NEXT_PUBLIC_DOCS_LOCALE;

// The mocked catalogs use made-up keys, so widen the typed `t` for these tests.
const translate = (key: string, locale?: AvailableLocaleType) =>
  (getTranslator(locale).t as (key: string) => string)(key);

afterEach(() => {
  window.history.pushState({}, '', '/');
  if (ORIGINAL_BUILD_LOCALE === undefined) {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
  } else {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = ORIGINAL_BUILD_LOCALE;
  }
});

describe('getTranslator', () => {
  it('uses the build locale when no locale is passed', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    expect(translate('greeting')).toBe('Hola');
  });

  it('is English when the build locale is unset', () => {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
    expect(translate('greeting')).toBe('Hello');
  });

  it('is English when the build locale is not a supported locale', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'xx-yy';
    expect(translate('greeting')).toBe('Hello');
  });

  it('stays English when the build locale is unset, even on a locale-prefixed URL', () => {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
    window.history.pushState({}, '', '/ja-jp/docs/atlas/');
    expect(translate('greeting')).toBe('Hello');
  });

  it('keeps the build locale on a differently prefixed URL', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    window.history.pushState({}, '', '/ja-jp/docs/atlas/');
    expect(translate('greeting')).toBe('Hola');
  });

  it('falls back to English for keys missing from the active bundle', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    expect(translate('only_english')).toBe('English only');
  });

  it('accepts an explicit locale', () => {
    expect(translate('greeting', 'es')).toBe('Hola');
  });

  it('returns the same translator for the same locale', () => {
    expect(getTranslator('es')).toBe(getTranslator('es'));
  });

  it('only accepts keys from the English catalog', () => {
    // @ts-expect-error not a platform string key
    getTranslator().t('definitely.not_a_key');
  });
});
