import { describe, expect, it } from "@jest/globals";
import { RequestValidationError, validateRequest } from "../src/validation.js";

const validRequest = {
  source_locale: "en",
  target_locale: "es",
  payload: {
    ask_mongodb_ai: "Ask MongoDB AI",
    docs_home: "Docs Home",
  },
};

describe("validateRequest", () => {
  it("accepts a minimal valid request and applies defaults", () => {
    const result = validateRequest(validRequest);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.request).toEqual({
      source_locale: "en",
      target_locale: "es",
      content_type: "platform_strings",
      payload: validRequest.payload,
      non_translatable_terms: [],
      backend_preferences: { provider: "auto", model: "auto" },
    });
  });

  it("accepts a fully specified request", () => {
    const result = validateRequest({
      ...validRequest,
      content_type: "platform_strings",
      non_translatable_terms: ["MongoDB", "Docs"],
      backend_preferences: { provider: "anthropic", model: "claude" },
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.request.non_translatable_terms).toEqual(["MongoDB", "Docs"]);
    expect(result.request.backend_preferences).toEqual({
      provider: "anthropic",
      model: "claude",
    });
  });

  it("accepts region locale tags and an empty payload", () => {
    const result = validateRequest({
      source_locale: "en-us",
      target_locale: "pt-br",
      payload: {},
    });
    expect(result.ok).toBe(true);
  });

  it("rejects a non-object request", () => {
    const result = validateRequest("nope");
    expect(result).toEqual({
      ok: false,
      issues: [{ path: "", message: "request must be an object" }],
    });
  });

  it("rejects invalid locales", () => {
    const result = validateRequest({
      ...validRequest,
      source_locale: "en_US",
      target_locale: "",
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    const paths = result.issues.map((issue) => issue.path);
    expect(paths).toContain("source_locale");
    expect(paths).toContain("target_locale");
  });

  it("rejects an unsupported content type", () => {
    const result = validateRequest({ ...validRequest, content_type: "markdown" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toEqual([
      { path: "content_type", message: 'must be one of: platform_strings' },
    ]);
  });

  it("rejects a payload that is not a flat string map", () => {
    const result = validateRequest({
      ...validRequest,
      payload: { docs_home: "Docs Home", broken: 42 },
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toEqual([
      { path: "payload.broken", message: "value must be a string" },
    ]);
  });

  it("preserves a payload key literally named __proto__", () => {
    // Object literal syntax can't create a real "__proto__" own property
    // (it's special-cased by JS itself), so simulate what a parsed JSON
    // request body would actually produce.
    const payload = JSON.parse(
      '{"__proto__":"Ask MongoDB","docs_home":"Docs Home"}',
    ) as Record<string, string>;
    const result = validateRequest({ ...validRequest, payload });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(Object.keys(result.request.payload).sort()).toEqual([
      "__proto__",
      "docs_home",
    ]);
    expect(result.request.payload["__proto__"]).toBe("Ask MongoDB");
    expect(Object.getPrototypeOf({})).toBe(Object.prototype); // no pollution
  });

  it("rejects a payload that is an array or missing", () => {
    expect(validateRequest({ ...validRequest, payload: ["Docs Home"] }).ok).toBe(false);
    const { payload: _payload, ...withoutPayload } = validRequest;
    expect(validateRequest(withoutPayload).ok).toBe(false);
  });

  it("rejects non-string non_translatable_terms entries with indexed paths", () => {
    const result = validateRequest({
      ...validRequest,
      non_translatable_terms: ["MongoDB", 7, ""],
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toEqual([
      { path: "non_translatable_terms[1]", message: "must be a non-empty string" },
      { path: "non_translatable_terms[2]", message: "must be a non-empty string" },
    ]);
  });

  it("collects multiple issues in a single pass", () => {
    const result = validateRequest({
      source_locale: "bad locale",
      target_locale: "es",
      payload: "not an object",
      backend_preferences: { provider: 1 },
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.length).toBeGreaterThanOrEqual(3);
  });
});

describe("RequestValidationError", () => {
  it("carries the issues and a readable message", () => {
    const error = new RequestValidationError([
      { path: "source_locale", message: "must be a valid locale tag" },
    ]);
    expect(error.code).toBe("VALIDATION_FAILED");
    expect(error.issues).toHaveLength(1);
    expect(error.message).toContain("source_locale");
    expect(error.name).toBe("RequestValidationError");
  });
});
