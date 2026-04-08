'use client';

import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { VersionContextProvider } from '@/context/version-context';
import { UnifiedTocProvider } from '@/context/unified-toc-context';
import { PageContextProvider } from '@/context/page-context';
import { HeadingContextProvider } from '@/context/heading-context';
import { ContentsProvider } from '@/context/contents-context';
import { SidenavContextProvider } from '@/context/sidenav-context';
import { TabProvider } from '@/context/tabs-context';
import { ChatbotProvider } from '@/context/chatbot-context';
import { Header } from '@/mdx-components/Header';
import { UnifiedSidenav } from '@/mdx-components/UnifiedSidenav';
import { ActionBar } from '@/mdx-components/ActionBar';
import { SearchResults } from '@/mdx-components/SearchResults';
import layoutStyles from '@/app/docs/[...path]/layout.module.scss';
import type { Docset, RemoteMetadata } from '@/types/data';
import type { TextNode, TocTreeEntry } from '@/types/ast';
import type { Environments } from '@/utils/env-config';

interface SearchPageContentProps {
  docsets: Docset[];
  env: Environments;
  cookies: Record<string, string>;
}

const SEARCH_SLUG = 'docs/search';

const EMPTY_METADATA: RemoteMetadata = {
  project: '',
  branch: '',
  title: 'Search',
  eol: false,
  slugToTitle: {} as Record<string, [TextNode]>,
  toctree: { slug: '', title: '', children: [] } as unknown as TocTreeEntry,
  toctreeOrder: [],
  parentPaths: {},
  static_files: {},
};

export function SearchPageContent({ docsets, env }: SearchPageContentProps) {
  return (
    <MetadataProvider value={EMPTY_METADATA}>
      <VersionContextProvider docsets={docsets} slug={SEARCH_SLUG} env={env}>
        <UnifiedTocProvider>
          <PageContextProvider slug={SEARCH_SLUG} template="search" tabsMainColumn={null} options={null}>
            <HeadingContextProvider sectionDepth={0}>
              <ContentsProvider headingNodes={[]}>
                <SidenavContextProvider>
                  <TabProvider>
                    <ChatbotProvider>
                      <Header />
                      <UnifiedSidenav />
                      <div className={layoutStyles['content-container']}>
                        <ActionBar template="search" sidenav={true} />
                        <main>
                          <SearchResults />
                        </main>
                      </div>
                    </ChatbotProvider>
                  </TabProvider>
                </SidenavContextProvider>
              </ContentsProvider>
            </HeadingContextProvider>
          </PageContextProvider>
        </UnifiedTocProvider>
      </VersionContextProvider>
    </MetadataProvider>
  );
}
