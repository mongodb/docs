/**
 * TEST/DEV FIXTURE — NOT A PRODUCTION BACKEND.
 *
 * Deterministic fake `TranslationBackend` so the pipeline can be built and
 * tested before a real LLM/MT adapter exists. "Translates" by prefixing the
 * target locale, which keeps __PROTn__ placeholder tokens intact.
 * Fault-injection options simulate the backend failures the pipeline must
 * isolate per key (missing results, per-key errors, mangled tokens) —
 * failure modes a real backend can't be made to trigger on demand.
 *
  */
import type {
  TranslationBackend,
  TranslationBatchRequest,
  TranslationBatchResult,
  TranslationBatchResultItem,
  TranslationError,
} from "../types.js";

export interface StubBackendOptions {
  /** Return an error result for these keys. */
  errorFor?: Record<string, TranslationError>;
  /** Mangle the first placeholder token in these keys' output. */
  corruptTokensFor?: string[];
  /** Leave these keys out of the result entirely. */
  omitKeys?: string[];
  /** Reported in result meta; defaults to "stub-v1". */
  model?: string;
}

export class StubBackend implements TranslationBackend {
  readonly name = "stub";
  readonly #options: StubBackendOptions;

  constructor(options: StubBackendOptions = {}) {
    this.#options = options;
  }

  async translateBatch(
    request: TranslationBatchRequest,
  ): Promise<TranslationBatchResult> {
    const { errorFor = {}, corruptTokensFor = [], omitKeys = [] } = this.#options;
    const items: TranslationBatchResultItem[] = [];

    for (const item of request.items) {
      if (omitKeys.includes(item.key)) continue;

      // Object.hasOwn, not a bracket read + undefined check: item.key is
      // untrusted and may be "__proto__", for which errorFor[item.key]
      // would return Object.prototype (a truthy inherited value) instead
      // of undefined, even when errorFor was never populated for that key.
      if (Object.hasOwn(errorFor, item.key)) {
        // Non-null: Object.hasOwn just confirmed this key has a value.
        items.push({ key: item.key, status: "error", error: errorFor[item.key]! });
        continue;
      }

      let text = `[${request.target_locale}] ${item.text}`;
      if (corruptTokensFor.includes(item.key)) {
        if (!/__PROT\d+__/.test(text)) {
          // Fixture misuse, not a runtime condition: a key listed here
          // must have a placeholder token to mangle, or the test author
          // gets a silently-passing "corruption" that never happened.
          throw new Error(
            `StubBackend: corruptTokensFor lists "${item.key}", but its text has no __PROTn__ token to corrupt`,
          );
        }
        text = text.replace(/__PROT\d+__/, "__BROKEN__");
      }
      items.push({ key: item.key, status: "ok", text });
    }

    return {
      items,
      meta: { provider: "stub", model: this.#options.model ?? "stub-v1" },
    };
  }
}
