/**
 * Batch shaping shared by the LLM backends. The request builders differ
 * only in how they wrap the prompt string; the result mapping is identical.
 */
import type {
  TranslationBatchRequest,
  TranslationBatchResultItem,
} from "../../types.js";
import { buildUserPrompt } from "./prompt.js";

export function buildBatchUserPrompt(batch: TranslationBatchRequest): string {
  const content = batch.items.map((item) => ({
    key: item.key,
    value: item.text,
  }));
  return buildUserPrompt(
    batch.source_locale,
    batch.target_locale,
    JSON.stringify(content),
  );
}

/** Keys the model omits are left out; validate-output flags them as MISSING_RESULT. */
export function toBatchResult(
  batch: TranslationBatchRequest,
  translations: Map<string, string>,
): TranslationBatchResultItem[] {
  const items: TranslationBatchResultItem[] = [];
  for (const item of batch.items) {
    const value = translations.get(item.key);
    if (value === undefined) continue;
    items.push({ key: item.key, status: "ok", text: value });
  }
  return items;
}
