'use client';

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

export const Paragraph = ({ children, skipPTag = false }: ParagraphProps) => {
  // For paragraph nodes that appear inside certain containers, skip <p> tags and just render their contents
  if (skipPTag) return children;

  return <Body className={cx(paragraphStyling)}>{children}</Body>;
};
