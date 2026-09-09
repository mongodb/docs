'use client';
import { clsx } from 'clsx';
import { Icon, type GlyphName } from '@via-ds/icons';
import * as viaGlyphs from '@via-ds/icons';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import bannerStyles from './banner.module.scss';
import styles from './cta-banner.module.scss';

interface CTABannerProps {
  children: React.ReactNode;
  icon?: string;
  url: string;
}

export const CTABanner = ({ children, icon, url }: CTABannerProps) => {
  // Handles case sensitivity for specified icons
  let glyph: GlyphName = 'Play';
  if (icon) {
    const formattedGlyph = icon.charAt(0).toUpperCase() + icon.slice(1).toLowerCase();
    if (formattedGlyph in viaGlyphs) {
      glyph = formattedGlyph as GlyphName;
    }
  }

  const router = useRouter();

  const onClick = useCallback(() => {
    if (!url) return;
    if (isRelativeUrl(url)) {
      router.push(url);
    } else {
      window.location.href = url;
    }
  }, [url, router]);

  return (
    <div className={clsx(bannerStyles.base, styles.infoBanner)} onClick={onClick}>
      <div className={styles.infoIconWrapper}>
        <Icon glyph={glyph} fill="var(--via-color-icon-info)" />
      </div>
      {children}
    </div>
  );
};
