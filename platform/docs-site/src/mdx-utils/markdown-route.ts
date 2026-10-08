import { NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { markdownResponse } from '@/app/lib/markdown-response';
import { generateDocsStaticPaths } from '@/utils/generate-docs-paths';
import { renderPageMarkdown, type MarkdownTabMode } from '@/mdx-utils/render-page-markdown';

interface RouteContext {
  params: {
    // Undefined at the basePath root: the routes are optional catch-alls
    // ([[...path]]), like the HTML page route.
    path?: string[];
  };
}

/**
 * Same set of paths as the HTML page route, for each markdown variant.
 *
 * That includes a non-versioned ("leaf") docset's own root/index page, whose
 * path is empty once basePath-relative stripping removes all of its segments.
 * The routes are optional catch-alls so the empty path is a valid param.
 */
export async function generateMarkdownStaticParams() {
  return generateDocsStaticPaths();
}

/**
 * Build the GET handler for a markdown export route. Both the default-tabs and
 * all-tabs routes are prerendered from the same content and differ only in
 * which tabs they emit, so they share everything but the mode.
 */
export function createMarkdownGetHandler(mode: MarkdownTabMode) {
  return async function GET(_request: Request, { params }: RouteContext) {
    try {
      const markdown = await renderPageMarkdown(params.path ?? [], mode);

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
