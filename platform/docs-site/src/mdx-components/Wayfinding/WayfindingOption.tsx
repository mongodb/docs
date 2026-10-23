'use client';
import { clsx } from 'clsx';
import { DRIVER_ICON_MAP } from '@/mdx-components/Icons/DriverIconMap';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import styles from './wayfinding-option.module.scss';

type DriverIconMapKey = keyof typeof DRIVER_ICON_MAP;

type WayfindingOptionProps = {
  id: string;
  href: string;
  title?: string;
  lang?: string;
  hideOption?: boolean;
};

export const WayfindingOption = ({ id, href, title, lang, hideOption = false }: WayfindingOptionProps) => {
  const Icon = DRIVER_ICON_MAP[id as DriverIconMapKey] || DRIVER_ICON_MAP[lang as DriverIconMapKey];

  return (
    <a
      className={clsx(styles.option, hideOption && styles.hidden)}
      href={href}
      target={'_self'}
      onClick={() => {
        reportAnalytics('Click', {
          position: 'wayfinding option',
          label: id,
          scroll_position: currentScrollPosition(),
          tagbook: 'true',
        });
      }}
    >
      {Icon && <Icon className={styles.icon} width={24} height={24} />}
      <span>{title}</span>
    </a>
  );
};
