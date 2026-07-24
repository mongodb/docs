import { ImageContextProvider, type ImageContextType } from '@/context/image-context';
import type { ReactNode } from 'react';

export const withMockImageContext = (context: ImageContextType) => {
  const MockImageContextWrapper = ({ children }: { children: ReactNode }) => (
    <ImageContextProvider value={context}>{children}</ImageContextProvider>
  );

  MockImageContextWrapper.displayName = 'MockImageContextWrapper';
  return MockImageContextWrapper;
};
