import { type ReactNode, createContext, useContext, useMemo } from 'react';
import { type CodeLanguage, NONE_LANGUAGE } from '@via-ds/components/code-block';
import { LanguageName } from '@via-ds/components/code-core';
import { TabContext } from '@/context/tabs-context';
import type { ASTNode } from '@/types/ast';
import { getPlaintext } from '@/utils/get-plaintext';

interface CodeContextType {
  codeBlockLanguage: string | undefined;
  languageOptions: LanguageOption[];
}

export type LanguageOption = {
  id: string;
  displayName: string;
  language: CodeLanguage;
};

const defaultContextValue = {
  codeBlockLanguage: undefined,
  languageOptions: [],
};

const CodeContext = createContext<CodeContextType>(defaultContextValue);

const LANGUAGES = new Set<string>(Object.values(LanguageName));

type DriverLanguageMappingKey = 'cs' | 'javascript' | 'python';

// Custom mapping for unique drivers that don't have an exact 1:1 name to a Via language
const DRIVER_LANGUAGE_MAPPING: {
  [k in DriverLanguageMappingKey]: Set<string>;
} = {
  cs: new Set(['c', 'cpp']),
  javascript: new Set(['compass', 'nodejs', 'shell']),
  python: new Set(['motor']),
};

// Typeguard for below checking if value is a valid language
function isLanguage(value: string): value is LanguageName {
  return LANGUAGES.has(value);
}

// Returns the Via-supported language that corresponds with one of our documented drivers
const getDriverLanguage = (driverArg: string): CodeLanguage => {
  // Simplifies driver to language matching for drivers like "java-sync"
  const driver = driverArg?.split('-')[0];

  for (const [language, driversSet] of Object.entries(DRIVER_LANGUAGE_MAPPING)) {
    if (driversSet.has(driver) && LANGUAGES.has(language)) {
      return language as DriverLanguageMappingKey;
    }
  }

  if (isLanguage(driver)) {
    return driver;
  }

  return NONE_LANGUAGE;
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
