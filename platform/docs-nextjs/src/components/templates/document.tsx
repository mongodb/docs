'use client';

import { theme } from '@/styles/theme';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { InternalPageNav } from '../internal-page-nav';
import MainColumn from './main-column';
import RightColumn from '@/components/right-column';
import documentStyling from './document.module.scss';
import Contents from '@/components/contents';
import { usePageContext } from '@/context/page-context';
import TabSelectors from '@/components/tabs/tab-selectors';
import DismissibleSkillsCard from '@/components/dismissable-skills-card';
import type { BaseTemplateProps } from '.';
import { cx } from '@leafygreen-ui/emotion';
import Breadcrumbs from '@/components/breadcrumbs';

const MAX_ON_THIS_PAGE_WIDTH = '200px';
const MAX_CONTENT_WIDTH = '775px';
const MAX_CONTENT_WIDTH_LARGE_SCREEN = '884px';
// (max content width along with padding + max "On This Page" width along with padding)
export const DOCUMENT_TEMPLATE_MAX_WIDTH_VALUE = `(${MAX_CONTENT_WIDTH} + ${theme.size.xlarge} * 2) + (${MAX_ON_THIS_PAGE_WIDTH} + 5px + ${theme.size.medium})`;
export const DOCUMENT_TEMPLATE_MAX_WIDTH_VALUE_LARGE_SCREEN = `(${MAX_CONTENT_WIDTH_LARGE_SCREEN} + ${theme.size.xlarge} * 2) + (${MAX_ON_THIS_PAGE_WIDTH} + 5px + ${theme.size.medium})`;

export default function DocumentTemplate({ children, slug, pageOptions }: BaseTemplateProps) {
  const { slugToBreadcrumbLabel, toctreeOrder } = useSnootyMetadata();
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
          {showPrevNext && (
            <InternalPageNav slug={slug} slugTitleMapping={slugToBreadcrumbLabel ?? {}} toctreeOrder={toctreeOrder} />
          )}
        </div>
      </MainColumn>
      <RightColumn hasDismissibleSkillsCard={!!dismissibleSkillsCard} className={documentStyling['right-column']}>
        {!!dismissibleSkillsCard && (
          <DismissibleSkillsCard skill={dismissibleSkillsCard.skill} url={dismissibleSkillsCard.url} slug={slug} />
        )}
        {!hasMethodSelector && !tabsMainColumn && <TabSelectors rightColumn={true} />}
        <Contents />
      </RightColumn>
    </div>
  );
}
