import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/**
 * Run the Braintrust CLI over `src/eval/eval.ts`, which defines the evaluator.
 * The CLI owns reporting and experiment creation, so it runs as a child
 * process rather than calling `Eval()` in-process. `EVAL_PROJECT` and
 * `EVAL_RUN` carry the resolved run into the child, which otherwise inherits
 * this process's environment (including anything loaded from `.env`).
 *
 * Resolves with the child's exit code.
 */
export function runEval(project: string, runId: string): Promise<number> {
  const child = spawn(
    'bash',
    ['-lc', `cd "${PKG_ROOT}" && pnpm exec braintrust eval src/eval/eval.ts`],
    { stdio: 'inherit', env: { ...process.env, EVAL_PROJECT: project, EVAL_RUN: runId } },
  );
  return new Promise((resolve) => child.on('exit', (code) => resolve(code ?? 1)));
}
