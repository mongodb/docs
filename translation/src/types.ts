/**
 * Translation Service — public contract and core types.
 *
 * Plain TypeScript types only. Runtime validation lives in validation.ts.
 */

/** supports flat platform strings only. Add members as new types ship. */
export type ContentType = "platform_strings";

export const DEFAULT_CONTENT_TYPE: ContentType = "platform_strings";

/** Stable error identifiers callers can branch on; messages are free text. */
export type TranslationErrorCode =
  | "VALIDATION_FAILED"
  | "UNSUPPORTED_LOCALE"
  | "TRANSLATION_FAILED"
  | "PLACEHOLDER_RESTORATION_FAILED"
  | "INVALID_OUTPUT"
  | "MISSING_RESULT"
  | "BACKEND_TIMEOUT"
  | "BACKEND_ERROR";

export interface TranslationError {
  code: TranslationErrorCode;
  message: string;
}

/** Caller hints for backend selection. "auto" lets the orchestrator decide. */
export interface BackendPreferences {
  provider: string;
  model: string;
}

// --- Wire contract: POST /v1/translate -------------------------------------

export interface TranslateRequest {
  source_locale: string;
  target_locale: string;
  /** Defaults to "platform_strings" when omitted. */
  content_type?: ContentType;
  /** Flat map; keys are preserved verbatim, only values are translated. */
  payload: Record<string, string>;
  /** Terms that must survive translation unchanged. Defaults to empty. */
  non_translatable_terms?: string[];
  backend_preferences?: BackendPreferences;
}

/** A request after validation, with all optional fields defaulted. */
export interface ResolvedRequest {
  source_locale: string;
  target_locale: string;
  content_type: ContentType;
  payload: Record<string, string>;
  non_translatable_terms: string[];
  backend_preferences: BackendPreferences;
}

export interface TranslateResponse {
  source_locale: string;
  target_locale: string;
  /** `null` marks a failed key; its entry appears in `errors`. */
  translations: Record<string, string | null>;
  /** Per-key errors, keyed by the original input key. Empty when none. */
  errors: Record<string, TranslationError>;
  meta: {
    provider: string;
    model: string;
    content_type: ContentType;
    partial_failure: boolean;
    request_id: string;
  };
}

/** A single problem found during request validation. */
export interface ValidationIssue {
  /** Dotted path to the offending field, e.g. "payload.docs_home". */
  path: string;
  message: string;
}

// --- Internal model --------------------------------------------------------

/** One key/value unit produced by the JSON Normalizer. */
export interface Segment {
  key: string;
  source_text: string;
  source_locale: string;
  target_locale: string;
  content_type: ContentType;
  protected_terms: string[];
}

// --- Backend adapter seam --------------------------------------------------

/** `text` is the protected form (placeholders already substituted in). */
export interface TranslationBatchItem {
  key: string;
  text: string;
}

export interface TranslationBatchRequest {
  source_locale: string;
  target_locale: string;
  content_type: ContentType;
  items: TranslationBatchItem[];
  backend_preferences: BackendPreferences;
}

/** Discriminated on `status` so failures stay isolated per key. */
export type TranslationBatchResultItem =
  | { key: string; status: "ok"; text: string }
  | { key: string; status: "error"; error: TranslationError };

export interface TranslationBatchResult {
  items: TranslationBatchResultItem[];
  meta: { provider: string; model: string };
}

/**
 * The single seam every backend implements. The orchestrator depends
 * only on this, keeping the service provider- and LLM-agnostic.
 */
export interface TranslationBackend {
  readonly name: string;
  translateBatch(
    request: TranslationBatchRequest,
  ): Promise<TranslationBatchResult>;
}
