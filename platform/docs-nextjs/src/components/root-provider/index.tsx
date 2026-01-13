/**
 * RootProvider component
 * Provides server side data to the Client Components in the app
 * via Context Providers
 *
 */

'use client';

import { useEffect } from 'react';
import type { ASTDocument } from '@/services/db/pages';
import type { Docset, RemoteMetadata } from '@/types/data';
import { VersionContextProvider } from '@/context/version-context';
import { ContentsProvider } from '@/context/contents-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { PageContextProvider } from '@/context/page-context';
import { TabProvider } from '@/context/tabs-context';
import { FootnoteProvider } from '@/components/footnote/footnote-context';
import type { PageTemplateType } from '@/types/ast';
import { InstruqtProvider } from '@/context/instruqt-context';
import { ImageContextProvider, type ImageContextType } from '@/context/image-context';
import type { Environments } from '@/utils/env-config';
import { SidenavContextProvider } from '@/context/sidenav-context';
import { UnifiedTocProvider } from '@/context/unified-toc-context';
import { CookiesProvider } from '@/context/cookies-context';
import { ChangelogDataProvider } from '@/context/changelog-context';
import type { ServerSideChangelogData } from '@/types/openapi';
import { ChatbotProvider } from '@/context/chatbot-context';
import { scrollActiveSidenavIntoView } from '@/utils/scroll-active-sidenav-into-view';
import { HeadingContextProvider } from '@/context/heading-context';

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
  changelogData?: ServerSideChangelogData;
  template: PageTemplateType;
}

const RootProvider = ({
  cookies,
  children,
  metadata,
  page,
  assets,
  docsets,
  env,
  template,
  changelogData,
}: RootProviderProps) => {
  const pageNodes = page.ast.children || [];
  const headingNodes = page.ast.options?.headings || [];

  // Scroll active sidenav item into view on initial page load
  useEffect(() => {
    // Small delay to ensure sidenav DOM is fully rendered
    const timeoutId = setTimeout(() => {
      scrollActiveSidenavIntoView();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <MetadataProvider value={metadata}>
      <CookiesProvider cookies={cookies}>
        <VersionContextProvider docsets={docsets} slug={getPageSlug(page.filename)} env={env}>
          <UnifiedTocProvider>
            <PageContextProvider
              page={page.ast}
              slug={getPageSlug(page.filename)}
              template={template}
              tabsMainColumn={page.ast.options?.['tabs-selector-position'] === 'main'}
              options={page.ast.options}
            >
              {/* Initialize HeadingContext at page level for h1 */}
              <HeadingContextProvider sectionDepth={0}>
                <FootnoteProvider pageNodes={pageNodes}>
                  <ContentsProvider headingNodes={headingNodes}>
                    <SidenavContextProvider>
                      <TabProvider selectors={page.ast.options?.selectors} defaultTabs={page.ast.options?.default_tabs}>
                        <InstruqtProvider hasLabDrawer={!!page.ast.options?.instruqt}>
                          <ImageContextProvider value={assets}>
                            <ChatbotProvider>
                              <ChangelogDataProvider changelogData={changelogData}>{children}</ChangelogDataProvider>
                            </ChatbotProvider>
                          </ImageContextProvider>
                        </InstruqtProvider>
                      </TabProvider>
                    </SidenavContextProvider>
                  </ContentsProvider>
                </FootnoteProvider>
              </HeadingContextProvider>
            </PageContextProvider>
          </UnifiedTocProvider>
        </VersionContextProvider>
      </CookiesProvider>
    </MetadataProvider>
  );
};

export default RootProvider;
