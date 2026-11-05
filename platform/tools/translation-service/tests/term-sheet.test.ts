import { describe, expect, it } from "@jest/globals";
import { buildTermSheet } from "../src/term-sheet.js";
import type { TranslatableTerms } from "../src/glossary.js";

const terms: TranslatableTerms = {
  access: [
    { definition: "to connect to a resource", translations: { es: "acceder" } },
    { definition: "the ability to read or write data", translations: { es: "acceso" } },
  ],
  "access control": [
    { definition: "rules that limit who can do what", translations: { es: "control de acceso" } },
  ],
  block: [{ definition: "a chunk of a larger whole", translations: { es: "bloque" } }],
  cluster: [{ definition: "a group of servers", translations: { pt: "cluster" } }],
};

describe("buildTermSheet", () => {
  it("lists each term found, with its options and definitions", () => {
    expect(buildTermSheet(["You can access the block."], terms, "es")).toEqual([
      {
        term: "access",
        options: [
          { option: "acceder", definition: "to connect to a resource" },
          { option: "acceso", definition: "the ability to read or write data" },
        ],
      },
      { term: "block", options: [{ option: "bloque", definition: "a chunk of a larger whole" }] },
    ]);
  });

  it("matches regardless of case", () => {
    expect(buildTermSheet(["Block size"], terms, "es").map((e) => e.term)).toEqual(["block"]);
  });

  it("lists terms in glossary order, not text order", () => {
    expect(buildTermSheet(["the block, then access"], terms, "es").map((e) => e.term)).toEqual([
      "access",
      "block",
    ]);
  });

  it("leaves out a term that only appears inside a longer term", () => {
    expect(buildTermSheet(["Configure access control."], terms, "es").map((e) => e.term)).toEqual([
      "access control",
    ]);
  });

  it("keeps a shorter term that also appears on its own", () => {
    expect(
      buildTermSheet(["Access control limits access."], terms, "es").map((e) => e.term),
    ).toEqual(["access", "access control"]);
  });

  it("finds terms across several strings, listing each once", () => {
    expect(
      buildTermSheet(["one block", "another block"], terms, "es").map((e) => e.term),
    ).toEqual(["block"]);
  });

  it("skips entries with no option for the target locale", () => {
    expect(buildTermSheet(["the cluster"], terms, "es")).toEqual([]);
  });

  it("matches the target locale regardless of case", () => {
    expect(buildTermSheet(["the block"], terms, "ES").map((e) => e.term)).toEqual(["block"]);
  });

  it("returns an empty sheet when nothing matches", () => {
    expect(buildTermSheet(["Hello world"], terms, "es")).toEqual([]);
  });

  it("does not match a term inside a larger word", () => {
    expect(buildTermSheet(["blocked requests"], terms, "es")).toEqual([]);
  });
});
