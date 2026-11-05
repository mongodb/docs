import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Text } from '@via-ds/components/typography';
import styles from './view-components.module.scss';

export const Layout = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={clsx(styles.layout, className)} {...props} />
);

export const Subheading = ({ children }: { children: ReactNode }) => (
  <Text elementType="div" className={styles.subheading}>
    {children}
  </Text>
);
