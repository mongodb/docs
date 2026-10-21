import { describe, expect, it } from "@jest/globals";
import { toAwsLanguageCode } from "../../../src/backends/aws-translate/locales.js";

describe("toAwsLanguageCode", () => {
  it.each([
    ["en-us", "en"],
    ["pt-br", "pt"],
    ["es", "es"],
    ["ko-kr", "ko"],
    ["ja-jp", "ja"],
    ["zh-cn", "zh"],
    ["fr", "fr"],
  ])("maps the eval locale %s to %s", (locale, expected) => {
    expect(toAwsLanguageCode(locale)).toBe(expected);
  });

  it.each([
    ["pt-pt", "pt-PT"],
    ["zh-tw", "zh-TW"],
    ["zh-hant", "zh-TW"],
    ["es-mx", "es-MX"],
    ["fr-ca", "fr-CA"],
  ])("keeps the non-default variant %s as %s", (locale, expected) => {
    expect(toAwsLanguageCode(locale)).toBe(expected);
  });

  it("is case-insensitive", () => {
    expect(toAwsLanguageCode("PT-BR")).toBe("pt");
    expect(toAwsLanguageCode("pt-PT")).toBe("pt-PT");
  });

  it("maps primary subtags AWS spells differently", () => {
    expect(toAwsLanguageCode("nb-no")).toBe("no");
    expect(toAwsLanguageCode("fil")).toBe("tl");
  });

  it("returns undefined for a language AWS does not support", () => {
    expect(toAwsLanguageCode("eo")).toBeUndefined();
    expect(toAwsLanguageCode("xx-yy")).toBeUndefined();
  });
});
