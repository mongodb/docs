'use client';

import MainColumn from './main-column';
import type { BaseTemplateProps } from './index';
import mainColumnStyles from './main-column.module.scss';
import OfflineBanner from '../banner/offline-banner';
import { getFullSlug } from '@/utils/get-full-slug';
import { useVersionContext } from '@/context/version-context';
import { usePageContext } from '@/context/page-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

const InstruqtTemplate = ({ children }: BaseTemplateProps) => {
  const { siteBasePrefixWithVersion } = useVersionContext();
  const { slug: pageSlug } = usePageContext();

  return (
    <MainColumn className={mainColumnStyles['instruqt-wrapper']}>
      {isOfflineBuild && (
        <OfflineBanner
          linkUrl={'https://mongodb.com/' + getFullSlug(pageSlug, siteBasePrefixWithVersion)}
          template="instruqt"
        />
      )}
      {children}
    </MainColumn>
  );
};

export default InstruqtTemplate;
