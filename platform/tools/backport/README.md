<div align="center">
	<img src="https://user-images.githubusercontent.com/209966/148229483-9f867a20-da7d-4cff-8c52-fcb27d482b89.png" height="200">
	<p>
    <b>A CLI tool that automates the process of backporting commits.</b>
	</p>
	<br>
</div>

## 🎉 New: The Backport Tool as a Github Action 🎉

A [Github Action](https://github.com/sorenlouv/backport-github-action) around The Backport Tool now exists. It makes it a breeze to get automatic backports when pull requests are merged.

# Backport CLI tool

The remaining documentation focuses on the Backport CLI tool (not the Github Action) although all configuration options apply to the Github Action too. The only difference is that the CLI tool is interactive and run manually locally, where the Github Action runs automatically.

## How it works

1. Select a commit to backport
2. Select a branch to backport to
3. The commit will be cherrypicked, pushed and a pull request created.

![backport-demo](https://user-images.githubusercontent.com/209966/80993576-95766380-8e3b-11ea-9efd-b35eb2e6a9ec.gif)

## Requirements

- Node 18 or higher
- git

## Install

```sh
npm install -g backport
```

After installation you should add an access token to the [global config](/docs/config-file-options.md#global-config-backportconfigjson) in `~/.backport/config.json`. See the [documentation](/docs/config-file-options.md#accesstoken-required) for how the access token is generated.

## Quick start

```
npm install backport
```

Add a [project config](/docs/config-file-options.md#project-config-backportrcjson) to the root of your repository:

```js
// .backportrc.json
{
  // Required
  "repoOwner": "elastic",
  "repoName": "kibana",

  // the branches available to backport to
  "targetBranchChoices": ["main", "6.3", "6.2", "6.1", "6.0"],

  // Optional: automatically merge backport PR
  "autoMerge": true,
  "autoMergeMethod": "squash",

  // Optional: Automatically detect which branches a pull request should be backported to based on the pull request labels.
  // In this case, adding the label "auto-backport-to-production" will backport the PR to the "production" branch
  "branchLabelMapping": {
    "^auto-backport-to-(.+)$": "$1"
  }
}
```

Add personal access token to [global config](/docs/config-file-options.md#global-config-backportconfigjson):

```js
// ~/.backport/config.json
{
  "accessToken": "ghp_very_secret"
}
```

Run:

```
npx backport
```

_This will start an interactive prompt. You can use your keyboards arrow keys to choose options, `<space>` to select checkboxes and `<enter>` to proceed._

## Documentation

- [Config file options](/docs/config-file-options.md)
- [CLI options](/docs/cli-options.md)
- [Module API](/docs/api.md)

### What is backporting?

> Backporting is the action of taking parts from a newer version of a software system [..] and porting them to an older version of the same software. It forms part of the maintenance step in a software development process, and it is commonly used for fixing security issues in older versions of the software and also for providing new features to older versions.

Source: [https://en.wikipedia.org/wiki/Backporting](https://en.wikipedia.org/wiki/Backporting)

### Who is this tool for?

This tools is for anybody who is working on a codebase where they have to maintain multiple versions. If you manually cherry-pick commits from master and apply them to one or more branches, this tool might save you a lot of time.

`backport` is a CLI tool that will let you backport commit(s) interactively and then cherry-pick and create pull requests automatically. `backport` will perform all git operations in a temporary folder (`~/.backport/repositories/`) separate from your working directory, thereby never interfering with any unstages changes your might have.

### Features:

- interactively backport one or more commits to one or more branches with an intuitive UI
- ability to see which commits have been backported and to which branches
- ability to customize the title, description and labels of the created backport PRs
- all git operations are handled in a separate directory to not interfere with unstaged files
- Conflicts are handled gracefully, and hints are provided to help the user understand the source of the conflict
- backport a commit by specifying a PR: `backport --pr 1337`
- list and backport commits by a particular user: `backport --author john`
- list and backport commits by a particular path: `backport --path src/plugins/chatbot`
- list PRs filtered by a query: `backport --pr-filter label:backport-v2` (will list commits from PRs with the label "backport-v2")
- forward port commits: `backport --source-branch 7.x --branch master` (will forwardport from 7.x to master)
- backport merge commits: `backport --mainline`

## Contributing

See [CONTRIBUTING.md](https://github.com/sorenlouv/backport/blob/master/CONTRIBUTING.md)
