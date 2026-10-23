import { describe, expect, it } from "@jest/globals";
import { buildAnthropicRequest } from "../../../../src/backends/llm/anthropic/request.js";
import type { AnthropicConfig } from "../../../../src/backends/llm/anthropic/config.js";
import { TRANSLATION_SCHEMA } from "../../../../src/backends/llm/translation-schema.js";
import type { TranslationBatchRequest } from "../../../../src/types.js";

// Deliberately non-default values (see ANTHROPIC_DEFAULTS): a builder that
// hardcoded the defaults would fail these assertions.
const config: AnthropicConfig = {
  endpoint: "https://example.test/anthropic/v1/messages",
  model: "claude-test-model",
  apiKey: "secret",
  timeoutMs: 120000,
  maxTokens: 4096,
};

const batch: TranslationBatchRequest = {
  source_locale: "en",
  target_locale: "es",
  content_type: "platform_strings",
  items: [{ key: "docs_home", text: "__PROT1__ Home" }],
  backend_preferences: { provider: "auto", model: "auto" },
};

describe("buildAnthropicRequest", () => {
  it("sets the model and required max_tokens", () => {
    const body = buildAnthropicRequest(batch, config);
    expect(body.model).toBe("claude-test-model");
    expect(body.max_tokens).toBe(4096);
  });

  it("sends the system prompt top-level, not as a message", () => {
    const body = buildAnthropicRequest(batch, config);
    expect(body.system).toContain("translation engine for MongoDB Docs");
    expect(body.messages).toHaveLength(1);
    expect(body.messages[0]?.role).toBe("user");
  });

  it("carries the batch as key/value JSON in the user message", () => {
    const body = buildAnthropicRequest(batch, config);
    const userText = body.messages[0]?.content ?? "";
    expect(userText).toContain("from en to es");
    expect(userText).toContain('[{"key":"docs_home","value":"__PROT1__ Home"}]');
  });

  it("requests structured output via output_config.format with no name field", () => {
    const body = buildAnthropicRequest(batch, config);
    expect(body.output_config.format.type).toBe("json_schema");
    expect(body.output_config.format.schema).toBe(TRANSLATION_SCHEMA);
    expect("name" in body.output_config.format).toBe(false);
  });
});
