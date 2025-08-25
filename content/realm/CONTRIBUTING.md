# Contribute to MongoDB Docs

Thanks for your interest in contributing to the documentation! This document
contains everything you need to know about contributing to the docs.

>💡 Did you know? Every page on the docs has a "feedback widget" you can use to submit feedback. This is a great way to point out issues or possible improvements - the docs team can take it from there!

## About MongoDB Docs

We use a sort of "docs as code" model with the reStructedText (rST) markup
language with "Sphinx" extensions on plain text source files.

An in-house build tool called "Snooty" converts the source files into the static
site. This happens in a cloud environment known as "Autobuilder".

⚠️ Unfortunately, local builds are not possible, and it's not currently possible
to provide external contributors with preview builds. Therefore, when
contributing to docs, we recommend keeping it to simple fixes like text rework,
typo fixes, etc. Please tap on the docs team (tag @realmies, chat in #docs-appx,
etc.) to help with things that would require previews such as editing tables,
etc.

## Setup

If you have not done so already, please sign the [MongoDB Contributor
Agreement](https://www.mongodb.com/legal/contributor-agreement).

Fork the `mongodb/docs-realm` repo.

For contributions to the Atlas App Services docs site, fork `mongodb/docs-app-services`.

## Find the Source File

The path to the page you want to edit can be derived from the docs site URL:

1. Delete the site base URL (in our case, `https://www.mongodb.com/docs/realm/`).
2. Prepend `source/`. 
3. Replace the trailing slash with `.txt`.

For example, suppose you want to edit the page at
`https://www.mongodb.com/docs/realm/sdk/swift/crud/create/`. The source for this
page will be found in the repo at `source/sdk/swift/crud/create.txt`.

## Edit!

Make your changes directly in the source file.

We recommend the "Snooty" plugin for VS Code: https://github.com/mongodb/snooty-vscode

Check out these other resources for the rST markup with Sphinx extensions:

- https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html
- https://docutils.sourceforge.io/rst.html

## Pull Request

Once you're happy with your changes, you can commit the changes and submit a
pull request. Let us know and we'll be happy to review and merge your changes.

>💡 For major changes like moving sections around, please consult with the docs team
first to save us all a lot of time in the review cycle.

Soon after your changes are merged, they'll be published!

## About Code Examples

In many cases, we have **tested code examples**. The source for the examples
test suites can be found under the `examples/` directory. We use a tool we wrote
called [Bluehawk](https://github.com/mongodb-university/bluehawk) to extract the
code examples into snippets we can then import into the docs. Generally, the
snippets go into the `source/examples/generated/` directory. The other source
files pull them in from there.

Please don't edit files under any `generated/` path as those changes will be
wiped out next time we run Bluehawk. For assistance with editing code examples,
please consult the docs team.

