'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { TocItem } from '@/components/unified-sidenav/types';
import { tocData } from '@/context/toc-data';
import type { ActiveVersions, AvailableVersions } from './version-context';
import { useVersionContext } from './version-context';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

export const legacyTocProjects = ['realm', 'atlas-app-services', 'meta'];

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

// Module-level cache to persist legacy TOC across remounts
const legacyTocCache: Record<string, TocItem[]> = {};

const loadLegacyToc = async (project: string, version: string) => {
  const cacheKey = `${project}-${version}`;

  if (legacyTocCache[cacheKey]) {
    return legacyTocCache[cacheKey];
  }

  try {
    const moduleImport = await import(`@/context/table-of-contents/legacy-docs/${project}-${version}`);
    legacyTocCache[cacheKey] = moduleImport.toc;
    return moduleImport.toc;
  } catch (error) {
    console.error('Error loading legacy TOC:', error);
    return null;
  }
};

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
  const { project, eol } = useSnootyMetadata();
  const useLegacyTocStructure = !isOfflineBuild && (eol || legacyTocProjects.includes(project));

  const cacheKey = project ? `${project}-${activeVersions[project]}` : '';
  const [legacyToc, setLegacyToc] = useState<TocItem[] | null>(() => legacyTocCache[cacheKey] || null);

  useEffect(() => {
    if (project && useLegacyTocStructure) {
      loadLegacyToc(project, activeVersions[project]).then(setLegacyToc);
    }
  }, [eol, project, activeVersions]);

  // For EOL pages use legacyToc (may be null while loading), otherwise use tocData
  const tree = useLegacyTocStructure ? legacyToc : tocData;

  const processedTree = useMemo(() => {
    if (!tree) return [];
    return updateURLs({
      tree,
      activeVersions,
      versionsData: availableVersions,
    });
  }, [tree, activeVersions, availableVersions]);

  if (useLegacyTocStructure && !legacyToc) {
    return null;
  }

  return (
    <UnifiedTocContext.Provider value={{ tocTree: tree!, processedUnifiedToc: processedTree }}>
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
