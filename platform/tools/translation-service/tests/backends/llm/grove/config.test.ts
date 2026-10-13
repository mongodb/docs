import { describe, expect, it } from "@jest/globals";
import {
  GROVE_DEFAULTS,
  resolveGroveConfigFromEnv,
} from "../../../../src/backends/llm/grove/config.js";

describe("resolveGroveConfigFromEnv", () => {
  it("fills defaults when only the API key is set", () => {
    const config = resolveGroveConfigFromEnv({ GROVE_API_KEY: "secret" });
    expect(config).toEqual({
      endpoint: GROVE_DEFAULTS.endpoint,
      model: GROVE_DEFAULTS.model,
      apiKey: "secret",
      timeoutMs: GROVE_DEFAULTS.timeoutMs,
    });
  });

  it("applies endpoint, model, and timeout overrides", () => {
    const config = resolveGroveConfigFromEnv({
      GROVE_API_KEY: "secret",
      GROVE_ENDPOINT: "https://example.test/v1/responses",
      GROVE_MODEL: "gpt-6",
      GROVE_TIMEOUT_MS: "5000",
    });
    expect(config.endpoint).toBe("https://example.test/v1/responses");
    expect(config.model).toBe("gpt-6");
    expect(config.timeoutMs).toBe(5000);
  });

  it("throws when GROVE_API_KEY is missing", () => {
    expect(() => resolveGroveConfigFromEnv({})).toThrow(/GROVE_API_KEY/);
  });

  it("throws when GROVE_TIMEOUT_MS is not a positive number", () => {
    expect(() =>
      resolveGroveConfigFromEnv({ GROVE_API_KEY: "s", GROVE_TIMEOUT_MS: "nope" }),
    ).toThrow(/GROVE_TIMEOUT_MS/);
  });

  it("accepts an apiKey override when GROVE_API_KEY is absent from the env", () => {
    const config = resolveGroveConfigFromEnv({}, { apiKey: "override-key" });
    expect(config.apiKey).toBe("override-key");
    expect(config.endpoint).toBe(GROVE_DEFAULTS.endpoint);
  });

  it("treats empty-string GROVE_ENDPOINT/GROVE_MODEL as unset and uses defaults", () => {
    const config = resolveGroveConfigFromEnv({
      GROVE_API_KEY: "secret",
      GROVE_ENDPOINT: "",
      GROVE_MODEL: "",
    });
    expect(config.endpoint).toBe(GROVE_DEFAULTS.endpoint);
    expect(config.model).toBe(GROVE_DEFAULTS.model);
  });

  it("lets overrides take precedence over env values", () => {
    const config = resolveGroveConfigFromEnv(
      { GROVE_API_KEY: "env-key", GROVE_MODEL: "env-model" },
      { model: "override-model" },
    );
    expect(config.model).toBe("override-model");
    expect(config.apiKey).toBe("env-key");
  });
});
