import { describe, expect, it } from "@jest/globals";
import { normalize } from "../src/normalize.js";
import type { ResolvedRequest } from "../src/types.js";

function makeRequest(overrides: Partial<ResolvedRequest> = {}): ResolvedRequest {
  return {
    source_locale: "en",
    target_locale: "es",
    content_type: "platform_strings",
    payload: {
      ask_mongodb_ai: "Ask MongoDB AI",
      docs_home: "Docs Home",
    },
    non_translatable_terms: ["MongoDB", "Compass", "Atlas", "Docs"],
    backend_preferences: { provider: "auto", model: "auto" },
    ...overrides,
  };
}

describe("normalize", () => {
  it("converts the flat payload into segments in payload key order", () => {
    const segments = normalize(makeRequest(), ["MongoDB", "Compass", "Atlas", "Docs"]);
    expect(segments).toEqual([
      {
        key: "ask_mongodb_ai",
        source_text: "Ask MongoDB AI",
        source_locale: "en",
        target_locale: "es",
        content_type: "platform_strings",
        protected_terms: ["MongoDB"],
      },
      {
        key: "docs_home",
        source_text: "Docs Home",
        source_locale: "en",
        target_locale: "es",
        content_type: "platform_strings",
        protected_terms: ["Docs"],
      },
    ]);
  });

  it("detects only the terms present in each string", () => {
    const segments = normalize(
      makeRequest({ payload: { plain: "Hello world" } }),
      ["MongoDB", "Compass", "Atlas", "Docs"],
    );
    expect(segments).toEqual([
      {
        key: "plain",
        source_text: "Hello world",
        source_locale: "en",
        target_locale: "es",
        content_type: "platform_strings",
        protected_terms: [],
      },
    ]);
  });

  it("returns an empty list for an empty payload", () => {
    expect(normalize(makeRequest({ payload: {} }), ["MongoDB", "Compass", "Atlas", "Docs"])).toEqual([]);
  });

  it("does not mutate the request", () => {
    const request = makeRequest();
    const snapshot = structuredClone(request);
    normalize(request, ["MongoDB", "Compass", "Atlas", "Docs"]);
    expect(request).toEqual(snapshot);
  });

  it("matches the non-translatable terms it is given", () => {
    const segments = normalize(makeRequest({ payload: { a: "Atlas and Compass" } }), [
      "Atlas",
      "Compass",
    ]);
    expect(segments[0]?.protected_terms).toEqual(["Atlas", "Compass"]);
  });
});
