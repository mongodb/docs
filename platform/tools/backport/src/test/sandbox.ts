import { homedir } from 'os';
import path, { resolve } from 'path';
import del from 'del';
import makeDir from 'make-dir';

jest.unmock('make-dir');
jest.unmock('del');

export const SANDBOX_PATH = `${homedir()}/.backport_testing/`;

export function getSandboxPath({
  filename,
  specname,
}: {
  filename: string;
  specname?: string;
}) {
  const baseFilename = getFilenameWithoutExtension(filename);
  return resolve(
    `${SANDBOX_PATH}/${baseFilename}${specname ? `/${specname}` : ''}`,
  );
}

export async function resetSandbox(sandboxPath: string) {
  if (sandboxPath.length < 30) {
    throw new Error(`sandboxPath "${sandboxPath}" is too short. Reset aborted`);
  }

  await del(sandboxPath, { force: true });
  await makeDir(sandboxPath);
}

function getFilenameWithoutExtension(filename: string) {
  return path.basename(filename, path.extname(filename));
}
