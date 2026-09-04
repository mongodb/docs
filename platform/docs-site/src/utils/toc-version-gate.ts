import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import type { ActiveVersions, AvailableVersions } from '@/context/version-context';

/**
 * Every name the active version of a content site can be known by.
 *
 * `activeVersions` holds git branch names, while TOC `versions` gates are
 * written in urlSlug space -- `version-arrays/versions.ts` rewrites named
 * versions, so v8.3 appears in gates as 'manual'. Gates may also name a
 * urlAlias. Comparing against every alias avoids silently missing a gate
 * because it happens to use a different name for the same version.
 */
const versionNames = (
  contentSite: string | undefined,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): Set<string> | null => {
  if (!contentSite) return null;

  const active = activeVersions[contentSite];
  const branch = (availableVersions[contentSite] || []).find(
    (version) =>
      version.gitBranchName === active || version.urlSlug === active || version?.urlAliases?.includes(active),
  );
  if (!branch) return null;

  return new Set([branch.urlSlug, branch.gitBranchName, ...(branch.urlAliases ?? [])].filter(Boolean));
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

  const names = versionNames(item.contentSite, activeVersions, availableVersions);
  if (!names) return true;

  const { includes, excludes } = item.versions;
  if (excludes?.some((version) => names.has(version))) return false;
  if (includes) return includes.some((version) => names.has(version));

  return true;
};
