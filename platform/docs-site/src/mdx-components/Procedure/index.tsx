'use client';

import { createContext } from 'react';
import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';

export type ProcedureStyle = 'connected' | 'normal';

export const ProcedureStyleContext = createContext<ProcedureStyle>('connected');

const StyledProcedure = styled('div')<{ procedureStyle: ProcedureStyle }>`
  margin-top: ${theme.size.default};

  .dark-theme & {
    color: ${palette.gray.light2};
    background-color: ${palette.black};
  }

  ${({ procedureStyle }) =>
    procedureStyle === 'connected' &&
    `
    @media ${theme.screenSize.upToLarge} {
      padding-bottom: ${theme.size.large};
    }
    @media ${theme.screenSize.upToSmall} {
      padding-bottom: ${theme.size.medium};
    }
  `}
`;

type ProcedureProps = {
  children: React.ReactNode;
  style?: ProcedureStyle;
  structuredData?: string;
};

export const Procedure = ({ children, style = 'connected', structuredData }: ProcedureProps) => {
  return (
    <ProcedureStyleContext.Provider value={style}>
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />}
      <StyledProcedure procedureStyle={style}>{children}</StyledProcedure>
    </ProcedureStyleContext.Provider>
  );
};
