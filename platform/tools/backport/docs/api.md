# API

`backport` can be imported as a Node module and interacted with programatically. This can be useful when creating automation around the Backport tool. See for example the [Backport Github Action](https://github.com/sorenlouv/backport-github-action)

### `backportRun(options, processArgs, exitCodeOnFailure)`

Backport a commit programatically. Commits can be selected via `pullNumber` or `sha`.

#### Arguments:

All of the options listed on [config-file-options.md](/docs/config-file-options.md) are valid. The most common options are:

`options.accessToken` _string_ **(Required)**<br/>
Github access token to authenticate the request

`options.repoName` _string_ **(Required)**<br/>
Name of repository

`options.repoOwner` _string_ **(Required)**<br/>
Owner of repository (organisation or username)

`options.pullNumber` _number_<br/>
Filter commits by pull request number

`options.sha` _string_<br/>
Filter commits by commit sha

`options.interactive` _boolean_<br/>
Enable interactive prompts. Default: `true`

`processArgs` _array_<br/>
Useful for forwarding arguments to backport: `const processArgs = process.argv.slice(2);`

`exitCodeOnFailure` _boolean_<br/>
If `true` sets a non-zero exit code on failure. Default: `true`

#### Example

```ts
import { backportRun } from 'backport';

const result = await backportRun({
  options: {
    accessToken: 'very secret',
    repoName: 'kibana',
    repoOwner: 'elastic',
    pullNumber: 121633,
    interactive: false,
  },
});

console.log(result);
```

### `getCommits`

Retrieve information about commits and whether they are backported

#### Arguments:

`accessToken` _string_ **(Required)**<br/>
Github access token to authenticate the request

`repoName` _string_ **(Required)**<br/>
Name of repository

`repoOwner` _string_ **(Required)**<br/>
Owner of repository (organisation or username)

`author` _string_<br/>
Filter commits by Github user

`pullNumber` _number_<br/>
Filter commits by pull request number

`sha` _string_<br/>
Filter commits by commit sha

`sourceBranch` _string_<br/>
The branch to display commits from. Defaults to the default branch (normally "main" or "master")

#### Example

```ts
import { getCommits } from 'backport';

const commits = await getCommits({
  accessToken: 'abc',
  repoName: 'kibana',
  repoOwner: 'elastic',
  pullNumber: 121633,
});

console.log(commits);

/*
[{
  soureCommit: {
    committedDate: '2021-12-20T14:20:16Z',
    sha: 'd421ddcf6157150596581c7885afa3690cec6339',
    message: '[APM] Add note about synthtrace to APM docs (#121633)',
  },
  sourcePullRequest: {
    number: 121633,
    url: 'https://github.com/elastic/kibana/pull/121633'
    mergeCommit: {
      sha: 'd421ddcf6157150596581c7885afa3690cec6339',
      message: '[APM] Add note about synthtrace to APM docs (#121633)',
    }
  },
  sourceBranch: 'main',
  targetPullRequestStates: [
    {
      url: 'https://github.com/elastic/kibana/pull/121643',
      number: 121643,
      branch: '8.0',
      state: 'MERGED'
    }
  ]
}]
*/
```
