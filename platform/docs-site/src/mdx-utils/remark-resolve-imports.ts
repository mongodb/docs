import type { Root, Link, Paragraph, PhrasingContent } from 'mdast';
import type { Node, Parent } from 'unist';
import type { MdxJsxAttribute, MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';
import { visit } from 'unist-util-visit';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { getContentString } from './get-content-string';
import { remapDiskRelativeToBlobRelative } from './blob-path-remap';

type MdxJsxElement = MdxJsxFlowElement | MdxJsxTextElement;

/**
 * Shared remark processor for parsing MDX content.
 * Must match the parsing extensions used by compileMDX
 * so that "Include" ASTs are compatible when spliced into the parent tree.
 */
const mdxProcessor = remark().use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMdx);

/**
 * Remark plugin that resolves imports in the MDX AST before downstream
 * plugins run. Handles resolution types in order:
 *
 *  1. Includes  – inlines <Include src="..." /> content; applies <Replacement> slots to
 *     `<Reference type="replacement" />` in the included file
 *  2. Substitutions – replaces <Reference type="substitution" /> with text from _references.json,
 *     or with a link when `refTarget` is set (include replacement-slot MDX; normal pages use
 *     <Reference name title /> and step 3)
 *  3. Ref links – replaces <Reference> and <RefRole> with mdast links
 *
 * Downstream plugins (e.g. remarkHowToSeoMetadata) then see a complete
 * tree where toString() returns meaningful text for every node.
 */
export const remarkResolveImports = ({
  projectPath,
  dirNameToPrefix = {},
}: {
  projectPath: string;
  dirNameToPrefix?: Record<string, string>;
}) => {
  return async (tree: Root) => {
    const loadedRefs = await loadReferences(projectPath);
    const refs: ReferencesData = loadedRefs ?? { substitutions: {}, refs: {} };

    await resolveIncludes({ tree, projectPath, refs, dirNameToPrefix });

    resolveSubstitutions({ tree, refs, projectPath, dirNameToPrefix });
    resolveRefLinks({ tree, refs, projectPath, dirNameToPrefix });
    normalizePhrasingContainers(tree);
    stripUnresolvedImportNodes(tree);
    hoistBlocksOutOfParagraphs(tree);
  };
};

interface IncludeNode {
  index: number;
  parent: Parent;
  src: string;
  includeNode: MdxJsxElement;
}

interface ResolveIncludesArgs {
  tree: Root;
  projectPath: string;
  includeStack?: Set<string>;
  refs: ReferencesData;
  dirNameToPrefix: Record<string, string>;
}

const resolveIncludes = async ({
  tree,
  projectPath,
  includeStack = new Set<string>(),
  refs,
  dirNameToPrefix,
}: ResolveIncludesArgs) => {
  const nodesToReplace: IncludeNode[] = [];

  visit(tree, (node, index, parent) => {
    if (index === undefined || !parent) return;

    if (isJsxElement(node) && node.name === 'Include') {
      const src = getAttr(node, 'src');
      if (src) {
        nodesToReplace.push({ index, parent, src, includeNode: node });
      }
    }
  });

  if (!nodesToReplace.length) return;

  const resolved = await Promise.all(
    nodesToReplace.map(async (item) => {
      const replacementSlots = extractReplacementSlots(item.includeNode);
      const replacement = await fetchAndParseInclude({
        src: item.src,
        projectPath,
        includeStack,
        replacementSlots,
        refs,
        dirNameToPrefix,
      });
      return { ...item, replacement };
    }),
  );

  for (let i = resolved.length - 1; i >= 0; i--) {
    const { parent, index, replacement } = resolved[i];

    const inlinedChildren = replacement?.children?.filter((child) => child.type !== 'yaml');

    if (inlinedChildren?.length) {
      parent.children.splice(index, 1, ...inlinedChildren);
    } else {
      parent.children.splice(index, 1);
    }
  }
};

interface FetchAndParseIncludeArgs {
  src: string;
  projectPath: string;
  includeStack: Set<string>;
  replacementSlots?: Record<string, Node[]>;
  refs: ReferencesData;
  dirNameToPrefix: Record<string, string>;
}

const fetchAndParseInclude = async ({
  src,
  projectPath,
  includeStack,
  replacementSlots,
  refs,
  dirNameToPrefix,
}: FetchAndParseIncludeArgs): Promise<Root | null> => {
  const mdxFilePath = src.replace(/^\/+/, '').replace(/\.mdx$/, '') + '.mdx';
  // projectPath is empty string for the landing page (no project path prefix)
  const filePath = projectPath ? `${projectPath}/${mdxFilePath}` : mdxFilePath;

  if (includeStack.has(filePath)) {
    console.warn(`[remarkResolveImports] Circular include: ${[...includeStack, filePath].join(' → ')}`);
    return null;
  }

  const nextStack = new Set(includeStack);
  nextStack.add(filePath);

  try {
    const content = await getContentString(filePath);
    if (!content) {
      console.warn(`[remarkResolveImports] Could not load include: ${src} (${filePath})`);
      return null;
    }

    const parsed = mdxProcessor.parse(content);

    await resolveIncludes({ tree: parsed, projectPath, includeStack: nextStack, refs, dirNameToPrefix });

    resolveReplacementReferences(parsed, replacementSlots ?? {});

    // Resolve any <Include> nodes introduced by the replacement slots above.
    await resolveIncludes({ tree: parsed, projectPath, includeStack: nextStack, refs, dirNameToPrefix });

    // Slot values may themselves contain <Reference> nodes (e.g. `|idp-provider|
    // replace:: |azure-ad|`). Resolve them here — before the include is spliced
    // into the page — so leftover Include/Reference never reach React.
    resolveSubstitutions({ tree: parsed, refs, projectPath, dirNameToPrefix });
    resolveRefLinks({ tree: parsed, refs, projectPath, dirNameToPrefix });
    hoistBlocksOutOfParagraphs(parsed);

    return parsed;
  } catch (err) {
    console.warn(`[remarkResolveImports] Failed to include: ${src}`, err);
    return null;
  }
};

type AbbrSubstitution = { text: string; tooltip: string };
type LinkSubstitution = { text: string; url: string };
/** Inline markup (icons, guilabels, roles) stored as mdast, with `text` as the flattened fallback. */
type RichSubstitution = { text: string; nodes: PhrasingContent[] };
type SubstitutionValue = string | AbbrSubstitution | LinkSubstitution | RichSubstitution;

interface ReferencesData {
  substitutions: Record<string, SubstitutionValue>;
  refs: Record<string, string>;
}

const loadReferences = async (projectPath: string): Promise<ReferencesData | null> => {
  // projectPath is empty string for the landing page (no project path prefix)
  const filePath = projectPath ? `${projectPath}/_references.json` : '_references.json';

  try {
    const raw = await getContentString(filePath);
    if (!raw) {
      console.warn(`[remarkResolveImports] _references.json not found (${filePath})`);
      return null;
    }

    const parsed = JSON.parse(raw);
    return {
      substitutions: parsed.substitutions ?? {},
      refs: parsed.refs ?? {},
    };
  } catch (err) {
    console.warn(`[remarkResolveImports] Failed to load references (${filePath}):`, err);
    return null;
  }
};

interface ResolveRefsArgs {
  tree: Root;
  refs: ReferencesData;
  projectPath?: string;
  dirNameToPrefix?: Record<string, string>;
}

/** Snooty stores `index.txt` as fileid `index` (`index#hash`). Drop that trailing segment. */
const collapseTrailingIndexHref = (href: string): string => href.replace(/(?:^|\/)index(?=#|$)/, '');

/**
 * Build the `/docs/...` URL for a project-relative ref href.
 *
 * `_references.json` stores hrefs relative to the project source root (e.g.
 * `get-started#some-label`), and `projectPath` is the on-disk project path
 * (e.g. `django-mongodb/current`). The published URL prefix can differ from the
 * disk directory name (e.g. `django-mongodb` → `languages/python/django-mongodb`),
 * so remap the disk-relative path to its URL-relative form before prefixing
 * `/docs/`. Without this remap the link drops the project path prefix.
 */
const buildDocsHref = (
  href: string,
  projectPath: string | undefined,
  dirNameToPrefix: Record<string, string>,
): string => {
  if (href.startsWith('http')) return href;
  const cleanedHref = collapseTrailingIndexHref(href).replace(/^\/+/, '');
  const diskRelative = projectPath ? `${projectPath}/${cleanedHref}` : cleanedHref;
  return `/docs/${remapDiskRelativeToBlobRelative(diskRelative, dirNameToPrefix)}`;
};

const resolveSubstitutions = ({ tree, refs, projectPath, dirNameToPrefix = {} }: ResolveRefsArgs) => {
  const replacements: JsxReplacement[] = [];

  visit(tree, (node, index, parent) => {
    if (index === undefined || !parent) return;
    if (!isJsxElement(node)) return;

    if (node.name !== 'Reference') return;
    if (getAttr(node, 'type') !== 'substitution') return;

    const key = getAttr(node, 'refKey') ?? getAttr(node, 'name');
    if (!key) return;

    const refTarget = getAttr(node, 'refTarget');
    // Fall back to the shared _references.json for substitutions without an inline value
    // (e.g. references in standalone include files processed without page context).
    const value = refs.substitutions[key];

    // Prefer the value baked in at conversion time (mirrors RST inline substitution
    // resolution and preserves per-page context for keys like |idp-provider|).
    // When _references.json has a URL for this key (LinkSubstitution), emit a link
    // so external-link substitutions (e.g. snooty.toml `vercel = "`Vercel <url>`__"`)
    // render as anchors even in content converted before the converter fix.
    const inlineValue = getAttr(node, 'value');
    if (inlineValue) {
      if (value && typeof value === 'object' && 'url' in value) {
        replacements.push({ index, parent, replacement: createLinkNode(value.url, inlineValue) });
        return;
      }
      replacements.push({ index, parent, replacement: { type: 'text', value: inlineValue } as PhrasingContent });
      return;
    }

    // Rich substitution: the value is inline markup (e.g. |ui-org-menu| = ":icon-mms:`office`
    // :guilabel:`Organizations` menu") that no string attribute could carry, so the converter
    // stored the mdast in _references.json. Splice it in at the reference site. Clone per use —
    // the same entry serves every reference to this key, and remark plugins mutate nodes.
    if (value && typeof value === 'object' && 'nodes' in value) {
      replacements.push({
        index,
        parent,
        // JSON round-trip rather than structuredClone: the nodes come straight from
        // _references.json, so they are already plain data, and this runs in every environment.
        replacement: JSON.parse(JSON.stringify(value.nodes)) as PhrasingContent[],
      });
      return;
    }

    if (refTarget) {
      const href = refs.refs[refTarget];
      const linkLabel =
        typeof value === 'string'
          ? value
          : value && typeof value === 'object' && 'text' in value
          ? value.text
          : undefined;

      if (href && linkLabel !== undefined) {
        const resolvedHref = buildDocsHref(href, projectPath, dirNameToPrefix);
        replacements.push({ index, parent, replacement: createLinkNode(resolvedHref, linkLabel) });
        return;
      }

      // Missing xref href or label: fall back to plain substitution / Abbr when possible
      if (!value) return;
      if (typeof value === 'object' && 'url' in value) {
        replacements.push({ index, parent, replacement: createLinkNode(value.url, value.text) });
        return;
      }
      if (typeof value === 'object') {
        const abbrNode: MdxJsxTextElement = {
          type: 'mdxJsxTextElement',
          name: 'Abbr',
          attributes: [{ type: 'mdxJsxAttribute', name: 'tooltip', value: value.tooltip }],
          children: [{ type: 'text', value: value.text }],
        };
        replacements.push({ index, parent, replacement: abbrNode });
        return;
      }
      replacements.push({ index, parent, replacement: { type: 'text', value } as PhrasingContent });
      return;
    }

    if (!value) {
      console.error(
        `[remarkResolveImports] Unresolved <Reference type="substitution" refKey="${key}"> — node removed to prevent render error`,
      );
      replacements.push({ index, parent, replacement: [] });
      return;
    }

    if (typeof value === 'object' && 'url' in value) {
      replacements.push({ index, parent, replacement: createLinkNode(value.url, value.text) });
      return;
    }

    if (typeof value === 'object') {
      const abbrNode: MdxJsxTextElement = {
        type: 'mdxJsxTextElement',
        name: 'Abbr',
        attributes: [{ type: 'mdxJsxAttribute', name: 'tooltip', value: value.tooltip }],
        children: [{ type: 'text', value: value.text }],
      };
      replacements.push({ index, parent, replacement: abbrNode });
      return;
    }

    replacements.push({ index, parent, replacement: { type: 'text', value } as PhrasingContent });
  });

  applyReplacements(replacements);
};

const resolveRefLinks = ({ tree, refs, projectPath, dirNameToPrefix = {} }: ResolveRefsArgs) => {
  const replacements: JsxReplacement[] = [];

  visit(tree, (node, index, parent) => {
    if (index === undefined || !parent) return;
    if (!isJsxElement(node)) return;

    if (node.name === 'Reference') {
      if (getAttr(node, 'type') === 'substitution') return;
      if (getAttr(node, 'type') === 'replacement') return;

      const key = getAttr(node, 'name') ?? getAttr(node, 'refKey');
      if (!key) return;

      const href = refs.refs[key];
      if (!href) {
        console.warn(`[remarkResolveImports] Reference key "${key}" not found in _references.json`);
        const fallback: PhrasingContent = { type: 'text', value: `Reference could not be replaced: ${key}` };
        replacements.push({ index, parent, replacement: fallback });
        return;
      }

      const title = getAttr(node, 'title') ?? key;
      const resolvedHref = buildDocsHref(href, projectPath, dirNameToPrefix);
      replacements.push({ index, parent, replacement: createLinkNode(resolvedHref, title) });
      return;
    }

    if (node.name === 'RefRole') {
      const name = getAttr(node, 'name');
      if (!name) {
        const fallback: PhrasingContent = {
          type: 'text',
          value: 'RefRole could not be replaced: (missing name)',
        };
        replacements.push({ index, parent, replacement: fallback });
        return;
      }

      const href = refs.refs[name];
      // Use the live array reference (not a spread copy) so that when applyReplacements
      // processes nested RefRole children in reverse DFS order, those mutations are
      // reflected here before this link node is spliced into the tree.
      const children: Link['children'] = node.children?.length
        ? (node.children as Link['children'])
        : [{ type: 'text', value: name }];

      if (!href) {
        console.warn(`[remarkResolveImports] RefRole could not be replaced: ${name}`);
        const fallback: PhrasingContent = {
          type: 'text',
          value: children.map((c) => (c.type === 'text' ? c.value : '')).join(''),
        };
        replacements.push({ index, parent, replacement: fallback });
        return;
      }

      const resolvedHref = buildDocsHref(href, projectPath, dirNameToPrefix);

      const linkNode: Link = {
        type: 'link',
        url: resolvedHref,
        children,
      };
      replacements.push({ index, parent, replacement: linkNode });
    }
  });

  applyReplacements(replacements);
};

/** Block-level node types that must never be flattened into an inline (text) context. */
const TRULY_BLOCK = new Set(['code', 'heading', 'blockquote', 'list', 'listItem', 'thematicBreak', 'table']);

/** JSX names that are phrasing even when they parse as flow (blank lines in a slot). */
const INLINE_JSX_NAMES = new Set([
  'Icon',
  'Guilabel',
  'Abbr',
  'RefRole',
  'Reference',
  'Kbd',
  'Highlight',
  'Literal',
  'Gold',
  'Red',
  null,
]);

const fragmentHasBlockContent = (fragment: Node[]): boolean => {
  if (fragment.some((n) => TRULY_BLOCK.has(n.type))) return true;
  if (fragment.filter((n) => n.type === 'paragraph').length > 1) return true;
  return fragment.some(
    (n) => n.type === 'mdxJsxFlowElement' && !INLINE_JSX_NAMES.has((n as MdxJsxElement).name as string | null),
  );
};

/** Unwrap `<>...</>` (null-name JSX) so slot values are the inner nodes.
 * Converter wraps inline Replacement content in a fragment to survive stringify;
 * leaving that wrapper in the tree hides nested `<Reference>` nodes from some
 * later passes and is unnecessary once the slot is spliced in. */
const unwrapNullNameFragments = (nodes: Node[]): Node[] =>
  nodes.flatMap((n) => {
    if (
      (n.type === 'mdxJsxFlowElement' || n.type === 'mdxJsxTextElement') &&
      (n as MdxJsxElement).name == null &&
      Array.isArray((n as Parent).children) &&
      (n as Parent).children.length
    ) {
      return unwrapNullNameFragments((n as Parent).children);
    }
    return [n];
  });

/** Convert a replacement-slot fragment into nodes appropriate for where the
 * `<Reference type="replacement" />` appears.
 *
 * Block context (`inline` is false — the reference is a flow element on its own line):
 * splice the slot's nodes unchanged so block content (e.g. <Tabs> with code, a self-closing
 * <Target>/<Instruqt>, tables) keeps its block structure. Forcing these into an inline node
 * places phrasing nodes at the root, which makes remark-stringify drop the blank lines between
 * blocks; the resulting MDX can no longer be re-parsed (the markdown-export `acorn` crash).
 *
 * Inline context (`inline` is true — the reference is a text element within a sentence):
 * recover phrasing nodes by unwrapping a lone paragraph and flattening inline-only flow
 * elements. This handles the legacy case where inline substitution content (e.g. :icon-mms: +
 * :guilabel:) was serialized with blank lines and re-parsed as separate flow elements.
 */
const replacementSlotToNodes = (fragment: Node[], inline: boolean): Node[] => {
  fragment = unwrapNullNameFragments(fragment);
  // Keep real block content (Tabs, Warning, Include, multiple paragraphs) even
  // when the <Reference> parsed as inline. Flattening those to phrasing is what
  // left only the nested mongodb-crypt link on In-Use Encryption pages.
  if (!inline || fragmentHasBlockContent(fragment)) return fragment;

  const [first] = fragment;
  if (fragment.length === 1 && first.type === 'paragraph') {
    return [...(first as Paragraph).children];
  }
  // Inline content serialized as block: flatten mdxJsxFlowElement nodes back to inline,
  // unless the fragment contains a truly block-level node (which must keep its structure).
  if (fragment.some((n) => n.type === 'mdxJsxFlowElement') && !fragment.some((n) => TRULY_BLOCK.has(n.type))) {
    return fragment.flatMap((n) => {
      if (n.type === 'paragraph') return [...(n as Paragraph).children];
      if (n.type === 'mdxJsxFlowElement') return [{ ...n, type: 'mdxJsxTextElement' }];
      return [n];
    });
  }
  return fragment;
};

/** Unwrap a lone `paragraph` — and flatten inline-only flow elements — back to
 * phrasing content, unless a truly block-level node is present (which must keep its
 * structure). Shared shape with the inline branch of `replacementSlotToNodes`. */
const flattenToPhrasing = (nodes: Node[]): Node[] => {
  if (nodes.length === 1 && nodes[0].type === 'paragraph') {
    return [...(nodes[0] as Paragraph).children];
  }
  if (
    nodes.some((n) => n.type === 'paragraph' || n.type === 'mdxJsxFlowElement') &&
    !nodes.some((n) => TRULY_BLOCK.has(n.type))
  ) {
    return nodes.flatMap((n) => {
      if (n.type === 'paragraph') return [...(n as Paragraph).children];
      if (n.type === 'mdxJsxFlowElement') return [{ ...n, type: 'mdxJsxTextElement' }];
      return [n];
    });
  }
  return nodes;
};

/** Node types whose children must be phrasing (inline) content only. */
const PHRASING_CONTAINER_TYPES = new Set(['link', 'emphasis', 'strong', 'delete', 'mdxJsxTextElement']);

/** Final pass: guarantee phrasing containers never hold block-level nodes.
 *
 * A multi-line (flow) `<RefRole>`/`<Reference>` parses its body into a `paragraph`.
 * When `resolveRefLinks` converts that element to a `link` by reusing its children,
 * the paragraph ends up *inside* the link, producing `<a><p>…</p></a>`. A block
 * cannot live inside an inline anchor, so the browser splits the link across lines
 * and pushes the inner text (e.g. a substitution like "Ops Manager") out of the
 * anchor — the reported spacing/newline break. Running after all replacements are
 * applied keeps this independent of the resolve passes' live-array ordering. */
const normalizePhrasingContainers = (tree: Root) => {
  visit(tree, (node) => {
    if (!PHRASING_CONTAINER_TYPES.has(node.type)) return;
    const parent = node as Parent;
    if (!parent.children?.length) return;
    parent.children = flattenToPhrasing(parent.children) as typeof parent.children;
  });
};

const extractReplacementSlots = (includeNode: MdxJsxElement): Record<string, Node[]> => {
  const slots: Record<string, Node[]> = {};

  for (const child of includeNode.children ?? []) {
    if (!isJsxElement(child) || child.name !== 'Replacement') continue;

    const name = getAttr(child, 'name');
    if (!name) continue;

    const inner = (child.children ?? []).filter((c) => (c as Node).type !== 'yaml');

    slots[name] = unwrapNullNameFragments(inner.map(cloneMdastTree));
  }
  return slots;
};

const resolveReplacementReferences = (tree: Root, slots: Record<string, Node[]>) => {
  const replacements: JsxReplacement[] = [];

  visit(tree, (node, index, parent) => {
    if (index === undefined || !parent) return;
    if (!isJsxElement(node) || node.name !== 'Reference') return;

    const refType = getAttr(node, 'type');
    // Apply slots to explicit replacement refs AND substitution refs that have a matching
    // slot (page-specific values emitted by convertDirectiveInclude for plain includes).
    if (refType !== 'replacement' && refType !== 'substitution') return;

    const key = getAttr(node, 'refKey') ?? getAttr(node, 'name');
    if (!key) return;

    const fragment = slots[key];
    if (!fragment?.length) {
      if (refType === 'replacement') {
        console.error(
          `[remarkResolveImports] Missing <Replacement name="${key}"> for include — node removed to prevent render error`,
        );
        replacements.push({ index, parent, replacement: [] });
      }
      // substitution refs without a slot fall through to resolveSubstitutions (_references.json)
      return;
    }

    // A reference parsed inside a sentence is a text element (inline context); one on its
    // own line is a flow element (block context). Only inline references should have their
    // slot flattened to phrasing — block references must keep block-level slot content.
    const inline = node.type === 'mdxJsxTextElement';
    // Clone per use. `slots` holds one fragment per Replacement name, but an included file may
    // reference the same name several times. Splicing the shared nodes in at every reference
    // would put one object at multiple indices of the same parent; `visit` then reports the
    // same index for each occurrence and the reverse splice in applyReplacements collapses
    // onto that single position, leaving the other occurrences unresolved.
    replacements.push({
      index,
      parent,
      replacement: replacementSlotToNodes(fragment.map(cloneMdastTree), inline),
    });
  });

  applyReplacements(replacements);
};

// ─── Shared utilities ───────────────────────────────────────────────

const createLinkNode = (url: string, text: string): Link => ({
  type: 'link',
  url,
  children: [{ type: 'text', value: text }],
});

const isJsxElement = (node: Node): node is MdxJsxElement => {
  return node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
};

const getAttr = (node: MdxJsxElement, name: string): string | undefined => {
  const attr = node.attributes?.find((a) => (a as MdxJsxAttribute).name === name);
  if (!attr?.value) return undefined;
  return typeof attr.value === 'string' ? attr.value : undefined;
};

interface JsxReplacement {
  index: number;
  parent: Parent;
  replacement: Node | Node[];
}

/** mdast parent types whose children are phrasing (inline) content. */
const PHRASING_PARENT_TYPES = new Set([
  'paragraph',
  'heading',
  'emphasis',
  'strong',
  'delete',
  'link',
  'linkReference',
  'tableCell',
  'mdxJsxTextElement',
]);

/** mdast phrasing (inline) node types. */
const PHRASING_NODE_TYPES = new Set([
  'text',
  'emphasis',
  'strong',
  'delete',
  'inlineCode',
  'link',
  'linkReference',
  'image',
  'imageReference',
  'break',
  'footnoteReference',
  'mdxJsxTextElement',
  'mdxTextExpression',
]);

/**
 * A flow-context reference (e.g. a `<Reference/>` written on its own line, so it
 * parses as a block `mdxJsxFlowElement`) can resolve to phrasing content such as a
 * bare `link` or `text` node. Splicing that phrasing directly into a flow position
 * (under `root`, a `<TableCell>`, a list item, etc.) produces a tree that
 * remark-stringify serializes non-round-trippably: adjacent blocks lose their
 * blank-line separators and `{`/`}` inside the phrasing are emitted unescaped. The
 * markdown-export re-parse (`mdxToMarkdown`) then fails with "expected a closing
 * tag" or "could not parse expression with acorn". Wrapping the phrasing in a
 * paragraph keeps the flow position valid; it renders identically in the HTML
 * compile path.
 *
 * Do not wrap when the original node was inline JSX (`mdxJsxTextElement`). A
 * one-line `<DefinitionDescription>…<RefRole>…</RefRole>…</DefinitionDescription>`
 * parses as a flow parent with inline children; wrapping each resolved link in a
 * paragraph produces `<dd>text <p><a>link</a></p> text</dd>` and breaks glossary
 * spacing.
 */
const wrapPhrasingForFlowParent = (parent: Parent, nodes: Node[], original?: Node): Node[] => {
  if (nodes.length === 0) return nodes;
  if (PHRASING_PARENT_TYPES.has(parent.type)) return nodes;
  if (original?.type === 'mdxJsxTextElement') return nodes;
  if (!nodes.every((node) => PHRASING_NODE_TYPES.has(node.type))) return nodes;
  return [{ type: 'paragraph', children: nodes as PhrasingContent[] } as Paragraph];
};

const applyReplacements = (replacements: JsxReplacement[]) => {
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { parent, index, replacement } = replacements[i];
    const original = parent.children[index] as Node | undefined;
    const nodes = Array.isArray(replacement) ? replacement : [replacement];
    parent.children.splice(index, 1, ...wrapPhrasingForFlowParent(parent, nodes, original));
  }
};

const isBlockish = (n: Node): boolean => {
  if (TRULY_BLOCK.has(n.type) || n.type === 'paragraph') return true;
  return n.type === 'mdxJsxFlowElement';
};

const splitParagraphAtBlocks = (children: Node[]): Node[] => {
  const out: Node[] = [];
  let pending: Node[] = [];
  const flush = () => {
    const inline = pending.filter(
      (n) => !(n.type === 'text' && !String((n as { value?: string }).value ?? '').trim()),
    );
    if (inline.length) out.push({ type: 'paragraph', children: inline } as Paragraph);
    pending = [];
  };
  for (const child of children) {
    if (isBlockish(child)) {
      flush();
      out.push(child);
    } else {
      pending.push(child);
    }
  }
  flush();
  return out.length ? out : [{ type: 'paragraph', children } as Paragraph];
};

/** Split paragraphs that received block slot content (warnings, tabs, includes). */
const hoistBlocksOutOfParagraphs = (tree: Root) => {
  const targets: { parent: Parent; index: number; children: Node[] }[] = [];
  visit(tree, (node, index, parent) => {
    if (!parent || index === undefined) return;
    if (node.type !== 'paragraph') return;
    const children = (node as Parent).children ?? [];
    if (!children.some(isBlockish)) return;
    targets.push({ parent, index, children });
  });
  for (let i = targets.length - 1; i >= 0; i--) {
    const { parent, index, children } = targets[i];
    parent.children.splice(index, 1, ...splitParagraphAtBlocks(children));
  }
};

/** Deep-clone mdast nodes so splicing does not mutate the parent Include’s Replacement subtree. */
const cloneMdastTree = (node: Node): Node => {
  if ('children' in node && Array.isArray((node as Parent).children)) {
    const withChildren = node as Parent;
    return {
      ...withChildren,
      children: withChildren.children.map(cloneMdastTree),
    } as Node;
  }
  return { ...node };
};

/**
 * Include and Reference are conversion-time placeholders, not page components.
 * If any survive the resolve passes (MDX still compiles; React then throws),
 * strip them so the renderer cannot 500.
 */
const stripUnresolvedImportNodes = (tree: Root) => {
  const replacements: JsxReplacement[] = [];

  visit(tree, (node, index, parent) => {
    if (index === undefined || !parent) return;
    if (!isJsxElement(node)) return;

    if (node.name === 'Include') {
      console.error(
        `[remarkResolveImports] Unresolved <Include src="${getAttr(node, 'src') ?? ''}"> — node removed to prevent render error`,
      );
      replacements.push({ index, parent, replacement: [] });
      return;
    }

    if (node.name === 'Reference') {
      const value = getAttr(node, 'value');
      const key = getAttr(node, 'refKey') ?? getAttr(node, 'name') ?? '';
      console.error(
        `[remarkResolveImports] Unresolved <Reference${key ? ` refKey="${key}"` : ''}> — node removed to prevent render error`,
      );
      replacements.push({
        index,
        parent,
        replacement: value ? ({ type: 'text', value } as PhrasingContent) : [],
      });
    }
  });

  applyReplacements(replacements);
};
