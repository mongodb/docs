'use client';

import { ChatbotProvider } from '@/context/chatbot-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { HeadingContextProvider } from '@/context/heading-context';
import type { RemoteMetadata, Docset } from '@/types/data';
import { UnifiedTocProvider } from '@/context/unified-toc-context';
import { ContentsProvider } from '@/context/contents-context';
import type { MDXFrontmatter } from './custom-template';
import { InstruqtProvider } from '@/context/instruqt-context';
import { PageContextProvider } from '@/context/page-context';
import { TabProvider } from '@/context/tabs-context';
import { VersionContextProvider } from '@/context/version-context';
import type { Environments } from '@/utils/env-config';

type Template = NonNullable<MDXFrontmatter['template']>;
import { FootnoteProvider } from '@/context/footnote-context';

interface ProvidersProps {
  children: React.ReactNode;
  metadata: RemoteMetadata;
  frontmatter: MDXFrontmatter;
  slug: string;
  template: Template | null;
  docsets: Docset[];
  env: Environments;
}

export const Providers = ({ children, metadata, frontmatter, slug, template, docsets, env }: ProvidersProps) => {
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
                <TabProvider selectors={frontmatter.options?.selectors} defaultTabs={frontmatter.options?.default_tabs}>
                  <InstruqtProvider hasLabDrawer={!!frontmatter.options?.instruqt}>
                    <FootnoteProvider>
                      <ChatbotProvider>{children}</ChatbotProvider>
                    </FootnoteProvider>
                  </InstruqtProvider>
                </TabProvider>
              </ContentsProvider>
            </HeadingContextProvider>
          </PageContextProvider>
        </UnifiedTocProvider>
      </VersionContextProvider>
    </MetadataProvider>
  );
};
