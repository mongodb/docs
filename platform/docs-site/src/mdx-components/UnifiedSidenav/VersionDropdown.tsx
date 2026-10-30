'use client';

import { useCallback, useEffect, useState } from 'react';
import { Select, SelectItem, SelectSection } from '@via-ds/components/select';
import { Header } from '@via-ds/components/structure';
import { Text } from '@via-ds/components/typography';
import type { Version, Group } from '@/types/data';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { useVersionContext } from '@/context/version-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import styles from './version-dropdown.module.scss';

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

const createOption = (version: Version) => (
  <SelectItem key={version.versionName} id={version.versionName}>
    {getUILabel(version)}
  </SelectItem>
);

type VersionDropdownProps = {
  contentSite?: string | null;
};

const VersionDropdown = ({ contentSite = null }: VersionDropdownProps) => {
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
    (key: string | number | null) => {
      if (key === null) {
        return;
      }
      if (key === 'legacy') {
        // Full `/docs/...` path; use window.location so basePath isn't prepended.
        window.location.assign(`/docs/legacy/?site=${project}`);
      } else {
        onVersionSelect(project, String(key));
      }
    },
    [onVersionSelect, project],
  );

  if (isOfflineBuild) {
    return null;
  }

  if ((versions?.length ?? 0) < 1) {
    console.warn('Insufficient versions supplied to VersionDropdown; expected 1 or more');
    return null;
  }

  const activeUngroupedVersions = getActiveUngroupedVersions(versions, groups);

  // Option values and activeVersions are both versionName now, so no translation
  // between a git name and a URL slug is needed.
  const activeVersionValue = activeVersions[project] ?? '';

  return (
    <Select
      className={styles.versionDropdown}
      aria-label="View a different version of documentation."
      selectedKey={activeVersionValue || null}
      onSelectionChange={onSelectChange}
      isOpen={open}
      onOpenChange={setOpen}
      placeholder="Select a version"
      isDisabled={eol}
    >
      {activeUngroupedVersions.map((v) => createOption(v))}
      {groups?.map((group) => {
        const { groupLabel, includedVersions: groupedVersionNames = [] } = group;
        return (
          <SelectSection key={groupLabel}>
            <Header>
              <Text slot="heading">{groupLabel}</Text>
            </Header>
            {groupedVersionNames.reduce<React.ReactNode[]>((res, name) => {
              const version = getVersion(name, versions);
              if (version) {
                res.push(createOption(version));
              }
              return res;
            }, [])}
          </SelectSection>
        );
      })}
      {showEol && <SelectItem id="legacy">Legacy Docs</SelectItem>}
    </Select>
  );
};

export { VersionDropdown };
