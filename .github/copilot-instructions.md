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

### Documentation Project Structure

The `content/` directory contains multiple documentation projects:

**Versioned Projects** (e.g., `content/golang/`, `content/node/`):
- Each subdirectory represents a specific version: `current`, `upcoming`, `v1.12`, `v1.13`, etc.
- Each version has its own `source/` directory containing all documentation files for that version
- **Version isolation**: Files in `current/source/` are completely separate from `v1.12/source/`
- **Build scope**: When building documentation, only files within that version's `source/` directory are processed
- **Include files**: Files in `version/source/includes/` are only shared within that specific version

**Non-Versioned Projects** (e.g., `content/atlas/`, `content/manual/`):
- `source/` directory is at the project root
- No version isolation - all content builds together

**Critical Implication**: When updating or checking references to include files, scope your search to the specific version's `source/` directory. A file like `content/golang/current/source/includes/example.go` is unrelated to `content/golang/v1.12/source/includes/example.go` - they are separate files that can be modified independently.

### Content Guidelines

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

### Project-Specific Testing Patterns

Some projects have additional documentation for common test patterns and
troubleshooting:

- **mongosh**: See `code-example-tests/command-line/mongosh/TESTING-PATTERNS.md`
  for mongosh-specific test patterns, the Expect API, and common failure fixes.

## When working on platform

Platform has not yet defined any instructions.
