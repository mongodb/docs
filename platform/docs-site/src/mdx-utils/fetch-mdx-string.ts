import { getContentString } from './get-content-string';
import { resolveMdxRelativePath } from './resolve-mdx-relative-path';

/**
 * Fetch raw MDX string from the filesystem (content-mdx directory). Routes are
 * lowercase while conversion may still emit mixed-case filenames, so resolve
 * the path case-insensitively.
 */
export const fetchMdxString = async (filePath: string): Promise<string | null> => {
  const namedPath = await resolveMdxRelativePath(`${filePath}.mdx`);
  if (process.env.WITH_LOGS === 'true') {
    console.log(`[fetchMdxString] trying ${namedPath}`);
  }
  const mdxString = await getContentString(namedPath);
  if (mdxString !== null) return mdxString;

  const indexPath = await resolveMdxRelativePath(`${filePath}/index.mdx`);
  if (process.env.WITH_LOGS === 'true') {
    console.log(`[fetchMdxString] not found, trying ${indexPath}`);
  }
  return getContentString(indexPath);
};
