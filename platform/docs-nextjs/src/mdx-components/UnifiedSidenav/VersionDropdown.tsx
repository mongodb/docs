'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { cx, css as LeafyCSS } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Option, OptionGroup, Select } from '@leafygreen-ui/select';
import { theme } from '@/styles/theme';
import type { Version, Group } from '@/types/data';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { useVersionContext } from '@/context/version-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

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

const listboxStyling = LeafyCSS`
  [role='listbox'] {
    overscroll-behavior: contain;
  }
`;

// Gets UI labels for supplied active versions
export const getUILabel = (version: Version) => {
  if (!version.active) {
    console.warn(
      `Retrieving UI label for legacy/EOL'd/inactive version: ${version.versionName}. This should probably not be happening.`,
    );
  }
  return version.versionSelectorLabel || createVersionLabel(version.versionName);
};

// If a UI label is not specified for raw versions (e.g. v1.0), create one
// Example: [1.0 or v1.0 or android-v1.0] -> Version 1.0
const createVersionLabel = (versionName = '') => {
  if (!versionName) {
    console.warn('Unable to create version label - versionName is empty');
    return 'Version Name Unknown';
  }

  const label = versionName;
  // If the label is numeric (e.g. "2.0" or "v2.0"), we display "Version 2.0"
  if (!isNaN(Number(label))) {
    return `Version ${label}`;
  } else if (label.startsWith('v') && !isNaN(Number(label.slice(1)))) {
    return `Version ${label.slice(1)}`;
  }

  return label;
};

// Returns all versions that are neither in 'groups' nor inactive
const getActiveUngroupedVersions = (versions: Version[] = [], groups: Group[] = []) => {
  const groupedVersionNames = groups.flatMap((g) => g.includedVersions);
  return versions.filter((v) => !groupedVersionNames.includes(v.versionName) && v.active);
};

// Returns the version matching the supplied name.
// Typically used to associate a versionName from 'groups' with one in 'versions'
const getVersion = (versionName = '', versions: Version[] = []) => {
  const candidates = versions.filter((v) => v.versionName === versionName);

  if (candidates.length === 0) {
    console.warn(`Could not find a version named ${versionName}. Check 'groups'.`);
    return null;
  }

  if (candidates.length > 1) {
    console.warn(`Too many versions named ${versionName}.`);
    return null;
  }

  return candidates[0] ?? null;
};

const createOption = (version: Version) => {
  const UIlabel = getUILabel(version);
  return (
    <Option key={version.versionName} value={version.versionName}>
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
  const [open, setOpen] = useState(false);
  const { availableVersions, availableGroups, docsets, onVersionSelect, activeVersions } = useVersionContext();
  const eol = snootyMetadata.eol;
  const project = contentSite ? contentSite : snootyMetadata.project;
  const versions = availableVersions[project];
  const groups = availableGroups[project];
  const docset = docsets.find((docset) => docset.project === project);
  const showEol = docset?.versions.some((v) => !v.active) ?? false;

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnWindowScroll = () => {
      setOpen(false);
    };

    window.addEventListener('scroll', closeOnWindowScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', closeOnWindowScroll);
    };
  }, [open]);

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

  if (isOfflineBuild) {
    return null;
  }

  if ((versions?.length ?? 0) < 1) {
    console.warn('Insufficient versions supplied to VersionDropdown; expected 1 or more');
    return null;
  }

  const activeUngroupedVersions = getActiveUngroupedVersions(versions, groups);

  const eolVersionFlipperStyle = LeafyCSS`
    & > button {
      background-color: ${palette.gray.light2} !important;
      color: ${palette.gray.base} !important;
    }
  `;

  // Option values and activeVersions are both versionName now, so no translation
  // between a git name and a URL slug is needed.
  const activeVersionValue = activeVersions[project] ?? '';

  return (
    <Select
      role="button"
      allowDeselect={false}
      className={cx(selectStyling, listboxStyling, eol ? eolVersionFlipperStyle : '')}
      aria-labelledby="View a different version of documentation."
      onChange={onSelectChange}
      open={open}
      setOpen={setOpen}
      placeholder={'Select a version'}
      value={activeVersionValue}
      disabled={eol}
    >
      {activeUngroupedVersions.map((v) => createOption(v))}
      {groups?.map((group) => {
        const { groupLabel, includedVersions: groupedVersionNames = [] } = group;
        return (
          <OptionGroup key={groupLabel} label={groupLabel}>
            <>
              {groupedVersionNames.reduce<React.ReactNode[]>((res, name) => {
                const version = getVersion(name, versions);
                if (version) {
                  res.push(createOption(version));
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

export { VersionDropdown };
