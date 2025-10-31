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
import { useRouter } from 'next/navigation';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { getLocalValue, setLocalValue } from '@/utils/browser-storage';
import type { Environments } from '@/utils/env-config';
import type { BranchData, Docset, Group } from '@/types/data';
import { getUrl } from '@/utils/url-utils';

type ActiveVersions = Record<string, string>;
type AvailableVersions = Record<string, BranchData[]>;
type AvailableGroups = Record<string, Group[]>;

// <-------------- begin helper functions -------------->
const STORAGE_KEY = 'activeVersions';
const LEGACY_GIT_BRANCH = 'legacy';

const getInitBranchName = (branches: BranchData[]) => {
  // Find 'current' branch as first option
  const currentBranch = branches.find(
    (b) => b.urlSlug === 'current' || b.gitBranchName === 'current' || b.urlAliases?.includes('current'),
  );
  if (currentBranch) {
    return currentBranch.gitBranchName;
  }
  const activeBranch = branches.find((b) => b.active);
  if (activeBranch) {
    return activeBranch.gitBranchName;
  }
  return branches[0]?.gitBranchName || null;
};

const findBranchByGit = (gitBranchName: string, branches?: BranchData[]) => {
  if (!branches || !branches.length) {
    return;
  }
  return branches.find(
    (b) => b.urlSlug === gitBranchName || b.gitBranchName === gitBranchName || b?.urlAliases?.includes(gitBranchName),
  );
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
const getBranches = (docsets: Docset[]) => {
  const versions = getDefaultVersionsUnified(docsets);
  const groups = getDefaultGroupsUnified(docsets);
  return { versions, groups };
};

const getDefaultVersionsUnified = (docsets: Docset[]) => {
  const versions: { [k: string]: Docset['branches'] } = {};

  for (const docset of docsets) {
    // Skips non-versioned sites
    if (!docset.branches || docset.branches.length <= 1) {
      continue;
    }
    versions[docset.project] = docset.branches.filter((version: { active: boolean }) => version.active === true);
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
// <-------------- end helper functions -------------->

type VersionContextType = {
  siteBasePrefix: string;
  activeVersions: ActiveVersions;
  // active version for each product is marked is {[product name]: active version} pair
  setActiveVersions: Dispatch<Partial<ActiveVersions>>;
  availableVersions: AvailableVersions;
  availableGroups: AvailableGroups;
  onVersionSelect: (targetProject: string, gitBranchName: string) => void;
};

const VersionContext = createContext<VersionContextType>({
  siteBasePrefix: '',
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
  const router = useRouter();
  const mountRef = useRef(true);

  const { versions, groups } = getBranches(docsets);
  const { project, branch } = useSnootyMetadata();

  const { metadata, siteBasePrefix } = useMemo(() => {
    const repoBranches = docsets.find((docset) => docset.project === project);
    return {
      metadata: { project, branch },
      siteBasePrefix: repoBranches?.prefix?.[getRepoBranchesPrefixEnv(env)] ?? '',
    };
  }, [project, branch, docsets, env]);

  // TODO: Might need to update this once we use this branch on a stitched project (DOP-5243 dependent)
  // TODO check whats going on here for 404 pages
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

  // handler for selecting version on multiple dropdowns
  const onVersionSelect = useCallback(
    (targetProject: string, gitBranchName: string) => {
      const updatedVersion: Record<string, string> = {};
      updatedVersion[targetProject] = gitBranchName;
      setActiveVersions(updatedVersion);

      // navigate to new URL only if from same project
      if (targetProject !== metadata.project) {
        return;
      }

      const targetBranch = findBranchByGit(gitBranchName, versions[metadata.project]);
      if (!targetBranch && gitBranchName !== LEGACY_GIT_BRANCH) {
        console.error(`target branch not found for git branch <${gitBranchName}>`);
        return;
      }
      const target =
        gitBranchName === LEGACY_GIT_BRANCH
          ? gitBranchName
          : targetBranch?.urlSlug || targetBranch?.urlAliases?.[0] || targetBranch?.gitBranchName;

      const urlTarget = getUrl(target, metadata.project, siteBasePrefix, slug);

      router.push(urlTarget);
    },
    [versions, metadata, siteBasePrefix, slug],
  );

  return (
    <VersionContext.Provider
      value={{
        siteBasePrefix,
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

const getRepoBranchesPrefixEnv = (env: Environments) => {
  switch (env) {
    case 'dotcomprd':
      return 'dotcomprd';
    case 'production':
      return 'prd';
    case 'dev':
    case 'dotcomstg':
    default:
      return 'dotcomstg';
  }
};
