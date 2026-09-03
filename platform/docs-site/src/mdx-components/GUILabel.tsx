'use client';

import clsx from 'clsx';
import { Text } from '@via-ds/components/typography';
import styles from './guilabel.module.scss';

type GUILabelProps = {
  children: React.ReactNode;
};

export const GUILabel = ({ children }: GUILabelProps) => (
  // Keep "guilabel" className: mongodb-docs.css uses it to switch this back to
  // italic when nested in a heading (h1 .guilabel, h2 .guilabel, ...).
  <Text elementType="span" className={clsx('guilabel', styles.guilabel)}>
    {children}
  </Text>
);
