import { getIndexRedirectTarget } from '@/utils/index-redirect';

describe('getIndexRedirectTarget', () => {
  describe('returns null when no redirect is needed', () => {
    it('returns null when rawPath is undefined (root /docs/ match)', () => {
      expect(getIndexRedirectTarget(undefined)).toBeNull();
    });

    it('returns null when the last segment is not "index"', () => {
      expect(getIndexRedirectTarget(['atlas'])).toBeNull();
    });

    it('returns null for a normal nested path', () => {
      expect(getIndexRedirectTarget(['atlas', 'getting-started'])).toBeNull();
    });

    it('returns null for a deeply nested path not ending in "index"', () => {
      expect(getIndexRedirectTarget(['drivers', 'node', 'current', 'connect'])).toBeNull();
    });

    it('returns null when "index" appears as a middle segment but not the last', () => {
      expect(getIndexRedirectTarget(['vector-search', 'index', 'vector-search-type'])).toBeNull();
    });
  });

  describe('returns the canonical parent path when the last segment is "index"', () => {
    it('redirects /docs/index to /docs/', () => {
      expect(getIndexRedirectTarget(['index'])).toBe('/docs/');
    });

    it('redirects /docs/atlas/index to /docs/atlas/', () => {
      expect(getIndexRedirectTarget(['atlas', 'index'])).toBe('/docs/atlas/');
    });

    it('redirects a deeply nested index path to its parent', () => {
      expect(getIndexRedirectTarget(['drivers', 'node', 'current', 'index'])).toBe(
        '/docs/drivers/node/current/',
      );
    });

    it('includes a trailing slash in the redirect target', () => {
      const target = getIndexRedirectTarget(['atlas', 'index']);
      expect(target).toMatch(/\/$/);
    });
  });
});
