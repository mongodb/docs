import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import type { ActiveVersions, AvailableVersions } from '@/context/version-context';

/**
 * The name of the active version of a content site, or null if it cannot be
 * identified.
 *
 */
const getActiveVersionName = (
  contentSite: string | undefined,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): string | null => {
  if (!contentSite) return null;

  const active = activeVersions[contentSite];
  const version = (availableVersions[contentSite] || []).find((v) => v.versionName === active);

  return version?.versionName ?? null;
};

/**
 * Whether a TOC item's `versions` constraint permits the active version.
 *
 * Fails open: an item is kept when it has no constraint, or when the active
 * version cannot be identified. Keeping an item we cannot classify preserves
 * existing behavior; dropping it would remove real navigation.
 */
export const isTocItemAllowedForVersion = (
  item: Pick<TocItem, 'versions' | 'contentSite'>,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): boolean => {
  if (!item.versions) return true;

  const activeVersionName = getActiveVersionName(item.contentSite, activeVersions, availableVersions);
  if (!activeVersionName) return true;

  const { includes, excludes } = item.versions;
  if (excludes?.includes(activeVersionName)) return false;
  if (includes) return includes.includes(activeVersionName);

  return true;
};
