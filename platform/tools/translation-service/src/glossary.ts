/**
 * Glossary
 *
 * Terms kept verbatim in every locale, and required translations keyed by
 * English source term and target locale. The glossary is bundled with the
 * service as glossary.json and imported directly; there is no file to
 * configure.
 */
import { createHash } from "node:crypto";
import bundled from "./glossary.json" with { type: "json" };

/** One meaning of an English source term. */
export interface GlossaryEntry {
  /** What this entry means. Same for every language. */
  definition: string;
  /** Language -> the allowed translation for this meaning, e.g. { es: "acceder" }. */
  translations: Record<string, string>;
}

/** English source term -> its entries (one per meaning). */
export type TranslatableTerms = Record<string, GlossaryEntry[]>;

export interface Glossary {
  /** Terms that must survive verbatim, in every target locale. */
  nonTranslatableTerms: string[];
  /** Allowed translations, keyed by English source term; one entry per meaning. */
  translatableTerms: TranslatableTerms;
}

export interface GlossaryIdentity {
  /** Short content hash of the glossary. */
  sha256: string;
  /** Number of non-translatable terms, for a quick sanity check; the sha256 covers the rest. */
  count: number;
}

/**
 * Identifies the glossary a run was scored against, so a score can be traced
 * back to it and two runs scored against different glossaries are not compared
 * blindly.
 */
export function glossaryIdentity(glossary: Glossary): GlossaryIdentity {
  return {
    sha256: createHash("sha256").update(JSON.stringify(glossary)).digest("hex").slice(0, 12),
    count: glossary.nonTranslatableTerms.length,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A term must be a non-empty string with no surrounding whitespace; a blank or
 *  padded term would silently mis-match. */
function isCleanTerm(value: unknown): value is string {
  return typeof value === "string" && value !== "" && value === value.trim();
}

/** Throws, naming `source`, unless `parsed` holds the expected shape. */
export function validateGlossary(parsed: unknown, source: string): Glossary {
  const candidate = (isRecord(parsed) ? parsed : {}) as Partial<Glossary>;
  if (!Array.isArray(candidate.nonTranslatableTerms)) {
    throw new Error(`${source}: expected a "nonTranslatableTerms" array`);
  }
  const badTerm = candidate.nonTranslatableTerms.find((term) => !isCleanTerm(term));
  if (badTerm !== undefined) {
    throw new Error(
      `${source}: "nonTranslatableTerms" has a blank or untrimmed term: ${JSON.stringify(badTerm)}`,
    );
  }
  const translatableTerms = candidate.translatableTerms ?? {};
  if (!isRecord(translatableTerms)) {
    throw new Error(`${source}: expected a "translatableTerms" object`);
  }
  for (const [term, entries] of Object.entries(translatableTerms)) {
    if (!isCleanTerm(term)) {
      throw new Error(
        `${source}: "translatableTerms" has a blank or untrimmed source term: ${JSON.stringify(term)}`,
      );
    }
    if (!Array.isArray(entries)) {
      throw new Error(`${source}: "translatableTerms.${term}" must be a list of entries`);
    }
    entries.forEach((entry: unknown, index) => {
      const at = `${source}: "translatableTerms.${term}[${index}]`;
      if (!isRecord(entry) || !isCleanTerm(entry["definition"])) {
        throw new Error(`${at}.definition" must be a non-empty string`);
      }
      const translations = entry["translations"];
      if (!isRecord(translations)) {
        throw new Error(`${at}.translations" must map a locale to a string`);
      }
      for (const [locale, option] of Object.entries(translations)) {
        if (!isCleanTerm(option)) {
          throw new Error(`${at}.translations.${locale}" must be a non-empty string`);
        }
      }
    });
  }
  return {
    nonTranslatableTerms: candidate.nonTranslatableTerms,
    translatableTerms: translatableTerms as TranslatableTerms,
  };
}

/** The glossary bundled with the service; translate() uses it unless overridden. */
export const DEFAULT_GLOSSARY: Glossary = validateGlossary(bundled, "glossary.json");

