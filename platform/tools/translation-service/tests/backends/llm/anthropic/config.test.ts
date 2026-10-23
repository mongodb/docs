import { describe, expect, it } from "@jest/globals";
import {
  ANTHROPIC_DEFAULTS,
  resolveAnthropicConfigFromEnv,
} from "../../../../src/backends/llm/anthropic/config.js";

describe("resolveAnthropicConfigFromEnv", () => {
  it("fills defaults when only the API key is set", () => {
    const config = resolveAnthropicConfigFromEnv({
      AI_GATEWAY_API_KEY: "secret",
    });
    expect(config).toEqual({
      endpoint: ANTHROPIC_DEFAULTS.endpoint,
      model: ANTHROPIC_DEFAULTS.model,
      apiKey: "secret",
      timeoutMs: ANTHROPIC_DEFAULTS.timeoutMs,
      maxTokens: ANTHROPIC_DEFAULTS.maxTokens,
    });
  });

  it("defaults to the AI Gateway Messages path", () => {
    expect(ANTHROPIC_DEFAULTS.endpoint).toBe(
      "https://ai-gateway.corp.mongodb.com/anthropic/v1/messages",
    );
    expect(ANTHROPIC_DEFAULTS.model).toBe("claude-sonnet-5-5");
  });

  it("applies endpoint, model, timeout, and maxTokens overrides", () => {
    const config = resolveAnthropicConfigFromEnv({
      AI_GATEWAY_API_KEY: "secret",
      ANTHROPIC_ENDPOINT: "https://example.test/anthropic/v1/messages",
      ANTHROPIC_MODEL: "claude-opus-5-5",
      ANTHROPIC_TIMEOUT_MS: "60000",
      ANTHROPIC_MAX_TOKENS: "8000",
    });
    expect(config.endpoint).toBe("https://example.test/anthropic/v1/messages");
    expect(config.model).toBe("claude-opus-5-5");
    expect(config.timeoutMs).toBe(60000);
    expect(config.maxTokens).toBe(8000);
  });

  it("throws when AI_GATEWAY_API_KEY is missing", () => {
    expect(() => resolveAnthropicConfigFromEnv({})).toThrow(/AI_GATEWAY_API_KEY/);
  });

  it("throws when ANTHROPIC_MAX_TOKENS is not a positive integer", () => {
    expect(() =>
      resolveAnthropicConfigFromEnv({
        AI_GATEWAY_API_KEY: "s",
        ANTHROPIC_MAX_TOKENS: "0",
      }),
    ).toThrow(/ANTHROPIC_MAX_TOKENS/);
  });

  it("accepts an apiKey override when the env var is absent", () => {
    const config = resolveAnthropicConfigFromEnv({}, { apiKey: "override-key" });
    expect(config.apiKey).toBe("override-key");
  });

  it("does not read the openai endpoint variable", () => {
    const config = resolveAnthropicConfigFromEnv({
      AI_GATEWAY_API_KEY: "secret",
      OPENAI_ENDPOINT: "https://example.test/openai/v1/responses",
    });
    expect(config.endpoint).toBe(ANTHROPIC_DEFAULTS.endpoint);
  });
});
