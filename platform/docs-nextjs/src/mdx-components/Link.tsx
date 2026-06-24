'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Link as LGLink } from '@leafygreen-ui/typography';
import { validateHTMAttributes } from '@/utils/validate-element-attributes';
import { Icon } from '@leafygreen-ui/icon';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { assertLeadingAndTrailingSlash } from '@/utils/assert-leading-and-trailing-slash';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

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

/**
 * Inserts index.html before the hash fragment (or at the end) for offline builds
 */
function addOfflineIndexHtml(url: string): string {
  const hashIdx = url.indexOf('#');
  const rawPath = hashIdx === -1 ? url : url.slice(0, hashIdx);
  const hash = hashIdx === -1 ? '' : url.slice(hashIdx).replace(/\/$/, '');
  // Strip a trailing slash before checking so a path that already ends in
  // index.html (e.g. links pre-processed by useProcessedUnifiedToc, then given a
  // trailing slash by assertLeadingAndTrailingSlash) doesn't get a second one.
  const path = rawPath.replace(/\/$/, '');
  if (path.endsWith('/index.html')) return path + hash;
  return path + '/index.html' + hash;
}

// Symlinks (absolute mongodb.com/docs URLs) render with a rotated ArrowRight glyph.
const symLinkStyling = css`
  padding-top: 6px;
  padding-bottom: 6px;
  svg {
    transform: rotate(-45deg);
    margin-left: 7px;
    margin-bottom: -3px;
    width: 13px;
    height: 13px;
    opacity: 1;
  }
`;

// In the sidenav, the external-link icon should match the nav item text color
// instead of LG's default icon color.
const sidenavExternalIconStyling = css`
  svg {
    color: ${palette.gray.base};
  }
`;

// DOP-3091: LG anchors are not inline by default
const lgLinkStyling = css`
  display: inline;
  ${sharedDarkModeOverwriteStyles}

  > span > code, > code {
    ${sharedDarkModeOverwriteStyles}
  }

  /* LG Link only nudges the OpenNewTab glyph ~1px; align like a superscript. */
  & > svg[role='presentation'] {
    vertical-align: super;
    position: relative;
    top: 0;
  }
`;

type LinkProps = {
  children?: React.ReactNode;
  className?: string;
  to?: string;
  showLinkArrow?: boolean;
  hideExternalIcon?: boolean;
  showExternalIcon?: boolean;
  openInNewTab?: boolean;
  onClick?: () => void;
  url?: string;
  isSidenav?: boolean;
};

export const Link = ({
  children,
  className,
  to,
  showLinkArrow,
  hideExternalIcon,
  showExternalIcon,
  openInNewTab,
  onClick,
  isSidenav,
  ...other
}: LinkProps) => {
  if (!to) to = '';
  const pathname = usePathname();

  // If a link points to a section on the current page, strip it down to just the `#hash`.
  // A full-path NextLink would reload the route, dropping the query string (e.g. composable
  // `?deployment-type=...`) and skipping `hashchange`. A bare `#hash` anchor keeps the query
  // and fires hashchange, so in-page selectors (composable tutorials, tabs) can react.
  if (to && pathname && !isOfflineBuild) {
    const hashIdx = to.indexOf('#');
    if (hashIdx > 0) {
      const stripTrailingSlash = (p: string) => p.replace(/\/+$/, '');
      if (stripTrailingSlash(to.slice(0, hashIdx)) === stripTrailingSlash(pathname)) {
        to = to.slice(hashIdx);
      }
    }
  }

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

  // A symlink is an absolute mongodb.com/docs URL (e.g. a TOC entry pointing to
  // another docs property). Relative TOC paths like /docs/atlas are not symlinks.
  // Only the sidenav renders these with the rotated arrow; content links don't.
  const isDocsSymlink = isSidenav && !!to && !anchor && !isRelativeUrl(to) && strippedUrl.includes('mongodb.com/docs');

  if (isDocsSymlink) {
    return (
      <NextLink className={cx(symLinkStyling, className)} onClick={onClick} href={to} target="_self" {...anchorProps}>
        {children}
        {decoration}
        <Icon glyph="ArrowRight" fill={palette.gray.base} />
      </NextLink>
    );
  }

  if (to && isRelativeUrl(to) && !anchor) {
    to = assertLeadingAndTrailingSlash(to);
    if (isOfflineBuild) to = addOfflineIndexHtml(to);

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
      className={cx(lgLinkStyling, isSidenav && sidenavExternalIconStyling, className)}
      hideExternalIcon={!showExtIcon}
      target={target}
      onClick={onClick}
      {...anchorProps}
    >
      {children}
      {decoration}
    </LGLink>
  );
};
