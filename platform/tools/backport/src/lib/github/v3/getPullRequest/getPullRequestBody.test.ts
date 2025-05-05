import Handlebars from 'handlebars';
import { Commit } from '../../../../entrypoint.api';
import { ValidConfigOptions } from '../../../../options/options';
import { getPullRequestBody } from './getPullRequestBody';

const commits = [
  {
    sourcePullRequest: {
      url: 'https://github.com/backport-org/different-merge-strategies/pull/55',
    },
    sourceCommit: {
      sha: 'acbcdef',
      message: 'My commit message (#55)',
    },
    sourceBranch: 'main',
  },
  {
    sourcePullRequest: {
      url: 'https://github.com/backport-org/different-merge-strategies/pull/56',
    },
    sourceCommit: {
      sha: 'hijklmn',
      message: 'Another commit message (#56)',
    },
    sourceBranch: 'main',
  },
] as Commit[];

describe('getPullRequestBody', () => {
  describe('template variables should be replaced', () => {
    describe('{{defaultPrDescription}}', () => {
      it('replaces {{defaultPrDescription}}', () => {
        const options = {
          prDescription: '{{defaultPrDescription}}\n\ntext to append',
        } as ValidConfigOptions;

        expect(getPullRequestBody({ options, commits, targetBranch: '7.x' }))
          .toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`7.x\`:
 - [My commit message (#55)](https://github.com/backport-org/different-merge-strategies/pull/55)
 - [Another commit message (#56)](https://github.com/backport-org/different-merge-strategies/pull/56)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

text to append"
`);
      });

      it('replaces {defaultPrDescription} for legacy reasons', () => {
        const options = {
          prDescription: '{defaultPrDescription}\n\ntext to append',
        } as ValidConfigOptions;

        expect(getPullRequestBody({ options, commits, targetBranch: '7.x' }))
          .toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`7.x\`:
 - [My commit message (#55)](https://github.com/backport-org/different-merge-strategies/pull/55)
 - [Another commit message (#56)](https://github.com/backport-org/different-merge-strategies/pull/56)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

text to append"
`);
      });
    });

    describe('{{commitsStringified}}', () => {
      it('replaces {{commitsStringified}} with a stringifid JSON', () => {
        const options = {
          prDescription: 'Just output the commits: {{commitsStringified}}',
        } as ValidConfigOptions;

        expect(
          getPullRequestBody({ options, commits, targetBranch: '7.x' }),
        ).toMatchInlineSnapshot(
          `"Just output the commits: [{"sourcePullRequest":{"url":"https://github.com/backport-org/different-merge-strategies/pull/55"},"sourceCommit":{"sha":"acbcdef","message":"My commit message (#55)"},"sourceBranch":"main"},{"sourcePullRequest":{"url":"https://github.com/backport-org/different-merge-strategies/pull/56"},"sourceCommit":{"sha":"hijklmn","message":"Another commit message (#56)"},"sourceBranch":"main"}]"`,
        );
      });

      it('replaces {commits} for legacy reasons', () => {
        const options = {
          prDescription: 'Just output the commits: {commits}',
        } as ValidConfigOptions;

        expect(
          getPullRequestBody({ options, commits, targetBranch: '7.x' }),
        ).toMatchInlineSnapshot(
          `"Just output the commits: [{"sourcePullRequest":{"url":"https://github.com/backport-org/different-merge-strategies/pull/55"},"sourceCommit":{"sha":"acbcdef","message":"My commit message (#55)"},"sourceBranch":"main"},{"sourcePullRequest":{"url":"https://github.com/backport-org/different-merge-strategies/pull/56"},"sourceCommit":{"sha":"hijklmn","message":"Another commit message (#56)"},"sourceBranch":"main"}]"`,
        );
      });

      it('strips markdown comments', () => {
        const commits = [
          {
            sourcePullRequest: {
              url: 'https://github.com/backport-org/different-merge-strategies/pull/55',
            },
            sourceCommit: {
              sha: 'acbcdef',
              message:
                'My commit message (#55) <!-- markdown-comment --> And then some more text',
            },
            sourceBranch: 'main',
          },
        ] as Commit[];

        const options = {
          prDescription: 'Just output the commits: {commits}',
        } as ValidConfigOptions;

        const res = getPullRequestBody({
          options,
          commits,
          targetBranch: '7.x',
        });

        expect(res).not.toContain('markdown-comment');
        expect(res).not.toContain('<!--');
        expect(res).not.toContain('-->');
        expect(res).toContain(
          'My commit message (#55)  And then some more text',
        );
      });

      it('handles curly brackets in commit messages without error', () => {
        const commits = [
          {
            sourceCommit: {
              message:
                "This is a commit message\nThis is a description with illegal brackets ```\r\nmetadata={{\r\n          extraActionsColor: 'text',\r\n        }}\r\n```",
              sha: 'mySha',
            },
            sourceBranch: 'main',
          },
        ] as Commit[];

        const options = {
          prDescription:
            '{defaultPrDescription}\n\n<!--BACKPORT {commits} BACKPORT-->',
        } as ValidConfigOptions;

        expect(getPullRequestBody({ options, commits, targetBranch: '9.0' }))
          .toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`9.0\`:
 - This is a commit message (mySha)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

<!--BACKPORT [{"sourceCommit":{"message":"This is a commit message\\nThis is a description with illegal brackets \`\`\`\\r\\nmetadata={{\\r\\n          extraActionsColor: 'text',\\r\\n        }}\\r\\n\`\`\`","sha":"mySha"},"sourceBranch":"main"}] BACKPORT-->"
`);
      });
    });

    describe('{{commitMessages}}', () => {
      it('replaces {{commitMessages}}', () => {
        const options = {
          prDescription: '{{commitMessages}}',
        } as ValidConfigOptions;

        expect(getPullRequestBody({ options, commits, targetBranch: '7.x' }))
          .toMatchInlineSnapshot(`
" - [My commit message (#55)](https://github.com/backport-org/different-merge-strategies/pull/55)
 - [Another commit message (#56)](https://github.com/backport-org/different-merge-strategies/pull/56)"
`);
      });

      it('replaces {{commitMessages}} in default PR description', () => {
        const options = {} as ValidConfigOptions;

        expect(getPullRequestBody({ options, commits, targetBranch: '7.x' }))
          .toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`7.x\`:
 - [My commit message (#55)](https://github.com/backport-org/different-merge-strategies/pull/55)
 - [Another commit message (#56)](https://github.com/backport-org/different-merge-strategies/pull/56)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)"
`);
      });

      it('handles curly brackets in commit message without error', () => {
        const commits = [
          {
            sourceCommit: {
              message:
                "```metadata={{ extraActionsColor: 'text',\r\n }}\r\n```",
              sha: 'mySha',
            },
            sourceBranch: 'main',
          },
        ] as Commit[];

        const options = {
          prDescription:
            '{defaultPrDescription}\n\n<!--BACKPORT {commits} BACKPORT-->',
        } as ValidConfigOptions;

        expect(getPullRequestBody({ options, commits, targetBranch: '9.0' }))
          .toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`9.0\`:
 - \`\`\`metadata={{ extraActionsColor: 'text',
 (mySha)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

<!--BACKPORT [{"sourceCommit":{"message":"\`\`\`metadata={{ extraActionsColor: 'text',\\r\\n }}\\r\\n\`\`\`","sha":"mySha"},"sourceBranch":"main"}] BACKPORT-->"
`);
      });
    });

    describe('{{packageVersion}}', () => {
      it('replaces {{PACKAGE_VERSION}}', () => {
        const body = getPullRequestBody({
          options: {} as ValidConfigOptions,
          commits,
          targetBranch: 'release',
        });

        expect(body).toContain('Backport version: 1.2.3-mocked');
      });
    });

    describe('{{commits}}', () => {
      it('should render commits using Handlebars #each helper', () => {
        const options = {
          prDescription:
            '{{#each commits}} - {{shortSha this.sourceCommit.sha}} {{this.sourceCommit.message}}\n{{/each}}',
        } as ValidConfigOptions;

        expect(getPullRequestBody({ options, commits, targetBranch: '7.x' }))
          .toMatchInlineSnapshot(`
" - acbcdef My commit message (#55)
 - hijklmn Another commit message (#56)
"
`);
      });

      it('should handle curly brackets in commits message', () => {
        const commits = [
          {
            sourceCommit: {
              message:
                "This is a commit message\nThis is a description with illegal brackets ```\r\nmetadata={{\r\n          extraActionsColor: 'text',\r\n        }}\r\n```",
              sha: 'mySha',
            },
            sourceBranch: 'main',
          },
        ] as Commit[];

        const options = {
          prDescription:
            '{{#each commits}} - {{shortSha this.sourceCommit.sha}} {{this.sourceCommit.message}}\n{{/each}}',
        } as ValidConfigOptions;

        expect(getPullRequestBody({ options, commits, targetBranch: '7.x' }))
          .toMatchInlineSnapshot(`
" - mySha This is a commit message
This is a description with illegal brackets \`\`\`
metadata={{
          extraActionsColor: 'text',
        }}
\`\`\`
"
`);
      });
    });
  });

  describe('custom templates', () => {
    it('should support prodfiler team format', () => {
      const commits = [
        {
          sourceCommit: {
            sha: '9e42503a7d0e06e60c575ed2c3b7dc3e5df0dd5c',
            message: 'My commit message (#55)',
          },
          sourcePullRequest: {
            number: 123,
            title: 'Original PR title',
          },
        },
        {
          sourceCommit: {
            sha: '5ce6c3fb9525426d66a85eba057e1214f5f52995',
            message: 'Another commit message',
          },
        },
      ] as Commit[];

      const options = {
        prDescription: `Backport #{{commits.0.sourcePullRequest.number}}: {{commits.0.sourcePullRequest.title}}

{{#each commits}}{{shortSha this.sourceCommit.sha}} {{this.sourceCommit.message}}\n{{/each}}`,
      } as ValidConfigOptions;

      expect(getPullRequestBody({ options, commits, targetBranch: '7.x' }))
        .toMatchInlineSnapshot(`
          "Backport #123: Original PR title

          9e42503a My commit message (#55)
          5ce6c3fb Another commit message
          "
        `);
    });
  });

  describe('commit message formatting', () => {
    it('when single pull request is backported', () => {
      expect(
        getPullRequestBody({
          options: {} as ValidConfigOptions,
          commits: [
            {
              sourcePullRequest: {
                title: 'My PR Title',
                url: 'https://github.com/backport-org/different-merge-strategies/pull/55',
              },
              sourceCommit: {
                sha: 'abcdefghi',
                message: 'My commit message (#55)',
              },
              sourceBranch: 'master',
            } as unknown as Commit,
          ],

          targetBranch: '7.x',
        }),
      ).toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`master\` to \`7.x\`:
 - [My commit message (#55)](https://github.com/backport-org/different-merge-strategies/pull/55)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)"
`);
    });

    it('when a single commit (non pull request) is backported', () => {
      expect(
        getPullRequestBody({
          options: {} as ValidConfigOptions,
          commits: [
            {
              sourceCommit: {
                sha: 'abcdefghijklmw',
                message: 'My commit message',
              },
              sourceBranch: 'main',
            } as any as Commit,
          ],

          targetBranch: '7.x',
        }),
      ).toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`7.x\`:
 - My commit message (abcdefgh)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)"
`);
    });

    it('when multiple commits are backported', () => {
      expect(
        getPullRequestBody({
          options: {} as ValidConfigOptions,
          commits: [
            {
              sourcePullRequest: {
                number: 55,
                title: 'My PR Title',
                url: 'https://github.com/backport-org/different-merge-strategies/pull/55',
              },
              sourceCommit: {
                sha: 'abcdefghijklm',
                message: 'My commit message (#55)',
              },
              sourceBranch: 'main',
            },
            {
              sourceCommit: {
                sha: 'qwertyuiop',
                message: 'Another commit message',
              },
              sourceBranch: 'main',
            },
          ] as Commit[],

          targetBranch: '7.x',
        }),
      ).toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`7.x\`:
 - [My commit message (#55)](https://github.com/backport-org/different-merge-strategies/pull/55)
 - Another commit message (qwertyui)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)"
`);
    });

    it('when a PR is merged (instead of squashed) and the individual commits are selected', () => {
      expect(
        getPullRequestBody({
          options: {} as ValidConfigOptions,
          commits: [
            {
              sourceCommit: {
                message: 'Merge strategy: Second commit',
                sha: 'e8df5eaa4db7b94474b48e2320b02d33a830d9fb',
              },
              sourcePullRequest: {
                number: 1,
                title: 'My PR Title',
                url: 'https://github.com/backport-org/different-merge-strategies/pull/1',
              },
              sourceBranch: 'main',
            },
            {
              sourceCommit: {
                message: 'Merge strategy: First commit',
                sha: '5411b1c1144093e422220008f23f2c2b909ed113',
              },
              sourcePullRequest: {
                number: 1,
                title: 'My PR Title',
                url: 'https://github.com/backport-org/different-merge-strategies/pull/1',
              },
              sourceBranch: 'main',
            },
          ] as Commit[],

          targetBranch: '7.x',
        }),
      ).toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`7.x\`:
 - [Merge strategy: Second commit](https://github.com/backport-org/different-merge-strategies/pull/1)
 - [Merge strategy: First commit](https://github.com/backport-org/different-merge-strategies/pull/1)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)"
`);
    });
  });

  describe('handlebars', () => {
    it('should return default description if handlebars compilation fails', () => {
      const compileError = new Error('Simulated compile error');

      // Stub Handlebars.compile to throw an error.
      const compileSpy = jest
        .spyOn(Handlebars, 'compile')
        .mockImplementation(() => {
          throw compileError;
        });

      const options = {} as ValidConfigOptions;

      expect(getPullRequestBody({ options, commits, targetBranch: '7.x' }))
        .toMatchInlineSnapshot(`
"# Backport

This will backport the following commits from \`main\` to \`7.x\`:
 - [My commit message (#55)](https://github.com/backport-org/different-merge-strategies/pull/55)
 - [Another commit message (#56)](https://github.com/backport-org/different-merge-strategies/pull/56)

<!--- Backport version: 1.2.3-mocked -->

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)"
`);

      // Restore the stubs.
      compileSpy.mockRestore();
    });
  });
});
