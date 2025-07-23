# Docs Code Examples Tests

This directory represents the eventual home for all code examples across
[MongoDB documentation](https://www.mongodb.com/docs/) properties.

Details TBD as infrastructure is added and projects related to standardization
and coverage are completed.

## Structure

Each programming language has its own directory, with each driver or product as
a subdirectory. Each directory is split into examples and tests. Examples live
in stand-alone files in the `language/driver/examples` directory, grouped by topic. 
Tests live in consolidated files in the `language/driver/tests` directory, with 
each test executing example code to verify that:

- Examples compile and run
- Examples do what we say they do

We use tooling to extract the tested code examples to the `content/code-examples/tested`
directory. The content of the `content/code-examples/tested` directory is tested,
snippeted code that is ready to use in the documentation.

## Example extraction

Because these examples are designed to be runnable and testable, they contain
additional code related to our infrastructure that is not relevant to the
developer consuming our documentation. For example, the tests use
language-idiomatic methods for reading environment values to get the appropriate
connection string, or have method signatures or function calls with
return values for testing purposes that are not needed in the docs example.

Docs uses a markup tool called [Bluehawk](https://github.com/mongodb-university/Bluehawk)
to add markup to extract only the relevant parts of the code examples. Each
language directory includes a script, `snip.js`, that uses this markup tool
to extract relevant code to the `content/code-examples/tested` directory. For more
details, refer to the language-specific README.md on generating code examples.

For docs purposes, writers should _only_ use code examples from the
`content/code-examples/tested` directory. Using an example directly from the
`language/driver/examples` directory may contain code that is not desired in the docs.

## Automated testing

When any file in any of the `language/driver/examples` directories are updated in a PR,
the GitHub workflows contained in the `.github/workflows` directory automatically
run the test suite. These workflows report the results of the test suite runs
as passes or failures on the PR.

If changing an example causes its test to fail, this should be considered
blocking for merging the example. The PR should not be merged until the example
and/or test is fixed and the test passes.

If changing an example causes an _unrelated_ test to fail, create a Jira ticket
in the DOCSP project with the component DevDocs. Provide a link to your PR and details about the test failure. This should not block merging an example update.

## Local testing

Each language directory contains a README.md with instructions about how to
run the tests locally. Contributors can and should run tests for any examples
they're changing locally during the update process. Reviewers don't _need_ to
run the tests directly, since the tests run automatically in CI, but if they
_want_ to run the tests, they can check out the PR and run the tests locally.

## Symlinks

Our build toolchain can't use files outside of a `project/version/source` directory.
To avoid copying code examples into every docs project source directory, we
use symlinks. Creating a symlink in a docs project makes the examples in 
`content/code-examples/tested` available to that project.

Each docs project directory and version must have a symlink if you want to use
the tested code examples.

### Checking if a directory has a symlink

In the terminal, make sure you are in the directory you want to make a symlink in.
For example, run `cd content/manual/manual/source/code-examples`. 
Then, use the following command to see all the files in the directory.

```
ls -l
```

In the outputted list, see if there is a name with this structure:
`tested -> ../../../../code-examples/tested`. If it exists, a symlink to the tested
code examples has already been created. 

You can also specify the symlink you are checking for by adding its name to the
previous command:

```
ls -l tested
```

You can see the actual path that the symlink routes to by using this command:
```
realpath tested
```

If the result matches `../docs-mongodb-internal/content/code-examples/tested`, 
then the symlink has already been properly created. 

### Making a new symlink

If there is no symlink created, then use this command inside the correct 
`/source/code-examples` directory to create one:

```
ln -s ../../../../code-examples/tested
```

> 💡 **Tip**: The nesting level may vary depending on whether the docs project
> is versioned. Add or omit `../` as necessary to create the symlink to the
> correct directory. Example: if creating a symlink in manual/manual/source/code-examples,
> there should be 4 nesting levels -> `../../../../code-examples/tested`.

Make sure to check that it has been properly created using the steps outlined
in **Checking if a directory has a symlink**.

### Using the symlinked tested code examples

To use the code examples on a page, use the `..literalinclude::` directive
with the following file path structure:

```
/code-examples/tested/language/driver/topic/subtopic/snippetname
```

For example, to access the snippet generated from tutorial_app.py, use
this file path:

```
.. literalincude:: /code-examples/tested/python/pymongo/aggregation/pipelines/filter_tutorial.snippet.sort.py
   :language: python
   :copyable: true
   :category: usage example
   :dedent:
```
