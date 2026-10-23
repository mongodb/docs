/**
 * The one JSON schema for a translation batch response. Each backend wraps
 * it in its own wire envelope: Responses puts it under
 * `text.format.schema`, Messages under `output_config.format.schema`.
 * `additionalProperties: false` is required at every object level —
 * Anthropic's structured outputs reject a schema without it.
 */
export const TRANSLATION_SCHEMA: Record<string, unknown> = {
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
