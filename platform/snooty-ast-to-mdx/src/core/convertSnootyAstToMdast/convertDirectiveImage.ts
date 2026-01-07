import { posix as path } from 'node:path';
import type { ConversionContext, SnootyNode, MdastNode } from './types';
import { parseSnootyArgument } from './parseSnootyArgument';
import { renameIncludesToUnderscore } from './renameIncludesToUnderscore';

interface ConvertDirectiveImageArgs {
  node: SnootyNode;
  ctx: ConversionContext;
}

export const convertDirectiveImage = ({ node, ctx }: ConvertDirectiveImageArgs): MdastNode => {
  const argText = parseSnootyArgument(node);

  const rawPath = extractPathFromNodes(node.children) || String(argText || '');

  // Normalise to POSIX form and strip leading "./" or "/"
  const pathWithoutLeadingSlash = path.normalize(rawPath.replace(/^[./\\]+/, '')).replace(/^\/+/, '');
  const assetPosix = renameIncludesToUnderscore(pathWithoutLeadingSlash);

  if (!assetPosix) {
    return { type: 'html', value: '<!-- figure missing src -->' } as MdastNode;
  }

  // Generate absolute path from the root
  const currentOutfilePath = ctx.currentOutfilePath || 'index.mdx';
  const importerPosix = path.normalize(currentOutfilePath);
  const targetPosix = getImportPath({ importerPosix, assetPosix });

  // Use absolute path starting from root (with leading slash)
  const imagePath = `/${targetPosix}`;

  const attrs: MdastNode[] = [];
  attrs.push({
    type: 'mdxJsxAttribute',
    name: 'src',
    value: imagePath,
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
  // For top-level files (no directory), topLevelPath should be empty
  // For nested files, take the first directory segment
  const pathSegments = importerPosix.split('/');
  const topLevelPath = pathSegments.length > 1 ? pathSegments[0] : '';

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
