'use client';

import { ChatbotProvider } from '@/context/chatbot-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { HeadingContextProvider } from '@/context/heading-context';
import type { RemoteMetadata } from '@/types/data';
import { UnifiedTocProvider } from '@/context/unified-toc-context';
import { ContentsProvider } from '@/context/contents-context';
import type { MDXFrontmatter } from './custom-template';
import { InstruqtProvider } from '@/context/instruqt-context';
import { PageContextProvider } from '@/context/page-context';
import { TabProvider } from '@/context/tabs-context';

type Template = NonNullable<MDXFrontmatter['template']>;

interface ProvidersProps {
  children: React.ReactNode;
  metadata: RemoteMetadata;
  frontmatter: MDXFrontmatter;
  slug: string;
  template: Template | null;
}

export const Providers = ({ children, metadata, frontmatter, slug, template }: ProvidersProps) => {
  const headingNodes = frontmatter.options?.headings || [];

  return (
    <MetadataProvider value={metadata}>
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
                  <ChatbotProvider>{children}</ChatbotProvider>
                </InstruqtProvider>
              </TabProvider>
            </ContentsProvider>
          </HeadingContextProvider>
        </PageContextProvider>
      </UnifiedTocProvider>
    </MetadataProvider>
  );
};
