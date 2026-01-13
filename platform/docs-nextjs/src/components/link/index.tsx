'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Link as LGLink } from '@leafygreen-ui/typography';
import { validateHTMAttributes } from '@/utils/validate-element-attributes';
import Icon from '@leafygreen-ui/icon';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { joinClassNames } from '@/utils/join-class-names';
import { assertLeadingAndTrailingSlash } from '@/utils/assert-leading-and-trailing-slash';

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

const symLinkStyling = css`
  padding-top: 6px;
  padding-bottom 6px;
  svg {
    transform: rotate(-45deg);
    margin-left: 7px;
    margin-bottom: -3px;
    width: 13px;
    height: 13px;
    opacity: 1;
  }
`;

const externalNavLinks = css`
  font-weight: unset;
  display: flex;
  padding-top: 6px;
  padding-bottom: 6px;
  svg {
    margin-left: 8px;
    margin-bottom: -10px;
    color: ${palette.gray.base};
  }
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

export type LinkProps = {
  children?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  to?: string;
  showLinkArrow?: boolean;
  hideExternalIcon?: boolean;
  showExternalIcon?: boolean;
  openInNewTab?: boolean;
  onClick?: () => void;
  contentSite?: string | null | undefined;
};

const LinkComponent = ({
  children,
  className,
  activeClassName,
  to,
  showLinkArrow,
  hideExternalIcon,
  showExternalIcon,
  openInNewTab,
  onClick,
  contentSite,
  ...other
}: LinkProps) => {
  const pathname = usePathname();

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

  // If contentSite is truthy, this is for the UnifiedSideNav
  if (contentSite) {
    // For an external link, inside the unified toc
    if (!isRelativeUrl(to)) {
      const strippedUrl = to?.replace(/(^https:\/\/)|(www\.)/g, '');
      const isMDBLink = strippedUrl.includes('mongodb.com/docs'); // For symlinks

      if (isMDBLink) {
        return (
          <NextLink className={joinClassNames(symLinkStyling, className)} href={to} target={'_self'} {...anchorProps}>
            {children}
            {decoration}
            <Icon glyph={'ArrowRight'} fill={palette.gray.base} />
          </NextLink>
        );
      }

      return (
        <LGLink
          className={joinClassNames(lgLinkStyling, externalNavLinks, className)}
          href={to}
          hideExternalIcon={false}
          target={'_blank'}
          style={{ fill: palette.gray.base }}
          {...anchorProps}
        >
          {children}
          {decoration}
        </LGLink>
      );
    }

    to = assertLeadingAndTrailingSlash(to);
    const isActive = pathname === to;

    return (
      <NextLink className={cx(className, isActive && activeClassName)} onClick={onClick} href={to} {...anchorProps}>
        {children}
        {decoration}
      </NextLink>
    );
  }

  const strippedUrl = to?.replace(/(^https:\/\/)|(www\.)/g, '');
  const isMDBLink = strippedUrl.includes('mongodb.com');
  const showExtIcon = showExternalIcon ?? (!anchor && !isMDBLink && !hideExternalIcon);

  if (to && isRelativeUrl(to) && !anchor) {
    to = assertLeadingAndTrailingSlash(to);

    return (
      <NextLink
        className={cx(linkStyling(THEME_STYLES[siteTheme]), className)}
        onClick={onClick}
        href={to}
        target={!showExtIcon ? '_self' : undefined}
        {...anchorProps}
      >
        {children}
        {decoration}
      </NextLink>
    );
  }

  const target = showExtIcon || openInNewTab ? '_blank' : '_self';

  return (
    <LGLink
      href={to}
      className={cx(lgLinkStyling, className)}
      hideExternalIcon={false}
      target={target}
      onClick={onClick}
      {...anchorProps}
    >
      {children}
      {decoration}
    </LGLink>
  );
};

export default LinkComponent;
