import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Convert <Tab name="..."> components into labeled markdown sections.
 *
 * Tabs are UI constructs that present alternative content. For AI consumers
 * and plain-markdown renderers, each tab becomes an H3 heading followed by
 * its content. This preserves the semantic distinction between tab options
 * (e.g. CLI vs UI) using standard markdown structure that any parser or AI
 * agent can navigate by heading.
 *
 * The outer <Tabs> wrapper is left in place and removed later by
 * stripCustomMdx, which simply unwraps its children.
 *
 * This plugin must run after resolveIncludes (so included content inside
 * tabs is already inlined) and before stripCustomMdx.
 *
 * Input:
 *   <Tabs>
 *     <Tab name="Atlas CLI">…</Tab>
 *     <Tab name="Atlas UI">…</Tab>
 *   </Tabs>
 *
 * Output (after stripCustomMdx also runs):
 *   ### Atlas CLI
 *   …
 *   ### Atlas UI
 *   …
 */
export function transformTabs() {
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
        node.name !== "Tab"
      )
        return;

      const nameAttr = node.attributes?.find((a: any) => a.name === "name");
      const tabName: string = nameAttr?.value ?? "Tab";

      const heading: any = {
        type: "heading",
        depth: 3,
        children: [{ type: "text", value: tabName }],
      };

      replacements.push({
        parent,
        index,
        nodes: [heading, ...(node.children ?? [])],
      });
    });

    // Apply in reverse order so earlier indices stay valid
    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
