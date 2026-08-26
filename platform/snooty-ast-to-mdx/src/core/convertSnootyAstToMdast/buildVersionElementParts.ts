import type { ConversionContext, ConvertChildrenFn, MdastNode, SnootyNode } from './types';

interface BuildVersionElementPartsOptions {
  node: SnootyNode;
  convertChildren: ConvertChildrenFn;
  depth: number;
  ctx: ConversionContext;
}

/**
 * The version directives (`versionadded`, `versionchanged`, `deprecated`) end their
 * label with a colon when they introduce further content and a period when they do
 * not — for example "New in version 5.0." versus "New in version 5.0: <content>".
 *
 * Content can arrive either as directive body children or as argument text trailing
 * the version itself (`.. versionadded:: 7.2 (*Also available in 7.0.5*)`). Both
 * distinctions only exist in the Snooty AST, so resolve the punctuation here rather
 * than leaving the rendering layer to infer it.
 *
 * Trailing argument text keeps its own inline markup by becoming a `<VersionArgument>`
 * child, which the rendering layer hoists back up into the label.
 */
export const buildVersionElementParts = ({ node, convertChildren, depth, ctx }: BuildVersionElementPartsOptions) => {
  const { version, trailing } = splitVersionArgument(node);
  const body = convertChildren({ nodes: node.children, depth, ctx });

  const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'version', value: version }];
  if (trailing.length > 0 || body.length > 0) {
    attributes.push({ type: 'mdxJsxAttribute', name: 'endPunctuation', value: ':' });
  }

  const children =
    trailing.length > 0
      ? [
          {
            type: 'mdxJsxTextElement',
            name: 'VersionArgument',
            attributes: [],
            children: convertChildren({ nodes: trailing, depth, ctx }),
          } as MdastNode,
          ...body,
        ]
      : body;

  return { attributes, children };
};

/**
 * Separate the version number from any argument text that follows it. Snooty puts the
 * whole directive argument in `argument`, so `7.2 (*Also available in 7.0.5*)` arrives
 * as a text node holding "7.2 " followed by an emphasis node.
 */
const splitVersionArgument = (node: SnootyNode): { version: string; trailing: SnootyNode[] } => {
  const argumentNodes: SnootyNode[] = Array.isArray(node.argument)
    ? node.argument
    : [{ type: 'text', value: String(node.argument || '') }];

  const [first, ...rest] = argumentNodes;
  if (typeof first?.value !== 'string') {
    return { version: '', trailing: argumentNodes };
  }

  const [version = '', remainder = ''] = splitOnFirstWhitespace(first.value.trim());
  const trailing = remainder ? [{ type: 'text', value: remainder }, ...rest] : rest;

  return { version, trailing };
};

const splitOnFirstWhitespace = (value: string): [string, string] => {
  const match = /^(\S+)\s+([\s\S]*)$/.exec(value);
  return match ? [match[1], match[2]] : [value, ''];
};
