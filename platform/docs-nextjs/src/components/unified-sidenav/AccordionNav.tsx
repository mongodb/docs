'use client';

import { SideNav } from '@leafygreen-ui/side-nav';
import { BackLink } from '@leafygreen-ui/typography';
import { css as LeafyCSS, cx } from '@leafygreen-ui/emotion';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { theme } from '@/styles/theme';
import useScreenSize from '@/hooks/use-screen-size';
// import { DownloadButton } from '../OfflineDownloadModal';
import { NavTopContainer, downloadButtonStlying, ArtificialPadding } from './UnifiedSidenav';
import { UnifiedTocNavItem } from './UnifiedTocNavItems';
import type { TocItem } from './types';
import DocsHomeButton from './DocsHomeButton';
import { tocItemKey } from '@/utils/create-toc-key';

export const leftPane = LeafyCSS`
  overflow-y: auto;
  border-right: 1px solid var(--sidenav-border-bottom-color);
  width: 100%;
  padding-top: ${theme.size.default};
`;

const panelStyling = LeafyCSS`
    position: fixed;
    overflow-y: auto;
    top: 50px;
    height: calc(100% - 120px);
    padding-top: 10px;
    border-bottom: 1px solid var(--sidenav-border-bottom-color);
    width: 100%;
    // Height for the version dropdown
    button {
      height: 28px;
    }

    ul {
      display: block;
      width: 100%;
    }

`;

const sideNavStyle = ({ hideMobile }: { hideMobile: boolean }) => LeafyCSS`  
  height: 100%;
  padding: 0px;

  @media ${theme.screenSize['2XLargeAndUp']} {
    display: none;
  }

  // Mobile & Tablet nav
  @media ${theme.screenSize.upToLarge} {
    position: absolute;
    ${hideMobile && 'display: none;'}

    button[data-testid="side-nav-collapse-toggle"] {
      display: none;
    }
  }
`;

const backLinkStyling = LeafyCSS`
  padding-left: ${theme.size.medium};
  padding-top: ${theme.size.default};
  font-size: ${theme.fontSize.small};

  :hover {
    text-decoration: none;
  }
`;

interface AccordionNavPanelProps {
  showDriverBackBtn: boolean;
  setShowDriverBackBtn: (show: boolean) => void;
  slug: string;
  currentL1?: TocItem;
  currentL2s?: TocItem | null;
  setCurrentL1: (item: TocItem) => void;
  setCurrentL2s: (item: TocItem) => void;
  tree: TocItem[];
  hideMobile: boolean;
}

export const AccordionNavPanel = ({
  showDriverBackBtn,
  setShowDriverBackBtn,
  slug,
  currentL1,
  currentL2s,
  setCurrentL1,
  setCurrentL2s,
  tree,
  hideMobile,
}: AccordionNavPanelProps) => {
  const { isTabletOrMobile } = useScreenSize();
  const viewportSize = useViewportSize();

  return (
    <SideNav
      widthOverride={isTabletOrMobile && viewportSize ? viewportSize.width : 290}
      className={cx(sideNavStyle({ hideMobile }))}
      aria-label="Accordion Side navigation Panel"
    >
      <div className={cx(NavTopContainer(isTabletOrMobile))}>
        <ArtificialPadding />
        <DocsHomeButton />
      </div>
      <div className={cx(panelStyling)}>
        <div className={cx(leftPane)}>
          {showDriverBackBtn ? (
            <>
              <BackLink
                className={cx(backLinkStyling)}
                onClick={() => setShowDriverBackBtn(false)}
                href={currentL1?.newUrl}
              >
                Back to {currentL1?.label}
              </BackLink>
              {currentL2s?.items?.map((navItem) => (
                <UnifiedTocNavItem
                  {...navItem}
                  level={1}
                  key={tocItemKey(navItem)}
                  isStatic={false}
                  slug={slug}
                  currentL2s={currentL2s}
                  isAccordion={true}
                  setCurrentL1={setCurrentL1}
                  setCurrentL2s={setCurrentL2s}
                  setShowDriverBackBtn={setShowDriverBackBtn}
                />
              ))}
            </>
          ) : (
            <>
              {tree.map((navItems) => (
                <UnifiedTocNavItem
                  {...navItems}
                  level={1}
                  key={tocItemKey(navItems)}
                  isStatic={true}
                  slug={slug}
                  currentL2s={currentL2s}
                  isAccordion={true}
                  setCurrentL1={setCurrentL1}
                  setCurrentL2s={setCurrentL2s}
                  setShowDriverBackBtn={setShowDriverBackBtn}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className={cx(downloadButtonStlying)}>
        {/* TODO: Add in after OfflineDownloadModal is implemented */}
        {/* <DownloadButton /> */}
      </div>
    </SideNav>
  );
};
