import yaml from 'yaml';
import { pascalCase } from 'change-case';
import { isValueNode, isTextNode } from './types';
import type { ConversionContext, SnootyNode, MdastNode, MdastRoot } from './types';
import { convertDirectiveImage } from './convertDirectiveImage';
import { convertDirectiveInclude } from './convertDirectiveInclude';
import { convertDirectiveListTable } from './convertDirectiveListTable';
import { convertDirectiveProcedure } from './convertDirectiveProcedure';
import { convertDirectiveStep } from './convertDirectiveStep';
import { parseSnootyArgument } from './parseSnootyArgument';
import { computeComposableTutorialData, buildComposableOptionsFromNode } from './computeComposableTutorialData';
import { extractInlineDisplayText } from './extractInlineDisplayText';

const DIRECTIVES_TO_REMOVE_IF_EMPTY = ['index'];
const DIRECTIVES_TO_SKIP_CONTAINER = ['extract', 'glossary'];

/** Recursively extract plain text from a snooty argument node tree */
const extractArgText = (n: SnootyNode): string => {
  if (isValueNode(n)) return n.value;
  return (n.children ?? []).map(extractArgText).join('');
};

/** Extract the tab title from node.argument */
const parseTabName = (node: SnootyNode): string =>
  Array.isArray(node.argument) ? node.argument.map(extractArgText).join('').trim() : String(node.argument || '').trim();

/** Append dangling punctuation to preceding reference/link nodes (mirrors appendTrailingPunctuation from docs-nextjs) */
const appendTrailingPunctuation = (nodes: SnootyNode[]): SnootyNode[] => {
  const result: SnootyNode[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const currNode = nodes[i];
    const nextNode = nodes[i + 1];

    // Check if next node is a single-character non-whitespace text node (punctuation)
    const hasDanglingSibling =
      nextNode && isTextNode(nextNode) && nextNode.value.length === 1 && !/\s/.test(nextNode.value);

    // Check if current node is a reference or ref_role
    const isRefNode = currNode.type === 'reference' || currNode.type === 'ref_role';

    if (isRefNode && hasDanglingSibling) {
      // Merge punctuation into the reference node's children
      const mergedNode: SnootyNode = {
        ...currNode,
        children: [...(currNode.children ?? []), nextNode],
      };
      result.push(mergedNode);
      i++; // Skip the punctuation node
    } else {
      result.push(currNode);
    }
  }

  return result;
};

/** Find all directive nodes with the given name in the tree (mirrors findAllKeyValuePairs from Snooty) */
export const findAllDirectivesByName = (nodes: SnootyNode[], directiveName: string): SnootyNode[] => {
  const results: SnootyNode[] = [];
  const searchNode = (node: SnootyNode) => {
    if (node.type === 'directive' && String(node.name ?? '').toLowerCase() === directiveName.toLowerCase()) {
      results.push(node);
    }
    if (node.children) {
      node.children.forEach(searchNode);
    }
  };
  nodes.forEach(searchNode);
  return results;
};

interface ConvertChildrenArgs {
  nodes?: SnootyNode[];
  ctx: ConversionContext;
  depth: number;
  /** The Snooty node type of the parent, used to determine context-sensitive conversions (e.g. skipping paragraph wrappers). */
  parentType?: string;
}

/** Convert a list of Snooty nodes to a list of mdast nodes */
const convertChildren = ({ nodes, depth, ctx, parentType }: ConvertChildrenArgs): MdastNode[] => {
  if (!nodes || !Array.isArray(nodes)) return [];
  const children = nodes.flatMap((node) => convertNode({ node, depth, ctx, parentType })).filter(Boolean);
  return children as Array<MdastNode>;
};

interface ConvertNodeArgs {
  node: SnootyNode;
  ctx: ConversionContext;
  depth: number;
  /** The Snooty node type of the parent, used to determine context-sensitive conversions. */
  parentType?: string;
}

/**
 * Splits a paragraph's children at block-level (mdxJsxFlowElement) boundaries,
 * hoisting those elements up as siblings alongside any surrounding text paragraphs.
 *
 * Example: [text, <Note />, text] → [<p>text</p>, <Note />, <p>text</p>]
 *
 * If no block-level children exist, returns a single paragraph wrapping all children.
 */
const hoistFlowElementsFromParagraph = (children: MdastNode[]): MdastNode | MdastNode[] => {
  const containsBlockElement = children.some((child) => child.type === 'mdxJsxFlowElement');
  if (!containsBlockElement) {
    return { type: 'paragraph', children };
  }

  const isWhitespaceText = (node: MdastNode) => node.type === 'text' && String(node.value ?? '').trim() === '';

  const outputNodes: MdastNode[] = [];
  let pendingInlineNodes: MdastNode[] = [];

  for (const child of children) {
    if (child.type === 'mdxJsxFlowElement') {
      // Emit any accumulated inline nodes as a paragraph before the block element
      const nonEmptyInlineNodes = pendingInlineNodes.filter((node) => !isWhitespaceText(node));
      if (nonEmptyInlineNodes.length > 0) outputNodes.push({ type: 'paragraph', children: nonEmptyInlineNodes });
      outputNodes.push(child);
      pendingInlineNodes = [];
    } else {
      pendingInlineNodes.push(child);
    }
  }

  // Wrap any inline nodes that follow the last block element
  const trailingInlineNodes = pendingInlineNodes.filter((node) => !isWhitespaceText(node));
  if (trailingInlineNodes.length > 0) outputNodes.push({ type: 'paragraph', children: trailingInlineNodes });

  // If hoisting reduced to a single node, unwrap the array
  return outputNodes.length === 1 ? outputNodes[0] : outputNodes;
};

/** Convert a single Snooty node to mdast. Certain nodes (e.g. `section`) expand
    into multiple mdast siblings, so the return type can be an array. */
/** Parent node types whose child paragraphs should be unwrapped (no <p> wrapper emitted). */
const SKIP_P_TAG_PARENTS = new Set(['caption', 'footnote', 'field']);

const convertNode = ({ node, ctx, depth = 1, parentType }: ConvertNodeArgs): MdastNode | MdastNode[] | null => {
  switch (node.type) {
    case 'text':
      return { type: 'text', value: node.value ?? '' };

    case 'paragraph': {
      // Apply punctuation transformation before converting (merges trailing punctuation into links)
      const processedChildren = appendTrailingPunctuation(node.children ?? []);
      const convertedChildren = convertChildren({ nodes: processedChildren, depth, ctx });

      // RST preserves literal newlines inside paragraph text nodes (e.g. "see\n  ").
      // remark-mdx serializes those newlines verbatim, which makes the MDX parser treat any
      // following inline JSX as a block element. Collapse newline+whitespace to a single space
      // so inline elements stay inside the <p>.
      for (const child of convertedChildren) {
        if (child.type === 'text' && typeof child.value === 'string') {
          child.value = child.value.replace(/\n\s*/g, ' ');
        }
      }

      // When inside certain containers, skip the paragraph wrapper and return children directly.
      // This mirrors the SKIP_P_TAGS behaviour previously computed at runtime in the Paragraph component.
      if (parentType && SKIP_P_TAG_PARENTS.has(parentType)) {
        return convertedChildren;
      }

      // Hoist any block-level (mdxJsxFlowElement) children out of the paragraph to avoid
      // invalid MDX like `text <Note>...</Note> more text`.
      return hoistFlowElementsFromParagraph(convertedChildren);
    }

    case 'emphasis':
      return {
        type: 'emphasis',
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'strong':
      return {
        type: 'strong',
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'literal': {
      // Snooty's "literal" inline code nodes sometimes store their text in child "text" nodes rather than the `value` property.
      // Fall back to concatenating child text nodes when `value` is missing so that we don't emit empty inline code (``) in the resulting MDX.
      let value: string = node.value ?? '';
      if (!value && Array.isArray(node.children)) {
        value = node.children
          .filter((c): c is SnootyNode => !!c)
          .filter((c) => isTextNode(c) || isValueNode(c))
          .map((c) => (isValueNode(c) ? c.value : ''))
          .join('');
      }
      return { type: 'inlineCode', value };
    }

    case 'block_quote': {
      return {
        type: 'blockquote',
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'code': // literal_block is mapped to `code` in AST
    case 'literal_block': {
      let value = node.value ?? '';
      if (!value && Array.isArray(node.children)) {
        value = node.children
          .filter(isValueNode)
          .map(({ value }) => value)
          .join('');
      }
      const lang = node.lang ?? null;
      const metaParts: string[] = [];
      if (typeof node.copyable === 'boolean') {
        metaParts.push(`copyable={${node.copyable}}`);
      }
      if (Array.isArray(node.emphasize_lines) && node.emphasize_lines.length > 0) {
        metaParts.push(`emphasize_lines={${JSON.stringify(node.emphasize_lines)}}`);
      }
      if (typeof node.linenos === 'boolean') {
        metaParts.push(`linenos={${node.linenos}}`);
      }
      if (typeof node.caption === 'string') {
        // Use single-quoted JSX expression so double quotes in captions don't need backslash-escaping
        // (remark double-escapes backslashes inside {}, making \" → \\" which is invalid JS)
        metaParts.push(`caption={'${node.caption.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'}`);
      }
      if (typeof node.source === 'string') {
        metaParts.push(`source={'${node.source.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'}`);
      }
      if (node.lineno_start !== undefined) {
        metaParts.push(`lineno_start={${Number(node.lineno_start)}}`);
      }
      return {
        type: 'code',
        lang,
        meta: metaParts.length > 0 ? metaParts.join(' ') : undefined,
        value,
      };
    }

    case 'bullet_list':
      return {
        type: 'list',
        ordered: false,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'enumerated_list':
    case 'ordered_list':
      return {
        type: 'list',
        ordered: true,
        start: node.start ?? 1,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'list_item':
    case 'listItem':
      return {
        type: 'listItem',
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'list': {
      const ordered = typeof node.enumtype === 'string' ? node.enumtype === 'ordered' : !!node.ordered;
      const start = ordered ? node.startat ?? node.start ?? 1 : undefined;
      const mdastList: MdastNode = {
        type: 'list',
        ordered,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
      if (ordered && typeof start === 'number') {
        mdastList.start = start;
      }
      return mdastList;
    }

    case 'field_list':
      return {
        type: 'mdxJsxFlowElement',
        name: 'FieldList',
        attributes: [],
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'field': {
      const attributes: MdastNode[] = [];
      if (node.name) attributes.push({ type: 'mdxJsxAttribute', name: 'name', value: String(node.name) });
      if (node.label) attributes.push({ type: 'mdxJsxAttribute', name: 'label', value: String(node.label) });
      return {
        type: 'mdxJsxFlowElement',
        name: 'Field',
        attributes,
        children: convertChildren({ nodes: node.children, depth, ctx, parentType: 'field' }),
      };
    }

    case 'table':
    case 'table_head':
    case 'table_body':
    case 'table_row':
    case 'table_cell': {
      // Table node -> JSX element name map
      const TABLE_ELEMENT_MAP: Record<string, string> = {
        table: 'Table',
        table_head: 'TableHead',
        table_body: 'TableBody',
        table_row: 'TableRow',
        table_cell: 'TableCell',
      };

      return {
        type: 'mdxJsxFlowElement',
        name: TABLE_ELEMENT_MAP[node.type] || 'Table',
        attributes: [],
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'reference':
      if (node.refuri) {
        return {
          type: 'link',
          url: node.refuri,
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
      }
      return convertChildren({ nodes: node.children, depth, ctx });

    case 'section': {
      const titleNode = (node.children ?? []).find((c) => c.type === 'title' || c.type === 'heading');
      const rest = (node.children ?? []).filter((c) => c !== titleNode);
      const result: MdastNode[] = [];

      if (titleNode) {
        result.push({
          type: 'heading',
          depth: Math.min(depth, 6),
          children: convertChildren({ nodes: titleNode.children, depth, ctx }),
        });
      }

      rest.forEach((child) => {
        const converted = convertNode({ node: child, depth: depth + 1, ctx });
        if (Array.isArray(converted)) result.push(...converted);
        else if (converted) result.push(converted);
      });

      return result;
    }

    case 'title':
    case 'heading': {
      return {
        type: 'heading',
        depth: Math.min(depth, 6),
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'directive': {
      const directiveName = String(node.name ?? '').toLowerCase();
      // Special-case <Meta> directives here: we collect them at root level.
      // This node will be handled separately – skip here.
      if (directiveName === 'meta') {
        return null;
      }
      // Facet directives are page metadata collected into frontmatter – skip here.
      if (directiveName === 'facet') {
        return null;
      }
      // Toctree is navigation structure only – not rendered in page content.
      if (directiveName === 'toctree') {
        return null;
      }

      if (directiveName === 'default_domain') {
        return null;
      }

      // dismissible-skills-card is rendered via pageOptions in the sidebar – skip here.
      if (directiveName === 'dismissible-skills-card') {
        return null;
      }

      // Pass over container directives: emit only their children, no wrapper.
      if (DIRECTIVES_TO_SKIP_CONTAINER.includes(directiveName)) {
        return convertChildren({ nodes: node.children, depth, ctx });
      }

      if (directiveName === 'blockquote') {
        return {
          type: 'blockquote',
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
      }
      if (directiveName === 'time') {
        const time = parseSnootyArgument(node);
        return {
          type: 'mdxJsxFlowElement',
          name: 'Time',
          attributes: [{ type: 'mdxJsxAttribute', name: 'minutes', value: time }],
        };
      }
      if (directiveName === 'video') {
        let url = '';
        if (Array.isArray(node.argument) && node.argument[0]?.refuri) {
          url = node.argument[0].refuri;
        } else {
          url = parseSnootyArgument(node);
        }
        return {
          type: 'mdxJsxFlowElement',
          name: 'Video',
          attributes: [{ type: 'mdxJsxAttribute', name: 'url', value: url }],
        };
      }
      if (directiveName === 'describe') {
        const term = parseSnootyArgument(node);
        const children = convertChildren({ nodes: node.children, depth, ctx });
        return {
          type: 'mdxJsxFlowElement',
          name: 'Describe',
          attributes: [{ type: 'mdxJsxAttribute', name: 'term', value: term }],
          children,
        };
      }
      if (directiveName === 'figure' || directiveName === 'image') {
        return convertDirectiveImage({ node, ctx });
      }
      if (directiveName === 'include' || directiveName === 'sharedinclude' || directiveName === 'literalinclude') {
        return convertDirectiveInclude({ node, ctx, depth: depth });
      }
      if (directiveName === 'list-table') {
        return convertDirectiveListTable({ node, ctx, depth, convertChildren });
      }
      if (directiveName === 'procedure') {
        return convertDirectiveProcedure({ node, ctx, depth, convertChildren });
      }
      if (directiveName === 'step') {
        return convertDirectiveStep({ node, ctx, depth, convertChildren });
      }
      if (directiveName === 'hlist') {
        const attributes: MdastNode[] = toJsxAttributes(node.options);

        return {
          type: 'mdxJsxFlowElement',
          name: 'Hlist',
          attributes,
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
      }
      if (directiveName === 'collapsible') {
        const opts = node.options ?? {};
        const attributes: MdastNode[] = [];

        if (typeof opts.heading === 'string') {
          attributes.push({ type: 'mdxJsxAttribute', name: 'heading', value: opts.heading });
        }
        if (typeof opts.sub_heading === 'string') {
          attributes.push({ type: 'mdxJsxAttribute', name: 'subHeading', value: opts.sub_heading });
        }
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'headingLevel',
          value: { type: 'mdxJsxAttributeValueExpression', value: String(depth) },
        });
        if (opts.expanded !== undefined) {
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'expanded',
            value: { type: 'mdxJsxAttributeValueExpression', value: String(!!opts.expanded) },
          });
        }

        return {
          type: 'mdxJsxFlowElement',
          name: 'Collapsible',
          attributes,
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
      }
      if (directiveName === 'composable-tutorial') {
        const attributes: MdastNode[] = toJsxAttributes(node.options);
        const composableOptions = buildComposableOptionsFromNode(node);
        if (composableOptions.length > 0) {
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'composableOptions',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              value: JSON.stringify(composableOptions),
            },
          });
        }
        const children: MdastNode[] = [];
        if (Array.isArray(node.argument)) {
          children.push(...convertChildren({ nodes: node.argument, depth, ctx }));
        } else if (typeof node.argument === 'string') {
          children.push({ type: 'text', value: node.argument });
        }
        children.push(...convertChildren({ nodes: node.children, depth, ctx }));
        return {
          type: 'mdxJsxFlowElement',
          name: 'ComposableTutorial',
          attributes,
          children,
        };
      }
      if (directiveName === 'button') {
        const attributes: MdastNode[] = toJsxAttributes(node.options);
        const children: MdastNode[] = [];
        if (Array.isArray(node.argument)) {
          children.push(...convertChildren({ nodes: node.argument, depth, ctx, parentType: 'button' }));
        } else if (typeof node.argument === 'string') {
          children.push({ type: 'text', value: node.argument });
        }
        children.push(...convertChildren({ nodes: node.children ?? [], depth, ctx, parentType: 'button' }));
        return {
          type: 'mdxJsxTextElement',
          name: 'Button',
          attributes,
          children,
        };
      }
      if (directiveName === 'deprecated') {
        const version = parseSnootyArgument(node);
        return {
          type: 'paragraph',
          children: [
            {
              type: 'mdxJsxTextElement',
              name: 'Deprecated',
              attributes: [{ type: 'mdxJsxAttribute', name: 'version', value: version }],
              children: convertChildren({ nodes: node.children, depth, ctx }),
            },
          ],
        };
      }
      if (directiveName === 'versionchanged') {
        const version = parseSnootyArgument(node);

        return {
          type: 'paragraph',
          children: [
            {
              type: 'mdxJsxTextElement',
              name: 'VersionChanged',
              attributes: [{ type: 'mdxJsxAttribute', name: 'version', value: version }],
              children: convertChildren({ nodes: node.children, depth, ctx }),
            },
          ],
        };
      }
      if (directiveName === 'versionadded') {
        const version = parseSnootyArgument(node);
        return {
          type: 'paragraph',
          children: [
            {
              type: 'mdxJsxTextElement',
              name: 'VersionAdded',
              attributes: [{ type: 'mdxJsxAttribute', name: 'version', value: version }],
              children: convertChildren({ nodes: node.children, depth, ctx }),
            },
          ],
        };
      }
      if (directiveName === 'rubric') {
        const rubricText = (node.argument as SnootyNode[]).map(extractArgText).join('');
        return { type: 'html', value: `\n\n**${rubricText}**\n\n` };
      }
      if (directiveName === 'selected-content') {
        const selections =
          typeof node.selections === 'object' && node.selections !== null && !Array.isArray(node.selections)
            ? node.selections
            : {};
        const attributes: MdastNode[] = [
          {
            type: 'mdxJsxAttribute',
            name: 'selections',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              value: JSON.stringify(selections),
            },
          },
        ];

        return {
          type: 'mdxJsxFlowElement',
          name: 'ComposableContent',
          attributes,
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
      }

      if (directiveName === 'tab') {
        const tabid = typeof node.options?.tabid === 'string' ? node.options.tabid : '';
        const name = parseTabName(node);
        const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'tabid', value: tabid }];
        if (name) {
          attributes.push({ type: 'mdxJsxAttribute', name: 'name', value: name });
        }
        return {
          type: 'mdxJsxFlowElement',
          name: 'Tab',
          attributes,
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
      }
      if (directiveName === 'tabs-selector') {
        // The argument (e.g. "drivers") indicates which tabset's selector to render.
        // Selector option data lives in the page's frontmatter options.selectors.
        // Emit an empty <TabsSelector /> marker; position is handled via the
        // tabs-selector-position frontmatter option injected in convertSnootyAstToMdast.
        return {
          type: 'mdxJsxFlowElement',
          name: 'TabsSelector',
          attributes: [],
          children: [],
        };
      }
      if (directiveName === 'tabs' || directiveName === 'tabs-drivers') {
        const attributes: MdastNode[] = [];
        if (typeof node.options?.tabset === 'string') {
          attributes.push({ type: 'mdxJsxAttribute', name: 'tabset', value: node.options.tabset });
        }
        if (node.options?.hidden) {
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'hidden',
            value: { type: 'mdxJsxAttributeValueExpression', value: 'true' },
          });
        }
        return {
          type: 'mdxJsxFlowElement',
          name: 'Tabs',
          attributes,
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
      }

      // We can ignore any data passed into this since it is only used for https://www.mongodb.com/docs/openapi/preview/,
      // which fallbacks to a static default template when not pulling in a spec from the query param.
      if (directiveName === 'openapi') {
        return {
          type: 'mdxJsxFlowElement',
          name: 'OpenAPI',
       }
      if (directiveName === 'wayfinding') {
        const title = parseSnootyArgument(node);
        const children = node.children ?? [];
        const descriptionNode = children.find(
          (child) => child.type === 'directive' && String(child.name) === 'wayfinding-description',
        );
        const description = descriptionNode ? extractInlineDisplayText(descriptionNode.children ?? []) : '';
        const optionNodes = children.filter(
          (child) => child.type === 'directive' && String(child.name) === 'wayfinding-option',
        );
        const optionChildren: MdastNode[] = optionNodes.map((optionNode) => {
          const opts = optionNode.options ?? {};
          const id = typeof opts.id === 'string' ? opts.id : undefined;
          const title = typeof opts.title === 'string' ? opts.title : undefined;
          let href = '';
          if (Array.isArray(optionNode.argument)) {
            const ref = optionNode.argument.find(
              (node) => node.type === 'reference' && typeof node.refuri === 'string',
            );
            if (ref?.refuri) href = ref.refuri;
          } else if (typeof optionNode.argument === 'string') {
            href = optionNode.argument;
          }
          const attributes: MdastNode[] = [];
          if (id) {
            attributes.push({ type: 'mdxJsxAttribute', name: 'id', value: id });
          }
          if (title) {
            attributes.push({ type: 'mdxJsxAttribute', name: 'title', value: title });
          }
          if (href) {
            attributes.push({ type: 'mdxJsxAttribute', name: 'href', value: href });
          }
          return {
            type: 'mdxJsxFlowElement',
            name: 'WayfindingOption',
            attributes: attributes,
            children: [],
          } as MdastNode;
        });

        const attributes: MdastNode[] = [];
        if (title) {
          attributes.push({ type: 'mdxJsxAttribute', name: 'title', value: title });
        }
        if (description) {
          attributes.push({ type: 'mdxJsxAttribute', name: 'description', value: description });
        }
        return {
          type: 'mdxJsxFlowElement',
          name: 'Wayfinding',
          attributes: attributes,
          children: optionChildren,
        };
      }

      // Kicker must serialize as inline JSX (<Kicker>text</Kicker>) so MDX does not wrap
      // its content in a <p>. Using mdxJsxTextElement inside a paragraph achieves this.
      if (directiveName === 'kicker') {
        const inlineChildren: MdastNode[] = [];
        if (Array.isArray(node.argument)) {
          inlineChildren.push(...convertChildren({ nodes: node.argument, depth, ctx, parentType: directiveName }));
        } else if (typeof node.argument === 'string') {
          inlineChildren.push({ type: 'text', value: node.argument });
        }
        return {
          type: 'paragraph',
          children: [{ type: 'mdxJsxTextElement', name: 'Kicker', attributes: [], children: inlineChildren }],
        };
      }

      // Generic fallback for any Snooty directive (ex: ...tab -> <Tab>) where pascalCase doesn't produce the desired result
      const DIRECTIVE_TO_COMPONENT: Record<string, string> = {
        see: 'See',
        seealso: 'See',
      };

      const componentName = DIRECTIVE_TO_COMPONENT[directiveName] ?? pascalCase(node.name ?? 'Directive');

      const attributes: MdastNode[] = toJsxAttributes(node.options);

      const ADMONITION_DIRECTIVES = new Set(['tip', 'note', 'important', 'warning', 'example', 'see', 'seealso']);
      let includeArgumentAsChild = true;
      if (node.argument && directiveName === 'only') {
        // Convert the condition expression into an attribute instead of child text
        const exprText = parseSnootyArgument(node);
        attributes.push({ type: 'mdxJsxAttribute', name: 'expr', value: exprText.trim() });
        includeArgumentAsChild = false;
      } else if (node.argument && ADMONITION_DIRECTIVES.has(directiveName)) {
        const titleText = parseSnootyArgument(node);
        if (titleText) {
          attributes.push({ type: 'mdxJsxAttribute', name: 'title', value: titleText });
        }
        includeArgumentAsChild = false;
      }

      const children: MdastNode[] = [];
      const parentTypeForChildren = directiveName;
      if (includeArgumentAsChild) {
        if (Array.isArray(node.argument)) {
          const argChildren = convertChildren({ nodes: node.argument, depth, ctx, parentType: parentTypeForChildren });
          if (argChildren.length > 0) {
            children.push({ type: 'paragraph', children: argChildren });
          }
        } else if (typeof node.argument === 'string') {
          children.push({ type: 'paragraph', children: [{ type: 'text', value: node.argument }] });
        }
      }
      children.push(...convertChildren({ nodes: node.children, depth, ctx, parentType: parentTypeForChildren }));

      // Filter out empty directive elements
      if (DIRECTIVES_TO_REMOVE_IF_EMPTY.includes(directiveName) && children.length === 0 && attributes.length === 0) {
        return null;
      }

      return {
        type: 'mdxJsxFlowElement',
        name: componentName,
        attributes,
        children,
      };
    }

    case 'ref_role':
    case 'doc': {
      const fileid = node.fileid as [string, string?] | undefined;
      const externalUrl = typeof node.url === 'string' ? node.url : undefined;
      const refTarget = typeof node.target === 'string' ? node.target : undefined;
      const roleName = typeof node.name === 'string' ? node.name : undefined;

      // The lookup key: prefer the explicit ref target label, fall back to fileid path or external url
      const key = refTarget ?? (fileid ? fileid[0] : undefined) ?? externalUrl ?? '';
      if (!key) {
        return convertChildren({ nodes: node.children, depth, ctx });
      }

      // Store combined href so _references.json can resolve it at render time
      if (fileid?.[0]) {
        const href = fileid[1] ? `${fileid[0]}#${fileid[1]}` : fileid[0];
        ctx.collectedRefs.set(key, href);
      } else if (externalUrl) {
        ctx.collectedRefs.set(key, externalUrl);
      }

      // Typed ref roles (e.g. :authrole:, :binary:, :term:) preserve children so that
      // formatting encoded in the AST (e.g. literal → code font) is retained.
      if (node.type === 'ref_role' && roleName && roleName !== 'ref') {
        const children = convertChildren({ nodes: node.children, depth, ctx });
        const attributes: MdastNode[] = [
          { type: 'mdxJsxAttribute', name: 'type', value: roleName },
          { type: 'mdxJsxAttribute', name: 'name', value: key },
        ];
        return {
          type: 'mdxJsxTextElement',
          name: 'RefRole',
          attributes,
          children,
        };
      }

      // Plain :ref: and :doc: — snooty resolves the display title to the section heading.
      // Always emit it inline as a prop.
      const title = extractInlineDisplayText(node.children ?? []);

      const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'name', value: key }];
      if (title) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'title', value: title });
      }

      return {
        type: 'mdxJsxTextElement',
        name: 'Reference',
        attributes,
        children: [],
      };
    }

    case 'role': {
      const componentName = pascalCase(node.name ?? 'Role');
      const attributes: MdastNode[] = [];
      if (node.target) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'target', value: node.target });
      }
      const children = convertChildren({ nodes: node.children, depth, ctx });
      // If the role had a literal value but no children (e.g. :abbr:`abbr`)
      if (!children.length && node.value) {
        children.push({ type: 'text', value: node.value });
      }

      // Inline sub/sup roles (e.g. :sub:`2`, :sup:`64`) should render as native HTML elements
      // so they don't require custom MDX component mappings.
      if (componentName === 'Sup') {
        return {
          type: 'mdxJsxTextElement',
          name: 'sup',
          attributes,
          children,
        };
      }

      if (componentName === 'Sub') {
        return {
          type: 'mdxJsxTextElement',
          name: 'sub',
          attributes,
          children,
        };
      }

      if (componentName === 'Command') {
        // return as bold text
        return {
          type: 'strong',
          children,
        };
      }
      if (componentName === 'File') {
        // Use inlineCode for single backticks `code`
        const textContent = children.map((child: MdastNode) => (child.type === 'text' ? child.value : '')).join('');
        return {
          type: 'inlineCode',
          value: textContent,
        };
      }
      if (componentName.startsWith('Icon')) {
        const iconType = node.name;
        attributes.push({ type: 'mdxJsxAttribute', name: 'name', value: iconType });

        return {
          type: 'mdxJsxTextElement',
          name: 'Icon',
          attributes,
          children,
        };
      }
      if (componentName === 'Abbr') {
        // Parse example, :abbr:`MQL (MongoDB Query Language)` to <Abbr tooltip="MongoDB Query Language">MQL</Abbr>
        const textContent = extractInlineDisplayText(node.children ?? []);
        const match = textContent.match(/^(.+?)\s*\((.+)\)$/);
        if (match) {
          const [, abbr, tooltip] = match;
          return {
            type: 'mdxJsxTextElement',
            name: 'Abbr',
            attributes: [{ type: 'mdxJsxAttribute', name: 'tooltip', value: tooltip }],
            children: [{ type: 'text', value: abbr }],
          };
        }
      }
      if (componentName.startsWith('Highlight')) {
        const color = componentName.replace('Highlight', '').toLowerCase();
        return {
          type: 'mdxJsxTextElement',
          name: 'Highlight',
          attributes: [{ type: 'mdxJsxAttribute', name: 'color', value: color }],
          children,
        };
      }
      return {
        type: 'mdxJsxTextElement',
        name: componentName,
        attributes,
        children,
      };
    }

    case 'definitionList': {
      const children = convertChildren({ nodes: node.children, depth, ctx });
      return {
        type: 'mdxJsxFlowElement',
        name: 'DefinitionList',
        attributes: [],
        children,
      };
    }

    case 'definitionListItem': {
      const termChildren = convertChildren({ nodes: node.term, depth, ctx });
      const descChildren = convertChildren({ nodes: node.children, depth, ctx });
      const attributes: MdastNode[] = [];

      // Pre-compute target ID from inline_target in term (avoids runtime traversal in component)
      const findInlineTarget = (nodes: SnootyNode[]): SnootyNode | undefined => {
        for (const n of nodes) {
          if (n.type === 'inline_target') return n;
          if (n.children) {
            const found = findInlineTarget(n.children);
            if (found) return found;
          }
        }
        return undefined;
      };
      const inlineTarget = findInlineTarget(node.term ?? []);
      if (inlineTarget?.html_id && typeof inlineTarget.html_id === 'string') {
        attributes.push({ type: 'mdxJsxAttribute', name: 'targetId', value: inlineTarget.html_id });
      }

      return {
        type: 'mdxJsxFlowElement',
        name: 'DefinitionListItem',
        attributes,
        children: [
          {
            type: 'mdxJsxFlowElement',
            name: 'DefinitionTerm',
            attributes: [],
            // Wrap inline term nodes in a paragraph so that sibling inline nodes
            // (e.g. inline_target anchors, inline code, bold runs) do not become
            // direct JSX flow siblings. remark-mdx inserts blank lines between
            // every direct sibling inside a JSX flow element, so keeping all term
            // content inside a single paragraph block avoids that problem.
            children: [{ type: 'paragraph', children: termChildren }],
          },
          {
            type: 'mdxJsxFlowElement',
            name: 'DefinitionDescription',
            attributes: [],
            children: descChildren,
          },
        ],
      };
    }

    case 'line_block': {
      const lines = (node.children ?? []).flatMap((ln, idx, arr) => {
        const converted = convertChildren({ nodes: [ln], depth, ctx });
        if (idx < arr.length - 1) {
          // add a hard line break between lines
          converted.push({ type: 'break' });
        }
        return converted;
      });
      return { type: 'paragraph', children: lines };
    }

    case 'line':
      return { type: 'text', value: node.value ?? '' };

    case 'title_reference':
      return {
        type: 'emphasis',
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'footnote': {
      const identifier = String(node.id ?? node.name ?? '');
      if (!identifier) {
        // Fallback to emitting content inline if id missing
        return convertChildren({ nodes: node.children, depth, ctx, parentType: 'footnote' });
      }
      const attributes: MdastNode[] = [];
      if (node.name) attributes.push({ type: 'mdxJsxAttribute', name: 'name', value: String(node.name) });
      return {
        type: 'mdxJsxFlowElement',
        name: 'Footnote',
        attributes,
        identifier,
        label: node.name ?? undefined,
        children: convertChildren({ nodes: node.children, depth, ctx, parentType: 'footnote' }),
      };
    }

    case 'footnote_reference': {
      const identifier = String(node.id ?? '');
      if (!identifier) return null;
      const attributes: MdastNode[] = [];
      if (node.refname) attributes.push({ type: 'mdxJsxAttribute', name: 'name', value: String(node.refname) });
      return {
        type: 'mdxJsxTextElement',
        name: 'FootnoteReference',
        attributes,
        identifier,
        label: node.refname ?? undefined,
      };
    }

    case 'named_reference':
      // Named references are link reference definitions that we've already resolved elsewhere; omit.
      return null;

    case 'substitution_definition':
      // Substitution definitions are processed elsewhere, skip them here
      return null;

    case 'substitution_reference':
    case 'substitution': {
      // parser sometimes uses 'substitution' instead
      const refname = node.refname || node.name || '';

      // If the substitution expands to an abbr role, emit <Abbr> directly
      const abbrChild = node.children?.find(
        (child) => child.type === 'role' && typeof child.name === 'string' && child.name.toLowerCase() === 'abbr',
      );
      if (abbrChild) {
        const textContent = extractInlineDisplayText(abbrChild.children ?? []);
        const match = textContent.match(/^(.+?)\s*\((.+)\)$/);
        if (match) {
          const [, abbr, tooltip] = match;
          return {
            type: 'mdxJsxTextElement',
            name: 'Abbr',
            attributes: [{ type: 'mdxJsxAttribute', name: 'tooltip', value: tooltip }],
            children: [{ type: 'text', value: abbr }],
          };
        }
      }

      const text = extractInlineDisplayText(node.children ?? []);
      if (refname && text) {
        ctx.collectedSubstitutions.set(refname, text);
      }
      // Create Reference component with type="substitution"
      const attributes: MdastNode[] = [];
      if (refname) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'refKey', value: refname });
        attributes.push({ type: 'mdxJsxAttribute', name: 'type', value: 'substitution' });
      }
      return {
        type: 'mdxJsxTextElement',
        name: 'Reference',
        attributes,
        children: [],
      };
    }

    case 'directive_argument':
      return convertChildren({ nodes: node.children, depth, ctx });

    case 'transition':
      // Use standard markdown thematic break (--- / *** / ___) so MDX produces <hr>; map hr to Transition in docs-nextjs.
      return { type: 'thematicBreak' };

    case 'card-group': {
      const attributes: MdastNode[] = toJsxAttributes(node.options);
      return {
        type: 'mdxJsxFlowElement',
        name: 'CardGroup',
        attributes,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'tabs': {
      const attributes: MdastNode[] = [];
      if (typeof node.options?.tabset === 'string') {
        attributes.push({ type: 'mdxJsxAttribute', name: 'tabset', value: node.options.tabset });
      }
      if (node.options?.hidden) {
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'hidden',
          value: { type: 'mdxJsxAttributeValueExpression', value: 'true' },
        });
      }
      return {
        type: 'mdxJsxFlowElement',
        name: 'Tabs',
        attributes,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'tab': {
      const tabid = typeof node.options?.tabid === 'string' ? node.options.tabid : '';
      const name = parseTabName(node);
      const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'tabid', value: tabid }];
      if (name) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'name', value: name });
      }
      return {
        type: 'mdxJsxFlowElement',
        name: 'Tab',
        attributes,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'only': {
      const condition = parseSnootyArgument(node);
      return {
        type: 'mdxJsxFlowElement',
        name: 'Only',
        attributes: [{ type: 'mdxJsxAttribute', name: 'condition', value: condition.trim() }],
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'method-selector': {
      return {
        type: 'mdxJsxFlowElement',
        name: 'MethodSelector',
        attributes: [],
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'target': {
      const ids: string[] = [];
      if (typeof node.html_id === 'string') ids.push(node.html_id);
      if (Array.isArray(node.ids)) ids.push(...node.ids);
      if (ids.length === 0 && typeof node.name === 'string') ids.push(node.name);
      if (ids.length === 0) return null;
      const refTargets = ids.map((id) => ({
        type: 'mdxJsxFlowElement',
        name: 'RefTarget',
        attributes: [{ type: 'mdxJsxAttribute', name: 'id', value: id }],
        children: [],
      }));
      // For named directives like `authrole`, the `target_identifier` children
      // contain the plain-text display name (e.g. "Organization Owner").
      // Sibling nodes (e.g. a literal wrapper) are skipped to avoid code formatting.
      // For plain label targets (name: 'label'), all children are skipped since the
      // section heading that follows already renders the text.
      if (node.name !== 'label') {
        const identifierNodes = (node.children ?? []).filter((c) => c.type === 'target_identifier');
        const childContent = convertChildren({ nodes: identifierNodes, depth, ctx });
        if (childContent.length > 0) {
          const textValue = childContent.map((n) => (n as { value?: string }).value ?? '').join('');
          return [
            ...refTargets,
            {
              type: 'paragraph',
              children: [{ type: 'strong', children: [{ type: 'inlineCode', value: textValue }] }],
            },
          ];
        }
      }
      return refTargets;
    }

    case 'inline_target': {
      const ids: string[] = [];
      if (Array.isArray(node.ids)) ids.push(...node.ids);
      if (typeof node.html_id === 'string') ids.push(node.html_id);
      if (ids.length === 0) return null;
      return ids.map((id) => ({
        // Use mdxJsxTextElement (inline JSX) so the anchor stays inline
        // alongside the term text inside the paragraph wrapper in DefinitionTerm,
        // rather than becoming a block-level sibling with a blank line before it.
        type: 'mdxJsxTextElement',
        name: 'RefTarget',
        attributes: [{ type: 'mdxJsxAttribute', name: 'id', value: id }],
        children: [],
      }));
    }

    case 'target_identifier': {
      // The parent `target` node already emits the RefTarget anchor(s).
      // Here we only emit the display text children (e.g., "Organization Owner" from authrole).
      return convertChildren({ nodes: node.children, depth, ctx });
    }
    case 'admonition': {
      const admonitionName = String(node.name ?? node.admonition_type ?? 'note');
      const admonitionTitle = parseSnootyArgument(node);
      const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'name', value: admonitionName }];
      if (admonitionTitle) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'title', value: admonitionTitle });
      }
      return {
        type: 'mdxJsxFlowElement',
        name: 'Admonition',
        attributes,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    // Parser-specific node types that we skip
    case 'comment':
    case 'comment_block':
      return null;

    default:
      // Unknown node → keep children if any, else emit comment
      if (node.children && node.children.length) {
        return convertChildren({ nodes: node.children, depth, ctx });
      }
      return { type: 'html', value: `<!-- unsupported: ${node.type} -->` };
  }
};

interface ConvertSnootyAstToMdastOptions {
  onEmitMdxFile?: ConversionContext['emitMdxFile'];
  currentOutfilePath?: string;
  /** Starting depth for root-level children. Defaults to 1. Set > 1 to bake a heading offset into include files. */
  initialDepth?: number;
}

export const convertSnootyAstToMdast = (root: SnootyNode, options?: ConvertSnootyAstToMdastOptions): MdastRoot => {
  const metaFromDirectives: Record<string, unknown> = {};
  const contentChildren: MdastNode[] = [];
  const collectedSubstitutions = new Map<string, string>();
  const collectedRefs = new Map<string, string>();

  const ctx: ConversionContext = {
    emitMdxFile: options?.onEmitMdxFile,
    currentOutfilePath: options?.currentOutfilePath,
    collectedSubstitutions,
    collectedRefs,
  };

  // Pre-scan the whole tree for facet directives (they can be anywhere, e.g. inside a section).
  const facets: Record<string, string> = {};
  findAllDirectivesByName(root.children ?? [], 'facet').forEach((node) => {
    if (node.options) {
      const name = node.options.name;
      const values = node.options.values;
      if (typeof name === 'string' && typeof values === 'string') {
        facets[name] = values;
      }
    }
  });

  (root.children ?? []).forEach((child: SnootyNode) => {
    // Collect <meta> directives: they appear as directive nodes with name 'meta'.
    if (child.type === 'directive' && String(child.name).toLowerCase() === 'meta' && child.options) {
      Object.assign(metaFromDirectives, child.options);
      return; // do not include this node in output
    }
    const converted = convertNode({ node: child, depth: options?.initialDepth ?? 1, ctx });
    if (Array.isArray(converted)) contentChildren.push(...converted);
    else if (converted) contentChildren.push(converted);
  });

  // Merge page-level options that sit on the root node itself.
  // Promote `template` out of options so it always lives at the top level of frontmatter,
  // regardless of whether it came from root.options (e.g. product-landing) or a meta directive.
  const { template: pageTemplate, ...pageOptions } = (root as { options?: Record<string, unknown> }).options ?? {};

  // If the page body contains a tabs-selector directive, mark the selector position as
  // "main" so the TabsSelector component renders inline in the content body.
  const hasTabsSelector = (root.children ?? []).some(
    (child: SnootyNode) => child.type === 'directive' && String(child.name).toLowerCase() === 'tabs-selector',
  );
  if (hasTabsSelector) {
    pageOptions['tabs-selector-position'] = 'main';
  }

  const composableData = computeComposableTutorialData(root);
  if (composableData) {
    pageOptions.composable_tutorial = composableData;
  }
  const frontmatterObj = {
    ...(root.fileid ? { fileId: root.fileid } : {}),
    ...(pageTemplate ? { template: pageTemplate } : {}),
    ...(Object.keys(pageOptions).length ? { options: pageOptions } : {}),
    // meta directives are spread last so they can override page-level options (including template)
    ...metaFromDirectives,
    ...(Object.keys(facets).length ? { facets } : {}),
  };

  // Compose final children array with optional frontmatter
  const children: MdastNode[] = [];
  if (Object.keys(frontmatterObj).length) {
    children.push({ type: 'yaml', value: yaml.stringify(frontmatterObj) });
  }
  // Add content directly without any imports
  children.push(...contentChildren);

  const rootNode = { type: 'root', children } as MdastRoot;

  // Attach collected references so the caller can emit a _references.ts artifact
  if (collectedSubstitutions.size > 0 || collectedRefs.size > 0) {
    const substitutions: Record<string, string> = {};
    for (const [k, v] of collectedSubstitutions.entries()) substitutions[k] = v;
    const refs: Record<string, string> = {};
    for (const [k, v] of collectedRefs.entries()) refs[k] = v;
    rootNode.__references = { substitutions, refs };
  }

  return rootNode;
};

/** converts a plain object of props into an array of mdxJsxAttribute nodes */
const toJsxAttributes = (obj?: Record<string, unknown>): MdastNode[] => {
  if (!obj || typeof obj !== 'object') return [];
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return { type: 'mdxJsxAttribute', name: key, value };
      }
      return {
        type: 'mdxJsxAttribute',
        name: key,
        value: { type: 'mdxJsxAttributeValueExpression', value: JSON.stringify(value) },
      };
    });
};
