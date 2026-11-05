import { describe, expect, it } from "@jest/globals";
import {
  DEFAULT_GLOSSARY,
  glossaryIdentity,
  validateGlossary,
} from "../src/glossary.js";

describe("DEFAULT_GLOSSARY", () => {
  it("is the bundled glossary.json", () => {
    expect(DEFAULT_GLOSSARY.nonTranslatableTerms).toContain("MongoDB");
    expect(Object.keys(DEFAULT_GLOSSARY.translatableTerms).length).toBeGreaterThan(0);
  });

  it("gives every bundled entry a real definition and at least one translation", () => {
    for (const entries of Object.values(DEFAULT_GLOSSARY.translatableTerms)) {
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.definition).toBeTruthy();
        expect(entry.definition).not.toBe("TODO");
        expect(Object.keys(entry.translations).length).toBeGreaterThan(0);
      }
    }
  });

  it("leaves out the terms dropped during the CSV import", () => {
    for (const term of ["search", "trigger", "update", "wildcard", "release"]) {
      expect(DEFAULT_GLOSSARY.translatableTerms[term]).toBeUndefined();
    }
  });

  it("never lists a term as both translatable and non-translatable", () => {
    const protectedTerms = new Set(
      DEFAULT_GLOSSARY.nonTranslatableTerms.map((term) => term.toLowerCase()),
    );
    const overlap = Object.keys(DEFAULT_GLOSSARY.translatableTerms).filter((term) =>
      protectedTerms.has(term.toLowerCase()),
    );
    expect(overlap).toEqual([]);
  });
});

describe("validateGlossary", () => {
  const valid = {
    nonTranslatableTerms: ["MongoDB"],
    translatableTerms: {
      shard: [{ definition: "a subset of a sharded cluster", translations: { es: "partición" } }],
    },
  };

  it("accepts the expected shape", () => {
    expect(validateGlossary(valid, "test")).toEqual(valid);
  });

  it("throws when translatableTerms is not an object", () => {
    expect(() =>
      validateGlossary(
        { nonTranslatableTerms: ["MongoDB"], translatableTerms: ["shard"] },
        "test",
      ),
    ).toThrow(/translatableTerms/);
  });

  it("throws when a term's entries are not a list", () => {
    expect(() =>
      validateGlossary(
        { nonTranslatableTerms: [], translatableTerms: { shard: { es: ["partición"] } } },
        "test",
      ),
    ).toThrow(/translatableTerms.shard/);
  });

  it("throws when an entry has a blank definition", () => {
    expect(() =>
      validateGlossary(
        {
          nonTranslatableTerms: [],
          translatableTerms: { shard: [{ definition: "", translations: { es: "partición" } }] },
        },
        "test",
      ),
    ).toThrow(/definition/);
  });

  it("throws when a translation is blank", () => {
    expect(() =>
      validateGlossary(
        {
          nonTranslatableTerms: [],
          translatableTerms: { shard: [{ definition: "a subset", translations: { es: "" } }] },
        },
        "test",
      ),
    ).toThrow(/translations.es/);
  });

  it("throws when a term is blank or untrimmed", () => {
    expect(() =>
      validateGlossary({ nonTranslatableTerms: ["MongoDB", ""], translatableTerms: {} }, "test"),
    ).toThrow(/blank or untrimmed/);
    expect(() =>
      validateGlossary({ nonTranslatableTerms: [" MongoDB"], translatableTerms: {} }, "test"),
    ).toThrow(/blank or untrimmed/);
  });

  it("throws for an unrecognised shape", () => {
    expect(() => validateGlossary({ terms: ["MongoDB"] }, "test")).toThrow(/nonTranslatableTerms/);
  });

  it("names the source in the error", () => {
    expect(() => validateGlossary({}, "my-glossary.json")).toThrow(/my-glossary.json/);
  });
});

describe("glossaryIdentity", () => {
  it("reports the term count and a short content hash", () => {
    const id = glossaryIdentity(DEFAULT_GLOSSARY);
    expect(id.count).toBe(DEFAULT_GLOSSARY.nonTranslatableTerms.length);
    expect(id.sha256).toMatch(/^[0-9a-f]{12}$/);
  });

  it("is stable for the same glossary", () => {
    expect(glossaryIdentity(DEFAULT_GLOSSARY).sha256).toBe(
      glossaryIdentity(DEFAULT_GLOSSARY).sha256,
    );
  });

  it("changes the hash when the glossary changes", () => {
    const a = { nonTranslatableTerms: ["MongoDB"], translatableTerms: {} };
    const b = { nonTranslatableTerms: ["MongoDB", "Atlas"], translatableTerms: {} };
    expect(glossaryIdentity(a).sha256).not.toBe(glossaryIdentity(b).sha256);
  });
});
