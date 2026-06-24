import type { Root, Link, Paragraph, PhrasingContent } from 'mdast';
import type { Node, Parent } from 'unist';
import type { MdxJsxAttribute, MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';
import { visit } from 'unist-util-visit';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { getBlobStringWithFallback } from './blob-read';
import { getBlobKey } from './get-blob-key';

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
export const remarkResolveImports = ({ projectPath }: { projectPath: string }) => {
  return async (tree: Root) => {
    await resolveIncludes({ tree, projectPath });

    const loadedRefs = await loadReferences(projectPath);
    const refs: ReferencesData = loadedRefs ?? { substitutions: {}, refs: {} };

    resolveSubstitutions({ tree, refs, projectPath });
    resolveRefLinks({ tree, refs, projectPath });
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
}

const resolveIncludes = async ({ tree, projectPath, includeStack = new Set<string>() }: ResolveIncludesArgs) => {
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
}

const fetchAndParseInclude = async ({
  src,
  projectPath,
  includeStack,
  replacementSlots,
}: FetchAndParseIncludeArgs): Promise<Root | null> => {
  const mdxFilePath = src.replace(/^\/+/, '').replace(/\.mdx$/, '') + '.mdx';
  // projectPath is empty string for the landing page (no project path prefix)
  const rawPath = projectPath ? `${projectPath}/${mdxFilePath}` : mdxFilePath;
  const blobKey = getBlobKey(rawPath);

  if (includeStack.has(blobKey)) {
    console.warn(`[remarkResolveImports] Circular include: ${[...includeStack, blobKey].join(' → ')}`);
    return null;
  }

  const nextStack = new Set(includeStack);
  nextStack.add(blobKey);

  try {
    const content = await getBlobStringWithFallback(rawPath);
    if (!content) {
      console.warn(`[remarkResolveImports] Could not load include: ${src} (key: ${blobKey})`);
      return null;
    }

    const parsed = mdxProcessor.parse(content);

    await resolveIncludes({ tree: parsed, projectPath, includeStack: nextStack });

    resolveReplacementReferences(parsed, replacementSlots ?? {});

    // Resolve any <Include> nodes introduced by the replacement slots above.
    await resolveIncludes({ tree: parsed, projectPath, includeStack: nextStack });

    return parsed;
  } catch (err) {
    console.warn(`[remarkResolveImports] Failed to include: ${src}`, err);
    return null;
  }
};

type AbbrSubstitution = { text: string; tooltip: string };
type LinkSubstitution = { text: string; url: string };
type SubstitutionValue = string | AbbrSubstitution | LinkSubstitution;

interface ReferencesData {
  substitutions: Record<string, SubstitutionValue>;
  refs: Record<string, string>;
}

const loadReferences = async (projectPath: string): Promise<ReferencesData | null> => {
  // projectPath is empty string for the landing page (no project path prefix)
  const rawPath = projectPath ? `${projectPath}/_references.json` : '_references.json';
  const blobKey = getBlobKey(rawPath);

  try {
    const raw = await getBlobStringWithFallback(rawPath);
    if (!raw) {
      console.warn(`[remarkResolveImports] _references.json not found (key: ${blobKey})`);
      return null;
    }

    const parsed = JSON.parse(raw);
    return {
      substitutions: parsed.substitutions ?? {},
      refs: parsed.refs ?? {},
    };
  } catch (err) {
    console.warn(`[remarkResolveImports] Failed to load references (key: ${blobKey}):`, err);
    return null;
  }
};

interface ResolveRefsArgs {
  tree: Root;
  refs: ReferencesData;
  projectPath?: string;
}

const resolveSubstitutions = ({ tree, refs, projectPath }: ResolveRefsArgs) => {
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

    if (refTarget) {
      const href = refs.refs[refTarget];
      const linkLabel =
        typeof value === 'string'
          ? value
          : value && typeof value === 'object' && 'text' in value
          ? value.text
          : undefined;

      if (href && linkLabel !== undefined) {
        const resolvedHref = href.startsWith('http') ? href : `/docs/${projectPath}/${href}`;
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

const resolveRefLinks = ({ tree, refs, projectPath }: ResolveRefsArgs) => {
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
      const resolvedHref = href.startsWith('http') ? href : `/docs/${projectPath}/${href}`;
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

      const resolvedHref = href.startsWith('http') ? href : `/docs/${projectPath}/${href}`;

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

/** Unwrap a single paragraph so inline `<Reference type="replacement" />` can become phrasing nodes.
 *
 * Also handles the legacy case where inline substitution content (e.g. :icon-mms: + :guilabel:)
 * was serialized with blank lines between elements by the converter, causing remark to re-parse
 * each element as mdxJsxFlowElement (block). When the fragment contains flow elements but no
 * truly-block content (code, heading, admonition, etc.), convert flow elements to text elements
 * and unwrap paragraphs so the nodes can be spliced into an inline context.
 */
const replacementSlotToNodes = (fragment: Node[]): Node[] => {
  const [first] = fragment;
  if (fragment.length === 1 && first.type === 'paragraph') {
    return [...(first as Paragraph).children];
  }
  // Inline-only content serialized as block: mdxJsxFlowElement nodes with no truly-block
  // siblings. Convert flow→text and unwrap paragraphs to recover the intended inline nodes.
  const TRULY_BLOCK = new Set(['code', 'heading', 'blockquote', 'list', 'listItem', 'thematicBreak', 'table']);
  if (fragment.some((n) => n.type === 'mdxJsxFlowElement') && !fragment.some((n) => TRULY_BLOCK.has(n.type))) {
    return fragment.flatMap((n) => {
      if (n.type === 'paragraph') return [...(n as Paragraph).children];
      if (n.type === 'mdxJsxFlowElement') return [{ ...n, type: 'mdxJsxTextElement' }];
      return [n];
    });
  }
  return fragment;
};

const extractReplacementSlots = (includeNode: MdxJsxElement): Record<string, Node[]> => {
  const slots: Record<string, Node[]> = {};

  for (const child of includeNode.children ?? []) {
    if (!isJsxElement(child) || child.name !== 'Replacement') continue;

    const name = getAttr(child, 'name');
    if (!name) continue;

    const inner = (child.children ?? []).filter((c) => (c as Node).type !== 'yaml');

    slots[name] = inner.map(cloneMdastTree);
  }
  return slots;
};

const resolveReplacementReferences = (tree: Root, slots: Record<string, Node[]>) => {
  if (!Object.keys(slots).length) return;

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

    replacements.push({ index, parent, replacement: replacementSlotToNodes(fragment) });
  });

  applyReplacements(replacements);
};

// ─── Shared utilities ────────────────────────────────────────────────

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

const applyReplacements = (replacements: JsxReplacement[]) => {
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { parent, index, replacement } = replacements[i];
    const nodes = Array.isArray(replacement) ? replacement : [replacement];
    parent.children.splice(index, 1, ...nodes);
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
