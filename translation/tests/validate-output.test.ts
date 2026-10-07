import { describe, expect, it } from "@jest/globals";
import { validateOutput } from "../src/validate-output.js";
import type { ProtectedSegment } from "../src/protect-segments.js";
import type { TranslationBatchResult } from "../src/types.js";

function makeSegment(overrides: Partial<ProtectedSegment> = {}): ProtectedSegment {
  return {
    key: "ask_mongodb_ai",
    source_text: "Ask MongoDB AI",
    source_locale: "en",
    target_locale: "es",
    content_type: "platform_strings",
    protected_terms: ["MongoDB"],
    protected_text: "Ask __PROT1__ AI",
    placeholders: { __PROT1__: "MongoDB" },
    ...overrides,
  };
}

function makeResult(
  items: TranslationBatchResult["items"],
): TranslationBatchResult {
  return { items, meta: { provider: "stub", model: "stub-v1" } };
}

describe("validateOutput", () => {
  it("passes through valid items with tokens intact", () => {
    const checks = validateOutput(
      [makeSegment()],
      makeResult([
        { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale a __PROT1__ AI" },
      ]),
    );
    expect(checks).toEqual([
      { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale a __PROT1__ AI" },
    ]);
  });

  it("flags a missing result as MISSING_RESULT", () => {
    const checks = validateOutput([makeSegment()], makeResult([]));
    expect(checks).toHaveLength(1);
    expect(checks[0]).toMatchObject({
      key: "ask_mongodb_ai",
      status: "error",
      error: { code: "MISSING_RESULT" },
    });
  });

  it("flags duplicate results as INVALID_OUTPUT", () => {
    const item = {
      key: "ask_mongodb_ai",
      status: "ok",
      text: "Pregúntale a __PROT1__ AI",
    } as const;
    const checks = validateOutput([makeSegment()], makeResult([item, item]));
    expect(checks[0]).toMatchObject({
      status: "error",
      error: { code: "INVALID_OUTPUT" },
    });
  });

  it("passes backend error items through unchanged", () => {
    const checks = validateOutput(
      [makeSegment()],
      makeResult([
        {
          key: "ask_mongodb_ai",
          status: "error",
          error: { code: "BACKEND_TIMEOUT", message: "took too long" },
        },
      ]),
    );
    expect(checks).toEqual([
      {
        key: "ask_mongodb_ai",
        status: "error",
        error: { code: "BACKEND_TIMEOUT", message: "took too long" },
      },
    ]);
  });

  it("flags non-string text as INVALID_OUTPUT", () => {
    const badItem = {
      key: "ask_mongodb_ai",
      status: "ok",
      text: 42,
    } as unknown as TranslationBatchResult["items"][number];
    const checks = validateOutput([makeSegment()], makeResult([badItem]));
    expect(checks[0]).toMatchObject({
      status: "error",
      error: { code: "INVALID_OUTPUT" },
    });
  });

  it("flags a dropped token as PLACEHOLDER_RESTORATION_FAILED", () => {
    const checks = validateOutput(
      [makeSegment()],
      makeResult([{ key: "ask_mongodb_ai", status: "ok", text: "Pregúntale AI" }]),
    );
    expect(checks[0]).toMatchObject({
      status: "error",
      error: { code: "PLACEHOLDER_RESTORATION_FAILED" },
    });
  });

  it("flags a mangled token as PLACEHOLDER_RESTORATION_FAILED", () => {
    const checks = validateOutput(
      [makeSegment()],
      makeResult([
        { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale a __BROKEN__ AI" },
      ]),
    );
    expect(checks[0]).toMatchObject({
      status: "error",
      error: { code: "PLACEHOLDER_RESTORATION_FAILED" },
    });
  });

  it("flags a duplicated token as PLACEHOLDER_RESTORATION_FAILED", () => {
    const checks = validateOutput(
      [makeSegment()],
      makeResult([
        {
          key: "ask_mongodb_ai",
          status: "ok",
          text: "__PROT1__ y __PROT1__ AI",
        },
      ]),
    );
    expect(checks[0]).toMatchObject({
      status: "error",
      error: { code: "PLACEHOLDER_RESTORATION_FAILED" },
    });
  });

  it("flags invented tokens as PLACEHOLDER_RESTORATION_FAILED", () => {
    const checks = validateOutput(
      [makeSegment()],
      makeResult([
        {
          key: "ask_mongodb_ai",
          status: "ok",
          text: "Pregúntale a __PROT1__ AI __PROT9__",
        },
      ]),
    );
    expect(checks[0]).toMatchObject({
      status: "error",
      error: { code: "PLACEHOLDER_RESTORATION_FAILED" },
    });
  });

  it("passes through a pre-existing __PROTn__-shaped literal that isn't a real placeholder", () => {
    const segment = makeSegment({
      key: "explains_tokens",
      source_text: "We use __PROT1__ internally",
      protected_terms: [],
      protected_text: "We use __PROT1__ internally",
      placeholders: {},
    });
    const checks = validateOutput(
      [segment],
      makeResult([
        { key: "explains_tokens", status: "ok", text: "Usamos __PROT1__ internamente" },
      ]),
    );
    expect(checks).toEqual([
      {
        key: "explains_tokens",
        status: "ok",
        text: "Usamos __PROT1__ internamente",
      },
    ]);
  });

  it("still flags a genuinely invented token even with no known placeholders", () => {
    const segment = makeSegment({
      key: "plain",
      source_text: "Hello world",
      protected_terms: [],
      protected_text: "Hello world",
      placeholders: {},
    });
    const checks = validateOutput(
      [segment],
      makeResult([
        { key: "plain", status: "ok", text: "Hola __PROT1__ mundo" },
      ]),
    );
    expect(checks[0]).toMatchObject({
      status: "error",
      error: { code: "PLACEHOLDER_RESTORATION_FAILED" },
    });
  });

  it("validates per key: one bad key does not affect the others", () => {
    const good = makeSegment();
    const bad = makeSegment({
      key: "atlas_cluster",
      source_text: "Atlas cluster",
      protected_terms: ["Atlas"],
      protected_text: "__PROT1__ cluster",
      placeholders: { __PROT1__: "Atlas" },
    });
    const checks = validateOutput(
      [good, bad],
      makeResult([
        { key: "ask_mongodb_ai", status: "ok", text: "Pregúntale a __PROT1__ AI" },
        { key: "atlas_cluster", status: "ok", text: "clúster de __BROKEN__" },
      ]),
    );
    expect(checks[0]?.status).toBe("ok");
    expect(checks[1]).toMatchObject({
      status: "error",
      error: { code: "PLACEHOLDER_RESTORATION_FAILED" },
    });
  });
});
