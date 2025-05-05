import { exec } from '../../childProcessHelper';
import { getDevAccessToken } from '../../private/getDevAccessToken';
import { getSandboxPath, resetSandbox } from '../../sandbox';
import { runBackportViaCli } from './runBackportViaCli';

const accessToken = getDevAccessToken();
jest.setTimeout(25_000);

describe('gracefully handle corrupted repo', () => {
  it('backports correctly', async () => {
    const sandboxPath = getSandboxPath({ filename: __filename });
    await resetSandbox(sandboxPath);

    // first run: backport should clone the repo
    await runBackportViaCli(
      [
        '--repo=backport-org/integration-test',
        '--sha=16cfd987b82f49a79ebc663506f5d215b7a81c5c',
        '--branch=7.x',
        `--accessToken=${accessToken}`,
        `--dir=${sandboxPath}`,
        '--dry-run',
      ],
      {
        showOra: true,
        timeoutSeconds: 10,
      },
    );

    // remove all git objects and references
    await exec('rm -rf .git', { cwd: sandboxPath });
    await exec('git init', { cwd: sandboxPath });

    const { output } = await runBackportViaCli(
      [
        '--repo=backport-org/integration-test',
        '--sha=16cfd987b82f49a79ebc663506f5d215b7a81c5c',
        '--branch=7.x',
        `--accessToken=${accessToken}`,
        `--dir=${sandboxPath}`,
        '--dry-run',
      ],
      {
        showOra: true,
        timeoutSeconds: 10,
      },
    );

    // second run: backport should re-create remotes and branches correctly
    expect(output).toMatchInlineSnapshot(`
"- Initializing...
repo: backport-org/integration-test 🔹 sourceBranch: master 🔹 sha: 16cfd987b82f49a79ebc663506f5d215b7a81c5c 🔹 author: sorenlouv

? Select commit Bump to 8.0.0

Backporting to 7.x:
- Pulling latest changes
✔ Pulling latest changes
- Cherry-picking: Bump to 8.0.0
✔ Cherry-picking: Bump to 8.0.0
- Creating pull request
✔ Creating pull request
- Adding labels: backport
✔ Adding labels: backport
View pull request: this-is-a-dry-run"
`);
  });
});
