import { NextResponse, type NextRequest } from 'next/server';
import { prefersMarkdown } from '@/utils/parse-accept-header';
import { withCORS } from '@/app/lib/with-cors';
import { lowercaseRedirectPath } from '@/redirects/case-canonical';

/**
 * Which markdown export route answers a request, by its tab params. Mirrors the
 * rewrite rules in next.config.mjs, which resolve the same params for `.md`
 * URLs.
 *
 *   either tab param  the request-time route, which reads the prerendered
 *                     every-tab export — filtering it for `?tabs=<id,...>`, and
 *                     falling back to the default export where that companion
 *                     was not built because the page has no tabs
 *   neither           the prerendered default export, one tab per tabset
 */
function exportRouteFor(searchParams: URLSearchParams): 'markdown-tabs' | 'markdown' {
  const hasTabParam = searchParams.get('allTabs') === 'true' || searchParams.has('tabs');
  return hasTabParam ? 'markdown-tabs' : 'markdown';
}

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
  const { pathname, searchParams } = request.nextUrl;

  // Public docs URLs are lowercase. Mixed-case page requests 301 here so the
  // redirect runs in `next dev` (the Netlify edge function does not) as well
  // as on Netlify, where Next compiles this middleware to an edge function.
  // Ahead of content negotiation so the export is resolved from the canonical
  // path rather than the mixed-case one.
  if (!pathname.startsWith('/api/')) {
    const lowerPath = lowercaseRedirectPath(pathname);
    if (lowerPath) {
      const url = request.nextUrl.clone();
      url.pathname = lowerPath;
      return NextResponse.redirect(url, 301);
    }
  }

  // `.md` URLs belong to next.config's rewrite rules, tab params included.
  // Netlify serves those requests from the CDN without invoking this edge
  // function, so anything decided here would apply on some hosts and not others.
  const isExplicitMd = pathname.endsWith('.md');

  // A caller asking for the export route directly instead of via a `.md` URL.
  // Matched so those callers get the tab params (and preflight) too.
  const isDefaultExportRoute = pathname.startsWith('/api/markdown/');

  // Everything else under /api/ is not a docs page. That includes markdown-all,
  // which answers markdown-tabs' subrequest — skipping it prevents re-entry.
  const isOtherApi = pathname.startsWith('/api/') && !isDefaultExportRoute;

  // Content negotiation: a docs HTML page whose Accept header prefers markdown
  // gets the markdown export instead.
  const wantsMarkdown = isDefaultExportRoute || prefersMarkdown(request.headers.get('Accept'));

  if (!isExplicitMd && !isOtherApi && wantsMarkdown) {
    // /api/markdown/current/foo or /current/foo/ → current/foo (basePath-
    // relative; the export routes reconstruct the full blob path).
    const docsPath = pathname.replace(/^\/api\/markdown\//, '').replace(/^\/|\/$/g, '');
    const route = exportRouteFor(searchParams);

    // Nothing to do when the request already names the route that answers it.
    if (docsPath && !(isDefaultExportRoute && route === 'markdown')) {
      const url = request.nextUrl.clone();
      // The trailing slash is load-bearing: `trailingSlash: true` makes the
      // slashless form answer 308, which the export routes do not survive.
      url.pathname = `/api/${route}/${docsPath}/`;
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
