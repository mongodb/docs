/**
 * Translate entrypoint
 *
 * Orchestration only: runs each pipeline stage in order and assembles the
 * response. Request-level failures throw RequestValidationError; after
 * validation, every failure degrades to a per-key error instead of
 * throwing, including a whole-backend throw (mapped to BACKEND_ERROR for
 * every key so the response shape stays stable).
 */
import type {
  TranslateRequest,
  TranslateResponse,
  TranslationBackend,
  TranslationBatchRequest,
  TranslationBatchResult,
} from "./types.js";
import { validateRequest, RequestValidationError } from "./validation.js";
import { normalize } from "./normalize.js";
import { protectSegments } from "./protect-segments.js";
import { validateOutput } from "./validate-output.js";
import { buildResponse } from "./build-response.js";
import { BackendError } from "./backends/llm/errors.js";

export interface TranslateOptions {
  backend: TranslationBackend;
  /** Override the generated request id (useful for tracing and tests). */
  requestId?: string | undefined;
}

export async function translate(
  request: TranslateRequest,
  options: TranslateOptions,
): Promise<TranslateResponse> {
  const validation = validateRequest(request);
  if (!validation.ok) {
    throw new RequestValidationError(validation.issues);
  }
  const resolved = validation.request;
  const segments = protectSegments(normalize(resolved));

  const batch: TranslationBatchRequest = {
    source_locale: resolved.source_locale,
    target_locale: resolved.target_locale,
    content_type: resolved.content_type,
    items: segments.map((segment) => ({
      key: segment.key,
      text: segment.protected_text,
    })),
    backend_preferences: resolved.backend_preferences,
  };

  let result: TranslationBatchResult;
  try {
    result = await options.backend.translateBatch(batch);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    const code =
      cause instanceof BackendError && cause.reason === "provider_timeout"
        ? ("BACKEND_TIMEOUT" as const)
        : ("BACKEND_ERROR" as const);
    result = {
      items: segments.map((segment) => ({
        key: segment.key,
        status: "error" as const,
        error: {
          code,
          message: `Backend threw: ${message}`,
        },
      })),
      meta: { provider: options.backend.name, model: "unknown" },
    };
  }

  const outcomes = validateOutput(segments, result);
  return buildResponse({
    request: resolved,
    segments,
    outcomes,
    backendMeta: result.meta,
    requestId: options.requestId,
  });
}
