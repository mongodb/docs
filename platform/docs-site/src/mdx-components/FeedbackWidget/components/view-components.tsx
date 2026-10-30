import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import styles from './view-components.module.scss';

export const Layout = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={clsx(styles.layout, className)} {...props} />
);

export const Subheading = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={clsx(styles.subheading, className)} {...props} />
);
