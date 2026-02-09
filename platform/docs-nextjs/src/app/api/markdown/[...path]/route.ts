import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { fetchMdxString } from '@/mdx-utils/fetch-mdx-string';
import { CONTENT_MDX_DIR } from '@/mdx-utils/blob-upload';
import { mdxToMarkdown } from 'mdx-to-md';
import { withCORS } from '@/app/lib/with-cors';

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

    // Convert MDX to Markdown
    // The sourceFilePath is the full path for version context (e.g., "manual/upcoming/core/transactions")
    const sourceFilePath = filePath;
    const markdown = await mdxToMarkdown(mdxString, CONTENT_MDX_DIR, sourceFilePath);

    // Return markdown with proper content type
    return withCORS(
      new NextResponse(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }),
    );
  } catch (error) {
    console.error('Error converting MDX to Markdown:', error);
    return withCORS(new NextResponse('Internal Server Error', { status: 500 }));
  }
}
