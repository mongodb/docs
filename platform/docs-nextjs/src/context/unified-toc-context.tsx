'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { TocItem } from '@/components/unified-sidenav/types';
import { tocData } from '@/context/toc-data';
import type { ActiveVersions, AvailableVersions } from './version-context';
import { useVersionContext } from './version-context';

interface UnfiedTocContextType {
  tocTree: TocItem[];
  processedUnifiedToc: TocItem[];
}

const UnifiedTocContext = createContext<UnfiedTocContextType | undefined>(undefined);

interface UpdateURLsParams {
  tree?: TocItem[];
  contentSite?: string;
  activeVersions: ActiveVersions;
  versionsData: AvailableVersions;
}

// Replace version variable in URL with current version
const updateURLs = ({ tree, contentSite, activeVersions, versionsData }: UpdateURLsParams): TocItem[] => {
  return (
    tree?.map((item) => {
      let newUrl = item.url ?? '';
      const currentProject = item.contentSite ?? contentSite;

      // Replace version variable with the true current version
      if (item.url?.includes(':version') && currentProject) {
        const version = (versionsData[currentProject] || []).find(
          (version) =>
            version.gitBranchName === activeVersions[currentProject] ||
            version.urlSlug === activeVersions[currentProject] ||
            version?.urlAliases?.includes(activeVersions[currentProject]),
        );
        // If no version found in local storage use 'current'
        const currentVersion = version?.urlSlug ?? 'current';
        newUrl = item.url.replace(/:version/g, currentVersion);
      }

      const items = updateURLs({
        tree: item.items,
        contentSite: currentProject,
        activeVersions,
        versionsData,
      });

      return {
        ...item,
        newUrl,
        items,
        contentSite: currentProject,
      } as TocItem;
    }) ?? []
  );
};

export const UnifiedTocProvider = ({ children }: { children: ReactNode }) => {
  const { activeVersions, availableVersions } = useVersionContext();

  const processedTree = useMemo(() => {
    return updateURLs({
      tree: tocData,
      activeVersions,
      versionsData: availableVersions,
    });
  }, [activeVersions, availableVersions]);

  return (
    <UnifiedTocContext.Provider value={{ tocTree: tocData, processedUnifiedToc: processedTree }}>
      {children}
    </UnifiedTocContext.Provider>
  );
};

export const useUnifiedToc = () => {
  const context = useContext(UnifiedTocContext);
  if (context === undefined) {
    throw new Error('useUnifiedToc must be used within a UnifiedTocProvider');
  }
  return context;
};
