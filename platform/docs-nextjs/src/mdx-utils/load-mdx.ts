import type { ReactElement } from 'react';
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
import { MDX_PREFIX } from './get-blob-key';
import { getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { getSiteMetadata } from './load-metadata';

export const VERSION_PLACEHOLDER = ':version';

export const isVersionPlaceholder = (seg: string) => decodeURIComponent(seg) === VERSION_PLACEHOLDER;

const fetchMdxString = async (filePath: string) => {
  // lookup the file by name
  const mdxString = await getBlobString(`${MDX_PREFIX}/${filePath}.mdx`);
  if (mdxString) {
    return mdxString;
  }
  // If not found by file name, try folder name with index path
  return await getBlobString(`${MDX_PREFIX}/${filePath}/index.mdx`);
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

/** Load and compile MDX, including fetching metadata from JSON files */
export const loadMDX = async (urlPath: string[], replacements?: Record<string, React.ReactNode>) => {
  if (process.env.BUILD_STATIC_PAGES === 'true') {
    return loadOfflineMDX(urlPath, replacements);
  }

  const { projectPath } = await getSiteMetadata(urlPath);
  const injectedProps = { projectPath, replacements };
  const componentMapping = components(injectedProps);

  const filePath = urlPath.join('/');
  const mdxString = await fetchMdxString(filePath);
  if (!mdxString) {
    return null;
  }

  const { content, frontmatter } = await compileMdxWithPlugins({
    mdxString,
    componentMapping,
    projectPath,
  });

  return { content, frontmatter };
};

/** Cache compiled MDX during static build **/
const mdxCache = new Map<string, { content: ReactElement; frontmatter: Record<string, unknown> }>();

const loadOfflineMDX = async (urlPath: string[], replacements?: Record<string, React.ReactNode>) => {
  const cacheKey = urlPath.join('/');
  const cached = mdxCache.get(cacheKey);
  if (cached) return cached;

  const version = getStaticVersion();
  const resolvedPath = urlPath.map((seg) => (isVersionPlaceholder(seg) ? version : seg));
  const isVersionAt1 = resolvedPath.length >= 2 && resolvedPath[1] === version;
  const projectPath = isVersionAt1 ? resolvedPath.slice(0, 2).join('/') : resolvedPath[0] ?? '';
  const componentMapping = components({
    projectPath,
    includeRoot: projectPath,
    replacements,
  });

  const filePath = resolvedPath.join('/');
  const mdxString = await fetchMdxString(filePath);
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
