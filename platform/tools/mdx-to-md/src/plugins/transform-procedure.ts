import { visit } from "unist-util-visit";
import type { Root, List, ListItem, Paragraph } from "mdast";

/**
 * Convert <Procedure> / <Step> / <StepHeading> components into a standard
 * ordered markdown list so AI consumers and plain-text renderers can follow
 * the sequence without understanding the custom JSX.
 *
 * The step title may appear in two forms depending on how the RST source
 * was authored:
 *
 *   Newer format (directive argument present):
 *     <Step>
 *       <StepHeading><p>Title text</p></StepHeading>
 *       ... body content ...
 *     </Step>
 *
 *   Older format (no directive argument, title comes from body heading):
 *     <Step>
 *       #### Title text
 *       ... body content ...
 *     </Step>
 *
 * Both are converted to:
 *
 *   1. Title text
 *
 *      - Sub-bullet a
 *      - Sub-bullet b
 *
 *      Optional body paragraph.
 *
 *   2. Next step title
 *   ...
 *
 * This plugin runs after resolveIncludes (included Steps are already inlined)
 * and resolveReferences (substitution refs in headings are already text), but
 * before stripCustomMdx so the Procedure/Step/StepHeading structure is intact.
 */
export function transformProcedure() {
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
        node.name !== "Procedure"
      )
        return;

      const listItems: ListItem[] = [];

      for (const child of node.children ?? []) {
        if (
          (child.type !== "mdxJsxFlowElement" &&
            child.type !== "mdxJsxTextElement") ||
          child.name !== "Step"
        )
          continue;

        const stepChildren: any[] = child.children ?? [];
        let titleInlineNodes: any[] = [];
        let remainingChildren: any[];

        // --- Find the step title ---

        // Newer format: explicit <StepHeading> element
        const stepHeadingIdx = stepChildren.findIndex(
          (c: any) =>
            (c.type === "mdxJsxFlowElement" ||
              c.type === "mdxJsxTextElement") &&
            c.name === "StepHeading"
        );

        if (stepHeadingIdx !== -1) {
          const stepHeading = stepChildren[stepHeadingIdx];
          // StepHeading wraps a paragraph; unwrap it to get inline nodes.
          // Fall back to using StepHeading's direct children if no paragraph.
          const para = (stepHeading.children ?? []).find(
            (c: any) => c.type === "paragraph"
          );
          titleInlineNodes = para
            ? para.children ?? []
            : stepHeading.children ?? [];

          remainingChildren = [
            ...stepChildren.slice(0, stepHeadingIdx),
            ...stepChildren.slice(stepHeadingIdx + 1),
          ];
        } else {
          // Older format: first markdown heading node inside the Step
          const headingIdx = stepChildren.findIndex(
            (c: any) => c.type === "heading"
          );
          if (headingIdx !== -1) {
            titleInlineNodes = stepChildren[headingIdx].children ?? [];
            remainingChildren = [
              ...stepChildren.slice(0, headingIdx),
              ...stepChildren.slice(headingIdx + 1),
            ];
          } else {
            // No title found — treat all children as body
            remainingChildren = stepChildren;
          }
        }

        // --- Build the list item ---

        const listItemChildren: any[] = [];

        if (titleInlineNodes.length > 0) {
          listItemChildren.push({
            type: "paragraph",
            children: titleInlineNodes,
          } as Paragraph);
        }

        // Include remaining step content (sub-lists, paragraphs, admonitions…)
        // Skip bare yaml/whitespace nodes that might have leaked in.
        for (const rem of remainingChildren) {
          if (rem.type !== "yaml") {
            listItemChildren.push(rem);
          }
        }

        listItems.push({
          type: "listItem",
          // Always spread so remark-stringify puts a blank line between steps.
          spread: true,
          children: listItemChildren,
        } as ListItem);
      }

      if (listItems.length === 0) return; // empty Procedure — let stripCustomMdx handle it

      const orderedList: List = {
        type: "list",
        ordered: true,
        start: 1,
        spread: true,
        children: listItems,
      };

      replacements.push({ parent, index, nodes: [orderedList] });
    });

    // Apply in reverse order so earlier indices remain valid
    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
