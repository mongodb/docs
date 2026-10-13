/**
 * GroveBackend — the first real TranslationBackend. Builds the Grove
 * Responses-API request, sends it via an injectable Transport, parses
 * the reply, and maps each input key to an ok result. Keys the model
 * omits are left out; the pipeline's validate-output stage flags them as
 * MISSING_RESULT. Whole-request failures throw BackendError, which the
 * orchestrator degrades to per-key errors.
 */
import type {
  TranslationBackend,
  TranslationBatchRequest,
  TranslationBatchResult,
  TranslationBatchResultItem,
} from "../../../types.js";
import { BackendError } from "../errors.js";
import type { Transport } from "../transport.js";
import type { GroveConfig } from "./config.js";
import { resolveGroveConfigFromEnv } from "./config.js";
import { buildGroveRequest } from "./request.js";
import { parseGroveResponse } from "./response.js";
import { createGroveTransport } from "./transport.js";

export interface GroveBackendOptions {
  config: GroveConfig;
  transport?: Transport;
}

export class GroveBackend implements TranslationBackend {
  readonly name = "grove";
  readonly #config: GroveConfig;
  readonly #transport: Transport;

  constructor(options: GroveBackendOptions) {
    this.#config = options.config;
    this.#transport =
      options.transport ?? createGroveTransport(options.config.timeoutMs);
  }

  async translateBatch(
    batch: TranslationBatchRequest,
  ): Promise<TranslationBatchResult> {
    const body = buildGroveRequest(batch, this.#config);
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
        message: `Grove returned HTTP ${response.status}`,
      });
    }

    const translations = parseGroveResponse(await response.text());

    const items: TranslationBatchResultItem[] = [];
    for (const item of batch.items) {
      const value = translations.get(item.key);
      if (value === undefined) continue;
      items.push({ key: item.key, status: "ok", text: value });
    }

    return {
      items,
      meta: { provider: this.name, model: this.#config.model },
    };
  }
}

export function createGroveBackend(
  overrides: Partial<GroveConfig> = {},
): GroveBackend {
  // Pass overrides INTO resolution so they can satisfy required fields
  // (e.g. apiKey) even when the env var is absent. Merging after
  // resolution would be too late — the required-field check throws first.
  const config = resolveGroveConfigFromEnv(process.env, overrides);
  return new GroveBackend({ config });
}
