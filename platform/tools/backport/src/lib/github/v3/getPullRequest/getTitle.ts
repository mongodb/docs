import Handlebars from 'handlebars';
import { ValidConfigOptions } from '../../../../options/options';
import { getSourceBranchFromCommits } from '../../../getSourceBranchFromCommits';
import { logger } from '../../../logger';
import { Commit } from '../../../sourceCommit/parseSourceCommit';
import { getFirstLine } from '../../commitFormatters';

export function getTitle({
  options,
  commits,
  targetBranch,
}: {
  options: ValidConfigOptions;
  commits: Commit[];
  targetBranch: string;
}) {
  const sourceBranch = getSourceBranchFromCommits(commits);
  const commitMessages = commits
    .map((c) => getFirstLine(c.sourceCommit.message))
    .join(' | ');

  const defaultPrTitle = '[{{targetBranch}}] {{commitMessages}}';

  const prTitle = (options.prTitle ?? defaultPrTitle)
    .replaceAll(
      '{{commitMessages}}',
      `{{{{raw}}}}${commitMessages}{{{{/raw}}}}`,
    )
    .replaceAll('{{targetBranch}}', targetBranch)
    .replaceAll('{{sourceBranch}}', sourceBranch);

  try {
    const template = Handlebars.compile(prTitle, { noEscape: true });
    return template({
      sourcePullRequest: commits[0].sourcePullRequest, // assume that all commits are from the same PR
      commits,
    });
  } catch (error) {
    logger.error('Error while compiling PR title template', error);
    return prTitle.replaceAll('{{{{raw}}}}', '').replaceAll('{{{{/raw}}}}', '');
  }
}
