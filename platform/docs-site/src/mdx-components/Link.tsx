'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Link as ViaLink, LinkStyle } from '@via-ds/components/typography';
import styles from './link.module.scss';
import { validateHTMAttributes } from '@/utils/validate-element-attributes';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { assertLeadingAndTrailingSlash } from '@/utils/assert-leading-and-trailing-slash';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { getBasePath, sameProjectHref } from '@/utils/base-path';

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

type LinkProps = {
  children?: React.ReactNode;
  className?: string;
  to?: string;
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
  hideExternalIcon,
  showExternalIcon,
  openInNewTab,
  onClick,
  isSidenav,
  ...other
}: LinkProps) => {
  if (!to) to = '';
  // usePathname() is basePath-relative but `to` is a full `/docs/<prefix>/...`
  // path, so re-add basePath before the same-page comparison below.
  const relativePathname = usePathname();
  const pathname = relativePathname ? `${getBasePath()}${relativePathname}` : relativePathname;

  // If a link points to a section on the current page, strip it down to just the `#hash`.
  // A full-path link would reload the route, dropping the query string (e.g. composable
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

  const strippedUrl = to?.replace(/(^https:\/\/)|(www\.)/g, '');
  const isMDBLink = strippedUrl.includes('mongodb.com');

  // A symlink is an absolute mongodb.com/docs URL, e.g. a TOC entry pointing at
  // another docs property. Only the sidenav flags these; the same URL in content
  // stays icon-free, which is what isSidenav distinguishes.
  const isDocsSymlink =
    !!isSidenav && !!to && !anchor && !isRelativeUrl(to) && strippedUrl.includes('mongodb.com/docs');

  // A symlink shows the icon whatever isMDBLink and hideExternalIcon say.
  const showExtIcon = showExternalIcon ?? (isDocsSymlink || (!anchor && !isMDBLink && !hideExternalIcon));

  if (to && isRelativeUrl(to) && !anchor) {
    to = assertLeadingAndTrailingSlash(to);

    const linkClassName = clsx(styles.link, className);
    const linkTarget = !showExtIcon ? '_self' : undefined;

    // Same-deploy links navigate client-side via NextLink (sameProjectHref
    // strips basePath; NextLink re-adds it). Cross-deploy links and offline use a
    // plain <a> so Next doesn't prepend this basePath — b2k routes the full path.
    const clientHref = isOfflineBuild ? null : sameProjectHref(to);
    if (clientHref) {
      return (
        <NextLink className={linkClassName} onClick={onClick} href={clientHref} target={linkTarget} {...anchorProps}>
          {children}
        </NextLink>
      );
    }

    if (isOfflineBuild) to = addOfflineIndexHtml(to);

    return (
      <a className={linkClassName} onClick={onClick} href={to} target={linkTarget} {...anchorProps}>
        {children}
      </a>
    );
  }

  // External and anchor links render Via Link. Leaving target unset lets Via add
  // rel="noopener noreferrer" alongside target="_blank"; passing target makes its
  // getAnchorProps() return early and drop the rel. Symlinks opt out — they show
  // the icon but stay in the same tab.
  const needsNewTab = !showExtIcon && !!openInNewTab;
  const target = isDocsSymlink ? '_self' : showExtIcon ? undefined : needsNewTab ? '_blank' : '_self';

  return (
    <ViaLink
      href={to}
      className={clsx(styles.viaLink, className)}
      linkStyle={showExtIcon ? LinkStyle.External : LinkStyle.Internal}
      target={target}
      rel={needsNewTab ? 'noopener noreferrer' : undefined}
      // React Aria drops onClick, and its PressEvent has target but no
      // currentTarget, which sidenav analytics reads. Bridge the two.
      onPress={onClick && ((e) => (onClick as (arg: { currentTarget: Element }) => void)({ currentTarget: e.target }))}
      {...anchorProps}
    >
      {children}
    </ViaLink>
  );
};
