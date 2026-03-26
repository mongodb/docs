'use client';

import { cx, css } from '@leafygreen-ui/emotion';
import { Overline } from './Overline';
import { theme } from '@/styles/theme';

export const kickerBaseStyle = css`
  p {
    grid-column: 2;
    @media ${theme.screenSize.upToSmall} {
      padding-top: 56px;
    }
    @media ${theme.screenSize.upToXSmall} {
      padding-top: ${theme.size.large};
    }
    
    font-size: 12px; !important;
    font-weight: 700;
  }
`;

type KickerProps = {
  children: React.ReactNode;
};

export const Kicker = ({ children }: KickerProps) => {
  return <Overline className={cx(kickerBaseStyle)}>{children}</Overline>;
};
