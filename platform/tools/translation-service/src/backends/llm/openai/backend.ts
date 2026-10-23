/**
 * OpenAiBackend — a TranslationBackend for models served on the AI
 * Gateway's OpenAI Responses path. Builds the request, sends it via an
 * injectable Transport, parses the reply, and maps each input key to an ok
 * result. Whole-request failures throw BackendError, which the orchestrator
 * degrades to per-key errors.
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
import type { OpenAiConfig } from "./config.js";
import { OPENAI_PROVIDER, resolveOpenAiConfigFromEnv } from "./config.js";
import { buildOpenAiRequest } from "./request.js";
import { parseOpenAiResponse } from "./response.js";

export interface OpenAiBackendOptions {
  config: OpenAiConfig;
  transport?: Transport;
}

export class OpenAiBackend implements TranslationBackend {
  readonly name = OPENAI_PROVIDER;
  readonly #config: OpenAiConfig;
  readonly #transport: Transport;

  constructor(options: OpenAiBackendOptions) {
    this.#config = options.config;
    this.#transport =
      options.transport ??
      createFetchTransport({
        timeoutMs: options.config.timeoutMs,
        provider: OPENAI_PROVIDER,
      });
  }

  async translateBatch(
    batch: TranslationBatchRequest,
  ): Promise<TranslationBatchResult> {
    const body = buildOpenAiRequest(batch, this.#config);
    const response = await this.#transport({
      url: this.#config.endpoint,
      headers: {
        "Content-Type": "application/json",
        "api-key": this.#config.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new BackendError({
        stage: "provider",
        provider: this.name,
        reason: "provider_http_error",
        status: response.status,
        message: `OpenAI returned HTTP ${response.status}`,
      });
    }

    const translations = parseOpenAiResponse(await response.text());

    return {
      items: toBatchResult(batch, translations),
      meta: { provider: this.name, model: this.#config.model },
    };
  }
}

export function createOpenAiBackend(
  overrides: Partial<OpenAiConfig> = {},
): OpenAiBackend {
  // Pass overrides INTO resolution so they can satisfy required fields
  // (e.g. apiKey) even when the env var is absent. Merging after
  // resolution would be too late — the required-field check throws first.
  const config = resolveOpenAiConfigFromEnv(process.env, overrides);
  return new OpenAiBackend({ config });
}
