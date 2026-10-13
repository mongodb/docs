/**
 * Response Builder
 *
 * Restores protected terms in validated translations, rebuilds the flat
 * translations object keyed exactly like the request, attaches per-key
 * errors (failed keys become null), and computes response metadata.
 */
import { randomUUID } from "node:crypto";
import type { ResolvedRequest, TranslateResponse } from "./types.js";
import type { ProtectedSegment } from "./protect-segments.js";
import type { OutputCheck } from "./validate-output.js";
import { restore } from "./protection-helpers.js";

export interface BuildResponseArgs {
  request: ResolvedRequest;
  segments: ProtectedSegment[];
  outcomes: OutputCheck[];
  backendMeta: { provider: string; model: string };
  requestId?: string | undefined;
}

export function buildResponse(args: BuildResponseArgs): TranslateResponse {
  const { request, segments, outcomes, backendMeta } = args;
  const outcomeByKey = new Map(outcomes.map((outcome) => [outcome.key, outcome]));
  // Object.create(null): segment keys are untrusted input; a key literally
  // named "__proto__" would otherwise hit Object.prototype's accessor
  // setter and silently vanish instead of becoming an own property.
  const translations: TranslateResponse["translations"] = Object.create(
    null,
  ) as TranslateResponse["translations"];
  const errors: TranslateResponse["errors"] = Object.create(
    null,
  ) as TranslateResponse["errors"];

  for (const segment of segments) {
    const outcome = outcomeByKey.get(segment.key);
    if (outcome === undefined) {
      // Defensive: validateOutput always yields one check per segment.
      translations[segment.key] = null;
      errors[segment.key] = {
        code: "MISSING_RESULT",
        message: "No validated output for this key",
      };
      continue;
    }
    if (outcome.status === "error") {
      translations[segment.key] = null;
      errors[segment.key] = outcome.error;
      continue;
    }
    const restored = restore(outcome.text, segment.placeholders);
    if (!restored.ok) {
      translations[segment.key] = null;
      errors[segment.key] = {
        code: "PLACEHOLDER_RESTORATION_FAILED",
        message: `Missing placeholder token(s): ${restored.missing.join(", ")}`,
      };
      continue;
    }
    translations[segment.key] = restored.text;
  }

  return {
    source_locale: request.source_locale,
    target_locale: request.target_locale,
    translations,
    errors,
    meta: {
      provider: backendMeta.provider,
      model: backendMeta.model,
      content_type: request.content_type,
      partial_failure: Object.keys(errors).length > 0,
      request_id: args.requestId ?? `req_${randomUUID()}`,
    },
  };
}
