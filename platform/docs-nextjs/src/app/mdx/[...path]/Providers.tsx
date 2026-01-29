'use client';

import { ChatbotProvider } from '@/context/chatbot-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { HeadingContextProvider } from '@/context/heading-context';
import type { RemoteMetadata } from '@/types/data';
import { UnifiedTocProvider } from '@/context/unified-toc-context';

interface ProvidersProps {
  children: React.ReactNode;
  metadata: RemoteMetadata;
}

export const Providers = ({ children, metadata }: ProvidersProps) => {
  return (
    <MetadataProvider value={metadata}>
      <UnifiedTocProvider>
        <HeadingContextProvider sectionDepth={0}>
          <ChatbotProvider>{children}</ChatbotProvider>
        </HeadingContextProvider>
      </UnifiedTocProvider>
    </MetadataProvider>
  );
};
