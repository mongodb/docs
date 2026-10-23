import { describe, expect, it } from "@jest/globals";
import {
  AI_GATEWAY_BASE,
  blankToUndefined,
  requireGatewayApiKey,
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

describe("requireGatewayApiKey", () => {
  it("reads AI_GATEWAY_API_KEY", () => {
    expect(requireGatewayApiKey({ AI_GATEWAY_API_KEY: "secret" }, undefined, "OpenAI")).toBe("secret");
  });

  it("lets an override satisfy the requirement when the env var is absent", () => {
    expect(requireGatewayApiKey({}, "override-key", "OpenAI")).toBe("override-key");
  });

  it("treats an empty string as absent", () => {
    expect(() => requireGatewayApiKey({ AI_GATEWAY_API_KEY: "" }, undefined, "Anthropic")).toThrow(/AI_GATEWAY_API_KEY/);
  });

  it("treats an empty-string override as absent rather than a key", () => {
    expect(() => requireGatewayApiKey({}, "", "OpenAI")).toThrow(/AI_GATEWAY_API_KEY/);
  });

  it("names the backend in the error message", () => {
    expect(() => requireGatewayApiKey({}, undefined, "Anthropic")).toThrow(/Anthropic/);
  });
});
