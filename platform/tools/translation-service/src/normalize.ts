/**
 * JSON Normalizer
 *
 * Converts the validated flat payload into the internal Segment list the
 * rest of the pipeline operates on, so later stages see one consistent
 * structure regardless of the original content type. Pure and
 * order-preserving: segments appear in the payload's own key order.
 */
import type { ResolvedRequest, Segment } from "./types.js";
import { detectTerms } from "./protection-helpers.js";

export function normalize(request: ResolvedRequest): Segment[] {
  return Object.entries(request.payload).map(([key, source_text]) => ({
    key,
    source_text,
    source_locale: request.source_locale,
    target_locale: request.target_locale,
    content_type: request.content_type,
    protected_terms: detectTerms(source_text, request.non_translatable_terms),
  }));
}
