'use client';

import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import styles from './literal.module.scss';

export type LiteralProps = {
  children: React.ReactNode;
};

export const Literal = ({ children }: LiteralProps) => (
  <Text textStyle={TextStyle.inlineCode} size={Size.Large} className={styles.literal}>
    {children}
  </Text>
);
