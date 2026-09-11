import { NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { markdownResponse } from '@/app/lib/markdown-response';
import { generateDocsStaticPaths } from '@/utils/generate-docs-paths';
import { renderPageMarkdown, type MarkdownTabMode } from '@/mdx-utils/render-page-markdown';

interface RouteContext {
  params: {
    path: string[];
  };
}

/**
 * Same set of paths as the HTML page route, for each markdown variant.
 *
 * A mandatory [...path] catch-all cannot represent a zero-segment export
 * path. This only occurs for a non-versioned ("leaf") docset's own root/
 * index page, once basePath-relative stripping removes its entire path —
 * that page still renders fine via page.tsx's optional catch-all; it just
 * has no .md export at the bare project root.
 */
export async function generateMarkdownStaticParams() {
  const paths = await generateDocsStaticPaths();
  return paths.filter(({ path }) => path.length > 0);
}

/**
 * Build the GET handler for a markdown export route. Both the default-tabs and
 * all-tabs routes are prerendered from the same content and differ only in
 * which tabs they emit, so they share everything but the mode.
 */
export function createMarkdownGetHandler(mode: MarkdownTabMode) {
  return async function GET(_request: Request, { params }: RouteContext) {
    try {
      if (!params.path || params.path.length === 0) {
        return withCORS(
          new NextResponse(JSON.stringify({ error: 'Path is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }

      const markdown = await renderPageMarkdown(params.path, mode);

      if (markdown === null) {
        return withCORS(new NextResponse('MDX file not found', { status: 404 }));
      }

      return markdownResponse(markdown);
    } catch (error) {
      console.error('Error converting MDX to Markdown:', error);
      return withCORS(new NextResponse('Internal Server Error', { status: 500 }));
    }
  };
}
