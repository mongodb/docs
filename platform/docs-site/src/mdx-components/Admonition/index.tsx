'use client';

import { Callout, CalloutVariant } from '@via-ds/components/callout';
import { Text } from '@via-ds/components/typography';
import { getTranslator } from '@/internationalization/get-translator';
import { admonitionMap } from './constants';
import styles from './admonition.module.scss';

export type AdmonitionName = 'tip' | 'note' | 'important' | 'warning' | 'example';

const HEADING_KEY = {
  tip: 'admonition.tip',
  note: 'admonition.note',
  important: 'admonition.important',
  warning: 'admonition.warning',
  example: 'admonition.example',
} as const;

export type AdmonitionProps = {
  children: React.ReactNode;
  /** Optional title (plain text). Passed from MDX layer. */
  title?: string;
  name: AdmonitionName;
};

export const Admonition = ({ children, title, name }: AdmonitionProps) => {
  const { t } = getTranslator();
  return (
    <Callout
      className={styles.base}
      variant={admonitionMap[name] || CalloutVariant.Note}
      headingText={t(HEADING_KEY[name] ?? HEADING_KEY.note)}
      size="large"
    >
      {title && <Text slot="title">{title}</Text>}
      {children}
    </Callout>
  );
};
