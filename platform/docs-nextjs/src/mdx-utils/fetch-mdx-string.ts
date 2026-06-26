import { getBlobString } from './blob-read';
import { getBlobKey } from './get-blob-key';

/**
 * Fetch raw MDX string from blob store
 * This is used for conversion to markdown, not for rendering
 */
export const fetchMdxString = async (filePath: string): Promise<string | null> => {
  const mdxString = await getBlobString(getBlobKey(`${filePath}.mdx`));
  if (mdxString) {
    return mdxString;
  }
  return await getBlobString(getBlobKey(`${filePath}/index.mdx`));
};
