import { visit } from 'unist-util-visit';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import type { Root, Link, Text } from 'mdast';
import type { Node, Parent } from 'unist';
import { getBlobString } from './blob-read';
import { getBlobKey } from './get-blob-key';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';

/**
 * Shared remark processor for parsing MDX content.
 * Must match the parsing extensions used by compileMDX
 * so that "Include" ASTs are compatible when spliced into the parent tree.
 */
const mdxProcessor = remark().use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMdx);

/**
 * Remark plugin that resolves imports in the MDX AST before downstream
 * plugins run. Handles three resolution types in order:
 *
 *  1. Includes  – inlines <Include src="..." /> content
 *  2. Substitutions – replaces <Reference type="substitution" /> with text
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
    resolveRefLinks({ tree, refs });
  };
};

interface IncludeNode {
  index: number;
  parent: Parent;
  src: string;
}

interface ResolveIncludesArgs {
  tree: Root;
  projectPath: string;
  includeStack?: Set<string>;
}

const resolveIncludes = async ({ tree, projectPath, includeStack = new Set<string>() }: ResolveIncludesArgs) => {
  const nodesToReplace: IncludeNode[] = [];

  visit(tree, (node: Node, index: number | undefined, parent: Parent | undefined) => {
    if (index === undefined || !parent) return;

    if (isJsxElement(node) && node.name === 'Include') {
      const src = getAttr(node, 'src');
      if (src) {
        nodesToReplace.push({ index, parent, src });
      }
    }
  });

  if (!nodesToReplace.length) return;

  const resolved = await Promise.all(
    nodesToReplace.map(async (item) => {
      const replacement = await fetchAndParseInclude({ src: item.src, projectPath, includeStack });
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
}

const fetchAndParseInclude = async ({
  src,
  projectPath,
  includeStack,
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

interface JsxReplacement {
  index: number;
  parent: Parent;
  replacement: Node | Node[];
}

interface ResolveRefsArgs {
  tree: Root;
  refs: ReferencesData;
}

const resolveSubstitutions = ({ tree, refs }: ResolveRefsArgs) => {
  const replacements: JsxReplacement[] = [];

  visit(tree, (node: Node, index: number | undefined, parent: Parent | undefined) => {
    if (index === undefined || !parent) return;
    if (!isJsxElement(node)) return;

    if (node.name !== 'Reference') return;
    if (getAttr(node, 'type') !== 'substitution') return;

    const key = getAttr(node, 'refKey') ?? getAttr(node, 'name');
    if (!key) return;

    const value = refs.substitutions[key];
    if (!value) return;

    const textNode: Text = { type: 'text', value };
    replacements.push({ index, parent, replacement: textNode });
  });

  applyReplacements(replacements);
};

const resolveRefLinks = ({ tree, refs }: ResolveRefsArgs) => {
  const replacements: JsxReplacement[] = [];

  visit(tree, (node: Node, index: number | undefined, parent: Parent | undefined) => {
    if (index === undefined || !parent) return;
    if (!isJsxElement(node)) return;

    if (node.name === 'Reference') {
      if (getAttr(node, 'type') === 'substitution') return;

      const key = getAttr(node, 'name') ?? getAttr(node, 'refKey');
      if (!key) return;

      const href = refs.refs[key];
      if (!href) return;

      const title = getAttr(node, 'title') ?? key;
      const resolvedHref = href.startsWith('http') ? href : `/${href}`;

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

      const resolvedHref = href.startsWith('http') ? href : `/${href}`;
      const children = node.children?.length ? [...node.children] : [{ type: 'text' as const, value: name }];

      const linkNode: Link = {
        type: 'link',
        url: resolvedHref,
        children: children as Link['children'],
      };
      replacements.push({ index, parent, replacement: linkNode });
    }
  });

  applyReplacements(replacements);
};

// ─── Shared utilities ────────────────────────────────────────────────

const isJsxElement = (node: Node): node is MdxJsxFlowElement => {
  return node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
};

const getAttr = (node: MdxJsxFlowElement, name: string): string | undefined => {
  const attr = node.attributes?.find((a) => (a as MdxJsxAttribute).name === name);
  if (!attr?.value) return undefined;
  return typeof attr.value === 'string' ? attr.value : undefined;
};

const applyReplacements = (replacements: JsxReplacement[]) => {
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { parent, index, replacement } = replacements[i];
    const nodes = Array.isArray(replacement) ? replacement : [replacement];
    parent.children.splice(index, 1, ...nodes);
  }
};
