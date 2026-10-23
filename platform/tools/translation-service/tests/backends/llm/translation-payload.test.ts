import { describe, expect, it } from "@jest/globals";
import {
  isRecord,
  parseTranslationPayload,
} from "../../../src/backends/llm/translation-payload.js";
import { BackendError } from "../../../src/backends/errors.js";

function reasonOf(fn: () => unknown): string {
  try {
    fn();
  } catch (err) {
    if (err instanceof BackendError) return err.reason;
    throw err;
  }
  throw new Error("expected a throw");
}

describe("isRecord", () => {
  it("accepts plain objects and rejects null and arrays", () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord(null)).toBe(false);
    expect(isRecord([])).toBe(false);
    expect(isRecord("x")).toBe(false);
  });
});

describe("parseTranslationPayload", () => {
  it("returns a key/value map", () => {
    const map = parseTranslationPayload(
      '{"translations":[{"key":"docs_home","value":"Inicio"}]}',
      "openai",
    );
    expect(map.get("docs_home")).toBe("Inicio");
    expect(map.size).toBe(1);
  });

  it("labels errors with the given provider", () => {
    try {
      parseTranslationPayload("not json", "anthropic");
      throw new Error("expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(BackendError);
      expect((err as BackendError).provider).toBe("anthropic");
      expect((err as BackendError).reason).toBe("provider_unparseable");
    }
  });

  it("throws provider_unparseable when the output text is not JSON", () => {
    expect(reasonOf(() => parseTranslationPayload("not json", "openai"))).toBe(
      "provider_unparseable",
    );
  });

  it("throws provider_invalid_shape when translations is missing", () => {
    expect(reasonOf(() => parseTranslationPayload('{"nope":true}', "openai"))).toBe(
      "provider_invalid_shape",
    );
  });

  it("throws provider_invalid_shape when an item value is not a string", () => {
    expect(
      reasonOf(() =>
        parseTranslationPayload('{"translations":[{"key":"a","value":5}]}', "openai"),
      ),
    ).toBe("provider_invalid_shape");
  });

  it("throws provider_invalid_shape on a duplicate key", () => {
    // Collapsing into the Map would silently keep last-wins and hide the
    // contract violation from the pipeline's per-key validation.
    expect(
      reasonOf(() =>
        parseTranslationPayload(
          '{"translations":[{"key":"a","value":"1"},{"key":"a","value":"2"}]}',
          "openai",
        ),
      ),
    ).toBe("provider_invalid_shape");
  });
});
