import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { components } from '@/mdx-components';
import { getBlobString } from './blob-read';
import { MDX_PREFIX } from './get-blob-key';

/** Load and compile MDX with import resolution */
export const loadMDX = async (urlPath: string[]) => {
  // get the project path from the url, which should be the first two segments: project name and version
  // TODO: update this to determine whether or not a versioned project based on "repos_branches"
  const projectPath = urlPath.slice(0, 2).join('/');

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

const fetchMdxString = async (filePath: string) => {
  // lookup the file by name
  const mdxString = await getBlobString(`${MDX_PREFIX}/${filePath}.mdx`);
  if (mdxString) {
    return mdxString;
  }
  // If not found by file name, try folder name with index path
  return await getBlobString(`${MDX_PREFIX}/${filePath}/index.mdx`);
};
