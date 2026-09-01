'use client';

import type { BaseTemplateProps } from '.';
import styles from './changelog.module.scss';
import { OfflineBanner } from '@/mdx-components/Banner/OfflineBanner';
import { getFullSlug } from '@/utils/get-full-slug';
import { useVersionContext } from '@/context/version-context';
import { usePageContext } from '@/context/page-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

const ChangelogTemplate = ({ children }: BaseTemplateProps) => {
  const { siteBasePrefixWithVersion } = useVersionContext();
  const { slug: pageSlug } = usePageContext();
  return (
    <div className={styles.changelogTemplate}>
      <main className={styles.changelogWrapper}>
        {isOfflineBuild && (
          <OfflineBanner
            linkUrl={'https://mongodb.com/' + getFullSlug(pageSlug, siteBasePrefixWithVersion)}
            template="changelog"
          />
        )}
        {children}
      </main>
    </div>
  );
};

export default ChangelogTemplate;
