/**
 * Protection stage
 *
 * Applies placeholder protection to every segment, producing text that is
 * safe to send to a backend plus the per-segment restoration map. Token
 * numbering restarts at __PROT1__ for each segment; tokens only need to be
 * unique within one string because each segment carries its own map.
 */
import type { Segment } from "./types.js";
import { protect } from "./protection-helpers.js";

export interface ProtectedSegment extends Segment {
  /** Segment text with protected terms replaced by __PROTn__ tokens. */
  protected_text: string;
  /** token -> original term, for this segment only. */
  placeholders: Record<string, string>;
}

export function protectSegments(segments: Segment[]): ProtectedSegment[] {
  return segments.map((segment) => {
    const { text, placeholders } = protect(segment.source_text, segment.protected_terms);
    return { ...segment, protected_text: text, placeholders };
  });
}
