import { describe, expect, it } from "@jest/globals";
import { EXCERPT_MAX_CHARS, excerpt } from "../src/excerpt.js";

describe("excerpt", () => {
  it("quotes short text in full", () => {
    expect(excerpt("Pregunte a <b>x</b>")).toBe('"Pregunte a <b>x</b>"');
  });

  it("makes whitespace and control characters visible", () => {
    expect(excerpt("a\nb\t\u0000")).toBe('"a\\nb\\t\\u0000"');
  });

  it("truncates long text and reports how much was cut", () => {
    const text = "x".repeat(EXCERPT_MAX_CHARS + 25);
    expect(excerpt(text)).toBe(
      `${JSON.stringify("x".repeat(EXCERPT_MAX_CHARS))} (+25 more chars)`,
    );
  });

  it("accepts a custom limit", () => {
    expect(excerpt("abcdef", 3)).toBe('"abc" (+3 more chars)');
  });
});
