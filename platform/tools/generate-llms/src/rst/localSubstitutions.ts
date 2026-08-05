/**
 * Extracts page-level RST substitution definitions:
 *
 *   .. |name| replace:: value
 *
 * These override the project-wide `[substitutions]` table in snooty.toml
 * for the page that declares them. Only single-line replacement text is
 * supported, which matches how this directive is used throughout the
 * content repo.
 */
const REPLACE_DIRECTIVE_PATTERN = /^\.\.\s+\|([^|]+)\|\s+replace::\s*(.*)$/;

export function extractLocalSubstitutions(content: string): Record<string, string> {
  const substitutions: Record<string, string> = {};
  for (const line of content.split('\n')) {
    const match = REPLACE_DIRECTIVE_PATTERN.exec(line.trim());
    if (!match) {
      continue;
    }
    const name = match[1].trim();
    const value = match[2].trim();
    if (name !== '' && value !== '') {
      substitutions[name] = value;
    }
  }
  return substitutions;
}

/**
 * Extracts the target paths of `.. include:: /some/path.rst` directives
 * (root-relative to the project's source directory), e.g. manual's
 * per-version release-notes pages each include a shared
 * `/includes/<version>-upgrade-replacements.rst` snippet that's the *only*
 * place `|newversion|`/`|oldversion|` etc. are actually defined — they
 * aren't in snooty.toml or declared directly on the page.
 */
const INCLUDE_DIRECTIVE_PATTERN = /^\.\.\s+include::\s+\/(\S+)$/;

export function extractIncludePaths(content: string): string[] {
  const paths: string[] = [];
  for (const line of content.split('\n')) {
    const match = INCLUDE_DIRECTIVE_PATTERN.exec(line.trim());
    if (match) {
      paths.push(match[1].trim());
    }
  }
  return paths;
}
