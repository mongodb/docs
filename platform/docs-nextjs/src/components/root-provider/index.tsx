/**
 * RootProvider component
 * Provides server side data to the Client Components in the app
 * via Context Providers
 *
 */

'use client';

import type { ASTDocument } from '@/services/db/pages';
import type { Docset, RemoteMetadata } from '@/types/data';
import { VersionContextProvider } from '@/context/version-context';
import { ContentsProvider } from '@/context/contents-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { PageContext } from '@/context/page-context';
import { TabProvider } from '@/context/tabs-context';
import { FootnoteProvider } from '@/components/footnote/footnote-context';
import type { PageTemplateType } from '@/types/ast';
import { InstruqtProvider } from '@/context/instruqt-context';
import { ImageContextProvider, type ImageContextType } from '@/context/image-context';
import type { Environments } from '@/utils/env-config';
import { UnifiedTocProvider } from '@/context/unified-toc-context';
import { CookiesProvider } from '@/context/cookies-context';

const getPageSlug = (fileName: ASTDocument['filename']) => {
  return fileName === 'index' ? '/' : fileName.replace('.txt', '');
};

interface RootProviderProps {
  children: React.ReactNode;
  cookies: Record<string, string>;
  metadata?: RemoteMetadata;
  page: ASTDocument;
  docsets: Docset[];
  assets: ImageContextType;
  env: Environments;
  template: PageTemplateType;
}

const RootProvider = ({ cookies, children, metadata, page, assets, docsets, env, template }: RootProviderProps) => {
  const pageNodes = page.ast.children || [];
  const headingNodes = page.ast.options?.headings || [];

  return (
    <MetadataProvider value={metadata}>
      <CookiesProvider cookies={cookies}>
        <VersionContextProvider docsets={docsets} slug={getPageSlug(page.filename)} env={env}>
          <UnifiedTocProvider>
            <PageContext.Provider
              value={{
                page: page.ast,
                slug: getPageSlug(page.filename),
                template,
                tabsMainColumn: page.ast.options?.['tabs-selector-position'] === 'main',
                options: page.ast.options,
              }}
            >
              <FootnoteProvider pageNodes={pageNodes}>
                <ContentsProvider headingNodes={headingNodes}>
                  <TabProvider selectors={page.ast.options?.selectors} defaultTabs={page.ast.options?.default_tabs}>
                    <InstruqtProvider hasLabDrawer={!!page.ast.options?.instruqt}>
                      <ImageContextProvider value={assets}>{children}</ImageContextProvider>
                    </InstruqtProvider>
                  </TabProvider>
                </ContentsProvider>
              </FootnoteProvider>
            </PageContext.Provider>
          </UnifiedTocProvider>
        </VersionContextProvider>
      </CookiesProvider>
    </MetadataProvider>
  );
};

export default RootProvider;
