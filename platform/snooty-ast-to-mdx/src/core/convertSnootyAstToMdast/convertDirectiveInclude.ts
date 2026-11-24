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

export const convertDirectiveInclude = ({ node, ctx, depth }: ConvertDirectiveIncludeArgs): MdastNode => {
  const pathText = parseSnootyArgument(node);

  const emittedPath = toMdxIncludePath(pathText);
  const pathWithoutLeadingSlash = emittedPath.replace(/^\/+/, '');
  let emittedPathNormalized = renameIncludesToUnderscore(pathWithoutLeadingSlash);
  // `.rst` sources are includes, not standalone pages. Real includes already live
  // under an `includes/` directory (renamed to `_includes/` above), but some `.rst`
  // files live in page-like paths (e.g. get-started/<lang>/...). Relocate those into
  // the non-routable `_includes/` namespace so they resolve as includes without
  // becoming directly addressable pages — mirroring the legacy `.txt`==page rule.
  // Keeping both the emitted file path and the `<Include src>` derived below in sync
  // depends on this single normalization step.
  if (/\.rst$/i.test(pathText.trim()) && !/(^|\/)_includes\//.test(emittedPathNormalized)) {
    emittedPathNormalized = `_includes/${emittedPathNormalized}`;
  }

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
    substitutionDefNodes: ctx.substitutionDefNodes,
    emitSubstitutionReferencesAsReplacement: isSlotBased,
    suppressSubstitutionInlineValues: !isSlotBased,
    // This conversion emits an include *file*, so any nested includes within it must forward
    // per-page substitution values via placeholders rather than baking a single value.
    emittingIncludeFile: true,
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
        substitutionDefNodes: ctx.substitutionDefNodes,
        emittingIncludeFile: ctx.emittingIncludeFile,
        skipRootBlockWrapping: true,
      },
    );

    return {
      type: 'mdxJsxFlowElement',
      name: 'Replacement',
      attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: key }],
      children: valueRoot.children ?? [],
    } as MdastNode;
  });

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
