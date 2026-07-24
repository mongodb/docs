/**
 * Returns the specified language if it is valid, otherwise returns none
 */
import { Language } from '@leafygreen-ui/code';

// Mapping of formal language names based on loose inputs
const LANGUAGE_NAMES = {
  bash: 'Bash',
  c: 'C',
  cpp: 'C++',
  'c#': 'C#',
  cs: 'C#',
  csharp: 'C#',
  dart: 'Dart',
  diff: 'Diff',
  go: 'Golang',
  golang: 'Golang',
  graphql: 'GraphQL',
  groovy: 'Groovy',
  html: 'HTML',
  http: 'HTTP',
  ini: 'Ini',
  java: 'Java',
  javascript: 'JavaScript',
  js: 'JavaScript',
  json: 'JSON',
  kotlin: 'Kotlin',
  objectivec: 'Objective-C',
  perl: 'Perl',
  php: 'PHP',
  properties: 'Properties',
  python: 'Python',
  ruby: 'Ruby',
  rust: 'Rust',
  scala: 'Scala',
  sh: 'Shell',
  shell: 'Shell',
  sql: 'SQL',
  swift: 'Swift',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  xml: 'XML',
  yaml: 'YAML',
};

export const getLanguage = (lang: string) => {
  if (Object.values(Language).includes(lang as Language)) {
    return lang;
  } else if (lang === 'sh') {
    // Writers commonly use 'sh' to represent shell scripts, but LeafyGreen and Highlight.js use the key 'shell'
    return 'shell';
  } else if (['c', 'cpp'].includes(lang)) {
    // LeafyGreen renders C and C++ languages with "cs"
    return 'cs';
  }
  return 'none';
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
