import { describe, expect, it } from "@jest/globals";
import type { Glossary, TranslatableTerms } from "../src/glossary.js";
import {
  buildTerminologyCsv,
  isTerminologyName,
  terminologyIdentity,
} from "../src/terminology.js";

function glossaryWith(translatableTerms: TranslatableTerms): Glossary {
  return { nonTranslatableTerms: [], translatableTerms };
}

function entry(
  es: string,
  definition = "d"
): Glossary["translatableTerms"][string][number] {
  return { definition, translations: { es } };
}

describe("buildTerminologyCsv", () => {
  it("emits a language-code header and one sorted row per term", () => {
    const result = buildTerminologyCsv(
      glossaryWith({ shard: [entry("partición")], AI: [entry("IA")] }),
      "es"
    );
    expect(result.csv).toBe("en,es\nAI,IA\nshard,partición\n");
    expect(result.termCount).toBe(2);
    expect(result.skipped).toEqual([]);
  });

  it("keeps the first translation of a multi-sense term and reports the rest", () => {
    const result = buildTerminologyCsv(
      glossaryWith({
        commit: [entry("confirmación"), entry("confirmar")],
      }),
      "es"
    );
    expect(result.csv).toBe("en,es\ncommit,confirmación\n");
    expect(result.skipped).toEqual([
      {
        term: "commit",
        reason: '2 senses have an "es" translation; kept the first',
      },
    ]);
  });

  it("collapses case-variant duplicates deterministically and reports them", () => {
    const result = buildTerminologyCsv(
      glossaryWith({
        PyMongo: [entry("PyMongo")],
        pymongo: [entry("pymongo")],
      }),
      "es"
    );
    expect(result.csv).toBe("en,es\nPyMongo,PyMongo\n");
    expect(result.skipped).toEqual([
      { term: "pymongo", reason: 'case-variant duplicate of "PyMongo"' },
    ]);
  });

  it("skips terms with no translation for the target locale", () => {
    const result = buildTerminologyCsv(
      glossaryWith({
        shard: [{ definition: "d", translations: { "pt-br": "shard" } }],
      }),
      "es"
    );
    expect(result.csv).toBe("en,es\n");
    expect(result.termCount).toBe(0);
    expect(result.skipped).toEqual([
      { term: "shard", reason: 'no "es" translation' },
    ]);
  });

  it("skips terms or translations longer than 200 bytes", () => {
    const long = "ñ".repeat(150); // 300 bytes in UTF-8
    const result = buildTerminologyCsv(
      glossaryWith({ shard: [entry(long)] }),
      "es"
    );
    expect(result.termCount).toBe(0);
    expect(result.skipped).toEqual([
      { term: "shard", reason: "term or translation exceeds 200 bytes" },
    ]);
  });

  it("escapes cells containing commas, quotes, and newlines per RFC 4180", () => {
    const result = buildTerminologyCsv(
      glossaryWith({
        "Backup, Restore": [entry('a "quoted"\nvalue')],
      }),
      "es"
    );
    expect(result.csv).toBe('en,es\n"Backup, Restore","a ""quoted""\nvalue"\n');
    expect(result.termCount).toBe(1);
  });

  it("rejects an empty target locale", () => {
    expect(() => buildTerminologyCsv(glossaryWith({}), "")).toThrow(
      /targetLocale must be a non-empty string/
    );
  });

  it("is deterministic: same glossary produces identical csv and identity", () => {
    const glossary = glossaryWith({ b: [entry("x")], a: [entry("y")] });
    const first = buildTerminologyCsv(glossary, "es");
    const second = buildTerminologyCsv(glossary, "es");
    expect(first.csv).toBe(second.csv);
    expect(terminologyIdentity(first.csv)).toBe(
      terminologyIdentity(second.csv)
    );
    expect(terminologyIdentity(first.csv)).toMatch(/^[0-9a-f]{12}$/);
  });
});

describe("isTerminologyName", () => {
  it("accepts the AWS name pattern", () => {
    expect(isTerminologyName("aws-translate-glossary")).toBe(true);
    expect(isTerminologyName("a")).toBe(true);
  });

  it("rejects names AWS would reject", () => {
    expect(isTerminologyName("")).toBe(false);
    expect(isTerminologyName("has space")).toBe(false);
    expect(isTerminologyName("arn:aws:translate:x")).toBe(false);
    expect(isTerminologyName("x".repeat(257))).toBe(false);
  });
});
