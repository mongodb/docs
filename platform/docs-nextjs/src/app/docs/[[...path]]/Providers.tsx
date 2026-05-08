'use client';

import { ChatbotProvider } from '@/context/chatbot-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { HeadingContextProvider } from '@/context/heading-context';
import type { RemoteMetadata, Docset } from '@/types/data';
import { UnifiedTocProvider } from '@/context/unified-toc-context';
import { ContentsProvider } from '@/context/contents-context';
import type { MDXFrontmatter } from '@/types/ast';
import { InstruqtProvider } from '@/context/instruqt-context';
import { PageContextProvider } from '@/context/page-context';
import { TabProvider } from '@/context/tabs-context';
import { VersionContextProvider } from '@/context/version-context';
import type { Environments } from '@/utils/env-config';
import { FootnoteProvider } from '@/context/footnote-context';
import type { ServerSideChangelogData } from '@/types/openapi';
import { ChangelogDataProvider } from '@/context/changelog-context';
import { SidenavContextProvider } from '@/context/sidenav-context';

type Template = NonNullable<MDXFrontmatter['template']>;

interface ProvidersProps {
  children: React.ReactNode;
  metadata: RemoteMetadata;
  frontmatter: MDXFrontmatter;
  slug: string;
  template: Template | null;
  docsets: Docset[];
  env: Environments;
  changelogData?: ServerSideChangelogData;
}

export const Providers = ({
  children,
  metadata,
  frontmatter,
  changelogData,
  slug,
  template,
  docsets,
  env,
}: ProvidersProps) => {
  const headingNodes = frontmatter.options?.headings || [];

  return (
    <MetadataProvider value={metadata}>
      <VersionContextProvider docsets={docsets} slug={slug} env={env}>
        <UnifiedTocProvider>
          <PageContextProvider
            fileId={frontmatter.fileId}
            slug={slug}
            template={template}
            tabsMainColumn={frontmatter.options?.['tabs-selector-position'] === 'main'}
            options={frontmatter.options}
          >
            <HeadingContextProvider sectionDepth={0}>
              <ContentsProvider headingNodes={headingNodes}>
                <SidenavContextProvider>
                  <TabProvider
                    selectors={frontmatter.options?.selectors}
                    defaultTabs={frontmatter.options?.default_tabs}
                  >
                    <InstruqtProvider hasLabDrawer={!!frontmatter.options?.instruqt}>
                      <FootnoteProvider>
                        <ChatbotProvider>
                          <ChangelogDataProvider changelogData={changelogData}>{children}</ChangelogDataProvider>
                        </ChatbotProvider>
                      </FootnoteProvider>
                    </InstruqtProvider>
                  </TabProvider>
                </SidenavContextProvider>
              </ContentsProvider>
            </HeadingContextProvider>
          </PageContextProvider>
        </UnifiedTocProvider>
      </VersionContextProvider>
    </MetadataProvider>
  );
};
