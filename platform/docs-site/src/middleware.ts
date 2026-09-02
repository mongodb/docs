import { NextResponse, type NextRequest } from 'next/server';
import { prefersMarkdown } from '@/utils/parse-accept-header';
import { withCORS } from '@/app/lib/with-cors';

export function middleware(request: NextRequest) {
  // Answer CORS preflight here rather than with an OPTIONS handler in the
  // markdown route, which would opt that route out of static generation
  // (see the note in app/api/markdown/[...path]/route.ts).
  if (request.method === 'OPTIONS') {
    return withCORS(new NextResponse(null, { status: 204 }));
  }

  // Next strips the configured basePath from nextUrl.pathname inside
  // middleware, so this is already basePath-relative — e.g. a request to
  // /docs/<prefix>/current/foo/ arrives here as /current/foo/.
  const { pathname } = request.nextUrl;

  // Content negotiation: serve the Markdown export when a docs HTML page is
  // requested with an Accept header preferring text/markdown. Skip the API
  // routes and explicit `.md` URLs (rewritten in next.config).
  if (!pathname.startsWith('/api/') && !pathname.endsWith('.md')) {
    if (prefersMarkdown(request.headers.get('Accept'))) {
      // /current/foo/ → current/foo (basePath-relative; the markdown route
      // reconstructs the full blob path).
      const docsPath = pathname.replace(/^\//, '').replace(/\/$/, '');

      const url = request.nextUrl.clone();
      url.pathname = `/api/markdown/${docsPath}`;

      return NextResponse.rewrite(url);
    }
  }

  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept');
  return response;
}

export const config = {
  matcher: [
    // The basePath root itself (`/docs/` for landing, `/docs/<prefix>/` for
    // every other docset). Next prefixes basePath onto each matcher source, so
    // `/:path(...)` below compiles to `^/docs(?:/(...))$` — which requires a
    // segment after the prefix. Next then match-tests the *trailing-slash-
    // stripped* pathname (`/docs`), so the root falls through unmatched and
    // next-server answers it with an empty 200 body instead of rendering the
    // page. Only the literal `/` source gets Next's isRoot treatment, which
    // makes the trailing slash optional. See vercel/next.js#47085.
    '/',
    // Docs pages (basePath-relative) minus Next.js internals. basePath is
    // applied by Next automatically and _next assets are auto-excluded.
    '/:path((?!_next).*)',
    // The export route, for direct cross-origin preflight.
    '/api/markdown/:path*',
  ],
};
