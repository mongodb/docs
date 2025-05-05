import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import path from 'path';
import { debounce } from 'lodash';
import stripAnsi from 'strip-ansi';
import { getSandboxPath, resetSandbox, SANDBOX_PATH } from '../../sandbox';

const tsNodeBinary = path.resolve('./node_modules/.bin/ts-node');
const entrypointFile = path.resolve('./src/entrypoint.cli.ts');

jest.setTimeout(15_000);

type RunBackportOptions = {
  timeoutSeconds?: number;
  showOra?: boolean;
  waitForString?: string;
  cwd?: string;
  keepAlive?: boolean;
};

export function runBackportViaCli(
  backportArgs: string[],
  runBackportOptions: RunBackportOptions = {},
) {
  const chunks = '';
  const randomString = Math.random().toString(36).slice(2);
  const sandboxPath = getSandboxPath({
    filename: __filename,
    specname: randomString,
  });
  resetSandbox(sandboxPath);

  const cmdArgs = [
    '--transpile-only',
    entrypointFile,
    `--log-file-path=${SANDBOX_PATH}/backport.log`,
    ...(backportArgs.some((arg) => arg.includes('--dir'))
      ? []
      : [`--dir=${sandboxPath}`]),
    ...backportArgs,
  ];

  const proc = spawn(tsNodeBinary, cmdArgs, { cwd: runBackportOptions.cwd });
  return getPromise(proc, runBackportOptions, cmdArgs, chunks);
}

const keyCodeMap = {
  down: '\x1B\x5B\x42',
  up: '\x1B\x5B\x41',
  enter: '\x0D',
};
type KeyCode = keyof typeof keyCodeMap;

function getPromise(
  proc: ChildProcessWithoutNullStreams,
  runBackportOptions: RunBackportOptions,
  cmdArgs: string[],
  chunks: string,
) {
  if (proc.killed) {
    throw new Error(
      'Process is already killed. Did you forget `keepAlive: true`?',
    );
  }

  const {
    timeoutSeconds = 3,
    waitForString,
    showOra,
    keepAlive,
  } = runBackportOptions;

  return new Promise<{
    output: string;
    code: number | null;
    keypress: (
      keyCode: KeyCode,
      runBackportOptions?: RunBackportOptions,
    ) => Promise<{ output: string }>;
  }>((resolve, reject) => {
    const postponeTimeout = debounce(
      () => {
        const formattedChunks = formatChunk(chunks);
        const cmd = [tsNodeBinary, ...cmdArgs].join(' ');
        reject(
          waitForString
            ? `Expectation '${waitForString}' not found within ${timeoutSeconds} second in:\n\n${formattedChunks}\n\nCommand: ${cmd}`
            : `Process did not complete within ${timeoutSeconds} seconds. Received:\n${formattedChunks}\n\nCommand: ${cmd}`,
        );
      },
      timeoutSeconds * 1000,
      { maxWait: 10000 },
    );

    function formatChunk(data: string) {
      return stripAnsi(data.toString()).trim();
    }

    function keypress(
      keyCode: KeyCode,
      runBackportOptions: RunBackportOptions = {},
    ) {
      const p = getPromise(proc, runBackportOptions, cmdArgs, chunks);
      proc.stdin.write(keyCodeMap[keyCode]);
      return p;
    }

    const onChunk = (chunk: string) => {
      chunks += chunk;
      const formattedChunk = formatChunk(chunk);

      if (waitForString && formattedChunk.includes(waitForString)) {
        postponeTimeout.cancel();
        resolve({ output: formatChunk(chunks), code: null, keypress });
      }
    };

    proc.on('exit', (code) => {
      postponeTimeout.cancel();
      if (waitForString) {
        reject(
          `runBackportViaCli exited before finding: ${waitForString}. Output: ${formatChunk(
            chunks,
          )}`,
        );
      } else {
        resolve({ output: formatChunk(chunks), code, keypress });
      }
    });

    proc.stdout.on('data', (chunk: string) => {
      postponeTimeout();
      onChunk(chunk);
    });

    // ora (loading spinner) is redirected to stderr
    proc.stderr.on('data', (chunk: string) => {
      postponeTimeout();
      if (showOra) {
        onChunk(chunk);
      }
    });

    proc.on('error', (err) => {
      reject(`runBackportViaCli failed with: ${err}`);
    });
  }).finally(() => {
    if (!keepAlive) {
      proc.kill();
    } else {
      proc.removeAllListeners('exit');
      proc.stdout.removeAllListeners('data');
      proc.stderr.removeAllListeners('data');
      proc.removeAllListeners('errors');
    }
  });
}
