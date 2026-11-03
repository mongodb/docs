import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import { isCurrentPage } from '@/utils/is-current-page';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

// Key is the index path from the root array passed in: '0-2-1' is items[0].items[2].items[1].
// Not label + url (see tocItemKey), since labels repeat and URL-less groups collide. Index the
// unfiltered items array so version-gated siblings don't shift keys.
export const tocTreeKey = (index: number, parentKey?: string): string =>
  parentKey === undefined ? String(index) : `${parentKey}-${index}`;

export const getExpandedTocKeys = (
  items: TocItem[],
  slug: string,
  { offline = isOfflineBuild }: { offline?: boolean } = {},
): Set<string> => {
  const expanded = new Set<string>();

  const visit = (nodes: TocItem[], parentKey?: string): boolean => {
    let containsActive = false;
    nodes.forEach((node, index) => {
      const key = tocTreeKey(index, parentKey);
      const children = node.items ?? [];
      const isActive = !!node.newUrl && isCurrentPage(slug, node.newUrl.replace(/#.*/, ''));
      const hasActiveDescendant = children.length > 0 && visit(children, key);
      const isAlwaysOpen = node.group && !node.collapsible;
      if (children.length > 0 && (offline || isActive || hasActiveDescendant || isAlwaysOpen)) {
        expanded.add(key);
      }
      containsActive ||= isActive || hasActiveDescendant;
    });
    return containsActive;
  };

  visit(items);
  return expanded;
};
