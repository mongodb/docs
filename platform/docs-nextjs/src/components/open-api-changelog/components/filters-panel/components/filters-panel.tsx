import type { Dispatch, SetStateAction } from 'react';
import { ALL_VERSIONS, COMPARE_VERSIONS } from '@/components/open-api-changelog/utils/constants';
import styled from '@emotion/styled';
import useScreenSize from '@/hooks/use-screen-size';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import { SegmentedControl, SegmentedControlOption } from '@leafygreen-ui/segmented-control';
import { theme } from '@/styles/theme';

import DiffSelect from './diff-select';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 28px;
`;

const StyledSegmentedControl = styled(SegmentedControl)`
  margin-bottom: 28px;

  @media ${theme.screenSize.upToMedium} {
    button {
      font-size: 13px;
    }
  }
`;

const ResourceSelectContainer = styled.div`
  width: 100%;
  margin-top: 18px;
`;

const ResourceSelect = styled(Combobox)`
  margin: 0 5px;
  width: calc(100% - 10px);

  label {
    margin-bottom: 0;
  }

  span > span {
    text-decoration: none;
  }
`;

type FiltersPanelProps = {
  versionMode: string;
  resources: string[];
  resourceVersions: string[];
  selectedResources: string[];
  setSelectedResources: Dispatch<SetStateAction<string[]>>;
  resourceVersionOne: string;
  resourceVersionTwo?: string;
  setVersionMode: Dispatch<SetStateAction<string>>;
  setResourceVersionOne: Dispatch<SetStateAction<string>>;
  setResourceVersionTwo: Dispatch<SetStateAction<string | undefined>>;
};

const FiltersPanel = ({
  versionMode,
  resources,
  resourceVersions,
  selectedResources,
  setSelectedResources,
  resourceVersionOne,
  resourceVersionTwo,
  setVersionMode,
  setResourceVersionOne,
  setResourceVersionTwo,
}: FiltersPanelProps) => {
  const { isMobile } = useScreenSize();

  return (
    <Wrapper>
      <StyledSegmentedControl value={versionMode} onChange={setVersionMode}>
        <SegmentedControlOption data-testid="all-versions-option" value={ALL_VERSIONS} aria-controls={ALL_VERSIONS}>
          All Versions
        </SegmentedControlOption>
        <SegmentedControlOption
          data-testid="compare-versions-option"
          value={COMPARE_VERSIONS}
          aria-controls={COMPARE_VERSIONS}
        >
          Compare Two Versions
        </SegmentedControlOption>
      </StyledSegmentedControl>
      {versionMode === COMPARE_VERSIONS && (
        <DiffSelect
          resourceVersionOne={resourceVersionOne}
          resourceVersionTwo={resourceVersionTwo}
          resourceVersions={resourceVersions}
          handleVersionOneChange={setResourceVersionOne}
          handleVersionTwoChange={setResourceVersionTwo}
        />
      )}
      <ResourceSelectContainer>
        <ResourceSelect
          label="Select Resource"
          placeholder="All"
          value={selectedResources}
          onChange={setSelectedResources}
          popoverZIndex={3}
          searchEmptyMessage="To see results, select two versions to compare"
          chipCharacterLimit={isMobile ? 12 : 50}
          multiselect
        >
          {resources.map((version) => (
            <ComboboxOption key={version} value={version} />
          ))}
        </ResourceSelect>
      </ResourceSelectContainer>
    </Wrapper>
  );
};

export default FiltersPanel;
