'use client';

import { useContext, useMemo } from 'react';
import _ from 'lodash';
import { OfflineSelectList, Select } from '@/mdx-components/Select';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { reportAnalytics } from '@/utils/report-analytics';
import type { DriverMap } from '@/mdx-components/Icons/DriverIconMap';
import { DRIVER_ICON_MAP } from '@/mdx-components/Icons/DriverIconMap';
import styles from './tabs-selector.module.scss';
import type { ActiveTabs, Selectors } from '@/context/tabs-context';
import { TabContext, makeChoices } from '@/context/tabs-context';

const getLabel = (name: string) => {
  switch (name) {
    case 'drivers':
      return 'Select your language';
    case 'deployments':
      return 'Select your deployment type';
    case 'platforms':
      return 'Select your platform';
    default:
      _.capitalize(name);
  }
};

type TabSelectorProps = {
  activeTab: string;
  handleClick: (activeTab: ActiveTabs) => void;
  iconMapping: DriverMap;
  name: string;
  options: Selectors[string];
};

const TabSelector = ({ activeTab, handleClick, iconMapping, name, options }: TabSelectorProps) => {
  const choices = useMemo(() => makeChoices({ name, iconMapping, options }), [name, iconMapping, options]);
  const select = (
    <Select
      className={styles.select}
      choices={choices}
      label={getLabel(name)}
      onChange={({ value }) => {
        handleClick({ [name]: value });
        reportAnalytics('LanguageSelection', {
          areaFrom: 'LanguageSelector',
          languageInitial: activeTab,
          languageSelected: value,
        });
      }}
      value={activeTab}
    />
  );

  if (!isOfflineBuild) return select;

  // scripts/offline-ui/tabs.js wires this to the matching hidden tabset.
  return (
    <div className={styles.select} data-offline-selector={name}>
      {select}
      <OfflineSelectList choices={choices} label={getLabel(name)} />
    </div>
  );
};

export const TabsSelector = () => {
  const { activeTabs, selectors, setActiveTab } = useContext(TabContext);

  if (!selectors || Object.keys(selectors).length === 0) {
    return null;
  }

  return (
    <>
      {Object.entries(selectors).map(([name, options]) => {
        let iconMapping = {};
        if (name === 'drivers') {
          iconMapping = DRIVER_ICON_MAP;
        }

        return (
          <TabSelector
            key={name}
            activeTab={activeTabs[name]}
            handleClick={setActiveTab}
            iconMapping={iconMapping}
            name={name}
            options={options}
          />
        );
      })}
    </>
  );
};
