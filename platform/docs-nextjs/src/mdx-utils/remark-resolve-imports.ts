import type { Root, Link, Paragraph, PhrasingContent } from 'mdast';
import type { Node, Parent } from 'unist';
import type { MdxJsxAttribute, MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';
import { visit } from 'unist-util-visit';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { getBlobString } from './blob-read';
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
 *  2. Substitutions – replaces <Reference type="substitution" /> with text from _references.json
 *  3. Ref links – replaces <Reference> and <RefRole> with mdast links
 *
 * Downstream plugins (e.g. remarkHowToSeoMetadata) then see a complete
 * tree where toString() returns meaningful text for every node.
 */
export const remarkResolveImports = ({ projectPath }: { projectPath: string }) => {
  return async (tree: Root) => {
    await resolveIncludes({ tree, projectPath });

    const refs = await loadReferences(projectPath);
    if (!refs) return;

    resolveSubstitutions({ tree, refs });
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
  const blobKey = getBlobKey(`${projectPath}/${mdxFilePath}`);

  if (includeStack.has(blobKey)) {
    console.warn(`[remarkResolveImports] Circular include: ${[...includeStack, blobKey].join(' → ')}`);
    return null;
  }

  const nextStack = new Set(includeStack);
  nextStack.add(blobKey);

  try {
    const content = await getBlobString(blobKey);
    if (!content) {
      console.warn(`[remarkResolveImports] Could not load include: ${src} (key: ${blobKey})`);
      return null;
    }

    const parsed = mdxProcessor.parse(content);

    await resolveIncludes({ tree: parsed, projectPath, includeStack: nextStack });

    resolveReplacementReferences(parsed, replacementSlots ?? {});

    return parsed;
  } catch (err) {
    console.warn(`[remarkResolveImports] Failed to include: ${src}`, err);
    return null;
  }
};

interface ReferencesData {
  substitutions: Record<string, string>;
  refs: Record<string, string>;
}

const loadReferences = async (projectPath: string): Promise<ReferencesData | null> => {
  const blobKey = getBlobKey(`${projectPath}/_references.json`);

  try {
    const raw = await getBlobString(blobKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return {
      substitutions: parsed.substitutions ?? {},
      refs: parsed.refs ?? {},
    };
  } catch (err) {
    console.warn(`[remarkResolveImports] Failed to load references for ${projectPath}:`, err);
    return null;
  }
};

interface ResolveRefsArgs {
  tree: Root;
  refs: ReferencesData;
  projectPath?: string;
}

const resolveSubstitutions = ({ tree, refs }: ResolveRefsArgs) => {
  const replacements: JsxReplacement[] = [];

  visit(tree, (node, index, parent) => {
    if (index === undefined || !parent) return;
    if (!isJsxElement(node)) return;

    if (node.name !== 'Reference') return;
    if (getAttr(node, 'type') !== 'substitution') return;

    const key = getAttr(node, 'refKey') ?? getAttr(node, 'name');
    if (!key) return;

    const value = refs.substitutions[key];
    if (!value) return;

    const textNode: PhrasingContent = { type: 'text', value };
    replacements.push({ index, parent, replacement: textNode });
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
      if (!href) return;

      const title = getAttr(node, 'title') ?? key;
      const resolvedHref = href.startsWith('http') ? href : `/docs/${projectPath}/${href}`;

      const linkNode: Link = {
        type: 'link',
        url: resolvedHref,
        children: [{ type: 'text', value: title }],
      };
      replacements.push({ index, parent, replacement: linkNode });
      return;
    }

    if (node.name === 'RefRole') {
      const name = getAttr(node, 'name');
      if (!name) return;

      const href = refs.refs[name];
      if (!href) return;

      const resolvedHref = href.startsWith('http') ? href : `/docs/${projectPath}/${href}`;
      const children: Link['children'] = node.children?.length
        ? ([...node.children] as Link['children'])
        : [{ type: 'text', value: name }];

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

/** Unwrap a single paragraph so inline `<Reference type="replacement" />` can become phrasing nodes. */
const replacementSlotToNodes = (fragment: Node[]): Node[] => {
  const [first] = fragment;
  if (fragment.length === 1 && first.type === 'paragraph') {
    return [...(first as Paragraph).children];
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
    if (getAttr(node, 'type') !== 'replacement') return;

    const key = getAttr(node, 'refKey') ?? getAttr(node, 'name');
    if (!key) return;

    const fragment = slots[key];
    if (!fragment?.length) {
      console.warn(`[remarkResolveImports] Missing <Replacement name="${key}"> for include`);
      return;
    }

    replacements.push({ index, parent, replacement: replacementSlotToNodes(fragment) });
  });

  applyReplacements(replacements);
};

// ─── Shared utilities ────────────────────────────────────────────────

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
