import { getBuildLocale } from '@/utils/locale';

const ORIGINAL_BUILD_LOCALE = process.env.NEXT_PUBLIC_DOCS_LOCALE;

afterEach(() => {
  if (ORIGINAL_BUILD_LOCALE === undefined) {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
  } else {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = ORIGINAL_BUILD_LOCALE;
  }
});

describe('getBuildLocale', () => {
  it('defaults to en-us when NEXT_PUBLIC_DOCS_LOCALE is unset', () => {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
    expect(getBuildLocale()).toBe('en-us');
  });

  it('defaults to en-us when NEXT_PUBLIC_DOCS_LOCALE is empty', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = '';
    expect(getBuildLocale()).toBe('en-us');
  });

  it.each(['en-us', 'es', 'pt-br', 'ko-kr', 'ja-jp', 'zh-cn'])('returns %s when it is configured', (locale) => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = locale;
    expect(getBuildLocale()).toBe(locale);
  });

  it.each(['xx-yy', 'de-de', 'ES', 'es '])('falls back to en-us for the unsupported value "%s"', (value) => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = value;
    expect(getBuildLocale()).toBe('en-us');
  });
});
