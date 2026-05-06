import { posix as path } from 'node:path';
import { parseSnootyArgument } from './parseSnootyArgument';
import { convertSnootyAstToMdast } from './convertSnootyAstToMdast';
import type { ConversionContext, SnootyNode, MdastNode } from './types';
import { renameIncludesToUnderscore } from './renameIncludesToUnderscore';

interface ConvertDirectiveIncludeArgs {
  node: SnootyNode;
  ctx: ConversionContext;
  depth: number;
}

/**
 * Recursively collect every substitution_reference in `nodes`, skipping nested include
 * directives (those emit their own <Replacement> slots when converted).
 * Returns a map of refname → resolved children (the Snooty-resolved content).
 */
const collectSubstitutionRefs = (nodes: SnootyNode[]): Map<string, SnootyNode[]> => {
  const refs = new Map<string, SnootyNode[]>();
  const walk = (node: SnootyNode) => {
    const name = String(node.name ?? '').toLowerCase();
    if (node.type === 'directive' && (name === 'include' || name === 'sharedinclude')) return;
    if (node.type === 'substitution_reference' || node.type === 'substitution') {
      // Snooty BSON uses `name`; synthetic test data may use `refname` — mirror convertNode's fallback
      const key =
        (typeof node.refname === 'string' && node.refname) || (typeof node.name === 'string' && node.name) || '';
      if (key && !refs.has(key)) {
        refs.set(key, Array.isArray(node.children) ? (node.children as SnootyNode[]) : []);
      }
    }
    (node.children ?? []).forEach(walk);
  };
  nodes.forEach(walk);
  return refs;
};

export const convertDirectiveInclude = ({ node, ctx, depth }: ConvertDirectiveIncludeArgs): MdastNode => {
  const pathText = parseSnootyArgument(node);

  const emittedPath = toMdxIncludePath(pathText);
  const pathWithoutLeadingSlash = emittedPath.replace(/^\/+/, '');
  const emittedPathNormalized = renameIncludesToUnderscore(pathWithoutLeadingSlash);

  const originalChildren: SnootyNode[] = Array.isArray(node.children) ? node.children : [];

  // Separate replacement directive children from the actual include content
  const isReplacement = (child: SnootyNode) =>
    child.type === 'directive' && String(child.name ?? '').toLowerCase() === 'replacement';

  const replacementNodes = originalChildren.filter(isReplacement);
  const nonReplacementChildren = originalChildren.filter((c) => !isReplacement(c));

  // Unwrap a single `extract` wrapper if that is the only non-replacement child
  let contentChildren: SnootyNode[] = nonReplacementChildren;
  if (
    nonReplacementChildren.length === 1 &&
    nonReplacementChildren[0] &&
    nonReplacementChildren[0].type === 'directive' &&
    String(nonReplacementChildren[0].name ?? '').toLowerCase() === 'extract'
  ) {
    contentChildren = Array.isArray(nonReplacementChildren[0].children)
      ? (nonReplacementChildren[0].children as SnootyNode[])
      : [];
  }

  const isSlotBased = replacementNodes.length > 0;

  const nestedRoot: SnootyNode = { type: 'root', children: contentChildren };
  // Only slot-based includes (`.. replacement::` siblings) emit `type="replacement"` for
  // substitution refs. Plain includes resolve from `_references.json` like normal pages,
  // but suppress the baked-in value so <Replacement> slots from the caller take precedence.
  const emittedMdast = convertSnootyAstToMdast(nestedRoot, {
    onEmitMdxFile: ctx.emitMdxFile,
    currentOutfilePath: path.normalize(emittedPathNormalized),
    initialDepth: depth,
    substitutionRefXref: ctx.substitutionRefXref,
    substitutionDefLiterals: ctx.substitutionDefLiterals,
    emitSubstitutionReferencesAsReplacement: isSlotBased,
    suppressSubstitutionInlineValues: !isSlotBased,
  });
  ctx.emitMdxFile?.({ outfilePath: emittedPathNormalized, mdastRoot: emittedMdast });

  // Generate absolute path from root
  const targetPosix = emittedPathNormalized.replace(/^\/*/, '').replace(/\\+/g, '/');
  let includePath = `/${targetPosix}`;
  includePath = includePath.replace(/\.mdx$/i, '');

  // Convert each explicit replacement directive into a <Replacement name="..."> child element.
  // Content is converted through the normal mdast pipeline so markdown syntax works.
  const replacementChildren: MdastNode[] = replacementNodes.map((replacementNode) => {
    const key = parseSnootyArgument(replacementNode);
    const valueRoot = convertSnootyAstToMdast(
      { type: 'root', children: Array.isArray(replacementNode.children) ? replacementNode.children : [] },
      {
        onEmitMdxFile: ctx.emitMdxFile,
        currentOutfilePath: path.normalize(emittedPathNormalized),
        substitutionRefXref: ctx.substitutionRefXref,
        substitutionDefLiterals: ctx.substitutionDefLiterals,
      },
    );

    return {
      type: 'mdxJsxFlowElement',
      name: 'Replacement',
      attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: key }],
      children: valueRoot.children ?? [],
    } as MdastNode;
  });

  // For plain includes (no explicit .. replacement:: directives), scan the include content for
  // substitution_reference nodes and emit a <Replacement> slot for each one. This lets
  // page-specific values (e.g. |idp-provider| = "Okta" on one page, "Google Workspace" on
  // another) override the global _references.json fallback at runtime in remark-resolve-imports.
  if (!isSlotBased) {
    const substRefs = collectSubstitutionRefs(contentChildren);
    for (const [refname, subChildren] of substRefs) {
      if (!subChildren.length) continue;
      const slotRoot = convertSnootyAstToMdast(
        { type: 'root', children: subChildren },
        { onEmitMdxFile: ctx.emitMdxFile, currentOutfilePath: path.normalize(emittedPathNormalized) },
      );
      let slotNodes: MdastNode[] = slotRoot.children.filter(
        (c) => (c as { type: string }).type !== 'yaml',
      ) as MdastNode[];
      if (!slotNodes.length) continue;

      // When the slot content is entirely inline nodes (text, mdxJsxTextElement, etc.) with no
      // block-level wrappers, the MDX serializer emits each node on its own line with blank lines
      // between them. Those blank lines cause remark to re-parse them as block-level
      // (mdxJsxFlowElement) elements at render time, which cannot replace an inline <Reference>.
      // Wrapping in a React fragment (<>...</>) keeps all inline nodes on a single line so they
      // re-parse as inline content that replacementSlotToNodes can correctly unwrap.
      const BLOCK_TYPES = new Set([
        'paragraph',
        'heading',
        'blockquote',
        'list',
        'listItem',
        'code',
        'table',
        'thematicBreak',
        'mdxJsxFlowElement',
        'mdxFlowExpression',
      ]);
      if (!slotNodes.some((n) => BLOCK_TYPES.has((n as { type: string }).type))) {
        slotNodes = [{ type: 'mdxJsxTextElement', name: null, attributes: [], children: slotNodes } as MdastNode];
      }

      replacementChildren.push({
        type: 'mdxJsxFlowElement',
        name: 'Replacement',
        attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: refname }],
        children: slotNodes,
      } as MdastNode);
    }
  }

  return {
    type: 'mdxJsxFlowElement',
    name: 'Include',
    attributes: [{ type: 'mdxJsxAttribute', name: 'src', value: includePath } as MdastNode],
    children: replacementChildren,
  } as MdastNode;
};

const toMdxIncludePath = (path: string): string => {
  const trimmed = path.trim();
  if (/\.(rst|txt)$/i.test(trimmed)) return trimmed.replace(/\.(rst|txt)$/i, '.mdx');
  if (!/\.mdx$/i.test(trimmed)) return `${trimmed}.mdx`;
  return trimmed;
};
