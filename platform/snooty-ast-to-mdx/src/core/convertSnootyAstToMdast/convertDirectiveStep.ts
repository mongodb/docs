import type { ConversionContext, SnootyNode, MdastNode, ConvertChildrenFn } from './types';

interface ConvertDirectiveStepArgs {
  node: SnootyNode;
  ctx: ConversionContext;
  depth: number;
  convertChildren: ConvertChildrenFn;
}

/**
 * Convert a single `step` directive into a `<Step>` element with a
 * `<StepHeading>` child derived from the directive argument.
 *
 * Filters out the duplicate `directive_argument` node and the argument-
 * derived heading that the Snooty AST emits (which may be a direct
 * `heading` child or nested inside a `section` wrapper).
 */
export const convertDirectiveStep = ({ node, ctx, depth, convertChildren }: ConvertDirectiveStepArgs): MdastNode => {
  const stepChildren: MdastNode[] = [];
  let hasStepHeading = false;

  if (node.argument) {
    const headingContent = Array.isArray(node.argument)
      ? convertChildren({ nodes: node.argument, depth: depth + 1, ctx })
      : [{ type: 'text', value: node.argument } as MdastNode];

    if (headingContent.length > 0) {
      stepChildren.push({
        type: 'mdxJsxFlowElement',
        name: 'StepHeading',
        attributes: [],
        children: [{ type: 'paragraph', children: headingContent }],
      });
      hasStepHeading = true;
    }
  }

  const bodyNodes = (node.children ?? []).filter((c) => c.type !== 'directive_argument');
  const convertedBody = convertChildren({ nodes: bodyNodes, depth: depth + 1, ctx });

  if (hasStepHeading) {
    const firstHeadingIdx = convertedBody.findIndex((n) => n.type === 'heading');
    if (firstHeadingIdx !== -1) {
      convertedBody.splice(firstHeadingIdx, 1);
    }
  }

  stepChildren.push(...convertedBody);

  return {
    type: 'mdxJsxFlowElement',
    name: 'Step',
    attributes: [],
    children: stepChildren,
  };
};
