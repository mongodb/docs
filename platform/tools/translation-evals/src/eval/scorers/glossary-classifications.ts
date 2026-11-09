/**
 * Hand-written rules about glossary occurrences, used two ways.
 *
 * `codeNameSpans` and `drift` decide verdicts. A term inside a code name
 * (`db.collection.find()`) or rendered with a known wrong word is forced *wrong*,
 * even when the Spanish also contains the allowed option. That raises the wrong
 * count on purpose: without it those occurrences would be credited.
 *
 * `badData`, `phrase` and `verbalUse` only label. They attach a reason to a wrong
 * that was already counted, so a bad glossary entry reads as a bad glossary entry
 * rather than as a model miss.
 *
 * Nothing here removes an occurrence from the calculation. (An earlier version
 * did, which is how three bad glossary entries went unnoticed.)
 *
 * Each rule names a term and the glossary option it was written against, and
 * applies only while the glossary still lists that option, so fixing the glossary
 * cannot leave a stale rule quietly firing. A set with no surviving members is
 * dropped and reported in `inactive`.
 */
import type { Glossary } from '@mongodb-docs/translation-service';

/** Term -> the option that is wrong data. Labels wrong occurrences. */
const BAD_DATA: Record<string, string> = { write: 'guardar', mode: 'moda', batch: 'agrupar' };

/** Terms whose "miss" is an English phrase, not a use of the term. */
const PHRASE = ['next', 'instance', 'projection', 'collation'];

/** A Spanish word that means the glossary option was NOT used. Set-level gating. */
const DRIFT: Record<string, { option: string; pattern: string }> = {
  pipeline: { option: 'pipeline', pattern: 'canalizaci|tuber[ií]a' },
  driver: { option: 'driver', pattern: 'controlador' },
  query: { option: 'query', pattern: '(?<!\\w)consultas(?!\\w)|(?<!\\w)la consulta(?!\\w)' },
  shard: { option: 'partición', pattern: 'fragmentaci' },
  'shard key': { option: 'clave de partición', pattern: 'claves? de fragmentaci' },
  'replica set': { option: 'set de réplicas', pattern: 'conjuntos? de r[eé]plicas' },
  array: { option: 'arreglo', pattern: 'matri[zc]' },
};

/** English verbal use of a term whose glossary option is a noun ("query the ..."). */
const VERBAL_USE = /(?<!\w)query the(?!\w)/giu;

/**
 * Dotted identifiers and calls: Node.js, db.collection.findOneAndUpdate(),
 * Bulk.write, v8.0. Structural, so a new product name needs no code change.
 * The lookbehind keeps a sentence boundary ("The collection. Next") from
 * looking like a dotted name.
 */
const DOTTED_NAME = /(?<![\w.$-])[A-Za-z_$][\w$-]*(?:\.[\w$-]+)+(?:\(\))?/g;
/** Inline slash-delimited literals: /pattern/. */
const SLASH_LITERAL = /\/[^\s/]+\//g;

/**
 * Spans of product/code names in `text`. Uses `matchAll` on a fresh global
 * regex — never `.test()` on a `/g` regex, whose `lastIndex` leaks between calls.
 */
export function codeNameSpans(text: string): Array<[number, number]> {
  const spans: Array<[number, number]> = [];
  for (const re of [DOTTED_NAME, SLASH_LITERAL]) {
    for (const m of text.matchAll(re)) {
      const at = m.index ?? 0;
      spans.push([at, at + m[0].length]);
    }
  }
  return spans;
}

export interface Classifications {
  badData: Record<string, string>;
  phrase: string[];
  drift: Record<string, { option: string; pattern: string }>;
  verbalUse: RegExp;
  codeNameSpans: (text: string) => Array<[number, number]>;
  inactive: string[];
}

function esOptions(glossary: Glossary, term: string): string[] {
  return (glossary.translatableTerms[term] ?? []).map((entry) => entry.translations['es'] ?? '');
}

export function activeClassifications(glossary: Glossary): Classifications {
  const inactive: string[] = [];

  const badData = Object.fromEntries(
    Object.entries(BAD_DATA).filter(([term, option]) => esOptions(glossary, term).includes(option)),
  );
  if (Object.keys(badData).length !== Object.keys(BAD_DATA).length) inactive.push('badData');

  // Set-level: one drifted entry deactivates the whole set, so a stale hand rule
  // can never apply to only part of the terms it was verified against.
  const driftKept = Object.entries(DRIFT).filter(([term, entry]) =>
    esOptions(glossary, term).includes(entry.option),
  );
  const drift = driftKept.length === Object.keys(DRIFT).length ? DRIFT : {};
  if (driftKept.length !== Object.keys(DRIFT).length) inactive.push('drift');

  const phrase = PHRASE.filter((term) => term in glossary.translatableTerms);
  if (phrase.length !== PHRASE.length) inactive.push('phrase');

  return { badData, phrase, drift, verbalUse: VERBAL_USE, codeNameSpans, inactive };
}
