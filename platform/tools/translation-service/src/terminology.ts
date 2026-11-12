/**
 * Converts the bundled glossary into an AWS Translate custom terminology
 * CSV. AWS supports CSV/TSV/TMX only, applies terminology case-
 * insensitively, and caps each term at 200 bytes; the converter is
 * deterministic (sorted rows) so the CSV bytes — and therefore
 * terminologyIdentity — change only when the glossary content does.
 */
import { createHash } from "node:crypto";
import type { Glossary } from "./glossary.js";

export const TERMINOLOGY_MAX_TERM_BYTES = 200;

const NAME_PATTERN = /^([A-Za-z0-9-]_?)+$/;

export interface TerminologySkippedTerm {
  term: string;
  reason: string;
}

export interface TerminologyBuildResult {
  csv: string;
  termCount: number;
  skipped: TerminologySkippedTerm[];
}

export function isTerminologyName(name: string): boolean {
  return name.length > 0 && name.length <= 256 && NAME_PATTERN.test(name);
}

export function terminologyIdentity(csv: string): string {
  return createHash("sha256").update(csv).digest("hex").slice(0, 12);
}

function escapeCsvCell(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

export function buildTerminologyCsv(
  glossary: Glossary,
  targetLocale: string
): TerminologyBuildResult {
  if (targetLocale === "") {
    throw new Error("targetLocale must be a non-empty string");
  }
  const skipped: TerminologySkippedTerm[] = [];
  const rows: Array<[string, string]> = [];
  const winnerByLowercase = new Map<string, string>();

  for (const term of Object.keys(glossary.translatableTerms).sort()) {
    const key = term.toLowerCase();
    const winner = winnerByLowercase.get(key);
    if (winner !== undefined) {
      skipped.push({ term, reason: `case-variant duplicate of "${winner}"` });
      continue;
    }
    const translations = (glossary.translatableTerms[term] ?? [])
      .map((entry) => entry.translations[targetLocale])
      .filter((value): value is string => value !== undefined);
    if (translations.length === 0) {
      skipped.push({ term, reason: `no "${targetLocale}" translation` });
      continue;
    }
    if (translations.length > 1) {
      skipped.push({
        term,
        reason: `${translations.length} senses have an "${targetLocale}" translation; kept the first`,
      });
    }
    const translation = translations[0] as string;
    if (
      Buffer.byteLength(term, "utf8") > TERMINOLOGY_MAX_TERM_BYTES ||
      Buffer.byteLength(translation, "utf8") > TERMINOLOGY_MAX_TERM_BYTES
    ) {
      skipped.push({
        term,
        reason: `term or translation exceeds ${TERMINOLOGY_MAX_TERM_BYTES} bytes`,
      });
      continue;
    }
    winnerByLowercase.set(key, term);
    rows.push([term, translation]);
  }

  const lines = [`en,${targetLocale}`];
  for (const [term, translation] of rows) {
    lines.push(`${escapeCsvCell(term)},${escapeCsvCell(translation)}`);
  }
  return { csv: `${lines.join("\n")}\n`, termCount: rows.length, skipped };
}
