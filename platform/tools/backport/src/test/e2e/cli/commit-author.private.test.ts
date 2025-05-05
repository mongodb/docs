import { exec } from '../../childProcessHelper';
import { getDevAccessToken } from '../../private/getDevAccessToken';
import { getSandboxPath, resetSandbox } from '../../sandbox';
import { runBackportViaCli } from './runBackportViaCli';

const accessToken = getDevAccessToken();

const COMMIT_BY_JOHN_DOE_SHA = 'c3f837226bea3c7a50f2ba16d807fbe846ed3453';

describe('commit author', () => {
  let sourceRepo: string;
  let backportRepo: string;
  beforeEach(async () => {
    const sandboxPath = getSandboxPath({ filename: __filename });
    await resetSandbox(sandboxPath);
    sourceRepo = `${sandboxPath}/sourceRepo`;
    backportRepo = `${sandboxPath}/backportRepo`;

    await exec(
      `git clone https://github.com/backport-org/repo-with-different-commits-authors.git ${sourceRepo}`,
      { cwd: sandboxPath },
    );

    // set dummy git author. This should not have any effect and should never be used
    await exec(`git config user.name "Peter Kanin"`, { cwd: sourceRepo });
    await exec(`git config user.email "kanin@zoo.dk"`, { cwd: sourceRepo });
  });

  describe('when nothing is specified (default)', () => {
    it('uses commit author from source commit', async () => {
      await runBackportViaCli(
        [
          `--accessToken=${accessToken}`,
          `--dir=${backportRepo}`,
          '--branch=production',
          `--sha=${COMMIT_BY_JOHN_DOE_SHA}`,
          '--dry-run',
        ],
        { cwd: sourceRepo, showOra: true },
      );

      const { authorEmail, authorName } = await getCommitAuthor({
        cwd: backportRepo,
      });

      expect(authorName).toEqual('John Doe');
      expect(authorEmail).toEqual('john.doe@backport-testing.dk');
    });
  });

  describe('when setting author via `--gitAuthor*` cli options', () => {
    it('respects the settings', async () => {
      await runBackportViaCli(
        [
          `--accessToken=${accessToken}`,
          `--dir=${backportRepo}`,
          '--branch=production',
          `--sha=${COMMIT_BY_JOHN_DOE_SHA}`,
          '--dry-run',
          '--gitAuthorName="Donald Duck"',
          '--gitAuthorEmail=duck@disney.com',
        ],
        { cwd: sourceRepo, showOra: true },
      );

      const { authorEmail, authorName } = await getCommitAuthor({
        cwd: backportRepo,
      });

      expect(authorName).toEqual('Donald Duck');
      expect(authorEmail).toEqual('duck@disney.com');
    });
  });

  describe('when using `--resetAuthor` option', () => {
    it('sets the current user as author of commit', async () => {
      await runBackportViaCli(
        [
          `--accessToken=${accessToken}`,
          `--dir=${backportRepo}`,
          '--branch=production',
          `--sha=${COMMIT_BY_JOHN_DOE_SHA}`,
          '--dry-run',
          '--reset-author',
        ],
        { cwd: sourceRepo, showOra: true },
      );

      const { authorEmail, authorName } = await getCommitAuthor({
        cwd: backportRepo,
      });

      expect(authorName).toEqual('sorenlouv');
      expect(authorEmail).toEqual('sorenlouv@users.noreply.github.com');
    });
  });
});

async function getCommitAuthor({ cwd }: { cwd: string }) {
  const { stdout: authorName } = await exec(
    'git --no-pager log -1 --format=format:"%cn"',
    { cwd },
  );

  const { stdout: authorEmail } = await exec(
    'git --no-pager log -1 --format=format:"%ce"',
    { cwd },
  );

  return { authorName, authorEmail };
}
