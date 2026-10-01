'use client';

import type { ReactNode } from 'react';
import { Text, TextStyle } from '@via-ds/components/typography';
import styles from './kicker.module.scss';

type KickerProps = {
  children?: ReactNode;
};

// A Kicker is a visual label, not a document heading, so it renders as a p. With no children it is only a spacer, so it renders an empty div.
export const Kicker = ({ children }: KickerProps) => {
  if (!children) return <div className={styles.kicker} />;

  return (
    <Text elementType="p" textStyle={TextStyle.heading6} className={styles.kicker}>
      {children}
    </Text>
  );
};
