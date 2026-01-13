'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { cx, css as LeafyCSS } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Option, OptionGroup, Select } from '@leafygreen-ui/select';
import { theme } from '@/styles/theme';
import type { BranchData, Group } from '@/types/data';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { useVersionContext } from '@/context/version-context';

export const selectStyling = LeafyCSS`
  margin: ${theme.size.small} ${theme.size.medium} ${theme.size.small} ${theme.size.medium};

  ${'' /* Render version dropdown text in front of the Sidebar text */}
  button {
    z-index: 2;
    background-color: var(--select-button-bg-color);
    color: var(--select-button-color);

    div:last-child svg {
      color: var(--select-button-carot);
    }

    .dark-theme &:hover {
      background-color: var(--gray-dark4);
      color: var(--gray-light3);
      border-color: var(--gray-base);
      box-shadow: var(--gray-dark2) 0px 0px 0px 3px;
    }
  }

  /* Override LG mobile style of enlarged mobile font */
  @media ${theme.screenSize.upToLarge} {
    div,
    span {
      font-size: ${theme.fontSize.small};
    }
  }
`;

// Gets UI labels for supplied active branch names
export const getUILabel = (branch: BranchData) => {
  if (!branch['active']) {
    console.warn(
      `Retrieving branch UI label for legacy/EOL'd/inactive branch: ${branch['gitBranchName']}. This should probably not be happening.`,
    );
  }
  return branch['versionSelectorLabel'] || createVersionLabel(branch['urlSlug'], branch['gitBranchName']);
};

// If a UI label is not specified for raw versions (e.g. v1.0), create one
// Example: [1.0 or v1.0 or android-v1.0] -> Version 1.0
const createVersionLabel = (urlSlug = '', gitBranchName = '') => {
  if (!urlSlug && !gitBranchName) {
    console.warn('Unable to create version label - neither gitBranchName nor urlSlug defined');
    return 'Version Name Unknown';
  }

  const label = urlSlug || gitBranchName;
  // If the label is numeric (e.g. "2.0" or "v2.0"), we display "Version 2.0"
  if (!isNaN(Number(label))) {
    return `Version ${label}`;
  } else if (label.startsWith('v') && !isNaN(Number(label.slice(1)))) {
    return `Version ${label.slice(1)}`;
  }

  return label;
};

// Returns all branches that are neither in 'groups' nor inactive
const getActiveUngroupedBranches = (branches: BranchData[] = [], groups: Group[] = []) => {
  const groupedBranchNames = groups.map((g) => g['includedBranches']).flat() || [];
  return branches.filter((b) => !groupedBranchNames.includes(b['gitBranchName']) && !!b['active']);
};

// Return a branch object from branches that matches supplied branchName
// Typically used to associate a branchName from 'groups' with a branchName in 'branches'
const getBranch = (branchName = '', branches: BranchData[] = []) => {
  const branchCandidates = branches.filter((b) => b['gitBranchName'] === branchName);

  if (branchCandidates.length === 0) {
    console.warn(`Could not find branch in 'branches' with gitBranchName: ${branchName}. Check 'groups'.`);
    return null;
  }

  if (branchCandidates.length > 1) {
    console.warn(`Too many branches with name ${branchName}.`);
    return null;
  }

  return branchCandidates?.[0] || null;
};

const createOption = (branch: BranchData) => {
  const UIlabel = getUILabel(branch);
  const slug = branch['urlSlug'] || branch['gitBranchName'];
  return (
    <Option key={slug} value={branch.urlSlug}>
      {UIlabel}
    </Option>
  );
};

type VersionDropdownProps = {
  contentSite?: string | null;
};

const VersionDropdown = ({ contentSite = null }: VersionDropdownProps) => {
  const router = useRouter();
  const snootyMetadata = useSnootyMetadata();
  const { availableVersions, availableGroups, docsets, onVersionSelect, activeVersions } = useVersionContext();
  const eol = snootyMetadata.eol;
  const project = contentSite ? contentSite : snootyMetadata.project;
  const branches = availableVersions[project];
  const groups = availableGroups[project];
  const docset = docsets.find((docset) => docset.project === project);
  const showEol = docset?.branches?.some((b) => !b.active) || false;

  const onSelectChange = useCallback(
    (value: string) => {
      if (value === 'legacy') {
        router.push(`/docs/legacy/?site=${project}`);
      } else {
        onVersionSelect(project, value);
      }
    },
    [onVersionSelect, project], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if ((branches?.length ?? 0) < 1) {
    console.warn('Insufficient branches supplied to VersionDropdown; expected 1 or more');
    return null;
  }

  const activeUngroupedBranches = getActiveUngroupedBranches(branches, groups) || [];

  const eolVersionFlipperStyle = LeafyCSS`
    & > button {
      background-color: ${palette.gray.light2} !important;
      color: ${palette.gray.base} !important;
    }
  `;

  // Convert gitBranchName to urlSlug for Select value prop
  // The Select component expects urlSlug (e.g., 'current') but activeVersions contains gitBranchName
  const activeVersionValue = (() => {
    const gitBranchName = activeVersions[project];
    if (!gitBranchName) return '';
    // Find the branch that matches the gitBranchName and return its urlSlug
    const branch = branches?.find((b) => b.gitBranchName === gitBranchName);
    return branch?.urlSlug || gitBranchName; // Fallback to gitBranchName if not found
  })();

  return (
    <Select
      role="button"
      allowDeselect={false}
      className={cx(selectStyling, eol ? eolVersionFlipperStyle : '')}
      aria-labelledby="View a different version of documentation."
      onChange={onSelectChange}
      placeholder={'Select a version'}
      value={activeVersionValue}
      disabled={eol}
    >
      {activeUngroupedBranches?.map((b) => createOption(b))}
      {groups?.map((group) => {
        const { groupLabel, includedBranches: groupedBranchNames = [] } = group;
        return (
          <OptionGroup key={groupLabel} label={groupLabel}>
            <>
              {groupedBranchNames?.reduce<React.ReactNode[]>((res, bn) => {
                const branch = getBranch(bn, branches);
                if (branch) {
                  res.push(createOption(branch));
                }
                return res;
              }, [])}
            </>
          </OptionGroup>
        );
      })}
      {showEol && <Option value="legacy">Legacy Docs</Option>}
    </Select>
  );
};

export default VersionDropdown;
