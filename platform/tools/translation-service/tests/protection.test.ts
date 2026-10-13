import { describe, expect, it } from "@jest/globals";
import { detectTerms, protect, restore } from "../src/protection-helpers.js";

describe("detectTerms", () => {
  it("returns only terms present in the text, in supplied order", () => {
    expect(detectTerms("MongoDB Atlas", ["Atlas", "MongoDB", "Compass"])).toEqual([
      "Atlas",
      "MongoDB",
    ]);
  });

  it("ignores empty and duplicate terms", () => {
    expect(detectTerms("Ask MongoDB AI", ["", "MongoDB", "MongoDB"])).toEqual([
      "MongoDB",
    ]);
  });

  it("is case-sensitive", () => {
    expect(detectTerms("ask mongodb ai", ["MongoDB"])).toEqual([]);
  });
});

describe("protect", () => {
  it("replaces a single term with __PROT1__", () => {
    const result = protect("Ask MongoDB AI", ["MongoDB"]);
    expect(result.text).toBe("Ask __PROT1__ AI");
    expect(result.placeholders).toEqual({ __PROT1__: "MongoDB" });
  });

  it("replaces longer terms before shorter overlapping ones", () => {
    const result = protect("Use Atlas Search with Atlas", ["Atlas", "Atlas Search"]);
    expect(result.text).toBe("Use __PROT1__ with __PROT2__");
    expect(result.placeholders).toEqual({
      __PROT1__: "Atlas Search",
      __PROT2__: "Atlas",
    });
  });

  it("replaces every occurrence of a term with the same token", () => {
    const result = protect("Docs and Docs", ["Docs"]);
    expect(result.text).toBe("__PROT1__ and __PROT1__");
    expect(result.placeholders).toEqual({ __PROT1__: "Docs" });
  });

  it("returns text unchanged when no terms match", () => {
    const result = protect("Docs Home", ["Compass"]);
    expect(result.text).toBe("Docs Home");
    expect(result.placeholders).toEqual({});
  });

  it("restarts token numbering on each call (per-segment numbering)", () => {
    const first = protect("Ask MongoDB AI", ["MongoDB"]);
    const second = protect("Open Compass", ["Compass"]);
    expect(first.placeholders).toEqual({ __PROT1__: "MongoDB" });
    expect(second.placeholders).toEqual({ __PROT1__: "Compass" });
  });
});

describe("restore", () => {
  it("swaps tokens back to their original terms", () => {
    const result = restore("Pregúntale a __PROT1__ AI", { __PROT1__: "MongoDB" });
    expect(result).toEqual({
      text: "Pregúntale a MongoDB AI",
      ok: true,
      missing: [],
    });
  });

  it("restores multiple tokens in one string", () => {
    const result = restore("Usa __PROT1__ con __PROT2__", {
      __PROT1__: "Atlas Search",
      __PROT2__: "Atlas",
    });
    expect(result.text).toBe("Usa Atlas Search con Atlas");
    expect(result.ok).toBe(true);
  });

  it("reports missing tokens when the backend mangled them", () => {
    const result = restore("Pregúntale a __BROKEN__ AI", { __PROT1__: "MongoDB" });
    expect(result.ok).toBe(false);
    expect(result.missing).toEqual(["__PROT1__"]);
  });

  it("restores intact tokens even when another token is missing", () => {
    const result = restore("__PROT1__ y __LOST__", {
      __PROT1__: "MongoDB",
      __PROT2__: "Atlas",
    });
    expect(result.text).toBe("MongoDB y __LOST__");
    expect(result.ok).toBe(false);
    expect(result.missing).toEqual(["__PROT2__"]);
  });
});
