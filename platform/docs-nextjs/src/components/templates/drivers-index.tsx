'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
// import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
// TODO: DOP-5962 add breadcrumbs
// import Breadcrumbs from '../components/Breadcrumbs';
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

const DriversIndexTemplate = ({ children, slug }: BaseTemplateProps) => {
  //   const { title, parentPaths } = useSnootyMetadata();
  return (
    <DocumentContainer>
      <StyledMainColumn>
        <div className="body">
          {/* <Breadcrumbs parentPathsProp={parentPaths[slug]} siteTitle={title} slug={slug} /> */}
          {children}
        </div>
      </StyledMainColumn>
    </DocumentContainer>
  );
};

export default DriversIndexTemplate;
