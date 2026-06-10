import { posix as path } from 'node:path';
import type { ConversionContext, SnootyNode, MdastNode } from './types';
import { parseSnootyArgument } from './parseSnootyArgument';
import { renameIncludesToUnderscore } from './renameIncludesToUnderscore';

interface ConvertDirectiveImageArgs {
  node: SnootyNode;
  ctx: ConversionContext;
}

export const convertDirectiveImage = ({ node }: ConvertDirectiveImageArgs): MdastNode => {
  // Path is always in the argument; children contain the caption (if any)
  const rawPath = parseSnootyArgument(node);
  const captionText = extractTextFromNodes(node.children);

  // Normalise to POSIX form and strip leading "./" or "/"
  const pathWithoutLeadingSlash = path.normalize(rawPath.replace(/^[./\\]+/, '')).replace(/^\/+/, '');
  const assetPosix = renameIncludesToUnderscore(pathWithoutLeadingSlash);

  if (!assetPosix) {
    return { type: 'html', value: '<!-- figure missing src -->' } as MdastNode;
  }

  const targetPosix = getImportPath({ assetPosix });

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
  if (widthAttr) attrs.push(widthAttr);
  const figwidthAttr = toNumericAttr({ name: 'figwidth', value: node.options?.figwidth });
  if (figwidthAttr) attrs.push(figwidthAttr);
  const heightAttr = toNumericAttr({ name: 'height', value: node.options?.height });
  if (heightAttr) attrs.push(heightAttr);

  if (node.options?.border !== undefined) {
    attrs.push({ type: 'mdxJsxAttribute', name: 'border', value: null } as MdastNode);
  }
  if (node.options?.lightbox !== undefined) {
    attrs.push({ type: 'mdxJsxAttribute', name: 'lightbox', value: null } as MdastNode);
  }
  if (captionText) {
    attrs.push({ type: 'mdxJsxAttribute', name: 'caption', value: captionText } as MdastNode);
  }
  if (typeof node.options?.class === 'string' && node.options.class) {
    attrs.push({ type: 'mdxJsxAttribute', name: 'className', value: node.options.class } as MdastNode);
  }

  return { type: 'mdxJsxFlowElement', name: 'Image', attributes: attrs, children: [] } as MdastNode;
};

const extractTextFromNodes = (nodes?: SnootyNode[]): string => {
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

  const raw = String(value).trim();

  // Preserve percentage units as strings (e.g. "50%"). A bare parseFloat would
  // succeed and drop the unit, after which the value would be rendered as
  // pixels — making a `:figwidth: 50%` figure 50px wide instead of 50% wide.
  if (raw.endsWith('%')) {
    return { type: 'mdxJsxAttribute', name, value: raw } as MdastNode;
  }

  const num = typeof value === 'number' ? value : parseFloat(raw);

  if (!Number.isNaN(num)) {
    return {
      type: 'mdxJsxAttribute',
      name,
      value: { type: 'mdxJsxAttributeValueExpression', value: String(num) },
    } as MdastNode;
  }

  return { type: 'mdxJsxAttribute', name, value: raw } as MdastNode;
};

interface GetImportPathArgs {
  assetPosix: string;
}

const getImportPath = ({ assetPosix }: GetImportPathArgs) => {
  if (!assetPosix.includes('/')) {
    return `images/${assetPosix}`;
  }
  return assetPosix;
};
