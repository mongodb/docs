import { spawn, type ChildProcess } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export interface StageResult {
  code: number | null;
  timedOut: boolean;
}

export function shellQuote(arg: string): string {
  if (/^[A-Za-z0-9_\-.,/:=@+%]+$/.test(arg)) return arg;
  return `'${arg.replace(/'/g, `'\\''`)}'`;
}

export function stageCommand(stage: string, args: string[]): string {
  const suffix = [stage, ...args].map((a) => ` ${shellQuote(a)}`).join('');
  const cli = 'pnpm exec tsx --env-file-if-exists=.env src/cli.ts';
  return `cd ${shellQuote(PKG_ROOT)} && ${cli}${suffix}`;
}

export function spawnStage(stage: string, args: string[], env: NodeJS.ProcessEnv): ChildProcess {
  return spawn('bash', ['-lc', stageCommand(stage, args)], {
    env,
    stdio: 'inherit',
    detached: true,
  });
}

export function waitForExit(child: ChildProcess, timeoutMs: number): Promise<StageResult> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      killTree(child);
      resolve({ code: null, timedOut: true });
    }, timeoutMs);

    child.on('exit', (code) => {
      clearTimeout(timer);
      resolve({ code, timedOut: false });
    });

    child.on('error', () => {
      clearTimeout(timer);
      resolve({ code: null, timedOut: false });
    });
  });
}

export function killTree(child: ChildProcess): void {
  if (child.pid == null) {
    return;
  }
  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ESRCH') {
      child.kill('SIGTERM');
    } else {
      throw err;
    }
  }
}
