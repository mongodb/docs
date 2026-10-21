/**
 * AWS Translate has no prompt, so it can't be asked to leave __PROTn__
 * tokens alone. Instead each token is wrapped in a do-not-translate
 * element, which TranslateText honors in its input:
 * https://docs.aws.amazon.com/translate/latest/dg/customizing-translations-tags.html
 *
 * Because the input is then treated as HTML, source text is escaped
 * first so a literal "<" or "&" can't be read as markup, and the output
 * is unescaped after the wrappers are removed.
 */
import { excerpt } from "../../excerpt.js";

const TOKEN_PATTERN = /__PROT\d+__/g;

const NO_TRANSLATE_SPAN =
  /<span\s+translate\s*=\s*["']?no["']?\s*>\s*(__PROT\d+__)\s*<\/span>/gi;

const ENTITY_PATTERN = /&(#x[0-9a-f]+|#\d+|lt|gt|amp|quot|apos);/gi;

const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  lt: "<",
  gt: ">",
  amp: "&",
  quot: '"',
  apos: "'",
};

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/** Single pass, so "&amp;lt;" decodes to "&lt;" rather than "<". */
function unescapeHtml(text: string): string {
  return text.replace(ENTITY_PATTERN, (match, body: string) => {
    const lower = body.toLowerCase();
    if (lower.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(lower.slice(2), 16));
    }
    if (lower.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(lower.slice(1), 10));
    }
    return NAMED_ENTITIES[lower] ?? match;
  });
}

export function toAwsText(text: string): string {
  return escapeHtml(text).replace(
    TOKEN_PATTERN,
    (token) => `<span translate="no">${token}</span>`,
  );
}

export type AwsTextResult =
  | { ok: true; text: string }
  | { ok: false; message: string };

/**
 * Every "<" in the source was escaped by toAwsText, so any raw "<" left
 * after the wrappers are removed is markup AWS invented or mangled.
 */
export function fromAwsText(text: string): AwsTextResult {
  const unwrapped = text.replace(NO_TRANSLATE_SPAN, "$1");
  if (unwrapped.includes("<")) {
    return {
      ok: false,
      message: `AWS Translate returned unexpected markup: ${excerpt(text)}`,
    };
  }
  return { ok: true, text: unescapeHtml(unwrapped) };
}
