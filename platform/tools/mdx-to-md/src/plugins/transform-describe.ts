import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Convert <Describe term="..."> components into labeled markdown blocks.
 *
 * The RST `describe` directive pairs a term with a definition body. The term
 * lives only in the `term` prop — without this plugin it would be lost when
 * stripCustomMdx unwraps the element.
 *
 * Input:
 *   <Describe term="db.collection.find()">
 *     Returns documents that match the query criteria.
 *   </Describe>
 *
 * Output:
 *   **db.collection.find()**
 *
 *   Returns documents that match the query criteria.
 */
export function transformDescribe() {
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
        node.name !== "Describe"
      )
        return;

      const termAttr = node.attributes?.find((a: any) => a.name === "term");
      const term: string | undefined = termAttr?.value;

      const nodes: any[] = [];

      if (term) {
        nodes.push({
          type: "paragraph",
          children: [
            { type: "strong", children: [{ type: "text", value: term }] },
          ],
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
