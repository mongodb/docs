'use client';

import { useEffect, useMemo, useState } from 'react';
import { css } from '@leafygreen-ui/emotion';
import styled from '@emotion/styled';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Body, H2 } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import { Toast, ToastProvider, Variant } from '@leafygreen-ui/toast';
import { ParagraphSkeleton } from '@leafygreen-ui/skeleton-loader';
import { theme } from '@/styles/theme';
import type { Environments } from '@/utils/env-config';
import { useChangelogData } from '@/context/changelog-context';

import FiltersPanel from './components/filters-panel';
import ChangeList from './components/change-list';
import { useFetchDiff } from './hooks/use-fetch-diff';
import { ALL_VERSIONS, getDownloadChangelogUrl } from './utils/constants';
import getDiffResourcesList from './utils/get-diff-resources-list';

const ChangelogPage = styled.div`
  width: 100%;
  margin-top: 60px;
`;

const ChangelogHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 26px;
    color: lightgray;
  }

  @media ${theme.screenSize.upToSmall} {
    flex-direction: column;
    align-items: start;
    gap: 24px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;

  @media ${theme.screenSize.upToMedium} {
    flex-direction: column;
    align-items: start;
    gap: 0;
  }
`;

const DownloadButton = styled(Button)`
  min-width: 182px;
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const StyledLoadingSkeleton = styled.div`
  /* inner div padding */
  box-sizing: border-box;
  margin-bottom: 25px;
`;

const OpenAPIChangelog = () => {
  const env = process.env.NEXT_PUBLIC_ENV as Environments;

  const { darkMode } = useDarkMode();
  const { changelogMetadata, changelog, changelogResourcesList } = useChangelogData();

  const resourceVersions = changelogMetadata.versions.slice().reverse();
  const downloadChangelogUrl = useMemo(() => getDownloadChangelogUrl(env), [env]);

  const [versionMode, setVersionMode] = useState(ALL_VERSIONS);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [resourceVersionOne, setResourceVersionOne] = useState(resourceVersions[0]);
  const [resourceVersionTwo, setResourceVersionTwo] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const { diff } = useFetchDiff({ resourceVersionOne, resourceVersionTwo, setIsLoading, setToastOpen });
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
    <ChangelogPage>
      <ChangelogHeader>
        <Title>
          <H2 as="h1">API Changelog</H2>
          <Body style={{ color: darkMode ? palette.gray.light2 : palette.gray.dark1 }}>
            (2.0{!!changelogMetadata.specRevisionShort && `~${changelogMetadata.specRevisionShort}`})
          </Body>
        </Title>
        <DownloadButton onClick={onDownloadChangelog}>Download Full API Changelog</DownloadButton>
      </ChangelogHeader>
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
        <SkeletonWrapper>
          {[...Array(3)].map((_, i) => (
            <StyledLoadingSkeleton key={i}>
              <ParagraphSkeleton withHeader={true}></ParagraphSkeleton>
            </StyledLoadingSkeleton>
          ))}
        </SkeletonWrapper>
      )}
      <ToastProvider
        portalClassName={css`
          z-index: 3;
        `}
      >
        <Toast
          title="We've encountered an error fetching this data"
          description="Please try again at a later time."
          variant={Variant.Warning}
          open={toastOpen}
          onClose={() => setToastOpen(false)}
        />
      </ToastProvider>
    </ChangelogPage>
  );
};

export default OpenAPIChangelog;
