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

  it("ignores a term that only occurs inside a larger word", () => {
    // A short glossary term must not match a word fragment: protecting `C`
    // inside `Connect` freezes the word and blocks its translation.
    expect(detectTerms("Connect to Atlas", ["C"])).toEqual([]);
    expect(detectTerms("Godzilla Returns", ["Go", "R"])).toEqual([]);
  });

  it("still finds a term that stands alone", () => {
    expect(detectTerms("C is a language", ["C"])).toEqual(["C"]);
  });

  it("matches regardless of case when asked", () => {
    expect(detectTerms("Commit your changes", ["commit"], { ignoreCase: true })).toEqual([
      "commit",
    ]);
  });

  it("stays case-sensitive by default", () => {
    expect(detectTerms("Commit your changes", ["commit"])).toEqual([]);
  });
});

describe("boundary matching", () => {
  it("does not freeze a word fragment", () => {
    const result = protect("Connect to Atlas", ["C", "Atlas"]);
    expect(result.text).toBe("Connect to __PROT1__");
    expect(result.placeholders).toEqual({ __PROT1__: "Atlas" });
  });

  it("still protects C++ and C# as whole terms", () => {
    const result = protect("C++ and C# are languages", ["C", "C++", "C#"]);
    expect(result.text).toBe("__PROT1__ and __PROT2__ are languages");
  });
});

describe("adapter inline tokens", () => {
  // The MDX adapter fences every inline placeholder in Private Use Area
  // delimiters and glues it to the text it wraps (`…O0<delim>Save`), so both
  // edges of a token are non-word characters. A boundary guard on such an
  // edge can never match, so the token would reach the model unprotected.
  const PUA_START = "\uE000";
  const PUA_END = "\uE001";
  const open = (n: number) => `${PUA_START}O${n}${PUA_END}`;
  const close = (n: number) => `${PUA_START}C${n}${PUA_END}`;

  it("protects a wrap pair glued to its text", () => {
    const result = protect(`Click ${open(0)}Save${close(0)}.`, [open(0), close(0)]);
    expect(result.text).toBe("Click __PROT1__Save__PROT2__.");
    expect(result.placeholders).toEqual({
      __PROT1__: open(0),
      __PROT2__: close(0),
    });
  });

  it("protects every token in a block with two wraps", () => {
    const text =
      `Click ${open(0)}Save${close(0)} to apply the ` +
      `${open(1)}shard key${close(1)}.`;
    const result = protect(text, [open(0), close(0), open(1), close(1)]);
    expect(result.text).toBe(
      "Click __PROT1__Save__PROT2__ to apply the __PROT3__shard key__PROT4__.",
    );
    expect(Object.values(result.placeholders)).toEqual([
      open(0),
      close(0),
      open(1),
      close(1),
    ]);
  });

  it("protects an opaque token glued to following text", () => {
    const self = `${PUA_START}S0${PUA_END}`;
    const result = protect(`Run ${self}binary now.`, [self]);
    expect(result.text).toBe("Run __PROT1__binary now.");
    expect(result.placeholders).toEqual({ __PROT1__: self });
  });

  it("leaves no delimiter in the text sent to the model", () => {
    const text = `Click ${open(0)}Save${close(0)}.`;
    const { text: protectedText } = protect(text, [open(0), close(0)]);
    expect(protectedText).not.toContain(PUA_START);
    expect(protectedText).not.toContain(PUA_END);
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
