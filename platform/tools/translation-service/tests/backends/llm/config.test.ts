import { describe, expect, it } from "@jest/globals";
import {
  AI_GATEWAY_BASE,
  LEGACY_GROVE_BASE,
  blankToUndefined,
  resolveGateway,
  resolvePositiveInt,
  resolveTimeoutMs,
} from "../../../src/backends/llm/config.js";

describe("AI_GATEWAY_BASE", () => {
  it("is the AI Gateway host with no trailing slash", () => {
    expect(AI_GATEWAY_BASE).toBe("https://ai-gateway.corp.mongodb.com");
  });
});

describe("blankToUndefined", () => {
  it("treats undefined and empty string as not provided", () => {
    expect(blankToUndefined(undefined)).toBeUndefined();
    expect(blankToUndefined("")).toBeUndefined();
    expect(blankToUndefined("x")).toBe("x");
  });
});

describe("resolveTimeoutMs", () => {
  it("uses the default when the var is unset or blank", () => {
    expect(resolveTimeoutMs({}, "OPENAI_TIMEOUT_MS", 30000, undefined)).toBe(30000);
    expect(resolveTimeoutMs({ OPENAI_TIMEOUT_MS: "" }, "OPENAI_TIMEOUT_MS", 30000, undefined)).toBe(30000);
  });

  it("reads the var and lets an override win", () => {
    expect(resolveTimeoutMs({ OPENAI_TIMEOUT_MS: "5000" }, "OPENAI_TIMEOUT_MS", 30000, undefined)).toBe(5000);
    expect(resolveTimeoutMs({ OPENAI_TIMEOUT_MS: "5000" }, "OPENAI_TIMEOUT_MS", 30000, 7000)).toBe(7000);
  });

  it("throws naming the variable when the value is not a positive number", () => {
    expect(() => resolveTimeoutMs({ OPENAI_TIMEOUT_MS: "nope" }, "OPENAI_TIMEOUT_MS", 30000, undefined)).toThrow(/OPENAI_TIMEOUT_MS/);
    expect(() => resolveTimeoutMs({ OPENAI_TIMEOUT_MS: "0" }, "OPENAI_TIMEOUT_MS", 30000, undefined)).toThrow(/OPENAI_TIMEOUT_MS/);
  });
});

describe("resolvePositiveInt", () => {
  it("uses the default when the var is unset or blank", () => {
    expect(resolvePositiveInt({}, "ANTHROPIC_MAX_TOKENS", 16000, undefined)).toBe(16000);
  });

  it("reads the var and lets an override win", () => {
    expect(resolvePositiveInt({ ANTHROPIC_MAX_TOKENS: "8000" }, "ANTHROPIC_MAX_TOKENS", 16000, undefined)).toBe(8000);
    expect(resolvePositiveInt({ ANTHROPIC_MAX_TOKENS: "8000" }, "ANTHROPIC_MAX_TOKENS", 16000, 4096)).toBe(4096);
  });

  it("rejects non-integers and non-positive values", () => {
    expect(() => resolvePositiveInt({ ANTHROPIC_MAX_TOKENS: "1.5" }, "ANTHROPIC_MAX_TOKENS", 16000, undefined)).toThrow(/ANTHROPIC_MAX_TOKENS/);
    expect(() => resolvePositiveInt({ ANTHROPIC_MAX_TOKENS: "-1" }, "ANTHROPIC_MAX_TOKENS", 16000, undefined)).toThrow(/ANTHROPIC_MAX_TOKENS/);
  });
});

describe("LEGACY_GROVE_BASE", () => {
  it("is the legacy Azure Grove host with no trailing slash", () => {
    expect(LEGACY_GROVE_BASE).toBe(
      "https://grove-gateway-prod.azure-api.net/grove-foundry-prod",
    );
  });
});

describe("resolveGateway", () => {
  it("selects the AI Gateway from AI_GATEWAY_API_KEY", () => {
    expect(resolveGateway({ AI_GATEWAY_API_KEY: "secret" }, undefined, "OpenAI")).toEqual({
      baseUrl: AI_GATEWAY_BASE,
      apiKey: "secret",
      anthropicAuthHeader: "x-api-key",
    });
  });

  it("selects the legacy gateway from GROVE_API_KEY alone", () => {
    expect(resolveGateway({ GROVE_API_KEY: "legacy" }, undefined, "OpenAI")).toEqual({
      baseUrl: LEGACY_GROVE_BASE,
      apiKey: "legacy",
      anthropicAuthHeader: "api-key",
    });
  });

  it("prefers the AI Gateway when both keys are set", () => {
    const gateway = resolveGateway(
      { AI_GATEWAY_API_KEY: "current", GROVE_API_KEY: "legacy" },
      undefined,
      "OpenAI",
    );
    expect(gateway.baseUrl).toBe(AI_GATEWAY_BASE);
    expect(gateway.apiKey).toBe("current");
  });

  it("treats an empty-string AI_GATEWAY_API_KEY as absent", () => {
    expect(
      resolveGateway({ AI_GATEWAY_API_KEY: "", GROVE_API_KEY: "legacy" }, undefined, "OpenAI")
        .baseUrl,
    ).toBe(LEGACY_GROVE_BASE);
  });

  it("treats an empty-string GROVE_API_KEY as absent", () => {
    expect(() => resolveGateway({ GROVE_API_KEY: "" }, undefined, "OpenAI")).toThrow(
      /GROVE_API_KEY/,
    );
  });

  it("resolves an override-only key to the AI Gateway", () => {
    expect(resolveGateway({}, "override-key", "OpenAI")).toEqual({
      baseUrl: AI_GATEWAY_BASE,
      apiKey: "override-key",
      anthropicAuthHeader: "x-api-key",
    });
  });

  it("throws naming both variables and the backend when no key is available", () => {
    expect(() => resolveGateway({}, undefined, "Anthropic")).toThrow(/AI_GATEWAY_API_KEY/);
    expect(() => resolveGateway({}, undefined, "Anthropic")).toThrow(/GROVE_API_KEY/);
    expect(() => resolveGateway({}, undefined, "Anthropic")).toThrow(/Anthropic/);
  });

  it("treats an empty-string override as absent rather than a key", () => {
    expect(() => resolveGateway({}, "", "OpenAI")).toThrow(/AI_GATEWAY_API_KEY/);
  });
});
