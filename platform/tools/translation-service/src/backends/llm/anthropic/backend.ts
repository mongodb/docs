/**
 * AnthropicBackend — a TranslationBackend for Claude models served on the
 * AI Gateway's Anthropic Messages path. Same flow as OpenAiBackend: build
 * the request, send it via an injectable Transport, parse the reply and map
 * each input key to an ok result. Whole-request failures throw BackendError,
 * which the orchestrator degrades to per-key errors.
 */
import type {
  TranslationBackend,
  TranslationBatchRequest,
  TranslationBatchResult,
} from "../../../types.js";
import { BackendError } from "../../errors.js";
import { toBatchResult } from "../batch.js";
import { createFetchTransport } from "../fetch-transport.js";
import type { Transport } from "../transport.js";
import type { AnthropicConfig } from "./config.js";
import { ANTHROPIC_PROVIDER, resolveAnthropicConfigFromEnv } from "./config.js";
import { buildAnthropicRequest } from "./request.js";
import { parseAnthropicResponse } from "./response.js";

const ANTHROPIC_VERSION = "2023-06-01";

export interface AnthropicBackendOptions {
  config: AnthropicConfig;
  transport?: Transport;
}

export class AnthropicBackend implements TranslationBackend {
  readonly name = ANTHROPIC_PROVIDER;
  readonly #config: AnthropicConfig;
  readonly #transport: Transport;

  constructor(options: AnthropicBackendOptions) {
    this.#config = options.config;
    this.#transport =
      options.transport ??
      createFetchTransport({
        timeoutMs: options.config.timeoutMs,
        provider: ANTHROPIC_PROVIDER,
      });
  }

  async translateBatch(
    batch: TranslationBatchRequest,
  ): Promise<TranslationBatchResult> {
    const body = buildAnthropicRequest(batch, this.#config);
    const response = await this.#transport({
      url: this.#config.endpoint,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.#config.apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new BackendError({
        stage: "provider",
        provider: this.name,
        reason: "provider_http_error",
        status: response.status,
        message: `Anthropic returned HTTP ${response.status}`,
      });
    }

    const translations = parseAnthropicResponse(await response.text());

    return {
      items: toBatchResult(batch, translations),
      meta: { provider: this.name, model: this.#config.model },
    };
  }
}

export function createAnthropicBackend(
  overrides: Partial<AnthropicConfig> = {},
): AnthropicBackend {
  const config = resolveAnthropicConfigFromEnv(process.env, overrides);
  return new AnthropicBackend({ config });
}
