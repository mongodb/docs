import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Expand <Abbr tooltip="...">text</Abbr> components into "text (expansion)"
 * inline text so AI consumers and plain-markdown renderers receive the full
 * term without needing to render the tooltip UI element.
 *
 * Input:
 *   <Abbr tooltip="Application Programming Interface">API</Abbr>
 *
 * Output:
 *   API (Application Programming Interface)
 */
export function transformAbbr() {
  return (tree: Root) => {
    const replacements: Array<{
      parent: { children: any[] };
      index: number;
      nodes: any[];
    }> = [];

    visit(tree, (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;
      if (
        (node.type !== "mdxJsxFlowElement" &&
          node.type !== "mdxJsxTextElement") ||
        node.name !== "Abbr"
      )
        return;

      const tooltipAttr = node.attributes?.find(
        (a: any) => a.name === "tooltip"
      );
      const tooltip: string | undefined = tooltipAttr?.value;

      const children: any[] = node.children ?? [];

      if (tooltip) {
        // Append " (expansion)" after the abbreviation's children
        replacements.push({
          parent,
          index,
          nodes: [...children, { type: "text", value: ` (${tooltip})` }],
        });
      } else {
        // No tooltip — just unwrap the children
        replacements.push({ parent, index, nodes: children });
      }
    });

    // Apply in reverse order so earlier indices stay valid
    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
