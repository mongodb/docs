import type { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

// Builds a minimal object with just the surface `middleware` touches:
// `method`, `headers.get`, and `nextUrl` (with a cloneable pathname and search
// params, and the basePath already stripped, as Next does).
function fakeRequest({
  method = 'GET',
  pathname,
  search = '',
  accept,
}: {
  method?: string;
  pathname: string;
  search?: string;
  accept?: string;
}): NextRequest {
  const nextUrl = {
    pathname,
    search,
    searchParams: new URLSearchParams(search),
    clone() {
      return { ...this, pathname: this.pathname, search: this.search };
    },
  };
  return {
    method,
    headers: { get: (key: string) => (key.toLowerCase() === 'accept' ? accept ?? null : null) },
    nextUrl,
  } as unknown as NextRequest;
}

const rewriteOf = (request: NextRequest) =>
  (middleware(request) as unknown as { rewriteUrl?: { pathname: string } }).rewriteUrl;

describe('middleware', () => {
  // Regression guard: the markdown export route must not carry its own OPTIONS
  // handler (that opts it out of static generation), so preflight is answered
  // here for both the /docs pages and the /api/markdown export route.
  it.each(['/manual/current/foo', '/api/markdown/manual/current/foo'])(
    'answers CORS preflight for %s with 204 + CORS headers',
    (pathname) => {
      const res = middleware(fakeRequest({ method: 'OPTIONS', pathname })) as unknown as {
        status: number;
        headers: { get: (k: string) => string | null };
      };
      expect(res.status).toBe(204);
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('Access-Control-Allow-Methods')).toBe('GET, POST, OPTIONS');
    },
  );

  it('rewrites a /docs page to the markdown route when Accept prefers markdown', () => {
    expect(rewriteOf(fakeRequest({ pathname: '/manual/current/foo/', accept: 'text/markdown' }))?.pathname).toBe(
      '/api/markdown/manual/current/foo/',
    );
  });

  // `.md` URLs belong to next.config's rewrite rules. Netlify serves them from
  // the CDN without invoking this edge function, so a decision made here would
  // apply under `next start` and not in production.
  it.each(['', '?allTabs=true', '?tabs=nodejs'])(
    'leaves an explicit .md URL carrying "%s" to the rewrite rules',
    (search) => {
      const res = middleware(
        fakeRequest({ pathname: '/manual/current/foo.md', search, accept: 'text/markdown' }),
      ) as unknown as {
        rewriteUrl?: unknown;
        headers: { get: (k: string) => string | null };
      };
      expect(res.rewriteUrl).toBeUndefined();
      expect(res.headers.get('Vary')).toBe('Accept');
    },
  );

  // A zero-segment path has no `.md` export (see generateMarkdownStaticParams),
  // so the docset root must fall through to the HTML page rather than rewrite
  // to an export route with an empty path.
  it('does not rewrite the docset root when Accept prefers markdown', () => {
    expect(rewriteOf(fakeRequest({ pathname: '/', accept: 'text/markdown' }))).toBeUndefined();
  });

  it('passes HTML requests through with a Vary: Accept header', () => {
    const res = middleware(fakeRequest({ pathname: '/manual/current/foo/', accept: 'text/html' })) as unknown as {
      rewriteUrl?: unknown;
      headers: { get: (k: string) => string | null };
    };
    expect(res.rewriteUrl).toBeUndefined();
    expect(res.headers.get('Vary')).toBe('Accept');
  });

  describe('tab query params', () => {
    // Each param selects an export route; the routes themselves own the work.
    // The trailing slash is required — `trailingSlash: true` makes the
    // slashless form answer 308 instead of the export.
    it.each([
      ['?allTabs=true', '/api/markdown-tabs/manual/current/foo/'],
      ['?tabs=nodejs', '/api/markdown-tabs/manual/current/foo/'],
      // `?tabs=` selecting nothing still goes to the tab route, which serves the
      // default export. Mirrors next.config's `has` rule, which matches on the
      // key alone.
      ['?tabs=', '/api/markdown-tabs/manual/current/foo/'],
      ['?tabs=nodejs&allTabs=true', '/api/markdown-tabs/manual/current/foo/'],
    ])('rewrites an Accept-negotiated page carrying %s to %s', (search, expected) => {
      const request = fakeRequest({ pathname: '/manual/current/foo/', search, accept: 'text/markdown' });
      expect(rewriteOf(request)?.pathname).toBe(expected);
    });

    it('ignores tab params on an HTML page request', () => {
      expect(
        rewriteOf(fakeRequest({ pathname: '/manual/current/foo/', search: '?tabs=nodejs', accept: 'text/html' })),
      ).toBeUndefined();
    });

    // Callers may also name the export route directly instead of using a `.md`
    // URL. It is matched, so it honors the params rather than serving the
    // unfiltered prerendered body.
    describe('when the request names the export route directly', () => {
      it.each([
        ['?allTabs=true', '/api/markdown-tabs/manual/current/foo/'],
        ['?tabs=nodejs', '/api/markdown-tabs/manual/current/foo/'],
      ])('rewrites %s to %s', (search, expected) => {
        const request = fakeRequest({ pathname: '/api/markdown/manual/current/foo', search });
        expect(rewriteOf(request)?.pathname).toBe(expected);
      });

      it('leaves a bare request to the static default export', () => {
        expect(rewriteOf(fakeRequest({ pathname: '/api/markdown/manual/current/foo' }))).toBeUndefined();
      });
    });

    // markdown-tabs reads this route over the CDN; rewriting it back would
    // recurse.
    it('does not re-enter the all-tabs export route', () => {
      expect(
        rewriteOf(fakeRequest({ pathname: '/api/markdown-all/manual/current/foo/', search: '?allTabs=true' })),
      ).toBeUndefined();
    });

    it('leaves other API routes alone even when Accept prefers markdown', () => {
      expect(rewriteOf(fakeRequest({ pathname: '/api/version', accept: 'text/markdown' }))).toBeUndefined();
    });
  });
});
