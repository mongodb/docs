'use client';

import { InternalPageNav } from '@/mdx-components/InternalPageNav';
import { RightColumn } from '@/mdx-components/RightColumn';
import styles from './document.module.scss';
import { Contents } from '@/mdx-components/Contents';
import { usePageContext } from '@/context/page-context';
import { TabsSelector } from '@/mdx-components/TabsSelector';
import { DismissibleSkillsCard } from '@/mdx-components/DismissibleSkillsCard';
import type { BaseTemplateProps } from '.';
import MainColumn from './main-column';
import Breadcrumbs from '@/mdx-components/Breadcrumbs';
import { OfflineBanner } from '@/mdx-components/Banner/OfflineBanner';
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
    <div className={styles.document}>
      <MainColumn className={styles.mainColumn}>
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
      <RightColumn hasDismissibleSkillsCard={!!dismissibleSkillsCard} className={styles.rightColumn}>
        {!!dismissibleSkillsCard && (
          <DismissibleSkillsCard skill={dismissibleSkillsCard.skill} url={dismissibleSkillsCard.url} />
        )}
        {!hasMethodSelector && !tabsMainColumn && <TabsSelector />}
        <Contents />
      </RightColumn>
    </div>
  );
}
