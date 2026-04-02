import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import type { MdastNode } from './convertSnootyAstToMdast/types';
import type { Root } from 'mdast';

// Matches `<` followed by anything that isn't a valid tag start or whitespace (e.g. `<=`, `<100`)
const INVALID_TAG_OPENER = /<(?![a-zA-Z$_\s])/;

/** Splits a text string at invalid `<` openers, replacing each with an html node that emits `\<` verbatim. */
function splitTextAtInvalidOpeners(value: string): Array<{ type: string; value: string }> {
  const parts: Array<{ type: string; value: string }> = [];
  const re = /<(?![a-zA-Z$_\s])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: value.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'html', value: '\\<' });
    lastIndex = match.index + 1; // skip past `<`
  }

  if (lastIndex < value.length) {
    parts.push({ type: 'text', value: value.slice(lastIndex) });
  }

  return parts;
}

/** Walks a node's children and splits any text nodes containing invalid `<` sequences. */
function escapeTextInChildren(node: MdastNode): void {
  if (!Array.isArray(node.children)) return;

  let i = 0;
  while (i < node.children.length) {
    const child = node.children[i];

    if (child.type === 'text' && child.value !== undefined && INVALID_TAG_OPENER.test(child.value)) {
      const parts = splitTextAtInvalidOpeners(child.value);
      node.children.splice(i, 1, ...parts);
      i += parts.length;
    } else {
      // skip code/inlineCode — their content is already safe
      if (child.children && child.type !== 'code' && child.type !== 'inlineCode') {
        escapeTextInChildren(child);
      }
      i++;
    }
  }
}

/** Finds all nodes in the tree and escapes invalid `<` sequences in their text children. */
function injectAngleBracketEscapes(node: MdastNode): void {
  if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
    escapeTextInChildren(node);
    return;
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      injectAngleBracketEscapes(child);
    }
  }
}

/** Convert an mdast tree to an MDX string. */
export const convertMdastToMdx = (tree: MdastNode) => {
  injectAngleBracketEscapes(tree);

  const processor = remark().use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMdx);

  return processor.stringify(tree as unknown as Root);
};
