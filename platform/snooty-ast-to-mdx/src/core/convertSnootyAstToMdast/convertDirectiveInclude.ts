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

export const convertDirectiveInclude = ({ node, ctx }: ConvertDirectiveIncludeArgs): MdastNode => {
  const pathText = parseSnootyArgument(node);

  const emittedPath = toMdxIncludePath(pathText);
  const pathWithoutLeadingSlash = emittedPath.replace(/^\/+/, '');
  const emittedPathNormalized = renameIncludesToUnderscore(pathWithoutLeadingSlash);

  const originalChildren: SnootyNode[] = Array.isArray(node.children) ? node.children : [];
  let contentChildren: SnootyNode[] = originalChildren;
  if (
    originalChildren.length === 1 &&
    originalChildren[0] &&
    originalChildren[0].type === 'directive' &&
    String(originalChildren[0].name ?? '').toLowerCase() === 'extract'
  ) {
    contentChildren = Array.isArray(originalChildren[0].children) ? (originalChildren[0].children as SnootyNode[]) : [];
  }

  const nestedRoot: SnootyNode = { type: 'root', children: contentChildren };
  const emittedMdast = convertSnootyAstToMdast(nestedRoot, {
    onEmitMdxFile: ctx.emitMdxFile,
    currentOutfilePath: path.normalize(emittedPathNormalized),
  });
  ctx.emitMdxFile?.({ outfilePath: emittedPathNormalized, mdastRoot: emittedMdast });

  // Generate absolute path from root
  const targetPosix = emittedPathNormalized.replace(/^\/*/, '').replace(/\\+/g, '/');

  // Use absolute path starting from root (with leading slash)
  let includePath = `/${targetPosix}`;

  // Remove .mdx extension for cleaner component usage
  includePath = includePath.replace(/\.mdx$/i, '');

  return {
    type: 'mdxJsxFlowElement',
    name: 'Include',
    attributes: [{ type: 'mdxJsxAttribute', name: 'src', value: includePath } as MdastNode],
    children: [],
  } as MdastNode;
};

const toMdxIncludePath = (path: string): string => {
  const trimmed = path.trim();
  if (/\.(rst|txt)$/i.test(trimmed)) return trimmed.replace(/\.(rst|txt)$/i, '.mdx');
  if (!/\.mdx$/i.test(trimmed)) return `${trimmed}.mdx`;
  return trimmed;
};
