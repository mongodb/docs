import { describe, expect, it } from "@jest/globals";
import { AwsTranslateBackend } from "../../src/backends/aws-translate/backend.js";
import { GroveBackend } from "../../src/backends/llm/grove/backend.js";
import {
  BACKEND_NAMES,
  BackendName,
  createBackend,
  isBackendName,
} from "../../src/backends/registry.js";
import { StubBackend } from "../../src/backends/stub-backend.js";

const env = { GROVE_API_KEY: "secret" };

describe("createBackend", () => {
  it.each(BACKEND_NAMES)(
    "builds a backend whose name matches the registry name %s",
    (name) => {
      expect(createBackend(name, env).name).toBe(name);
    },
  );

  it("builds each provider's backend class", () => {
    expect(createBackend(BackendName.Grove, env)).toBeInstanceOf(GroveBackend);
    expect(createBackend(BackendName.AwsTranslate, env)).toBeInstanceOf(
      AwsTranslateBackend,
    );
    expect(createBackend(BackendName.Stub, env)).toBeInstanceOf(StubBackend);
  });

  it("surfaces the provider's own config errors", () => {
    expect(() => createBackend(BackendName.Grove, {})).toThrow(/GROVE_API_KEY/);
    expect(() =>
      createBackend(BackendName.AwsTranslate, {
        AWS_TRANSLATE_CONCURRENCY: "0",
      }),
    ).toThrow(/AWS_TRANSLATE_CONCURRENCY/);
  });
});

describe("BACKEND_NAMES", () => {
  it("lists every enum value", () => {
    expect(BACKEND_NAMES).toEqual(["grove", "aws-translate", "stub"]);
  });
});

describe("isBackendName", () => {
  it("accepts registered names", () => {
    expect(isBackendName("grove")).toBe(true);
    expect(isBackendName("aws-translate")).toBe(true);
  });

  it("rejects unknown names and enum member keys", () => {
    expect(isBackendName("deepl")).toBe(false);
    expect(isBackendName("Grove")).toBe(false);
    expect(isBackendName("AwsTranslate")).toBe(false);
  });

  it("does not treat inherited object keys as backend names", () => {
    expect(isBackendName("__proto__")).toBe(false);
    expect(isBackendName("toString")).toBe(false);
  });
});
