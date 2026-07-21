import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import type { Root } from 'mdast';
import type { Node } from 'unist';
import { visit, SKIP } from 'unist-util-visit';

/**
 * Remark plugin that assigns sequential `stepNumber` attributes to
 * `<Step>` elements within each `<Procedure>`.
 *
 * Numbering restarts at 1 for every Procedure (including nested ones).
 * Must run after remarkResolveIncludes so included Steps are visible.
 */
export const remarkStepNumbers = () => {
  return (tree: Root) => {
    visit(tree, (node: Node) => {
      if (!isJsxElementNamed(node, 'Procedure')) return;

      let stepCounter = 0;
      for (const child of node.children) {
        if (isJsxElementNamed(child, 'Step')) {
          stepCounter++;
          setJsxStringAttribute(child, 'stepNumber', String(stepCounter));
        }
      }

      return SKIP;
    });
  };
};

const isJsxElementNamed = (node: Node, name: string): node is MdxJsxFlowElement => {
  return node.type === 'mdxJsxFlowElement' && (node as MdxJsxFlowElement).name === name;
};

/** Set (or overwrite) a string-valued JSX attribute on an element node. */
const setJsxStringAttribute = (node: MdxJsxFlowElement, name: string, value: string): void => {
  if (!node.attributes) node.attributes = [];

  const existing = node.attributes.find((a): a is MdxJsxAttribute => a.type === 'mdxJsxAttribute' && a.name === name);
  if (existing) {
    existing.value = value;
  } else {
    node.attributes.push({ type: 'mdxJsxAttribute', name, value });
  }
};
