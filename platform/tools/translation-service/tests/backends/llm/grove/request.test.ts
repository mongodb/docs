import { describe, expect, it } from "@jest/globals";
import { buildGroveRequest } from "../../../../src/backends/llm/grove/request.js";
import type { GroveConfig } from "../../../../src/backends/llm/grove/config.js";
import type { TranslationBatchRequest } from "../../../../src/types.js";

const config: GroveConfig = {
  endpoint: "https://example.test/v1/responses",
  model: "gpt-5.5",
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

describe("buildGroveRequest", () => {
  it("sets the model and a strict json_schema response format", () => {
    const body = buildGroveRequest(batch, config);
    expect(body.model).toBe("gpt-5.5");
    expect(body.text.format.type).toBe("json_schema");
    expect(body.text.format.name).toBe("translation_response");
    expect(body.text.format.strict).toBe(true);
  });

  it("carries the system prompt and a user prompt with items as key/value JSON", () => {
    const body = buildGroveRequest(batch, config);
    expect(body.input[0]?.role).toBe("system");
    const userText = body.input[1]?.content[0]?.text ?? "";
    expect(userText).toContain("from en to es");
    expect(userText).toContain('[{"key":"docs_home","value":"__PROT1__ Home"}]');
  });
});
