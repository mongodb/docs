import fs from 'fs/promises';
import nodePath from 'path';
import { notFound, permanentRedirect } from 'next/navigation';
import { loadMDX } from '@/mdx-utils/load-mdx';
import { loadSiteMetadata } from '@/mdx-utils/load-site-metadata';
import envConfig from '@/utils/env-config';
import type { RemoteMetadata } from '@/types/data';
import { CustomTemplate } from './custom-template';
import type { ServerSideChangelogData } from '@/types/openapi';
import { getChangelogData } from '@/services/db/openapi';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';
import { generateDocsStaticPaths } from '@/utils/generate-docs-paths';
import { getIndexRedirectTarget } from '@/utils/index-redirect';

/** Normalize the optional catch-all segment to a concrete path array.
 * params.path is undefined at /docs/ (Next.js [[...path]] root match). */
const normalizeUrlPath = (path?: string[]): string[] => path ?? ['index'];

/** Files under an `_includes/` segment are include-only fragments, not standalone
 * pages. The <Include> component fetches them through loadMDX, but they must not be
 * directly routable — mirrors the legacy Gatsby behavior where only `.txt` files
 * became pages. Guard here at the route level rather than in loadMDX, which <Include>
 * depends on to fetch these same files. */
const isIncludeOnlyPath = (path: string[]): boolean =>
  path.includes('_includes') || path.includes('includes');

// Force static generation for all pages
export const dynamic = 'force-static';
// Lock dynamic params so unknown URLs return 404
export const dynamicParams = false;

interface PageProps {
  params: {
    path?: string[];
  };
}

export default async function MDXPage({ params }: PageProps) {
  const indexRedirect = getIndexRedirectTarget(params.path);
  if (indexRedirect) return permanentRedirect(indexRedirect);

  const path = normalizeUrlPath(params.path);

  const result = isIncludeOnlyPath(path) ? null : await loadMDX(path);

  if (!result || !result.frontmatter) {
    // Soft redirects are handled at the CDN edge (netlify/edge-functions).
    return notFound();
  }

  const template = result.frontmatter.template;
  let changelogData: ServerSideChangelogData | undefined;
  if (template === 'changelog') {
    changelogData = await getChangelogData();
  }

  let siteMetadata: RemoteMetadata;
  try {
    ({ siteMetadata } = await loadSiteMetadata(path));
  } catch (error) {
    console.error('[page.tsx] Error loading metadata: ', error);
    throw new Error('[page.tsx] Error loading metadata');
  }

  const docsets = await getAllDocsetsWithVersionsCached();

  return (
    <CustomTemplate
      content={result.content}
      frontmatter={result.frontmatter}
      path={path}
      metadata={siteMetadata}
      docsets={docsets}
      changelogData={changelogData}
      env={envConfig.DB_ENV}
    />
  );
}

export async function generateStaticParams() {
  const prefixedPaths = await generateDocsStaticPaths();

  // Debug index for local development
  const links = prefixedPaths
    .map(({ path: p }) => `  <li><a href="http://localhost:3000/docs/${p.join('/')}/">${p.join('/')}</a></li>`)
    .join('\n');
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Generated Pages</title></head>
<body>
<h1>Generated Pages (${prefixedPaths.length})</h1>
<ul>
${links}
</ul>
</body>
</html>`;
  await fs.writeFile(nodePath.join(process.cwd(), 'generated-pages.html'), html, 'utf-8');

  return prefixedPaths;
}

export async function generateMetadata({ params }: PageProps) {
  // If the last URL segment is "index", return null to avoid generating metadata for the index page.
  // We're redirecting to the parent path instead
  if (getIndexRedirectTarget(params.path)) return null;

  const path = normalizeUrlPath(params.path);

  const result = isIncludeOnlyPath(path) ? null : await loadMDX(path);

  if (!result || !result.frontmatter) {
    return notFound();
  }

  return {
    title: result.frontmatter.title || path.join(' '),
    description: result.frontmatter.description || '',
  };
}
