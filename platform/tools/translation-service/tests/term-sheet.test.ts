import { describe, expect, it } from "@jest/globals";
import { buildTermSheet } from "../src/term-sheet.js";
import { DEFAULT_GLOSSARY, type TranslatableTerms } from "../src/glossary.js";

const terms: TranslatableTerms = {
  access: [
    { definition: "to connect to a resource", translations: { es: "acceder" } },
    { definition: "the ability to read or write data", translations: { es: "acceso" } },
  ],
  "access control": [
    { definition: "rules that limit who can do what", translations: { es: "control de acceso" } },
  ],
  array: [{ definition: "an ordered list", translations: { es: "arreglo" } }],
  block: [
    { definition: "a chunk of a larger whole", translations: { es: "bloque" } },
    { definition: "to prevent progress", translations: { es: "bloquear" } },
  ],
  "capped collection": [
    { definition: "a fixed-size collection", translations: { es: "colección con tamaño fijo" } },
  ],
  cluster: [{ definition: "a group of servers", translations: { pt: "cluster" } }],
  driver: [{ definition: "a client library", translations: { es: "driver" } }],
  field: [{ definition: "a key/value pair", translations: { es: "campo" } }],
  index: [{ definition: "a data structure", translations: { es: "índice" } }],
  indexing: [{ definition: "building indexes", translations: { es: "indexación" } }],
  manage: [{ definition: "to control", translations: { es: "gestionar" } }],
  managed: [{ definition: "controlled", translations: { es: "gestionado" } }],
  query: [{ definition: "a read request", translations: { es: "query" } }],
  remove: [{ definition: "to delete", translations: { es: "remover" } }],
  replica: [{ definition: "a copy", translations: { es: "réplica" } }],
  "replica set": [{ definition: "a group of copies", translations: { es: "set de réplicas" } }],
  window: [{ definition: "a screen area", translations: { es: "ventana" } }],
  write: [{ definition: "to store data", translations: { es: "guardar" } }],
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
      { term: "block", options: [{ option: "bloque", definition: "a chunk of a larger whole" }, { option: "bloquear", definition: "to prevent progress" }] },
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

  it("does not match a variation inside a larger word", () => {
    expect(buildTermSheet(["unblocked requests"], terms, "es")).toEqual([]);
  });

  it("matches a plural of the last word", () => {
    expect(buildTermSheet(["MongoDB with drivers"], terms, "es").map((e) => e.term)).toEqual([
      "driver",
    ]);
  });

  it("matches a plural formed with -ies", () => {
    expect(buildTermSheet(["Write queries"], terms, "es").map((e) => e.term)).toEqual([
      "query",
      "write",
    ]);
  });

  it("matches a plural formed with a plain -s after a vowel", () => {
    expect(buildTermSheet(["Two arrays"], terms, "es").map((e) => e.term)).toEqual(["array"]);
  });

  it("matches a pluralized multi-word term, not its shorter key", () => {
    expect(buildTermSheet(["Configure replica sets"], terms, "es").map((e) => e.term)).toEqual([
      "replica set",
    ]);
  });

  it("matches a pluralized multi-word term regardless of case", () => {
    expect(buildTermSheet(["Capped Collections"], terms, "es").map((e) => e.term)).toEqual([
      "capped collection",
    ]);
  });

  it("matches a verb variation", () => {
    expect(buildTermSheet(["It removes the field"], terms, "es").map((e) => e.term)).toEqual([
      "field",
      "remove",
    ]);
  });

  it("matches a past-tense variation", () => {
    expect(buildTermSheet(["blocked requests"], terms, "es").map((e) => e.term)).toEqual(["block"]);
  });

  it("prefers the term 'indexing' over the shorter 'index'", () => {
    expect(buildTermSheet(["Indexing improves reads."], terms, "es").map((e) => e.term)).toEqual([
      "indexing",
    ]);
  });

  it("prefers the term 'managed' over a variation of 'manage'", () => {
    expect(buildTermSheet(["Enable managed backups."], terms, "es").map((e) => e.term)).toEqual([
      "managed",
    ]);
  });

  it("does not send a term whose variation equals a non-translatable term", () => {
    expect(buildTermSheet(["Open the Windows menu."], terms, "es", ["Windows"])).toEqual([]);
  });

  it("is deterministic", () => {
    const texts = ["Configure replica sets and drivers."];
    expect(buildTermSheet(texts, terms, "es")).toEqual(buildTermSheet(texts, terms, "es"));
  });

  it("matches a pluralized term from the bundled glossary", () => {
    const found = buildTermSheet(
      ["Configure replica sets"],
      DEFAULT_GLOSSARY.translatableTerms,
      "es",
      DEFAULT_GLOSSARY.nonTranslatableTerms,
    ).map((e) => e.term);
    expect(found).toContain("replica set");
    expect(found).not.toContain("replica");
  });

  describe("bundled glossary", () => {
    const sheet = (text: string) =>
      buildTermSheet(
        [text],
        DEFAULT_GLOSSARY.translatableTerms,
        "es",
        DEFAULT_GLOSSARY.nonTranslatableTerms,
      ).map((e) => e.term);

    it("matches a pluralized term whose text is also a non-translatable term", () => {
      expect(sheet("Configure change streams")).toEqual(["change stream"]);
    });

    it("does not list a term for a protected phrase", () => {
      expect(sheet("Open Change Streams")).toEqual([]);
    });

    it("lists a lowercase common word that resembles a protected name", () => {
      expect(sheet("time windows")).toEqual(["window"]);
    });

    it("matches a plural whose last word ends in s", () => {
      expect(sheet("the processes")).toEqual(["process"]);
    });

    it("matches a plural whose last word ends in -ing", () => {
      expect(sheet("Copy the connection strings")).toEqual(["connection string"]);
    });
  });
});
