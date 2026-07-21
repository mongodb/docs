import { compileRedirects, findMatchingRedirect, type RedirectEntry } from '@/redirects/redirect-utils';

describe('redirect-utils', () => {
  describe('compileRedirects', () => {
    it('compiles an array of redirect entries into matchers', () => {
      const entries: RedirectEntry[] = [
        { source: '/docs/atlas/foo/', destination: '/docs/atlas/bar/', statusCode: 301 },
      ];
      const compiled = compileRedirects(entries);
      expect(compiled).toHaveLength(1);
      expect(compiled[0].destination).toBe('/docs/atlas/bar/');
      expect(compiled[0].statusCode).toBe(301);
    });
  });

  describe('findMatchingRedirect', () => {
    it('matches an exact path', () => {
      const compiled = compileRedirects([
        { source: '/docs/atlas/old-page/', destination: '/docs/atlas/new-page/', statusCode: 301 },
      ]);

      const result = findMatchingRedirect('/docs/atlas/old-page/', compiled);
      expect(result).toEqual({ destination: '/docs/atlas/new-page/', statusCode: 301 });
    });

    it('returns null when no pattern matches', () => {
      const compiled = compileRedirects([
        { source: '/docs/atlas/old-page/', destination: '/docs/atlas/new-page/', statusCode: 301 },
      ]);

      const result = findMatchingRedirect('/docs/atlas/other-page/', compiled);
      expect(result).toBeNull();
    });

    it('matches named parameters and interpolates them in the destination', () => {
      const compiled = compileRedirects([
        {
          source: '/docs/drivers/node/:version/quick-start/',
          destination: '/docs/drivers/node/:version/get-started/',
          statusCode: 301,
        },
      ]);

      const result = findMatchingRedirect('/docs/drivers/node/current/quick-start/', compiled);
      expect(result).toEqual({
        destination: '/docs/drivers/node/current/get-started/',
        statusCode: 301,
      });
    });

    it('matches wildcard :path* and interpolates it', () => {
      const compiled = compileRedirects([
        {
          source: '/docs/drivers/node/v7.2/:path*',
          destination: '/docs/drivers/node/v7.x/:path*',
          statusCode: 301,
        },
      ]);

      const result = findMatchingRedirect('/docs/drivers/node/v7.2/get-started/quick/', compiled);
      expect(result).toEqual({
        destination: '/docs/drivers/node/v7.x/get-started/quick',
        statusCode: 301,
      });
    });

    it('handles wildcard matching zero trailing segments', () => {
      const compiled = compileRedirects([
        {
          source: '/docs/drivers/node/v5.0/:path*',
          destination: '/docs/drivers/node/current/:path*',
          statusCode: 301,
        },
      ]);

      const result = findMatchingRedirect('/docs/drivers/node/v5.0/', compiled);
      expect(result).toEqual({
        destination: '/docs/drivers/node/current',
        statusCode: 301,
      });
    });

    it('returns the first match when multiple patterns could apply', () => {
      const compiled = compileRedirects([
        {
          source: '/docs/drivers/node/:version/fundamentals/connection/',
          destination: '/docs/drivers/node/:version/connect/',
          statusCode: 301,
        },
        {
          source: '/docs/drivers/node/:version/:path*',
          destination: '/docs/drivers/node/:version/fallback/',
          statusCode: 301,
        },
      ]);

      const result = findMatchingRedirect('/docs/drivers/node/current/fundamentals/connection/', compiled);
      expect(result).toEqual({
        destination: '/docs/drivers/node/current/connect/',
        statusCode: 301,
      });
    });

    it('preserves the statusCode from the matched entry', () => {
      const compiled = compileRedirects([
        { source: '/docs/old/', destination: '/docs/new/', statusCode: 302 },
      ]);

      const result = findMatchingRedirect('/docs/old/', compiled);
      expect(result?.statusCode).toBe(302);
    });

    it('preserves a query string in the destination', () => {
      const compiled = compileRedirects([
        {
          source: '/docs/languages/python/pymongo-driver/:version/reference/compatibility/',
          destination: '/docs/drivers/compatibility/?driver-language=python&python-driver-framework=pymongo',
          statusCode: 301,
        },
      ]);

      const result = findMatchingRedirect(
        '/docs/languages/python/pymongo-driver/current/reference/compatibility/',
        compiled,
      );
      expect(result).toEqual({
        destination: '/docs/drivers/compatibility/?driver-language=python&python-driver-framework=pymongo',
        statusCode: 301,
      });
    });

    it('interpolates params in the path while preserving the query string', () => {
      const compiled = compileRedirects([
        {
          source: '/docs/drivers/node/:version/compatibility/',
          destination: '/docs/drivers/node/:version/compat/?tab=overview',
          statusCode: 301,
        },
      ]);

      const result = findMatchingRedirect('/docs/drivers/node/current/compatibility/', compiled);
      expect(result).toEqual({
        destination: '/docs/drivers/node/current/compat/?tab=overview',
        statusCode: 301,
      });
    });

    it('preserves a fragment in the destination', () => {
      const compiled = compileRedirects([
        {
          source: '/docs/old/',
          destination: '/docs/new/#section',
          statusCode: 301,
        },
      ]);

      const result = findMatchingRedirect('/docs/old/', compiled);
      expect(result).toEqual({
        destination: '/docs/new/#section',
        statusCode: 301,
      });
    });

    it('returns absolute URL destinations without path-to-regexp compilation', () => {
      const compiled = compileRedirects([
        {
          source: '/docs/atlas/cli/:version/command/atlas-serverless:suffix(.*)',
          destination: 'https://www.mongodb.com/docs/unavailable-version/',
          statusCode: 301,
        },
      ]);

      const result = findMatchingRedirect(
        '/docs/atlas/cli/current/command/atlas-serverlessasdasda/',
        compiled,
      );
      expect(result).toEqual({
        destination: 'https://www.mongodb.com/docs/unavailable-version/',
        statusCode: 301,
      });
    });
  });
});
