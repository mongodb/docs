import { buildSitemapUrls, slugToUrl } from '@/utils/build-sitemap-urls';

describe('slugToUrl', () => {
  const base = 'https://www.mongodb.com/docs/atlas';

  it('maps the site index to the trailing-slash root', () => {
    expect(slugToUrl(base, '')).toBe(`${base}/`);
    expect(slugToUrl(base, '/')).toBe(`${base}/`);
    expect(slugToUrl(base, 'index')).toBe(`${base}/`);
  });

  it('appends a nested slug with a trailing slash', () => {
    expect(slugToUrl(base, 'get-started')).toBe(`${base}/get-started/`);
    expect(slugToUrl(base, '/index/analyzers/keyword/')).toBe(
      `${base}/index/analyzers/keyword/`,
    );
  });

  it('does not double-slash when the base already has a trailing slash', () => {
    expect(slugToUrl(`${base}/`, '')).toBe(`${base}/`);
    expect(slugToUrl(`${base}/`, 'get-started')).toBe(`${base}/get-started/`);
  });
});

describe('buildSitemapUrls', () => {
  const base = 'https://www.mongodb.com/docs/atlas';

  it('emits one loc per unique MDX slug', () => {
    expect(buildSitemapUrls(base, ['', 'get-started', 'get-started'])).toEqual([
      `${base}/`,
      `${base}/get-started/`,
    ]);
  });

  it('appends composable query-string variants without dropping the page URL', () => {
    const urls = buildSitemapUrls(base, ['get-started'], {
      'get-started': [
        { cloud: 'atlas', interface: 'driver' },
        { cloud: 'atlas', interface: 'shell' },
      ],
    });

    expect(urls).toEqual([
      `${base}/get-started/`,
      `${base}/get-started/?cloud=atlas&interface=driver`,
      `${base}/get-started/?cloud=atlas&interface=shell`,
    ]);
  });

  it('sorts page URLs and composable variants together', () => {
    const urls = buildSitemapUrls(base, ['zebra', 'apple'], {
      mango: [{ cloud: 'atlas' }],
    });

    expect(urls).toEqual([
      `${base}/apple/`,
      `${base}/mango/?cloud=atlas`,
      `${base}/zebra/`,
    ]);
  });
});
