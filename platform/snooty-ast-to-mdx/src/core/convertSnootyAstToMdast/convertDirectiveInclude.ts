import { posix as path } from 'node:path';
import { pascalCase } from 'change-case';
import { parseSnootyArgument } from './parseSnootyArgument';
import { convertSnootyAstToMdast } from './convertSnootyAstToMdast';
import type { ConversionContext, SnootyNode, MdastNode } from './types';
import { getImporterContext } from './getImporterContext';
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

  const baseName = path.normalize(emittedPathNormalized).split('/').pop() || '';
  const withoutExt = baseName.replace(/\.mdx$/i, '');
  let componentName = pascalCase(withoutExt);
  if (/^\d/.test(componentName)) componentName = `_${componentName}`;

  const { importerDir } = getImporterContext(ctx);
  const targetPosix = emittedPathNormalized.replace(/^\/*/, '').replace(/\\+/g, '/');
  let importPath = path.relative(importerDir, targetPosix);
  if (!importPath.startsWith('.')) importPath = `./${importPath}`;
  ctx.registerImport?.({ componentName, importPath });

  return { type: 'mdxJsxFlowElement', name: componentName, attributes: [], children: [] } as MdastNode;
};

const toMdxIncludePath = (path: string): string => {
  const trimmed = path.trim();
  if (/\.(rst|txt)$/i.test(trimmed)) return trimmed.replace(/\.(rst|txt)$/i, '.mdx');
  if (!/\.mdx$/i.test(trimmed)) return `${trimmed}.mdx`;
  return trimmed;
};
