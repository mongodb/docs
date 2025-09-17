import type { PageTemplateType } from '@/types/ast';
import actionBarStyling from './action-bar.module.scss';
import SearchInput from './search-input';
import UIContainer from './actions-container';
import { Suspense } from 'react';

interface ActionBarProps {
  template: PageTemplateType;
  sidenav: boolean;
  className?: string;
}

const getContainerStyling = (template: string) => {
  // TODO: support for other templates
  let containerClassname,
    searchContainerClassname,
    fakeColumns = false;

  switch (template) {
    case 'landing':
      containerClassname = actionBarStyling['landing-grid-styling'];
      searchContainerClassname = actionBarStyling['left-in-grid'];
      fakeColumns = true;
      break;
    case 'product-landing':
    case 'changelog':
      containerClassname = actionBarStyling['grid-styling'];
      fakeColumns = true;
      break;
    case 'blank':
    case 'errorpage':
      containerClassname = actionBarStyling['middle-alignment'];
      searchContainerClassname = actionBarStyling['center-in-grid'];
      fakeColumns = true;
      break;
    case 'drivers-index':
    case 'guide':
    case 'search':
      containerClassname = actionBarStyling['flex-styling'];
      break;
    default:
      containerClassname = actionBarStyling['standard-content-styling'];
      break;
  }

  return { containerClassname, fakeColumns, searchContainerClassname };
};

const ActionBar = ({ template, className }: ActionBarProps) => {
  const { fakeColumns, searchContainerClassname, containerClassname } = getContainerStyling(template);

  // const { darkMode } = useDarkMode();

  return (
    <div className={[actionBarStyling['action-bar'], containerClassname, className].join(' ')}>
      {fakeColumns && <div></div>}
      <div className={[actionBarStyling['search-container'], searchContainerClassname].join(' ')}>
        {/* TODO: Docs Menu with sidenav */}
        {/* {sidenav && (
        <Overline className={cx(overlineStyling)} onClick={() => setHideMobile((state) => !state)}>
          <Icon glyph={hideMobile ? 'ChevronDown' : 'ChevronUp'} />
          Docs Menu
        </Overline>
      )} */}
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
      </div>
      <UIContainer />
    </div>
  );
};

export default ActionBar;
