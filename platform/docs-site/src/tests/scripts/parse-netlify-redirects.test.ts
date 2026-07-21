import { convertEntry } from '../../../scripts/parse-netlify-redirects';
import type { RedirectEntry } from '@/redirects/redirect-utils';

describe('parse-netlify-redirects', () => {
  describe('convertEntry', () => {
    it('maps from/to/status to source/destination/statusCode', () => {
      const result = convertEntry({
        from: '/docs/drivers/node/v7.2/',
        to: '/docs/drivers/node/v7.x/',
        status: 301,
      });

      expect(result).toEqual<RedirectEntry>({
        source: '/docs/drivers/node/v7.2/',
        destination: '/docs/drivers/node/v7.x/',
        statusCode: 301,
      });
    });

    it('defaults statusCode to 301 when status is omitted', () => {
      const result = convertEntry({
        from: '/docs/atlas/old-page/',
        to: '/docs/atlas/new-page/',
      });

      expect(result).not.toBeNull();
      expect(result?.statusCode).toBe(301);
    });

    it('preserves status 302', () => {
      const result = convertEntry({
        from: '/docs/drivers/node/v7.x/',
        to: '/docs/drivers/node/current/',
        status: 302,
      });

      expect(result?.statusCode).toBe(302);
    });

    it('includes force: true when force is true', () => {
      const result = convertEntry({
        from: '/docs/atlas/security/add-ip-address-to-list/',
        to: '/docs/atlas/security/ip-access-list/',
        status: 301,
        force: true,
      });

      expect(result?.force).toBe(true);
    });

    it('omits force when it is false', () => {
      const result = convertEntry({
        from: '/docs/atlas/old/',
        to: '/docs/atlas/new/',
        status: 301,
        force: false,
      });

      expect(result).not.toBeNull();
      expect(result).not.toHaveProperty('force');
    });

    it('omits force when it is not provided', () => {
      const result = convertEntry({
        from: '/docs/atlas/old/',
        to: '/docs/atlas/new/',
        status: 301,
      });

      expect(result).not.toBeNull();
      expect(result).not.toHaveProperty('force');
    });

    it('converts /* at end of from to /:path* in source', () => {
      const result = convertEntry({
        from: '/docs/drivers/node/*',
        to: '/docs/drivers/node/current/:splat',
        status: 301,
      });

      expect(result?.source).toBe('/docs/drivers/node/:path*');
    });

    it('converts :splat in to to :path* in destination', () => {
      const result = convertEntry({
        from: '/docs/drivers/node/*',
        to: '/docs/drivers/node/current/:splat',
        status: 301,
      });

      expect(result?.destination).toBe('/docs/drivers/node/current/:path*');
    });

    it('converts :splat in destination when source uses a named version param', () => {
      const result = convertEntry({
        from: '/docs/drivers/node/:version/*',
        to: '/docs/drivers/node/:version/new-section/:splat',
        status: 301,
      });

      expect(result?.destination).toBe('/docs/drivers/node/:version/new-section/:path*');
    });

    it('returns null when from is an absolute URL (not a valid Next.js redirect source)', () => {
      const result = convertEntry({
        from: 'http://www.mongodb.com/docs/v4.4/authentication/',
        to: 'http://www.mongodb.com/docs/v4.4/core/authentication/',
        status: 301,
      });

      expect(result).toBeNull();
    });

    it('returns null when from contains a URL embedded in the path (corrupt TOML entry)', () => {
      const result = convertEntry({
        from: '/docs/v6.0/https://mongodb.com/docs/manual/reference/operator/query/expr/',
        to: '/docs/manual/reference/operator/query/expr/',
        status: 301,
      });

      expect(result).toBeNull();
    });

    it('returns null for status 200 (proxy rewrite)', () => {
      const result = convertEntry({
        from: '/docs/drivers/node/:path*',
        to: '/docs/drivers/node/:path*',
        status: 200,
      });

      expect(result).toBeNull();
    });

    it('returns null for status 404 (error handler)', () => {
      const result = convertEntry({
        from: '/*',
        to: '/docs/unavailable/',
        status: 404,
      });

      expect(result).toBeNull();
    });

    it('does not alter paths that have no wildcards or splats', () => {
      const result = convertEntry({
        from: '/docs/atlas/old-section/',
        to: '/docs/atlas/new-section/',
        status: 301,
      });

      expect(result?.source).toBe('/docs/atlas/old-section/');
      expect(result?.destination).toBe('/docs/atlas/new-section/');
    });

    it('handles absolute URL destinations', () => {
      const result = convertEntry({
        from: '/docs/drivers/node/v4.x/',
        to: 'https://www.mongodb.com/docs/unavailable-version/',
        status: 301,
      });

      expect(result?.destination).toBe('https://www.mongodb.com/docs/unavailable-version/');
    });
  });
});
