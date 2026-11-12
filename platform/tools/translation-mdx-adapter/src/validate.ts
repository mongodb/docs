import type { ContentObject } from './types.js';
import { isBlockEntry } from './types.js';

/** Thrown when a translated payload cannot be safely reapplied. */
export class ReconstructionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ReconstructionError';
  }
}

/**
 * Thrown when a translated string cannot be rebuilt into MDX — a token the
 * backend dropped or reordered, so the markup cannot be paired. Distinct from
 * ReconstructionError, which is raised before any rebuild is attempted: a
 * caller can retry a rebuild failure in a different serialization without
 * re-sending a file whose keys simply failed.
 */
export class RebuildError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RebuildError';
  }
}

/**
 * Enforce the failure policy before any MDX is produced. Throws
 * ReconstructionError naming the first offending key or placeholder.
 */
export function validateTranslation(
  content: ContentObject,
  translated: Record<string, string | null>,
): void {
  // Key coverage: every payload key present and non-null.
  for (const key of Object.keys(content.payload)) {
    if (translated[key] == null) {
      throw new ReconstructionError(`Missing or failed translation for key "${key}"`);
    }
  }
  // Placeholder integrity: every block's tokens survived translation.
  for (const entry of content.manifest.entries.values()) {
    if (!isBlockEntry(entry)) continue;
    const value = translated[entry.key] as string;
    for (const p of entry.placeholders) {
      const tokens =
        p.kind === 'opaque' || p.kind === 'wrap-text' ? [p.token] : [p.open, p.close];
      for (const token of tokens) {
        if (!value.includes(token)) {
          throw new ReconstructionError(
            `Placeholder "${token}" missing from translation of key "${entry.key}"`,
          );
        }
      }
    }
  }
}
