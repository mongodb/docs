import { NextResponse } from 'next/server';
import { mdxToMarkdown } from 'mdx-to-md';
import { withCORS } from '@/app/lib/with-cors';
import { fetchMdxString } from '@/mdx-utils/fetch-mdx-string';
import { findProjectPathAndSiteJson } from '@/mdx-utils/load-metadata';
import { preResolveImportsForMarkdownExport } from '@/mdx-utils/remark-pre-resolve-imports-for-markdown';
import { isVersionPlaceholder } from '@/mdx-utils/load-mdx';
import { loadDirNameToPrefixMap, blobRelativeToDiskCandidates } from '@/mdx-utils/blob-path-remap';
import { getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { generateDocsStaticPaths } from '@/utils/generate-docs-paths';

// The markdown export is prerendered at build time from the on-disk content-mdx
// directory (see content-constants). It cannot run as a request-time function
// because that content is not bundled into the serverless output — mirror the
// page route: force-static, lock params, and share generateDocsStaticPaths so
// both routes emit the same set of paths.
export const dynamic = 'force-static';
export const dynamicParams = false;

// Directive prepended to every markdown export so coding agents that discover a
// `.md` page via webfetch also learn about the docs-wide llms.txt index.
const LLMS_TXT_DIRECTIVE = '> For the complete MongoDB documentation index, see www.mongodb.com/docs/llms.txt';

interface RouteContext {
  params: {
    path: string[];
  };
}

/** Same set of paths as the HTML page route, plus a `.md` counterpart. */
export async function generateStaticParams() {
  return generateDocsStaticPaths();
}

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(_request: Request, { params }: RouteContext) {
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

    // Resolve the URL path to an on-disk MDX file and its project path. This
    // mirrors loadMDX's resolution (version placeholder → static version, then
    // prefix-map disk candidates), but returns the raw MDX string instead of
    // compiling it to React.
    const version = getStaticVersion();
    const resolvedPath = path.map((seg) => (isVersionPlaceholder(seg) ? version : seg));

    const prefixMap = await loadDirNameToPrefixMap();
    const candidates = blobRelativeToDiskCandidates(resolvedPath.join('/'), prefixMap);

    let mdxString: string | null = null;
    let diskPath: string | null = null;
    for (const candidate of candidates) {
      const found = await fetchMdxString(candidate);
      if (found !== null) {
        mdxString = found;
        diskPath = candidate;
        break;
      }
    }

    if (!mdxString) {
      return withCORS(new NextResponse('MDX file not found', { status: 404 }));
    }

    const fullPath = (diskPath ?? resolvedPath.join('/')).split('/');
    let projectPath: string;
    try {
      ({ projectPath } = await findProjectPathAndSiteJson(fullPath));
    } catch {
      // Fallback for include paths or pages where _site.json is not found
      projectPath = fullPath.length >= 2 ? fullPath.slice(0, 2).join('/') : fullPath[0] ?? '';
    }

    const resolvedMdx = await preResolveImportsForMarkdownExport(mdxString, projectPath);

    // Omit contentMdxDir: includes/refs are already resolved above.
    const markdown = await mdxToMarkdown(resolvedMdx, undefined, undefined, {});
    const markdownWithDirective = `${LLMS_TXT_DIRECTIVE}\n\n${markdown}`;

    return withCORS(
      new NextResponse(markdownWithDirective, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400, must-revalidate',
          Vary: 'Accept',
          'Netlify-Vary': 'header=Accept',
        },
      }),
    );
  } catch (error) {
    console.error('Error converting MDX to Markdown:', error);
    return withCORS(new NextResponse('Internal Server Error', { status: 500 }));
  }
}
