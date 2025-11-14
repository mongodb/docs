'use client';
import { cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import ComponentFactory from '@/components/component-factory';
import { isRelativeUrl } from '@/utils/is-relative-url';
import type { ASTNode } from '@/types/ast';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { videoBannerStyling, lgIconStyling } from './styles/cta-banner-style';

export interface CTABannerProps {
  nodeChildren: ASTNode[];
  options?: {
    icon?: string;
    url: string;
  };
}

const CTABanner = ({ nodeChildren, options, ...rest }: CTABannerProps) => {
  const children = nodeChildren;
  // Handles case sensitivity for specified icons
  let lgIcon = 'Play';
  if (options?.icon) {
    const standardizeCaseLGIcon = options.icon.charAt(0).toUpperCase() + options.icon.slice(1).toLowerCase();
    if (standardizeCaseLGIcon in glyphs) {
      lgIcon = standardizeCaseLGIcon;
    }
  }

  const router = useRouter();

  const onClick = useCallback(() => {
    if (!options?.url) return;
    if (isRelativeUrl(options?.url)) {
      router.push(options?.url);
    } else {
      window.location.href = options?.url;
    }
  }, [options?.url, router]);

  return (
    <div className={cx(videoBannerStyling)} onClick={onClick}>
      <div className={cx(lgIconStyling)}>
        <Icon glyph={lgIcon} fill={palette.blue.base} />
      </div>
      {children.map((child, i) => (
        <ComponentFactory {...rest} key={i} nodeData={child} />
      ))}
    </div>
  );
};

export default CTABanner;
