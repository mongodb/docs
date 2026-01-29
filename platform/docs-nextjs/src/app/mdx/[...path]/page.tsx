import { notFound } from 'next/navigation';
import { loadMDX } from '@/mdx-utils/load-mdx';
import { loadMetadata } from '@/mdx-utils/load-metadata';
import type { RemoteMetadata } from '@/types/data';
import { CustomTemplate } from './custom-template';

// ISR (Incremental Static Regeneration) behavior
export const revalidate = 24 * 60 * 60; // 1 day in seconds
export const dynamic = 'force-static'; // Pages should be statically generated

interface PageProps {
  params: {
    path: string[];
  };
}

export default async function MDXPage({ params: { path } }: PageProps) {
  // TODO: type the returned value from loadMDX
  const result = await loadMDX(path);

  if (!result) {
    return notFound();
  }

  let metadata: RemoteMetadata;
  try {
    metadata = await loadMetadata(path);
  } catch (error) {
    console.error('[page.tsx] Error loading metadata: ', error);
    throw new Error('[page.tsx] Error loading metadata');
  }

  return (
    <>
      <CustomTemplate content={result.content} frontmatter={result.frontmatter} path={path} metadata={metadata} />
    </>
  );
}

// Generate metadata for the page
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

// TODO: uncomment this when we have a list of paths to pregenerate
// Generate static paths for most popular paths
// export async function generateStaticParams() {
//   const paths = ['django-mongodb/current', 'django-mongodb/current/get-started', 'django-mongodb/current/connect'];

//   return paths.map((path) => ({ path: path.split('/') }));
// }
