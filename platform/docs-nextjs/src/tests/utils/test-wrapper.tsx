import type { ReactElement } from 'react';
import { CacheProvider } from '@emotion/react';
import LGProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { cache } from '@leafygreen-ui/emotion';

interface TestWrapperProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

/**
 * Test wrapper that provides the necessary context for LeafyGreen components
 * to render properly in Jest tests, including Emotion CSS-in-JS injection.
 */
export function TestWrapper({ children, darkMode = false }: TestWrapperProps): ReactElement {
  return (
    <CacheProvider value={cache}>
      <LGProvider darkMode={darkMode} baseFontSize={BaseFontSize.Body2}>
        {children}
      </LGProvider>
    </CacheProvider>
  );
}

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithProviders(ui: ReactElement, { darkMode = false, ...renderOptions } = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <TestWrapper darkMode={darkMode}>{children}</TestWrapper>
  );

  return { Wrapper, ...renderOptions };
}
