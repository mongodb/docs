'use client';

import { CodeContext } from '@/context/code-context';

export type OutputProps = {
  children: React.ReactNode;
  /** Controls initial visibility of the output panel. IoCodeBlock reads
   * this prop via React.Children — it is not used for rendering here.
   */
  visible?: boolean;
};

// Output code blocks must not participate in the page's driver-tab language
// switcher. Providing an empty CodeContext prevents the Code component from
// picking up languageOptions from surrounding tab context, which would:
// (1) show an unwanted language-switcher dropdown in the header, and
// (2) override the block's lang with the active tab language, breaking colors.
//
// Output panels follow the page theme (light in light mode, dark in dark
// mode) by inheriting darkMode from the surrounding LeafyGreenProvider —
// they are intentionally not forced dark.
const emptyCodeContext = { codeBlockLanguage: undefined, languageOptions: [] };

export const Output = ({ children }: OutputProps) => (
  <CodeContext.Provider value={emptyCodeContext}>{children}</CodeContext.Provider>
);
