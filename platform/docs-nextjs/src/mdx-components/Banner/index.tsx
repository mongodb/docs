'use client';

import { useEffect } from 'react';
import LeafyBanner, { Variant as LeafyVariant } from '@leafygreen-ui/banner';
import { css, cx } from '@leafygreen-ui/emotion';
import { getCurrLocale } from '@/utils/locale';
import { baseBannerStyle, styleMapDark, styleMapLight } from './styles';
import { usePageContext } from '@/context/page-context';

export const alertMap = {
  info: LeafyVariant.Info,
  warning: LeafyVariant.Warning,
  danger: LeafyVariant.Danger,
};

const bannerStyle = ({ variant }: { variant: keyof typeof styleMapLight }) => css`
  ${baseBannerStyle}
  background-color: ${styleMapLight[variant].backgroundColor};
  color: ${styleMapLight[variant].color};
  border-color: ${styleMapLight[variant].borderColor};
  ::before {
    background: linear-gradient(to left, transparent 6px, ${styleMapLight[variant].beforeColor} 6px);
  }
  a {
    color: ${styleMapLight[variant].linkColor};
    :hover {
      color: ${styleMapLight[variant].color};
      text-decoration-color: ${styleMapLight[variant].color};
    }
  }
  > svg {
    color: ${styleMapLight[variant].iconColor};
  }

  .dark-theme & {
    background-color: ${styleMapDark[variant].backgroundColor};
    color: ${styleMapDark[variant].color};
    border-color: ${styleMapDark[variant].borderColor};
    ::before {
      background: linear-gradient(to left, transparent 6px, ${styleMapDark[variant].beforeColor} 6px);
    }
    a {
      color: ${styleMapDark[variant].linkColor};
      :hover {
        color: ${styleMapDark[variant].color};
        text-decoration-color: ${styleMapDark[variant].color};
      }
    }
    > svg {
      color: ${styleMapDark[variant].iconColor};
    }
  }
`;

export type BannerVariant = 'info' | 'warning' | 'danger';

export interface BannerProps {
  children: React.ReactNode;
  variant?: BannerVariant;
  locale?: string;
}

export const Banner = ({ children, variant = 'info', locale: localeProp }: BannerProps) => {
  const { setHasBanner } = usePageContext();
  const locale = getCurrLocale();

  useEffect(() => {
    setHasBanner(true);
  }, [setHasBanner]);

  const locales = typeof localeProp === 'string' ? localeProp.split(',') : undefined;
  if (locales && !locales.includes(locale)) {
    return <div />;
  }
  const styleVariant = (variant ?? 'info') as keyof typeof styleMapLight;

  return (
    <LeafyBanner
      className={cx(
        bannerStyle({
          variant: styleVariant,
        }),
      )}
    >
      {children}
    </LeafyBanner>
  );
};
