import { describe, expect, it } from "@jest/globals";
import { buildOpenAiRequest } from "../../../../src/backends/llm/openai/request.js";
import type { OpenAiConfig } from "../../../../src/backends/llm/openai/config.js";
import type { TranslationBatchRequest } from "../../../../src/types.js";

// Deliberately non-default model (see OPENAI_DEFAULTS): a builder that
// hardcoded the default would fail the model assertion.
const config: OpenAiConfig = {
  endpoint: "https://example.test/v1/responses",
  model: "gpt-test-model",
  apiKey: "secret",
  timeoutMs: 30000,
};

const batch: TranslationBatchRequest = {
  source_locale: "en",
  target_locale: "es",
  content_type: "platform_strings",
  items: [{ key: "docs_home", text: "__PROT1__ Home" }],
  backend_preferences: { provider: "auto", model: "auto" },
};

describe("buildOpenAiRequest", () => {
  it("sets the model and a strict json_schema response format", () => {
    const body = buildOpenAiRequest(batch, config);
    expect(body.model).toBe("gpt-test-model");
    expect(body.text.format.type).toBe("json_schema");
    expect(body.text.format.name).toBe("translation_response");
    expect(body.text.format.strict).toBe(true);
  });

  it("carries the system prompt and a user prompt with items as key/value JSON", () => {
    const body = buildOpenAiRequest(batch, config);
    expect(body.input[0]?.role).toBe("system");
    const userText = body.input[1]?.content[0]?.text ?? "";
    expect(userText).toContain("from en to es");
    expect(userText).toContain('[{"key":"docs_home","value":"__PROT1__ Home"}]');
  });
});
