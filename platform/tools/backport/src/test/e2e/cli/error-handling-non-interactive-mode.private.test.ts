import fs from 'fs/promises';
import path from 'path';
import {
  BackportAbortResponse,
  BackportFailureResponse,
  BackportSuccessResponse,
} from '../../../backportRun';
import { ConfigFileOptions } from '../../../entrypoint.api';
import { getDevAccessToken } from '../../private/getDevAccessToken';
import { getSandboxPath, resetSandbox } from '../../sandbox';
import { runBackportViaCli } from './runBackportViaCli';

const accessToken = getDevAccessToken();
jest.setTimeout(15_000);

describe('non interactive (json) error handling', () => {
  it(`when access token is missing`, async () => {
    const configFilePath = await createConfigFile({ editor: 'code' });
    const { output, code } = await runBackportViaCli([
      '--json',
      `--globalConfigFile=${configFilePath}`,
    ]);

    const backportResult = JSON.parse(output) as BackportFailureResponse;

    // remove absolute path to avoid issues on ci
    const errorMessage = backportResult.errorMessage.replace(
      configFilePath,
      '<GLOBAL_CONFIG_FILE>',
    );

    expect(code).toBe(1);
    expect(backportResult.status).toBe('failure');
    expect(errorMessage).toMatchInlineSnapshot(`
      "Please update your config file: "<GLOBAL_CONFIG_FILE>".
      It must contain a valid "accessToken".

      Read more: https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#global-config-backportconfigjson"
    `);
  });

  it('when target branches cannot be inferred from pull request', async () => {
    const { output, code } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/backport-e2e',
      '--pr=9',
      `--accessToken=${accessToken}`,
    ]);

    expect(code).toBe(0);
    const backportResult = JSON.parse(output) as BackportAbortResponse;
    expect(backportResult.status).toBe('aborted');
    expect(backportResult.error).toEqual({
      errorContext: { code: 'no-branches-exception' },
      name: 'BackportError',
    });
    expect(backportResult.errorMessage).toBe(
      'There are no branches to backport to. Aborting.',
    );
  });

  it(`when target branch and branch label mapping are missing`, async () => {
    const { output, code } = await runBackportViaCli([
      '--json',
      `--access-token=${accessToken}`,
    ]);

    expect(code).toBe(1);
    const backportResult = JSON.parse(output) as BackportFailureResponse;
    expect(backportResult.status).toBe('failure');
    expect(backportResult.errorMessage).toMatchInlineSnapshot(`
      "Please specify a target branch: "--branch 6.1".

      Read more: https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#project-config-backportrcjson"
    `);
  });

  it(`when argument is invalid`, async () => {
    const { output } = await runBackportViaCli(['--json', '--foo'], {});

    const backportResult = JSON.parse(output) as BackportFailureResponse;
    expect(backportResult.status).toBe('failure');
    expect(backportResult.errorMessage).toEqual('Unknown argument: foo');
  });

  it('when `--repo` is invalid', async () => {
    const { output } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/backport-e2e-foo',
      `--accessToken=${accessToken}`,
    ]);

    const backportResult = JSON.parse(output) as BackportFailureResponse;
    expect(backportResult.status).toBe('failure');
    expect(backportResult.errorMessage).toEqual(
      'The repository "backport-org/backport-e2e-foo" doesn\'t exist',
    );
  });

  it('when `--sha` is invalid', async () => {
    const { output } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/backport-e2e',
      '--sha=abcdefg',
      `--accessToken=${accessToken}`,
    ]);

    const backportResult = JSON.parse(output) as BackportFailureResponse;
    expect(backportResult.status).toBe('failure');
    expect(backportResult.errorMessage).toEqual(
      'No commit found on branch "master" with sha "abcdefg"',
    );
  });

  it('when `--branch` is invalid', async () => {
    const { output } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/backport-e2e',
      '--pr=9',
      '--branch=foobar',
      `--accessToken=${accessToken}`,
    ]);

    const backportResult = JSON.parse(output) as BackportSuccessResponse;
    expect(backportResult.status).toBe('success');
    //@ts-expect-error
    expect(backportResult.results[0].error).toEqual({
      name: 'BackportError',
      errorContext: {
        code: 'invalid-branch-exception',
        branchName: 'foobar',
      },
    });
  });

  it('when `--branch` tries to inject argument', async () => {
    const { output } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/backport-e2e',
      '--pr=9',
      '--branch=--foo bar',
      `--accessToken=${accessToken}`,
    ]);

    const backportResult = JSON.parse(output) as BackportSuccessResponse;
    expect(backportResult.status).toBe('success');
    //@ts-expect-error
    expect(backportResult.results[0].error).toEqual({
      name: 'BackportError',
      errorContext: {
        code: 'invalid-branch-exception',
        branchName: '--foo bar',
      },
    });
  });

  it('when `--pr` is invalid', async () => {
    const { output } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/backport-e2e',
      '--pr=900',
      '--branch=7.x',
      `--accessToken=${accessToken}`,
    ]);

    const backportResult = JSON.parse(output) as BackportFailureResponse;
    expect(backportResult.status).toEqual('failure');
    expect(backportResult.errorMessage).toEqual(
      'Could not resolve to a PullRequest with the number of 900. (Github API v4)',
    );
  });

  it('when encountering conflicts', async () => {
    const { output } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/repo-with-conflicts',
      '--pr=12',
      '--branch=7.x',
      `--accessToken=${accessToken}`,
    ]);

    const backportResult = JSON.parse(output) as BackportSuccessResponse;
    expect(backportResult.status).toEqual('success');
    expect(
      //@ts-expect-error
      backportResult.results[0].error.errorContext.conflictingFiles,
    ).toEqual(['la-liga.md']);
  });

  it('when `--source-branch` is invalid', async () => {
    const { output } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/backport-e2e',
      '--pr=9',
      '--branch=7.x',
      '--source-branch=foo',
      `--accessToken=${accessToken}`,
    ]);

    const backportResult = JSON.parse(output) as BackportSuccessResponse;
    expect(backportResult.status).toBe('success');
    expect(backportResult.results[0]).toEqual({
      error: {
        context: {
          cmdArgs: ['checkout', 'foo'],
          code: 1,
          stderr:
            "error: pathspec 'foo' did not match any file(s) known to git\n",
          stdout: '',
        },
        name: 'SpawnError',
      },
      status: 'unhandled-error',
      targetBranch: '7.x',
    });
  });

  it('when attempting to backport unmerged PR', async () => {
    const { output } = await runBackportViaCli([
      '--json',
      '--repo=backport-org/backport-e2e',
      '--pr=12',
      `--accessToken=${accessToken}`,
    ]);

    const backportResult = JSON.parse(output) as BackportFailureResponse;
    expect(backportResult.status).toBe('failure');
    expect(backportResult.error).toEqual({
      errorContext: {
        code: 'message-only-exception',
        message: 'The PR #12 is not merged',
      },
      name: 'BackportError',
    });
  });
});

async function createConfigFile(options: ConfigFileOptions) {
  const sandboxPath = getSandboxPath({ filename: __filename });
  await resetSandbox(sandboxPath);
  const configPath = path.join(sandboxPath, 'config.json');
  await fs.writeFile(configPath, JSON.stringify(options));
  return configPath;
}
