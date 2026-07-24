import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";
import { isTabsElement, isTabElement, getJsxAttr } from "../utils/mdx-jsx.js";

export interface TabInfoGroup {
  name: string;
  ids: string[];
}
export interface TabInfoSink {
  groups: TabInfoGroup[];
}

/**
 * Collect available tab ids grouped by tabset (document order, deduped) into
 * `sink`. Must run BEFORE transformTabs, which prunes/rewrites <Tab> nodes.
 * Tabsets with no `tabset` name group under the generic label "other tabs".
 * Tabs without a tabid are skipped
 * (they are not addressable via ?tabs=).
 */
export function collectTabInfo(sink: TabInfoSink): Plugin<[], Root> {
  return () => (tree: Root) => {
    const indexByName = new Map<string, number>();
    visit(tree, (node) => {
      if (!isTabsElement(node)) return;
      const name = getJsxAttr(node, "tabset") || "other tabs";
      const ids = (node.children ?? [])
        .filter(isTabElement)
        .map((t) => getJsxAttr(t, "tabid"))
        .filter((id): id is string => typeof id === "string" && id.length > 0);
      if (ids.length === 0) return;
      let groupIndex = indexByName.get(name);
      if (groupIndex === undefined) {
        groupIndex = sink.groups.length;
        indexByName.set(name, groupIndex);
        sink.groups.push({ name, ids: [] });
      }
      for (const id of ids) {
        if (!sink.groups[groupIndex].ids.includes(id)) sink.groups[groupIndex].ids.push(id);
      }
    });
  };
}
