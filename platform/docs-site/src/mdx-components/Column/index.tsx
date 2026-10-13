'use client';

import { Text, TextStyle } from '@via-ds/components/typography';
import styles from './column.module.scss';

export type ColumnProps = {
  children: React.ReactNode;
  title?: string;
};

export const Column = ({ children, title }: ColumnProps) => (
  <div className={styles.column}>
    {title && (
      <Text elementType="h3" textStyle={TextStyle.heading3} className={styles.title}>
        {title}
      </Text>
    )}
    {children}
  </div>
);
