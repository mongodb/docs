/**
 * Returns the specified language if it is valid, otherwise returns none
 */
import { type CodeLanguage, NONE_LANGUAGE } from '@via-ds/components/code-block';
import { LanguageName } from '@via-ds/components/code-core';

const LANGUAGES = new Set<string>(Object.values(LanguageName));

// Mapping of formal language names based on loose inputs
const LANGUAGE_NAMES: Record<LanguageName | 'c#' | 'golang', string> = {
  [LanguageName.Bash]: 'Bash',
  [LanguageName.C]: 'C',
  [LanguageName.Cpp]: 'C++',
  'c#': 'C#',
  [LanguageName.Cs]: 'C#',
  [LanguageName.CSharp]: 'C#',
  [LanguageName.Dart]: 'Dart',
  [LanguageName.Diff]: 'Diff',
  [LanguageName.Go]: 'Golang',
  golang: 'Golang',
  [LanguageName.Graphql]: 'GraphQL',
  [LanguageName.Groovy]: 'Groovy',
  [LanguageName.Html]: 'HTML',
  [LanguageName.Http]: 'HTTP',
  [LanguageName.Ini]: 'Ini',
  [LanguageName.Java]: 'Java',
  [LanguageName.JavaScript]: 'JavaScript',
  [LanguageName.Js]: 'JavaScript',
  [LanguageName.Json]: 'JSON',
  [LanguageName.Kotlin]: 'Kotlin',
  [LanguageName.Markdown]: 'Markdown',
  [LanguageName.ObjectiveC]: 'Objective-C',
  [LanguageName.Perl]: 'Perl',
  [LanguageName.Php]: 'PHP',
  [LanguageName.Properties]: 'Properties',
  [LanguageName.Python]: 'Python',
  [LanguageName.Ruby]: 'Ruby',
  [LanguageName.Rust]: 'Rust',
  [LanguageName.Scala]: 'Scala',
  [LanguageName.Sh]: 'Shell',
  [LanguageName.Shell]: 'Shell',
  [LanguageName.Sql]: 'SQL',
  [LanguageName.Swift]: 'Swift',
  [LanguageName.Ts]: 'TypeScript',
  [LanguageName.TypeScript]: 'TypeScript',
  [LanguageName.Xml]: 'XML',
  [LanguageName.Yaml]: 'YAML',
};

export const getLanguage = (lang: string): CodeLanguage => {
  if (LANGUAGES.has(lang)) {
    return lang as LanguageName;
  }
  return NONE_LANGUAGE;
};

/**
 * @param {string | undefined} lang The language passed to the code block directive
 * @returns {string | undefined} The formal name of the language, if it exists
 */
export const getFullLanguageName = (lang?: string, slug?: string) => {
  const normalizedLang = lang?.toLowerCase() as keyof typeof LANGUAGE_NAMES;
  if (!normalizedLang || ['none', 'text'].includes(normalizedLang)) {
    return undefined;
  }

  const fullLangName = LANGUAGE_NAMES.hasOwnProperty(normalizedLang) ? LANGUAGE_NAMES[normalizedLang] : undefined;
  if (!fullLangName) {
    console.warn(
      `${normalizedLang} in ${slug} does not have a valid language name for structured data SEO. Please contact DOP to add.`,
    );
  }

  return fullLangName;
};
