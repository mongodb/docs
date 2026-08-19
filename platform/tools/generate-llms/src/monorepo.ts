/** Shared monorepo-root resolution, used by both cli.ts and upload-cli.ts. */
import path from 'node:path';
import fs from 'node:fs/promises';

/** Walks up from this file's directory to find the monorepo root (a directory containing `content/`). */
export async function findMonorepoRoot(startDir: string): Promise<string> {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    try {
      const stat = await fs.stat(path.join(dir, 'content'));
      if (stat.isDirectory()) {
        return dir;
      }
    } catch {
      // keep walking up
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new Error(
    `Could not locate the docs-mongodb-internal monorepo root (no content/ directory found above ${startDir}). ` +
      'Pass it explicitly as a positional argument or set DOCS_MONOREPO_ROOT.',
  );
}

/**
 * Resolves the monorepo root from an explicit CLI argument, the
 * DOCS_MONOREPO_ROOT env var, or by walking up from `searchStartDir`, in
 * that order of precedence.
 */
export async function resolveMonorepoPath(cliArg: string | undefined, searchStartDir: string): Promise<string> {
  if (cliArg) {
    return path.resolve(cliArg);
  }
  if (process.env.DOCS_MONOREPO_ROOT) {
    return path.resolve(process.env.DOCS_MONOREPO_ROOT);
  }
  return findMonorepoRoot(searchStartDir);
}
