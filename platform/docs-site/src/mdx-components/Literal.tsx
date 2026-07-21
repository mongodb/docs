'use client';

import { InlineCode } from '@leafygreen-ui/typography';
import { css, cx } from '@leafygreen-ui/emotion';

const inlineCodeStyling = css`
  /* Unset font size so it inherits it from its context */
  font-size: unset;
  display: inline;
  color: var(--font-color-primary);
  background: var(--background-color-secondary);
  word-wrap: break-word;
  white-space: unset;

  a & {
    color: inherit;
  }
`;

export type LiteralProps = {
  children: React.ReactNode;
};

export const Literal = ({ children }: LiteralProps) => (
  <InlineCode className={cx(inlineCodeStyling)}>{children}</InlineCode>
);
