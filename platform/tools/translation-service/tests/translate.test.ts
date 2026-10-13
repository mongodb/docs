import { describe, expect, it } from "@jest/globals";
import { translate } from "../src/translate.js";
import { RequestValidationError } from "../src/validation.js";
import { StubBackend } from "../src/backends/stub-backend.js";
import { BackendError } from "../src/backends/llm/errors.js";
import type {
  TranslationBackend,
  TranslationBatchRequest,
} from "../src/types.js";

const request = {
  source_locale: "en",
  target_locale: "es",
  content_type: "platform_strings" as const,
  payload: {
    ask_mongodb_ai: "Ask MongoDB AI",
    docs_home: "Docs Home",
  },
  non_translatable_terms: ["MongoDB", "Compass", "Atlas", "Docs"],
};

describe("translate", () => {
  it("translates every key and restores protected terms", async () => {
    const response = await translate(request, {
      backend: new StubBackend(),
      requestId: "req_test_1",
    });
    expect(response).toEqual({
      source_locale: "en",
      target_locale: "es",
      translations: {
        ask_mongodb_ai: "[es] Ask MongoDB AI",
        docs_home: "[es] Docs Home",
      },
      errors: {},
      meta: {
        provider: "stub",
        model: "stub-v1",
        content_type: "platform_strings",
        partial_failure: false,
        request_id: "req_test_1",
      },
    });
  });

  it("isolates a corrupted-token failure to its key (partial failure)", async () => {
    const response = await translate(
      {
        ...request,
        payload: { ...request.payload, atlas_cluster: "Atlas cluster" },
      },
      {
        backend: new StubBackend({ corruptTokensFor: ["atlas_cluster"] }),
        requestId: "req_test_2",
      },
    );
    expect(response.translations).toEqual({
      ask_mongodb_ai: "[es] Ask MongoDB AI",
      docs_home: "[es] Docs Home",
      atlas_cluster: null,
    });
    expect(response.errors["atlas_cluster"]?.code).toBe(
      "PLACEHOLDER_RESTORATION_FAILED",
    );
    expect(Object.keys(response.errors)).toEqual(["atlas_cluster"]);
    expect(response.meta.partial_failure).toBe(true);
  });

  it("isolates a per-key backend error (TRANSLATION_FAILED) to its key", async () => {
    const response = await translate(request, {
      backend: new StubBackend({
        errorFor: {
          docs_home: {
            code: "TRANSLATION_FAILED",
            message: "simulated failure",
          },
        },
      }),
    });
    expect(response.translations).toEqual({
      ask_mongodb_ai: "[es] Ask MongoDB AI",
      docs_home: null,
    });
    expect(response.errors).toEqual({
      docs_home: { code: "TRANSLATION_FAILED", message: "simulated failure" },
    });
    expect(response.meta.partial_failure).toBe(true);
  });

  it("maps an omitted backend result to MISSING_RESULT", async () => {
    const response = await translate(request, {
      backend: new StubBackend({ omitKeys: ["docs_home"] }),
    });
    expect(response.translations["docs_home"]).toBeNull();
    expect(response.errors["docs_home"]?.code).toBe("MISSING_RESULT");
    expect(response.meta.partial_failure).toBe(true);
  });

  it("throws RequestValidationError for invalid input", async () => {
    await expect(
      translate(
        { ...request, target_locale: "not a locale!" },
        { backend: new StubBackend() },
      ),
    ).rejects.toBeInstanceOf(RequestValidationError);
  });

  it("maps a whole-backend throw to per-key BACKEND_ERROR", async () => {
    const exploding: TranslationBackend = {
      name: "exploding",
      translateBatch() {
        return Promise.reject(new Error("connection refused"));
      },
    };
    const response = await translate(request, { backend: exploding });
    expect(response.translations).toEqual({
      ask_mongodb_ai: null,
      docs_home: null,
    });
    expect(response.errors["ask_mongodb_ai"]?.code).toBe("BACKEND_ERROR");
    expect(response.errors["ask_mongodb_ai"]?.message).toContain(
      "connection refused",
    );
    expect(response.meta.partial_failure).toBe(true);
    expect(response.meta.provider).toBe("exploding");
  });

  it("maps a BackendError timeout to BACKEND_TIMEOUT for every key", async () => {
    const timingOut: TranslationBackend = {
      name: "grove",
      translateBatch() {
        return Promise.reject(
          new BackendError({
            stage: "provider",
            provider: "grove",
            reason: "provider_timeout",
            message: "timed out",
          }),
        );
      },
    };
    const response = await translate(request, { backend: timingOut });
    expect(response.errors["ask_mongodb_ai"]?.code).toBe("BACKEND_TIMEOUT");
    expect(response.errors["docs_home"]?.code).toBe("BACKEND_TIMEOUT");
    expect(response.meta.partial_failure).toBe(true);
  });

  it("maps other backend throws to BACKEND_ERROR", async () => {
    const exploding: TranslationBackend = {
      name: "grove",
      translateBatch(): Promise<never> {
        return Promise.reject(new Error("network exploded"));
      },
    };
    const response = await translate(request, { backend: exploding });
    expect(response.errors["ask_mongodb_ai"]?.code).toBe("BACKEND_ERROR");
  });

  it("sends the protected form to the backend, never raw terms", async () => {
    const seen: TranslationBatchRequest[] = [];
    const spy: TranslationBackend = {
      name: "spy",
      translateBatch(batch) {
        seen.push(batch);
        return new StubBackend().translateBatch(batch);
      },
    };
    await translate(request, { backend: spy });
    expect(seen[0]?.items).toEqual([
      { key: "ask_mongodb_ai", text: "Ask __PROT1__ AI" },
      { key: "docs_home", text: "__PROT1__ Home" },
    ]);
  });

  it("preserves a payload key literally named __proto__ through the full pipeline", async () => {
    // Object literal syntax can't create a real "__proto__" own property
    // (it's special-cased by JS itself), so simulate what a parsed JSON
    // request body would actually produce.
    const payload = JSON.parse(
      '{"__proto__":"Ask MongoDB AI","docs_home":"Docs Home"}',
    ) as Record<string, string>;
    const response = await translate(
      { ...request, payload },
      { backend: new StubBackend() },
    );
    expect(Object.keys(response.translations).sort()).toEqual([
      "__proto__",
      "docs_home",
    ]);
    expect(response.translations["__proto__"]).toBe("[es] Ask MongoDB AI");
    expect(response.errors).toEqual({});
  });

  it("handles an empty payload", async () => {
    const response = await translate(
      { ...request, payload: {} },
      { backend: new StubBackend() },
    );
    expect(response.translations).toEqual({});
    expect(response.errors).toEqual({});
    expect(response.meta.partial_failure).toBe(false);
  });
});
