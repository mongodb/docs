import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Convert version-change components into descriptive inline text so that AI
 * consumers see the version context rather than losing it entirely.
 *
 * Text matches the exact strings used in the docs-nextjs UI component:
 *
 *   <Deprecated version="7.0"> → **Deprecated since version 7.0**
 *   <Deprecated>              → **Deprecated**
 *   <VersionAdded version="7.0"> → **New in version 7.0**
 *   <VersionChanged version="7.0"> → **Changed in version 7.0**
 *
 * Any children (explanatory text) follow after the label.
 */
export function transformVersionDirectives() {
  return (tree: Root) => {
    const replacements: Array<{
      parent: { children: any[] };
      index: number;
      nodes: any[];
    }> = [];

    visit(tree, (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;
      if (
        node.type !== "mdxJsxFlowElement" &&
        node.type !== "mdxJsxTextElement"
      )
        return;

      const name: string = node.name ?? "";
      if (
        name !== "Deprecated" &&
        name !== "VersionAdded" &&
        name !== "VersionChanged"
      )
        return;

      const versionAttr = node.attributes?.find(
        (a: any) => a.name === "version"
      );
      const version: string | undefined = versionAttr?.value;

      let labelText: string;
      if (name === "Deprecated") {
        labelText = version
          ? `Deprecated since version ${version}`
          : "Deprecated";
      } else if (name === "VersionAdded") {
        labelText = version ? `New in version ${version}` : "New";
      } else {
        labelText = version ? `Changed in version ${version}` : "Changed";
      }

      const labelParagraph: any = {
        type: "paragraph",
        children: [
          { type: "strong", children: [{ type: "text", value: labelText }] },
        ],
      };

      replacements.push({
        parent,
        index,
        nodes: [labelParagraph, ...(node.children ?? [])],
      });
    });

    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
