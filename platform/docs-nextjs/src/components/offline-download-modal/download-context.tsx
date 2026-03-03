'use client';

import { createContext, useMemo, useContext, useState } from 'react';
import DownloadModal from './download-modal';
import { useUnifiedToc } from '@/context/unified-toc-context';
import type { TocItem } from '@/components/unified-sidenav/types';
import { useVersionContext } from '@/context/version-context';
import type { AvailableVersions } from '@/context/version-context';

export type OfflineVersion = {
  displayName: string;
  url: string;
};

export type OfflineObject = {
  displayName: string;
  subTitle?: string;
  versions: OfflineVersion[];
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

const OFFLINE_BASE_URL = 'https://www.mongodb.com/docs/offline';

// Creates the offline download URL for a given contentSite Format: https://www.mongodb.com/docs/offline/<toc-label>-<version>.tar.gz
function createOfflineUrl(label: string, version: string = 'main'): string {
  const sanitizedLabel = label.replace(/ /g, '-').toLowerCase();
  return `${OFFLINE_BASE_URL}/${sanitizedLabel}-${version}.tar.gz`;
}

// Collect versions from versioned groups within an L1's children (skips subNav items)
function collectVersionsFromGroups(
  items: TocItem[] | undefined,
  availableVersions: AvailableVersions,
  parentLabel: string,
): OfflineVersion[] {
  const versions: OfflineVersion[] = [];
  if (!items) return versions;

  for (const item of items) {
    if (item.showSubNav) continue;

    // If this is a versioned group, add its versions
    if (item.group && item.contentSite && item.versionDropdown) {
      const availVersions = availableVersions[item.contentSite];
      if (availVersions) {
        for (const version of availVersions) {
          versions.push({
            displayName: version.versionSelectorLabel,
            url: createOfflineUrl(parentLabel, version.urlSlug),
          });
        }
      }
    }
    versions.push(...collectVersionsFromGroups(item.items, availableVersions, parentLabel));
  }

  return versions;
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
      const versionsList: OfflineVersion[] = [];

      // Check if the first child has versionDropdown: true (versioned group pattern)
      const firstChild = item.items?.[0];
      if (firstChild?.versionDropdown && firstChild.contentSite) {
        const availVersions = availableVersions[firstChild.contentSite];
        if (availVersions) {
          for (const version of availVersions) {
            versionsList.push({
              displayName: version.versionSelectorLabel,
              url: createOfflineUrl(item.label, version.urlSlug),
            });
          }
        }
      } else {
        // Non-versioned, default to 'main'
        versionsList.push({
          displayName: 'main',
          url: createOfflineUrl(item.label),
        });
      }

      offlineObjects.push({
        displayName: item.label,
        versions: versionsList,
        subNav: true,
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

    const l1Versions: OfflineVersion[] = [];

    if (l1Item.versionDropdown) {
      const availVersions = availableVersions[l1Item.contentSite];
      if (availVersions) {
        for (const version of availVersions) {
          l1Versions.push({
            displayName: version.versionSelectorLabel,
            url: createOfflineUrl(l1Item.label, version.urlSlug),
          });
        }
      }
    }

    // Collect versions from any versioned groups inside this L1
    const groupVersions = collectVersionsFromGroups(l1Item.items, availableVersions, l1Item.label);
    l1Versions.push(...groupVersions);

    if (l1Versions.length === 0) {
      l1Versions.push({
        displayName: 'main',
        url: createOfflineUrl(l1Item.label),
      });
    }

    offlineObjects.push({
      displayName: l1Item.label,
      versions: l1Versions,
      l1: true,
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
  const { tocTree } = useUnifiedToc();
  const { availableVersions } = useVersionContext();

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
