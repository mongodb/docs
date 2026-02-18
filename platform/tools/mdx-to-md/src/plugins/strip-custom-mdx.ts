import { visit } from "unist-util-visit";
import type { Root } from "mdast";

type MdastNode = Root["children"][number];

function hasCustomMdx(tree: Root): boolean {
  let found = false;
  visit(tree, (node: unknown) => {
    if (typeof node !== "object" || node === null) return;
    const type = (node as { type?: string }).type;
    if (type === "mdxJsxFlowElement" || type === "mdxJsxTextElement")
      found = true;
  });
  return found;
}

/**
 * Strip any remaining custom MDX tags by unwrapping them: replace each
 * mdxJsxFlowElement/mdxJsxTextElement with its children so that spaces,
 * line breaks, and nested structure are preserved.
 *
 * Runs in a loop until no custom MDX nodes remain (handles nested components).
 * Elements with no children are removed.
 *
 * This plugin should run after other plugins that handle specific components
 * (e.g. transformImage, resolveIncludes).
 */
export function stripCustomMdx() {
  return (tree: Root) => {
    while (hasCustomMdx(tree)) {
      const replacements: Array<{
        parent: { children: MdastNode[] };
        index: number;
        nodes: MdastNode[];
      }> = [];

      visit(
        tree,
        (node: unknown, index: number | undefined, parent: unknown) => {
          if (
            index === undefined ||
            !parent ||
            typeof (parent as { children?: unknown[] }).children === "undefined"
          )
            return;

          const type =
            typeof node === "object" && node !== null && "type" in node
              ? (node as { type: string }).type
              : "";
          if (type !== "mdxJsxFlowElement" && type !== "mdxJsxTextElement")
            return;

          const parentWithChildren = parent as { children: MdastNode[] };
          const children: MdastNode[] =
            Array.isArray((node as { children?: MdastNode[] }).children) &&
            (node as { children: MdastNode[] }).children.length > 0
              ? [...(node as { children: MdastNode[] }).children]
              : [];

          replacements.push({
            parent: parentWithChildren,
            index,
            nodes: children,
          });
        }
      );

      const byParent = new Map<
        { children: MdastNode[] },
        Array<{ index: number; nodes: MdastNode[] }>
      >();
      for (const r of replacements) {
        const list = byParent.get(r.parent) ?? [];
        list.push({ index: r.index, nodes: r.nodes });
        byParent.set(r.parent, list);
      }
      for (const [parent, list] of byParent) {
        list.sort((a, b) => b.index - a.index);
        for (const { index, nodes } of list) {
          parent.children.splice(index, 1, ...nodes);
        }
      }
    }
  };
}
