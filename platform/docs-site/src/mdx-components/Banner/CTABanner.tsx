'use client';
import { cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Icon, glyphs } from '@leafygreen-ui/icon';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { videoBannerStyling, lgIconStyling } from './styles';

interface CTABannerProps {
  children: React.ReactNode;
  icon?: string;
  url: string;
}

export const CTABanner = ({ children, icon, url }: CTABannerProps) => {
  // Handles case sensitivity for specified icons
  let lgIcon = 'Play';
  if (icon) {
    const standardizeCaseLGIcon = icon.charAt(0).toUpperCase() + icon.slice(1).toLowerCase();
    if (standardizeCaseLGIcon in glyphs) {
      lgIcon = standardizeCaseLGIcon;
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
    <div className={cx(videoBannerStyling)} onClick={onClick}>
      <div className={cx(lgIconStyling)}>
        <Icon glyph={lgIcon} fill={palette.blue.base} />
      </div>
      {children}
    </div>
  );
};
