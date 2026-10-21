/**
 * AwsTranslateBackend — a machine-translation TranslationBackend, used to
 * compare AWS Translate output against the LLM backends. TranslateText
 * takes one string per call, so a batch fans out into concurrent calls.
 *
 * Failures are split by scope. Problems tied to one string (too large,
 * timed out, mangled markup) become per-key error items. Problems that
 * would fail every string (credentials, throttling after SDK retries,
 * service errors) stop the batch and throw BackendError, which the
 * orchestrator degrades to per-key errors without spending more calls.
 */
import type {
  TranslationBackend,
  TranslationBatchItem,
  TranslationBatchRequest,
  TranslationBatchResult,
  TranslationBatchResultItem,
  TranslationError,
} from "../../types.js";
import { excerpt } from "../../excerpt.js";
import { BackendError } from "../errors.js";
import type { TranslateTextFn } from "./client.js";
import { createAwsTranslateText } from "./client.js";
import type { AwsTranslateConfig } from "./config.js";
import {
  AWS_TRANSLATE_MODEL,
  AWS_TRANSLATE_PROVIDER,
  resolveAwsTranslateConfigFromEnv,
} from "./config.js";
import { toAwsLanguageCode } from "./locales.js";
import { fromAwsText, toAwsText } from "./markup.js";

/** TranslateText rejects input larger than this many UTF-8 bytes. */
export const AWS_MAX_TEXT_BYTES = 10_000;

export interface AwsTranslateBackendOptions {
  config: AwsTranslateConfig;
  translateText?: TranslateTextFn;
}

function failed(key: string, error: TranslationError): TranslationBatchResultItem {
  return { key, status: "error", error };
}

function errorName(cause: unknown): string | undefined {
  return cause instanceof Error ? cause.name : undefined;
}

function httpStatus(cause: unknown): number | undefined {
  if (typeof cause !== "object" || cause === null) return undefined;
  const metadata = (cause as { $metadata?: { httpStatusCode?: unknown } })
    .$metadata;
  return typeof metadata?.httpStatusCode === "number"
    ? metadata.httpStatusCode
    : undefined;
}

function requestId(cause: unknown): string | undefined {
  if (typeof cause !== "object" || cause === null) return undefined;
  const metadata = (cause as { $metadata?: { requestId?: unknown } }).$metadata;
  return typeof metadata?.requestId === "string" ? metadata.requestId : undefined;
}

function errorDetail(cause: unknown): string {
  const name = errorName(cause);
  const message = cause instanceof Error ? cause.message : String(cause);
  return name ? `${name}: ${message}` : message;
}

/** HTTP status and AWS request id, which AWS Support asks for. */
function awsContext(cause: unknown): string {
  const status = httpStatus(cause);
  const id = requestId(cause);
  const parts = [
    ...(status !== undefined ? [`HTTP ${status}`] : []),
    ...(id !== undefined ? [`request id ${id}`] : []),
  ];
  return parts.length > 0 ? ` (${parts.join(", ")})` : "";
}

function toBackendError(cause: unknown): BackendError {
  if (cause instanceof BackendError) return cause;
  const status = httpStatus(cause);
  const id = requestId(cause);
  return new BackendError({
    stage: "provider",
    provider: AWS_TRANSLATE_PROVIDER,
    reason: "provider_http_error",
    message: `AWS Translate request failed: ${errorDetail(cause)}${awsContext(cause)}`,
    ...(status !== undefined ? { status } : {}),
    ...(id !== undefined ? { requestId: id } : {}),
    cause,
  });
}

/**
 * Like Promise.all over `items`, with at most `limit` calls in flight.
 * After the first rejection no new items start, so a batch-wide failure
 * doesn't keep spending calls that would fail the same way.
 */
async function mapWithConcurrency<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  let stopped = false;
  const worker = async (): Promise<void> => {
    while (!stopped && next < items.length) {
      const index = next++;
      try {
        results[index] = await fn(items[index]!);
      } catch (error) {
        stopped = true;
        throw error;
      }
    }
  };
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    worker,
  );
  await Promise.all(workers);
  return results;
}

export class AwsTranslateBackend implements TranslationBackend {
  readonly name = AWS_TRANSLATE_PROVIDER;
  readonly #config: AwsTranslateConfig;
  readonly #translateText: TranslateTextFn;

  constructor(options: AwsTranslateBackendOptions) {
    this.#config = options.config;
    this.#translateText =
      options.translateText ?? createAwsTranslateText(options.config.region);
  }

  async translateBatch(
    batch: TranslationBatchRequest,
  ): Promise<TranslationBatchResult> {
    const meta = { provider: this.name, model: AWS_TRANSLATE_MODEL };
    const source = toAwsLanguageCode(batch.source_locale);
    const target = toAwsLanguageCode(batch.target_locale);

    if (source === undefined || target === undefined) {
      const locale = source === undefined ? batch.source_locale : batch.target_locale;
      const error: TranslationError = {
        code: "UNSUPPORTED_LOCALE",
        message: `AWS Translate does not support locale "${locale}"`,
      };
      return {
        items: batch.items.map((item) => failed(item.key, error)),
        meta,
      };
    }

    const items = await mapWithConcurrency(
      batch.items,
      this.#config.concurrency,
      (item) => this.#translateItem(item, source, target),
    );
    return { items, meta };
  }

  async #translateItem(
    item: TranslationBatchItem,
    sourceLanguageCode: string,
    targetLanguageCode: string,
  ): Promise<TranslationBatchResultItem> {
    // TranslateText requires at least one character.
    if (item.text.trim() === "") {
      return { key: item.key, status: "ok", text: item.text };
    }

    const text = toAwsText(item.text);
    const bytes = Buffer.byteLength(text, "utf8");
    if (bytes > AWS_MAX_TEXT_BYTES) {
      return failed(item.key, {
        code: "TRANSLATION_FAILED",
        message: `Text is ${bytes} bytes after markup; AWS Translate accepts at most ${AWS_MAX_TEXT_BYTES}`,
      });
    }

    const signal = AbortSignal.timeout(this.#config.timeoutMs);
    let translated: string;
    try {
      translated = await this.#translateText(
        { text, sourceLanguageCode, targetLanguageCode },
        signal,
      );
    } catch (cause) {
      if (signal.aborted) {
        return failed(item.key, {
          code: "BACKEND_TIMEOUT",
          message: `AWS Translate request timed out after ${this.#config.timeoutMs}ms (${bytes} bytes sent)`,
        });
      }
      if (errorName(cause) === "TextSizeLimitExceededException") {
        return failed(item.key, {
          code: "TRANSLATION_FAILED",
          message: `AWS Translate rejected the text as too large (${bytes} bytes after markup): ${errorDetail(cause)}${awsContext(cause)}`,
        });
      }
      throw toBackendError(cause);
    }

    const restored = fromAwsText(translated);
    if (!restored.ok) {
      return failed(item.key, {
        code: "INVALID_OUTPUT",
        message: `${restored.message}; sent ${excerpt(text)}`,
      });
    }
    return { key: item.key, status: "ok", text: restored.text };
  }
}

export function createAwsTranslateBackend(
  overrides: Partial<AwsTranslateConfig> = {},
): AwsTranslateBackend {
  const config = resolveAwsTranslateConfigFromEnv(process.env, overrides);
  return new AwsTranslateBackend({ config });
}
