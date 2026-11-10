import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LocaleProvider, useLocale } from '@/context/locale';

const ORIGINAL_BUILD_LOCALE = process.env.NEXT_PUBLIC_DOCS_LOCALE;

const wrapper = ({ children }: { children: ReactNode }) => <LocaleProvider>{children}</LocaleProvider>;

afterEach(() => {
  window.history.pushState({}, '', '/');
  document.documentElement.lang = '';
  if (ORIGINAL_BUILD_LOCALE === undefined) {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
  } else {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = ORIGINAL_BUILD_LOCALE;
  }
});

describe('LocaleProvider', () => {
  describe('on an English build', () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
    });

    it('is en-us on an unprefixed URL', () => {
      const { result } = renderHook(() => useLocale(), { wrapper });
      expect(result.current.locale).toBe('en-us');
    });

    it('still follows the URL locale prefix', () => {
      window.history.pushState({}, '', '/ja-jp/docs/atlas/');
      const { result } = renderHook(() => useLocale(), { wrapper });
      expect(result.current.locale).toBe('ja-jp');
      expect(document.documentElement.lang).toBe('ja-JP');
    });
  });

  describe('on a localized build', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    });

    it('is the build locale on an unprefixed URL', () => {
      const { result } = renderHook(() => useLocale(), { wrapper });
      expect(result.current.locale).toBe('es');
      expect(document.documentElement.lang).toBe('es');
    });

    it('ignores the URL locale prefix', () => {
      window.history.pushState({}, '', '/ja-jp/docs/atlas/');
      const { result } = renderHook(() => useLocale(), { wrapper });
      expect(result.current.locale).toBe('es');
      expect(document.documentElement.lang).toBe('es');
    });
  });
});
