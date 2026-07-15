import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { loadMDX } from '@/mdx-utils/load-mdx';
import { getSiteMetadata } from '@/mdx-utils/load-metadata';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';
import envConfig from '@/utils/env-config';
import type { Docset, RemoteMetadata } from '@/types/data';
import { CustomTemplate } from './custom-template';
import { getPageMetadata } from '@/utils/seo';
import type { ServerSideChangelogData } from '@/types/openapi';
import { getChangelogData } from '@/services/db/openapi';
import { findSoftRedirect } from '@/redirects/soft-redirects';
import { getIndexRedirectTarget } from '@/utils/index-redirect';

/** Normalize the optional catch-all segment to a concrete path array.
 * params.path is undefined at /docs/ (Next.js [[...path]] root match). */
const normalizeUrlPath = (path?: string[]): string[] => path ?? ['index'];

/** Files under an `_includes/` segment are include-only fragments, not standalone
 * pages. The <Include> component fetches them through loadMDX, but they must not be
 * directly routable — mirrors the legacy Gatsby behavior where only `.txt` files
 * became pages. Guard here at the route level rather than in loadMDX, which <Include>
 * depends on to fetch these same files. */
const isIncludeOnlyPath = (path: string[]): boolean => path.includes('_includes');

// ISR (Incremental Static Regeneration) behavior
export const revalidate = 60 * 60; // 1 hour in seconds
export const dynamic = 'force-static'; // Pages should be statically generated

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
    // Page not found, check soft redirects before returning 404.
    // This replicates Netlify's force=false behavior where
    // redirects only fire when no page exists at the source path.
    const urlPath = `/docs/${path.join('/')}/`;
    const softMatch = findSoftRedirect(urlPath);
    if (softMatch) {
      return redirect(softMatch.destination);
    }
    return notFound();
  }

  const template = result.frontmatter.template;
  let changelogData: ServerSideChangelogData | undefined;
  if (template === 'changelog') {
    changelogData = await getChangelogData();
  }

  let siteMetadata: RemoteMetadata;
  try {
    ({ siteMetadata } = await getSiteMetadata(path));
  } catch (error) {
    console.error('[page.tsx] Error loading metadata: ', error);
    throw new Error('[page.tsx] Error loading metadata');
  }

  const docsets = await getAllDocsetsWithVersionsCached();
  const env = envConfig.DB_ENV;

  return (
    <CustomTemplate
      content={result.content}
      frontmatter={result.frontmatter}
      path={path}
      metadata={siteMetadata}
      docsets={docsets}
      changelogData={changelogData}
      env={env}
    />
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  // If the last URL segment is "index", return null to avoid generating metadata for the index page.
  // We're redirecting to the parent path instead
  if (getIndexRedirectTarget(params.path)) return null;

  const path = normalizeUrlPath(params.path);

  const result = isIncludeOnlyPath(path) ? null : await loadMDX(path);

  if (!result || !result.frontmatter) {
    // Mirror the page component's soft-redirect check. When a soft redirect
    // matches, the page component issues the redirect, so metadata generation
    // must not call notFound() here — doing so races the redirect and causes
    // intermittent 404s for redirect-only paths. Return null and let the page
    // component handle the redirect.
    const urlPath = `/docs/${path.join('/')}/`;
    if (findSoftRedirect(urlPath)) {
      return null;
    }
    return notFound();
  }

  let siteMetadata: RemoteMetadata;
  try {
    ({ siteMetadata } = await getSiteMetadata(path));
  } catch (error) {
    console.error('[page.tsx] Error loading metadata: ', error);
    throw new Error('[page.tsx] Error loading metadata');
  }

  const docsets = await getAllDocsetsWithVersionsCached();
  const docset = docsets.find((docset: Docset) => docset.project === siteMetadata.project);

  let metadata = null;
  if (docset) {
    metadata = getPageMetadata({ frontmatter: result.frontmatter, snootyMetadata: siteMetadata, docset });
  }
  return metadata;
}
