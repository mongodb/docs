import { describe, expect, it } from "@jest/globals";
import { GroveBackend } from "../../../../src/backends/llm/grove/backend.js";
import { BackendError } from "../../../../src/backends/llm/errors.js";
import type { GroveConfig } from "../../../../src/backends/llm/grove/config.js";
import type { Transport } from "../../../../src/backends/llm/transport.js";
import type { TranslationBatchRequest } from "../../../../src/types.js";

const config: GroveConfig = {
  endpoint: "https://example.test/v1/responses",
  model: "gpt-5.5",
  apiKey: "secret",
  timeoutMs: 30000,
};

function batch(
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

function okTransport(translations: Record<string, string>): Transport {
  const inner = JSON.stringify({
    translations: Object.entries(translations).map(([key, value]) => ({
      key,
      value,
    })),
  });
  const raw = JSON.stringify({
    output: [
      { type: "message", content: [{ type: "output_text", text: inner }] },
    ],
  });
  return async () => ({ ok: true, status: 200, text: async () => raw });
}

describe("GroveBackend", () => {
  it("returns ok items and reports provider/model meta", async () => {
    const backend = new GroveBackend({
      config,
      transport: okTransport({ docs_home: "Inicio" }),
    });
    const result = await backend.translateBatch(
      batch([{ key: "docs_home", text: "Home" }]),
    );
    expect(result.items).toEqual([
      { key: "docs_home", status: "ok", text: "Inicio" },
    ]);
    expect(result.meta).toEqual({ provider: "grove", model: "gpt-5.5" });
  });

  it("omits keys the model did not return (validate-output flags them)", async () => {
    const backend = new GroveBackend({
      config,
      transport: okTransport({ a: "A" }),
    });
    const result = await backend.translateBatch(
      batch([
        { key: "a", text: "A" },
        { key: "b", text: "B" },
      ]),
    );
    expect(result.items.map((item) => item.key)).toEqual(["a"]);
  });

  it("sends endpoint, api-key header, and JSON body to the transport", async () => {
    let seenUrl = "";
    let seenHeaders: Record<string, string> = {};
    const transport: Transport = async (req) => {
      seenUrl = req.url;
      seenHeaders = req.headers;
      return okTransport({ a: "A" })(req);
    };
    const backend = new GroveBackend({ config, transport });
    await backend.translateBatch(batch([{ key: "a", text: "A" }]));
    expect(seenUrl).toBe(config.endpoint);
    expect(seenHeaders["api-key"]).toBe("secret");
    expect(seenHeaders["Content-Type"]).toBe("application/json");
  });

  it("throws provider_http_error on a non-2xx response", async () => {
    const transport: Transport = async () => ({
      ok: false,
      status: 503,
      text: async () => "unavailable",
    });
    const backend = new GroveBackend({ config, transport });
    try {
      await backend.translateBatch(batch([{ key: "a", text: "A" }]));
      throw new Error("expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(BackendError);
      expect((err as BackendError).reason).toBe("provider_http_error");
      expect((err as BackendError).status).toBe(503);
    }
  });
});
