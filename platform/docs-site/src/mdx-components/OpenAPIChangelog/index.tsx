'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@via-ds/components/button';
import { Skeleton } from '@via-ds/components/skeleton';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import type { Environments } from '@/utils/env-config';
import { useChangelogData } from '@/context/changelog-context';

import FiltersPanel from './components/filters-panel';
import ChangeList from './components/change-list';
import { useFetchDiff } from './hooks/use-fetch-diff';
import { ALL_VERSIONS, getDownloadChangelogUrl } from './utils/constants';
import getDiffResourcesList from './utils/get-diff-resources-list';
import styles from './openapi-changelog.module.scss';

export const OpenAPIChangelog = () => {
  const env = process.env.NEXT_PUBLIC_ENV as Environments;

  const { changelogMetadata, changelog, changelogResourcesList } = useChangelogData();

  const resourceVersions = changelogMetadata.versions.slice().reverse();
  const downloadChangelogUrl = useMemo(() => getDownloadChangelogUrl(env), [env]);

  const [versionMode, setVersionMode] = useState(ALL_VERSIONS);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [resourceVersionOne, setResourceVersionOne] = useState(resourceVersions[0]);
  const [resourceVersionTwo, setResourceVersionTwo] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { diff } = useFetchDiff({ resourceVersionOne, resourceVersionTwo, setIsLoading });
  const [diffResourcesList, setDiffResourcesList] = useState(getDiffResourcesList(diff));

  const [filteredDiff, setFilteredDiff] = useState(diff);
  const [filteredChangelog, setFilteredChangelog] = useState(changelog);

  /* Update diffResourcesList on diff change */
  useEffect(() => {
    if (diff && diff.length) {
      setSelectedResources([]);
      setDiffResourcesList(getDiffResourcesList(diff));
    }
  }, [diff]);

  /*  Clear filters on version mode change.
    Different Resources are available in either mode, not always comparable. */
  useEffect(() => {
    setSelectedResources([]);
  }, [versionMode]);

  /* Filter diff based on changes in selectedResources filtering */
  useEffect(() => {
    if (!selectedResources.length) {
      setFilteredDiff(diff);
    } else setFilteredDiff(diff.filter(({ httpMethod, path }) => selectedResources.includes(`${httpMethod} ${path}`)));
  }, [selectedResources, diff]);

  /* Filter changelog based on changes in selectedResources filtering */
  useEffect(() => {
    if (!selectedResources.length) {
      setFilteredChangelog(changelog);
    } else {
      const filteredReleases = changelog.filter((release) => {
        return (
          release.paths.filter(({ httpMethod, path }) => selectedResources.includes(`${httpMethod} ${path}`)).length !==
          0
        );
      });
      const filteredResources = filteredReleases.map((release) => {
        return {
          ...release,
          paths: release.paths.filter(({ httpMethod, path }) => selectedResources.includes(`${httpMethod} ${path}`)),
        };
      });
      setFilteredChangelog(filteredResources);
    }
  }, [selectedResources, changelog]);

  const onDownloadChangelog = async () => {
    fetch(downloadChangelogUrl)
      .then((res) => res.json())
      .then((res) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([JSON.stringify(res)], { type: 'application/json' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `changelog.json`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode?.removeChild(link);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Text elementType="h1" textStyle={TextStyle.heading2}>
            API Changelog
          </Text>
          <Text size={Size.Large} className={styles.specRevision}>
            (2.0{!!changelogMetadata.specRevisionShort && `~${changelogMetadata.specRevisionShort}`})
          </Text>
        </div>
        <Button onPress={onDownloadChangelog}>Download Full API Changelog</Button>
      </div>
      <FiltersPanel
        resources={versionMode === ALL_VERSIONS ? changelogResourcesList : diffResourcesList}
        selectedResources={selectedResources}
        resourceVersions={resourceVersions}
        versionMode={versionMode}
        resourceVersionOne={resourceVersionOne}
        resourceVersionTwo={resourceVersionTwo}
        setSelectedResources={setSelectedResources}
        setVersionMode={setVersionMode}
        setResourceVersionOne={setResourceVersionOne}
        setResourceVersionTwo={setResourceVersionTwo}
      />
      {!isLoading && (versionMode === ALL_VERSIONS || (resourceVersionOne && resourceVersionTwo)) && (
        <ChangeList versionMode={versionMode} changelog={filteredChangelog} diff={filteredDiff} />
      )}
      {isLoading && (
        <Skeleton isLoading>
          <div className={styles.changeList}>
            {[...Array(3)].map((_, i) => (
              <div className={styles.skeletonBlock} key={i}>
                <Text textStyle={TextStyle.heading4}>Loading resource changes</Text>
                <Text size={Size.Large}>
                  Loading the list of changes for this resource between the selected versions.
                </Text>
              </div>
            ))}
          </div>
        </Skeleton>
      )}
    </div>
  );
};
