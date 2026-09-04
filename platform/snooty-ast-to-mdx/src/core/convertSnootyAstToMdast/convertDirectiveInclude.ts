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
 * Recursively collect every substitution_reference in `nodes`, traversing into nested include
 * directives as well. A substitution used deep inside a nested (shared) include must surface to
 * this outermost caller so its `<Include>` carries the value slot. Shared intermediate includes
 * forward the value via a `<Reference type="replacement">` placeholder (see the slot loop below),
 * so the per-page value supplied here propagates all the way down at runtime.
 * Returns a map of refname → resolved children (the Snooty-resolved content).
 */
const collectSubstitutionRefs = (nodes: SnootyNode[]): Map<string, SnootyNode[]> => {
  const refs = new Map<string, SnootyNode[]>();
  const walk = (node: SnootyNode) => {
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

/** Last-writer-wins `substitution_definition` bodies under `nodes` (this include's own content). */
const collectSubstitutionDefs = (nodes: SnootyNode[]): Map<string, SnootyNode[]> => {
  const defs = new Map<string, SnootyNode[]>();
  const walk = (node: SnootyNode) => {
    if (node.type === 'substitution_definition') {
      const key =
        (typeof node.refname === 'string' && node.refname) || (typeof node.name === 'string' && node.name) || '';
      if (key && Array.isArray(node.children) && node.children.length > 0) {
        defs.set(key, node.children as SnootyNode[]);
      }
    }
    (node.children ?? []).forEach(walk);
  };
  nodes.forEach(walk);
  return defs;
};

/**
 * Expand `|alias| replace:: |other|` (and longer chains) to the concrete
 * definition body before emitting a `<Replacement>` slot.
 *
 * Nested substitution references would otherwise serialize as
 * `<Reference type="substitution">` inside the slot. Those nodes must be
 * fully resolved before React render — they are not page components — and
 * the Atlas Azure AD page (`|idp-provider| replace:: |azure-ad|` plus RST
 * tabs wrapping YAML step includes) is the outlier that left them in the
 * tree. Okta/Google/Ping define `|idp-provider|` as a literal, so they
 * never hit this path.
 */
const expandSubstitutionSlotNodes = (
  nodes: SnootyNode[],
  ctx: ConversionContext,
  seen: Set<string> = new Set(),
): SnootyNode[] => {
  const out: SnootyNode[] = [];
  for (const node of nodes) {
    if (node.type !== 'substitution_reference' && node.type !== 'substitution') {
      out.push(node);
      continue;
    }
    const key =
      (typeof node.refname === 'string' && node.refname) ||
      (typeof node.name === 'string' && node.name) ||
      '';
    if (!key || seen.has(key)) {
      if (Array.isArray(node.children) && node.children.length) {
        out.push(...(node.children as SnootyNode[]));
      }
      continue;
    }
    const nextSeen = new Set(seen);
    nextSeen.add(key);
    const defNodes = ctx.substitutionDefNodes?.get(key);
    if (defNodes?.length) {
      out.push(...expandSubstitutionSlotNodes(defNodes, ctx, nextSeen));
      continue;
    }
    if (Array.isArray(node.children) && node.children.length) {
      out.push(...expandSubstitutionSlotNodes(node.children as SnootyNode[], ctx, nextSeen));
      continue;
    }
    const literal = ctx.substitutionDefLiterals?.get(key);
    if (literal) {
      out.push({ type: 'text', value: literal });
      continue;
    }
    out.push(node);
  }
  return out;
};

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

  // For plain includes (no explicit .. replacement:: directives), scan the include content for
  // substitution_reference nodes and emit a <Replacement> slot for each one. This lets
  // page-specific values (e.g. |idp-provider| = "Okta" on one page, "Google Workspace" on
  // another) override the global _references.json fallback at runtime in remark-resolve-imports.
  if (!isSlotBased) {
    const includeLocalDefNodes = collectSubstitutionDefs(contentChildren);
    const substRefs = collectSubstitutionRefs(contentChildren);
    for (const [refname, subChildren] of substRefs) {
      // Prefer defs that belong to *this* include (or, while emitting an include file, defs from
      // that file) over the page-level last-writer-wins map. Composable-tutorial pages such as
      // token-filters.txt include many `*_ui.rst` files that each redefine `|analyzer-name|`; a
      // document-global lookup would make every section render the last include's analyzer.
      const scopedNodes =
        includeLocalDefNodes.get(refname) ??
        (ctx.emittingIncludeFile ? ctx.localSubstitutionDefNodes?.get(refname) : undefined);

      // When this include is itself being emitted as a shared file and the alias is *not* defined
      // here, do not bake a value: a single value would collide across pages that include this file
      // with different substitutions (last-writer-wins on disk). Instead forward a
      // `<Reference type="replacement">` placeholder that this include's caller (ultimately the top
      // page) resolves via its own `<Replacement>` slot at runtime.
      if (ctx.emittingIncludeFile && !scopedNodes) {
        replacementChildren.push({
          type: 'mdxJsxFlowElement',
          name: 'Replacement',
          attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: refname }],
          children: [
            {
              type: 'mdxJsxTextElement',
              name: 'Reference',
              attributes: [
                { type: 'mdxJsxAttribute', name: 'refKey', value: refname },
                { type: 'mdxJsxAttribute', name: 'type', value: 'replacement' },
              ],
              children: [],
            } as MdastNode,
          ],
        } as MdastNode);
        continue;
      }

      // Prefer the page-level substitution_definition children over the Snooty-resolved include
      // children: the include body is parsed independently using the global references file, so its
      // resolved value may be a different page's default rather than this page's override.
      //
      // Global linked references (:ref:/:pipeline: — an xref catalog entry with no roleType) are
      // baked directly into the include body and are identical on every page, so they need no
      // <Replacement> slot here. But typed-role xref substitutions (e.g. |tool-binary| =
      // :binary:`~bin.mongofiles`) and literals are emitted as per-page placeholders in the include
      // body, so build a slot from this page's own definition.
      const xref = ctx.substitutionRefXref?.get(refname);
      const isBakedGlobalRef = !!xref && !xref.roleType;
      const pageNodes = !isBakedGlobalRef ? ctx.substitutionDefNodes?.get(refname) : undefined;
      const nodesToConvert = expandSubstitutionSlotNodes(scopedNodes ?? pageNodes ?? subChildren, ctx);
      if (!nodesToConvert.length) continue;
      const slotRoot = convertSnootyAstToMdast(
        { type: 'root', children: nodesToConvert },
        {
          onEmitMdxFile: ctx.emitMdxFile,
          currentOutfilePath: path.normalize(emittedPathNormalized),
          skipRootBlockWrapping: true,
          substitutionRefXref: ctx.substitutionRefXref,
          substitutionDefLiterals: ctx.substitutionDefLiterals,
          substitutionDefNodes: ctx.substitutionDefNodes,
        },
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
