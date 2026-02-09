import { getBlobString } from './blob-read';
import { MDX_PREFIX } from './get-blob-key';

/**
 * Fetch raw MDX string from blob store
 * This is used for conversion to markdown, not for rendering
 */
export const fetchMdxString = async (filePath: string): Promise<string | null> => {
  // lookup the file by name
  const mdxString = await getBlobString(`${MDX_PREFIX}/${filePath}.mdx`);
  if (mdxString) {
    return mdxString;
  }
  // If not found by file name, try folder name with index path
  return await getBlobString(`${MDX_PREFIX}/${filePath}/index.mdx`);
};
