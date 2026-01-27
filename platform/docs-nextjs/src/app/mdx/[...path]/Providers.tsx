'use client';

import { ChatbotProvider } from '@/context/chatbot-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { HeadingContextProvider } from '@/context/heading-context';
import { UnifiedTocProvider } from '@/context/unified-toc-context';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // TODO: fix this value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <MetadataProvider value={{} as any}>
      <UnifiedTocProvider>
        <HeadingContextProvider sectionDepth={0}>
          <ChatbotProvider>{children}</ChatbotProvider>
        </HeadingContextProvider>
      </UnifiedTocProvider>
    </MetadataProvider>
  );
};
