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

  const { pathname } = request.nextUrl;

  // Content negotiation: serve the Markdown export when a /docs HTML page is
  // requested with an Accept header preferring text/markdown. Explicit `.md`
  // URLs are rewritten in next.config, so skip them here.
  if (pathname.startsWith('/docs/') && !pathname.endsWith('.md')) {
    if (prefersMarkdown(request.headers.get('Accept'))) {
      // Strip the /docs/ prefix and any trailing slash to build the
      // API path: /docs/manual/upcoming/foo/ → manual/upcoming/foo
      const docsPath = pathname.replace(/^\/docs\//, '').replace(/\/$/, '');

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
    // /docs/* pages (including `.md`, for their preflight) minus static
    // assets and Next.js internals.
    '/docs/:path((?!docs_static_nextjs|_next).*)',
    // The export route, for direct cross-origin preflight.
    '/api/markdown/:path*',
  ],
};
