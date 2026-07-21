'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Breadcrumbs from '@/mdx-components/Breadcrumbs';
import MainColumn from './main-column';
import type { BaseTemplateProps } from '.';
import { OfflineBanner } from '@/mdx-components/Banner/OfflineBanner';
import { getFullSlug } from '@/utils/get-full-slug';
import { usePageContext } from '@/context/page-context';
import { useVersionContext } from '@/context/version-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

const DocumentContainer = styled('div')`
  display: grid;
  grid-template-areas: 'main right';
  grid-template-columns: minmax(${theme.size.xlarge}, auto) 1fr;
`;

const StyledMainColumn = styled(MainColumn)`
  grid-area: main;
  max-width: 800px;
`;

const DriversIndexTemplate = ({ children }: BaseTemplateProps) => {
  const { siteBasePrefixWithVersion } = useVersionContext();
  const { slug: pageSlug } = usePageContext();
  return (
    <DocumentContainer>
      <StyledMainColumn>
        <div className="body">
          {isOfflineBuild && (
            <OfflineBanner
              linkUrl={'https://mongodb.com/' + getFullSlug(pageSlug, siteBasePrefixWithVersion)}
              template="drivers-index"
            />
          )}
          <Breadcrumbs />
          {children}
        </div>
      </StyledMainColumn>
    </DocumentContainer>
  );
};

export default DriversIndexTemplate;
