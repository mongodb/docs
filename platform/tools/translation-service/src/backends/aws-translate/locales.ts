/**
 * Maps the service's BCP-47-style locale tags ("pt-br", "ko-kr") to
 * AWS Translate language codes ("pt", "ko"). AWS uses bare ISO 639-1
 * codes for the default variant of a language and only appends a region
 * for the non-default variant, so a tag can't be passed through as-is:
 * AWS "pt" is Brazilian Portuguese and "pt-PT" is European Portuguese.
 *
 * Source: https://docs.aws.amazon.com/translate/latest/dg/what-is-languages.html
 */

const AWS_LANGUAGE_CODES: ReadonlySet<string> = new Set([
  "af", "sq", "am", "ar", "hy", "az", "bn", "bs", "bg", "ca", "zh", "hr",
  "cs", "da", "nl", "en", "et", "fa", "tl", "fi", "fr", "ka", "de", "el",
  "gu", "ht", "ha", "he", "hi", "hu", "is", "id", "ga", "it", "ja", "kn",
  "kk", "ko", "lv", "lt", "mk", "ms", "ml", "mt", "mr", "mn", "no", "ps",
  "pl", "pt", "pa", "ro", "ru", "sr", "si", "sk", "sl", "so", "es", "sw",
  "sv", "ta", "te", "th", "tr", "uk", "ur", "uz", "vi", "cy",
]);

/**
 * Full tags that must not fall back to their primary subtag, plus
 * primary subtags AWS spells differently.
 */
const CODE_OVERRIDES: ReadonlyMap<string, string> = new Map([
  ["pt-pt", "pt-PT"],
  ["zh-tw", "zh-TW"],
  ["zh-hk", "zh-TW"],
  ["zh-hant", "zh-TW"],
  ["es-mx", "es-MX"],
  ["fr-ca", "fr-CA"],
  ["fa-af", "fa-AF"],
  ["nb", "no"],
  ["fil", "tl"],
]);

/** Returns `undefined` when AWS Translate has no matching language. */
export function toAwsLanguageCode(locale: string): string | undefined {
  const tag = locale.toLowerCase();
  const override = CODE_OVERRIDES.get(tag);
  if (override !== undefined) return override;

  const primary = tag.split("-")[0] ?? "";
  const aliased = CODE_OVERRIDES.get(primary) ?? primary;
  return AWS_LANGUAGE_CODES.has(aliased) ? aliased : undefined;
}
