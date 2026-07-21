import { NextResponse, type NextRequest } from 'next/server';
import { prefersMarkdown } from '@/utils/parse-accept-header';

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get('Accept');

  if (prefersMarkdown(acceptHeader)) {
    // Strip the /docs/ prefix and any trailing slash to build the
    // API path: /docs/manual/upcoming/foo/ → manual/upcoming/foo
    const docsPath = request.nextUrl.pathname
      .replace(/^\/docs\//, '')
      .replace(/\/$/, '');

    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown/${docsPath}`;

    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept');
  return response;
}

export const config = {
  matcher: [
    // Match /docs/* pages but skip static assets, API routes,
    // Next.js internals, and the .md rewrite (handled separately).
    '/docs/:path((?!docs_static_nextjs|_next|platform/api/|.*\\.md$).*)',
  ],
};
