'use client';

import { ChatbotProvider } from '@/context/chatbot-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { HeadingContextProvider } from '@/context/heading-context';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // TODO: fix this value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <MetadataProvider value={{} as any}>
      <HeadingContextProvider sectionDepth={0}>
        <ChatbotProvider>{children}</ChatbotProvider>
      </HeadingContextProvider>
    </MetadataProvider>
  );
};
