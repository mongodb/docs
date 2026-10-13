/**
 * Output Validator
 *
 * The backend's output is untrusted: placeholder tokens may have been
 * translated, dropped, duplicated, or invented, and items may be missing
 * or malformed. Validates per segment — never only per batch — because
 * the response contract supports per-key failures.
 */
import type { TranslationBatchResult, TranslationError } from "./types.js";
import type { ProtectedSegment } from "./protect-segments.js";

export type OutputCheck =
  | { key: string; status: "ok"; text: string }
  | { key: string; status: "error"; error: TranslationError };

const TOKEN_PATTERN = /__PROT\d+__/g;

function countOccurrences(text: string, token: string): number {
  return text.split(token).length - 1;
}

function fail(key: string, error: TranslationError): OutputCheck {
  return { key, status: "error", error };
}

export function validateOutput(
  segments: ProtectedSegment[],
  result: TranslationBatchResult,
): OutputCheck[] {
  return segments.map((segment) => {
    const matches = result.items.filter((item) => item.key === segment.key);
    const item = matches[0];
    if (item === undefined) {
      return fail(segment.key, {
        code: "MISSING_RESULT",
        message: "Backend returned no result for this key",
      });
    }
    if (matches.length > 1) {
      return fail(segment.key, {
        code: "INVALID_OUTPUT",
        message: "Backend returned duplicate results for this key",
      });
    }
    if (item.status === "error") {
      return fail(segment.key, item.error);
    }
    if (typeof item.text !== "string") {
      return fail(segment.key, {
        code: "INVALID_OUTPUT",
        message: "Backend returned a non-string value for this key",
      });
    }

    // Compare counts for every __PROTn__-shaped token seen in either side,
    // not just the ones we inserted: source text may already contain a
    // look-alike substring unrelated to protection (e.g. text describing
    // this placeholder scheme itself). A token that appears the same
    // number of times before and after translation was left alone —
    // whether or not it's a real placeholder — so only a count mismatch
    // (mangled, dropped, or invented) is a real failure.
    const seenTokens = new Set([
      ...(segment.protected_text.match(TOKEN_PATTERN) ?? []),
      ...(item.text.match(TOKEN_PATTERN) ?? []),
    ]);
    for (const token of seenTokens) {
      const expected = countOccurrences(segment.protected_text, token);
      const actual = countOccurrences(item.text, token);
      if (expected !== actual) {
        return fail(segment.key, {
          code: "PLACEHOLDER_RESTORATION_FAILED",
          message: `Protected term token ${token} was modified during translation (expected ${expected}, found ${actual})`,
        });
      }
    }

    return { key: segment.key, status: "ok", text: item.text };
  });
}
