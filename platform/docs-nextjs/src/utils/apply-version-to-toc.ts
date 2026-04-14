import type { TocItem } from '@/components/unified-sidenav/types';

function shouldIncludeByVersion(item: TocItem, version: string): boolean {
  if (!item.versions) return true;
  if (item.versions.includes) return item.versions.includes.includes(version);
  if (item.versions.excludes) return !item.versions.excludes.includes(version);
  return true;
}

/**
 * Recursively processes TOC items for a specific version.
 *
 * - Removes items that are version-gated and don't match the target version
 *   (via `versions.includes` / `versions.excludes` on the item).
 * - Replaces all `:version` placeholders in URLs with the target version string.
 * - Drops groups and collapsible sections that become empty after filtering.
 *
 * Version inheritance is implicit: if a parent is excluded, its children are never visited.
 */
export function applyVersionToToc(items: TocItem[], version: string): TocItem[] {
  const result: TocItem[] = [];
  for (const item of items) {
    if (!shouldIncludeByVersion(item, version)) continue;
    const { url, ...rest } = item;
    const newItem: TocItem = {
      ...rest,
      ...(url && { url: url.replace(/:version/g, version) }),
    };
    if (item.items?.length) {
      const filteredChildren = applyVersionToToc(item.items, version);
      if (filteredChildren.length > 0) {
        newItem.items = filteredChildren;
      } else if (item.group || item.collapsible) {
        continue;
      }
    }
    result.push(newItem);
  }
  return result;
}
