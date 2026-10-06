'use client';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { CodeContext } from '@/context/code-context';
import { DARK_THEME_CLASSNAME } from '@/context/dark-mode-context';

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
const emptyCodeContext = { codeBlockLanguage: undefined, languageOptions: [] };

// Output blocks are force-rendered dark regardless of page theme. The token
// palette in IOCode/style.ts is keyed off a .dark-theme ancestor, which is
// otherwise only set at the document level — without this class, light-mode
// pages paint light-variant tokens on the dark background (DOP-7345).
export const Output = ({ children }: OutputProps) => (
  <LeafyGreenProvider darkMode={true}>
    <CodeContext.Provider value={emptyCodeContext}>
      <div className={DARK_THEME_CLASSNAME}>{children}</div>
    </CodeContext.Provider>
  </LeafyGreenProvider>
);
