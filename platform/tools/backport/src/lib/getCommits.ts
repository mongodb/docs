import chalk from 'chalk';
import { ValidConfigOptions } from '../options/options';
import { BackportError } from './BackportError';
import { getFirstLine, getShortSha } from './github/commitFormatters';
import { fetchCommitsByPullNumber } from './github/v4/fetchCommits/fetchCommitByPullNumber';
import { fetchCommitBySha } from './github/v4/fetchCommits/fetchCommitBySha';
import { fetchCommitsByAuthor } from './github/v4/fetchCommits/fetchCommitsByAuthor';
import { fetchPullRequestsBySearchQuery } from './github/v4/fetchCommits/fetchPullRequestsBySearchQuery';
import { ora } from './ora';
import { promptForCommits } from './prompts';

function getOraPersistsOption(question: string, answer: string) {
  return {
    symbol: chalk.green('?'),
    text: `${chalk.bold(question)} ${chalk.cyan(answer)}`,
  };
}

export async function getCommits(options: ValidConfigOptions) {
  const spinner = ora(options.interactive).start();

  try {
    if (options.sha) {
      const shas = Array.isArray(options.sha) ? options.sha : [options.sha];
      spinner.text = `Loading commit "${shas.map(getShortSha)}"`;
      const commits = await Promise.all(
        shas.map((sha) => fetchCommitBySha({ ...options, sha })),
      );

      spinner.stopAndPersist(
        getOraPersistsOption(
          'Select commit',
          commits
            .map((commit) => getFirstLine(commit.sourceCommit.message))
            .join(', '),
        ),
      );

      return commits;
    }

    if (options.pullNumber) {
      const pullNumbers = Array.isArray(options.pullNumber)
        ? options.pullNumber
        : [options.pullNumber];

      spinner.text = `Loading pull request ${pullNumbers
        .map((pullNumber) => `#${pullNumber}`)
        .join(', ')}`;

      const nestedCommits = await Promise.all(
        pullNumbers.map((pullNumber) =>
          fetchCommitsByPullNumber({ ...options, pullNumber }),
        ),
      );
      const commits = nestedCommits.flat();

      // add styles to make it look like a prompt question
      spinner.stopAndPersist(
        getOraPersistsOption(
          'Select pull request',
          commits
            .map((commit) => getFirstLine(commit.sourceCommit.message))
            .join(', '),
        ),
      );

      return commits;
    }

    if (!options.interactive && !options.ls) {
      throw new BackportError(
        'When "--interactive" is disabled either `--sha` or `--pr` must be specified',
      );
    }

    spinner.text = options.prFilter
      ? 'Loading pull requests...'
      : `Loading commits from branch "${options.sourceBranch}"...`;

    const commitChoices =
      options.prFilter !== undefined
        ? await fetchPullRequestsBySearchQuery({
            ...options,
            prFilter: options.prFilter,
          })
        : await fetchCommitsByAuthor(options);
    spinner.stop();

    if (options.ls) {
      return commitChoices;
    }

    return promptForCommits({
      commitChoices,
      isMultipleChoice: options.multipleCommits,
      showDetails: options.details,
    });
  } catch (e) {
    if (options.ls) {
      spinner.stop();
    } else {
      spinner.fail();
    }
    throw e;
  }
}
