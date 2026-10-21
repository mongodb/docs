import { describe, expect, it } from "@jest/globals";
import {
  AWS_MAX_TEXT_BYTES,
  AwsTranslateBackend,
} from "../../../src/backends/aws-translate/backend.js";
import type {
  TranslateTextFn,
  TranslateTextInput,
} from "../../../src/backends/aws-translate/client.js";
import type { AwsTranslateConfig } from "../../../src/backends/aws-translate/config.js";
import { BackendError } from "../../../src/backends/errors.js";
import { translate } from "../../../src/translate.js";
import type { TranslationBatchRequest } from "../../../src/types.js";

const config: AwsTranslateConfig = {
  region: "us-east-1",
  timeoutMs: 30000,
  concurrency: 5,
};

function batch(
  items: Array<{ key: string; text: string }>,
  target_locale = "es",
): TranslationBatchRequest {
  return {
    source_locale: "en-us",
    target_locale,
    content_type: "platform_strings",
    items,
    backend_preferences: { provider: "auto", model: "auto" },
  };
}

function awsError(
  name: string,
  httpStatusCode: number,
  requestId = "req-123",
): Error {
  return Object.assign(new Error(`${name} message`), {
    name,
    $metadata: { httpStatusCode, requestId },
  });
}

/** Echoes the input with a prefix, recording every call. */
function recordingFn(): { fn: TranslateTextFn; calls: TranslateTextInput[] } {
  const calls: TranslateTextInput[] = [];
  const fn: TranslateTextFn = async (input) => {
    calls.push(input);
    return `ES ${input.text}`;
  };
  return { fn, calls };
}

describe("AwsTranslateBackend", () => {
  it("returns ok items and reports provider/model meta", async () => {
    const { fn } = recordingFn();
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    const result = await backend.translateBatch(
      batch([{ key: "docs_home", text: "Home" }]),
    );
    expect(result.items).toEqual([
      { key: "docs_home", status: "ok", text: "ES Home" },
    ]);
    expect(result.meta).toEqual({
      provider: "aws-translate",
      model: "translate-text",
    });
  });

  it("sends mapped language codes and wrapped tokens", async () => {
    const { fn, calls } = recordingFn();
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    await backend.translateBatch(
      batch([{ key: "a", text: "Ask __PROT1__" }], "pt-br"),
    );
    expect(calls).toEqual([
      {
        text: 'Ask <span translate="no">__PROT1__</span>',
        sourceLanguageCode: "en",
        targetLanguageCode: "pt",
      },
    ]);
  });

  it("unwraps tokens and unescapes entities in the output", async () => {
    const fn: TranslateTextFn = async () =>
      'Pregunte a <span translate="no">__PROT1__</span> &amp; más';
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    const result = await backend.translateBatch(
      batch([{ key: "a", text: "Ask __PROT1__ & more" }]),
    );
    expect(result.items).toEqual([
      { key: "a", status: "ok", text: "Pregunte a __PROT1__ & más" },
    ]);
  });

  it("preserves item order regardless of completion order", async () => {
    const fn: TranslateTextFn = async (input) => {
      const delay = input.text === "slow" ? 20 : 0;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return input.text.toUpperCase();
    };
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    const result = await backend.translateBatch(
      batch([
        { key: "a", text: "slow" },
        { key: "b", text: "fast" },
      ]),
    );
    expect(result.items.map((item) => item.key)).toEqual(["a", "b"]);
  });

  it("never exceeds the configured concurrency", async () => {
    let inFlight = 0;
    let peak = 0;
    const fn: TranslateTextFn = async (input) => {
      inFlight++;
      peak = Math.max(peak, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 5));
      inFlight--;
      return input.text;
    };
    const backend = new AwsTranslateBackend({
      config: { ...config, concurrency: 2 },
      translateText: fn,
    });
    await backend.translateBatch(
      batch(Array.from({ length: 6 }, (_, i) => ({ key: `k${i}`, text: "x" }))),
    );
    expect(peak).toBe(2);
  });

  it("fails every key with UNSUPPORTED_LOCALE without calling AWS", async () => {
    const { fn, calls } = recordingFn();
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    const result = await backend.translateBatch(
      batch([{ key: "a", text: "Home" }], "eo"),
    );
    expect(calls).toHaveLength(0);
    expect(result.items).toEqual([
      {
        key: "a",
        status: "error",
        error: {
          code: "UNSUPPORTED_LOCALE",
          message: 'AWS Translate does not support locale "eo"',
        },
      },
    ]);
  });

  it("returns empty and whitespace-only text without calling AWS", async () => {
    const { fn, calls } = recordingFn();
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    const result = await backend.translateBatch(
      batch([
        { key: "a", text: "" },
        { key: "b", text: "  " },
      ]),
    );
    expect(calls).toHaveLength(0);
    expect(result.items).toEqual([
      { key: "a", status: "ok", text: "" },
      { key: "b", status: "ok", text: "  " },
    ]);
  });

  it("fails an oversized key with TRANSLATION_FAILED without calling AWS", async () => {
    const { fn, calls } = recordingFn();
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    const result = await backend.translateBatch(
      batch([
        { key: "big", text: "&".repeat(AWS_MAX_TEXT_BYTES / 2) },
        { key: "small", text: "Home" },
      ]),
    );
    expect(calls.map((call) => call.text)).toEqual(["Home"]);
    const big = result.items[0];
    expect(big?.status === "error" && big.error.code).toBe("TRANSLATION_FAILED");
  });

  it("fails a timed-out key with BACKEND_TIMEOUT", async () => {
    const fn: TranslateTextFn = (input, signal) =>
      input.text === "hang"
        ? new Promise((_, reject) =>
            signal.addEventListener("abort", () => reject(signal.reason)),
          )
        : Promise.resolve(input.text);
    const backend = new AwsTranslateBackend({
      config: { ...config, timeoutMs: 10 },
      translateText: fn,
    });
    const result = await backend.translateBatch(
      batch([
        { key: "a", text: "hang" },
        { key: "b", text: "ok" },
      ]),
    );
    expect(result.items[0]).toEqual({
      key: "a",
      status: "error",
      error: {
        code: "BACKEND_TIMEOUT",
        message: "AWS Translate request timed out after 10ms (4 bytes sent)",
      },
    });
    expect(result.items[1]).toEqual({ key: "b", status: "ok", text: "ok" });
  });

  it("fails a key AWS rejects as too large without failing the batch", async () => {
    const fn: TranslateTextFn = async (input) => {
      if (input.text === "big") {
        throw awsError("TextSizeLimitExceededException", 400);
      }
      return input.text;
    };
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    const result = await backend.translateBatch(
      batch([
        { key: "a", text: "big" },
        { key: "b", text: "ok" },
      ]),
    );
    expect(result.items[0]).toEqual({
      key: "a",
      status: "error",
      error: {
        code: "TRANSLATION_FAILED",
        message:
          "AWS Translate rejected the text as too large (3 bytes after markup): " +
          "TextSizeLimitExceededException: TextSizeLimitExceededException message " +
          "(HTTP 400, request id req-123)",
      },
    });
    expect(result.items[1]).toEqual({ key: "b", status: "ok", text: "ok" });
  });

  it("fails a key with INVALID_OUTPUT and reports what was sent and returned", async () => {
    const fn: TranslateTextFn = async () => "Pregunte a <b>__PROT1__</b>";
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    const result = await backend.translateBatch(
      batch([{ key: "a", text: "Ask __PROT1__" }]),
    );
    expect(result.items[0]).toEqual({
      key: "a",
      status: "error",
      error: {
        code: "INVALID_OUTPUT",
        message:
          'AWS Translate returned unexpected markup: "Pregunte a <b>__PROT1__</b>"; ' +
          'sent "Ask <span translate=\\"no\\">__PROT1__</span>"',
      },
    });
  });

  it("throws provider_http_error for batch-wide failures and stops issuing calls", async () => {
    let calls = 0;
    const fn: TranslateTextFn = async () => {
      calls++;
      throw awsError("TooManyRequestsException", 400);
    };
    const backend = new AwsTranslateBackend({
      config: { ...config, concurrency: 1 },
      translateText: fn,
    });
    try {
      await backend.translateBatch(
        batch([
          { key: "a", text: "A" },
          { key: "b", text: "B" },
          { key: "c", text: "C" },
        ]),
      );
      throw new Error("expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(BackendError);
      expect((err as BackendError).reason).toBe("provider_http_error");
      expect((err as BackendError).status).toBe(400);
      expect((err as BackendError).requestId).toBe("req-123");
      expect((err as BackendError).message).toBe(
        "AWS Translate request failed: TooManyRequestsException: " +
          "TooManyRequestsException message (HTTP 400, request id req-123)",
      );
    }
    expect(calls).toBe(1);
  });

  it("omits AWS context it doesn't have from batch-wide failures", async () => {
    const fn: TranslateTextFn = async () => {
      throw new Error("socket hang up");
    };
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    await expect(
      backend.translateBatch(batch([{ key: "a", text: "A" }])),
    ).rejects.toMatchObject({
      message: "AWS Translate request failed: Error: socket hang up",
      requestId: undefined,
      status: undefined,
    });
  });

  it("rethrows a BackendError from the client unchanged", async () => {
    const original = new BackendError({
      stage: "parse",
      provider: "aws-translate",
      reason: "provider_invalid_shape",
      message: "AWS Translate response had no TranslatedText",
    });
    const fn: TranslateTextFn = async () => {
      throw original;
    };
    const backend = new AwsTranslateBackend({ config, translateText: fn });
    await expect(
      backend.translateBatch(batch([{ key: "a", text: "A" }])),
    ).rejects.toBe(original);
  });

  it("restores protected terms end to end through translate()", async () => {
    const fn: TranslateTextFn = async (input) =>
      input.text.replace("Ask", "Pregunte a");
    const response = await translate(
      {
        source_locale: "en-us",
        target_locale: "es",
        payload: { "actions.ask_mongodb_ai": "Ask MongoDB AI" },
        non_translatable_terms: ["MongoDB AI"],
      },
      { backend: new AwsTranslateBackend({ config, translateText: fn }) },
    );
    expect(response.translations).toEqual({
      "actions.ask_mongodb_ai": "Pregunte a MongoDB AI",
    });
    expect(response.meta.partial_failure).toBe(false);
    expect(response.meta.provider).toBe("aws-translate");
  });
});
