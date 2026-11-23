/**
 * The MDX adapter's Private Use Area inline tokens.
 *
 * Written as `\u` escapes, never literal PUA characters: a transcription through
 * any ASCII-normalizing view silently turns a literal class into a no-op that
 * matches nothing.
 */
export const ADAPTER_TOKEN = /[\u{E000}-\u{F8FF}][A-Z]\d+[\u{E000}-\u{F8FF}]?/gu;

/** The adapter's inline tokens present in `text`. */
export function tokensIn(text: string): string[] {
  return [...text.matchAll(ADAPTER_TOKEN)].map((m) => m[0]);
}
