'use client';

import { createContext, useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Body } from '@leafygreen-ui/typography';

const paragraphStyling = css`
  margin-bottom: 16px;
  color: var(--font-color-primary);
`;

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

  return <Body className={cx(paragraphStyling)}>{children}</Body>;
};
