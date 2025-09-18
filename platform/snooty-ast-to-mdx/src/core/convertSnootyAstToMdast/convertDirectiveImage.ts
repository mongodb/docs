import { pascalCase } from 'change-case';
import { posix as path } from 'node:path';
import type { ConversionContext, SnootyNode, MdastNode } from './types';
import { getImporterContext } from './getImporterContext';
import { parseSnootyArgument } from './parseSnootyArgument';

interface ConvertDirectiveImageArgs {
  node: SnootyNode;
  ctx: ConversionContext;
}

export const convertDirectiveImage = ({ node, ctx }: ConvertDirectiveImageArgs): MdastNode => {
  const argText = parseSnootyArgument(node);

  const rawPath = extractPathFromNodes(node.children) || String(argText || '');

  // Normalise to POSIX form and strip leading "./" or "/"
  const assetPosix = path.normalize(rawPath.replace(/^[./\\]+/, '')).replace(/^\/+/, '');

  if (!assetPosix) {
    return { type: 'html', value: '<!-- figure missing src -->' } as MdastNode;
  }

  const { importerPosix, importerDir } = getImporterContext(ctx);
  const targetPosix = getImportPath({ importerPosix, assetPosix });

  let importPath = path.relative(importerDir, targetPosix);
  if (!importPath.startsWith('.')) importPath = `./${importPath}`;
  // ensure the path points up one level
  if (importPath.startsWith('./')) importPath = importPath.replace(/^\.\/?/, '../');

  const baseName = targetPosix.split('/').pop() || 'image';
  const withoutExt = baseName.replace(/\.[^.]+$/, '') || 'image';
  let imageIdent = pascalCase(withoutExt);
  if (/^\d/.test(imageIdent)) imageIdent = `_${imageIdent}`;
  imageIdent = `${imageIdent}Img`;

  ctx.registerImport?.({ componentName: imageIdent, importPath });

  const attrs: MdastNode[] = [];
  attrs.push({
    type: 'mdxJsxAttribute',
    name: 'src',
    value: { type: 'mdxJsxAttributeValueExpression', value: imageIdent },
  } as MdastNode);
  const altText = typeof node.options?.alt === 'string' ? node.options.alt : '';
  if (altText) attrs.push({ type: 'mdxJsxAttribute', name: 'alt', value: altText } as MdastNode);
  const widthAttr = toNumericAttr({ name: 'width', value: node.options?.width });
  const heightAttr = toNumericAttr({ name: 'height', value: node.options?.height });
  if (widthAttr) attrs.push(widthAttr);
  if (heightAttr) attrs.push(heightAttr);

  return { type: 'mdxJsxFlowElement', name: 'Image', attributes: attrs, children: [] } as MdastNode;
};

interface ToImportPathArgs {
  topLevelPath: string;
  assetPath: string;
}

const toImportPath = ({ topLevelPath, assetPath }: ToImportPathArgs) => {
  if (topLevelPath) {
    return path.join(topLevelPath, 'images', assetPath);
  }
  return path.join('images', assetPath);
};

const extractPathFromNodes = (nodes?: SnootyNode[]): string => {
  if (!Array.isArray(nodes)) return '';
  const parts: string[] = [];
  const walk = (n: SnootyNode) => {
    if (!n) return;
    if (typeof n.value === 'string') parts.push(n.value);
    if (Array.isArray(n.children)) n.children.forEach(walk);
  };
  nodes.forEach(walk);
  return parts.join('').trim();
};

interface ToNumericAttrArgs {
  name: string;
  value: unknown;
}

const toNumericAttr = ({ name, value }: ToNumericAttrArgs): MdastNode | null => {
  if (value === undefined || value === null || value === '') return null;

  const num = typeof value === 'number' ? value : parseFloat(String(value));

  if (!Number.isNaN(num)) {
    return {
      type: 'mdxJsxAttribute',
      name,
      value: { type: 'mdxJsxAttributeValueExpression', value: String(num) },
    } as MdastNode;
  }

  return { type: 'mdxJsxAttribute', name, value: String(value) } as MdastNode;
};

interface GetImportPathArgs {
  importerPosix: string;
  assetPosix: string;
}

const getImportPath = ({ importerPosix, assetPosix }: GetImportPathArgs) => {
  const topLevelPath = importerPosix.split('/')[0] || '';

  if (assetPosix.startsWith('images/')) {
    // already rooted in images/
    const assetPath = assetPosix.slice('images/'.length);
    return toImportPath({ topLevelPath, assetPath });
  } else if (assetPosix.includes('/images/')) {
    // contains images/ deeper inside the path
    const assetPath = assetPosix.split('images/')[1];
    return toImportPath({ topLevelPath, assetPath });
  } else if (!assetPosix.includes('/')) {
    // bare filename – place in images folder under section
    return toImportPath({ topLevelPath, assetPath: assetPosix });
  }
  // generic relative path
  return assetPosix;
};
