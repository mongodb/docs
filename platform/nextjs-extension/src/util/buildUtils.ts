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
