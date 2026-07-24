import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { fetchMdxString } from '@/mdx-utils/fetch-mdx-string';
import { mdxToMarkdown } from 'mdx-to-md';
import { withCORS } from '@/app/lib/with-cors';
import { getSiteMetadata } from '@/mdx-utils/load-metadata';
import { preResolveImportsForMarkdownExport } from '@/mdx-utils/remark-pre-resolve-imports-for-markdown';
import { resolveTabDefaults } from '@/mdx-utils/resolve-tab-defaults';

interface RouteContext {
  params: {
    path: string[];
  };
}

const TAB_INFO_PREAMBLE = [
  'Tab options on this page. Append to the .md URL to filter:',
  '  ?tabs=<id,...>   select specific tabs (e.g. ?tabs=nodejs,shell)',
  '  ?allTabs=true    include every tab',
  '  (no param)       default: one tab per tabset',
].join('\n');

// Directive prepended to every markdown export so coding agents that discover a
// `.md` page via webfetch also learn about the docs-wide llms.txt index.
const LLMS_TXT_DIRECTIVE = '> For the complete MongoDB documentation index, see www.mongodb.com/docs/llms.txt';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { path } = params;

    if (!path || path.length === 0) {
      return withCORS(
        new NextResponse(JSON.stringify({ error: 'Path is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }

    // Get the raw MDX string from blob store
    // Join path array to create file path (e.g., ['manual', 'upcoming', 'core', 'transactions'] -> 'manual/upcoming/core/transactions')
    const filePath = path.join('/');
    const mdxString = await fetchMdxString(filePath);

    if (!mdxString) {
      return withCORS(new NextResponse('MDX file not found', { status: 404 }));
    }

    // Match the docs page: projectPath drives blob keys for includes and _references.json
    const { projectPath } = await getSiteMetadata(path);
    const resolvedMdx = await preResolveImportsForMarkdownExport(mdxString, projectPath);

    // Tab selection precedence:
    //   ?allTabs=true   -> emit every tab
    //   ?tabs=<id,...>  -> explicit allow-list by stable tabid
    //   (no param)      -> defaults only: one tab per tabset (mirrors the
    //                      tab the rendered page shows on initial load)
    const allTabs = request.nextUrl.searchParams.get('allTabs') === 'true';
    const tabsParam = request.nextUrl.searchParams.get('tabs');
    const tabFilters = tabsParam
      ?.split(',')
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    let tabOptions: {
      tabFilters?: string[];
      defaultTabsOnly?: boolean;
      tabsetDefaults?: Record<string, string>;
      tabInfoComment?: string;
    };
    if (allTabs) {
      tabOptions = {};
    } else if (tabFilters && tabFilters.length > 0) {
      tabOptions = { tabFilters };
    } else {
      tabOptions = { defaultTabsOnly: true, tabsetDefaults: resolveTabDefaults(mdxString) };
    }
    tabOptions.tabInfoComment = TAB_INFO_PREAMBLE;

    // Omit contentMdxDir: includes/refs are already resolved from the blob store above.
    const markdown = await mdxToMarkdown(resolvedMdx, undefined, undefined, tabOptions);
    const markdownWithDirective = `${LLMS_TXT_DIRECTIVE}\n\n${markdown}`;

    return withCORS(
      new NextResponse(markdownWithDirective, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400, must-revalidate',
           Vary: 'Accept',
          'Netlify-Vary': 'query=tabs|allTabs|header=Accept',
        },
      }),
    );
  } catch (error) {
    console.error('Error converting MDX to Markdown:', error);
    return withCORS(new NextResponse('Internal Server Error', { status: 500 }));
  }
}
