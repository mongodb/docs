import type { ReactElement } from 'react';
import { ViaProvider } from '@via-ds/components/provider';
import { ColorScheme, Size } from '@via-ds/components/types';

interface TestWrapperProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

/**
 * Test wrapper that provides the Via context components need to render in Jest tests.
 */
export function TestWrapper({ children, darkMode = false }: TestWrapperProps): ReactElement {
  return (
    <ViaProvider size={Size.Large} colorScheme={darkMode ? ColorScheme.Dark : ColorScheme.Light}>
      {children}
    </ViaProvider>
  );
}
