/**
 * Provider-neutral translation prompt text. The wire shape that carries
 * these strings (Responses `input[]`, Chat `messages[]`, etc.) is the
 * concern of each provider's request builder.
 */
export const SYSTEM_PROMPT =
  "You are a translation engine for MongoDB Docs platform content. " +
  "Translate each input item's value from the source locale to the " +
  "target locale while preserving structure exactly. Preserve every key " +
  "exactly as provided. Do not add, remove, reorder, merge, or summarize " +
  "items. If placeholder tokens such as __PROT0__ appear in a value, " +
  "preserve them exactly and do not translate or modify them. Return only " +
  "valid JSON that matches the required response schema. Do not include " +
  "markdown, explanations, or surrounding prose.";

export function buildUserPrompt(
  sourceLocale: string,
  targetLocale: string,
  contentJson: string,
): string {
  return (
    `Translate the following content from ${sourceLocale} to ` +
    `${targetLocale}. Input: ${contentJson}. Return JSON in the form ` +
    `{ "translations": [{ "key": string, "value": string }] }. Each ` +
    `output item must correspond to exactly one input item.`
  );
}
