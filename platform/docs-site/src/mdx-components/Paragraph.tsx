'use client';

import { createContext, useContext } from 'react';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import styles from './paragraph.module.scss';

export type ParagraphProps = {
  children?: React.ReactNode;
  skipPTag?: boolean;
};

/**
 * Context that signals Paragraph to skip its Body wrapper and return children directly.
 * Used by table header cells to match snooty's skipPTag=true behavior, so header text
 * inherits font-weight: 600 from the <th> rather than being reset to 400 by LG Body.
 */
export const SkipPTagContext = createContext(false);

export const Paragraph = ({ children, skipPTag = false }: ParagraphProps) => {
  const contextSkip = useContext(SkipPTagContext);
  // For paragraph nodes that appear inside certain containers, skip <p> tags and just render their contents
  if (skipPTag || contextSkip) return <>{children}</>;

  return (
    <Text textStyle={TextStyle.body} size={Size.Large} className={styles.paragraph}>
      {children}
    </Text>
  );
};
