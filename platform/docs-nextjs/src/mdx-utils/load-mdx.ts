import type { ReactElement } from 'react';
import { cache } from './react-cache';
import type { MDXComponents } from 'mdx/types';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkSectionize from 'remark-sectionize';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import { remarkHowToSeoMetadata } from './remark-how-to-seo-metadata';
import { remarkResolveImports } from './remark-resolve-imports';
import { remarkStepNumbers } from './remark-step-numbers';
import { components } from '@/mdx-components';
import { getBlobString } from './blob-read';
import { getBlobKey } from './get-blob-key';
import { getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { getSiteMetadata } from './load-metadata';

export const VERSION_PLACEHOLDER = ':version';

export const isVersionPlaceholder = (seg: string) => decodeURIComponent(seg) === VERSION_PLACEHOLDER;

const fetchMdxString = async (filePath: string) => {
  const pageKey = getBlobKey(`${filePath}.mdx`);
  const mdxString = await getBlobString(pageKey);
  if (mdxString) return mdxString;

  const blobString = await getBlobString(getBlobKey(`${filePath}/index.mdx`));
  if (!blobString) {
    console.warn('[fetchMdxString] NOT FOUND in blob store:', { pageKey });
  }
  return blobString;
};

interface CompileMdxWithPluginsOptions {
  mdxString: string;
  componentMapping: MDXComponents;
  projectPath: string;
}

const compileMdxWithPlugins = async ({ mdxString, componentMapping, projectPath }: CompileMdxWithPluginsOptions) => {
  try {
    return await compileMDX({
      source: mdxString,
      components: componentMapping,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [
            [remarkResolveImports, { projectPath }],
            remarkGfm,
            remarkSectionize,
            remarkStepNumbers,
            remarkHowToSeoMetadata,
          ],
          rehypePlugins: [rehypeMdxCodeProps],
        },
      },
    });
  } catch (err) {
    console.error(`[compileMdxWithPlugins] failed (${err instanceof Error ? err.message : err})`);
    throw err;
  }
};

/**
 * Per-request cache so MDXPage and generateMetadata share one compilation
 * result for the same path instead of running compileMDX twice.
 */
const loadMDXCached = cache(async (pathKey: string) => {
  const urlPath = pathKey.split('/');
  const { projectPath } = await getSiteMetadata(urlPath);
  const componentMapping = components({ projectPath });

  const mdxString = await fetchMdxString(pathKey);
  if (!mdxString) {
    return null;
  }

  const { content, frontmatter } = await compileMdxWithPlugins({ mdxString, componentMapping, projectPath });
  return { content, frontmatter };
});

/** Load and compile MDX, including fetching metadata from JSON files */
export const loadMDX = async (urlPath: string[], replacements?: Record<string, React.ReactNode>) => {
  if (process.env.BUILD_STATIC_PAGES === 'true') {
    return loadOfflineMDX(urlPath, replacements);
  }

  // Per-instance replacements make the output unique per call site, so skip
  // the request-scoped cache when they are present (e.g. the Include component).
  if (replacements !== undefined) {
    const pathKey = urlPath.join('/');
    const { projectPath } = await getSiteMetadata(urlPath);
    const componentMapping = components({ projectPath, replacements });
    const mdxString = await fetchMdxString(pathKey);
    if (!mdxString) return null;
    const { content, frontmatter } = await compileMdxWithPlugins({ mdxString, componentMapping, projectPath });
    return { content, frontmatter };
  }

  return loadMDXCached(urlPath.join('/'));
};

/** Cache compiled MDX during static build **/
const mdxCache = new Map<string, { content: ReactElement; frontmatter: Record<string, unknown> }>();

const loadOfflineMDX = async (urlPath: string[], replacements?: Record<string, React.ReactNode>) => {
  const cacheKey = urlPath.join('/');
  const cached = mdxCache.get(cacheKey);
  if (cached) return cached;

  const { projectPath } = await getSiteMetadata(urlPath);
  const filePath = urlPath.join('/');
  const mdxString = await fetchMdxString(filePath);
  const componentMapping = components({
    projectPath,
    includeRoot: projectPath,
    replacements,
  });

  if (!mdxString) return null;

  try {
    const { content, frontmatter } = await compileMdxWithPlugins({
      mdxString,
      componentMapping,
      projectPath,
    });

    const result = {
      content,
      frontmatter: frontmatter as Record<string, unknown>,
    };
    mdxCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.warn(`[loadOfflineMDX] compile failed for ${cacheKey}:`, err instanceof Error ? err.message : err);
    return null;
  }
};
