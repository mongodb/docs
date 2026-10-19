import type { Options as ExecaOptions } from 'execa';

// Structural subset of NetlifyPluginUtils, so Netlify's `utils` and a
// host-agnostic implementation are interchangeable.

export type RunCommandOptions = Pick<
  ExecaOptions,
  'cwd' | 'env' | 'stdout' | 'stderr' | 'all'
>;

export type RunCommandResult = {
  stdout: string;
  stderr: string;
  all?: string;
};

export interface BuildRunner {
  // Netlify resolves to execa's child process, which is itself a promise of
  // the result; `await` unwraps both.
  command(
    command: string,
    options?: RunCommandOptions,
  ): Promise<RunCommandResult | PromiseLike<RunCommandResult>>;
}

type CachePathOptions = { cwd?: string };

export interface BuildCache {
  save(path: string, options?: CachePathOptions): Promise<boolean>;
  restore(path: string, options?: CachePathOptions): Promise<boolean>;
  remove(path: string, options?: CachePathOptions): Promise<boolean>;
  has(path: string, options?: CachePathOptions): Promise<boolean>;
  list(options?: CachePathOptions & { depth?: number }): Promise<string[]>;
}

export interface BuildStatus {
  show(options: { title?: string; summary: string; text?: string }): void;
}

export type BuildUtils = {
  run: BuildRunner;
  cache: BuildCache;
  status: BuildStatus;
};
