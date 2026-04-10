'use client';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

export type OutputProps = {
  children: React.ReactNode;
  /** Controls initial visibility of the output panel. IoCodeBlock reads
   * this prop via React.Children — it is not used for rendering here.
   */
  visible?: boolean;
};

export const Output = ({ children }: OutputProps) => (
  <LeafyGreenProvider darkMode={true}>{children}</LeafyGreenProvider>
);
