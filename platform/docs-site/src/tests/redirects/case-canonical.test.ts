import {
  sitemapLocsToCanonicalPaths,
  buildCaseMap,
  canonicalizeCasing,
} from '@/redirects/case-canonical';

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.mongodb.com/docs/manual/v8.0/changeStreams/</loc></url>
  <url><loc>https://www.mongodb.com/docs/manual/v8.0/reference/method/</loc></url>
  <url><loc>https://www.mongodb.com/docs/manual/v8.0/tutorial/?tabs=nodejs</loc></url>
</urlset>`;

describe('sitemapLocsToCanonicalPaths', () => {
  it('extracts pathnames with trailing slashes, dropping origin', () => {
    expect(sitemapLocsToCanonicalPaths(SITEMAP_XML)).toEqual([
      '/docs/manual/v8.0/changeStreams/',
      '/docs/manual/v8.0/reference/method/',
      '/docs/manual/v8.0/tutorial/',
    ]);
  });

  it('drops query strings from composable-tutorial variants', () => {
    const paths = sitemapLocsToCanonicalPaths(
      '<loc>https://www.mongodb.com/docs/x/page/?tabs=a,b</loc>',
    );
    expect(paths).toEqual(['/docs/x/page/']);
  });

  it('decodes &amp; and tolerates non-absolute locs', () => {
    const paths = sitemapLocsToCanonicalPaths('<loc>/docs/x/page?a=1&amp;b=2</loc>');
    expect(paths).toEqual(['/docs/x/page/']);
  });

  it('returns an empty array when there are no <loc> entries', () => {
    expect(sitemapLocsToCanonicalPaths('<urlset></urlset>')).toEqual([]);
  });
});

describe('canonicalizeCasing', () => {
  const caseMap = buildCaseMap(sitemapLocsToCanonicalPaths(SITEMAP_XML));

  it('canonicalizes an all-lowercase request for a mixed-case page', () => {
    expect(canonicalizeCasing('/docs/manual/v8.0/changestreams/', caseMap)).toBe(
      '/docs/manual/v8.0/changeStreams/',
    );
  });

  it('canonicalizes an arbitrary-cased request', () => {
    expect(canonicalizeCasing('/docs/manual/v8.0/CHANGESTREAMS/', caseMap)).toBe(
      '/docs/manual/v8.0/changeStreams/',
    );
  });

  it('lowercases a stray-uppercase request for an all-lowercase page', () => {
    expect(canonicalizeCasing('/docs/manual/v8.0/Reference/Method/', caseMap)).toBe(
      '/docs/manual/v8.0/reference/method/',
    );
  });

  it('normalizes a missing trailing slash before lookup', () => {
    expect(canonicalizeCasing('/docs/manual/v8.0/changestreams', caseMap)).toBe(
      '/docs/manual/v8.0/changeStreams/',
    );
  });

  it('returns null when the request is already canonical', () => {
    expect(canonicalizeCasing('/docs/manual/v8.0/changeStreams/', caseMap)).toBeNull();
  });

  it('returns null for an unknown page', () => {
    expect(canonicalizeCasing('/docs/manual/v8.0/does-not-exist/', caseMap)).toBeNull();
  });
});

describe('buildCaseMap', () => {
  it('keeps the first canonical when two paths collide only by case', () => {
    const map = buildCaseMap(['/docs/x/Foo/', '/docs/x/foo/']);
    expect(map.get('/docs/x/foo/')).toBe('/docs/x/Foo/');
  });
});
