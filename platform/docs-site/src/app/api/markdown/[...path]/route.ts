import { createMarkdownGetHandler, generateMarkdownStaticParams } from '@/mdx-utils/markdown-route';

// The markdown export is prerendered at build time from the on-disk content-mdx
// directory (see content-constants). It cannot run as a request-time function
// because that content is not bundled into the serverless output — mirror the
// page route: force-static, lock params, and share generateDocsStaticPaths so
// both routes emit the same set of paths.
export const dynamic = 'force-static';
export const dynamicParams = false;

// NOTE: Do not export an OPTIONS (or any non-GET) handler here. Exporting
// another HTTP method opts the whole route out of static generation, so GET is
// no longer prerendered at build time and instead runs per request — where the
// on-disk content-mdx directory is not available, making every export 404.
// CORS preflight is handled in middleware (see src/middleware.ts) instead.

/** Default tabs: one per tabset. Served for a bare `.md` request. */
export const GET = createMarkdownGetHandler('default');

export const generateStaticParams = generateMarkdownStaticParams;
