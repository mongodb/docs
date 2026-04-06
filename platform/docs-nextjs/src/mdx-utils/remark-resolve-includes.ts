import { visit } from 'unist-util-visit';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import type { Root } from 'mdast';
import type { Node, Parent } from 'unist';
import { getBlobString } from './blob-read';
import { MDX_PREFIX } from './get-blob-key';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';

/**
 * Shared remark processor for parsing MDX content.
 * Must match the parsing extensions used by compileMDX (via @mdx-js/mdx)
 * so that include ASTs are compatible when spliced into the parent tree.
 */
const mdxProcessor = remark().use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMdx);

interface IncludeNode {
  node: Node;
  index: number;
  parent: Parent;
  src: string;
}

interface RemarkResolveIncludesOptions {
  projectPath: string;
}

/**
 * Remark plugin that resolves <Include src="..." /> elements by fetching
 * the referenced MDX files and inlining their content into the AST.
 *
 * This allows downstream plugins (e.g. remarkHowToSeoMetadata) to see
 * the complete document tree including content from includes.
 */
export const remarkResolveIncludes = ({ projectPath }: RemarkResolveIncludesOptions) => {
  return async (tree: Root) => {
    await resolveIncludesInTree(tree, projectPath, new Set<string>());
  };
};

async function resolveIncludesInTree(tree: Root, projectPath: string, includeStack: Set<string>) {
  const nodesToReplace: IncludeNode[] = [];

  visit(tree, (node: Node, index: number | undefined, parent: Parent | undefined) => {
    if (index === undefined || !parent) return;

    if (
      (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
      (node as MdxJsxFlowElement).name === 'Include'
    ) {
      const srcAttr = (node as MdxJsxFlowElement).attributes?.find((attr) => (attr as MdxJsxAttribute).name === 'src');
      if (srcAttr?.value) {
        nodesToReplace.push({ node, index, parent, src: srcAttr.value as string });
      }
    }
  });

  if (!nodesToReplace.length) return;

  const resolved = await Promise.all(
    nodesToReplace.map(async (item) => {
      const replacement = await fetchAndParseInclude(item.src, projectPath, includeStack);
      return { ...item, replacement };
    }),
  );

  for (let i = resolved.length - 1; i >= 0; i--) {
    const { parent, index, replacement } = resolved[i];

    const inlinedChildren = replacement?.children?.filter((child: Node) => child.type !== 'yaml');

    if (inlinedChildren?.length) {
      parent.children.splice(index, 1, ...inlinedChildren);
    } else {
      parent.children.splice(index, 1);
    }
  }
}

async function fetchAndParseInclude(src: string, projectPath: string, includeStack: Set<string>): Promise<Root | null> {
  const normalized = src.replace(/^\/+/, '').replace(/\.mdx$/, '') + '.mdx';
  const filePath = `${projectPath}/${normalized}`;
  const blobKey = `${MDX_PREFIX}/${filePath}`;

  if (includeStack.has(blobKey)) {
    console.warn(`[remarkResolveIncludes] Circular include: ${[...includeStack, blobKey].join(' → ')}`);
    return null;
  }

  const nextStack = new Set(includeStack);
  nextStack.add(blobKey);

  try {
    const content = await getBlobString(blobKey);
    if (!content) {
      console.warn(`[remarkResolveIncludes] Could not load include: ${src} (key: ${blobKey})`);
      return null;
    }

    const parsed = mdxProcessor.parse(content);

    await resolveIncludesInTree(parsed, projectPath, nextStack);

    return parsed;
  } catch (err) {
    console.warn(`[remarkResolveIncludes] Failed to include: ${src}`, err);
    return null;
  }
}
