import * as packageVersion from '../../../utils/packageVersion';
import { exec } from '../../childProcessHelper';
import { getDevAccessToken } from '../../private/getDevAccessToken';
import { getSandboxPath, resetSandbox } from '../../sandbox';
import { runBackportViaCli } from './runBackportViaCli';

jest.setTimeout(10_000);
const accessToken = getDevAccessToken();

describe('entrypoint cli', () => {
  it('--version', async () => {
    const { output } = await runBackportViaCli([`--version`], {
      showOra: true,
    });

    expect(output).toEqual(process.env.npm_package_version);
  });

  it('-v', async () => {
    const { output } = await runBackportViaCli([`-v`], {
      showOra: true,
    });
    expect(output).toEqual(process.env.npm_package_version);
  });

  it('PACKAGE_VERSION should match', async () => {
    // @ts-expect-error
    expect(packageVersion.UNMOCKED_PACKAGE_VERSION).toBe(
      process.env.npm_package_version,
    );
  });

  it('--help', async () => {
    const { output } = await runBackportViaCli([`--help`, '--noExitProcess'], {
      waitForString: 'Or contact me directly',
    });

    const [help] = output.split('https://twitter.com/sorenlouv');

    expect(help).toMatchInlineSnapshot(`
"entrypoint.cli.ts [args]

Options:
  -v, --version                                       Show version number                  [boolean]
      --accessToken, --accesstoken                    Github access token                   [string]
  -a, --all                                           List all commits                     [boolean]
      --assignee, --assign                            Add assignees to the target pull request
                                                                                             [array]
      --autoAssign                                    Auto assign the target pull request to
                                                      yourself                             [boolean]
      --autoMerge                                     Enable auto-merge for created pull requests
                                                                                           [boolean]
      --autoMergeMethod                               Sets auto-merge method when using
                                                      --auto-merge. Default: merge
                                                     [string] [choices: "merge", "rebase", "squash"]
      --cherrypickRef                                 Append commit message with "(cherry picked
                                                      from commit...)                      [boolean]
      --commitConflicts                               Commit conflicts instead of aborting. Only
                                                      takes effect in \`non-interactive\` mode.
                                                      Defaults to false                    [boolean]
      --projectConfigFile, --config                   Path to project config                [string]
      --globalConfigFile                              Path to global config                 [string]
      --dateSince, --since                            ISO-8601 date for filtering commits   [string]
      --dateUntil, --until                            ISO-8601 date for filtering commits   [string]
      --dir                                           Path to temporary backport repo       [string]
      --details                                       Show details about each commit       [boolean]
      --draft                                         Publish pull request as draft        [boolean]
      --dryRun                                        Run backport locally without pushing to Github
                                                                                           [boolean]
      --editor                                        Editor to be opened during conflict resolution
                                                                                            [string]
      --skipRemoteConfig                              Use local .backportrc.json config instead of
                                                      loading from Github                  [boolean]
      --fork                                          Create backports in fork or origin repo.
                                                      Defaults to true                     [boolean]
      --gitAuthorName                                 Set commit author name                [string]
      --gitAuthorEmail                                Set commit author email               [string]
      --nonInteractive, --json                        Disable interactive prompts and return
                                                      response as JSON                     [boolean]
      --ls                                            List commits instead of backporting them
                                                                                           [boolean]
      --mainline                                      Parent id of merge commit. Defaults to 1 when
                                                      supplied without arguments            [number]
  -s, --signoff                                       Pass the --signoff option to the cherry-pick
                                                      command                              [boolean]
  -n, --maxNumber, --number                           Number of commits to choose from      [number]
      --multiple                                      Select multiple branches/commits     [boolean]
      --multipleBranches                              Backport to multiple branches        [boolean]
      --multipleCommits                               Backport multiple commits            [boolean]
      --noCherrypickRef                               Do not append commit message with "(cherry
                                                      picked from commit...)"              [boolean]
      --noStatusComment                               Don't publish status comment to Github
                                                                                           [boolean]
      --noVerify                                      Bypass the pre-commit and commit-msg hooks
                                                                                           [boolean]
      --noFork                                        Create backports in the origin repo  [boolean]
      --noTelemetry                                   Disable telemetry                    [boolean]
      --onlyMissing                                   Only list commits with missing or unmerged
                                                      backports                            [boolean]
  -p, --path                                          Only list commits touching files under the
                                                      specified path                         [array]
      --prDescription, --description                  Description to be added to pull request
                                                                                            [string]
      --prTitle, --title                              Title of pull request                 [string]
      --prFilter                                      Filter source pull requests by a query[string]
      --pullNumber, --pr                              Pull request to backport              [number]
      --resetAuthor                                   Set yourself as commit author        [boolean]
      --reviewer                                      Add reviewer to the target PR          [array]
      --repoForkOwner                                 The owner of the fork where the backport
                                                      branch is pushed. Defaults to the currently
                                                      authenticated user                    [string]
      --repo, --upstream                              Repo owner and name                   [string]
      --sha, --commit                                 Commit sha to backport                [string]
      --noUnmergedBackportsHelp                       Do not list the unmerged backports in PR
                                                      comment                              [boolean]
      --sourceBranch                                  Specify a non-default branch (normally
                                                      "master") to backport from            [string]
      --sourcePRLabel, --sourcePrLabel                Add labels to the source (original) PR [array]
      --copySourcePRLabels, --copySourcePrLabels      Copy labels from source PR to the target PR
                                                                                           [boolean]
      --copySourcePRReviewers,                        Copy reviewers from the source PR to the
      --copySourcePrReviewers,                        target PR
      --addOriginalReviewers                                                               [boolean]
  -b, --targetBranch, --branch                        Branch(es) to backport to              [array]
      --targetBranchChoice                            List branches to backport to           [array]
  -l, --targetPRLabel, --label                        Add labels to the target (backport) PR [array]
      --backportBranchName                            Name template to use for the branch name of
                                                      the backport                          [string]
      --verify                                        Opposite of no-verify                [boolean]
      --help                                          Show help                            [boolean]

For bugs, feature requests or questions: https://github.com/sorenlouv/backport/issues
Or contact me directly: "
`);
  });

  it('lists commits based on .git/config when `repoOwner`/`repoName` is missing', async () => {
    const sandboxPath = getSandboxPath({ filename: __filename });
    await resetSandbox(sandboxPath);
    await exec(`git init`, { cwd: sandboxPath });
    await exec(
      `git remote add origin git@github.com:backport-org/backport-e2e.git`,
      { cwd: sandboxPath },
    );

    const { output } = await runBackportViaCli(
      [`--accessToken=${accessToken}`],
      {
        cwd: sandboxPath,
        waitForString: 'Select commit',
      },
    );

    expect(output).toMatchInlineSnapshot(`
"repo: backport-org/backport-e2e 🔹 sourceBranch: master 🔹 author: sorenlouv

? Select commit (Use arrow keys)
❯ 1. Add sheep emoji (#9) 7.8 
  2. Change Ulysses to Gretha (conflict) (#8) 7.x 
  3. Add 🍏 emoji (#5) 7.8, 7.x 
  4. Add family emoji (#2) 7.x 
  5. Add \`backport\` dep  
  6. Merge pull request #1 from backport-org/add-heart-emoji  
  7. Add ❤️ emoji  
  8. Update .backportrc.json  
  9. Bump to 8.0.0  
  10.Add package.json"
`);
  });

  it(`lists commits from master`, async () => {
    const { output } = await runBackportViaCli(
      [
        '--branch=7.x',
        '--repo=backport-org/backport-e2e',
        '--author=sorenlouv',
        `--accessToken=${accessToken}`,
        '--max-number=6',
      ],
      { waitForString: 'Select commit' },
    );

    expect(output).toMatchInlineSnapshot(`
"repo: backport-org/backport-e2e 🔹 sourceBranch: master 🔹 author: sorenlouv 🔹 maxNumber: 6

? Select commit (Use arrow keys)
❯ 1. Add sheep emoji (#9) 7.8 
  2. Change Ulysses to Gretha (conflict) (#8) 7.x 
  3. Add 🍏 emoji (#5) 7.8, 7.x 
  4. Add family emoji (#2) 7.x 
  5. Add \`backport\` dep  
  6. Merge pull request #1 from backport-org/add-heart-emoji"
`);
  });

  it(`lists commits from 7.x`, async () => {
    const { output } = await runBackportViaCli(
      [
        '--branch=7.x',
        '--repo=backport-org/backport-e2e',
        '--author=sorenlouv',
        `--accessToken=${accessToken}`,
        '--max-number=6',
        '--source-branch=7.x',
      ],
      { waitForString: 'Select commit' },
    );

    expect(output).toMatchInlineSnapshot(`
"repo: backport-org/backport-e2e 🔹 sourceBranch: 7.x 🔹 author: sorenlouv 🔹 maxNumber: 6

? Select commit (Use arrow keys)
❯ 1. Add 🍏 emoji (#5) (#6)  
  2. Change Ulysses to Carol  
  3. Add family emoji (#2) (#4)  
  4. Update .backportrc.json  
  5. Branch off: 7.9.0 (7.x)  
  6. Bump to 8.0.0"
`);
  });
});
