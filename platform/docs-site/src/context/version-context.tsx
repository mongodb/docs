import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useContext,
  useRef,
  useMemo,
  type ReactNode,
  type Dispatch,
} from 'react';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { getLocalValue, setLocalValue } from '@/utils/browser-storage';
import type { Environments } from '@/utils/env-config';
import type { Version, Docset, Group } from '@/types/data';
import { getUrl } from '@/utils/url-utils';
import { assertTrailingSlash } from '@/utils/assert-trailing-slash';

export type ActiveVersions = Record<string, string>;
export type AvailableVersions = Record<string, Version[]>;
type AvailableGroups = Record<string, Group[]>;

const STORAGE_KEY = 'activeVersions.v2';
const LEGACY_VERSION = 'legacy';

type VersionIdentifier = Pick<Version, 'versionName' | 'stable'>;

const isCurrentVersion = (version: VersionIdentifier) =>
  version.versionName === 'current' || version.versionName === 'manual';

const getInitVersionName = (versions: Version[]) => {
  // Find 'current' version as first option
  const currentVersion = versions.find(isCurrentVersion);
  if (currentVersion) {
    return currentVersion.versionName;
  }
  const activeVersion = versions.find((v) => v.active);
  if (activeVersion) {
    return activeVersion.versionName;
  }
  return versions[0]?.versionName || null;
};

// Finds the index of the 'current' version; falls back to the first version in the list if not found
export const getDefaultVersionIndex = (versions: VersionIdentifier[]) => {
  const currentIndex = versions.findIndex(isCurrentVersion);
  return currentIndex >= 0 ? currentIndex : 0;
};

const getInitVersions = (versionsByProject: AvailableVersions) => {
  const initState: Record<string, string> = {};
  const localStorage = getLocalValue(STORAGE_KEY);
  for (const productName in versionsByProject) {
    initState[productName] = localStorage?.[productName] || getInitVersionName(versionsByProject[productName]);
  }
  return initState;
};

const findVersionByName = (versionName: string, versions?: Version[]) => {
  if (!versions || !versions.length) {
    return;
  }
  return versions.find((v) => v.versionName === versionName);
};

// version state reducer helper fn
// overwrite current state with any new state attributes
const versionStateReducer = (state: ActiveVersions, newState: Partial<ActiveVersions>) => {
  // Cleans any undefined values - type safety
  const cleaned = Object.fromEntries(
    Object.entries(newState).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  );

  return {
    ...state,
    ...cleaned,
  };
};
/**
 * get active branches for current product (from site metadata)
 *
 * @returns versions{} <product_name: branch_object[]>
 */
const getVersionsAndGroups = (docsets: Docset[]) => {
  const versions = getDefaultVersionsUnified(docsets);
  const groups = getDefaultGroupsUnified(docsets);
  return { versions, groups };
};

const getDefaultVersionsUnified = (docsets: Docset[]) => {
  const versions: { [k: string]: Docset['versions'] } = {};

  for (const docset of docsets) {
    // Skips non-versioned sites
    if (docset.versions.length <= 1) {
      continue;
    }
    versions[docset.project] = docset.versions.filter((version) => version.active);
  }

  return versions;
};

const getDefaultGroupsUnified = (docsets: Docset[]) => {
  const groups: AvailableGroups = {};

  for (const docset of docsets) {
    groups[docset.project] = docset?.groups || [];
  }

  return groups;
};

interface ActiveVersionState {
  project: string;
  branch: string;
}

const getDefaultActiveVersions = ({ project, branch }: ActiveVersionState) => {
  // for current metadata.project, should always default to metadata.branch
  return { [project]: branch };
};

const buildSiteBasePrefix = (pathPrefix: string | undefined, branch: string): string => {
  if (!pathPrefix) {
    return '';
  }
  if (branch === 'main' || branch === 'master') {
    return pathPrefix;
  }

  return `${assertTrailingSlash(pathPrefix)}${branch}`;
};
// <-------------- end helper functions -------------->

type VersionContextType = {
  siteBasePrefix: string;
  siteBasePrefixWithVersion: string;
  docsets: Docset[];
  activeVersions: ActiveVersions;
  // active version for each product is marked is {[product name]: active version} pair
  setActiveVersions: Dispatch<Partial<ActiveVersions>>;
  availableVersions: AvailableVersions;
  availableGroups: AvailableGroups;
  onVersionSelect: (targetProject: string, versionName: string) => void;
};

const VersionContext = createContext<VersionContextType>({
  siteBasePrefix: '',
  siteBasePrefixWithVersion: '',
  docsets: [],
  activeVersions: {},
  // active version for each product is marked is {[product name]: active version} pair
  setActiveVersions: () => {},
  availableVersions: {},
  availableGroups: {},
  onVersionSelect: () => {},
});

export const useVersionContext = () => {
  const context = useContext(VersionContext);

  if (!context) throw new Error('useVersionContext must be used within a VersionContextProvider');

  return context;
};

interface VersionContextProviderProps {
  children: ReactNode;
  slug: string;
  docsets: Docset[];
  env: Environments;
}

export const VersionContextProvider = ({ docsets, slug, env, children }: VersionContextProviderProps) => {
  const mountRef = useRef(true);

  const { versions, groups } = getVersionsAndGroups(docsets);
  const { project, branch } = useSnootyMetadata();

  const { metadata, siteBasePrefix, siteBasePrefixWithVersion } = useMemo(() => {
    const docset = docsets.find((docset) => docset.project === project);
    const siteBasePrefix = docset?.prefix ?? '';

    const siteBasePrefixWithVersion = buildSiteBasePrefix(siteBasePrefix, branch);

    return {
      metadata: { project, branch },
      siteBasePrefix,
      siteBasePrefixWithVersion,
    };
  }, [project, branch, docsets, env]);

  // tracks active versions across app
  const [activeVersions, setActiveVersions] = useReducer<
    React.Reducer<ActiveVersions, Partial<ActiveVersions>>,
    ActiveVersionState
  >(versionStateReducer, metadata, getDefaultActiveVersions);
  // update local storage when active versions change
  useEffect(() => {
    const existing = getLocalValue(STORAGE_KEY);
    setLocalValue(STORAGE_KEY, { ...existing, ...activeVersions });
    return () => {
      mountRef.current = false;
    };
  }, [activeVersions]);

  useEffect(() => {
    setActiveVersions(getInitVersions(versions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handler for selecting version on multiple dropdowns
  const onVersionSelect = useCallback(
    (targetProject: string, versionName: string) => {
      const updatedVersion: Record<string, string> = {};
      updatedVersion[targetProject] = versionName;
      setActiveVersions(updatedVersion);

      // navigate to new URL only if from same project
      if (targetProject !== metadata.project) {
        return;
      }

      const targetVersion = findVersionByName(versionName, versions[metadata.project]);
      if (!targetVersion && versionName !== LEGACY_VERSION) {
        console.error(`target version not found for <${versionName}>`);
        return;
      }
      const target = versionName === LEGACY_VERSION ? versionName : targetVersion?.versionName;

      const pagePath = slug.replace(new RegExp(`^/?${siteBasePrefixWithVersion}/?`), '');

      const urlTarget = getUrl(target, metadata.project, siteBasePrefix, pagePath);
      // urlTarget is a full `/docs/...` path (possibly a different version/deploy).
      // Use window.location so this deploy's basePath is not prepended and b2k
      // routes to the correct deploy.
      window.location.assign(urlTarget.replace(/\/index\/?$/, '/'));
    },
    [versions, metadata, siteBasePrefix, slug], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <VersionContext.Provider
      value={{
        siteBasePrefix,
        siteBasePrefixWithVersion,
        docsets,
        activeVersions,
        setActiveVersions,
        availableVersions: versions,
        availableGroups: groups,
        onVersionSelect,
      }}
    >
      {children}
    </VersionContext.Provider>
  );
};
