'use client';

import type { ReactNode } from 'react';
import styles from './landing.module.scss';
import type { BaseTemplateProps } from '.';
import { getFullSlug } from '@/utils/get-full-slug';
import { OfflineBanner } from '@/mdx-components/Banner/OfflineBanner';
import { useVersionContext } from '@/context/version-context';
import { usePageContext } from '@/context/page-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { websiteSd } from '@/utils/structured-data/website-sd';
import { STRUCTURED_DATA_CLASSNAME } from '@/utils/structured-data/structured-data';

// The Landing template exclusively represents mongodb.com/docs. All other landings use the ProductLanding template
const LandingTemplate = ({ children }: BaseTemplateProps & { children: ReactNode }) => {
  const { slug: pageSlug } = usePageContext();
  const { siteBasePrefixWithVersion } = useVersionContext();
  return (
    <>
      <script
        className={STRUCTURED_DATA_CLASSNAME}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: websiteSd }}
      />
      <div className={styles.landingTemplate}>
        {isOfflineBuild && (
          <OfflineBanner
            linkUrl={'https://mongodb.com/' + getFullSlug(pageSlug, siteBasePrefixWithVersion)}
            template="landing"
          />
        )}
        <main className={styles.wrapper}>{children}</main>
      </div>
    </>
  );
};

export default LandingTemplate;
