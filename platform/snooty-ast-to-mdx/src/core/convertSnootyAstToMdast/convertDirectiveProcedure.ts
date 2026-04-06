import type { ConversionContext, SnootyNode, MdastNode, ConvertChildrenFn } from './types';
import { convertDirectiveStep } from './convertDirectiveStep';

interface ConvertDirectiveProcedureArgs {
  node: SnootyNode;
  ctx: ConversionContext;
  depth: number;
  /** Injected from the main converter to avoid circular imports. */
  convertChildren: ConvertChildrenFn;
}

/**
 * Convert a `procedure` directive into `<Procedure>` with `<Step>` children.
 * Step numbering and HowTo structured data are handled by remark plugins
 * at MDX compile time.
 */
export const convertDirectiveProcedure = ({
  node,
  ctx,
  depth,
  convertChildren,
}: ConvertDirectiveProcedureArgs): MdastNode => {
  const style = (node.options?.style as string) ?? 'connected';

  const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'style', value: style }];

  const children: MdastNode[] = [];

  for (const child of node.children ?? []) {
    if (child.type === 'directive' && child.name === 'step') {
      children.push(convertDirectiveStep({ node: child, ctx, depth, convertChildren }));
    } else {
      children.push(...convertChildren({ nodes: [child], depth: depth + 1, ctx }));
    }
  }

  return {
    type: 'mdxJsxFlowElement',
    name: 'Procedure',
    attributes,
    children,
  };
};
