import { franc } from 'franc';

export interface LanguageFlag {
  /** The offending segment's text. */
  segment: string;
  /** The ISO 639-3 code the detector returned for it. */
  detected: string;
}

/** Maps the tool's locales to the ISO 639-3 codes `franc` returns. */
export const LOCALE_TO_ISO639_3: Record<string, string> = {
  en: 'eng',
  es: 'spa',
  'pt-br': 'por',
  'ko-kr': 'kor',
  'ja-jp': 'jpn',
  'zh-cn': 'cmn',
};

/** Returns an ISO 639-3 code, or 'und' when the language is undetermined. */
export type DetectFn = (text: string, candidates: string[]) => string;

export function francDetect(text: string, candidates: string[]): string {
  return franc(text, { only: candidates, minLength: 10 });
}

const URL_RE = /\S+:\/\/\S+/g;
const MIN_SEGMENT_CHARS = 20;
const MIN_LETTERS = 10;
const MIN_LETTER_RATIO = 0.7;
const CODE_START_RE = /^(?:(?:import|const|let|var|function|return|await|export|class)\b|use |db\.|sh\.|rs\.)/;
const METHOD_CALL_RE = /\b\w+\.\w+\s*\(/;

function looksLikeCode(s: string): boolean {
  return (
    s.includes('=>') ||
    /[{}]/.test(s) ||
    s.endsWith(';') ||
    CODE_START_RE.test(s) ||
    METHOD_CALL_RE.test(s)
  );
}

function segment(text: string): string[] {
  return text.split('\n').map((s) => s.trim()).filter(Boolean);
}

/**
 * True for segments LID cannot judge: too short, code-like (code syntax or
 * low letter density), or consisting only of URLs, numbers, and configured
 * terms.
 */
export function isException(seg: string, terms: string[]): boolean {
  if (seg.length < MIN_SEGMENT_CHARS) return true;
  let s = seg.replace(URL_RE, ' ');
  for (const term of terms) s = s.split(term).join(' ');
  s = s.trim();
  if (looksLikeCode(s)) return true;
  const letters = (s.match(/\p{L}/gu) ?? []).length;
  if (letters < MIN_LETTERS) return true;
  const nonSpace = s.replace(/\s/g, '').length;
  return nonSpace > 0 && letters / nonSpace < MIN_LETTER_RATIO;
}

/**
 * Fraction of judgeable segments detected in the target locale, plus the
 * segments detected in any other language (untranslated source or a third
 * language). Segments the detector cannot decide ('und') are not counted.
 */
export function languageIntegrity(
  output: string,
  targetLocale: string,
  terms: string[],
  detect: DetectFn = francDetect,
): { score: number; flags: LanguageFlag[] } {
  const target = LOCALE_TO_ISO639_3[targetLocale];
  if (!target) throw new Error(`no ISO 639-3 mapping for locale "${targetLocale}"`);

  const candidates = [...new Set(Object.values(LOCALE_TO_ISO639_3))];

  const segments = segment(output).filter((s) => !isException(s, terms));
  const flags: LanguageFlag[] = [];
  let counted = 0;
  for (const s of segments) {
    const detected = detect(s, candidates);
    if (detected === 'und') continue;
    counted++;
    if (detected !== target) flags.push({ segment: s, detected });
  }
  const score = counted === 0 ? 1 : (counted - flags.length) / counted;
  return { score, flags };
}
