'use client';
import LeafyBanner, { Variant as LeafyVariant } from '@leafygreen-ui/banner';
import { css, cx } from '@leafygreen-ui/emotion';
import { getCurrLocale } from '@/utils/locale';
import ComponentFactory from '@/components/component-factory';
import type { ASTNode, BannerNode } from '@/types/ast';
import { baseBannerStyle } from '@/components/banner/styles/banner-item-style';
import { styleMapDark, styleMapLight } from './styles/banner-item-style';

export const alertMap = {
  info: LeafyVariant.Info,
  warning: LeafyVariant.Warning,
  danger: LeafyVariant.Danger,
};

const bannerStyle = ({ variant }: BannerNode['options']) => css`
  ${baseBannerStyle}
  background-color: ${styleMapLight[variant].backgroundColor};
  color: ${styleMapLight[variant].color};
  border-color: ${styleMapLight[variant].borderColor};
  // copied from LG
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

export interface BannerProps {
  nodeChildren: ASTNode[];
  options?: BannerOptions;
}

export interface BannerOptions {
  variant: 'info' | 'warning' | 'danger';
  locale?: string;
}

const Banner = ({ nodeChildren, options, ...rest }: BannerProps) => {
  const children = nodeChildren;
  // Get the current locale (language + region) i.e. es-US, fr-FR
  const locale = getCurrLocale();

  // if banner has option locale, then only render the banner for said translated page.
  const locales = typeof options?.locale === 'string' ? options.locale.split(',') : undefined;
  if (locales && !locales.includes(locale)) {
    return <div />;
  }
  const variant = options?.variant && alertMap[options?.variant] ? alertMap[options?.variant] : LeafyVariant.Info;

  return (
    <LeafyBanner
      className={cx(
        bannerStyle({
          variant,
        }),
      )}
    >
      {children.map((child, i) => (
        <ComponentFactory {...rest} key={i} nodeData={child} />
      ))}
    </LeafyBanner>
  );
};

export default Banner;
