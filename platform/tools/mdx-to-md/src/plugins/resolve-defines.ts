import { SKIP, visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Parent, Root, RootContent } from "mdast";
import { getJsxAttr, isMdxJsxElement } from "../utils/mdx-jsx.js";

/** `<Define>` bodies by alias. */
export type Definitions = Map<string, RootContent[]>;

/** Replace `<>…</>` wrappers with their children; the converter wraps inline bodies in one. */
const unwrapFragments = (nodes: RootContent[]): RootContent[] =>
  nodes.flatMap((node) => {
    const isFragment =
      (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
      node.name == null;
    return isFragment ? unwrapFragments(node.children as RootContent[]) : [node];
  });

/** Every `<Define name>` body under `tree`, in document order. A later definition replaces an earlier one. */
export const collectDefinitions = (tree: Parent): Definitions => {
  const definitions: Definitions = new Map();

  visit(tree, (node) => {
    if (!isMdxJsxElement(node, "Define")) return;
    const name = getJsxAttr(node, "name");
    if (name) definitions.set(name, unwrapFragments(node.children as RootContent[]));
    return SKIP;
  });

  return definitions;
};

/** An inline reference sits in a sentence, so a lone paragraph body is unwrapped to avoid a stray block. */
const unwrapParagraphIfInline = (nodes: RootContent[], inline: boolean): RootContent[] =>
  inline && nodes.length === 1 && nodes[0].type === "paragraph"
    ? nodes[0].children
    : nodes;

/**
 * Replace each `<Reference type="substitution">` whose alias is in `definitions` with a copy of
 * that definition. A definition can refer to other aliases, so those are resolved first. `active`
 * holds the aliases being expanded, which stops a definition that refers back to itself.
 */
export const substituteDefinitions = (
  tree: Parent,
  definitions: Definitions,
  active = new Set<string>()
): void => {
  if (definitions.size === 0) return;

  const replacements: Array<{ parent: Parent; index: number; nodes: RootContent[] }> = [];

  visit(tree, (node, index, parent) => {
    if (index === undefined || !parent) return;
    if (!isMdxJsxElement(node, "Reference")) return;
    if (getJsxAttr(node, "type") !== "substitution") return;

    // A value baked in at conversion time is more specific than any definition.
    if (getJsxAttr(node, "value")) return;

    const key = getJsxAttr(node, "refKey");
    const body = key ? definitions.get(key) : undefined;
    if (!key || !body || active.has(key)) return;

    const expanded: Parent = { type: "root", children: structuredClone(body) };
    substituteDefinitions(expanded, definitions, new Set(active).add(key));

    replacements.push({
      parent,
      index,
      nodes: unwrapParagraphIfInline(
        expanded.children as RootContent[],
        node.type === 'mdxJsxTextElement',
      ),
    });
  });

  for (let i = replacements.length - 1; i >= 0; i--) {
    const { parent, index, nodes } = replacements[i];
    parent.children.splice(index, 1, ...nodes);
  }
};

/** `<Define>`s only carry values; drop them so their bodies never print as page text. */
export const removeDefinitions = (tree: Parent): void => {
  const removals: Array<{ parent: Parent; index: number }> = [];

  visit(tree, (node, index, parent) => {
    if (index === undefined || !parent || !isMdxJsxElement(node, "Define")) return;
    removals.push({ parent, index });
    return SKIP;
  });

  for (let i = removals.length - 1; i >= 0; i--) {
    const { parent, index } = removals[i];
    parent.children.splice(index, 1);
  }
};

/**
 * Apply the page's `<Define>`s to the substitution references that are still unresolved.
 * Runs after includes are inlined so a definition in one include reaches references in 
 * the page body and in other includes.
 */
export function resolveDefines(): Plugin<[], Root> {
  return function transformer() {
    return (tree: Root) => {
      substituteDefinitions(tree, collectDefinitions(tree));
      removeDefinitions(tree);
    };
  };
}
