'use client';

import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RedocStandalone } from 'redoc';
import { css, cx } from '@leafygreen-ui/emotion';
import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import Spinner from '@/components/spinner';
import useStickyTopValues from '@/hooks/use-sticky-top-values';
import { isBrowser } from '@/utils/is-browser';
import ComponentFactory from '@/components/component-factory';
import type { OpenAPINode } from '@/types/ast';
import { usePageContext } from '@/context/page-context';

import { isLinkInWhitelist, WhitelistErrorCallout } from './whitelist';
import {
  codeBlockCss,
  deprecatedBadgeCss,
  headingsCss,
  inlineCodeCss,
  leftSidebarCss,
  rightSidebarCss,
  schemaDataTypesCss,
  spanHttpCss,
  themeOption,
} from './styles';
import DocsHomeButton from '../unified-sidenav/DocsHomeButton';

// Important notes:
// The contents of this file are (unfortunately) a hacky and brittle way of getting Redoc's React component to
// look like our docs while maintaining the same workflow and processes for delivering docs.
// CSS selectors were declared as specific as possible while also being flexible enough for reusable components.
// Upgrading our version of Redoc may result in broken css rules, so please double-check afterwards.

const menuContentClass = 'menu-content';
const menuTitleContainerClass = 'menu-title-container';

const getTopAndHeight = (topValue: string) => `
  top: ${topValue} !important;
  height: calc(100vh - ${topValue}) !important;
`;

// Overwrite css of Redoc's components that can be easily selected and that do not have
// built-in theme options.
// Note: The imported CSS objects (headingsCss, codeBlockCss, etc.) are applied via emotion's normal
// injection system. This function handles only the additional global styles needed.
const globalCssStyles = ({ topLarge, topMedium }: { topLarge: string; topMedium: string }): string => css`
  /* Overwrite the menu/sidebar's top and height using css because Redoc's scrollYOffset
       option doesn't take into account React state changes associated with screen size and viewport hooks. */
  .${menuContentClass} {
    ${getTopAndHeight(topLarge)}
  }

  @media ${theme.screenSize.upToLarge} {
    .${menuContentClass} {
      ${getTopAndHeight(topMedium)}
    }
  }

  .${menuTitleContainerClass} {
    padding-top: ${theme.size.default};
  }

  .${menuTitleContainerClass} li {
    list-style: none inside none;
  }

  .${menuTitleContainerClass} li a {
    color: ${palette.gray.dark1};
    font-size: ${theme.fontSize.small};
  }

  .${menuTitleContainerClass} li a:hover,
  .${menuTitleContainerClass} li a:focus {
    text-decoration: none;
  }

  .${menuTitleContainerClass} li a::before {
    background-color: transparent;
  }

  /* Prevent long enum names from overlapping with right sidebar code blocks */
  table {
    word-break: break-word;
  }
`;

const LoadingContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 180px 0 ${theme.size.medium} 0;
`;

const LoadingMessage = styled('div')`
  font-size: ${theme.fontSize.h1};
  margin-bottom: ${theme.size.small};
`;

const MenuTitle = styled('div')`
  color: ${palette.gray.dark3};
  font-size: ${theme.fontSize.small};
  font-weight: bold;
  line-height: 20px;
  margin: ${theme.size.medium} ${theme.size.default};
  text-transform: capitalize;
`;

const JustifiedWhitelistWarning = styled(WhitelistErrorCallout)`
  margin: 20px auto;
  max-width: 840px;
`;

const LoadingWidget = ({ className }: { className: string }) => (
  <LoadingContainer className={className}>
    <LoadingMessage>Loading</LoadingMessage>
    <Spinner size={48} />
  </LoadingContainer>
);

const borderStyles = css`
  border: unset;
  border-bottom: 1px solid var(--sidenav-border-bottom-color);
  margin: ${theme.size.small} 0;
  width: 100%;
`;

const MenuTitleContainer = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <>
      <DocsHomeButton />
      <hr className={cx(borderStyles)} />
      <MenuTitle>{pageTitle}</MenuTitle>
    </>
  );
};

export type OpenAPIProps = {
  nodeChildren: OpenAPINode['children'];
  options: OpenAPINode['options'];
};

const OpenAPI = ({ nodeChildren, options, ...rest }: OpenAPIProps) => {
  const usesRST = options?.['uses-rst'];
  const topValues = useStickyTopValues();
  const { options: pageOptions } = usePageContext();
  const [isLoading, setIsLoading] = useState(true);
  const [hasValidSpecUrl, setHasValidSpecUrl] = useState(true);
  const [src, setSrc] = useState<string | null>(null);
  let specUrl, spec;

  useEffect(() => {
    if (isBrowser) {
      const urlParams = new URLSearchParams(window.location.search);
      setSrc(urlParams?.get('src'));
      setHasValidSpecUrl(!!src && isLinkInWhitelist(src));
    }
  }, [src]);

  // Use snooty openapi components, such as for docs-realm
  if (usesRST) {
    return (
      <>
        {nodeChildren.map((node, i) => (
          <ComponentFactory key={i} nodeData={node} {...rest} />
        ))}
      </>
    );
  }

  spec = nodeChildren[0] && 'value' in nodeChildren[0] ? JSON.parse(nodeChildren[0].value || '{}') : {};
  spec = !src ? spec : null;

  // Create our loading widget
  const tempLoadingDivClassName = 'openapi-loading-container';
  const needsWhitelistWarning = src && !hasValidSpecUrl;

  // Apply emotion CSS objects - render them in React tree so emotion processes them
  // Note: These styles target Redoc's rendered components with specific class selectors
  const emotionCssClasses = cx(
    globalCssStyles(topValues),
    headingsCss,
    codeBlockCss,
    inlineCodeCss,
    leftSidebarCss,
    rightSidebarCss,
    schemaDataTypesCss,
    spanHttpCss,
    deprecatedBadgeCss,
  );

  return (
    <>
      {/* Wrapper with emotion CSS classes - ensures emotion processes and injects the styles */}
      <div className={emotionCssClasses}>
        {needsWhitelistWarning && <JustifiedWhitelistWarning />}
        {/* Temporary loading widget to be removed once the Redoc component loads */}
        {isLoading && !needsWhitelistWarning && <LoadingWidget className={tempLoadingDivClassName} />}
        {((src && hasValidSpecUrl) || spec) && (
          <RedocStandalone
            onLoaded={() => {
              setIsLoading(false);
              const menuTest = document.querySelector(`.${menuTitleContainerClass}`);
              if (menuTest) {
                return;
              }
              // Insert back button and page title to redoc's sidenav
              const sidebarEl = document.querySelector(`.${menuContentClass}`);
              if (sidebarEl) {
                const searchEl = document.querySelector('div[role="search"]');
                if (searchEl) {
                  const menuTitleContainerEl = document.createElement('div');
                  menuTitleContainerEl.className = menuTitleContainerClass;
                  sidebarEl.insertBefore(menuTitleContainerEl, searchEl);
                  const pageTitle = pageOptions?.title || '';
                  createRoot(menuTitleContainerEl).render(<MenuTitleContainer pageTitle={pageTitle} />);
                }
              }
            }}
            options={{
              hideLoading: true,
              maxDisplayedEnumValues: 5,
              theme: themeOption,
              untrustedSpec: !!specUrl,
            }}
            spec={spec}
            specUrl={src ?? undefined}
          />
        )}
      </div>
    </>
  );
};

export default OpenAPI;
