import { mockLocation } from '@/tests/utils/mock-location';
import { getAvailableLanguages, getHtmlLangFormat, getLocaleMapping, localizePath } from '@/utils/locale';

describe('getLocaleMapping', () => {
  it.each([
    ['https://www.mongodb.com/docs/', '/'],
    ['https://www.mongodb.com/docs', '/about/page/'],
    ['https://www.mongodb.com', 'introduction'],
  ])('returns a valid mapping of URLs', (siteUrl, slug) => {
    const mapping = getLocaleMapping(siteUrl, slug);
    expect(Object.keys(mapping)).toHaveLength(getAvailableLanguages().length);
    expect(mapping).toMatchSnapshot();
  });
});

describe('localizePath', () => {
  it.each([
    ['/', '/zh-cn/'],
    ['/page/slug', '/zh-cn/page/slug'],
    ['page/slug/', 'zh-cn/page/slug/'],
  ])('returns localized path when no code is set', (slug, expectedRes) => {
    // Pretend page exists on translated site
    mockLocation({ pathname: '/zh-cn/docs-test/drivers/node/current' });
    const res = localizePath(slug);
    expect(res).toEqual(expectedRes);
  });

  it.each([
    ['/', 'ko-kr', '/ko-kr/'],
    ['/page/slug', 'pt-br', '/pt-br/page/slug'],
    ['page/slug/', 'zh-cn', 'zh-cn/page/slug/'],
  ])('returns localized path when code is set', (slug, code, expectedRes) => {
    const res = localizePath(slug, code);
    expect(res).toEqual(expectedRes);
  });

  it.each([
    ['/', '/'],
    ['/page/slug', '/page/slug'],
    ['page/slug/', 'page/slug/'],
  ])('returns the same page slug when English is found by default', (slug, expectedRes) => {
    // Simulate English docs site
    mockLocation({ pathname: '/docs/manual' });
    const res = localizePath(slug);
    expect(res).toEqual(expectedRes);
  });

  it.each([
    ['/', '/'],
    ['/page/slug', '/page/slug'],
    ['page/slug/', 'page/slug/'],
  ])('gracefully defaults to English path when invalid language is passed in', (slug, expectedRes) => {
    // Simulate English docs site
    mockLocation({ pathname: '/docs/manual' });
    const res = localizePath(slug, 'beep-boop');
    expect(res).toEqual(expectedRes);
  });

  it.each([
    ['zh-cn/docs', 'zh-cn/docs'],
    ['/ko-kr/docs/foo', '/zh-cn/docs/foo'],
    ['/pt-br/', '/zh-cn/'],
    ['//ko-kr/', '/zh-cn/'],
    ['pt-br/', 'zh-cn/'],
    ['pt-br/docs/pt-br', 'zh-cn/docs/pt-br'],
  ])('handles slugs that already have a locale code', (slug, expectedRes) => {
    const res = localizePath(slug, 'zh-cn');
    expect(res).toEqual(expectedRes);
  });
});

describe('getHtmlLangFormat', () => {
  it.each([
    ['zh-cn', 'zh-CN'],
    ['zh-CN', 'zh-CN'],
    ['zh', 'zh'],
  ])('transforms %s into %s', (input, expectedRes) => {
    const res = getHtmlLangFormat(input);
    expect(res).toEqual(expectedRes);
  });
});
