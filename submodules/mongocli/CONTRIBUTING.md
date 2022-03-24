# Contributing to MongoDB CLI

Thanks for your interest in contributing to `mongocli`,
this document describes some guidelines necessary to participate in the community.

## Table of Contents

* [Asking Support Questions](#asking-support-questions)
* [Feature Requests](#feature-requests)
* [Reporting Issues](#reporting-issues)
* [Submitting Patches](#submitting-patches)
  * [Code Contribution Guidelines](#code-contribution-guidelines)
  * [Development Setup](#development-setup)
  * [Building and Testing](#building-and-testing)
  * [Adding a New Command](#adding-a-new-commands)
  * [Third Party Dependencies](#third-party-dependencies)
* [Maintainer's Guide](#maintainers-guide)

## Asking Support Questions

MongoDB support is provided under MongoDB Atlas or Enterprise Advance [support plans](https://support.mongodb.com/welcome).
Please don't use the GitHub issue tracker to ask questions.

## Feature Requests

We welcome any feedback or feature request, to submit yours
please head over to our [feedback page](https://feedback.mongodb.com/forums/930808-mongodb-cli).

## Reporting Issues

Please create a [GitHub issue](https://github.com/mongodb/mongocli/issues/new?assignees=&labels=&template=bug_report.md) describing the kind of problem you're facing
with as much detail as possible, including things like operating system or anything else may be relevant to the issue.

## Submitting Patches

The MongoDB CLI project welcomes all contributors and contributions regardless of skill or experience level.
If you are interested in helping with the project, please follow our [guidelines](#code-contribution-guidelines).

### Code Contribution Guidelines

To create the best possible product for our users and the best contribution experience for our developers,
we have a set of guidelines to ensure that all contributions are acceptable.

To make the contribution process as seamless as possible, we ask for the following:

* Fork the repository to work on your changes. Note that code contributions are accepted through pull requests to encourage discussion and allow for a smooth review experience.
* When you’re ready to create a pull request, be sure to:
  * Sign the [CLA](https://www.mongodb.com/legal/contributor-agreement).
  * Have test cases for the new code. If you have questions about how to do this, please ask in your pull request or check the [Building and Testing](#building-and-testing) section.
  * Run `make fmt`.
  * Add documentation if you are adding new features or changing functionality.
  * Confirm that `make check` succeeds. [GitHub Actions](https://github.com/mongodb/mongocli/actions).

### Development Setup

#### Prerequisite Tools
- [Git](https://git-scm.com/)
- [Go (at least Go 1.17)](https://golang.org/dl/)

#### Environment
- Fork the repository.
- Clone your forked repository locally.
- We use Go Modules to manage dependencies, so you can develop outside your `$GOPATH`.
- We use [golangci-lint](https://github.com/golangci/golangci-lint) to lint our code, you can install it locally via `make setup`.

### Building and Testing

The following is a short list of commands that can be run in the root of the project directory

- Run `make` see a list of available targets.
- Run `make test` to run all unit tests.
- Run `make lint` to validate against our linting rules.
- Run `E2E_TAGS=e2e,atlas make e2e-test` will run end to end tests against an Atlas instance,
  please make sure to have set `MCLI_*` variables pointing to that instance.
- Run `E2E_TAGS=cloudmanager,remote,generic make e2e-test` will run end to end tests against an Cloud Manager instance.<br />
  Please remember to: (a) have a running automation agent, and (b) set MCLI_* variables to point to your Cloud Manager instance.
- Run `make build` to generate a local binary in the `./bin` folder.

We provide a git pre-commit hook to format and check the code, to install it run `make link-git-hooks`.

#### Generating Mocks

We use [mockgen](https://github.com/golang/mock) to handle mocking in our unit tests.
If you need a new mock please update or add the `//go:generate` instruction to the appropriate file.

### Adding a New Command

`mongocli` uses [Cobra](https://github.com/spf13/cobra) as a framework for defining commands,
in addition to this we have defined a basic structure that should be followed.
For a `mongocli scope newCommand` command, a file `internal/cli/scope/new_command.go` should implement:
- A `ScopeNewCommandOpts` struct which handles the different options for the command.
- At least a `func (opts *ScopeNewCommandOpts) Run() error` function with the main command logic.
- A `func ScopeNewCommandBuilder() *cobra.Command` function to put together the expected cobra definition along with the `ScopeNewCommandOpts` logic.
- A set of documentation fields further described in the section below.

Commands follow a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) approach to match the APIs, whenever possible.
For that reason, command arguments tend to match the path and query params of the APIs,
with the last param being a required argument and the rest handled via flag options.
For commands that create or modify complex data structures, the use of configuration files is preferred over flag options.

#### How to define flags:
Flags are a way to modify the command, also may be called "options". Flags always have a long version with two dashes (--state) but may also have a shortcut with one dash and one letter (-s).

`mongocli` uses the following types of flags:

- `--flagName value`: this type of flag passes the value to the command. Examples: `--projectId 5efda6aea3f2ed2e7dd6ce05`
- `--booleanFlag`: this flag represents a boolean and it sets the related variable to true when the flag is used, false otherwise.  Example: `--force`
- `--flagName value1,value2,..,valueN`: you will also find flags that accept a list of values. This type of flag can be very useful to represent data structures as `--role roleName1@db,roleName2@db`, `--privilege action@dbName.collection,action2@dbName.collection`, or `--key field:type`.
  As shown in the examples, the standard format used to represent data structures consists of splitting the first value with the second one by at sign `@` or colon `:`, and the second value with the third one by a full stop `.`.
  We recommend using configuration files for complex data structures that require more than three values. For an example of configuration files, see [mongocli atlas cluster create](https://github.com/mongodb/mongocli/blob/f2e6d661a3eb2cfcf9baab5f9e0b1c0f872b8c14/internal/cli/atlas/clusters/create.go#L235).

#### Documentation Requirements

f you are adding a brand new command, or updating a command that has no doc annotations, please define the following doc structures for the command. For more information on all command structs, see [Cobra](https://pkg.go.dev/github.com/spf13/cobra#Command).
- Add `Use` - (Required) Shows the command and arguments if applicable. Will show up in 'help' output.
- Add `Short` - (Required) Briefly describes the command. Will show up in 'help' output.
- Add `Example` - (Required) Example of how to use the command. Will show up in 'help' output.
- Add `Annotations` - If the command has arguments, annotations should be added. They consist of key/value pairs that describe arguments in the command and are added to the generated documentation.
- Add `Long` - Fully describes the command. Will show up in 'help' output. 

Furthermore, after adding the necessary structure, ensure that applicable documentation is generated by running `make gen-docs`.
- Run `make gen-docs`- This generates the documentation for the introduced command.
- Review the PR with the doc team.

### Third Party Dependencies

We scan our dependencies for vulnerabilities and incompatible licenses using [Snyk](https://snyk.io/).
To run Snyk locally please follow their [CLI reference](https://support.snyk.io/hc/en-us/articles/360003812458-Getting-started-with-the-CLI).

## Maintainer's Guide

Reviewers, please ensure that the CLA has been signed by referring to [the contributors tool](https://contributors.corp.mongodb.com/) (internal link).

For changes that involve user facing copy please include `docs-cloud-team` as a reviewer.
