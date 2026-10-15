import { spawn, type ChildProcess } from 'node:child_process';

export function startServer(platformDir: string, project: string, production: boolean): ChildProcess {
  // docs-site builds a whole project; a version is a URL segment, so pass the
  // top-level dir, not the site path (which may include a version).
  const docsProject = project.split('/')[0]!;
  const script = production
    ? `DOCS_PROJECT=${docsProject} pnpm build && DOCS_PROJECT=${docsProject} pnpm --filter docs-site start`
    : `DOCS_PROJECT=${docsProject} pnpm --filter docs-site dev`;
  return spawn('bash', ['-lc', `cd ${platformDir} && ${script}`], { stdio: 'inherit' });
}

export function stopServer(child: ChildProcess): void {
  child.kill('SIGTERM');
}
