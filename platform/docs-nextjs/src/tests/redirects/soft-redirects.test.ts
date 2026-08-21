jest.mock('@/redirects/all-redirects', () => ({
  allRedirects: [
    {
      source: '/docs/sample-product/:version/fundamentals/connection/',
      destination: '/docs/sample-product/:version/connect/',
      statusCode: 301,
    },
    {
      source: '/docs/sample-product/:version/quick-start/',
      destination: '/docs/sample-product/:version/get-started/',
      statusCode: 301,
    },
    {
      source: '/docs/sample-product/v7.2/:path*',
      destination: '/docs/sample-product/v7.x/:path*',
      statusCode: 301,
    },
    {
      source: '/docs/atlas/additional-resources/',
      destination: '/docs/atlas/',
      statusCode: 301,
    },
  ],
}));

import { findSoftRedirect } from '@/redirects/soft-redirects';

describe('soft-redirects', () => {
  describe('findSoftRedirect', () => {
    it('matches a known page-specific redirect', () => {
      const result = findSoftRedirect('/docs/sample-product/current/fundamentals/connection/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/sample-product/current/connect/');
      expect(result!.statusCode).toBe(301);
    });

    it('matches a parametrized redirect across versions', () => {
      const result = findSoftRedirect('/docs/sample-product/upcoming/quick-start/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/sample-product/upcoming/get-started/');
    });

    it('matches wildcard version consolidation paths (these are soft too)', () => {
      const result = findSoftRedirect('/docs/sample-product/v7.2/some-page/');
      expect(result).not.toBeNull();
      expect(result!.destination).toContain('/docs/sample-product/v7.x/');
    });

    it('normalizes paths without trailing slash', () => {
      const result = findSoftRedirect('/docs/sample-product/current/fundamentals/connection');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/sample-product/current/connect/');
    });

    it('returns null for paths that do not match any redirect', () => {
      const result = findSoftRedirect('/docs/sample-product/current/this-page-has-no-redirect/');
      expect(result).toBeNull();
    });

    it('matches atlas page-specific redirects', () => {
      const result = findSoftRedirect('/docs/atlas/additional-resources/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/atlas/');
    });
  });
});
