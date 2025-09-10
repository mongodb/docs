'use client';

import React from 'react';
import Link from 'next/link';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Link as LGLink } from '@leafygreen-ui/typography';
import { validateHTMAttributes } from '@/utils/validate-element-attributes';
import Icon from '@leafygreen-ui/icon';
import { isRelativeUrl } from '@/utils/is-relative-url';

type LinkThemeStyle = {
  color: string;
  focusTextDecorColor: string;
  hoverTextDecorColor: string;
  fontWeight: string | number;
};

type LinkThemeStyles = { light: LinkThemeStyle; dark: LinkThemeStyle };

const THEME_STYLES: LinkThemeStyles = {
  light: {
    color: palette.blue.base,
    focusTextDecorColor: palette.blue.base,
    hoverTextDecorColor: palette.gray.light2,
    fontWeight: 'inherit',
  },
  dark: {
    color: palette.blue.light1,
    focusTextDecorColor: palette.blue.light1,
    hoverTextDecorColor: palette.gray.dark2,
    fontWeight: 700,
  },
};

export const sharedDarkModeOverwriteStyles = `
  color: var(--link-color-primary);
  font-weight: var(--link-font-weight);
`;

/**
 * CSS purloined from LG Link definition (source: https://bit.ly/3JpiPIt)
 * @param {ThemeStyle} linkThemeStyle
 */
const linkStyling = (linkThemeStyle: LinkThemeStyle) => css`
  align-items: center;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  text-decoration-color: transparent;
  line-height: 13px;
  ${sharedDarkModeOverwriteStyles}

  > span > code, > code {
    ${sharedDarkModeOverwriteStyles}
  }

  &:focus,
  &:hover {
    text-decoration-line: underline;
    transition: text-decoration 150ms ease-in-out;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }
  &:focus {
    text-decoration-color: ${linkThemeStyle.focusTextDecorColor};
    outline: none;
  }
  &:hover {
    text-decoration-color: ${linkThemeStyle.hoverTextDecorColor};
  }
`;

// DOP-3091: LG anchors are not inline by default
const lgLinkStyling = css`
  display: inline;
  ${sharedDarkModeOverwriteStyles}

  > span > code, > code {
    ${sharedDarkModeOverwriteStyles}
  }
`;

type LinkProps = {
  className?: string;
  children?: React.ReactNode;
  to?: string;
  showLinkArrow?: boolean;
  hideExternalIcon?: boolean;
  showExternalIcon?: boolean;
  openInNewTab?: boolean;
  onClick?: () => void;
};

const LinkComponent = ({
  className,
  children,
  to,
  showLinkArrow,
  hideExternalIcon,
  showExternalIcon,
  openInNewTab,
  onClick,
  ...other
}: LinkProps) => {
  if (!to) to = '';
  const anchor = to.startsWith('#');

  const anchorProps = validateHTMAttributes('anchor', other);
  const { theme: siteTheme } = useDarkMode();

  const decoration = showLinkArrow ? (
    <span>
      {' '}
      <Icon role="presentation" size={12} glyph="ArrowRight" />{' '}
    </span>
  ) : (
    ''
  );

  const strippedUrl = to?.replace(/(^https:\/\/)|(www\.)/g, '');
  const isMDBLink = strippedUrl.includes('mongodb.com');
  const showExtIcon = showExternalIcon ?? (!anchor && !isMDBLink && !hideExternalIcon);
  const target = !showExtIcon ? '_self' : undefined;

  if (to && isRelativeUrl(to) && !anchor) {
    if (!to.startsWith('/')) to = `/${to}`;

    // Ensure trailing slash
    to = to.replace(/\/?(\?|#|$)/, '/$1');

    return (
      <Link
        className={cx(linkStyling(THEME_STYLES[siteTheme]), className)}
        onClick={onClick}
        href={to}
        target={target}
        {...anchorProps}
      >
        {children}
        {decoration}
      </Link>
    );
  }

  return (
    <LGLink
      href={to}
      className={cx(lgLinkStyling, className)}
      hideExternalIcon={false}
      target={openInNewTab ? '_blank' : target}
      onClick={onClick}
      {...anchorProps}
    >
      {children}
      {decoration}
    </LGLink>
  );
};

export default LinkComponent;
