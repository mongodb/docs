# Realm Examples

This project contains unit tested JavaScript and TypeScript code examples for the
Realm Node.js SDK. This project serves as the source of truth for generated code
examples in the Node.js SDK documentation.

The project uses [Jest](https://jestjs.io/) to run automated tests.

## Get Started

### Install Dependencies

This project uses [npm](https://www.npmjs.com/) to manage dependencies. To get
started, run:

```bash
npm install
```

### Run Tests

This project defines two test suites, one each for JavaScript and TypeScript,
implemented as Jest projects. To test either JS or TS test suite, run one of the
following:

**All JavaScript tests**

```bash
npm run test:js
```

**All TypeScript tests**

```bash
npm run test:ts
```

**Single test file**

```bash
npm test -- <fileNameWithExtension>
```

### Understand the Project Structure

The following diagram shows the key items in the project directory:

| Path              | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| `__tests__/`      | Examples, test cases, and supporting source files. Add `.js` & `.ts` files here. |
| `babel.config.js` | Configuration for [Babel](https://babeljs.io/) transpilation.                    |
| `jest.config.js`  | Configuration for the [Jest](https://jestjs.io/) testing framework.              |
| `tsconfig.json`   | Configuration for the TypeScript compiler.                                       |
| `testSetup.js`    | Setup and cleanup for the Jest tests. Runs immediately after Jest loads.         |

## Develop

### TypeScript First

New tests should be written in TypeScript first, then converted to Common
JavaScript and added to a JavaScript version of the test file. If the test
doesn't require any TypeScript features or syntax and is only JavaScript, it
should still be written in a TypeScript file.

### Create a New Test Case File

If your new example does not fit well into one of the existing sections, you
should add a new test case file for your section. Create a new file in either
the `__tests__` directory. The file can have any name, but, for consistency, it
should use the same name as its corresponding page in the docs whenever possible.

### Add an Example

Find the relevant test case file for the section or category you wish to write
an example for.

Each file should have at least one `describe()` case that ideally contains an
individual `test()` case for each example in the section or category.

### Restore or Ignore State

These examples use a real backend, which means they can alter that backend's
state and cause the tests to be not exactly reproducible. Design your tests to
either clean up after themselves or not care whether a backend call really
succeeded, just that it completed.

> 💡&nbsp;&nbsp;**Not Every Example is Easily Tested**
>
> For example, the "Confirm Email" example will always try to confirm the
> user email address with a fake token, but this will always fail. No matter,
> just consider it a success if it reported the expected error message ("invalid
> token data") and move on.

## Code to Docs Pipeline

### Annotate for Bluehawk

Code examples are extracted using [Bluehawk](https://github.com/MongoCaleb/bluehawk).

To create a code example, wrap some code between `:snippet-start:` and
`:snippet-end:` tags and give the example an identifier that's unique among
all examples within the file. Keep identifiers descriptive, but short.

If your test needs to run code that shouldn't be in the final generated output,
use Bluehawk's `:remove:` tag.

```js
// This line is just a normal comment. It won't appear in any generated code.
// :snippet-start: my-example
async function myExample() {
  // :remove-start:
  // We need this code to run the test, but it shouldn't be in the final code
  // example.
  // Any lines between :remove-start: and :remove-end: are automatically
  // removed from generated code.
  await setup();
  // :remove-end:
  // Lines not in a hide block (including this comment!) will remain in the
  // generated code.
  return await doSomethingFancy();
}
// :snippet-end:
```

### Include Generated Code Examples in the Docs

Generated code is available within any `.txt` or `.rst` file via the
`.. literalinclude::` directive.

```restructuredtext
.. literalinclude:: /examples/generated/node/authenticate.snippet.my-example.js
   :language: javascript
```

## Questions

Please direct questions or support requests to #docs-realm or @developer-education-team on Slack.
