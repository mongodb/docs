'use client';

import { useMemo, useState, useEffect } from 'react';
import { SideNavItem } from '@leafygreen-ui/side-nav';
import Icon from '@leafygreen-ui/icon';
import { css as LeafyCSS, css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { MongoDBLogoMark } from '@leafygreen-ui/logo';
import { Body } from '@leafygreen-ui/typography';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import useScreenSize from '@/hooks/use-screen-size';
import LinkComponent from '@/components/link';
import { useViewport } from '@/hooks/use-viewport';

const sideNavItemBasePadding = css`
  padding-left: ${theme.size.medium};
  padding-right: ${theme.size.medium};
  padding-top: ${theme.size.small};
  padding-bottom: ${theme.size.small};
`;

const titleStyle = css`
  display: flex;
  justify-content: space-between;
  color: var(--sidenav-item-title);
  font-size: ${theme.fontSize.small};
  font-weight: bold;
  line-height: 20px;
  text-transform: none;
  &:hover {
    background-color: var(--sidenav-hover-bg-color);

    &:after,
    span:after {
      display: none;
    }
  }
`;

const logoLinkStyling = css`
  padding-left: ${theme.size.medium};
  display: flex;
  text-decoration: none;

  > svg {
    margin-right: ${theme.size.default};

    > path {
      fill: ${palette.black};
    }
  }

  .dark-theme & {
    > svg > path {
      fill: ${palette.white};
    }
  }
`;

const homeLinkStyle = LeafyCSS`
  span {
    color: ${palette.gray.dark2};
    font-weight: 600;
    display: flex;
    gap: 6px;
    svg {
      height: 17px;
    }
  }

  .dark-theme & {
    span {
      color: ${palette.gray.light2};
    }
  }
`;

const containerStyle = (isDesktop: boolean) => LeafyCSS`
  display: flex;
  align-items: center;
  ${!isDesktop && 'width : 162px'}
`;

const logoTextStyling = LeafyCSS`
  line-height: ${theme.fontSize.h1};
  font-weight: 600;
  font-size: ${theme.fontSize.small};
  .dark-theme & {
    color: ${palette.white};
  }
`;

const DocsHomeButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const viewport = useViewport(false);
  const { isTabletOrMobile, isDesktop } = useScreenSize();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sideNavHome = useMemo(
    () => (
      <SideNavItem
        className={cx(titleStyle, sideNavItemBasePadding, homeLinkStyle)}
        as={(props) => <LinkComponent {...props} hideExternalIcon={true} />}
        href="https://www.mongodb.com/docs/"
      >
        <Icon glyph="Home"></Icon>
        Docs Home
      </SideNavItem>
    ),
    [],
  );

  const homeNav = useMemo(
    () => (
      <a className={cx(logoLinkStyling)} href="https://mongodb.com/docs">
        <MongoDBLogoMark height={34} color={darkMode ? 'white' : 'black'} />
        <Body className={cx(logoTextStyling)}>MongoDB Docs</Body>
      </a>
    ),
    [darkMode],
  );

  // During SSR and initial hydration, always render sideNavHome to match server
  // After hydration, use the scroll-based condition
  const shouldShowHomeNav =
    isMounted && !isTabletOrMobile && viewport.scrollY > parseInt(theme.header.navbarHeight, 10);

  return <div className={cx(containerStyle(isDesktop))}>{shouldShowHomeNav ? homeNav : sideNavHome}</div>;
};

export default DocsHomeButton;
