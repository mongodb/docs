'use client';

import type { ReactNode } from 'react';
import { theme } from '@/styles/theme';
import type { Root } from '@/types/ast';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { InternalPageNav } from '../internal-page-nav';
import MainColumn from './main-column';
import RightColumn from '@/components/right-column';
import documentStyling from './document.module.scss';
import Contents from '@/components/contents';
import { usePageContext } from '@/context/page-context';
import TabSelectors from '@/components/tabs/tab-selectors';

const MAX_ON_THIS_PAGE_WIDTH = '200px';
const MAX_CONTENT_WIDTH = '775px';
const MAX_CONTENT_WIDTH_LARGE_SCREEN = '884px';
// (max content width along with padding + max "On This Page" width along with padding)
export const DOCUMENT_TEMPLATE_MAX_WIDTH_VALUE = `(${MAX_CONTENT_WIDTH} + ${theme.size.xlarge} * 2) + (${MAX_ON_THIS_PAGE_WIDTH} + 5px + ${theme.size.medium})`;
export const DOCUMENT_TEMPLATE_MAX_WIDTH_VALUE_LARGE_SCREEN = `(${MAX_CONTENT_WIDTH_LARGE_SCREEN} + ${theme.size.xlarge} * 2) + (${MAX_ON_THIS_PAGE_WIDTH} + 5px + ${theme.size.medium})`;

export interface DocumentTemplateProps {
  children: ReactNode;
  slug: string;
  pageOptions?: Root['options'];
}

export default function DocumentTemplate({ children, slug, pageOptions }: DocumentTemplateProps) {
  const { slugToBreadcrumbLabel, toctreeOrder } = useSnootyMetadata();
  const { tabsMainColumn } = usePageContext();
  const hasMethodSelector = pageOptions?.has_method_selector;

  const showPrevNext = !(pageOptions?.noprevnext === '' || pageOptions?.template === 'guide');

  return (
    <div className={documentStyling.document}>
      <MainColumn className={documentStyling['main-column']}>
        <div className="body">
          {/* TODO: breadcrumbs components */}
          {/* <Breadcrumbs siteTitle={title} slug={slug} /> */}
          {children}
          {/* TODO: prev next components */}
          {showPrevNext && (
            <InternalPageNav slug={slug} slugTitleMapping={slugToBreadcrumbLabel ?? {}} toctreeOrder={toctreeOrder} />
          )}
        </div>
      </MainColumn>
      <RightColumn hasDismissibleSkillsCard={false} className={documentStyling['right-column']}>
        {!hasMethodSelector && !tabsMainColumn && <TabSelectors rightColumn={true} />}
        <Contents />
      </RightColumn>
    </div>
  );
}
