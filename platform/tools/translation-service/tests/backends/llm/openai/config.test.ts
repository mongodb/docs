import { describe, expect, it } from "@jest/globals";
import {
  OPENAI_DEFAULTS,
  resolveOpenAiConfigFromEnv,
} from "../../../../src/backends/llm/openai/config.js";

describe("resolveOpenAiConfigFromEnv", () => {
  it("fills defaults when only the API key is set", () => {
    const config = resolveOpenAiConfigFromEnv({ AI_GATEWAY_API_KEY: "secret" });
    expect(config).toEqual({
      endpoint: OPENAI_DEFAULTS.endpoint,
      model: OPENAI_DEFAULTS.model,
      apiKey: "secret",
      timeoutMs: OPENAI_DEFAULTS.timeoutMs,
    });
    expect(config.endpoint).toBe(
      "https://ai-gateway.corp.mongodb.com/openai/v1/responses",
    );
  });

  it("applies endpoint, model, and timeout overrides", () => {
    const config = resolveOpenAiConfigFromEnv({
      AI_GATEWAY_API_KEY: "secret",
      OPENAI_ENDPOINT: "https://example.test/v1/responses",
      OPENAI_MODEL: "gpt-6",
      OPENAI_TIMEOUT_MS: "5000",
    });
    expect(config.endpoint).toBe("https://example.test/v1/responses");
    expect(config.model).toBe("gpt-6");
    expect(config.timeoutMs).toBe(5000);
  });

  it("throws when AI_GATEWAY_API_KEY is missing", () => {
    expect(() => resolveOpenAiConfigFromEnv({})).toThrow(/AI_GATEWAY_API_KEY/);
  });

  it("throws when OPENAI_TIMEOUT_MS is not a positive number", () => {
    expect(() =>
      resolveOpenAiConfigFromEnv({
        AI_GATEWAY_API_KEY: "s",
        OPENAI_TIMEOUT_MS: "nope",
      }),
    ).toThrow(/OPENAI_TIMEOUT_MS/);
  });

  it("accepts an apiKey override when AI_GATEWAY_API_KEY is absent from the env", () => {
    const config = resolveOpenAiConfigFromEnv({}, { apiKey: "override-key" });
    expect(config.apiKey).toBe("override-key");
    expect(config.endpoint).toBe(OPENAI_DEFAULTS.endpoint);
  });

  it("treats empty-string OPENAI_ENDPOINT/OPENAI_MODEL as unset and uses defaults", () => {
    const config = resolveOpenAiConfigFromEnv({
      AI_GATEWAY_API_KEY: "secret",
      OPENAI_ENDPOINT: "",
      OPENAI_MODEL: "",
    });
    expect(config.endpoint).toBe(OPENAI_DEFAULTS.endpoint);
    expect(config.model).toBe(OPENAI_DEFAULTS.model);
  });

  it("lets overrides take precedence over env values", () => {
    const config = resolveOpenAiConfigFromEnv(
      { AI_GATEWAY_API_KEY: "env-key", OPENAI_MODEL: "env-model" },
      { model: "override-model" },
    );
    expect(config.model).toBe("override-model");
    expect(config.apiKey).toBe("env-key");
  });
});
