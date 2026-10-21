import { describe, expect, it } from "@jest/globals";
import {
  AWS_TRANSLATE_DEFAULTS,
  resolveAwsTranslateConfigFromEnv,
} from "../../../src/backends/aws-translate/config.js";

describe("resolveAwsTranslateConfigFromEnv", () => {
  it("fills defaults from an empty env", () => {
    expect(resolveAwsTranslateConfigFromEnv({})).toEqual({
      region: AWS_TRANSLATE_DEFAULTS.region,
      timeoutMs: AWS_TRANSLATE_DEFAULTS.timeoutMs,
      concurrency: AWS_TRANSLATE_DEFAULTS.concurrency,
    });
  });

  it("applies region, timeout, and concurrency from env", () => {
    const config = resolveAwsTranslateConfigFromEnv({
      AWS_TRANSLATE_REGION: "us-west-2",
      AWS_TRANSLATE_TIMEOUT_MS: "5000",
      AWS_TRANSLATE_CONCURRENCY: "2",
    });
    expect(config).toEqual({
      region: "us-west-2",
      timeoutMs: 5000,
      concurrency: 2,
    });
  });

  it("prefers AWS_TRANSLATE_REGION over AWS_REGION", () => {
    expect(
      resolveAwsTranslateConfigFromEnv({
        AWS_REGION: "eu-west-1",
        AWS_TRANSLATE_REGION: "us-west-2",
      }).region,
    ).toBe("us-west-2");
  });

  it("falls back to AWS_REGION", () => {
    expect(
      resolveAwsTranslateConfigFromEnv({ AWS_REGION: "eu-west-1" }).region,
    ).toBe("eu-west-1");
  });

  it("treats empty-string env vars as unset", () => {
    const config = resolveAwsTranslateConfigFromEnv({
      AWS_TRANSLATE_REGION: "",
      AWS_TRANSLATE_TIMEOUT_MS: "",
      AWS_TRANSLATE_CONCURRENCY: "",
    });
    expect(config).toEqual({
      region: AWS_TRANSLATE_DEFAULTS.region,
      timeoutMs: AWS_TRANSLATE_DEFAULTS.timeoutMs,
      concurrency: AWS_TRANSLATE_DEFAULTS.concurrency,
    });
  });

  it("throws when AWS_TRANSLATE_TIMEOUT_MS is not a positive number", () => {
    expect(() =>
      resolveAwsTranslateConfigFromEnv({ AWS_TRANSLATE_TIMEOUT_MS: "nope" }),
    ).toThrow(/AWS_TRANSLATE_TIMEOUT_MS/);
  });

  it("throws when AWS_TRANSLATE_CONCURRENCY is not a positive integer", () => {
    expect(() =>
      resolveAwsTranslateConfigFromEnv({ AWS_TRANSLATE_CONCURRENCY: "1.5" }),
    ).toThrow(/AWS_TRANSLATE_CONCURRENCY/);
    expect(() =>
      resolveAwsTranslateConfigFromEnv({ AWS_TRANSLATE_CONCURRENCY: "0" }),
    ).toThrow(/AWS_TRANSLATE_CONCURRENCY/);
  });

  it("lets overrides take precedence over env values", () => {
    const config = resolveAwsTranslateConfigFromEnv(
      { AWS_TRANSLATE_REGION: "us-west-2", AWS_TRANSLATE_CONCURRENCY: "4" },
      { region: "ap-northeast-1", concurrency: 1 },
    );
    expect(config.region).toBe("ap-northeast-1");
    expect(config.concurrency).toBe(1);
  });
});
