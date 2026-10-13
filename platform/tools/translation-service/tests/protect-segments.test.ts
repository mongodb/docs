import { describe, expect, it } from "@jest/globals";
import { protectSegments } from "../src/protect-segments.js";
import type { Segment } from "../src/types.js";

function makeSegment(overrides: Partial<Segment> = {}): Segment {
  return {
    key: "ask_mongodb_ai",
    source_text: "Ask MongoDB AI",
    source_locale: "en",
    target_locale: "es",
    content_type: "platform_strings",
    protected_terms: ["MongoDB"],
    ...overrides,
  };
}

describe("protectSegments", () => {
  it("replaces protected terms and records the restoration map", () => {
    const [result] = protectSegments([makeSegment()]);
    expect(result?.protected_text).toBe("Ask __PROT1__ AI");
    expect(result?.placeholders).toEqual({ __PROT1__: "MongoDB" });
  });

  it("keeps all original segment fields", () => {
    const segment = makeSegment();
    const [result] = protectSegments([segment]);
    expect(result).toMatchObject({ ...segment });
  });

  it("leaves text unchanged when the segment has no protected terms", () => {
    const [result] = protectSegments([
      makeSegment({ key: "plain", source_text: "Hello world", protected_terms: [] }),
    ]);
    expect(result?.protected_text).toBe("Hello world");
    expect(result?.placeholders).toEqual({});
  });

  it("numbers tokens per segment, not per request", () => {
    const results = protectSegments([
      makeSegment(),
      makeSegment({
        key: "open_compass",
        source_text: "Open Compass",
        protected_terms: ["Compass"],
      }),
    ]);
    expect(results[0]?.placeholders).toEqual({ __PROT1__: "MongoDB" });
    expect(results[1]?.placeholders).toEqual({ __PROT1__: "Compass" });
  });

  it("returns an empty list for no segments", () => {
    expect(protectSegments([])).toEqual([]);
  });

  it("skips a token number that already appears literally in the source", () => {
    const [result] = protectSegments([
      makeSegment({
        source_text: "See __PROT1__ for how MongoDB escapes terms",
        protected_terms: ["MongoDB"],
      }),
    ]);
    // __PROT1__ pre-exists in the source and is left untouched; the real
    // placeholder for "MongoDB" must use a different, novel token number.
    expect(result?.protected_text).toBe(
      "See __PROT1__ for how __PROT2__ escapes terms",
    );
    expect(result?.placeholders).toEqual({ __PROT2__: "MongoDB" });
  });
});
