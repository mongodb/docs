import { getBlobStringWithFallback } from './blob-read';

/**
 * Fetch raw MDX string from blob store
 * This is used for conversion to markdown, not for rendering
 */
export const fetchMdxString = async (filePath: string): Promise<string | null> => {
  const mdxString = await getBlobStringWithFallback(`${filePath}.mdx`);
  if (mdxString) {
    return mdxString;
  }
  return await getBlobStringWithFallback(`${filePath}/index.mdx`);
};
