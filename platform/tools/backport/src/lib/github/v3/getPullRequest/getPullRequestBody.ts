import Handlebars from 'handlebars';
import { ValidConfigOptions } from '../../../../options/options';
import { PACKAGE_VERSION } from '../../../../utils/packageVersion';
import { getSourceBranchFromCommits } from '../../../getSourceBranchFromCommits';
import { logger } from '../../../logger';
import { Commit } from '../../../sourceCommit/parseSourceCommit';
import { getFirstLine, getShortSha } from '../../commitFormatters';

export function getPullRequestBody({
  options,
  commits,
  targetBranch,
}: {
  options: ValidConfigOptions;
  commits: Commit[];
  targetBranch: string;
}) {
  const commitMessagesAsString = commits
    .map((c) => {
      const message = c.sourcePullRequest
        ? `[${getFirstLine(c.sourceCommit.message)}](${c.sourcePullRequest.url})`
        : `${getFirstLine(c.sourceCommit.message)} (${getShortSha(
            c.sourceCommit.sha,
          )})`;

      return ` - ${message}`;
    })
    .join('\n');

  const sourceBranch = getSourceBranchFromCommits(commits);

  const defaultPrDescription =
    '# Backport\n\n' +
    'This will backport the following commits from `{{sourceBranch}}` to `{{targetBranch}}`:\n' +
    '{{commitMessages}}\n\n' +
    '<!--- Backport version: {{PACKAGE_VERSION}} -->\n\n' +
    '### Questions ?\n' +
    'Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)';

  const commitsStringified = stripMarkdownComments(
    `{{{{raw}}}}${JSON.stringify(commits)}{{{{/raw}}}}`,
  );

  const prDescription = (options.prDescription ?? defaultPrDescription)

    // replace defaultPrDescription
    .replaceAll('{{defaultPrDescription}}', defaultPrDescription)
    .replaceAll('{defaultPrDescription}', defaultPrDescription) // for backwards compatibility

    // replace commitMessages
    .replaceAll(
      '{{commitMessages}}',
      `{{{{raw}}}}${commitMessagesAsString}{{{{/raw}}}}`,
    )

    // replace commits
    .replaceAll('{{commits}}', '{{commitsAsJson}}')
    .replaceAll('{commits}', commitsStringified) // for backwards compatibility
    .replaceAll('{{commitsStringified}}', commitsStringified)
    .replaceAll('{{commitsAsJson}}', '{{commits}}')

    // replace sourceBranch and targetBranch
    .replaceAll('{{sourceBranch}}', sourceBranch)
    .replaceAll('{{targetBranch}}', targetBranch)

    // replace package version
    .replaceAll('{{PACKAGE_VERSION}}', PACKAGE_VERSION);

  try {
    const template = Handlebars.compile(prDescription, { noEscape: true });
    const res = template({
      sourcePullRequest: commits[0].sourcePullRequest, // assume that all commits are from the same PR
      commits,
    });

    return res;
  } catch (e) {
    logger.error('Could not compile PR description', e);
    return prDescription
      .replaceAll('{{{{raw}}}}', '')
      .replaceAll('{{{{/raw}}}}', '');
  }
}

function stripMarkdownComments(str: string): string {
  return str.replace(/<!--[\s\S]*?-->/g, '');
}
