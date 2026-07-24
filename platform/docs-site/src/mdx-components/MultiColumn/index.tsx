'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const StyledMultiColumn = styled('div')`
  display: flex;
  gap: ${theme.size.xxlarge};
  margin-top: 60px;
  margin-bottom: 40px;

  @media ${theme.screenSize.upToLarge} {
    flex-direction: column;
    gap: ${theme.size.xlarge};
  }

  @media ${theme.screenSize.upToSmall} {
    gap: 40px;
  }
`;

export type MultiColumnProps = {
  children: React.ReactNode;
};

export const MultiColumn = ({ children }: MultiColumnProps) => <StyledMultiColumn>{children}</StyledMultiColumn>;
