'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

type RedProps = {
  children: React.ReactNode;
};

const redStyles = css`
  color: ${palette.red.dark2};

  .dark-theme & {
    color: ${palette.red.light1};
  }
`;

export const Red = ({ children }: RedProps) => <strong className={cx(redStyles)}>{children}</strong>;
