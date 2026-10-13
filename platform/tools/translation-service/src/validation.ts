/**
 * Request Validator
 *
 * Rejects bad input before the pipeline mutates data or calls a backend,
 * and resolves optional fields to their defaults. Failures here are
 * request-level: the caller gets a RequestValidationError for the whole
 * request, never a partial-failure response.
 */
import type { ContentType, ResolvedRequest, ValidationIssue } from "./types.js";
import { DEFAULT_CONTENT_TYPE } from "./types.js";

/** Loose BCP-47 check: accepts "en", "es", "en-us", "pt-br", "zh-cn". */
const LOCALE_PATTERN = /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/i;

const SUPPORTED_CONTENT_TYPES: readonly ContentType[] = ["platform_strings"];

export type ValidationResult =
  | { ok: true; request: ResolvedRequest }
  | { ok: false; issues: ValidationIssue[] };

/** Thrown by translate() when validation fails; carries every issue found. */
export class RequestValidationError extends Error {
  readonly code = "VALIDATION_FAILED";
  readonly issues: ValidationIssue[];

  constructor(issues: ValidationIssue[]) {
    const detail = issues.map((issue) => `${issue.path}: ${issue.message}`).join("; ");
    super(`Request validation failed: ${detail}`);
    this.name = "RequestValidationError";
    this.issues = issues;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateRequest(input: unknown): ValidationResult {
  if (!isPlainObject(input)) {
    return { ok: false, issues: [{ path: "", message: "request must be an object" }] };
  }

  const issues: ValidationIssue[] = [];
  const {
    source_locale,
    target_locale,
    content_type,
    payload,
    non_translatable_terms,
    backend_preferences,
  } = input;

  if (typeof source_locale !== "string" || !LOCALE_PATTERN.test(source_locale)) {
    issues.push({
      path: "source_locale",
      message: 'must be a valid locale tag such as "en" or "en-us"',
    });
  }
  if (typeof target_locale !== "string" || !LOCALE_PATTERN.test(target_locale)) {
    issues.push({
      path: "target_locale",
      message: 'must be a valid locale tag such as "es" or "pt-br"',
    });
  }

  let resolvedContentType: ContentType = DEFAULT_CONTENT_TYPE;
  if (content_type !== undefined) {
    if (
      typeof content_type === "string" &&
      (SUPPORTED_CONTENT_TYPES as readonly string[]).includes(content_type)
    ) {
      resolvedContentType = content_type as ContentType;
    } else {
      issues.push({
        path: "content_type",
        message: `must be one of: ${SUPPORTED_CONTENT_TYPES.join(", ")}`,
      });
    }
  }

  // Payload shape is content-type-specific; "platform_strings" is the only
  // supported type today, so this is the sole branch (add more as new
  // content types ship — see SUPPORTED_CONTENT_TYPES).
  // Object.create(null): a key literally named "__proto__" would otherwise
  // hit Object.prototype's accessor setter and silently vanish instead of
  // becoming an own property (payload keys are untrusted input).
  const resolvedPayload: Record<string, string> = Object.create(null) as Record<
    string,
    string
  >;
  if (resolvedContentType === "platform_strings") {
    if (!isPlainObject(payload)) {
      issues.push({
        path: "payload",
        message: "must be a flat object mapping string keys to string values",
      });
    } else {
      for (const [key, value] of Object.entries(payload)) {
        if (key.length === 0) {
          issues.push({ path: "payload", message: "keys must be non-empty strings" });
          continue;
        }
        if (typeof value !== "string") {
          issues.push({ path: `payload.${key}`, message: "value must be a string" });
          continue;
        }
        resolvedPayload[key] = value;
      }
    }
  }

  const resolvedTerms: string[] = [];
  if (non_translatable_terms !== undefined) {
    if (!Array.isArray(non_translatable_terms)) {
      issues.push({
        path: "non_translatable_terms",
        message: "must be an array of non-empty strings",
      });
    } else {
      non_translatable_terms.forEach((term, index) => {
        if (typeof term !== "string" || term.length === 0) {
          issues.push({
            path: `non_translatable_terms[${index}]`,
            message: "must be a non-empty string",
          });
        } else {
          resolvedTerms.push(term);
        }
      });
    }
  }

  let resolvedPreferences = { provider: "auto", model: "auto" };
  if (backend_preferences !== undefined) {
    if (
      !isPlainObject(backend_preferences) ||
      typeof backend_preferences["provider"] !== "string" ||
      typeof backend_preferences["model"] !== "string"
    ) {
      issues.push({
        path: "backend_preferences",
        message: "must be an object with string provider and model",
      });
    } else {
      resolvedPreferences = {
        provider: backend_preferences["provider"],
        model: backend_preferences["model"],
      };
    }
  }

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return {
    ok: true,
    request: {
      // Safe casts: a non-string would have produced an issue above.
      source_locale: source_locale as string,
      target_locale: target_locale as string,
      content_type: resolvedContentType,
      payload: resolvedPayload,
      non_translatable_terms: resolvedTerms,
      backend_preferences: resolvedPreferences,
    },
  };
}
