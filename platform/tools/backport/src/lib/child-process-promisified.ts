import childProcess from 'child_process';
import apm from 'elastic-apm-node';
import { logger } from './logger';

type SpawnErrorContext = {
  cmdArgs: ReadonlyArray<string>;
  code: number;
  stderr: string;
  stdout: string;
};

export class SpawnError extends Error {
  context: SpawnErrorContext;
  constructor(context: SpawnErrorContext) {
    const cmdArgs = context.cmdArgs.join(' ');
    const message = `Code: ${
      context.code
    }, Args: "${cmdArgs}", Message: ${context.stderr.trim()}`;

    super(message);
    Error.captureStackTrace(this, SpawnError);
    this.name = 'SpawnError';
    this.message = message;
    this.context = context;
  }
}

type SpawnPromiseResponse = {
  cmdArgs: ReadonlyArray<string>;
  code: number | null;
  stderr: string;
  stdout: string;
};

export async function spawnPromise(
  cmd: string,
  cmdArgs: ReadonlyArray<string>,
  cwd: string,
  isInteractive = false,
  stdin: string | undefined = undefined,
): Promise<SpawnPromiseResponse> {
  const spawnSpan = startSpawnSpan(cmd, cmdArgs);
  const fullCmd = getFullCmd(cmd, cmdArgs);
  logger.info(`Running command: "${fullCmd}"`);

  return new Promise<SpawnPromiseResponse>(function (resolve, reject) {
    const subprocess = childProcess.spawn(cmd, cmdArgs, {
      cwd,

      // ensure that git commands return English error messages
      env: { ...process.env, LANG: 'C' },
      ...(isInteractive ? { stdio: 'inherit' } : undefined),
    });
    let stderr = '';
    let stdout = '';
    if (stdin !== undefined) {
      const subprocessStdin = subprocess.stdin!;
      subprocessStdin.write(stdin);
      subprocessStdin.end();
    }
    subprocess.stdout?.on('data', (data: string) => {
      stdout += data;
    });

    subprocess.stderr?.on('data', (data: string) => {
      stderr += data;
    });

    subprocess.on('close', (code) => {
      spawnSpan?.addLabels({
        status_code: code,
        stderr: stderr,
        stdout: stdout,
      });
      spawnSpan?.setOutcome('success');

      if (code === 0 || code === null) {
        logger.verbose(
          `Spawn success: code=${code} stderr=${stderr} stdout=${stdout}`,
        );
        resolve({ cmdArgs, code, stderr, stdout });
      } else {
        const err = new SpawnError({ cmdArgs, code, stderr, stdout });
        logger.verbose(`Error when running command: "${fullCmd}"`, err);
        reject(err);
      }
    });

    subprocess.on('error', (err) => {
      spawnSpan?.setLabel('error_message', err.message);
      spawnSpan?.setOutcome('failure');
      reject(err);
    });
  }).finally(() => {
    spawnSpan?.end();
  });
}

export const spawnStream = (cmd: string, cmdArgs: ReadonlyArray<string>) => {
  const spawnSpan = startSpawnSpan(cmd, cmdArgs);

  const res = childProcess.spawn(cmd, cmdArgs, {
    env: { ...process.env, LANG: 'C' },
  });

  res.on('close', (code) => {
    const isSuccess = code === 0 || code === null;
    spawnSpan?.setLabel('status_code', code);
    spawnSpan?.setOutcome(isSuccess ? 'success' : 'failure');
    spawnSpan?.end();
  });

  return res;
};

function startSpawnSpan(cmd: string, cmdArgs: ReadonlyArray<string>) {
  const span = apm.startSpan(`Spawn: "${cmd}"`);
  const fullCmd = getFullCmd(cmd, cmdArgs);
  const firstCmdArg = cmdArgs.filter(
    (cmdArg) => !cmdArg.startsWith('--') && !cmdArg.startsWith('-'),
  )[0];
  span?.setType('spawn', cmd, firstCmdArg);
  span?.setLabel(`cmd`, fullCmd);
  return span;
}

function getFullCmd(cmd: string, cmdArgs: ReadonlyArray<string>) {
  return `${cmd} ${cmdArgs.join(' ')}`;
}
