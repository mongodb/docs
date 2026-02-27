'use client';

import { InternalPageNav } from '@/components/internal-page-nav';
import RightColumn from '@/components/right-column';
import documentStyling from './document.module.scss';
import Contents from '@/components/contents';
import { usePageContext } from '@/context/page-context';
import TabSelectors from '@/components/tabs/tab-selectors';
import DismissibleSkillsCard from '@/components/dismissable-skills-card';
import type { BaseTemplateProps } from '.';
import MainColumn from './main-column';
import { cx } from '@leafygreen-ui/emotion';
import Breadcrumbs from '@/components/breadcrumbs';
import OfflineBanner from '@/components/banner/offline-banner';
import { getFullSlug } from '@/utils/get-full-slug';
import { useVersionContext } from '@/context/version-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

export default function DocumentTemplate({ children, pageOptions }: BaseTemplateProps) {
  const { tabsMainColumn, slug: pageSlug } = usePageContext();
  const { siteBasePrefixWithVersion } = useVersionContext();
  const hasMethodSelector = pageOptions?.has_method_selector;

  const showPrevNext = !(pageOptions?.noprevnext === '' || pageOptions?.template === 'guide');
  const dismissibleSkillsCard = pageOptions?.dismissible_skills_card;

  return (
    <div className={cx(documentStyling.document, 'document-template')}>
      <MainColumn className={documentStyling['main-column']}>
        <div className="body">
          {isOfflineBuild && (
            <OfflineBanner
              linkUrl={'https://mongodb.com/' + getFullSlug(pageSlug, siteBasePrefixWithVersion)}
              template="document"
            />
          )}
          <Breadcrumbs />
          {children}
          {showPrevNext && <InternalPageNav />}
        </div>
      </MainColumn>
      <RightColumn hasDismissibleSkillsCard={!!dismissibleSkillsCard} className={documentStyling['right-column']}>
        {!!dismissibleSkillsCard && (
          <DismissibleSkillsCard skill={dismissibleSkillsCard.skill} url={dismissibleSkillsCard.url} />
        )}
        {!hasMethodSelector && !tabsMainColumn && <TabSelectors rightColumn={true} />}
        <Contents />
      </RightColumn>
    </div>
  );
}
