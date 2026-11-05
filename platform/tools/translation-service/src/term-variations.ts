/**
 * Term variations
 *
 * The strings the term sheet searches for, beyond a glossary term itself: a
 * plural of its last word ("driver" -> "drivers") and, for verbs whose sense
 * allows it, -ed/-ing ("remove" -> "removed"). Only the last word changes:
 * "replica set" -> "replica sets".
 *
 * A generated variation never wins over a glossary term: a variation that
 * equals a term, ignoring case, is dropped, because the term owns that string.
 */
import type { TranslatableTerms } from "./glossary.js";

/** One string to scan for, and the glossary term it belongs to. */
export interface TermMatch {
  /** The glossary term. */
  term: string;
  /** The string to scan for: the term itself, or a variation of it. */
  match: string;
}

/** Terms used as verbs, where the -ed and -ing forms keep the glossary meaning. */
const VERBS = new Set([
  "analyze", "apply", "block", "build", "commit", "drop", "enable", "enforce",
  "handle", "implement", "learn", "lock", "manage", "monitor", "process",
  "remove", "retrieve", "run", "scale", "serve", "share", "stream", "subscribe",
  "submit", "sync", "track", "write",
]);

/** Verbs the regular -ed/-ing rules get wrong; these variations replace them. */
const IRREGULAR_VERBS: Record<string, string[]> = {
  build: ["building", "built"],
  commit: ["committing", "committed"],
  drop: ["dropping", "dropped"],
  run: ["running"],
  submit: ["submitting", "submitted"],
  write: ["writing"],
};

const VOWELS = "aeiou";
const ES_ENDINGS = ["s", "x", "z", "ch", "sh"];
/** Last words that take a plain -s despite the spelling ("Unix epoch" -> "epochs"). */
const PLAIN_S = new Set(["epoch"]);
/** Last words that take -es without a sibilant ending ("go" -> "goes"). */
const ALWAYS_ES = new Set(["go"]);

function isConsonantY(word: string): boolean {
  return word.endsWith("y") && !VOWELS.includes(word[word.length - 2] ?? "");
}

function plural(last: string): string {
  const lower = last.toLowerCase();
  if (PLAIN_S.has(lower)) return `${last}s`;
  if (ALWAYS_ES.has(lower) || ES_ENDINGS.some((ending) => lower.endsWith(ending))) {
    return `${last}es`;
  }
  return isConsonantY(lower) ? `${last.slice(0, -1)}ies` : `${last}s`;
}

function past(last: string): string {
  const lower = last.toLowerCase();
  if (lower.endsWith("e")) return `${last}d`;
  return isConsonantY(lower) ? `${last.slice(0, -1)}ied` : `${last}ed`;
}

function gerund(last: string): string {
  const lower = last.toLowerCase();
  if (lower.endsWith("ie")) return `${last.slice(0, -2)}ying`;
  const keepsE = lower.endsWith("ee") || lower.endsWith("oe") || lower.endsWith("ye");
  if (lower.endsWith("e") && !keepsE) return `${last.slice(0, -1)}ing`;
  return `${last}ing`;
}

/**
 * The strings to search for beyond `term` itself: a plural of its last word
 * ("driver" -> "drivers", "query" -> "queries") and -ed/-ing for verbs
 * ("remove" -> "removed"). Returns [] when the last word is not a single word
 * ("IPv6").
 */
export function variationsOf(term: string): string[] {
  const words = term.split(/\s+/);
  const last = words[words.length - 1] ?? "";
  if (!/^[A-Za-z]+$/.test(last)) return [];
  const prefix = words.slice(0, -1);
  const join = (variation: string) => [...prefix, variation].join(" ");

  const variations = [join(plural(last))];
  const irregular = IRREGULAR_VERBS[term.toLowerCase()];
  if (irregular) {
    variations.push(...irregular.map(join));
  } else if (VERBS.has(term.toLowerCase())) {
    variations.push(join(past(last)), join(gerund(last)));
  }
  return variations;
}

/**
 * Every string the term sheet scans for: each glossary term plus the
 * variations generated for it. A variation that equals a term, ignoring case,
 * is dropped, so the term owns that string.
 */
export function termMatches(translatableTerms: TranslatableTerms): TermMatch[] {
  const termLower = new Set(Object.keys(translatableTerms).map((term) => term.toLowerCase()));
  const seen = new Set<string>();
  const matches: TermMatch[] = [];

  for (const term of Object.keys(translatableTerms)) {
    const lower = term.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    matches.push({ term, match: term });
  }
  for (const term of Object.keys(translatableTerms)) {
    for (const variation of variationsOf(term)) {
      const lower = variation.toLowerCase();
      if (termLower.has(lower) || seen.has(lower)) continue;
      seen.add(lower);
      matches.push({ term, match: variation });
    }
  }
  return matches;
}
