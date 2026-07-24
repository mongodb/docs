import { findSoftRedirect } from '@/redirects/soft-redirects';

describe('soft-redirects', () => {
  describe('findSoftRedirect', () => {
    it.skip('matches a known page-specific redirect', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/fundamentals/connection/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/current/connect/');
      expect(result!.statusCode).toBe(301);
    });

    it.skip('matches a parametrized redirect across versions', () => {
      const result = findSoftRedirect('/docs/drivers/node/upcoming/quick-start/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/upcoming/get-started/');
    });

    it.skip('matches wildcard version consolidation paths (these are soft too)', () => {
      const result = findSoftRedirect('/docs/drivers/node/v7.2/some-page/');
      expect(result).not.toBeNull();
      expect(result!.destination).toContain('/docs/drivers/node/v7.x/');
    });

    it.skip('normalizes paths without trailing slash', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/fundamentals/connection');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/current/connect/');
    });

    it('returns null for paths that do not match any redirect', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/this-page-has-no-redirect/');
      expect(result).toBeNull();
    });

    it.skip('matches atlas page-specific redirects', () => {
      const result = findSoftRedirect('/docs/atlas/additional-resources/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/atlas/');
    });
  });
});
