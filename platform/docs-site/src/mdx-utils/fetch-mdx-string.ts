import { getContentString } from './get-content-string';

/**
 * Fetch raw MDX string from the filesystem (content-mdx directory).
 * This is used for conversion to markdown, not for rendering.
 */
export const fetchMdxString = async (filePath: string): Promise<string | null> => {
  const mdxString = await getContentString(`${filePath}.mdx`);
  if (mdxString) return mdxString;
  return getContentString(`${filePath}/index.mdx`);
};
