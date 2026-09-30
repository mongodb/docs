'use client';

import styles from './drivers-index.module.scss';
import Breadcrumbs from '@/mdx-components/Breadcrumbs';
import MainColumn from './main-column';
import type { BaseTemplateProps } from '.';
import { OfflineBanner } from '@/mdx-components/Banner/OfflineBanner';
import { getFullSlug } from '@/utils/get-full-slug';
import { usePageContext } from '@/context/page-context';
import { useVersionContext } from '@/context/version-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

const DriversIndexTemplate = ({ children }: BaseTemplateProps) => {
  const { siteBasePrefixWithVersion } = useVersionContext();
  const { slug: pageSlug } = usePageContext();
  return (
    <div className={styles.documentContainer}>
      <MainColumn className={styles.mainColumn}>
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
      </MainColumn>
    </div>
  );
};

export default DriversIndexTemplate;
