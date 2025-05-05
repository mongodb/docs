import Handlebars from 'handlebars';
import { Commit } from '../../../../entrypoint.api';
import { ValidConfigOptions } from '../../../../options/options';
import { getTitle } from './getTitle';

describe('getTitle', () => {
  const commits = [
    {
      sourceBranch: 'main',
      sourcePullRequest: {
        title: 'My PR Title',
        number: 55,
        url: 'https://github.com/backport-org/different-merge-strategies/pull/55',
      },
      sourceCommit: {
        sha: 'abcdefghi',
        message: 'My commit message (#55)',
      },
    },
    {
      sourcePullRequest: {
        number: 56,
        title: 'My PR Title',
        url: 'https://github.com/backport-org/different-merge-strategies/pull/56',
      },
      sourceCommit: {
        sha: 'jklmnopqr',
        message: 'Another commit message (#56)',
      },
      sourceBranch: 'main',
    },
  ] as Commit[];

  it('has the default title', () => {
    const options = {} as ValidConfigOptions;
    expect(getTitle({ options, commits, targetBranch: '7.x' })).toEqual(
      '[7.x] My commit message (#55) | Another commit message (#56)',
    );
  });

  it('renders title with the original PR title', () => {
    const options = {
      prTitle: '[{{targetBranch}}] {{sourcePullRequest.title}}',
    } as ValidConfigOptions;
    expect(getTitle({ options, commits, targetBranch: '7.x' })).toEqual(
      '[7.x] My PR Title',
    );
  });

  it('renders title using a specific commit', () => {
    const options = {
      prTitle: '[{{targetBranch}}] {{commits.0.sourcePullRequest.title}}',
    } as ValidConfigOptions;
    expect(getTitle({ options, commits, targetBranch: '7.x' })).toEqual(
      '[7.x] My PR Title',
    );
  });

  it('renders title using {{commitMessages}}', () => {
    const options = {
      prTitle: 'Branch: "{{targetBranch}}". Messages: {{commitMessages}}',
    } as ValidConfigOptions;

    expect(getTitle({ options, commits, targetBranch: '7.x' })).toEqual(
      'Branch: "7.x". Messages: My commit message (#55) | Another commit message (#56)',
    );
  });

  it('support backticks', () => {
    const options = {
      prTitle: '[{{targetBranch}}] {{commitMessages}}',
    } as ValidConfigOptions;

    const commits = [
      {
        sourceBranch: 'main',
        sourcePullRequest: {
          title: 'My PR Title',
          number: 55,
          url: 'https://github.com/backport-org/different-merge-strategies/pull/55',
        },
        sourceCommit: {
          sha: 'abcdefghi',
          message: 'My commit message with `backticks` (#55)',
        },
      },
    ] as Commit[];

    expect(getTitle({ options, commits, targetBranch: '7.x' })).toEqual(
      '[7.x] My commit message with `backticks` (#55)',
    );
  });

  it('does not break on curly brackets', () => {
    const options = {
      prTitle: '[{{targetBranch}}] {{commitMessages}}',
    } as ValidConfigOptions;

    const commits = [
      {
        sourceBranch: 'main',
        sourcePullRequest: {
          title: 'My PR Title',
          number: 55,
          url: 'https://github.com/backport-org/different-merge-strategies/pull/55',
        },
        sourceCommit: {
          sha: 'abcdefghi',
          message: "```metadata={{ extraActionsColor: 'text',\r\n }}\r\n```",
        },
      },
    ] as Commit[];

    expect(() =>
      getTitle({ options, commits, targetBranch: '7.x' }),
    ).not.toThrow();
  });

  it('should return default description if handlebars compilation fails', () => {
    const compileError = new Error('Simulated compile error');

    // Stub Handlebars.compile to throw an error.
    const compileSpy = jest
      .spyOn(Handlebars, 'compile')
      .mockImplementation(() => {
        throw compileError;
      });

    const options = {} as ValidConfigOptions;

    expect(
      getTitle({ options, commits, targetBranch: '7.x' }),
    ).toMatchInlineSnapshot(
      `"[7.x] My commit message (#55) | Another commit message (#56)"`,
    );

    // Restore the stubs.
    compileSpy.mockRestore();
  });
});
