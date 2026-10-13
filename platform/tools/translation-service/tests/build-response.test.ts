import { describe, expect, it } from "@jest/globals";
import { buildResponse } from "../src/build-response.js";
import type { ProtectedSegment } from "../src/protect-segments.js";
import type { OutputCheck } from "../src/validate-output.js";
import type { ResolvedRequest } from "../src/types.js";

const request: ResolvedRequest = {
  source_locale: "en",
  target_locale: "es",
  content_type: "platform_strings",
  payload: {
    ask_mongodb_ai: "Ask MongoDB AI",
    docs_home: "Docs Home",
  },
  non_translatable_terms: ["MongoDB", "Docs"],
  backend_preferences: { provider: "auto", model: "auto" },
};

const segments: ProtectedSegment[] = [
  {
    key: "ask_mongodb_ai",
    source_text: "Ask MongoDB AI",
    source_locale: "en",
    target_locale: "es",
    content_type: "platform_strings",
    protected_terms: ["MongoDB"],
    protected_text: "Ask __PROT1__ AI",
    placeholders: { __PROT1__: "MongoDB" },
  },
  {
    key: "docs_home",
    source_text: "Docs Home",
    source_locale: "en",
    target_locale: "es",
    content_type: "platform_strings",
    protected_terms: ["Docs"],
    protected_text: "__PROT1__ Home",
    placeholders: { __PROT1__: "Docs" },
  },
];

const backendMeta = { provider: "stub", model: "stub-v1" };

describe("buildResponse", () => {
  it("restores protected terms and rebuilds the flat output", () => {
    const outcomes: OutputCheck[] = [
      { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale a __PROT1__ AI" },
      { key: "docs_home", status: "ok", text: "Inicio de __PROT1__" },
    ];
    const response = buildResponse({ request, segments, outcomes, backendMeta });
    expect(response.translations).toEqual({
      ask_mongodb_ai: "Pregúntale a MongoDB AI",
      docs_home: "Inicio de Docs",
    });
    expect(response.errors).toEqual({});
    expect(response.meta.partial_failure).toBe(false);
    expect(response.source_locale).toBe("en");
    expect(response.target_locale).toBe("es");
    expect(response.meta.provider).toBe("stub");
    expect(response.meta.model).toBe("stub-v1");
    expect(response.meta.content_type).toBe("platform_strings");
  });

  it("maps failed outcomes to null + errors and sets partial_failure", () => {
    const outcomes: OutputCheck[] = [
      { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale a __PROT1__ AI" },
      {
        key: "docs_home",
        status: "error",
        error: {
          code: "PLACEHOLDER_RESTORATION_FAILED",
          message: "Protected term token was modified during translation",
        },
      },
    ];
    const response = buildResponse({ request, segments, outcomes, backendMeta });
    expect(response.translations).toEqual({
      ask_mongodb_ai: "Pregúntale a MongoDB AI",
      docs_home: null,
    });
    expect(response.errors).toEqual({
      docs_home: {
        code: "PLACEHOLDER_RESTORATION_FAILED",
        message: "Protected term token was modified during translation",
      },
    });
    expect(response.meta.partial_failure).toBe(true);
  });

  it("falls back to PLACEHOLDER_RESTORATION_FAILED when restore fails", () => {
    // Outcome claims ok but the token is gone — restore() is the safety net.
    const outcomes: OutputCheck[] = [
      { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale AI" },
      { key: "docs_home", status: "ok", text: "Inicio de __PROT1__" },
    ];
    const response = buildResponse({ request, segments, outcomes, backendMeta });
    expect(response.translations["ask_mongodb_ai"]).toBeNull();
    expect(response.errors["ask_mongodb_ai"]?.code).toBe(
      "PLACEHOLDER_RESTORATION_FAILED",
    );
    expect(response.translations["docs_home"]).toBe("Inicio de Docs");
  });

  it("maps a segment with no outcome to MISSING_RESULT", () => {
    const outcomes: OutputCheck[] = [
      { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale a __PROT1__ AI" },
    ];
    const response = buildResponse({ request, segments, outcomes, backendMeta });
    expect(response.translations["docs_home"]).toBeNull();
    expect(response.errors["docs_home"]?.code).toBe("MISSING_RESULT");
  });

  it("preserves the request's key order in translations", () => {
    const outcomes: OutputCheck[] = [
      { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale a __PROT1__ AI" },
      { key: "docs_home", status: "ok", text: "Inicio de __PROT1__" },
    ];
    const response = buildResponse({ request, segments, outcomes, backendMeta });
    expect(Object.keys(response.translations)).toEqual([
      "ask_mongodb_ai",
      "docs_home",
    ]);
  });

  it("generates a req_-prefixed request id and honors an override", () => {
    const outcomes: OutputCheck[] = [];
    const generated = buildResponse({
      request,
      segments: [],
      outcomes,
      backendMeta,
    });
    expect(generated.meta.request_id).toMatch(/^req_[0-9a-f-]{36}$/);

    const overridden = buildResponse({
      request,
      segments: [],
      outcomes,
      backendMeta,
      requestId: "req_fixed",
    });
    expect(overridden.meta.request_id).toBe("req_fixed");
  });
});
