'use client';

import { Callout, CalloutVariant } from '@via-ds/components/callout';
import { Text } from '@via-ds/components/typography';
import { admonitionMap } from './constants';
import styles from './admonition.module.scss';

export type AdmonitionName = 'tip' | 'note' | 'important' | 'warning' | 'example';

export type AdmonitionProps = {
  children: React.ReactNode;
  /** Optional title (plain text). Passed from MDX layer. */
  title?: string;
  name: AdmonitionName;
};

export const Admonition = ({ children, title, name }: AdmonitionProps) => {
  return (
    <Callout className={styles.base} variant={admonitionMap[name] || CalloutVariant.Note} size="large">
      {title && <Text slot="title">{title}</Text>}
      {children}
    </Callout>
  );
};
