/**
 * Provider-neutral translation prompt text. The wire shape that carries
 * these strings (Responses `input[]`, Chat `messages[]`, etc.) is the
 * concern of each provider's request builder.
 */
import type { TermSheetEntry } from "../../types.js";

export const SYSTEM_PROMPT =
  "You are a translation engine for MongoDB Docs platform content. " +
  "Translate each input item's value from the source locale to the " +
  "target locale while preserving structure exactly. Preserve every key " +
  "exactly as provided. Do not add, remove, reorder, merge, or summarize " +
  "items. If placeholder tokens such as __PROT0__ appear in a value, " +
  "preserve them exactly and do not translate or modify them. Return only " +
  "valid JSON that matches the required response schema. Do not include " +
  "markdown, explanations, or surrounding prose.";

/** How the model should use the term sheet. Sent only when there are terms. */
export const GLOSSARY_RULES = [
  "Glossary terms",
  "The list below gives the required translation for English terms in this content. For each occurrence:",
  "1. Pick the meaning. Read how the English term is used and choose the option whose definition matches. Don't just take the first or most common option.",
  "2. Each option is a dictionary form. Adapt it to the sentence: conjugate verbs (acceder → accedió) and make nouns and adjectives agree in number and gender (actualización → actualizaciones, heredado → heredada).",
  "3. Make articles agree with the noun (la actualización, los procesos).",
  '4. "primario/a" means either gender. Write only the form that agrees, never the slash.',
  "5. Keep multi-word options whole (dirección de correo electrónico).",
  "6. Capitalize only at the start of a sentence or heading.",
  "7. If no option fits the meaning, use the closest one. Don't invent a different translation.",
  "Adapting a glossary term to fit the sentence is expected and does not break the rule to preserve structure.",
].join("\n");

/** Keeps each term on one line, so a definition can't read as a new entry. */
function singleLine(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function renderTermSheet(sheet: TermSheetEntry[]): string {
  return sheet
    .map(
      ({ term, options }) =>
        `- ${term}: ` +
        options
          .map(({ option, definition }) => `"${singleLine(option)}" (${singleLine(definition)})`)
          .join(" | "),
    )
    .join("\n");
}

export function buildUserPrompt(
  sourceLocale: string,
  targetLocale: string,
  contentJson: string,
  termSheet: TermSheetEntry[] = [],
): string {
  const glossary =
    termSheet.length > 0
      ? `${GLOSSARY_RULES}\n${renderTermSheet(termSheet)}\n\n`
      : "";
  return (
    glossary +
    `Translate the following content from ${sourceLocale} to ` +
    `${targetLocale}. Input: ${contentJson}. Return JSON in the form ` +
    `{ "translations": [{ "key": string, "value": string }] }. Each ` +
    `output item must correspond to exactly one input item.`
  );
}
