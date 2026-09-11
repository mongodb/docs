import { createMarkdownGetHandler, generateMarkdownStaticParams } from '@/mdx-utils/markdown-route';

// The all-tabs companion to /api/markdown. Prerendered under the same
// constraints (see that route): the content-mdx directory it reads exists only
// at build time, so this cannot become a request-time handler.
//
// Nothing links or rewrites here. /api/markdown-tabs reads it to answer both
// `?allTabs=true` and `?tabs=<id,...>` — neither of which the prerendered
// default export can express, since a static file cannot vary by query string.
//
// It answers 404 for a page with no tabs, which is not built (see
// renderPageMarkdown); the reading route treats that as "serve the default
// export".
export const dynamic = 'force-static';
export const dynamicParams = false;

/** Every tab, delimited by the markers `filterTabs` reads. */
export const GET = createMarkdownGetHandler('all');

export const generateStaticParams = generateMarkdownStaticParams;
