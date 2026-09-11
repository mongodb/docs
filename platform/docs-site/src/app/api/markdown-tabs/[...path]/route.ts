import { NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { markdownResponse } from '@/app/lib/markdown-response';
import { getBasePath } from '@/utils/base-path';
import { filterTabs, parseTabsParam } from '@/utils/tab-markers';

/**
 * Answers the tab params of `<page>.md`, both of which need code at request
 * time: `?tabs=<id,...>` has to filter the every-tab export, and `?allTabs=true`
 * has to fall back to the default export on the pages that have no every-tab
 * export because they have no tabs (see renderPageMarkdown). A bare `.md` URL
 * maps straight to a prerendered export (see next.config.mjs), keeping the
 * common case a pure static hit.
 */
export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    path: string[];
  };
}

/**
 * URL of a prerendered sibling export.
 *
 * The MDX this filters cannot be re-rendered at request time — the content-mdx
 * directory it comes from is absent from the deployed output (see
 * api/markdown/[...path]/route.ts) — so the finished export is read back over
 * the CDN instead.
 *
 * The trailing slash is load-bearing: `trailingSlash: true` makes the slashless
 * form answer 308, which the caller below reads as a missing export.
 */
function exportUrl(request: Request, route: 'markdown' | 'markdown-all', docsPath: string): URL {
  const url = new URL(request.url);
  url.pathname = `${getBasePath()}/api/${route}/${docsPath}/`;
  url.search = '';
  return url;
}

export async function GET(request: Request, { params }: RouteContext) {
  const docsPath = (params.path ?? []).join('/');
  if (!docsPath) {
    return withCORS(new NextResponse('Path is required', { status: 400 }));
  }

  const fetchExport = (route: 'markdown' | 'markdown-all') =>
    fetch(exportUrl(request, route, docsPath), { headers: { Accept: 'text/markdown' } });

  // The default export is what a page with no tabs has to say about its tabs, so
  // it answers a missing all-tabs companion as well as a request for tabs the
  // page does not have.
  const serveDefaultExport = async () => {
    const fallback = await fetchExport('markdown');
    return fallback.ok
      ? markdownResponse(await fallback.text())
      : withCORS(new NextResponse('MDX file not found', { status: 404 }));
  };

  const searchParams = new URL(request.url).searchParams;

  // `?allTabs=true` is the wider request, so it wins when both params are present.
  const everyTab = searchParams.get('allTabs') === 'true';

  // `?tabs=` naming nothing selectable (empty, or only separators) is a request
  // for no particular tab, not a request for every tab.
  const tabIds = everyTab ? [] : parseTabsParam(searchParams.get('tabs'));
  if (!everyTab && tabIds.length === 0) {
    return serveDefaultExport();
  }

  const allTabs = await fetchExport('markdown-all');
  if (!allTabs.ok) {
    return serveDefaultExport();
  }

  const markdown = await allTabs.text();
  return markdownResponse(everyTab ? markdown : filterTabs(markdown, tabIds));
}
