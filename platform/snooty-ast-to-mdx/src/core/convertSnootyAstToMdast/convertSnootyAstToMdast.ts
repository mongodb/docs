import yaml from 'yaml';
import { pascalCase } from 'change-case';
import { isValueNode, isTextNode } from './types';
import type {
  ConversionContext,
  ConvertChildrenFn,
  SnootyNode,
  MdastNode,
  MdastRoot,
  MDXFrontmatter,
  PageTemplateType,
  PageOptions,
  SubstitutionRefXrefInfo,
  CollectedSubstitutionValue,
} from './types';
import { convertDirectiveImage } from './convertDirectiveImage';
import { convertDirectiveInclude } from './convertDirectiveInclude';
import { convertDirectiveListTable } from './convertDirectiveListTable';
import { convertDirectiveProcedure } from './convertDirectiveProcedure';
import { convertDirectiveStep } from './convertDirectiveStep';
import { parseSnootyArgument } from './parseSnootyArgument';
import { computeComposableTutorialData, buildComposableOptionsFromNode } from './computeComposableTutorialData';
import { extractInlineDisplayText } from './extractInlineDisplayText';
import { parseAbbrText } from './parseAbbrText';
import { normalizeHeadingOptions } from './normalizeHeadingOptions';
import stableStringify from 'fast-json-stable-stringify';

// Toctree is navigation structure only – not rendered in page content
// Meta, Twitter, Facet, and Contents are page metadata collected into frontmatter
// Dismissible-skills-card data is collected into frontmatter
// Default-domain is unnecessary
// Tabs-selector is already handled in frontmatter
// IA is legacy toc
const DIRECTIVES_TO_REMOVE = [
  'cssclass',
  'default-domain',
  'dismissible-skills-card',
  'ia',
  'contents',
  'meta',
  'facet',
  'tabs-selector',
  'toctree',
  'twitter',
];
const DIRECTIVES_TO_REMOVE_IF_EMPTY = ['index'];
const DIRECTIVES_TO_SKIP_CONTAINER = ['extract', 'glossary', 'release_specification', 'cond'];

/**
 * RST `line_block` separates logical lines with a break between them.
 * Mdast `{ type: 'break' }` serializes via remark-mdx as `\\\n` (CommonMark hard break).
 * After self-closing inline JSX (e.g. `<Reference />`), that backslash parses as **literal
 * text** instead of a line break, dropping following siblings — seen in list-table headers
 * with substitutions on consecutive lines. An explicit `<br />` stays unambiguous in MDX.
 */
const LINE_BLOCK_BREAK: MdastNode = {
  type: 'mdxJsxTextElement',
  name: 'br',
  attributes: [],
  children: [],
};

/** Recursively extract plain text from a snooty argument node tree */
const extractArgText = (n: SnootyNode): string => {
  if (isValueNode(n)) return n.value;
  return (n.children ?? []).map(extractArgText).join('');
};

const escapeJsxText = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\{/g, '&#123;');

/** Serialize a string for a single-line code-fence meta expression (e.g. `caption={'...'}`): collapse whitespace runs (wrapped RST options
 *  carry newlines that break acorn on re-parse), then escape backslashes and single quotes. */
const escapeCodeMetaString = (s: string): string =>
  s.replace(/\s+/g, ' ').trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/** Serialize a single Snooty inline node to a JSX string fragment. */
const snootyInlineToJsx = (node: SnootyNode): string => {
  switch (node.type) {
    case 'text':
      return escapeJsxText(node.value ?? '');
    case 'literal': {
      let value = node.value ?? '';
      if (!value && Array.isArray(node.children)) {
        value = node.children
          .filter(isValueNode)
          .map((c) => c.value)
          .join('');
      }
      return `<code>${escapeJsxText(value)}</code>`;
    }
    case 'emphasis':
      return `<em>${(node.children ?? []).map(snootyInlineToJsx).join('')}</em>`;
    case 'strong':
      return `<strong>${(node.children ?? []).map(snootyInlineToJsx).join('')}</strong>`;
    default:
      return escapeJsxText(extractArgText(node));
  }
};

/**
 * Build the `name` JSX attribute for a `<Tab>` component from Snooty argument nodes.
 * Returns a plain string attribute when the title is plain text, and a JSX expression
 * attribute when the title contains rich inline content (e.g. inline code).
 */
const buildTabNameAttribute = (argumentNodes: SnootyNode[]): MdastNode | null => {
  if (argumentNodes.length === 0) return null;
  const hasRichContent = argumentNodes.some((n) => n.type !== 'text');
  if (hasRichContent) {
    const jsxBody = argumentNodes.map(snootyInlineToJsx).join('');
    return {
      type: 'mdxJsxAttribute',
      name: 'name',
      value: { type: 'mdxJsxAttributeValueExpression', value: `<>${jsxBody}</>` },
    };
  }
  const name = argumentNodes.map(extractArgText).join('').trim();
  return name ? { type: 'mdxJsxAttribute', name: 'name', value: name } : null;
};

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

/**
 * Build a fenced mdast `code` node from a Snooty code/literal_block node.
 * Accepts an optional `fallbackLang` for cases where the lang lives on a
 * parent node (e.g. the `language` option of an io-code-block input/output).
 */
const convertCodeNode = (node: SnootyNode, fallbackLang?: string | null): MdastNode => {
  let value = node.value ?? '';
  if (!value && Array.isArray(node.children)) {
    value = node.children
      .filter(isValueNode)
      .map(({ value }) => value)
      .join('');
  }
  const lang = node.lang ?? fallbackLang ?? null;
  const metaParts: string[] = [];
  if (typeof node.copyable === 'boolean') {
    metaParts.push(`copyable={${node.copyable}}`);
  }
  if (typeof node.darkMode === 'boolean') {
    metaParts.push(`darkMode={${node.darkMode}}`);
  }
  if (Array.isArray(node.emphasize_lines) && node.emphasize_lines.length > 0) {
    // Snooty encodes emphasize_lines as [[start, end], ...] range pairs. Expand to a flat
    // list of line numbers so the Code component's emphasize_lines prop receives number[].
    const flatLines = (node.emphasize_lines as Array<number | [number, number]>).flatMap((entry) =>
      Array.isArray(entry) ? Array.from({ length: entry[1] - entry[0] + 1 }, (_, i) => entry[0] + i) : [entry],
    );
    if (flatLines.length > 0) {
      metaParts.push(`emphasize_lines={${JSON.stringify(flatLines)}}`);
    }
  }
  if (typeof node.linenos === 'boolean') {
    metaParts.push(`linenos={${node.linenos}}`);
  }
  if (typeof node.caption === 'string') {
    metaParts.push(`caption={'${escapeCodeMetaString(node.caption)}'}`);
  }
  if (typeof node.source === 'string') {
    metaParts.push(`source={'${escapeCodeMetaString(node.source)}'}`);
  }
  if (node.lineno_start !== undefined) {
    metaParts.push(`lineno_start={${Number(node.lineno_start)}}`);
  }
  // remark only emits the info string (meta) when lang is present.
  // Fall back to 'text' so that props like copyable/emphasize_lines are not silently dropped
  // for no-language code blocks (e.g. `.. code-block::` without a language argument).
  const effectiveLang = !lang && metaParts.length > 0 ? 'text' : lang;
  return {
    type: 'code',
    lang: effectiveLang,
    meta: metaParts.length > 0 ? metaParts.join(' ') : undefined,
    value,
  };
};

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
 * MDAST node types that are valid at block (flow) level. Anything outside this
 * set is "phrasing" (inline) and must be wrapped in a `paragraph` before being
 * placed in a block context (section body, root children). Having an inline node
 * (e.g. `mdxJsxTextElement`) as a direct root child corrupts remark's entire
 * serialisation — it switches from block-flow mode to phrasing mode, stripping
 * all blank-line separators including the one after the YAML frontmatter fence.
 */
const MDAST_BLOCK_TYPES = new Set([
  'blockquote', 'code', 'definition', 'footnoteDefinition', 'heading', 'html',
  'list', 'mdxJsxFlowElement', 'mdxFlowExpression', 'mdxjsEsm', 'paragraph',
  'table', 'thematicBreak', 'yaml',
]);

const wrapInlineBlockNode = (node: MdastNode): MdastNode =>
  MDAST_BLOCK_TYPES.has(node.type) ? node : { type: 'paragraph', children: [node] };

/**
 * Splits a paragraph's children at block-level boundaries, hoisting those elements
 * up as siblings alongside any surrounding text paragraphs.
 *
 * Example: [text, <Note />, text] → [<p>text</p>, <Note />, <p>text</p>]
 *
 * If no block-level children exist, returns a single paragraph wrapping all children.
 */
const hoistFlowElementsFromParagraph = (children: MdastNode[]): MdastNode | MdastNode[] => {
  // A nested `paragraph` can appear when convertNode returns a paragraph-wrapped inline
  // element (e.g. Footnote uses the Kicker pattern: paragraph > mdxJsxTextElement).
  // Block-level children must be hoisted out so they don't get serialized as inline text
  // inside a <p>.
  const isBlockChild = (child: MdastNode) => MDAST_BLOCK_TYPES.has(child.type);
  const containsBlockElement = children.some(isBlockChild);
  if (!containsBlockElement) {
    return { type: 'paragraph', children };
  }

  const isWhitespaceText = (node: MdastNode) => node.type === 'text' && String(node.value ?? '').trim() === '';

  const outputNodes: MdastNode[] = [];
  let pendingInlineNodes: MdastNode[] = [];

  for (const child of children) {
    if (isBlockChild(child)) {
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

/**
 * Emit a JSX `<ol enumtype="...">` with `<li>` children for non-Arabic ordered lists
 * (loweralpha, upperalpha, lowerroman, upperroman). The MDX component mapping
 * `ol → <List>` and `li → <ListItem>` applies the correct list-style-type at render time.
 */
const buildEnumeratedListJsx = (
  node: SnootyNode,
  enumtype: string,
  start: number,
  depth: number,
  ctx: ConversionContext,
  convertChildren: ConvertChildrenFn,
): MdastNode => {
  const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'enumtype', value: enumtype }];
  if (start !== 1) {
    attributes.push({
      type: 'mdxJsxAttribute',
      name: 'startat',
      value: { type: 'mdxJsxAttributeValueExpression', value: String(start) },
    });
  }
  const liChildren: MdastNode[] = (node.children ?? [])
    .filter((c): c is SnootyNode => !!c && (c.type === 'list_item' || c.type === 'listItem'))
    .map((c) => ({
      type: 'mdxJsxFlowElement',
      name: 'li',
      attributes: [] as MdastNode[],
      children: convertChildren({ nodes: c.children, depth, ctx }),
    }));
  return { type: 'mdxJsxFlowElement', name: 'ol', attributes, children: liChildren };
};

/** Convert a single Snooty node to mdast. Certain nodes (e.g. `section`) expand
    into multiple mdast siblings, so the return type can be an array. */
/** Parent node types whose child paragraphs should be unwrapped (no <p> wrapper emitted). */
const SKIP_P_TAG_PARENTS = new Set(['caption']);

/**
 * DFS for inline `:ref:` / `:doc:` expansion inside substitution content
 * (Snooty may use `ref_role`, `doc`, or a `role` with name `ref`/`doc`; nodes may be wrapped in a paragraph).
 * Snooty often represents resolved `:ref:` as `ref_role` with `name: "label"` (std domain), not `name: "ref"`.
 */
const findRefOrDocRoleInSubstitution = (nodes: SnootyNode[] | undefined): SnootyNode | null => {
  if (!nodes?.length) return null;
  for (const n of nodes) {
    if (n.type === 'doc') return n;
    if (n.type === 'ref_role') {
      const roleName = typeof n.name === 'string' ? n.name : undefined;
      // Typed roles (:binary:, :authrole:, etc.) use other names and must not match here.
      if (!roleName || roleName === 'ref' || roleName === 'doc' || roleName === 'label') {
        return n;
      }
    }
    if (n.type === 'role') {
      const rn = typeof n.name === 'string' ? n.name.toLowerCase() : '';
      if (rn === 'ref' || rn === 'doc') return n;
    }
    // Docutils internal xref node (Snooty sometimes emits this instead of `ref_role`)
    if (n.type === 'reference' && typeof n.refuri !== 'string') {
      return n;
    }
    const nested = findRefOrDocRoleInSubstitution(n.children);
    if (nested) return nested;
  }
  return null;
};

/**
 * External hyperlink substitutions from Snooty config (e.g. TOML `|hnsw|` → `` `Title <url>`__ ``).
 * Snooty expands these as a `reference` node with `refuri`; those must **not** match
 * {@link findRefOrDocRoleInSubstitution} (internal xrefs use `reference` without `refuri`).
 */
const findExternalHyperlinkReference = (nodes: SnootyNode[] | undefined): SnootyNode | null => {
  if (!nodes?.length) return null;
  for (const n of nodes) {
    if (n.type === 'reference' && typeof n.refuri === 'string' && n.refuri.length > 0) {
      return n;
    }
    const nested = findExternalHyperlinkReference(n.children);
    if (nested) return nested;
  }
  return null;
};

/**
 * `:pipeline:\`$vectorSearch\`` and similar — resolved like xref entries in
 * `buildSubstitutionRefXrefMap` so `|alias|` emits linked {@link Reference} / `refs` (not plain text).
 */
const findPipelineRoleInSubstitution = (nodes: SnootyNode[] | undefined): SnootyNode | null => {
  if (!nodes?.length) return null;
  for (const n of nodes) {
    if (n.type === 'ref_role') {
      const roleName = typeof n.name === 'string' ? n.name.toLowerCase() : '';
      if (roleName === 'pipeline') return n;
    }
    if (n.type === 'role') {
      const rn = typeof n.name === 'string' ? n.name.toLowerCase() : '';
      if (rn === 'pipeline') return n;
    }
    const nested = findPipelineRoleInSubstitution(n.children);
    if (nested) return nested;
  }
  return null;
};

/**
 * Find a typed `ref_role` (e.g. `:binary:`, `:authrole:`, `:term:`) in substitution content.
 * These roles are distinct from `:ref:` / `:doc:` (handled by {@link findRefOrDocRoleInSubstitution})
 * and `:pipeline:` (handled by {@link findPipelineRoleInSubstitution}).
 */
const findTypedRefRoleInSubstitution = (nodes: SnootyNode[] | undefined): SnootyNode | null => {
  if (!nodes?.length) return null;
  for (const n of nodes) {
    if (n.type === 'ref_role') {
      const roleName = typeof n.name === 'string' ? n.name.toLowerCase() : '';
      if (roleName && roleName !== 'ref' && roleName !== 'doc' && roleName !== 'label') {
        return n;
      }
    }
    const nested = findTypedRefRoleInSubstitution(n.children);
    if (nested) return nested;
  }
  return null;
};

const extractRefTargetKeyFromRefRoleLike = (node: SnootyNode): string | null => {
  if (node.type === 'reference' && typeof node.refuri !== 'string') {
    const ids = Array.isArray(node.ids) ? node.ids.filter((x): x is string => typeof x === 'string') : [];
    if (ids.length > 0) return ids[0];
    if (typeof node.refname === 'string') return node.refname;
  }
  const fileid = node.fileid as [string, string?] | undefined;
  const externalUrl = typeof node.url === 'string' ? node.url : undefined;
  const refTarget = typeof node.target === 'string' ? node.target : undefined;
  const ids = Array.isArray(node.ids) ? node.ids.filter((x): x is string => typeof x === 'string') : [];
  const idFallback = ids.length > 0 ? ids[0] : undefined;
  const key = refTarget ?? (fileid ? fileid[0] : undefined) ?? externalUrl ?? idFallback ?? '';
  return key || null;
};

/** Relative path fragment or external URL for `_references.refs` (mirrors Snooty `fileid` / `url`). */
const computeHrefFromRefRoleLike = (node: SnootyNode): string | null => {
  const fileid = node.fileid as [string, string?] | undefined;
  const externalUrl = typeof node.url === 'string' ? node.url : undefined;
  if (fileid?.[0]) {
    return fileid[1] ? `${fileid[0]}#${fileid[1]}` : fileid[0];
  }
  if (externalUrl) return externalUrl;
  return null;
};

/** Same `collectedRefs` behavior as `case 'ref_role'` / `'doc'` for xref targets. */
const collectRefTargetFromRefRoleLike = (node: SnootyNode, ctx: ConversionContext): string | null => {
  const key = extractRefTargetKeyFromRefRoleLike(node);
  if (!key) return null;
  const href = computeHrefFromRefRoleLike(node);
  if (href) ctx.collectedRefs.set(key, href);
  return key;
};

const mergeSubstitutionRefXrefMaps = (
  project: Map<string, SubstitutionRefXrefInfo> | undefined,
  local: Map<string, SubstitutionRefXrefInfo>,
): Map<string, SubstitutionRefXrefInfo> => {
  const out = new Map<string, SubstitutionRefXrefInfo>(project ?? []);
  for (const [k, v] of local) {
    out.set(k, v);
  }
  return out;
};

/**
 * Walk the full document tree for `substitution_definition` nodes whose body is `:ref:` / `:doc:`,
 * or `:pipeline:` (aggregation stage link), so included files can resolve `|alias|` to linked MDX.
 */
export const buildSubstitutionRefXrefMap = (root: SnootyNode): Map<string, SubstitutionRefXrefInfo> => {
  const map = new Map<string, SubstitutionRefXrefInfo>();
  const visitedAstSubtrees = new WeakSet<SnootyNode>();

  const visitNode = (node: SnootyNode | undefined) => {
    if (!node) return;
    if (node.type === 'substitution_definition') {
      const refname = String(node.refname || node.name || '');
      const refLink = findRefOrDocRoleInSubstitution(node.children);
      const pipelineLink = refLink ? null : findPipelineRoleInSubstitution(node.children);
      const typedRefLink = refLink || pipelineLink ? null : findTypedRefRoleInSubstitution(node.children);
      const roleLike = refLink ?? pipelineLink ?? typedRefLink;
      if (refname && roleLike) {
        const refTargetKey = extractRefTargetKeyFromRefRoleLike(roleLike);
        const href = computeHrefFromRefRoleLike(roleLike);
        const title = extractInlineDisplayText(roleLike.children ?? []);
        // Snooty often provides only `target` (xref label) on :ref: until fileid is resolved; still emit xref MDX.
        if (refTargetKey && title) {
          const entry: SubstitutionRefXrefInfo = href ? { refTargetKey, title, href } : { refTargetKey, title };
          if (typedRefLink && typeof typedRefLink.name === 'string') {
            entry.roleType = typedRefLink.name;
          }
          map.set(refname, entry);
        }
      }
    }
    if (Array.isArray(node.children)) {
      for (const c of node.children) visitNode(c);
    }
    if (Array.isArray(node.argument)) {
      for (const c of node.argument) {
        if (c && typeof c === 'object' && 'type' in (c as object)) visitNode(c as SnootyNode);
      }
    }
    const nestedAst = node.ast as SnootyNode | undefined;
    if (
      nestedAst &&
      typeof nestedAst === 'object' &&
      nestedAst !== node &&
      'type' in nestedAst &&
      !visitedAstSubtrees.has(nestedAst)
    ) {
      visitedAstSubtrees.add(nestedAst);
      visitNode(nestedAst);
    }
  };

  visitNode(root);
  return map;
};

const mergeSubstitutionDefLiteralMaps = (
  parent: Map<string, string> | undefined,
  local: Map<string, string>,
): Map<string, string> => {
  const out = new Map<string, string>(parent ?? []);
  for (const [k, v] of local) {
    out.set(k, v);
  }
  return out;
};

const mergeSubstitutionDefNodesMaps = (
  parent: Map<string, SnootyNode[]> | undefined,
  local: Map<string, SnootyNode[]>,
): Map<string, SnootyNode[]> => {
  const out = new Map<string, SnootyNode[]>(parent ?? []);
  for (const [k, v] of local) {
    out.set(k, v);
  }
  return out;
};

/**
 * Walk the full document tree for `substitution_definition` nodes whose body is **not** `:ref:` /
 * `:doc:` (those use {@link buildSubstitutionRefXrefMap}). Collects display text for roles such as
 * Plain-text replacements so included subtrees can resolve `|alias|` (pipeline/ref defs use
 * {@link buildSubstitutionRefXrefMap} instead).
 */
export const buildSubstitutionDefinitionLiteralMap = (root: SnootyNode): Map<string, string> => {
  const map = new Map<string, string>();
  const visitedAstSubtrees = new WeakSet<SnootyNode>();

  const visitNode = (node: SnootyNode | undefined) => {
    if (!node) return;
    if (node.type === 'substitution_definition') {
      const refname = String(node.refname || node.name || '');
      const refLink = findRefOrDocRoleInSubstitution(node.children);
      const pipelineLink = refLink ? null : findPipelineRoleInSubstitution(node.children);
      const pipelineAsXref =
        pipelineLink &&
        extractRefTargetKeyFromRefRoleLike(pipelineLink) &&
        extractInlineDisplayText(pipelineLink.children ?? []);
      const typedRefNode = refLink || pipelineAsXref ? null : findTypedRefRoleInSubstitution(node.children);
      const typedRefAsXref =
        typedRefNode &&
        extractRefTargetKeyFromRefRoleLike(typedRefNode) &&
        extractInlineDisplayText(typedRefNode.children ?? []);
      if (refname && !refLink && !pipelineAsXref && !typedRefAsXref) {
        const text = extractInlineDisplayText(node.children ?? []);
        if (text) {
          map.set(refname, text);
        }
      }
    }
    if (Array.isArray(node.children)) {
      for (const c of node.children) visitNode(c);
    }
    if (Array.isArray(node.argument)) {
      for (const c of node.argument) {
        if (c && typeof c === 'object' && 'type' in (c as object)) visitNode(c as SnootyNode);
      }
    }
    const nestedAst = node.ast as SnootyNode | undefined;
    if (
      nestedAst &&
      typeof nestedAst === 'object' &&
      nestedAst !== node &&
      'type' in nestedAst &&
      !visitedAstSubtrees.has(nestedAst)
    ) {
      visitedAstSubtrees.add(nestedAst);
      visitNode(nestedAst);
    }
  };

  visitNode(root);
  return map;
};

/**
 * Walk the full document tree for `substitution_definition` nodes and store their raw children
 * by refname. Used by include conversion to build `<Replacement>` slots from the page-level
 * definition rather than the globally-resolved default that Snooty baked into the include body.
 */
export const buildSubstitutionDefinitionNodesMap = (root: SnootyNode): Map<string, SnootyNode[]> => {
  const map = new Map<string, SnootyNode[]>();
  const visitedAstSubtrees = new WeakSet<SnootyNode>();

  const visitNode = (node: SnootyNode | undefined) => {
    if (!node) return;
    if (node.type === 'substitution_definition') {
      const refname = String(node.refname || node.name || '');
      if (refname && Array.isArray(node.children) && node.children.length > 0) {
        map.set(refname, node.children as SnootyNode[]);
      }
    }
    if (Array.isArray(node.children)) {
      for (const c of node.children) visitNode(c);
    }
    if (Array.isArray(node.argument)) {
      for (const c of node.argument) {
        if (c && typeof c === 'object' && 'type' in (c as object)) visitNode(c as SnootyNode);
      }
    }
    const nestedAst = node.ast as SnootyNode | undefined;
    if (
      nestedAst &&
      typeof nestedAst === 'object' &&
      nestedAst !== node &&
      'type' in nestedAst &&
      !visitedAstSubtrees.has(nestedAst)
    ) {
      visitedAstSubtrees.add(nestedAst);
      visitNode(nestedAst);
    }
  };

  visitNode(root);
  return map;
};

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
    case 'literal_block':
      return convertCodeNode(node);

    case 'bullet_list':
      return {
        type: 'list',
        ordered: false,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'enumerated_list':
    case 'ordered_list': {
      const start = node.start ?? 1;
      const enumtype = typeof node.enumtype === 'string' ? node.enumtype : undefined;
      if (enumtype && !['arabic', 'ordered'].includes(enumtype)) {
        return buildEnumeratedListJsx(node, enumtype, start, depth, ctx, convertChildren);
      }
      return {
        type: 'list',
        ordered: true,
        start,
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };
    }

    case 'list_item':
    case 'listItem':
      return {
        type: 'listItem',
        children: convertChildren({ nodes: node.children, depth, ctx }),
      };

    case 'list': {
      const UNORDERED_ENUM_TYPES = new Set(['bullet', 'unordered']);
      const ordered = typeof node.enumtype === 'string' ? !UNORDERED_ENUM_TYPES.has(node.enumtype) : !!node.ordered;
      const start = ordered ? node.startat ?? node.start ?? 1 : undefined;
      if (ordered && node.enumtype && !['arabic', 'ordered'].includes(node.enumtype)) {
        return buildEnumeratedListJsx(node, node.enumtype, start ?? 1, depth, ctx, convertChildren);
      }
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
        const sectionId = typeof node.html_id === 'string' ? node.html_id : undefined;
        if (sectionId) {
          result.push({
            type: 'mdxJsxFlowElement',
            name: 'RefTarget',
            attributes: [{ type: 'mdxJsxAttribute', name: 'id', value: sectionId }],
            children: [],
          } as MdastNode);
        }
        result.push({
          type: 'heading',
          depth: Math.min(depth, 6),
          children: convertChildren({ nodes: titleNode.children, depth, ctx }),
        });
      }

      rest.forEach((child) => {
        const converted = convertNode({ node: child, depth: depth + 1, ctx });
        if (Array.isArray(converted)) result.push(...converted.map(wrapInlineBlockNode));
        else if (converted) result.push(wrapInlineBlockNode(converted));
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

      // Directives not needed in MDX
      if (DIRECTIVES_TO_REMOVE.includes(directiveName)) {
        return null;
      }

      // Pass over container directives: emit only their children, no wrapper.
      if (DIRECTIVES_TO_SKIP_CONTAINER.includes(directiveName)) {
        return convertChildren({ nodes: node.children, depth, ctx });
      }

      if (directiveName === 'class') {
        const classArg = parseSnootyArgument(node).trim();
        if (classArg === 'hidden') {
          return {
            type: 'mdxJsxFlowElement',
            name: 'div',
            // The HTML `hidden` boolean attribute suppresses rendering (display:none) without a custom component.
            attributes: [{ type: 'mdxJsxAttribute', name: 'hidden', value: null }],
            children: convertChildren({ nodes: node.children, depth, ctx }),
          };
        }
        // Non-hidden class directives: emit children without a wrapper.
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
      if (directiveName === 'io-code-block') {
        const ioChildren: MdastNode[] = [];

        for (const child of node.children ?? []) {
          const childName = String(child.name ?? '').toLowerCase();
          if (childName !== 'input' && childName !== 'output') continue;

          // The code content is the first child of the input/output directive.
          // Fall back to options.language when the code node has no lang set.
          const codeNode = child.children?.[0];
          if (!codeNode) continue;
          const fallbackLang = typeof child.options?.language === 'string' ? child.options.language : null;
          // Output code blocks are never copyable — force the prop regardless of the source AST.
          // Also ensure lang is non-null so remark serializes the meta string (copyable={false}).
          // remark only emits the info string when lang is present; without it the meta is dropped.
          const normalizedCodeNode =
            childName === 'output'
              ? { ...codeNode, copyable: false, darkMode: true, lang: codeNode.lang ?? fallbackLang ?? 'text' }
              : codeNode;
          const codeMdast = convertCodeNode(normalizedCodeNode, fallbackLang);

          const componentName = childName === 'input' ? 'Input' : 'Output';
          const attributes: MdastNode[] = [];

          // visible={false} is the only meaningful value to emit — true is the default and can be omitted.
          if (childName === 'output' && !child.options?.visible && child.options?.visible !== undefined) {
            attributes.push({
              type: 'mdxJsxAttribute',
              name: 'visible',
              value: { type: 'mdxJsxAttributeValueExpression', value: 'false' },
            });
          }

          ioChildren.push({
            type: 'mdxJsxFlowElement',
            name: componentName,
            attributes,
            children: [codeMdast],
          });
        }

        return {
          type: 'mdxJsxFlowElement',
          name: 'IoCodeBlock',
          attributes: [],
          children: ioChildren,
        };
      }

      if (directiveName === 'figure' || directiveName === 'image') {
        return convertDirectiveImage({ node, ctx });
      }
      if (directiveName === 'literalinclude') {
        // When Snooty resolves a literalinclude it inlines the extracted code content
        // into node.children (as code/literal_block nodes). Multiple literalinclude
        // directives referencing the same source file with different start-after/end-before
        // options would all generate the same output path via convertDirectiveInclude,
        // causing last-write-wins collisions. Instead, inline the code directly.
        const literalChildren = (Array.isArray(node.children) ? node.children : []).filter(
          (c): c is SnootyNode => !!c && c.type !== 'directive',
        );
        if (literalChildren.length > 0) {
          const converted = convertChildren({ nodes: literalChildren, depth, ctx });
          return converted.length === 1 ? converted[0] : converted;
        }
        return convertDirectiveInclude({ node, ctx, depth: depth });
      }
      if (directiveName === 'include' || directiveName === 'sharedinclude') {
        // A sliced include (`:start-after:` / `:end-before:`) embeds only a fragment of the
        // source file. The parser has already resolved that fragment into node.children.
        // Emitting it as a shared `_includes/<source>.mdx` keyed only by the source path
        // collides when one file is sliced multiple ways: every slice resolves to the same
        // `<Include src>` and the emit dedupe keeps just the first (e.g. mapReduce's map/
        // reduce/finalize sections would all render "map"). Inline the resolved slice
        // directly instead — the same strategy `literalinclude` uses above. A whole-file
        // include (no markers) keeps the `<Include>` reference so authors compose MDX the
        // way they composed RST.
        const isSliced = node.options?.['start-after'] != null || node.options?.['end-before'] != null;
        if (isSliced) {
          const sliceChildren = (Array.isArray(node.children) ? node.children : []).filter(
            (c): c is SnootyNode =>
              !!c && !(c.type === 'directive' && String(c.name ?? '').toLowerCase() === 'replacement'),
          );
          const converted = convertChildren({ nodes: sliceChildren, depth, ctx });
          return converted.length === 1 ? converted[0] : converted;
        }
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
      if (directiveName === 'superscript') {
        return {
          type: 'mdxJsxTextElement',
          name: 'sup',
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
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
              value: stableStringify(composableOptions),
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
        const inlineChildren: MdastNode[] = [];
        if (Array.isArray(node.argument)) {
          inlineChildren.push(...convertChildren({ nodes: node.argument, depth, ctx, parentType: 'button' }));
        } else if (typeof node.argument === 'string') {
          inlineChildren.push({ type: 'text', value: node.argument });
        }
        inlineChildren.push(...convertChildren({ nodes: node.children ?? [], depth, ctx, parentType: 'button' }));
        return {
          type: 'paragraph',
          children: [
            {
              type: 'mdxJsxTextElement',
              name: 'Button',
              attributes,
              children: inlineChildren,
            },
          ],
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
          type: 'mdxJsxFlowElement',
          name: 'VersionChanged',
          attributes: [{ type: 'mdxJsxAttribute', name: 'version', value: version }],
          children: convertChildren({ nodes: node.children, depth, ctx }),
        };
      }
      if (directiveName === 'versionadded') {
        const version = parseSnootyArgument(node);
        return {
          type: 'mdxJsxFlowElement',
          name: 'VersionAdded',
          attributes: [{ type: 'mdxJsxAttribute', name: 'version', value: version }],
          children: convertChildren({ nodes: node.children, depth, ctx }),
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
              value: stableStringify(selections),
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
        const argumentNodes = Array.isArray(node.argument) ? node.argument : [];
        const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'tabid', value: tabid }];
        const nameAttr = buildTabNameAttribute(argumentNodes);
        if (nameAttr) attributes.push(nameAttr);
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
        };
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

      // Banner directive: the AST for an RST banner value (typically a snooty.toml
      // [[banners]] entry) can mix inline nodes (text, RefRole, etc.) with block-level
      // nodes (lists, tables) as siblings, depending on how the value is authored. When
      // every child is a paragraph (e.g. two distinct paragraphs of prose), keep them as
      // separate blocks. When the children are inline-only - which happens when a banner
      // value splits across lines without blank-line paragraph breaks — merge everything
      // into a single inline paragraph so there are no blank lines between the segments.
      // When a block-level node is present (e.g. intro text followed by a bulleted list),
      // split the content at block boundaries so the text and the list render as separate
      // siblings — flattening them into one paragraph would nest the list inside a <p> and
      // glue its first item onto the intro sentence (e.g. "...to:- Require ...").
      if (directiveName === 'banner') {
        const attributes: MdastNode[] = toJsxAttributes(node.options);
        const bodyChildren = convertChildren({ nodes: node.children, depth, ctx, parentType: 'banner' });

        const nonParagraphChildren = bodyChildren.filter((child) => child.type !== 'paragraph');
        const hasBlockLevelChild = nonParagraphChildren.some((child) => MDAST_BLOCK_TYPES.has(child.type));

        let bannerChildren: MdastNode[];
        if (nonParagraphChildren.length === 0) {
          // All children are paragraphs — preserve them as separate blocks.
          bannerChildren = bodyChildren;
        } else {
          // Mixed content — unwrap paragraph wrappers into a single inline stream and
          // collapse any residual newline+whitespace introduced by RST line wrapping.
          const inlineStream: MdastNode[] = [];
          for (const child of bodyChildren) {
            if (child.type === 'paragraph' && Array.isArray(child.children)) {
              inlineStream.push(...child.children);
            } else {
              inlineStream.push(child);
            }
          }
          for (const n of inlineStream) {
            if (n.type === 'text' && typeof n.value === 'string') {
              n.value = n.value.replace(/\n\s*/g, ' ');
            }
          }

          if (hasBlockLevelChild) {
            // A block-level node is present — split the stream at block boundaries, hoisting
            // block-level nodes (e.g. a list) out as siblings of the surrounding text paragraphs.
            const hoisted = hoistFlowElementsFromParagraph(inlineStream);
            bannerChildren = Array.isArray(hoisted) ? hoisted : [hoisted];
          } else {
            // Inline-only content — merge into a single inline paragraph.
            bannerChildren = inlineStream.length > 0 ? [{ type: 'paragraph', children: inlineStream }] : [];
          }
        }

        return {
          type: 'mdxJsxFlowElement',
          name: 'Banner',
          attributes,
          children: bannerChildren,
        };
      }

      // Instruqt embed path must be a JSX prop (`embedValue`); the generic path puts it in paragraph
      // children, which MDX does not pass through as plain text to our component.
      if (directiveName === 'instruqt') {
        const embedValue = parseSnootyArgument(node).trim();
        const attributes: MdastNode[] = toJsxAttributes(node.options);
        if (embedValue) {
          attributes.push({ type: 'mdxJsxAttribute', name: 'embedValue', value: embedValue });
        }
        return {
          type: 'mdxJsxFlowElement',
          name: 'Instruqt',
          attributes,
          children: convertChildren({ nodes: node.children, depth, ctx, parentType: directiveName }),
        };
      }

      // community-driver label text must serialize inline (mdxJsxTextElement inside paragraph) so MDX does
      // not wrap it in <p>, which would produce invalid <a><p> nesting in the rendered Link component.
      if (directiveName === 'community-driver') {
        const attributes: MdastNode[] = toJsxAttributes(node.options);
        const labelText = parseSnootyArgument(node).trim();
        const children: MdastNode[] = labelText ? [{ type: 'text', value: labelText }] : [];
        return {
          type: 'paragraph',
          children: [{ type: 'mdxJsxTextElement', name: 'CommunityDriver', attributes, children }],
        };
      }

      // Admonitions and their aliases — these have registered MDX components.
      const DIRECTIVE_TO_COMPONENT: Record<string, string> = {
        see: 'See',
        seealso: 'See',
      };

      const componentName = DIRECTIVE_TO_COMPONENT[directiveName] ?? pascalCase(node.name ?? 'Directive');

      const attributes: MdastNode[] = toJsxAttributes(node.options);

      const ADMONITION_DIRECTIVES = new Set(['tip', 'note', 'important', 'warning', 'example', 'see', 'seealso']);
      let includeArgumentAsChild = true;
      if (node.argument && ADMONITION_DIRECTIVES.has(directiveName)) {
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

      // Directives with registered MDX components in docs-nextjs — emit named JSX.
      // Admonitions also receive special attribute handling above (title from argument).
      const DIRECTIVES_WITH_REGISTERED_COMPONENTS = new Set([
        ...ADMONITION_DIRECTIVES,
        'card',
        'card-group',
        'column',
        'container',
        'cta-banner',
        'deprecated-version-selector',
        'introduction',
        'multi-column',
        'openapi-changelog',
        'search-results',
      ]);

      if (DIRECTIVES_WITH_REGISTERED_COMPONENTS.has(directiveName)) {
        return {
          type: 'mdxJsxFlowElement',
          name: componentName,
          attributes,
          children,
        };
      }

      // Unknown directive: pass children through rather than emitting an unregistered
      // JSX component that would crash compileMDX. Mirrors old Snooty ComponentFactory
      // behavior (warn + render children / return null for empty directives).
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[snooty-ast-to-mdx] unhandled directive: "${directiveName}"`);
      }
      if (children.length > 0) {
        return children;
      }
      return null;
    }

    case 'ref_role':
    case 'doc': {
      const fileid = node.fileid as [string, string?] | undefined;
      const externalUrl = typeof node.url === 'string' ? node.url : undefined;
      const refTarget = typeof node.target === 'string' && node.target ? node.target : undefined;
      const roleName = typeof node.name === 'string' ? node.name : undefined;

      // fileid paths have a leading slash; strip it to avoid double-slash URLs at render time.
      const fileidPath = fileid?.[0]?.replace(/^\/+/, '');
      const key = refTarget ?? fileidPath ?? externalUrl ?? '';
      if (!key) {
        return convertChildren({ nodes: node.children, depth, ctx });
      }

      // Store href so _references.json can resolve it at render time.
      if (fileidPath) {
        const href = fileid?.[1] ? `${fileidPath}#${fileid[1]}` : fileidPath;
        ctx.collectedRefs.set(key, href);
      } else if (externalUrl) {
        ctx.collectedRefs.set(key, externalUrl);
      }

      // Typed ref roles (e.g. :authrole:, :binary:, :term:) preserve children so that
      // formatting encoded in the AST (e.g. literal → code font) is retained.
      if (node.type === 'ref_role' && roleName && roleName !== 'ref' && roleName !== 'doc') {
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

      // Inline sub/sup roles (e.g. :sub:`2`, :sup:`64`, :superscript:`th`) should render as
      // native HTML elements so they don't require custom MDX component mappings.
      if (componentName === 'Sup' || componentName === 'Superscript') {
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
        const { term, tooltip } = parseAbbrText(textContent);
        if (tooltip) {
          return {
            type: 'mdxJsxTextElement',
            name: 'Abbr',
            attributes: [{ type: 'mdxJsxAttribute', name: 'tooltip', value: tooltip }],
            children: [{ type: 'text', value: term }],
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

      // Use mdxJsxTextElement for DefinitionTerm so its content serializes inline
      // (one line) rather than as a block with a paragraph wrapper. Text elements
      // never get blank lines between sibling inline children.
      const termElement: MdastNode = {
        type: 'mdxJsxTextElement',
        name: 'DefinitionTerm',
        attributes: [],
        children: termChildren,
      };

      // Use mdxJsxTextElement for DefinitionDescription when the entire description
      // is a single inline paragraph — the paragraph wrapper is unnecessary and
      // causes `<p>` tags to appear inside `<dd>`. For complex descriptions that
      // contain block-level children (multiple paragraphs, includes, etc.) keep the
      // flow element so those blocks serialize correctly.
      const isSimpleInlineDesc = descChildren.length === 1 && descChildren[0].type === 'paragraph';
      const descElement: MdastNode = isSimpleInlineDesc
        ? {
            type: 'mdxJsxTextElement',
            name: 'DefinitionDescription',
            attributes: [],
            children: (descChildren[0].children as MdastNode[]) ?? [],
          }
        : {
            type: 'mdxJsxFlowElement',
            name: 'DefinitionDescription',
            attributes: [],
            children: descChildren,
          };

      return {
        type: 'mdxJsxFlowElement',
        name: 'DefinitionListItem',
        attributes,
        children: [termElement, descElement],
      };
    }

    case 'line_block': {
      const lines = (node.children ?? []).flatMap((ln, idx, arr) => {
        const converted = convertChildren({ nodes: [ln], depth, ctx });
        if (idx < arr.length - 1) {
          converted.push(LINE_BLOCK_BREAK);
        }
        return converted;
      });
      return { type: 'paragraph', children: lines };
    }

    case 'line': {
      // Line nodes can carry RST line-block margin in `value` (often "| ") while inline
      // markup (e.g. :ref:) lives in `children`. Returning only `value` drops references.
      const lineChildren = convertChildren({ nodes: node.children, depth, ctx });
      const rawValue = node.value != null && String(node.value).length > 0 ? String(node.value) : '';

      if (lineChildren.length > 0) {
        const afterMargin = rawValue.replace(/^\|\s*/, '');
        if (afterMargin) {
          return [{ type: 'text', value: afterMargin }, ...lineChildren];
        }
        return lineChildren.length === 1 ? lineChildren[0]! : lineChildren;
      }

      if (rawValue) {
        return { type: 'text', value: rawValue };
      }
      return null;
    }

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
      const attributes: MdastNode[] = [];
      if (node.name) attributes.push({ type: 'mdxJsxAttribute', name: 'name', value: String(node.name) });

      const bodyChildren = convertChildren({ nodes: node.children, depth, ctx });

      // If the footnote body contains block-level content (lists, multiple paragraphs,
      // flow elements, code blocks) we must use mdxJsxFlowElement — an inline element
      // cannot legally contain block children and the MDX parser will reject it.
      const hasBlockContent =
        bodyChildren.some((child) => MDAST_BLOCK_TYPES.has(child.type) && child.type !== 'paragraph') ||
        bodyChildren.filter((c) => c.type === 'paragraph').length > 1;

      if (hasBlockContent) {
        return {
          type: 'mdxJsxFlowElement',
          name: 'Footnote',
          attributes,
          identifier,
          label: node.name ?? undefined,
          children: bodyChildren,
        };
      }

      // Simple case: footnote body is a single paragraph (or plain inline nodes).
      // Flatten any paragraph wrapper so everything serialises on one line:
      //   <Footnote name="…">text <Guilabel>…</Guilabel></Footnote>
      // Wrap in a paragraph node so the mdast tree treats it as block-level.
      const inlineNodes: MdastNode[] = [];
      for (const child of bodyChildren) {
        if (child.type === 'paragraph' && Array.isArray(child.children)) {
          inlineNodes.push(...child.children);
        } else {
          inlineNodes.push(child);
        }
      }
      for (const n of inlineNodes) {
        if (n.type === 'text' && typeof n.value === 'string') {
          n.value = n.value.replace(/\n\s*/g, ' ');
        }
      }
      return {
        type: 'paragraph',
        children: [
          {
            type: 'mdxJsxTextElement',
            name: 'Footnote',
            attributes,
            identifier,
            label: node.name ?? undefined,
            children: inlineNodes,
          },
        ],
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
        const { term, tooltip } = parseAbbrText(textContent);
        if (tooltip) {
          return {
            type: 'mdxJsxTextElement',
            name: 'Abbr',
            attributes: [{ type: 'mdxJsxAttribute', name: 'tooltip', value: tooltip }],
            children: [{ type: 'text', value: term }],
          };
        }
      }

      const externalHyperlinkRef = findExternalHyperlinkReference(node.children);
      // Plain includes suppress baked values so callers replace via `<Replacement>`;
      // keep `<Reference type="substitution" />` there instead of inlining `[text](url)`.
      if (
        externalHyperlinkRef &&
        typeof externalHyperlinkRef.refuri === 'string' &&
        !ctx.suppressSubstitutionInlineValues
      ) {
        const linkLabel = extractInlineDisplayText(externalHyperlinkRef.children ?? []);
        const slotBody = ctx.emitSubstitutionReferencesAsReplacement;
        if (!slotBody && refname && linkLabel) {
          ctx.collectedSubstitutions.set(refname, { text: linkLabel, url: externalHyperlinkRef.refuri });
        }
        return {
          type: 'link',
          url: externalHyperlinkRef.refuri,
          children: convertChildren({
            nodes: externalHyperlinkRef.children ?? [],
            depth,
            ctx,
          }),
        };
      }

      const refLinkNode = findRefOrDocRoleInSubstitution(node.children);
      if (refLinkNode) {
        const refTargetKey = collectRefTargetFromRefRoleLike(refLinkNode, ctx);
        if (refTargetKey && refname) {
          const title = extractInlineDisplayText(refLinkNode.children ?? []);
          const slotBody = ctx.emitSubstitutionReferencesAsReplacement;

          // Include bodies with `.. replacement::` still need refKey + type replacement (+ refTarget for remark).
          if (slotBody) {
            const attributes: MdastNode[] = [
              { type: 'mdxJsxAttribute', name: 'refKey', value: refname },
              { type: 'mdxJsxAttribute', name: 'type', value: 'replacement' },
              { type: 'mdxJsxAttribute', name: 'refTarget', value: refTargetKey },
            ];
            return {
              type: 'mdxJsxTextElement',
              name: 'Reference',
              attributes,
              children: [],
            };
          }

          // Plain include bodies with a page-level literal override: suppress baked xref so the
          // per-page <Replacement> slot can provide the literal value instead.
          if (ctx.suppressSubstitutionInlineValues && ctx.substitutionDefLiterals?.has(refname)) {
            return {
              type: 'mdxJsxTextElement',
              name: 'Reference',
              attributes: [
                { type: 'mdxJsxAttribute', name: 'refKey', value: refname },
                { type: 'mdxJsxAttribute', name: 'type', value: 'substitution' },
              ],
              children: [],
            };
          }

          // Break out `|alias| replace:: :ref:` … as the same output as a standalone `:ref:` / `:doc:`.
          if (title) {
            ctx.collectedSubstitutions.set(refname, title);
          }
          const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'name', value: refTargetKey }];
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
      }

      // Typed ref roles (:binary:, :authrole:, :term:, etc.) — emit as <RefRole> identical to
      // a standalone typed role, so |mongos| → <RefRole type="binary" name="bin.mongos">.
      // Plain include bodies suppress the baked value so per-page <Replacement> slots take precedence.
      const typedRefNode = findTypedRefRoleInSubstitution(node.children);
      if (typedRefNode) {
        if (ctx.suppressSubstitutionInlineValues && refname) {
          return {
            type: 'mdxJsxTextElement',
            name: 'Reference',
            attributes: [
              { type: 'mdxJsxAttribute', name: 'refKey', value: refname },
              { type: 'mdxJsxAttribute', name: 'type', value: 'substitution' },
            ],
            children: [],
          };
        }
        const roleName = typeof typedRefNode.name === 'string' ? typedRefNode.name : '';
        const key = extractRefTargetKeyFromRefRoleLike(typedRefNode) ?? '';
        if (roleName && key) {
          collectRefTargetFromRefRoleLike(typedRefNode, ctx);
          return {
            type: 'mdxJsxTextElement',
            name: 'RefRole',
            attributes: [
              { type: 'mdxJsxAttribute', name: 'type', value: roleName },
              { type: 'mdxJsxAttribute', name: 'name', value: key },
            ],
            children: convertChildren({ nodes: typedRefNode.children, depth, ctx }),
          };
        }
      }

      // Included RST often has text-only `substitution_reference` children (definitions live on the parent page).
      const fromCatalog = refname ? ctx.substitutionRefXref?.get(refname) : undefined;
      // The catalog is keyed by alias name across the whole tree, so a definition elsewhere can
      // override a page that defines the same alias locally. On a normal page the node's own
      // children are Snooty's authoritative resolution, so prefer them when they differ from the
      // catalog. Include bodies (slot / suppressed) still use the catalog.
      const localResolvedText =
        !ctx.emitSubstitutionReferencesAsReplacement && !ctx.suppressSubstitutionInlineValues
          ? extractInlineDisplayText(node.children ?? [])
          : '';
      const catalogOverriddenByLocal = !!fromCatalog && !!localResolvedText && localResolvedText !== fromCatalog.title;
      // Emit the node's resolved children directly so inline formatting (code, emphasis, etc.) is
      // kept; a flat `value` would render as plain text at runtime.
      if (catalogOverriddenByLocal) {
        if (refname) ctx.collectedSubstitutions.set(refname, localResolvedText);
        return convertChildren({ nodes: node.children ?? [], depth, ctx });
      }
      if (fromCatalog) {
        const slotBody = ctx.emitSubstitutionReferencesAsReplacement;
        if (fromCatalog.href && !ctx.collectedRefs.has(fromCatalog.refTargetKey)) {
          ctx.collectedRefs.set(fromCatalog.refTargetKey, fromCatalog.href);
        }
        // Typed ref roles (e.g. :binary:) in catalog — emit as <RefRole> not <Reference>.
        if (fromCatalog.roleType) {
          return {
            type: 'mdxJsxTextElement',
            name: 'RefRole',
            attributes: [
              { type: 'mdxJsxAttribute', name: 'type', value: fromCatalog.roleType },
              { type: 'mdxJsxAttribute', name: 'name', value: fromCatalog.refTargetKey },
            ],
            children: [{ type: 'inlineCode', value: fromCatalog.title }],
          };
        }
        if (slotBody) {
          return {
            type: 'mdxJsxTextElement',
            name: 'Reference',
            attributes: [
              { type: 'mdxJsxAttribute', name: 'refKey', value: refname },
              { type: 'mdxJsxAttribute', name: 'type', value: 'replacement' },
              { type: 'mdxJsxAttribute', name: 'refTarget', value: fromCatalog.refTargetKey },
            ],
            children: [],
          };
        }
        // Plain include bodies with a page-level literal override: suppress baked xref so the
        // per-page <Replacement> slot can provide the literal value instead.
        if (ctx.suppressSubstitutionInlineValues && ctx.substitutionDefLiterals?.has(refname)) {
          ctx.collectedSubstitutions.set(refname, fromCatalog.title);
          return {
            type: 'mdxJsxTextElement',
            name: 'Reference',
            attributes: [
              { type: 'mdxJsxAttribute', name: 'refKey', value: refname },
              { type: 'mdxJsxAttribute', name: 'type', value: 'substitution' },
            ],
            children: [],
          };
        }
        ctx.collectedSubstitutions.set(refname, fromCatalog.title);
        return {
          type: 'mdxJsxTextElement',
          name: 'Reference',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'name', value: fromCatalog.refTargetKey },
            { type: 'mdxJsxAttribute', name: 'title', value: fromCatalog.title },
          ],
          children: [],
        };
      }

      let text = extractInlineDisplayText(node.children ?? []);
      if (!text && refname) {
        text = ctx.substitutionDefLiterals?.get(refname) ?? '';
      }
      const slotBody = ctx.emitSubstitutionReferencesAsReplacement;
      if (!slotBody && refname && text) {
        ctx.collectedSubstitutions.set(refname, text);
      }
      // Include bodies: type="replacement" for parent <Replacement>; pages use type="substitution"
      const attributes: MdastNode[] = [];
      if (refname) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'refKey', value: refname });
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'type',
          value: slotBody ? 'replacement' : 'substitution',
        });
        // Bake the Snooty-resolved value directly into the element so context-dependent
        // substitutions (e.g. |idp-provider| defined differently per page) render with
        // the correct value rather than whatever _references.json last stored.
        // Suppressed for plain include bodies — those use <Replacement> slots instead.
        if (!slotBody && !ctx.suppressSubstitutionInlineValues && text) {
          attributes.push({ type: 'mdxJsxAttribute', name: 'value', value: text });
        }
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

    case 'tab': {
      const tabid = typeof node.options?.tabid === 'string' ? node.options.tabid : '';
      const argumentNodes = Array.isArray(node.argument) ? node.argument : [];
      const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'tabid', value: tabid }];
      const nameAttr = buildTabNameAttribute(argumentNodes);
      if (nameAttr) attributes.push(nameAttr);
      return {
        type: 'mdxJsxFlowElement',
        name: 'Tab',
        attributes,
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

      const nameStr = typeof node.name === 'string' ? node.name : 'target';
      const hidden =
        !!node.options && typeof node.options === 'object' && Boolean((node.options as { hidden?: boolean }).hidden);

      // `.. _anchor:` label targets — anchor-only, same as legacy Snooty renderer.
      if (nameStr === 'label') {
        return ids.map((id) => ({
          type: 'mdxJsxFlowElement',
          name: 'Target',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'id', value: id },
            { type: 'mdxJsxAttribute', name: 'name', value: 'label' },
          ],
          children: [],
        }));
      }

      const primaryId = ids[0];
      const attributes: MdastNode[] = [
        { type: 'mdxJsxAttribute', name: 'id', value: primaryId },
        { type: 'mdxJsxAttribute', name: 'name', value: nameStr },
      ];
      if (hidden) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'hidden', value: 'true' });
      }

      if (nameStr === 'binary' || nameStr === 'program' || hidden) {
        return {
          type: 'mdxJsxFlowElement',
          name: 'Target',
          attributes,
          children: [],
        };
      }

      const identifierNodes = (node.children ?? []).filter((c) => c.type === 'target_identifier');
      const directiveArgNodes = (node.children ?? []).filter((c) => c.type === 'directive_argument');
      const otherNodes = (node.children ?? []).filter(
        (c) => c.type !== 'target_identifier' && c.type !== 'directive_argument',
      );

      const argContent = convertChildren({ nodes: directiveArgNodes, depth, ctx });
      const argTextValue = argContent.map((n) => (n as { value?: string }).value ?? '').join('');

      const childContent = convertChildren({ nodes: identifierNodes, depth, ctx });
      const identifierTextValue = childContent.map((n) => (n as { value?: string }).value ?? '').join('');

      const textValue = argTextValue || identifierTextValue;
      if (textValue) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'term', value: textValue });
      }

      const bodyChildren = convertChildren({ nodes: otherNodes, depth, ctx });

      const extraRefAnchors: MdastNode[] = ids.slice(1).map((id) => ({
        type: 'mdxJsxFlowElement',
        name: 'RefTarget',
        attributes: [{ type: 'mdxJsxAttribute', name: 'id', value: id }],
        children: [],
      }));

      return [
        ...extraRefAnchors,
        {
          type: 'mdxJsxFlowElement',
          name: 'Target',
          attributes,
          children: bodyChildren,
        },
      ];
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
      // The parent `target` node already emits `<Target>` / `<RefTarget>`; this node only
      // supplies display text when the parent walks children separately.
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
  /**
   * Slot-based include bodies only: emit substitution refs as `type="replacement"` for
   * `<Replacement>` slots (see `convertDirectiveInclude` when `.. replacement::` is present).
   */
  emitSubstitutionReferencesAsReplacement?: boolean;
  /**
   * Optional pre-built xref catalog (nested include conversion passes the parent page’s map).
   * When omitted, built from `substitution_definition` nodes in `root`.
   */
  substitutionRefXref?: Map<string, SubstitutionRefXrefInfo>;
  /** Parent page non-xref substitution definitions (`:pipeline:`, plain text); merged with this root's definitions. */
  substitutionDefLiterals?: Map<string, string>;
  /**
   * Parent page raw `substitution_definition` children keyed by refname. Threaded into nested
   * include conversions so deeply-nested includes (e.g. page → table → row description) can build
   * `<Replacement>` slots from the page-level definition rather than the global default Snooty baked
   * into the include body. Merged with this root's own definitions.
   */
  substitutionDefNodes?: Map<string, SnootyNode[]>;
  /** Plain include bodies only: suppress the `value` attribute so `<Replacement>` slots win. */
  suppressSubstitutionInlineValues?: boolean;
  /**
   * True when this conversion emits an include file body (not a top-level page). Threaded onto the
   * context so `convertDirectiveInclude` emits propagating `<Reference type="replacement">`
   * placeholders for nested-include substitution slots instead of baking a single value into the
   * shared file. The recursive include-body conversion sets this to `true`.
   */
  emittingIncludeFile?: boolean;
  /**
   * When true, skip the `wrapInlineBlockNode` pass at the root and section levels.
   * Use when converting inline-only slot content (e.g. `<Replacement>` values) where
   * wrapping inline MDX nodes in paragraphs would introduce unwanted blank lines.
   */
  skipRootBlockWrapping?: boolean;
}

export const convertSnootyAstToMdast = (root: SnootyNode, options?: ConvertSnootyAstToMdastOptions): MdastRoot => {
  const metaFromDirectives: Record<string, unknown> = {};
  const twitterFromDirectives: Record<string, unknown> = {};
  const contentChildren: MdastNode[] = [];
  const collectedSubstitutions = new Map<string, CollectedSubstitutionValue>();
  const collectedRefs = new Map<string, string>();

  const substitutionRefXref = mergeSubstitutionRefXrefMaps(
    options?.substitutionRefXref,
    buildSubstitutionRefXrefMap(root),
  );

  const substitutionDefLiterals = mergeSubstitutionDefLiteralMaps(
    options?.substitutionDefLiterals,
    buildSubstitutionDefinitionLiteralMap(root),
  );

  const substitutionDefNodes = mergeSubstitutionDefNodesMaps(
    options?.substitutionDefNodes,
    buildSubstitutionDefinitionNodesMap(root),
  );

  const ctx: ConversionContext = {
    emitMdxFile: options?.onEmitMdxFile,
    currentOutfilePath: options?.currentOutfilePath,
    emitSubstitutionReferencesAsReplacement: options?.emitSubstitutionReferencesAsReplacement,
    substitutionRefXref,
    substitutionDefLiterals,
    substitutionDefNodes,
    suppressSubstitutionInlineValues: options?.suppressSubstitutionInlineValues,
    emittingIncludeFile: options?.emittingIncludeFile,
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

  // Pre-scan root-level children and the first section's children for meta and twitter
  // directives. Both locations are valid in RST (meta can appear before or after the
  // page heading). Place in frontmatter.
  const collectMetaAndTwitter = (nodes: SnootyNode[]) => {
    for (const node of nodes) {
      if (node.type !== 'directive') continue;
      const name = String(node.name ?? '').toLowerCase();
      if (name === 'meta' && node.options) {
        Object.assign(metaFromDirectives, node.options);
      } else if (name === 'twitter' && node.options) {
        Object.assign(twitterFromDirectives, node.options);
      }
    }
  };

  collectMetaAndTwitter(root.children ?? []);
  const firstSection = (root.children ?? []).find((n) => n.type === 'section');
  if (firstSection?.children) {
    collectMetaAndTwitter(firstSection.children);
  }

  const maybeWrap = options?.skipRootBlockWrapping ? (n: MdastNode) => n : wrapInlineBlockNode;

  (root.children ?? []).forEach((child: SnootyNode) => {
    const converted = convertNode({ node: child, depth: options?.initialDepth ?? 1, ctx });
    if (Array.isArray(converted)) contentChildren.push(...converted.map(maybeWrap));
    else if (converted) contentChildren.push(maybeWrap(converted));
  });

  // Merge page-level options that sit on the root node itself.
  // Promote `template` out of options so it always lives at the top level of frontmatter,
  // regardless of whether it came from root.options (e.g. product-landing) or a meta directive.
  const { template: pageTemplate, ...pageOptions } = (root as { options?: Record<string, unknown> }).options ?? {};

  // Snooty's raw `headings` option (used to build the "On this page" ToC) can contain abbr
  // roles whose text still includes the "(expansion)" — strip it and re-derive `id` so ToC
  // links and heading anchors agree. See normalizeHeadingOptions for details.
  if (Array.isArray(pageOptions.headings)) {
    pageOptions.headings = normalizeHeadingOptions(
      pageOptions.headings as Parameters<typeof normalizeHeadingOptions>[0],
    );
  }

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
  // Build the twitter frontmatter object from the collected twitter directive options.
  // Only include fields that are actually present; omit the key entirely when empty.
  const rawTwitter: Record<string, string | undefined> = {
    creator: twitterFromDirectives.creator as string | undefined,
    image: twitterFromDirectives.image as string | undefined,
    'image-alt': twitterFromDirectives['image-alt'] as string | undefined,
    site: twitterFromDirectives.site as string | undefined,
    title: twitterFromDirectives.title as string | undefined,
  };
  const twitter = Object.fromEntries(Object.entries(rawTwitter).filter(([, v]) => v !== undefined));

  const frontmatterObj: MDXFrontmatter = {
    ...(root.fileid ? { fileId: root.fileid as string } : {}),
    ...(pageTemplate ? { template: pageTemplate as PageTemplateType } : {}),
    ...(Object.keys(pageOptions).length ? { options: pageOptions as unknown as PageOptions } : {}),
    // meta directives are spread last so they can override page-level options (including template)
    ...metaFromDirectives,
    ...(Object.keys(facets).length ? { facets } : {}),
    ...(Object.keys(twitter).length ? { twitter } : {}),
  };

  // Compose final children array with optional frontmatter
  const children: MdastNode[] = [];
  if (Object.keys(frontmatterObj).length) {
    const sortedFrontmatter = Object.fromEntries(Object.entries(frontmatterObj).sort(([a], [b]) => a.localeCompare(b)));
    children.push({ type: 'yaml', value: yaml.stringify(sortedFrontmatter) });
  }
  // Add content directly without any imports
  children.push(...contentChildren);

  const rootNode = { type: 'root', children } as MdastRoot;

  // Attach collected references so the caller can emit a _references.ts artifact
  if (collectedSubstitutions.size > 0 || collectedRefs.size > 0) {
    const substitutions: Record<string, CollectedSubstitutionValue> = {};
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
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([, v]) => v !== undefined)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return { type: 'mdxJsxAttribute', name: key, value };
      }
      return {
        type: 'mdxJsxAttribute',
        name: key,
        value: { type: 'mdxJsxAttributeValueExpression', value: stableStringify(value) },
      };
    });
};
