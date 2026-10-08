import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMMANDS } from './commands/index.js';

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

async function main(): Promise<void> {
  const { command, flags } = parseArgs(process.argv.slice(2));
  const handler = COMMANDS[command];
  if (!handler) {
    console.error(`Unknown or missing command: "${command}"`);
    console.error(`Commands: ${Object.keys(COMMANDS).join(', ') || '(none registered yet)'}`);
    process.exit(1);
  }
  await handler(flags);
}

const invokedDirectly =
  process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
