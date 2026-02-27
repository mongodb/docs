'use client';

import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import { AncestorComponentContextProvider, useAncestorComponentContext } from '@/context/ancestor-components-context';
import { STRUCTURED_DATA_CLASSNAME } from '@/utils/structured-data/structured-data';

type ProcedureStyle = 'connected' | 'normal';

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

export type ProcedureProps = {
  children?: React.ReactNode;
  style?: ProcedureStyle;
  /** Pre-computed HowTo JSON-LD structured data, generated during AST-to-MDX conversion. */
  structuredData?: string;
};

const Procedure = ({ children, style = 'connected', structuredData }: ProcedureProps) => {
  const ancestors = useAncestorComponentContext();

  return (
    <AncestorComponentContextProvider component={'procedure'}>
      {structuredData && !ancestors.procedure && (
        // using dangerouslySetInnerHTML as JSON is rendered with
        // encoded quotes at build time
        <script
          className={STRUCTURED_DATA_CLASSNAME}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
      <StyledProcedure procedureStyle={style}>{children}</StyledProcedure>
    </AncestorComponentContextProvider>
  );
};

export default Procedure;
