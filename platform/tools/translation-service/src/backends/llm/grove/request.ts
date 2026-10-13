/**
 * Pure builder for the Grove Responses-API request body. Maps batch
 * items ({ key, text }) to the prompt content as { key, value } and wraps
 * the neutral prompt text in the Responses `input[]` + `text.format`
 * shape
 */
import type { TranslationBatchRequest } from "../../../types.js";
import { SYSTEM_PROMPT, buildUserPrompt } from "../prompt.js";
import type { GroveConfig } from "./config.js";

interface GroveInputMessage {
  role: "system" | "user";
  content: Array<{ type: "input_text"; text: string }>;
}

export interface GroveRequestBody {
  model: string;
  input: GroveInputMessage[];
  text: {
    format: {
      type: "json_schema";
      name: "translation_response";
      schema: Record<string, unknown>;
      strict: true;
    };
  };
}

const RESPONSE_SCHEMA: Record<string, unknown> = {
  type: "object",
  properties: {
    translations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: { type: "string" },
          value: { type: "string" },
        },
        required: ["key", "value"],
        additionalProperties: false,
      },
    },
  },
  required: ["translations"],
  additionalProperties: false,
};

export function buildGroveRequest(
  batch: TranslationBatchRequest,
  config: GroveConfig,
): GroveRequestBody {
  const content = batch.items.map((item) => ({
    key: item.key,
    value: item.text,
  }));
  const userPrompt = buildUserPrompt(
    batch.source_locale,
    batch.target_locale,
    JSON.stringify(content),
  );

  return {
    model: config.model,
    input: [
      { role: "system", content: [{ type: "input_text", text: SYSTEM_PROMPT }] },
      { role: "user", content: [{ type: "input_text", text: userPrompt }] },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "translation_response",
        schema: RESPONSE_SCHEMA,
        strict: true,
      },
    },
  };
}
