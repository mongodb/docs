import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { fetchMdxString } from '@/mdx-utils/fetch-mdx-string';
import { mdxToMarkdown } from 'mdx-to-md';
import { withCORS } from '@/app/lib/with-cors';
import { getSiteMetadata } from '@/mdx-utils/load-metadata';
import { preResolveImportsForMarkdownExport } from '@/mdx-utils/remark-pre-resolve-imports-for-markdown';

interface RouteContext {
  params: {
    path: string[];
  };
}

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

    // Optional ?tabs=<tabid>[,<tabid>...] filters the export to the named
    // tabs by their stable tabid. Absent param = all tabs (unchanged).
    const tabsParam = request.nextUrl.searchParams.get('tabs');
    const tabFilters = tabsParam
      ?.split(',')
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    // Omit contentMdxDir: includes/refs are already resolved from the blob store above.
    const markdown = await mdxToMarkdown(resolvedMdx, undefined, undefined, {
      tabFilters,
    });

    return withCORS(
      new NextResponse(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400, must-revalidate',
          Vary: 'Accept',
          'Netlify-Vary': 'query=tabs|header=Accept',
        },
      }),
    );
  } catch (error) {
    console.error('Error converting MDX to Markdown:', error);
    return withCORS(new NextResponse('Internal Server Error', { status: 500 }));
  }
}
