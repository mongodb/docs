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

export default function DocumentTemplate({ children, pageOptions }: BaseTemplateProps) {
  const { tabsMainColumn } = usePageContext();
  const hasMethodSelector = pageOptions?.has_method_selector;

  const showPrevNext = !(pageOptions?.noprevnext === '' || pageOptions?.template === 'guide');
  const dismissibleSkillsCard = pageOptions?.dismissible_skills_card;

  return (
    <div className={cx(documentStyling.document, 'document-template')}>
      <MainColumn className={documentStyling['main-column']}>
        <div className="body">
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
