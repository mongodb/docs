import { spawn, type ChildProcess } from 'node:child_process';

export function startServer(platformDir: string, project: string, production: boolean): ChildProcess {
  const script = production
    ? `DOCS_PROJECT=${project} pnpm build && DOCS_PROJECT=${project} pnpm --filter docs-site start`
    : `DOCS_PROJECT=${project} pnpm --filter docs-site dev`;
  return spawn('bash', ['-lc', `cd ${platformDir} && ${script}`], { stdio: 'inherit' });
}

export function stopServer(child: ChildProcess): void {
  child.kill('SIGTERM');
}
