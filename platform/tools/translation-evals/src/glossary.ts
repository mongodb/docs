import { createHash } from 'node:crypto';
import fs from 'node:fs';

/** English source term -> target locale -> the target phrases allowed for it. */
export type TranslatableTerms = Record<string, Record<string, string[]>>;

/**
 * The glossary: terms kept verbatim in every locale, and required translations
 * keyed by source term and target locale.
 */
export interface Glossary {
  /** Terms that must survive verbatim, in every target locale. */
  nonTranslatableTerms: string[];
  /** Required translations, keyed by English source term then target locale. */
  translatableTerms: TranslatableTerms;
}

const EMPTY: Glossary = { nonTranslatableTerms: [], translatableTerms: {} };

export interface GlossaryIdentity {
  /** Short content hash of the file. */
  sha256: string;
  /** Number of non-translatable terms, for a quick sanity check; the sha256 covers the rest of the file. */
  count: number;
}

/**
 * Identifies the list a run was scored against, so a score can be traced back
 * to it and two runs scored against different lists are not compared blindly.
 */
export function glossaryIdentity(glossaryFile: string, glossary: Glossary): GlossaryIdentity {
  return {
    sha256: createHash('sha256').update(fs.readFileSync(glossaryFile)).digest('hex').slice(0, 12),
    count: glossary.nonTranslatableTerms.length,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** A term must be a non-empty string with no surrounding whitespace; a blank or
 *  padded term would silently mis-match and skew the score. */
function isCleanTerm(value: unknown): value is string {
  return typeof value === 'string' && value !== '' && value === value.trim();
}

/**
 * Read a glossary file. An unconfigured path yields an empty glossary; a path
 * that cannot be read, or that does not hold the expected shape, throws — so a
 * misconfiguration cannot silently score every row 1.
 */
export function readGlossary(glossaryFile: string | undefined): Glossary {
  if (!glossaryFile) return EMPTY;
  const parsed = JSON.parse(fs.readFileSync(glossaryFile, 'utf8')) as Partial<Glossary>;
  if (!Array.isArray(parsed.nonTranslatableTerms)) {
    throw new Error(`${glossaryFile}: expected a "nonTranslatableTerms" array`);
  }
  const badTerm = parsed.nonTranslatableTerms.find((term) => !isCleanTerm(term));
  if (badTerm !== undefined) {
    throw new Error(
      `${glossaryFile}: "nonTranslatableTerms" has a blank or untrimmed term: ${JSON.stringify(badTerm)}`,
    );
  }
  const translatableTerms = parsed.translatableTerms ?? {};
  if (!isRecord(translatableTerms)) {
    throw new Error(`${glossaryFile}: expected a "translatableTerms" object`);
  }
  for (const [source, byLocale] of Object.entries(translatableTerms)) {
    if (!isCleanTerm(source)) {
      throw new Error(
        `${glossaryFile}: "translatableTerms" has a blank or untrimmed source term: ${JSON.stringify(source)}`,
      );
    }
    if (!isRecord(byLocale)) {
      throw new Error(`${glossaryFile}: "translatableTerms.${source}" must map a locale to a list`);
    }
    for (const [locale, targets] of Object.entries(byLocale)) {
      if (!Array.isArray(targets) || targets.some((t) => !isCleanTerm(t))) {
        throw new Error(
          `${glossaryFile}: "translatableTerms.${source}.${locale}" must be an array of non-empty strings`,
        );
      }
    }
  }
  return {
    nonTranslatableTerms: parsed.nonTranslatableTerms,
    translatableTerms: translatableTerms as TranslatableTerms,
  };
}
