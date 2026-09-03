'use client';

import { clsx } from 'clsx';
import { Banner as ViaBanner, BannerVariant as ViaBannerVariant } from '@via-ds/components/banner';
import { getCurrLocale } from '@/utils/locale';
import styles from './banner.module.scss';

export type BannerVariant = 'info' | 'warning' | 'danger';

const variantMap: Record<BannerVariant, ViaBannerVariant> = {
  info: ViaBannerVariant.Info,
  warning: ViaBannerVariant.Warning,
  danger: ViaBannerVariant.Danger,
};

export interface BannerProps {
  children: React.ReactNode;
  variant?: BannerVariant;
  locale?: string;
}

export const Banner = ({ children, variant = 'info', locale: localeProp }: BannerProps) => {
  const locale = getCurrLocale();

  const locales = typeof localeProp === 'string' ? localeProp.split(',') : undefined;
  if (locales && !locales.includes(locale)) {
    return <div />;
  }
  const styleVariant = variant && variant in variantMap ? variant : 'info';

  return (
    <ViaBanner className={clsx(styles.base)} variant={variantMap[styleVariant]}>
      {children}
    </ViaBanner>
  );
};
