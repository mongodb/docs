import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
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
 *
 * Optional filtering: when `tabFilter` is provided, only tabs whose `tabid`
 * matches an entry in the filter are emitted; all other tabs are dropped.
 * Matching is case-insensitive and operates on the stable `tabid` attribute
 * only (never the display `name`). When `tabFilter` is omitted or empty,
 * every tab is emitted, preserving the prior behavior exactly.
 */
interface TransformTabsOptions {
  /** Stable `tabid` values to keep. Omit or leave empty to keep all tabs. */
  tabFilters?: string[];
}

export function transformTabs(
  options: TransformTabsOptions = {}
): Plugin<[], Root> {
  const filters = (options.tabFilters ?? [])
    .map((id) => id.trim().toLowerCase())
    .filter((id) => id.length > 0);
  const hasFilter = filters.length > 0;
  const allowed = new Set(filters);

  return () => (tree: Root) => {
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

      // When a filter is active, keep only tabs whose tabid matches.
      // Tabs without a tabid (or with an empty tabid) are not addressable
      // and are dropped while filtering.
      if (hasFilter) {
        const tabidAttr = node.attributes?.find(
          (a: any) => a.name === "tabid"
        );
        const tabid =
          typeof tabidAttr?.value === "string"
            ? tabidAttr.value.trim().toLowerCase()
            : "";
        if (!tabid || !allowed.has(tabid)) {
          replacements.push({ parent, index, nodes: [] });
          return;
        }
      }

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
