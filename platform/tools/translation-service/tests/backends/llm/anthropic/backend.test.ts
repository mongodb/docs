import { describe, expect, it } from "@jest/globals";
import { AnthropicBackend } from "../../../../src/backends/llm/anthropic/backend.js";
import { BackendError } from "../../../../src/backends/errors.js";
import type { AnthropicConfig } from "../../../../src/backends/llm/anthropic/config.js";
import type { Transport } from "../../../../src/backends/llm/transport.js";
import type { TranslationBatchRequest } from "../../../../src/types.js";

// Deliberately non-default values (see ANTHROPIC_DEFAULTS): a builder that
// hardcoded the defaults would fail these assertions.
const config: AnthropicConfig = {
  endpoint: "https://example.test/anthropic/v1/messages",
  model: "claude-test-model",
  apiKey: "secret",
  timeoutMs: 120000,
  maxTokens: 4096,
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
    content: [{ type: "text", text: inner }],
    stop_reason: "end_turn",
  });
  return async () => ({ ok: true, status: 200, text: async () => raw });
}

describe("AnthropicBackend", () => {
  it("returns ok items and reports provider/model meta", async () => {
    const backend = new AnthropicBackend({
      config,
      transport: okTransport({ docs_home: "Inicio" }),
    });
    const result = await backend.translateBatch(
      batch([{ key: "docs_home", text: "Home" }]),
    );
    expect(result.items).toEqual([
      { key: "docs_home", status: "ok", text: "Inicio" },
    ]);
    expect(result.meta).toEqual({ provider: "anthropic", model: "claude-test-model" });
  });

  it("omits keys the model did not return (validate-output flags them)", async () => {
    const backend = new AnthropicBackend({
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

  it("sends endpoint, x-api-key, anthropic-version, and JSON body", async () => {
    let seenUrl = "";
    let seenHeaders: Record<string, string> = {};
    const transport: Transport = async (req) => {
      seenUrl = req.url;
      seenHeaders = req.headers;
      return okTransport({ a: "A" })(req);
    };
    const backend = new AnthropicBackend({ config, transport });
    await backend.translateBatch(batch([{ key: "a", text: "A" }]));
    expect(seenUrl).toBe(config.endpoint);
    expect(seenHeaders["x-api-key"]).toBe("secret");
    expect(seenHeaders["api-key"]).toBeUndefined();
    expect(seenHeaders["anthropic-version"]).toBe("2023-06-01");
    expect(seenHeaders["Content-Type"]).toBe("application/json");
  });

  it("sends max_tokens and output_config in the request body", async () => {
    let seenBody = "";
    const transport: Transport = async (req) => {
      seenBody = req.body;
      return okTransport({ a: "A" })(req);
    };
    const backend = new AnthropicBackend({ config, transport });
    await backend.translateBatch(batch([{ key: "a", text: "A" }]));
    const parsed = JSON.parse(seenBody);
    expect(parsed.max_tokens).toBe(4096);
    expect(parsed.output_config.format.type).toBe("json_schema");
  });

  it("throws provider_http_error on a non-2xx response", async () => {
    const transport: Transport = async () => ({
      ok: false,
      status: 503,
      text: async () => "unavailable",
    });
    const backend = new AnthropicBackend({ config, transport });
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
