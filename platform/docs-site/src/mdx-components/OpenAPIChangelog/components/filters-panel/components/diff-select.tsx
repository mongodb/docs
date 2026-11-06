import { Combobox, ComboboxItem } from '@via-ds/components/combobox';
import { Size } from '@via-ds/components/types';
import type { Dispatch, SetStateAction } from 'react';
import styles from '../../../openapi-changelog.module.scss';

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
  const versionOptions = (exclude: string | undefined, testId: string) =>
    resourceVersions
      .filter((version) => version !== exclude)
      .map((version) => {
        const label = version === resourceVersions[0] ? `${version} (latest)` : version;
        return (
          <ComboboxItem data-testid={testId} key={version} id={version} textValue={label}>
            {label}
          </ComboboxItem>
        );
      });

  return (
    <div className={styles.diffSelect}>
      <Combobox
        selectionMode="single"
        size={Size.Large}
        placeholder="Select Version"
        label="Resource Version 1"
        selectedKey={resourceVersionOne}
        onSelectionChange={(key) => key !== null && handleVersionOneChange(String(key))}
      >
        {versionOptions(resourceVersionTwo, 'version-one-option')}
      </Combobox>
      <Combobox
        selectionMode="single"
        size={Size.Large}
        placeholder="Select Version"
        label="Resource Version 2"
        selectedKey={resourceVersionTwo ?? null}
        onSelectionChange={(key) => key !== null && handleVersionTwoChange(String(key))}
      >
        {versionOptions(resourceVersionOne, 'version-two-option')}
      </Combobox>
    </div>
  );
}
