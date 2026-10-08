/**
 * @jest-environment node
 */
import { getFullSlug } from '@/utils/get-full-slug';

// The node environment has no `window`, so this exercises the server branch,
// which derives the slug from the page's own slug rather than the URL.
describe('getFullSlug (server)', () => {
  it('resolves a leaf docset root to its prefix, not `<prefix>/index`', () => {
    // The page route maps the basePath root to `index`, so the slug arrives as
    // `docs/atlas/government/index`. The browser's URL for the same page has no
    // `index`, and the two must agree or hydration fails.
    expect(getFullSlug('docs/atlas/government/index', '/docs/atlas/government')).toBe('docs/atlas/government');
  });

  it('keeps a complete subpage slug unchanged', () => {
    expect(getFullSlug('docs/atlas/government/security', '/docs/atlas/government')).toBe(
      'docs/atlas/government/security',
    );
  });

  it('leaves the existing bare index behavior alone', () => {
    expect(getFullSlug('index', '/docs/atlas/government')).toBe('/docs/atlas/government/');
  });

  it('prefixes a relative slug', () => {
    expect(getFullSlug('security', '/docs/atlas/government')).toBe('/docs/atlas/government/security');
  });
});
