import { notFound } from 'next/navigation';
import { loadMDX } from '@/mdx-utils/load-mdx';
import { loadSiteMetadata } from '@/mdx-utils/load-site-metadata';
import type { RemoteMetadata } from '@/types/data';
import { getPathArraysFromTocItems, getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { toc } from '@/context/toc-data/offline-toc-processed';
import envConfig from '@/utils/env-config';
import { CustomTemplate } from './custom-template';
import type { ServerSideChangelogData } from '@/types/openapi';
import { getChangelogData } from '@/services/db/openapi';

export const dynamic = 'force-static';

interface PageProps {
  params: { path: string[] };
}

/** Offline metadata: project from path[0], branch from getStaticVersion(). */
// TODO: update this to ensure we have the correct metadata for the page
function getMinimalMetadataForStatic(path: string[]): RemoteMetadata {
  return {
    project: path[0] ?? '',
    branch: getStaticVersion(),
    title: '',
    eol: true,
    slugToTitle: {},
    toctree: {
      title: [{ type: 'text', value: '' }],
      slug: '',
      children: [],
      type: 'directive',
    },
    toctreeOrder: [],
    parentPaths: {},
    static_files: {},
  };
}

export default async function MDXOfflinePage({ params: { path } }: PageProps) {
  const result = await loadMDX(path);
  if (!result) return notFound();

  const template = result.frontmatter.template;
  let changelogData: ServerSideChangelogData | undefined;
  if (template === 'changelog') {
    changelogData = await getChangelogData();
  }

  let metadata: RemoteMetadata;
  if (process.env.DOCS_PROJECT) {
    try {
      ({ siteMetadata: metadata } = await loadSiteMetadata(path));
    } catch {
      metadata = getMinimalMetadataForStatic(path);
    }
  } else {
    metadata = getMinimalMetadataForStatic(path);
  }

  return (
    <>
      <CustomTemplate
        content={result.content}
        frontmatter={result.frontmatter}
        path={path}
        metadata={metadata}
        changelogData={changelogData}
        docsets={[]}
        env={envConfig.DB_ENV}
      />
    </>
  );
}

export async function generateMetadata({ params: { path } }: PageProps) {
  const result = await loadMDX(path);

  if (!result) {
    return { title: 'Not Found' };
  }

  return {
    title: result.frontmatter.title || path.join(' '),
    description: result.frontmatter.description || '',
  };
}

export async function generateStaticParams() {
  // TOC-based path generation (for build:offline). Checked first so DOCS_PROJECT
  // (used by build:project) has no effect on offline builds even if it's set.
  if (process.env.BUILD_STATIC_PAGES === 'true') {
    return getPathArraysFromTocItems(toc);
  }

  return [];
}
