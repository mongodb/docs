import { posix as path } from 'node:path';
import { parseSnootyArgument } from './parseSnootyArgument';
import { convertSnootyAstToMdast } from './convertSnootyAstToMdast';
import type { ConversionContext, SnootyNode, MdastNode } from './types';
import { renameIncludesToUnderscore } from './renameIncludesToUnderscore';

interface ConvertDirectiveIncludeArgs {
  node: SnootyNode;
  ctx: ConversionContext;
  depth: number;
}

export const convertDirectiveInclude = ({ node, ctx, depth }: ConvertDirectiveIncludeArgs): MdastNode => {
  const pathText = parseSnootyArgument(node);

  const emittedPath = toMdxIncludePath(pathText);
  const pathWithoutLeadingSlash = emittedPath.replace(/^\/+/, '');
  const emittedPathNormalized = renameIncludesToUnderscore(pathWithoutLeadingSlash);

  const originalChildren: SnootyNode[] = Array.isArray(node.children) ? node.children : [];

  // Separate replacement directive children from the actual include content
  const isReplacement = (child: SnootyNode) =>
    child.type === 'directive' && String(child.name ?? '').toLowerCase() === 'replacement';

  const replacementNodes = originalChildren.filter(isReplacement);
  const nonReplacementChildren = originalChildren.filter((c) => !isReplacement(c));

  // Unwrap a single `extract` wrapper if that is the only non-replacement child
  let contentChildren: SnootyNode[] = nonReplacementChildren;
  if (
    nonReplacementChildren.length === 1 &&
    nonReplacementChildren[0] &&
    nonReplacementChildren[0].type === 'directive' &&
    String(nonReplacementChildren[0].name ?? '').toLowerCase() === 'extract'
  ) {
    contentChildren = Array.isArray(nonReplacementChildren[0].children)
      ? (nonReplacementChildren[0].children as SnootyNode[])
      : [];
  }

  const nestedRoot: SnootyNode = { type: 'root', children: contentChildren };
  const emittedMdast = convertSnootyAstToMdast(nestedRoot, {
    onEmitMdxFile: ctx.emitMdxFile,
    currentOutfilePath: path.normalize(emittedPathNormalized),
    initialDepth: depth,
  });
  ctx.emitMdxFile?.({ outfilePath: emittedPathNormalized, mdastRoot: emittedMdast });

  // Generate absolute path from root
  const targetPosix = emittedPathNormalized.replace(/^\/*/, '').replace(/\\+/g, '/');
  let includePath = `/${targetPosix}`;
  includePath = includePath.replace(/\.mdx$/i, '');

  // Convert each replacement directive into a <Replacement name="..."> child element.
  // Content is converted through the normal mdast pipeline so markdown syntax works.
  const replacementChildren: MdastNode[] = replacementNodes.map((replacementNode) => {
    const key = parseSnootyArgument(replacementNode);
    const valueRoot = convertSnootyAstToMdast(
      { type: 'root', children: Array.isArray(replacementNode.children) ? replacementNode.children : [] },
      { onEmitMdxFile: ctx.emitMdxFile, currentOutfilePath: path.normalize(emittedPathNormalized) },
    );

    return {
      type: 'mdxJsxFlowElement',
      name: 'Replacement',
      attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: key }],
      children: valueRoot.children ?? [],
    } as MdastNode;
  });

  return {
    type: 'mdxJsxFlowElement',
    name: 'Include',
    attributes: [{ type: 'mdxJsxAttribute', name: 'src', value: includePath } as MdastNode],
    children: replacementChildren,
  } as MdastNode;
};

const toMdxIncludePath = (path: string): string => {
  const trimmed = path.trim();
  if (/\.(rst|txt)$/i.test(trimmed)) return trimmed.replace(/\.(rst|txt)$/i, '.mdx');
  if (!/\.mdx$/i.test(trimmed)) return `${trimmed}.mdx`;
  return trimmed;
};
