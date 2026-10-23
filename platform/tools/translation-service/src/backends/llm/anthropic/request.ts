/**
 * Pure builder for the Anthropic Messages request body. Maps batch items
 * ({ key, text }) to the prompt content as { key, value } and wraps the
 * neutral prompt text in the Messages `system` + `messages[]` shape.
 *
 * Three differences from the Responses shape: `system` is a top-level
 * parameter rather than an input message, `max_tokens` is required, and
 * structured output uses the `output_config.format` envelope rather than
 * the Responses `text.format` envelope.
 */
import type { TranslationBatchRequest } from "../../../types.js";
import { buildBatchUserPrompt } from "../batch.js";
import { SYSTEM_PROMPT } from "../prompt.js";
import { TRANSLATION_SCHEMA } from "../translation-schema.js";
import type { AnthropicConfig } from "./config.js";

export interface AnthropicRequestBody {
  model: string;
  max_tokens: number;
  system: string;
  messages: Array<{ role: "user"; content: string }>;
  output_config: {
    format: { type: "json_schema"; schema: Record<string, unknown> };
  };
}

export function buildAnthropicRequest(
  batch: TranslationBatchRequest,
  config: AnthropicConfig,
): AnthropicRequestBody {
  return {
    model: config.model,
    max_tokens: config.maxTokens,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildBatchUserPrompt(batch) }],
    output_config: {
      format: { type: "json_schema", schema: TRANSLATION_SCHEMA },
    },
  };
}
