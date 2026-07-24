'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const StyledIntroduction = styled('div')`
  .button {
    margin: 0 ${theme.size.default} ${theme.size.default} 0;
    min-height: ${theme.size.large};
  }
  .button + p {
    display: inline-block;
  }
  @media ${theme.screenSize.upToMedium} {
    margin-bottom: ${theme.size.default};

    .button {
      margin-bottom: 0px;
      margin-right: 0px;
    }
    .button + p {
      display: block;
      margin-top: ${theme.size.default};
      margin-bottom: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }
`;

export type IntroductionProps = {
  children: React.ReactNode;
};

export const Introduction = ({ children }: IntroductionProps) => {
  return <StyledIntroduction className="introduction">{children}</StyledIntroduction>;
};
