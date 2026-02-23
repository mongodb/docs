import { notFound } from 'next/navigation';
import { toc } from '@/context/toc-data';
import { loadMDX, isVersionPlaceholder } from '@/mdx-utils/load-mdx';
import type { RemoteMetadata } from '@/types/data';
import { getPathArraysFromTocItems, getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { CustomTemplate } from './custom-template';

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

  const metadata = getMinimalMetadataForStatic(path);
  return (
    <>
      <CustomTemplate content={result.content} frontmatter={result.frontmatter} path={path} metadata={metadata} />
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
  if (process.env.BUILD_STATIC_PAGES !== 'true') return [];
  const version = getStaticVersion();
  return getPathArraysFromTocItems(toc).map(({ path }) => ({
    path: path.map((seg) => (isVersionPlaceholder(seg) ? version : seg)),
  }));
}
