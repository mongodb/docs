'use client';

import styles from './multi-column.module.scss';

export type MultiColumnProps = {
  children: React.ReactNode;
};

export const MultiColumn = ({ children }: MultiColumnProps) => <div className={styles.multiColumn}>{children}</div>;
