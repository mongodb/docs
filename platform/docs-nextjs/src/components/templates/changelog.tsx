'use client';

import { cx } from '@leafygreen-ui/emotion';
import type { BaseTemplateProps } from '.';
import changelogStyles from './changelog.module.scss';
import OfflineBanner from '@/components/banner/offline-banner';
import { getFullSlug } from '@/utils/get-full-slug';
import { useVersionContext } from '@/context/version-context';
import { usePageContext } from '@/context/page-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

const ChangelogTemplate = ({ children }: BaseTemplateProps) => {
  const { siteBasePrefixWithVersion } = useVersionContext();
  const { slug: pageSlug } = usePageContext();
  return (
    <div className={cx(changelogStyles['changelog-template'], 'changelog-template')}>
      <main className={cx(changelogStyles['changelog-wrapper'], 'changelog-wrapper')}>
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
