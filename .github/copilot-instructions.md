# MongoDB Documentation Monorepo

This repository is a monorepo that serves several purposes:

- It houses the content files used to create the MongoDB documentation sites
- It houses infrastructure to validate the code examples used in the documentation
- It houses platform code used to build the documentation sites

This instructions file contains conditional considerations to apply depending
on what part of the monorepo you're working in:

- `content\` - refer to "When working on content"
- `code-example-tests\` - refer to "When working on code example testing"
- `platform\` - refer to "When working on platform"

When you are performing a code review, apply the instructions based on
the file paths of the files in the PR per the breakdown above.

## When working on content

- DO NOT remove any .rST or custom formatting.
- If you see text wrapped in "{+" and "+}", or "|" leave it as is. E.g. Do not change "{+avs+}", "|fts|", or "|service|".
- For headers, length of underlines must match the heading length. For example:

```
========
Header 1
========

Header 2
--------

Header 3
~~~~~~~~
```

- When performing a code review, incorporate the style guidance from .github/prompts/style-guide-check.prompt.md.

## When working on code example tests

The `code-example-tests` directory contains many programming language-specific
projects designed to test the MongoDB code examples in our documentation. Each
project contains (with slight variations to accommodate language idiomatic
considerations):

- An `examples` directory where the executable code examples are created and
  maintained. DON'T change these files.
- A `tests` directory that contains language and framework-specific files to
  call the executable code examples. Examples return values, which we validate
  against expectations, to ensure the code examples compile, run, and produce
  the output we expect.
- A `utils` directory, package, or library that contains various utilities to
  simplify this process, such as a utility to compare the output produced by
  running a code example with an expected output file to validate that the
  code example functions as intended.

When you work in these files, follow these principles:

- If you create debug files, examine them to consider whether they contain any
  contents that would be useful to maintain as ongoing test coverage to validate
  against regressions. If yes, add tests incorporating those patterns or cases.
  Then, delete the debug files.
- If you add debug output to source code to diagnose an issue, remove it when
  you're done.
- After you change implementation details, run the entire test suite for that
  project to ensure you haven't introduced any regressions.
- Optimize for maintainability. Use language and framework-idiomatic function
  documentation, and capture the "why" of design-decisions in code comments
  inline. Chose simpler solutions over clever ones to improve maintainability.

Keep in mind when developing `utils` that the users of these utils are technical
writers, not developers. Keep the user-facing APIs as simple as possible.
Avoid unnecessary configuration or an excessive number of public methods unless
it is key to implementing the requested functionality. Handle those details
internally as much as possible.

Most importantly, DO NOT PEPPER EVERY FILE WITH EMOJIS AND PRINT MINDLESS
SUCCESS MESSAGES WHEN YOU HAVE FAILING TESTS. The user hates that. Just iterate
until you have resolved test failures - don't call a partial implementation
with a mix of passing and failing tests "complete" or "successful."

## When working on platform

Platform has not yet defined any instructions.
