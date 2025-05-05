import childProcess from 'child_process';
import { promisify } from 'util';
const execPromisified = promisify(childProcess.exec);

export async function exec(
  cmd: string,
  options: childProcess.ExecOptions & { cwd: string },
) {
  const res = await execPromisified(cmd, {
    maxBuffer: 100 * 1024 * 1024,
    ...options,

    // ensure that git commands return english error messages
    env: { ...process.env, LANG: 'en_US' },
  });

  return res;
}
