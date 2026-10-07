import { describe, expect, it } from "@jest/globals";
import { StubBackend } from "../src/backends/stub-backend.js";
import type { TranslationBatchRequest } from "../src/types.js";

function makeBatch(
  items: Array<{ key: string; text: string }>,
): TranslationBatchRequest {
  return {
    source_locale: "en",
    target_locale: "es",
    content_type: "platform_strings",
    items,
    backend_preferences: { provider: "auto", model: "auto" },
  };
}

describe("StubBackend", () => {
  it("pseudo-translates by prefixing the target locale, preserving tokens", async () => {
    const backend = new StubBackend();
    const result = await backend.translateBatch(
      makeBatch([{ key: "ask_mongodb_ai", text: "Ask __PROT1__ AI" }]),
    );
    expect(result.items).toEqual([
      { key: "ask_mongodb_ai", status: "ok", text: "[es] Ask __PROT1__ AI" },
    ]);
    expect(result.meta).toEqual({ provider: "stub", model: "stub-v1" });
  });

  it("exposes the backend name and honors a model override", async () => {
    const backend = new StubBackend({ model: "stub-v2" });
    expect(backend.name).toBe("stub");
    const result = await backend.translateBatch(makeBatch([]));
    expect(result.meta.model).toBe("stub-v2");
  });

  it("returns error items for keys listed in errorFor", async () => {
    const backend = new StubBackend({
      errorFor: {
        docs_home: { code: "TRANSLATION_FAILED", message: "simulated failure" },
      },
    });
    const result = await backend.translateBatch(
      makeBatch([
        { key: "ask_mongodb_ai", text: "Ask __PROT1__ AI" },
        { key: "docs_home", text: "__PROT1__ Home" },
      ]),
    );
    expect(result.items).toEqual([
      { key: "ask_mongodb_ai", status: "ok", text: "[es] Ask __PROT1__ AI" },
      {
        key: "docs_home",
        status: "error",
        error: { code: "TRANSLATION_FAILED", message: "simulated failure" },
      },
    ]);
  });

  it("omits keys listed in omitKeys entirely", async () => {
    const backend = new StubBackend({ omitKeys: ["docs_home"] });
    const result = await backend.translateBatch(
      makeBatch([
        { key: "ask_mongodb_ai", text: "Ask __PROT1__ AI" },
        { key: "docs_home", text: "__PROT1__ Home" },
      ]),
    );
    expect(result.items.map((item) => item.key)).toEqual(["ask_mongodb_ai"]);
  });

  it("does not mistake a __proto__-named key for an errorFor entry by default", async () => {
    const backend = new StubBackend();
    const result = await backend.translateBatch(
      makeBatch([{ key: "__proto__", text: "Ask __PROT1__ AI" }]),
    );
    expect(result.items).toEqual([
      { key: "__proto__", status: "ok", text: "[es] Ask __PROT1__ AI" },
    ]);
  });

  it("mangles the first placeholder token for keys in corruptTokensFor", async () => {
    const backend = new StubBackend({ corruptTokensFor: ["atlas_cluster"] });
    const result = await backend.translateBatch(
      makeBatch([{ key: "atlas_cluster", text: "__PROT1__ cluster" }]),
    );
    expect(result.items).toEqual([
      { key: "atlas_cluster", status: "ok", text: "[es] __BROKEN__ cluster" },
    ]);
  });

  it("throws on corruptTokensFor misuse: a listed key with no token to corrupt", async () => {
    const backend = new StubBackend({ corruptTokensFor: ["plain"] });
    await expect(
      backend.translateBatch(makeBatch([{ key: "plain", text: "Hello world" }])),
    ).rejects.toThrow(/no __PROTn__ token to corrupt/);
  });
});
