import styled from '@emotion/styled';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import { css, cx } from '@leafygreen-ui/emotion';
import type { Dispatch, SetStateAction } from 'react';

const DiffSelectContainer = styled.div`
  display: flex;
  gap: 14px;
  padding: 0 5px;
`;

const DiffSelectItem = styled.div`
  flex-grow: 1;
`;

const marginlessLabel = css`
  label {
    margin-bottom: 0;
  }
`;

type DiffSelectProps = {
  resourceVersions: string[];
  resourceVersionOne: string;
  resourceVersionTwo?: string;
  handleVersionOneChange: Dispatch<SetStateAction<string>>;
  handleVersionTwoChange: Dispatch<SetStateAction<string | undefined>>;
};

export default function DiffSelect({
  resourceVersions,
  resourceVersionOne,
  resourceVersionTwo,
  handleVersionOneChange,
  handleVersionTwoChange,
}: DiffSelectProps) {
  const versionOneOptions = resourceVersions
    .filter((version) => version !== resourceVersionTwo)
    .map((version) => (
      <ComboboxOption
        data-testid="version-one-option"
        key={version}
        displayName={version === resourceVersions[0] ? `${version} (latest)` : version}
        value={version}
      ></ComboboxOption>
    ));

  const versionTwoOptions = resourceVersions
    .filter((version) => version !== resourceVersionOne)
    .map((version) => (
      <ComboboxOption
        data-testid="version-two-option"
        key={version}
        displayName={version === resourceVersions[0] ? `${version} (latest)` : version}
        value={version}
      ></ComboboxOption>
    ));

  return (
    <DiffSelectContainer>
      <DiffSelectItem>
        <Combobox
          clearable={false}
          placeholder="Select Version"
          value={resourceVersionOne}
          label="Resource Version 1"
          className={cx(marginlessLabel)}
          // @ts-expect-error - LG Combobox returns a singular string if not a multiselect - their typing does not narrow
          onChange={(value: string) => handleVersionOneChange(value)}
          multiselect={false}
        >
          {versionOneOptions}
        </Combobox>
      </DiffSelectItem>
      <DiffSelectItem>
        <Combobox
          clearable={false}
          placeholder="Select Version"
          value={resourceVersionTwo}
          label="Resource Version 2"
          className={cx(marginlessLabel)}
          // @ts-expect-error - LG Combobox returns a singular string if not a multiselect - their typing does not narrow
          onChange={(value: string) => handleVersionTwoChange(value)}
        >
          {versionTwoOptions}
        </Combobox>
      </DiffSelectItem>
    </DiffSelectContainer>
  );
}
