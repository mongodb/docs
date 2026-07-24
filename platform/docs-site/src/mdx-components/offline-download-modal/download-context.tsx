'use client';

import { createContext, useMemo, useContext, useState } from 'react';
import { DownloadModal } from './download-modal';
import { tocData } from '@/context/toc-data/data.copied';
import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import { useVersionContext, getDefaultVersionIndex } from '@/context/version-context';
import type { AvailableVersions } from '@/context/version-context';
import type { Environments } from '@/utils/env-config';

export type OfflineVersion = {
  displayName: string;
  url: string;
};

// An OfflineVersion plus the identity fields needed to determine the default ("current") version.
// Assembled internally, then stripped down to OfflineVersion before being stored on an OfflineObject.
type VersionEntry = OfflineVersion & {
  urlSlug: string;
  gitBranchName: string;
  urlAliases?: string[] | null;
};

export type OfflineObject = {
  displayName: string;
  subTitle?: string;
  versions: OfflineVersion[];
  // Index into `versions` for the initially selected download; prefers the "current"
  // branch via getDefaultVersionIndex, otherwise 0.
  versionIndex: number;
  l1?: boolean;
  subNav?: boolean;
};

const defaultValues: {
  offlineObjects: OfflineObject[];
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
} = {
  offlineObjects: [],
  modalOpen: false,
  setModalOpen: () => {},
};

const env = process.env.NEXT_PUBLIC_ENV as Environments;

const OFFLINE_BASE_URL =
  env === 'dotcomstg'
    ? 'https://mongodbcom-cdn.staging.corp.mongodb.com/docs/offline'
    : 'https://www.mongodb.com/docs/offline';

// Creates the offline download URL for a given contentSite Format: base-url/<toc-filen-name>-<version>.tar.gz
function createOfflineUrl(label: string, version: string = 'main', isVersionedproject: string | null = null): string {
  const sanitizedLabel = label.replace(/ /g, '-').toLowerCase();
  if (isVersionedproject) {
    return `${OFFLINE_BASE_URL}/${sanitizedLabel}.versioned.${isVersionedproject}-${version}.tar.gz`;
  }
  return `${OFFLINE_BASE_URL}/${sanitizedLabel}-${version}.tar.gz`;
}

// Collect versions from versioned groups within an L1's children (skips subNav items).
function collectVersionsFromGroups(
  items: TocItem[] | undefined,
  availableVersions: AvailableVersions,
  parentLabel: string,
): VersionEntry[] {
  const versionEntries: VersionEntry[] = [];
  if (!items) return versionEntries;

  for (const item of items) {
    if (item.showSubNav) continue;

    // If this is a versioned group, add its versions
    if (item.group && item.contentSite && item.versionDropdown) {
      const availVersions = availableVersions[item.contentSite];
      if (availVersions) {
        for (const version of availVersions) {
          versionEntries.push({
            displayName: version.versionSelectorLabel,
            url: createOfflineUrl(parentLabel, version.urlSlug, item.contentSite),
            urlSlug: version.urlSlug,
            gitBranchName: version.gitBranchName,
            urlAliases: version.urlAliases,
          });
        }
      }
    }
    versionEntries.push(...collectVersionsFromGroups(item.items, availableVersions, parentLabel));
  }

  return versionEntries;
}

// Find and process items with showSubNav: true
function findShowSubNavItems(
  items: TocItem[] | undefined,
  availableVersions: AvailableVersions,
  offlineObjects: OfflineObject[],
): void {
  if (!items) return;

  for (const item of items) {
    // If this item has showSubNav: true and a contentSite, create an entry
    if (item.showSubNav && item.contentSite) {
      const versionEntries: VersionEntry[] = [];

      // Check if the first child has versionDropdown: true (versioned group pattern)
      const firstChild = item.items?.[0];
      if (firstChild?.versionDropdown && firstChild.contentSite) {
        const availVersions = availableVersions[firstChild.contentSite];
        if (availVersions) {
          for (const version of availVersions) {
            versionEntries.push({
              displayName: version.versionSelectorLabel,
              url: createOfflineUrl(item.label, version.urlSlug, item.contentSite),
              urlSlug: version.urlSlug,
              gitBranchName: version.gitBranchName,
              urlAliases: version.urlAliases,
            });
          }
        }
      } else {
        // Non-versioned, default to 'main'
        versionEntries.push({
          displayName: 'main',
          url: createOfflineUrl(item.label),
          urlSlug: 'main',
          gitBranchName: 'main',
        });
      }

      offlineObjects.push({
        displayName: item.label,
        versions: versionEntries.map(({ displayName, url }) => ({ displayName, url })),
        subNav: true,
        versionIndex: getDefaultVersionIndex(versionEntries),
      });
    } else {
      // Only recurse if this item doesn't have showSubNav
      findShowSubNavItems(item.items, availableVersions, offlineObjects);
    }
  }
}

/**
 * Transforms the unified TOC tree into an array of Offline objects
 *
 * Rules:
 * 1. Each L1 (top-level) item gets its own node in the offlineObjects array
 * 2. Groups are ignored, except: if a group inside an L1 is versioned, its versions are added to the L1 entry
 * 3. Items with 'showSubNav: true' get their own nodes with
 * 4. Each option will have the associated versions available for download (non versioned defaults to 'main')
 */
function transformTocToOfflineObjects(tocTree: TocItem[], availableVersions: AvailableVersions): OfflineObject[] {
  const offlineObjects: OfflineObject[] = [];

  // Process each L1 item
  for (const l1Item of tocTree) {
    if (!l1Item.contentSite) continue;

    const versionEntries: VersionEntry[] = [];

    if (l1Item.versionDropdown) {
      const availVersions = availableVersions[l1Item.contentSite];
      if (availVersions) {
        for (const version of availVersions) {
          versionEntries.push({
            displayName: version.versionSelectorLabel,
            url: createOfflineUrl(l1Item.label, version.urlSlug, l1Item.contentSite),
            urlSlug: version.urlSlug,
            gitBranchName: version.gitBranchName,
            urlAliases: version.urlAliases,
          });
        }
      }
    }

    // Collect versions from any versioned groups inside this L1
    versionEntries.push(...collectVersionsFromGroups(l1Item.items, availableVersions, l1Item.label));

    if (versionEntries.length === 0) {
      versionEntries.push({
        displayName: 'main',
        url: createOfflineUrl(l1Item.label),
        urlSlug: 'main',
        gitBranchName: 'main',
      });
    }

    offlineObjects.push({
      displayName: l1Item.label,
      versions: versionEntries.map(({ displayName, url }) => ({ displayName, url })),
      l1: true,
      versionIndex: getDefaultVersionIndex(versionEntries),
      ...(l1Item.subTitle && { subTitle: l1Item.subTitle }),
    });

    // Find and add showSubNav items within this L1
    findShowSubNavItems(l1Item.items, availableVersions, offlineObjects);
  }

  return offlineObjects;
}

const OfflineDownloadContext = createContext(defaultValues);

type ProviderProps = {
  children: React.ReactNode;
};

const OfflineDownloadProvider = ({ children }: ProviderProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { availableVersions } = useVersionContext();

  // Always use the real (non-legacy, non-offline) TOC tree for the download modal.
  const tocTree = tocData as unknown as TocItem[];

  const offlineObjects = useMemo(() => {
    if (!tocTree || tocTree.length === 0) {
      return [];
    }
    return transformTocToOfflineObjects(tocTree, availableVersions);
  }, [tocTree]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <OfflineDownloadContext.Provider value={{ modalOpen, setModalOpen, offlineObjects }}>
      {children}
      {<DownloadModal open={modalOpen} setOpen={setModalOpen} />}
    </OfflineDownloadContext.Provider>
  );
};

const useOfflineDownloadContext = () => {
  return useContext(OfflineDownloadContext);
};

export { OfflineDownloadProvider, useOfflineDownloadContext };
