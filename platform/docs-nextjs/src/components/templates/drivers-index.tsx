'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Breadcrumbs from '@/components/breadcrumbs';
import MainColumn from './main-column';
import type { BaseTemplateProps } from '.';
import OfflineBanner from '@/components/banner/offline-banner';
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
