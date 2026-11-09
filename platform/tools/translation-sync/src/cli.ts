import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isBackendName, BACKEND_NAMES, type BackendName } from '@mongodb-docs/translation-service';
import { resolveTarget } from './locale-targets.js';
import { runSync, type SyncOptions } from './sync.js';

export interface ParsedArgs {
  command: string;
  flags: Record<string, string | boolean>;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [command = '', ...rest] = argv;
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < rest.length; i++) {
    const tok = rest[i]!;
    if (!tok.startsWith('--')) continue;
    const key = tok.slice(2);
    const next = rest[i + 1];
    if (next !== undefined && !next.startsWith('--')) {
      flags[key] = next;
      i++;
    } else {
      flags[key] = true;
    }
  }
  return { command, flags };
}

function str(flags: Record<string, string | boolean>, key: string, fallback: string): string {
  const value = flags[key];
  return typeof value === 'string' ? value : fallback;
}

/**
 * A scope must be a relative path under content-mdx/. An absolute path or a
 * `..` segment would escape content-mdx/ and let the remove step delete
 * unrelated files, so reject both.
 */
export function validateScope(scope: string): string {
  const isAbsolute = scope.startsWith('/') || path.isAbsolute(scope) || /^[A-Za-z]:[\\/]/.test(scope);
  const escapes = scope.split(/[\\/]+/).includes('..');
  if (isAbsolute || escapes) {
    throw new Error(`--scope must be a relative path under content-mdx/ without ".."; got "${scope}"`);
  }
  return scope;
}

function syncOptions(flags: Record<string, string | boolean>): SyncOptions {
  const backendRaw = str(flags, 'backend', 'openai');
  if (!isBackendName(backendRaw)) {
    throw new Error(`--backend must be one of: ${BACKEND_NAMES.join(', ')}; got "${backendRaw}"`);
  }
  const modeRaw = str(flags, 'mode', 'incremental');
  if (modeRaw !== 'incremental' && modeRaw !== 'full') {
    throw new Error(`--mode must be incremental or full; got "${modeRaw}"`);
  }
  const scope = validateScope(str(flags, 'scope', 'voyageai'));
  return {
    sourceRoot: str(flags, 'source', ''),
    targetRoot: str(flags, 'target', ''),
    locale: str(flags, 'locale', 'es'),
    scope: scope === '' ? null : scope,
    mode: modeRaw,
    backend: backendRaw as BackendName,
    model: str(flags, 'model', 'gpt-5.5'),
    sourceRepository: str(flags, 'source-repo', '10gen/docs-mdx-en-us'),
    sourceCommit: str(flags, 'source-commit', '') || null,
    dryRun: flags['dry-run'] === true,
  };
}

export async function main(argv: string[]): Promise<number> {
  const { command, flags } = parseArgs(argv);
  if (command === 'resolve-target') {
    process.stdout.write(`${resolveTarget(str(flags, 'locale', 'es')).repo}\n`);
    return 0;
  }
  if (command === 'sync') {
    const options = syncOptions(flags);
    if (!options.sourceRoot || !options.targetRoot) {
      throw new Error('--source and --target are required');
    }
    const summary = await runSync(options);
    process.stdout.write(
      `translated=${summary.translated.length} copied=${summary.copied.length} ` +
        `removed=${summary.removed.length} failed=${summary.failures.length}\n`,
    );
    for (const failure of summary.failures) {
      process.stderr.write(`FAIL ${failure.file}: ${failure.error}\n`);
    }
    return summary.failures.length > 0 ? 1 : 0;
  }
  process.stderr.write(`Unknown command: "${command}". Commands: sync, resolve-target\n`);
  return 2;
}

const invokedDirectly =
  process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  main(process.argv.slice(2))
    .then((code) => process.exit(code))
    .catch((error: unknown) => {
      process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
      process.exit(1);
    });
}
