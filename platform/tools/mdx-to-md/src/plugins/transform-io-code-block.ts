import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Convert <IoCodeBlock> / <Input> / <Output> components into labeled markdown
 * code blocks so AI consumers can distinguish command input from its result.
 *
 * Input code blocks are emitted as-is (they are the default context).
 * Before each Output block, a bold "Output:" label is inserted.
 *
 * Input:
 *   <IoCodeBlock>
 *     <Input>
 *       ```js
 *       db.collection.find()
 *       ```
 *     </Input>
 *     <Output>
 *       ```json
 *       { "_id": 1 }
 *       ```
 *     </Output>
 *   </IoCodeBlock>
 *
 * Output:
 *   ```js
 *   db.collection.find()
 *   ```
 *
 *   **Output:**
 *
 *   ```json
 *   { "_id": 1 }
 *   ```
 */
export function transformIoCodeBlock() {
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
        node.name !== "IoCodeBlock"
      )
        return;

      const outputNodes: any[] = [];

      for (const child of node.children ?? []) {
        const childName: string = child.name ?? "";

        if (childName === "Output") {
          outputNodes.push({
            type: "paragraph",
            children: [
              {
                type: "strong",
                children: [{ type: "text", value: "Output:" }],
              },
            ],
          });
        }

        // Emit the code block children (Input and Output each wrap a code node)
        outputNodes.push(...(child.children ?? []));
      }

      replacements.push({ parent, index, nodes: outputNodes });
    });

    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
