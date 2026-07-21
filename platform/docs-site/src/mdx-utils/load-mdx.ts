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
import { findProjectPathAndSiteJson } from './load-metadata';
import { getContentString } from './get-content-string';
import { getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { loadDirNameToPrefixMap, blobRelativeToDiskCandidates } from './blob-path-remap';

export const VERSION_PLACEHOLDER = ':version';

export const isVersionPlaceholder = (seg: string) => decodeURIComponent(seg) === VERSION_PLACEHOLDER;

/** Cache the prefix map for the lifetime of the build process. */
let _prefixMap: Record<string, string> | undefined;
async function getPrefixMap(): Promise<Record<string, string>> {
  if (_prefixMap) return _prefixMap;
  _prefixMap = await loadDirNameToPrefixMap();
  return _prefixMap;
}

const fetchMdxString = async (filePath: string): Promise<string | null> => {
  const namedPath = `${filePath}.mdx`;
  if (process.env.WITH_LOGS === 'true') {
    console.log(`[fetchMdxString] trying ${namedPath}`);
  }
  const mdxString = await getContentString(namedPath);
  if (mdxString !== null) return mdxString;

  const indexPath = `${filePath}/index.mdx`;
  if (process.env.WITH_LOGS === 'true') {
    console.log(`[fetchMdxString] not found, trying ${indexPath}`);
  }
  return getContentString(indexPath);
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
  return loadOfflineMDX(urlPath, replacements);
};

/** Cache compiled MDX during static build **/
const mdxCache = new Map<string, { content: ReactElement; frontmatter: Record<string, unknown> }>();

const loadOfflineMDX = async (urlPath: string[], replacements?: Record<string, React.ReactNode>) => {
  const cacheKey = urlPath.join('/');
  const cached = mdxCache.get(cacheKey);
  if (cached) return cached;

  const version = getStaticVersion();
  const resolvedPath = urlPath.map((seg) => (isVersionPlaceholder(seg) ? version : seg));

  // Map the URL path (which matches the blob store key structure) back to a filesystem path
  // under the content-mdx directory using the dir-name-to-prefix.json reverse mapping.
  // Candidates are sorted longest-prefix-first; we take the first that resolves to a file.
  let mdxString: string | null = null;
  let diskPath: string | null = null;

  const prefixMap = await getPrefixMap();
  const candidates = blobRelativeToDiskCandidates(resolvedPath.join('/'), prefixMap);
  for (const candidate of candidates) {
    const foundMdxString = await fetchMdxString(candidate);
    if (foundMdxString !== null) {
      mdxString = foundMdxString;
      diskPath = candidate;
      break;
    }
  }

  const fullPath = (diskPath ?? resolvedPath.join('/')).split('/');

  let projectPath: string;
  try {
    ({ projectPath } = await findProjectPathAndSiteJson(fullPath));
  } catch {
    // Fallback for include paths or pages where _site.json is not found
    projectPath = fullPath.length >= 2 ? fullPath.slice(0, 2).join('/') : fullPath[0] ?? '';
  }

  if (process.env.WITH_LOGS === 'true') {
    console.log(`[loadMDX] urlPath=${urlPath.join('/')} → diskPath=${fullPath.join('/')} projectPath=${projectPath}`);
  }
  const componentMapping = components({
    projectPath,
    includeRoot: projectPath,
    replacements,
  });

  if (!mdxString) {
    console.warn(`[loadMDX] no MDX found for ${fullPath.join('/')}`);
    return null;
  }

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
    console.warn(`[loadMDX] compile failed for ${cacheKey}:`, err instanceof Error ? err.message : err);
    return null;
  }
};
