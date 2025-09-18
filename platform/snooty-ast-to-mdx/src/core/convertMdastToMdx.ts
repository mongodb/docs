import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import type { Root } from './convertSnootyAstToMdast/types';

/** Convert an mdast tree to an MDX string. */
export const convertMdastToMdx = (tree: Root) => {
  const processor = remark().use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMdx);

  return processor.stringify(tree);
};
