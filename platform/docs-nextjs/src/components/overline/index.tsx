'use client';

import type { ReactNode } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Overline as LGOverline } from '@leafygreen-ui/typography';

const overlineBaseStyling = css`
  margin-top: 48px;
  margin-bottom: 0px;
  color: var(--font-color-light);
`;

export type OverlineProps = {
  children: ReactNode;
  className: string;
};

const Overline = ({ className, children }: OverlineProps) => {
  return <LGOverline className={cx(overlineBaseStyling, className)}>{children}</LGOverline>;
};

export default Overline;
