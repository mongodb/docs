'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Breadcrumbs from '@/components/breadcrumbs';
import MainColumn from './main-column';
import type { BaseTemplateProps } from '.';

const DocumentContainer = styled('div')`
  display: grid;
  grid-template-areas: 'main right';
  grid-template-columns: minmax(${theme.size.xlarge}, auto) 1fr;
`;

const StyledMainColumn = styled(MainColumn)`
  grid-area: main;
`;

const DriversIndexTemplate = ({ children }: BaseTemplateProps) => {
  return (
    <DocumentContainer>
      <StyledMainColumn>
        <div className="body">
          <Breadcrumbs />
          {children}
        </div>
      </StyledMainColumn>
    </DocumentContainer>
  );
};

export default DriversIndexTemplate;
