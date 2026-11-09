export interface LocaleTarget {
  repo: string;
  locale: string;
}

export const LOCALE_TARGETS: Record<string, LocaleTarget> = {
  es: { repo: '10gen/docs-mdx-es', locale: 'es' },
  'zh-cn': { repo: '10gen/docs-mdx-zh-cn', locale: 'zh-cn' },
  'ko-kr': { repo: '10gen/docs-mdx-ko-kr', locale: 'ko-kr' },
  'pt-br': { repo: '10gen/docs-mdx-pt-br', locale: 'pt-br' },
  'ja-jp': { repo: '10gen/docs-mdx-ja-jp', locale: 'ja-jp' },
};

export function resolveTarget(locale: string): LocaleTarget {
  const target = LOCALE_TARGETS[locale];
  if (!target) {
    throw new Error(`Unknown locale "${locale}"; known: ${Object.keys(LOCALE_TARGETS).join(', ')}`);
  }
  return target;
}
