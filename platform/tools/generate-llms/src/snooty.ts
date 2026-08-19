/**
 * Port of audit-cli's internal/snooty package (grove-platform/audit-cli#7):
 * reads a project's snooty.toml for its Snooty project `name`, `title`, and
 * `[constants]`, and resolves `{+name+}` substitutions using those
 * constants.
 *
 * Also reads the `[substitutions]` table and resolves standard RST `|name|`
 * substitution references, which are a separate mechanism from `{+name+}`
 * constants (different syntax, different TOML table) but just as commonly
 * used in page titles/descriptions. Unlike constants, `|name|` substitutions
 * can be (and often are) redefined per-page via a `.. |name| replace::
 * value` directive directly in a page's RST source — see
 * rst/localSubstitutions.ts for extracting those page-level overrides,
 * which callers should merge over this file's `[substitutions]` before
 * calling resolvePipeSubstitutions.
 */
import fs from 'node:fs/promises';
import TOML from '@iarna/toml';

export interface SnootyConfig {
  name: string;
  title: string;
  constants: Record<string, string>;
  substitutions: Record<string, string>;
}

/** Parses a TOML table of string values, ignoring any non-string entries. */
function parseStringTable(section: unknown): Record<string, string> {
  const table: Record<string, string> = {};
  if (section && typeof section === 'object') {
    for (const [key, value] of Object.entries(section as Record<string, unknown>)) {
      if (typeof value === 'string') {
        table[key] = value;
      }
    }
  }
  return table;
}

/**
 * Parses a project's snooty.toml. Returns null if the file is missing or
 * cannot be parsed (matching audit-cli's "absence is not fatal" behavior).
 */
export async function parseSnootyToml(snootyTomlPath: string): Promise<SnootyConfig | null> {
  let raw: string;
  try {
    raw = await fs.readFile(snootyTomlPath, 'utf-8');
  } catch {
    return null;
  }

  try {
    const parsed = TOML.parse(raw) as Record<string, unknown>;
    const name = typeof parsed.name === 'string' ? parsed.name : '';
    const title = typeof parsed.title === 'string' ? parsed.title : '';
    const constants = parseStringTable(parsed.constants);
    const substitutions = parseStringTable(parsed.substitutions);
    return { name, title, constants, substitutions };
  } catch {
    return null;
  }
}

const SUBSTITUTION_PATTERN = /\{\+\s*([^+}]+?)\s*\+\}/g;

/**
 * Replaces snooty constant references (`{+name+}`) in text with their values
 * from the given constants map. References to unknown constants are left
 * unchanged. Nested references (a constant whose value contains another
 * `{+...+}`) are resolved up to a small fixed depth.
 */
export function resolveSubstitutions(
  text: string,
  constants: Record<string, string> | null | undefined,
): string {
  if (!constants || Object.keys(constants).length === 0 || !text.includes('{+')) {
    return text;
  }

  let result = text;
  for (let i = 0; i < 5; i++) {
    if (!result.includes('{+')) {
      break;
    }
    const replaced = result.replace(SUBSTITUTION_PATTERN, (match, name: string) => {
      const trimmedName = name.trim();
      return trimmedName in constants ? constants[trimmedName] : match;
    });
    if (replaced === result) {
      break;
    }
    result = replaced;
  }
  return result;
}

// Substitution names are Snooty ref-like identifiers: letters, digits, and
// hyphens (e.g. "atlas-cli", "ak8so", "vsce-full"). Restricting to these
// (rather than matching any `|...|`) avoids misfiring on unrelated pipe
// characters that can legitimately appear in already-extracted title text.
const PIPE_SUBSTITUTION_PATTERN = /\|([A-Za-z0-9-]+)\|/g;

/**
 * Replaces standard RST substitution references (`|name|`) in text with
 * their values from the given substitutions map — snooty.toml's
 * `[substitutions]` table merged with any page-level `.. |name| replace::`
 * overrides the caller has already applied (see
 * rst/localSubstitutions.ts). References to unknown substitutions are left
 * unchanged. Nested references are resolved up to a small fixed depth.
 */
export function resolvePipeSubstitutions(
  text: string,
  substitutions: Record<string, string> | null | undefined,
): string {
  if (!substitutions || Object.keys(substitutions).length === 0 || !text.includes('|')) {
    return text;
  }

  let result = text;
  for (let i = 0; i < 5; i++) {
    if (!result.includes('|')) {
      break;
    }
    const replaced = result.replace(PIPE_SUBSTITUTION_PATTERN, (match, name: string) => {
      return name in substitutions ? substitutions[name] : match;
    });
    if (replaced === result) {
      break;
    }
    result = replaced;
  }
  return result;
}
