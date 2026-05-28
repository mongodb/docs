import { notFound, redirect } from 'next/navigation';
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

/** Normalize the optional catch-all segment to a concrete path array.
 * params.path is undefined at /docs/ (Next.js [[...path]] root match). */
const normalizeUrlPath = (path?: string[]): string[] => path ?? ['index'];

// ISR (Incremental Static Regeneration) behavior
export const revalidate = 60 * 60; // 1 hour in seconds
export const dynamic = 'force-static'; // Pages should be statically generated

interface PageProps {
  params: {
    path?: string[];
  };
}

export default async function MDXPage({ params }: PageProps) {
  const path = normalizeUrlPath(params.path);
  const result = await loadMDX(path);

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
  const path = normalizeUrlPath(params.path);
  const result = await loadMDX(path);

  if (!result || !result.frontmatter) {
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
