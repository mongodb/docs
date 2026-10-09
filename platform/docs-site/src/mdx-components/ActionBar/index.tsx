'use client';

import type { PageTemplateType } from '@/types/ast';
import actionBarStyling from '@/mdx-components/ActionBar/action-bar.module.scss';
import { SearchInput } from '@/mdx-components/ActionBar/SearchInput';
import { ActionsContainer } from '@/mdx-components/ActionBar/ActionsContainer';
import { Suspense, useEffect, useRef, useState, type RefObject } from 'react';
import { Overline } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import { useSidenavContext } from '@/context/sidenav-context';
import { overlineStyling } from '@/mdx-components/ActionBar/styles';
import { cx } from '@leafygreen-ui/emotion';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import useScreenSize from '@/hooks/use-screen-size';

interface ActionBarProps {
  template: PageTemplateType;
  sidenav: boolean;
  className?: string;
}

const getContainerStyling = (template: string) => {
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

// The sidenav's ProductTabs overflow into the action bar's space but live in a
// different subtree, so measure how far they intrude and reserve that much
// room before the search bar. Returns null when there are no visible tabs.
const useProductTabsOverlap = (
  barRef: RefObject<HTMLDivElement | null>,
  productTabsEls: HTMLElement[],
  enabled: boolean
) => {
  const [overlap, setOverlap] = useState<number | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!enabled || !bar || !productTabsEls.length) {
      setOverlap(null);
      return;
    }

    const update = () => {
      // Hidden instances (e.g. the inactive sidenav variant) report a right edge of 0
      const tabsRight = Math.max(0, ...productTabsEls.map((el) => el.getBoundingClientRect().right));
      const contentLeft = bar.getBoundingClientRect().left + parseFloat(getComputedStyle(bar).paddingLeft);
      setOverlap(tabsRight ? Math.ceil(tabsRight - contentLeft) : null);
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(bar);
    productTabsEls.forEach((el) => resizeObserver.observe(el));
    return () => resizeObserver.disconnect();
  }, [barRef, productTabsEls, enabled]);

  return overlap;
};

export const ActionBar = ({ template, sidenav, className }: ActionBarProps) => {
  const { fakeColumns, searchContainerClassname, containerClassname } = getContainerStyling(template);
  const { hideMobile, setHideMobile, productTabsEls } = useSidenavContext();
  const { isTabletOrMobile } = useScreenSize();
  const barRef = useRef<HTMLDivElement>(null);
  const productTabsOverlap = useProductTabsOverlap(barRef, productTabsEls, sidenav && !isTabletOrMobile);

  return (
    <div ref={barRef} className={[actionBarStyling['action-bar'], containerClassname, className].join(' ')}>
      {fakeColumns && <div></div>}
      <div
        className={[actionBarStyling['search-container'], searchContainerClassname].join(' ')}
        style={
          productTabsOverlap === null
            ? undefined
            : ({ '--product-tabs-overlap': `${productTabsOverlap}px` } as React.CSSProperties)
        }
      >
        {sidenav && (
          <Overline className={cx(overlineStyling)} onClick={() => setHideMobile((state) => !state)}>
            <Icon glyph={hideMobile ? 'ChevronDown' : 'ChevronUp'} />
            Docs Menu
          </Overline>
        )}
        {!isOfflineBuild && (
          <Suspense fallback={null}>
            <SearchInput />
          </Suspense>
        )}
      </div>
      {!isOfflineBuild && <ActionsContainer />}
    </div>
  );
};
