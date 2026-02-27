import type { ReactElement } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { components } from '@/mdx-components';
import { getBlobString } from './blob-read';
import { MDX_PREFIX } from './get-blob-key';
import { getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { findProjectPathAndSiteJson } from './load-metadata';

export const VERSION_PLACEHOLDER = ':version';

export const isVersionPlaceholder = (seg: string) => decodeURIComponent(seg) === VERSION_PLACEHOLDER;

/** Load and compile MDX with import resolution */
export const loadMDX = async (urlPath: string[]) => {
  if (process.env.BUILD_STATIC_PAGES === 'true') {
    return loadOfflineMDX(urlPath);
  }

  const { projectPath } = await findProjectPathAndSiteJson(urlPath);
  const injectedProps = { projectPath };
  const componentMapping = components(injectedProps);

  const filePath = urlPath.join('/');
  const mdxString = await fetchMdxString(filePath);
  if (!mdxString) {
    return null;
  }

  const { content, frontmatter } = await compileMDX({
    source: mdxString,
    components: componentMapping,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return { content, frontmatter };
};

/** Cache compiled MDX during static build **/
const mdxCache = new Map<string, { content: ReactElement; frontmatter: Record<string, unknown> }>();

const loadOfflineMDX = async (urlPath: string[]) => {
  const cacheKey = urlPath.join('/');
  const cached = mdxCache.get(cacheKey);
  if (cached) return cached;

  const version = getStaticVersion();
  const resolvedPath = urlPath.map((seg) => (isVersionPlaceholder(seg) ? version : seg));
  const isVersionAt1 = resolvedPath.length >= 2 && resolvedPath[1] === version;
  const projectPath = isVersionAt1 ? resolvedPath.slice(0, 2).join('/') : resolvedPath[0] ?? '';
  const componentMapping = components({ projectPath, includeRoot: projectPath });

  const filePath = resolvedPath.join('/');
  const mdxString = await fetchMdxString(filePath);
  if (!mdxString) return null;

  try {
    const { content, frontmatter } = await compileMDX({
      source: mdxString,
      components: componentMapping,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    const result = { content, frontmatter: frontmatter as Record<string, unknown> };
    mdxCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.warn(`[loadOfflineMDX] compile failed for ${cacheKey}:`, err instanceof Error ? err.message : err);
    return null;
  }
};

const fetchMdxString = async (filePath: string) => {
  // lookup the file by name
  const mdxString = await getBlobString(`${MDX_PREFIX}/${filePath}.mdx`);
  if (mdxString) {
    return mdxString;
  }
  // If not found by file name, try folder name with index path
  return await getBlobString(`${MDX_PREFIX}/${filePath}/index.mdx`);
};
