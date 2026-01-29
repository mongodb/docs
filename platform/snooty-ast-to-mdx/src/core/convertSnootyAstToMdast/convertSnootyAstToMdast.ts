import yaml from 'yaml';
import { pascalCase } from 'change-case';
import { isValueNode, isTextNode, isLiteralNode } from './types';
import type { ConversionContext, SnootyNode, MdastNode, MdastRoot } from './types';
import { convertDirectiveImage } from './convertDirectiveImage';
import { convertDirectiveInclude } from './convertDirectiveInclude';
import { convertDirectiveLiteralInclude } from './convertDirectiveLiteralInclude';
import { convertDirectiveListTable } from './convertDirectiveListTable';
import { parseSnootyArgument } from './parseSnootyArgument';

const HIDDEN_NODES = ['toctree', 'index', 'seealso'];

interface ConvertChildrenArgs {
  nodes?: SnootyNode[];
  ctx: ConversionContext;
  depth: number;
}

/** Convert a list of Snooty nodes to a list of mdast nodes */
const convertChildren = ({ nodes, depth, ctx }: ConvertChildrenArgs): MdastNode[] => {
  if (!nodes || !Array.isArray(nodes)) return [];
  const children = nodes.flatMap((node) => convertNode({ node, depth, ctx })).filter(Boolean);
  return children as Array<MdastNode>;
};

interface ConvertNodeArgs {
  node: SnootyNode;
  ctx: ConversionContext;
  depth: number;
}

/** Convert a single Snooty node to mdast. Certain nodes (e.g. `section`) expand
    into multiple mdast siblings, so the return type can be an array. */
const convertNode = ({ node, ctx, depth = 1 }: ConvertNodeArgs): MdastNode | MdastNode[] | null => {
  switch (node.type) {
    case 'text':
      return { type: 'text', value: node.value ?? '' };

    case 'paragraph':
      return {
        type: 'paragraph',
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

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

    case 'code': // literal_block is mapped to `code` in AST
    case 'literal_block': {
      let value = node.value ?? '';
      if (!value && Array.isArray(node.children)) {
        value = node.children
          .filter(isValueNode)
          .map(({ value }) => value)
          .join('');
      }
      return { type: 'code', lang: node.lang ?? node.language ?? null, value };
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
        children: convertChildren({ nodes: node.children, depth, ctx }),
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
      const sectionChildren: MdastNode[] = [];

      if (titleNode) {
        const attributes = toJsxAttributes(node.options);
        sectionChildren.push({
          type: 'mdxJsxFlowElement',
          name: 'Heading',
          attributes: attributes,
          children: convertChildren({ nodes: titleNode.children, depth, ctx }),
        });
      }

      rest.forEach((child) => {
        const converted = convertNode({ node: child, depth: depth + 1, ctx });
        if (Array.isArray(converted)) sectionChildren.push(...converted);
        else if (converted) sectionChildren.push(converted);
      });

      return {
        type: 'mdxJsxFlowElement',
        name: 'Section',
        attributes: [],
        children: sectionChildren,
      };
    }

    case 'title':
    case 'heading': {
      const attributes = toJsxAttributes(node.options);
      return {
        type: 'mdxJsxFlowElement',
        name: 'Heading',
        attributes: attributes,
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
      if (directiveName === 'figure' || directiveName === 'image') {
        return convertDirectiveImage({ node, ctx });
      }
      if (directiveName === 'literalinclude') {
        return convertDirectiveLiteralInclude({ node });
      }
      if (directiveName === 'include' || directiveName === 'sharedinclude') {
        return convertDirectiveInclude({ node, ctx, depth: depth });
      }
      if (directiveName === 'list-table') {
        return convertDirectiveListTable({ node });
      }

      // Generic fallback for any Snooty directive (ex: ...tab -> <Tab>)
      const componentName = pascalCase(node.name ?? 'Directive');
      const attributes: MdastNode[] = toJsxAttributes(node.options);

      let includeArgumentAsChild = true;
      if (node.argument && (directiveName === 'only' || directiveName === 'cond')) {
        // Convert the condition expression into an attribute instead of child text
        const exprText = parseSnootyArgument(node);
        attributes.push({ type: 'mdxJsxAttribute', name: 'expr', value: exprText.trim() });
        includeArgumentAsChild = false;
      }

      const children: MdastNode[] = [];
      if (includeArgumentAsChild) {
        if (Array.isArray(node.argument)) {
          children.push(...convertChildren({ nodes: node.argument, depth, ctx }));
        } else if (typeof node.argument === 'string') {
          children.push({ type: 'text', value: node.argument });
        }
      }
      children.push(...convertChildren({ nodes: node.children, depth, ctx }));

      // Filter out empty directive elements
      if (HIDDEN_NODES.includes(directiveName) && children.length === 0 && attributes.length === 0) {
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
      const url = node.url ?? node.refuri ?? node.target ?? '';
      if (!url) {
        return convertChildren({ nodes: node.children, depth, ctx });
      }

      const childText = extractInlineDisplayText(node.children ?? []);
      if (childText) {
        ctx.collectedRefs.set(url, { title: childText, url });
      }

      return {
        type: 'mdxJsxTextElement',
        name: 'Reference',
        attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: url }],
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
      return {
        type: 'mdxJsxTextElement',
        name: componentName,
        attributes,
        children,
      };
    }

    case 'superscript':
      return {
        type: 'mdxJsxTextElement',
        name: 'sup',
        attributes: [],
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'subscript':
      return {
        type: 'mdxJsxTextElement',
        name: 'sub',
        attributes: [],
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

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
      return {
        type: 'mdxJsxFlowElement',
        name: 'DefinitionListItem',
        attributes: [],
        children: [...termChildren, ...descChildren],
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
        return convertChildren({ nodes: node.children, depth, ctx });
      }
      return {
        type: 'footnoteDefinition',
        identifier,
        label: node.name ?? undefined,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'footnote_reference': {
      const identifier = String(node.id ?? '');
      if (!identifier) return null;
      return {
        type: 'footnoteReference',
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
      const text = extractInlineDisplayText(node.children ?? []);
      if (refname && text) {
        ctx.collectedSubstitutions.set(refname, text);
      }
      // Create Reference component with type="substitution"
      const attributes: MdastNode[] = [];
      if (refname) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'key', value: refname });
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
      return {
        type: 'mdxJsxFlowElement',
        name: 'Transition',
        attributes: [],
        children: [],
      };

    case 'card-group': {
      const attributes: MdastNode[] = toJsxAttributes(node.options);
      return {
        type: 'mdxJsxFlowElement',
        name: 'CardGroup',
        attributes,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'cta-banner': {
      const attributes: MdastNode[] = toJsxAttributes(node.options);
      return {
        type: 'mdxJsxFlowElement',
        name: 'CTABanner',
        attributes,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'tabs': {
      return {
        type: 'mdxJsxFlowElement',
        name: 'Tabs',
        attributes: [],
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
      // Convert to one or more invisible anchor <span> elements
      const ids: string[] = [];
      if (typeof node.html_id === 'string') ids.push(node.html_id);
      if (Array.isArray(node.ids)) ids.push(...node.ids);
      if (ids.length === 0 && typeof node.name === 'string') ids.push(node.name);
      if (ids.length === 0) return null;
      return ids.map((id) => ({
        type: 'mdxJsxFlowElement',
        name: 'span',
        attributes: [{ type: 'mdxJsxAttribute', name: 'id', value: id }],
        children: [],
      }));
    }

    case 'inline_target':
    case 'target_identifier': {
      const ids: string[] = [];
      if (Array.isArray(node.ids)) ids.push(...node.ids);
      if (typeof node.html_id === 'string') ids.push(node.html_id);
      if (ids.length === 0) return null;
      return ids.map((id) => ({
        type: 'mdxJsxFlowElement',
        name: 'span',
        attributes: [{ type: 'mdxJsxAttribute', name: 'id', value: id }],
        children: [],
      }));
    }

    case 'block_quote':
      return {
        type: 'blockquote',
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'admonition': {
      const admonitionName = String(node.name ?? node.admonition_type ?? 'note');
      return {
        type: 'mdxJsxFlowElement',
        name: 'Admonition',
        attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: admonitionName }],
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
}

export const convertSnootyAstToMdast = (root: SnootyNode, options?: ConvertSnootyAstToMdastOptions): MdastRoot => {
  const metaFromDirectives: Record<string, unknown> = {};
  const contentChildren: MdastNode[] = [];
  const collectedSubstitutions = new Map<string, string>();
  const collectedRefs = new Map<string, { title: string; url: string }>();

  const ctx: ConversionContext = {
    emitMdxFile: options?.onEmitMdxFile,
    currentOutfilePath: options?.currentOutfilePath,
    collectedSubstitutions,
    collectedRefs,
  };

  (root.children ?? []).forEach((child: SnootyNode) => {
    // Collect <meta> directives: they appear as directive nodes with name 'meta'.
    if (child.type === 'directive' && String(child.name).toLowerCase() === 'meta' && child.options) {
      Object.assign(metaFromDirectives, child.options);
      return; // do not include this node in output
    }
    const converted = convertNode({ node: child, depth: 1, ctx });
    if (Array.isArray(converted)) contentChildren.push(...converted);
    else if (converted) contentChildren.push(converted);
  });

  // Merge page-level options that sit on the root node itself.
  const pageOptions = (root as { options?: Record<string, unknown> }).options ?? {};
  const frontmatterObj = { ...pageOptions, ...metaFromDirectives };

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
    const refs: Record<string, { title: string; url: string }> = {};
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

/** Extract display text from inline children as a single string. */
const extractInlineDisplayText = (children: SnootyNode[]): string => {
  const parts: string[] = [];
  const walk = (n?: SnootyNode) => {
    if (!n) return;
    if (isTextNode(n) || isLiteralNode(n)) {
      parts.push(n.value);
      return;
    }
    if (Array.isArray(n.children)) n.children.forEach(walk);
  };
  children.forEach(walk);
  const raw = parts.join('');
  // Unescape common Markdown/MDX backslash escapes (e.g., \_id -> _id)
  const unescaped = raw.replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1');
  // Collapse excessive whitespace
  return unescaped.replace(/\s+/g, ' ').trim();
};
