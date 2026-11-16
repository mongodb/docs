import type { Dispatch, SetStateAction } from 'react';
import { ALL_VERSIONS, COMPARE_VERSIONS } from '@/mdx-components/OpenAPIChangelog/utils/constants';
import useScreenSize from '@/hooks/use-screen-size';
import { getTranslator } from '@/internationalization/get-translator';
import { Combobox, ComboboxItem } from '@via-ds/components/combobox';
import { SegmentedControl, SegmentedControlItem } from '@via-ds/components/segmented-control';
import { Size } from '@via-ds/components/types';
import styles from '../../../openapi-changelog.module.scss';

import DiffSelect from './diff-select';

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
  const { t } = getTranslator();
  const { isMobile } = useScreenSize();

  return (
    <div className={styles.section}>
      <SegmentedControl
        className={styles.filters}
        size={Size.Large}
        aria-label={t('changelog.version_mode')}
        value={versionMode}
        onChange={(key) => setVersionMode(String(key))}
      >
        <SegmentedControlItem data-testid="all-versions-option" value={ALL_VERSIONS} aria-controls={ALL_VERSIONS}>
          {t('changelog.all_versions')}
        </SegmentedControlItem>
        <SegmentedControlItem
          data-testid="compare-versions-option"
          value={COMPARE_VERSIONS}
          aria-controls={COMPARE_VERSIONS}
        >
          {t('changelog.compare_two_versions')}
        </SegmentedControlItem>
      </SegmentedControl>
      {versionMode === COMPARE_VERSIONS && (
        <DiffSelect
          resourceVersionOne={resourceVersionOne}
          resourceVersionTwo={resourceVersionTwo}
          resourceVersions={resourceVersions}
          handleVersionOneChange={setResourceVersionOne}
          handleVersionTwoChange={setResourceVersionTwo}
        />
      )}
      <Combobox
        selectionMode="multiple"
        size={Size.Large}
        label={t('changelog.select_resource')}
        placeholder={t('changelog.all')}
        emptyLabel={t('combobox.no_results')}
        menuTriggerAriaLabel={t('combobox.show_suggestions')}
        chipRemoveButtonAriaLabel={t('combobox.remove')}
        multipleSelectionPlaceholder={t('combobox.no_items_selected')}
        formatSelectionCount={(count) => t('combobox.items_selected', { count })}
        chipCharacterLimit={isMobile ? 12 : 50}
        description={
          versionMode === COMPARE_VERSIONS && !resourceVersionTwo
            ? t('changelog.select_two_versions_to_compare')
            : undefined
        }
        value={selectedResources}
        onChange={(keys) => setSelectedResources(keys.map(String))}
      >
        {resources.map((resource) => (
          <ComboboxItem key={resource} id={resource} textValue={resource}>
            {resource}
          </ComboboxItem>
        ))}
      </Combobox>
    </div>
  );
};

export default FiltersPanel;
