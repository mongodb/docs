'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import { InlineKeyCode } from '@leafygreen-ui/typography';

type KbdProps = {
  children: React.ReactNode;
};

const darkModeOverwriteStyling = css`
  color: var(--font-color-primary);
  background-color: var(--background-color-primary);
`;

export const Kbd = ({ children }: KbdProps) => (
  <InlineKeyCode className={cx(darkModeOverwriteStyling)}>{children}</InlineKeyCode>
);
