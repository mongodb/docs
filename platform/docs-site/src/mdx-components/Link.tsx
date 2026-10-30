'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Link as ViaLink, LinkStyle } from '@via-ds/components/typography';
import styles from './link.module.scss';
import { validateHTMAttributes } from '@/utils/validate-element-attributes';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { resolveDocsHref } from '@/utils/resolve-docs-href';

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
  isStandalone?: boolean;
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
  isStandalone = true,
  ...other
}: LinkProps) => {
  const { href, clientHref } = resolveDocsHref(to ?? '', usePathname());
  const anchor = href.startsWith('#');

  const anchorProps = validateHTMAttributes('anchor', other);

  const strippedUrl = href.replace(/(^https:\/\/)|(www\.)/g, '');
  const isMDBLink = strippedUrl.includes('mongodb.com');

  // A symlink is an absolute mongodb.com/docs URL, e.g. a TOC entry pointing at
  // another docs property. Only the sidenav flags these; the same URL in content
  // stays icon-free, which is what isSidenav distinguishes.
  const isDocsSymlink =
    !!isSidenav && !!href && !anchor && !isRelativeUrl(href) && strippedUrl.includes('mongodb.com/docs');

  // A symlink shows the icon whatever isMDBLink and hideExternalIcon say.
  const showExtIcon = showExternalIcon ?? (isDocsSymlink || (!anchor && !isMDBLink && !hideExternalIcon));

  if (href && isRelativeUrl(href) && !anchor) {
    const linkClassName = clsx(styles.link, !isStandalone && styles.linkInline, className);
    const linkTarget = !showExtIcon ? '_self' : undefined;

    if (clientHref) {
      return (
        <NextLink className={linkClassName} onClick={onClick} href={clientHref} target={linkTarget} {...anchorProps}>
          {children}
        </NextLink>
      );
    }

    return (
      <a className={linkClassName} onClick={onClick} href={href} target={linkTarget} {...anchorProps}>
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
      href={href}
      className={clsx(styles.viaLink, className)}
      linkStyle={showExtIcon ? LinkStyle.External : LinkStyle.Internal}
      isStandalone={isStandalone}
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
