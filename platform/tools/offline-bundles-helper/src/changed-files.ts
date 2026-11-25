import { execFileSync } from 'node:child_process';

const GIT_MAX_BUFFER = 256 * 1024 * 1024;

const runGit = (repoRoot: string, args: string[]): string =>
  execFileSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf-8',
    maxBuffer: GIT_MAX_BUFFER,
  });

/** Splits git output into unique, sorted, non-empty paths. */
export const parseChangedFiles = (output: string): string[] =>
  [...new Set(output.split('\n').filter(Boolean))].sort();

export const gitChangedFilesBetween = (
  repoRoot: string,
  base: string,
  head: string,
): string[] =>
  parseChangedFiles(
    runGit(repoRoot, ['diff', '--name-only', '--no-renames', base, head]),
  );

export const gitChangedFilesSince = (
  repoRoot: string,
  hours: number,
): string[] =>
  parseChangedFiles(
    runGit(repoRoot, [
      'log',
      `--since=${hours} hours ago`,
      '--name-only',
      '--no-renames',
      '--pretty=format:',
    ]),
  );
