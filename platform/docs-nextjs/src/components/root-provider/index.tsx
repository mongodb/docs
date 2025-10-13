/**
 * RootProvider component
 * Provides server side data to the Client Components in the app
 * via Context Providers
 *
 */

'use client';

import type { ASTDocument } from '@/services/db/pages';
import { FootnoteProvider } from '../footnote/footnote-context';
import { ContentsProvider } from '@/context/contents-context';
import type { RemoteMetadata } from '@/types/data';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { PageContext } from '@/context/page-context';
import { TabProvider } from '@/context/tabs-context';

const getPageSlug = (pageId: ASTDocument['page_id']) => {
  return pageId === 'index' ? '/' : pageId;
};

const RootProvider = ({
  children,
  metadata,
  page,
}: {
  children?: React.ReactNode;
  metadata?: RemoteMetadata;
  page: ASTDocument;
}) => {
  const pageNodes = page.ast.children || [];
  const headingNodes = page.ast.options.headings || [];

  return (
    <PageContext.Provider
      value={{
        page: page.ast,
        slug: getPageSlug(page.page_id),
        template: page.ast.options?.template,
        tabsMainColumn: page.ast.options?.['tabs-selector-position'] === 'main',
        options: page.ast.options,
      }}
    >
      <MetadataProvider value={metadata}>
        <FootnoteProvider pageNodes={pageNodes}>
          <ContentsProvider headingNodes={headingNodes}>
            <TabProvider selectors={page.ast.options.selectors} defaultTabs={page.ast.options.default_tabs}>
              {children}
            </TabProvider>
          </ContentsProvider>
        </FootnoteProvider>
      </MetadataProvider>
    </PageContext.Provider>
  );
};

export default RootProvider;
