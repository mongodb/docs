/**
 * Glossary-terms scorer — matchers.
 *
 * English occurrence finding reuses the translation service's own term matcher,
 * so the scorer and the term sheet always agree on which terms are on a page.
 * Spanish option matching is a port of the manual scoring scripts' fold / stem /
 * slash-variant rules.
 */
import { buildTermSheet, termMatches, variationsOf, type Glossary } from '@mongodb-docs/translation-service';
import type { SegmentPair } from '../../types.js';
import { activeClassifications, type Classifications } from './glossary-classifications.js';

const WORD_CHAR = '[\\p{L}\\p{N}_$#+-]';

/**
 * The adapter's Private Use Area inline tokens. Written as `\u` escapes, never
 * literal PUA characters: a transcription through any ASCII-normalizing view
 * silently turns a literal class into a no-op that matches nothing.
 */
const ADAPTER_TOKEN = /[\u{E000}-\u{F8FF}][A-Z]\d+[\u{E000}-\u{F8FF}]?/gu;

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function tokenPattern(term: string): RegExp {
  return new RegExp(`(?<!${WORD_CHAR})${escapeRegExp(term)}(?!${WORD_CHAR})`, 'giu');
}

/** Occurrences of `term` as a whole token, case-insensitive. */
export function countMatches(text: string, term: string): number {
  return [...text.matchAll(tokenPattern(term))].length;
}

/** `text` with every occurrence of `term` blanked, so shorter terms cannot re-count it. */
export function maskMatches(text: string, term: string): string {
  return text.replace(tokenPattern(term), ' ');
}

/** The adapter's inline tokens present in `text`. */
export function tokensIn(text: string): string[] {
  return [...text.matchAll(ADAPTER_TOKEN)].map((m) => m[0]);
}

/** Lowercase with combining marks removed, so accented and plain forms compare equal. */
export function fold(text: string): string {
  return text.normalize('NFD').replace(/\p{Mn}/gu, '').toLowerCase();
}

/** Ordered as in score.py — 'ciones' is checked before 'es', and that order is load-bearing. */
const SUFFIXES = ['ciones', 'siones', 'ies', 'es', 'as', 'os', 's', 'a', 'o', 'e', 'ar', 'er', 'ir', 'y'];

/** A Spanish word cut back to a stem, only when at least 4 letters remain. */
export function wordStem(word: string): string {
  const folded = fold(word);
  for (const suffix of SUFFIXES) {
    if (folded.length - suffix.length >= 4 && folded.endsWith(suffix)) {
      return folded.slice(0, -suffix.length);
    }
  }
  return folded;
}

/**
 * Patterns for one glossary option. A slash splits gender/number variants
 * ("heredado/heredada"); a variant shorter than 3 letters is dropped, because
 * "primario/a" would otherwise match a bare Spanish article.
 */
export function optionPatterns(option: string): RegExp[] {
  return option
    .split(/\s*\/\s*/)
    .filter((variant) => fold(variant).length >= 3)
    .map((variant) => {
      const stems = variant.split(/\s+/).map((word) => escapeRegExp(wordStem(word)));
      return new RegExp(`(?<!\\w)${stems.join('\\w*\\W+')}`);
    });
}

const OPTION_TOKEN = /[\p{L}\p{N}]+/gu;

/** The single-word D2 rule. Folded equality, stem equality, or a prefix with at most 2 trailing letters. */
export function wordMatches(optionWord: string, corpusWord: string): boolean {
  const o = fold(optionWord);
  const w = fold(corpusWord);
  if (o === w) return true;
  if (wordStem(o) === wordStem(w)) return true;
  const [short, long] = o.length <= w.length ? [o, w] : [w, o];
  return long.startsWith(short) && long.length - short.length <= 2;
}

/**
 * True when any allowed option appears in the raw `spanish` text.
 *
 * A slash splits gender/number variants; a variant shorter than 3 folded letters
 * is dropped, because "primario/a" would otherwise match a bare article. Words
 * split on whitespace AND hyphens, so "map-reduce" matches on either side.
 */
export function hasOptionHit(spanish: string, options: string[]): boolean {
  const tokens = spanish.match(OPTION_TOKEN) ?? [];
  return options.some((option) =>
    option
      .split(/\s*\/\s*/)
      .filter((variant) => fold(variant).length >= 3)
      .some((variant) => {
        const seq = variant.split(/[\s-]+/).filter(Boolean);
        for (let i = 0; i <= tokens.length - seq.length; i++) {
          let ok = true;
          for (let j = 0; j < seq.length; j++) {
            if (!wordMatches(seq[j]!, tokens[i + j]!)) {
              ok = false;
              break;
            }
          }
          if (ok) return true;
        }
        return false;
      }),
  );
}

/**
 * True when `spanish` holds a word that extends an option's stem without being
 * the option — a derived noun (*documentación* for *documento*) or an inflection
 * (*procesan* for *procesar*).
 *
 * Text matching cannot tell those two apart: both are the option's root plus
 * extra letters. So a wrong occurrence that looks like either is labelled
 * rather than silently counted, which keeps the limitation auditable.
 */
export function hasStemExtension(spanish: string, options: string[]): boolean {
  const tokens = spanish.match(OPTION_TOKEN) ?? [];
  const stems = options
    .flatMap((option) => option.split(/\s*\/\s*/))
    .map((variant) => wordStem(variant))
    .filter((stem) => stem.length >= 4);
  return tokens.some((token) => {
    const word = fold(token);
    return stems.some((stem) => word.length > stem.length && word.startsWith(stem));
  });
}

/**
 * How many times the allowed options actually appear in `spanish`. Credit is
 * capped at this, so one option word cannot vouch for several occurrences of the
 * term in the same segment.
 */
export function optionOccurrences(spanish: string, options: string[]): number {
  const folded = fold(spanish);
  let count = 0;
  for (const option of options) {
    for (const pattern of optionPatterns(option)) {
      count += [...folded.matchAll(new RegExp(pattern.source, 'g'))].length;
    }
  }
  return count;
}

/** Which variation of the term produced a match. Derived from `variationsOf`. */
export function matchKind(term: string, match: string): 'literal' | 'plural' | 'verbForm' {
  if (match.toLowerCase() === term.toLowerCase()) return 'literal';
  const variations = variationsOf(term);
  return variations.indexOf(match) === 0 ? 'plural' : 'verbForm';
}

// ---------------------------------------------------------------------------
// The scorer
// ---------------------------------------------------------------------------

/** Same-length non-word filler, so blanking never shifts an index. */
const filler = (len: number) => ';'.repeat(len);

/** Case-sensitive whole-token blanking, matching the term sheet's NT removal. */
function blankExact(text: string, term: string): string {
  const re = new RegExp(`(?<!${WORD_CHAR})${escapeRegExp(term)}(?!${WORD_CHAR})`, 'gu');
  return text.replace(re, (m) => filler(m.length));
}

/** Case-insensitive whole-token blanking, for consuming a matched term. */
function blankIgnoreCase(text: string, term: string): string {
  const re = new RegExp(`(?<!${WORD_CHAR})${escapeRegExp(term)}(?!${WORD_CHAR})`, 'giu');
  return text.replace(re, (m) => filler(m.length));
}

function longestMatchFirst(a: { match: string }, b: { match: string }): number {
  return b.match.length - a.match.length || (a.match < b.match ? -1 : a.match > b.match ? 1 : 0);
}

export interface KindCounts {
  occurrences: number;
  correct: number;
  wrong: number;
  notApplicable: number;
  /** `correct / (correct + wrong)`; `null` when this kind has no occurrences. */
  score: number | null;
}

export interface TermResult {
  term: string;
  options: string[];
  /** Literal + plural — the population the headline score covers. */
  occurrences: number;
  correct: number;
  wrong: number;
  notApplicable: number;
  /** The same tallies split three ways. The plural half of DOP-7461 is only visible here. */
  byKind: { literal: KindCounts; plural: KindCounts; verbForm: KindCounts };
  /** Term-level labels — why this term is worth knowing about, e.g. a bad glossary entry. */
  flags: string[];
  evidence: Array<{
    key: string;
    verdict: 'correct' | 'wrong' | 'not-applicable';
    why: string;
    match: string;
    kind: 'literal' | 'plural' | 'verbForm';
  }>;
}

export interface GlossaryTermsScore {
  /** THE HEADLINE: literal + plural, correct / (correct + wrong). */
  score: number | null;
  metadata: {
    locale: string;
    segments: number;
    /** The HEADLINE population: literal + plural. NOT the sum of `byKind`. */
    total: number;
    /** Every occurrence scored, verb forms included. `total` + `byKind.verbForm.occurrences`. */
    allOccurrences: number;
    correct: number;
    wrong: number;
    notApplicable: number;
    /** Why each wrong occurrence is wrong, over the headline population (literal + plural),
     *  so it sums to `wrong`. A to-do list, not an escape hatch. */
    wrongByReason: Record<string, number>;
    /** Terms whose Spanish option is the same word as the English — "correct" for these
     *  means "kept the English word", so they are reported apart from real translations. */
    identity: { terms: number; occurrences: number; correct: number; wrong: number };
    /** Terms with more than one glossary entry. Either option credits either sense, so the
     *  check cannot tell a right pick from a wrong one; the flag makes that visible. */
    senseBlindTerms: string[];
    byKind: { literal: KindCounts; plural: KindCounts; verbForm: KindCounts };
    unsheeted: number;
    unseen: number;
    whyCounts: Record<string, number>;
    inactiveSets: string[];
    reason?: string;
    terms: TermResult[];
  };
}

interface Accum {
  total: number;
  matched: number;
  blankEs: number;
}

const emptyAccum = (): Accum => ({ total: 0, matched: 0, blankEs: 0 });
const emptyCounts = (): KindCounts => ({ occurrences: 0, correct: 0, wrong: 0, notApplicable: 0, score: null });

/** The score for a bucket: null when it holds nothing scorable. */
const kindScore = (c: KindCounts): number | null =>
  c.correct + c.wrong === 0 ? null : c.correct / (c.correct + c.wrong);
const emptyByKind = () => ({ literal: emptyCounts(), plural: emptyCounts(), verbForm: emptyCounts() });
const KINDS = ['literal', 'plural', 'verbForm'] as const;

function driftHit(foldedSpanish: string, term: string, sets: Classifications): boolean {
  const entry = sets.drift[term];
  return entry !== undefined && new RegExp(entry.pattern, 'i').test(foldedSpanish);
}

export function scoreGlossaryTerms(
  segments: SegmentPair[] | undefined,
  glossary: Glossary,
  locale: string,
): GlossaryTermsScore {
  const blank = (reason: string, inactiveSets: string[] = []): GlossaryTermsScore => ({
    score: null,
    metadata: {
      locale,
      segments: segments?.length ?? 0,
      total: 0,
      allOccurrences: 0,
      correct: 0,
      wrong: 0,
      notApplicable: 0,
      wrongByReason: {},
      identity: { terms: 0, occurrences: 0, correct: 0, wrong: 0 },
      senseBlindTerms: [],
      byKind: emptyByKind(),
      unsheeted: 0,
      unseen: 0,
      whyCounts: {},
      inactiveSets,
      reason,
      terms: [],
    },
  });

  if (segments === undefined) return blank('dataset lacks segments');
  if (segments.length === 0) return blank('no scorable segments');

  const sets = activeClassifications(glossary);
  const key = locale.toLowerCase();
  const optionsFor = (term: string): string[] =>
    (glossary.translatableTerms[term] ?? [])
      .map((entry) => entry.translations[key])
      .filter((option): option is string => typeof option === 'string' && option.length > 0);

  const scorable = termMatches(glossary.translatableTerms)
    .filter(({ term }) => optionsFor(term).length > 0)
    .sort(longestMatchFirst);

  if (scorable.length === 0) return blank('no options for locale', sets.inactive);

  const acc = new Map<string, Record<(typeof KINDS)[number], Accum>>();
  const whyCounts: Record<string, number> = {};
  const evidenceByTerm = new Map<string, TermResult['evidence']>();
  const seenTerms = new Set<string>();
  const sheetedTerms = new Set<string>();
  const wrongByReason: Record<string, number> = {};

  for (const pair of segments) {
    const raw = pair.en;
    const esFolded = fold(pair.es);
    const esBlank = pair.es.trim() === '';

    // Blank the adapter's inline tokens and the non-translatable terms with
    // same-length fillers, so a match index is valid in both the matched text
    // and the text the codeName gate runs against.
    let scan = tokensIn(raw).reduce((text, token) => text.split(token).join(filler(token.length)), raw);
    const presentNt = glossary.nonTranslatableTerms
      .filter((term) => new RegExp(`(?<!${WORD_CHAR})${escapeRegExp(term)}(?!${WORD_CHAR})`, 'u').test(scan))
      .sort((a, b) => b.length - a.length);
    scan = presentNt.reduce((text, term) => blankExact(text, term), scan);

    for (const entry of buildTermSheet([pair.en], glossary.translatableTerms, key, glossary.nonTranslatableTerms)) {
      sheetedTerms.add(entry.term);
    }

    const nameSpans = sets.codeNameSpans(scan);
    const verbalSpans: Array<[number, number]> = [
      ...scan.matchAll(new RegExp(sets.verbalUse.source, 'gi')),
    ].map((m) => {
      const at = m.index ?? 0;
      return [at, at + m[0].length] as [number, number];
    });

    let remaining = scan;
    for (const { term, match } of scorable) {
      const re = new RegExp(`(?<!${WORD_CHAR})${escapeRegExp(match)}(?!${WORD_CHAR})`, 'giu');
      const hits = [...remaining.matchAll(re)];
      if (hits.length === 0) continue;
      remaining = blankIgnoreCase(remaining, match);

      const kind = matchKind(term, match);
      const options = optionsFor(term);
      const optionHit = hasOptionHit(pair.es, options);
      const drift = driftHit(esFolded, term, sets);
      const kinds = acc.get(term) ?? { literal: emptyAccum(), plural: emptyAccum(), verbForm: emptyAccum() };
      acc.set(term, kinds);
      const bucket = kinds[kind];
      seenTerms.add(term);

      const inBadData = term in sets.badData;
      const inPhrase = sets.phrase.includes(term);
      const cap = optionOccurrences(pair.es, options);
      let credited = 0;
      for (const hit of hits) {
        const start = hit.index ?? 0;
        const end = start + hit[0].length;
        const inSpan = (spans: Array<[number, number]>) => spans.some(([s, e]) => start >= s && end <= e);
        const inName = inSpan(nameSpans);
        const canCredit = optionHit && credited < cap;
        const verdict: 'correct' | 'wrong' | 'not-applicable' = inName
          ? 'wrong'
          : esBlank
            ? 'not-applicable'
            : drift
              ? 'wrong'
              : canCredit
                ? 'correct'
                : 'wrong';
        if (verdict === 'correct') credited += 1;
        const why =
          verdict === 'correct'
            ? 'allowed option used'
            : verdict === 'not-applicable'
              ? 'spanish segment is empty'
              : inName
                ? 'inside product/code name'
                : inSpan(verbalSpans)
                  ? 'verbal use of the term'
                  : drift
                    ? 'known drift word used'
                    : inBadData
                      ? 'glossary option is known-bad data'
                      : inPhrase
                        ? 'hand-flagged phrase'
                        : optionHit && !canCredit
                          ? 'option appears fewer times than the term'
                          : hasStemExtension(pair.es, options)
                            ? 'stem extension, may be a conjugation'
                            : 'no allowed option';

        if (verdict === 'not-applicable') {
          bucket.blankEs += 1;
          whyCounts[why] = (whyCounts[why] ?? 0) + 1;
        } else {
          bucket.total += 1;
          if (verdict === 'correct') bucket.matched += 1;
          // Scoped to the headline population so it sums to `metadata.wrong`.
          if (verdict === 'wrong' && kind !== 'verbForm') wrongByReason[why] = (wrongByReason[why] ?? 0) + 1;
        }

        const list = evidenceByTerm.get(term) ?? [];
        list.push({ key: pair.key, verdict, why, match, kind });
        evidenceByTerm.set(term, list);
      }
    }
  }

  const terms: TermResult[] = [];
  for (const [term, kinds] of acc) {
    const byKind = emptyByKind();
    let occurrences = 0;
    let correct = 0;
    let wrong = 0;
    let notApplicableTotal = 0;
    for (const kind of KINDS) {
      const a = kinds[kind];
      const counts = {
        occurrences: a.total + a.blankEs,
        correct: a.matched,
        wrong: a.total - a.matched,
        notApplicable: a.blankEs,
        score: null,
      };
      byKind[kind] = { ...counts, score: kindScore(counts) };
      if (kind !== 'verbForm') {
        occurrences += byKind[kind].occurrences;
        correct += byKind[kind].correct;
        wrong += byKind[kind].wrong;
        notApplicableTotal += byKind[kind].notApplicable;
      }
    }
    const evidence = (evidenceByTerm.get(term) ?? [])
      .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : a.match < b.match ? -1 : a.match > b.match ? 1 : 0))
      .slice(0, 12);
    const flags: string[] = [];
    if (term in sets.badData) flags.push('glossary option is known-bad data');
    if (sets.phrase.includes(term)) flags.push('hand-flagged phrase');
    terms.push({
      term,
      options: optionsFor(term),
      occurrences,
      correct,
      wrong,
      notApplicable: notApplicableTotal,
      byKind,
      flags,
      evidence,
    });
  }
  terms.sort((a, b) => b.occurrences - a.occurrences || (a.term < b.term ? -1 : a.term > b.term ? 1 : 0));

  const sum = (pick: (t: TermResult) => number) => terms.reduce((n, t) => n + pick(t), 0);
  const total = sum((t) => t.occurrences);
  const correct = sum((t) => t.correct);
  const wrong = sum((t) => t.wrong);
  const notApplicable = sum((t) => t.notApplicable);
  const scored = correct + wrong;

  const verbForms = terms.reduce<KindCounts>(
    (n, t) => ({
      occurrences: n.occurrences + t.byKind.verbForm.occurrences,
      correct: n.correct + t.byKind.verbForm.correct,
      wrong: n.wrong + t.byKind.verbForm.wrong,
      notApplicable: n.notApplicable + t.byKind.verbForm.notApplicable,
      score: null,
    }),
    emptyCounts(),
  );
  verbForms.score = kindScore(verbForms);

  const reason =
    scored > 0
      ? undefined
      : notApplicable > 0
        ? 'all occurrences not applicable'
        : 'no glossary term occurrences';

  const identityTerms = terms.filter((t) => t.options.some((o) => fold(o) === fold(t.term)));
  const identity = identityTerms.reduce(
    (n, t) => ({
      terms: n.terms + 1,
      occurrences: n.occurrences + t.occurrences,
      correct: n.correct + t.correct,
      wrong: n.wrong + t.wrong,
    }),
    { terms: 0, occurrences: 0, correct: 0, wrong: 0 },
  );
  const senseBlindTerms = terms
    .filter((t) => (glossary.translatableTerms[t.term] ?? []).length > 1)
    .map((t) => t.term)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  const unsheeted = [...seenTerms].filter((term) => !sheetedTerms.has(term)).length;
  const unseen = [...sheetedTerms].filter((term) => !seenTerms.has(term)).length;

  return {
    score: scored === 0 ? null : correct / scored,
    metadata: {
      locale,
      segments: segments.length,
      total,
      allOccurrences: total + verbForms.occurrences,
      correct,
      wrong,
      notApplicable,
      wrongByReason,
      identity,
      senseBlindTerms,
      byKind: {
        literal: terms.reduce<KindCounts>((n, t) => addCounts(n, t.byKind.literal), emptyCounts()),
        plural: terms.reduce<KindCounts>((n, t) => addCounts(n, t.byKind.plural), emptyCounts()),
        verbForm: verbForms,
      },
      unsheeted,
      unseen,
      whyCounts,
      inactiveSets: sets.inactive,
      ...(reason === undefined ? {} : { reason }),
      terms,
    },
  };
}

function addCounts(a: KindCounts, b: KindCounts): KindCounts {
  const summed = {
    occurrences: a.occurrences + b.occurrences,
    correct: a.correct + b.correct,
    wrong: a.wrong + b.wrong,
    notApplicable: a.notApplicable + b.notApplicable,
    score: null,
  };
  return { ...summed, score: kindScore(summed) };
}
