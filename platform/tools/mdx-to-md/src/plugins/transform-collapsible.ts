import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Convert <Collapsible heading="..." subHeading="..." headingLevel={n}>
 * components into proper markdown headings followed by their content.
 *
 * The snooty converter bakes the surrounding section depth into `headingLevel`,
 * so we use it directly to produce a heading at the right level. The sub-heading
 * (if present) is emitted one level deeper.
 *
 * Input:
 *   <Collapsible heading="Advanced Options" subHeading="For power users" headingLevel={3}>
 *     ...content...
 *   </Collapsible>
 *
 * Output:
 *   ### Advanced Options
 *   #### For power users
 *
 *   ...content...
 */
export function transformCollapsible() {
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
        node.name !== "Collapsible"
      )
        return;

      const getAttr = (name: string) =>
        node.attributes?.find((a: any) => a.name === name);

      const headingAttr = getAttr("heading");
      const subHeadingAttr = getAttr("subHeading");
      const headingLevelAttr = getAttr("headingLevel");

      const heading: string | undefined = headingAttr?.value;
      const subHeading: string | undefined = subHeadingAttr?.value;

      // headingLevel may be stored as a string or as an expression value
      let depth = 3;
      if (headingLevelAttr) {
        const raw =
          typeof headingLevelAttr.value === "string"
            ? headingLevelAttr.value
            : headingLevelAttr.value?.value;
        const parsed = parseInt(String(raw ?? ""), 10);
        if (!isNaN(parsed)) depth = Math.min(Math.max(parsed, 1), 6);
      }

      const nodes: any[] = [];

      if (heading) {
        nodes.push({
          type: "heading",
          depth: Math.min(depth, 6),
          children: [{ type: "text", value: heading }],
        });
      }

      if (subHeading) {
        nodes.push({
          type: "heading",
          depth: Math.min(depth + 1, 6),
          children: [{ type: "text", value: subHeading }],
        });
      }

      nodes.push(...(node.children ?? []));

      replacements.push({ parent, index, nodes });
    });

    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
