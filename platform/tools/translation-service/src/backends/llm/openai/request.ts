/**
 * Pure builder for the OpenAI Responses request body. Maps batch items
 * ({ key, text }) to the prompt content as { key, value } and wraps the
 * neutral prompt text in the Responses `input[]` + `text.format` shape.
 */
import type { TranslationBatchRequest } from "../../../types.js";
import { buildBatchUserPrompt } from "../batch.js";
import { SYSTEM_PROMPT } from "../prompt.js";
import { TRANSLATION_SCHEMA } from "../translation-schema.js";
import type { OpenAiConfig } from "./config.js";

interface OpenAiInputMessage {
  role: "system" | "user";
  content: Array<{ type: "input_text"; text: string }>;
}

export interface OpenAiRequestBody {
  model: string;
  input: OpenAiInputMessage[];
  text: {
    format: {
      type: "json_schema";
      name: "translation_response";
      schema: Record<string, unknown>;
      strict: true;
    };
  };
}

export function buildOpenAiRequest(
  batch: TranslationBatchRequest,
  config: OpenAiConfig,
): OpenAiRequestBody {
  return {
    model: config.model,
    input: [
      { role: "system", content: [{ type: "input_text", text: SYSTEM_PROMPT }] },
      {
        role: "user",
        content: [{ type: "input_text", text: buildBatchUserPrompt(batch) }],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "translation_response",
        schema: TRANSLATION_SCHEMA,
        strict: true,
      },
    },
  };
}
