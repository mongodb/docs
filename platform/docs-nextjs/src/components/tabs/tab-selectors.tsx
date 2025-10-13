'use client';

import { useContext, useMemo } from 'react';
import _ from 'lodash';
import { cx, css } from '@leafygreen-ui/emotion';
import Select from '@/components/select';
import { reportAnalytics } from '@/utils/report-analytics';
import type { DriverMap } from '@/components/icons/DriverIconMap';
import { DRIVER_ICON_MAP } from '@/components/icons/DriverIconMap';
import { theme } from '@/styles/theme';
import { PageContext } from '@/context/page-context';
import type { ASTNode } from '@/types/ast';
import type { ActiveTabs } from '@/context/tabs-context';
import { TabContext, makeChoices } from '@/context/tabs-context';

const selectStyle = css`
  width: 100%;

  & button > div > div > div {
    display: flex;
    align-items: center;
  }

  @media ${theme.screenSize.smallAndUp} {
    /* Min width of right panel */
    max-width: 140px;
  }

  @media ${theme.screenSize.upToLarge} {
    /* Supports the alignment when on tablet or mobile */
    max-width: 300px;
  }
`;

const mainColumnStyles = css`
  margin: ${theme.size.large} 0px;
  div > button {
    display: flex;
    width: 458px;
    @media ${theme.screenSize.upToMedium} {
      width: 385px;
    }
    @media ${theme.screenSize.upToSmall} {
      width: 100%;
    }
  }
`;

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

export type TabSelectorProps = {
  activeTab: string;
  handleClick: (activeTab: ActiveTabs) => void;
  iconMapping: DriverMap;
  name: string;
  options: Record<string, ASTNode[]>;
  mainColumn: boolean;
  className?: string;
};

const TabSelector = ({
  className,
  activeTab,
  handleClick,
  iconMapping,
  name,
  options,
  mainColumn,
}: TabSelectorProps) => {
  const choices = useMemo(() => makeChoices({ name, iconMapping, options }), [name, iconMapping, options]);
  // usePortal set to true when Select is in main column to
  // prevent z-index issues with content overlapping dropdown
  return (
    <Select
      className={cx(selectStyle, mainColumn ? mainColumnStyles : '', className)}
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
};

export type TabSelectorsProps = {
  className?: string;
  rightColumn?: boolean;
};

const TabSelectors = ({ className, rightColumn = false }: TabSelectorsProps) => {
  const { tabsMainColumn } = useContext(PageContext);
  const { activeTabs, selectors, setActiveTab } = useContext(TabContext);

  if (!selectors || Object.keys(selectors).length === 0 || (!tabsMainColumn && !rightColumn)) {
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
            className={className}
            activeTab={activeTabs[name]}
            handleClick={setActiveTab}
            iconMapping={iconMapping}
            name={name}
            options={options}
            mainColumn={!!tabsMainColumn}
          />
        );
      })}
    </>
  );
};

export default TabSelectors;
