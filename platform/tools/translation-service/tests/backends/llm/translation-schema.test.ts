import { describe, expect, it } from "@jest/globals";
import { TRANSLATION_SCHEMA } from "../../../src/backends/llm/translation-schema.js";

describe("TRANSLATION_SCHEMA", () => {
  it("requires a translations array of {key, value} strings", () => {
    expect(TRANSLATION_SCHEMA).toMatchObject({
      type: "object",
      required: ["translations"],
      additionalProperties: false,
      properties: {
        translations: {
          type: "array",
          items: {
            type: "object",
            required: ["key", "value"],
            additionalProperties: false,
            properties: {
              key: { type: "string" },
              value: { type: "string" },
            },
          },
        },
      },
    });
  });

  it("sets additionalProperties:false on every object level", () => {
    // Anthropic's structured outputs reject a schema that omits it.
    const root = TRANSLATION_SCHEMA as {
      additionalProperties?: unknown;
      properties: { translations: { items: { additionalProperties?: unknown } } };
    };
    expect(root.additionalProperties).toBe(false);
    expect(root.properties.translations.items.additionalProperties).toBe(false);
  });
});
