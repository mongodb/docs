import { describe, expect, it } from "@jest/globals";
import { termMatches, variationsOf } from "../src/term-variations.js";
import type { TranslatableTerms } from "../src/glossary.js";

/** One glossary entry with one Spanish option. */
function entry(option: string) {
  return [{ definition: "d", translations: { es: option } }];
}

describe("variationsOf", () => {
  it("adds the plural of the last word", () => {
    expect(variationsOf("driver")).toContain("drivers");
    expect(variationsOf("replica set")).toContain("replica sets");
    expect(variationsOf("capped collection")).toContain("capped collections");
  });

  it("uses -es after a sibilant", () => {
    expect(variationsOf("batch")).toContain("batches");
    expect(variationsOf("index")).toContain("indexes");
  });

  it("uses -ies only after a consonant + y", () => {
    expect(variationsOf("query")).toContain("queries");
    expect(variationsOf("array")).toContain("arrays");
    expect(variationsOf("array")).not.toContain("arraies");
  });

  it("treats epoch as a /k/ word, not a sibilant", () => {
    expect(variationsOf("Unix epoch")).toContain("Unix epochs");
    expect(variationsOf("Unix epoch")).not.toContain("Unix epoches");
  });

  it("adds a plural to a last word that already ends in s", () => {
    expect(variationsOf("process")).toContain("processes");
    expect(variationsOf("access")).toContain("accesses");
    expect(variationsOf("class")).toContain("classes");
    expect(variationsOf("success")).toContain("successes");
  });

  it("adds a plural to a noun whose last word ends in -ing or -ed", () => {
    expect(variationsOf("connection string")).toContain("connection strings");
    expect(variationsOf("activity feed")).toContain("activity feeds");
    expect(variationsOf("embedding")).toContain("embeddings");
  });

  it("adds verb -ed and -ing for a glossary verb", () => {
    expect(variationsOf("remove")).toEqual(
      expect.arrayContaining(["removes", "removed", "removing"]),
    );
  });

  it("adds only the plural for a noun", () => {
    const variations = variationsOf("cluster");
    expect(variations).toContain("clusters");
    expect(variations).not.toContain("clustered");
    expect(variations).not.toContain("clustering");
  });

  it("adds the irregular forms of a doubling verb", () => {
    expect(variationsOf("run")).toContain("running");
    expect(variationsOf("commit")).toContain("committing");
  });

  it("does not generate a variation for a non-alphabetic last word", () => {
    expect(variationsOf("IPv6")).toEqual([]);
    expect(variationsOf("md5")).toEqual([]);
  });
});

describe("termMatches", () => {
  it("lets a glossary term own the string a generated variation would claim", () => {
    const terms: TranslatableTerms = { manage: entry("gestionar"), managed: entry("gestionado") };
    const matches = termMatches(terms);
    expect(matches.filter((m) => m.match.toLowerCase() === "managed")).toEqual([
      { term: "managed", match: "managed" },
    ]);
    expect(matches).toContainEqual({ term: "manage", match: "manages" });
  });

  it("includes a generated variation for its term", () => {
    const terms: TranslatableTerms = { array: entry("arreglo") };
    expect(termMatches(terms)).toEqual([
      { term: "array", match: "array" },
      { term: "array", match: "arrays" },
    ]);
  });

  it("is deterministic", () => {
    const terms: TranslatableTerms = { query: entry("query"), driver: entry("driver") };
    expect(termMatches(terms)).toEqual(termMatches(terms));
  });
});
