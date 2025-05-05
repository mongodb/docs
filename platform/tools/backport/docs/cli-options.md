# CLI options

The CLI options will override the [config-file-options.md](/docs/config-file-options.md).

| Option                  | Shorthand notation | Description                                                                 | Default                   |
| ----------------------- | ------------------ | --------------------------------------------------------------------------- | ------------------------- |
| --access-token          |                    | Github access token                                                         |                           |
| --all                   | -a                 | Show commits from any author. Opposite of `--author`                        | false                     |
| --assignee              | --assign           | Assign users to the target PR                                               |                           |
| --author                |                    | Filter commits by Github username. Opposite of `--all`                      | _Current user_            |
| --auto-assign           |                    | Assign current user to the target PR                                        | false                     |
| --branch                | -b                 | Target branch to backport to                                                |                           |
| --commit-conflicts      |                    | Commit conflicts instead of aborting. Only takes effect in `non-interactive | false                     |
| --config-file           |                    | Custom path to project config file (.backportrc.json)                       |                           |
| --dir                   |                    | Clone repository into custom directory                                      | ~/.backport/repositories/ |
| --dry-run               |                    | Perform backport without pushing to Github                                  | false                     |
| --editor                |                    | Editor (eg. `code`) to open and resolve conflicts                           | nano                      |
| --fork                  |                    | Create backports in fork repo                                               | true                      |
| --git-hostname          |                    | Hostname for Git                                                            | github.com                |
| --interactive           |                    | Enable interactive prompts                                                  | true                      |
| --mainline              |                    | Parent id of merge commit                                                   | 1                         |
| --max-number            | --number, -n       | Number of commits to choose from                                            | 10                        |
| --multiple              |                    | Multi-select for commits and branches                                       | false                     |
| --multiple-branches     |                    | Multi-select for branches                                                   | true                      |
| --multiple-commits      |                    | Multi-select for commits                                                    | false                     |
| --no-cherrypick-ref     |                    | Do not append "(cherry picked from commit...)". [Git Docs][1]               | false                     |
| --no-status-comment     |                    | Do not publish a status comment to Github with the results of the backport  | false                     |
| --no-verify             |                    | Bypass the pre-commit and commit-msg hooks                                  | false                     |
| --path                  | -p                 | Filter commits by path                                                      |                           |
| --pr-description        | --description      | Description for pull request                                                |                           |
| --pr-filter             |                    | Find PRs using [Github's search syntax][2]                                  |                           |
| --pr-title              | --title            | Title of pull request                                                       |                           |
| --pull-number           | --pr               | Backport pull request by number                                             |                           |
| --repo-fork-owner       |                    | The owner of the fork where the backport branch is pushed.                  | _Current user_            |
| --repo-name             |                    | Name of repository                                                          |                           |
| --repo-owner            |                    | Owner of repository                                                         |                           |
| --reset-author          |                    | Set yourself as commit author                                               |                           |
| --reviewer              |                    | Add reviewer to the target PR                                               |                           |
| --sha                   |                    | Sha of commit to backport                                                   |                           |
| --signoff               | -s                 | Pass the --signoff option to the cherry-pick command                        | false                     |
| --copySourcePRLabels    |                    | Copy labels from source PR to the target PR                                 | false                     |
| --copySourcePRReviewers |                    | Copy reviewers from source PR to the target PR                              | false                     |
| --backportBranchName    |                    | Name template to use for the branch name of the backport                    |                           |
| --source-branch         |                    | Specify a non-default branch to backport from                               |                           |
| --source-pr-label       |                    | Labels added to the source PR                                               |                           |
| --target-branch         | -b                 | Target branch(es) to backport to                                            |                           |
| --target-pr-label       | --label, -l        | Labels added to the target PR                                               |                           |
| --help                  |                    | Show help                                                                   |                           |
| -v, --version           |                    | Show version number                                                         |                           |

[1]: https://git-scm.com/docs/git-cherry-pick#Documentation/git-cherry-pick.txt--x
[2]: https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax
