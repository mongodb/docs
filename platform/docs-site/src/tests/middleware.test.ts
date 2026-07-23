import type { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

// Builds a minimal object with just the surface `middleware` touches:
// `method`, `headers.get`, and `nextUrl` (with a cloneable pathname).
function fakeRequest({
  method = 'GET',
  pathname,
  accept,
}: {
  method?: string;
  pathname: string;
  accept?: string;
}): NextRequest {
  const nextUrl = {
    pathname,
    clone() {
      return { ...this, pathname: this.pathname };
    },
  };
  return {
    method,
    headers: { get: (key: string) => (key.toLowerCase() === 'accept' ? (accept ?? null) : null) },
    nextUrl,
  } as unknown as NextRequest;
}

describe('middleware', () => {
  // Regression guard: the markdown export route must not carry its own OPTIONS
  // handler (that opts it out of static generation), so preflight is answered
  // here for both the /docs pages and the /api/markdown export route.
  it.each(['/docs/manual/current/foo', '/api/markdown/manual/current/foo'])(
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
    const res = middleware(
      fakeRequest({ pathname: '/docs/manual/current/foo/', accept: 'text/markdown' }),
    ) as unknown as { rewriteUrl?: { pathname: string } };
    expect(res.rewriteUrl?.pathname).toBe('/api/markdown/manual/current/foo');
  });

  it('does not rewrite explicit .md URLs based on Accept (next.config handles them)', () => {
    const res = middleware(
      fakeRequest({ pathname: '/docs/manual/current/foo.md', accept: 'text/markdown' }),
    ) as unknown as { rewriteUrl?: unknown; headers: { get: (k: string) => string | null } };
    expect(res.rewriteUrl).toBeUndefined();
    expect(res.headers.get('Vary')).toBe('Accept');
  });

  it('passes HTML requests through with a Vary: Accept header', () => {
    const res = middleware(
      fakeRequest({ pathname: '/docs/manual/current/foo/', accept: 'text/html' }),
    ) as unknown as { rewriteUrl?: unknown; headers: { get: (k: string) => string | null } };
    expect(res.rewriteUrl).toBeUndefined();
    expect(res.headers.get('Vary')).toBe('Accept');
  });
});
