import { type ReactNode, createContext, useContext, useMemo } from 'react';
import { Language } from '@leafygreen-ui/code';
import { TabContext } from '@/context/tabs-context';
import { getPlaintext } from '../../utils/get-plaintext';
import type { ASTNode } from '@/types/ast';

interface CodeContextType {
  codeBlockLanguage: string | undefined;
  languageOptions: LanguageOption[];
}

export type LanguageOption = {
  id: string;
  displayName: string;
  language: Language;
  image?: JSX.Element;
};

const defaultContextValue = {
  codeBlockLanguage: undefined,
  languageOptions: [],
};

const CodeContext = createContext<CodeContextType>(defaultContextValue);

const LANGUAGES = new Set(Object.values(Language));

type DriverLanguageMappingKey = 'cs' | 'javascript' | 'python';

// Custom mapping for unique drivers that don't have an exact 1:1 name to LG language mapping
const DRIVER_LANGUAGE_MAPPING: {
  [k in DriverLanguageMappingKey]: Set<string>;
} = {
  cs: new Set(['c', 'cpp']),
  javascript: new Set(['compass', 'nodejs', 'shell']),
  python: new Set(['motor']),
};

// Typeguard for below checking if value is a valid language
function isLanguage(value: string): value is Language {
  return LANGUAGES.has(value as Language);
}

// Returns the LG-supported language that corresponds with one of our documented drivers
const getDriverLanguage = (driverArg: string): Language => {
  // Simplifies driver to language matching for drivers like "java-sync"
  const driver = driverArg?.split('-')[0];

  for (const [language, driversSet] of Object.entries(DRIVER_LANGUAGE_MAPPING)) {
    if (driversSet.has(driver) && LANGUAGES.has(language as DriverLanguageMappingKey)) {
      return language as DriverLanguageMappingKey;
    }
  }

  if (isLanguage(driver)) {
    return driver;
  }

  // LG Code default language
  return 'none';
};

// Generates language options for code block based on drivers tabset on current page
const generateLanguageOptions = (selectors: Record<string, Record<string, ASTNode[]>> = {}): LanguageOption[] => {
  const drivers = selectors?.['drivers'];
  const languageOptions = [];

  for (const driver in drivers) {
    languageOptions.push({
      id: driver,
      displayName: getPlaintext(drivers[driver]),
      language: getDriverLanguage(driver),
    });
  }

  return languageOptions;
};

// Returns the display name of the current driver selected
const getCurrentLanguageOption = (languageOptions: LanguageOption[], activeTabs: Record<string, string>) => {
  const currentTab = activeTabs?.drivers;
  if (!currentTab) return;

  const currentLangOption = languageOptions.find((option) => option.id === currentTab);
  // LG Code block's language switcher uses the display name to select the current "language"
  return currentLangOption?.displayName;
};

const CodeProvider = ({ children }: { children: ReactNode }) => {
  const { activeTabs, selectors } = useContext(TabContext);
  const languageOptions = useMemo(
    () => generateLanguageOptions(selectors as unknown as Record<string, Record<string, ASTNode[]>>),
    [selectors],
  );
  const codeBlockLanguage = useMemo(
    () => getCurrentLanguageOption(languageOptions, activeTabs as unknown as Record<string, string>),
    [activeTabs, languageOptions],
  );

  return <CodeContext.Provider value={{ codeBlockLanguage, languageOptions }}>{children}</CodeContext.Provider>;
};

export { CodeContext, CodeProvider };
