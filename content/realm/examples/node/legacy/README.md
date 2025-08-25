# Realm Examples


The Realm Examples project contains unit tested JavaScript and TypeScript code examples for the
MongoDB Realm Node.js SDK. This project serves as the source of truth for generated code examples in
the Node.js SDK documentation.

The project uses [Jest](https://jestjs.io/) to run automated tests.

This is the legacy test suite. Check out the `/v12` directory for the current
test suite.

## Get Started

### Install Dependencies

This project uses [npm](https://www.npmjs.com/) to manage dependencies. To get started, run:

```bash
npm install
```

### Run Tests

This project defines two test suites, one each for JavaScript and TypeScript, implemented as Jest
projects. To test either JS or TS code examples, run one of the following:

**JavaScript**

```bash
npm run test:js
```

**TypeScript**

```bash
npm run test:ts
```

### Understand the Project Structure

The following diagram shows the key items in the project directory:

| Path               | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| `Examples/`        | Examples, test cases, and supporting source files. Add `.js` & `.ts` files here.        |
| `babel.config.js`  | Configuration for [Babel](https://babeljs.io/) transpilation.                           |
| `jest.config.js`   | Configuration for the [Jest](https://jestjs.io/) testing framework.                     |
| `tsconfig.json`    | Configuration for the TypeScript compiler.                                              |
| `testSetup.js`     | Setup and cleanup for the Jest tests. Runs immediately after Jest loads.                |

## Develop

### Create a New Test Case File

If your new example does not fit well into one of the existing sections, you should add a new test
case file for your section. Create a new file in either the `Examples/js` or `Examples/ts`
(whichever corresponds to the file's language). The file can have any name, but for consistency it
should use the same name as its corresponding page in the docs whenever possible.

For example, the code blocks on https://www.mongodb.com/docs/realm/node/authenticate live in
`Examples/js/authenticate.js` and `Examples/ts/authenticate.ts`.

> 🧪&nbsp;&nbsp;**Jest Global Variables**
>
> The project automatically loads Jest global variables (e.g. `describe()`, `test()`,
> `beforeEach()`, etc.) for files in the `Examples` directory so you can use them without importing
> anything.

### Add an Example

Find the relevant test case file for the section or category you wish to write an example for.

Each file should have at least one `describe()` case that ideally contains an individual `test()`
case for each example in the section or category.

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

To create a code example, wrap some code between `:snippet-start:` and `:snippet-end:`
comments and give the example an identifier that's unique among all examples within the file. If
your test needs to run code that shouldn't be in the final generated output, wrap that code between
`:remove-start:` and `:remove-end:` comments.

```js
// This line is just a normal comment. It won't appear in any generated code.
// :snippet-start: my-example
async function myExample() {
  // :remove-start:
  // We need this code to run the test, but it shouldn't be in the final code example.
  // Any lines between :remove-start: and :remove-end: are automatically removed from generated code.
  await setup();
  // :remove-end:
  // Lines not in a hide block (including this comment!) will remain in the generated code.
  return await doSomethingFancy();
}
// :snippet-end:
```

### Generate Includable Example Code Blocks

Since Bluehawk is currently in development, you cannot install it globally. For now, you can clone
the [repo](https://github.com/MongoCaleb/bluehawk) and set an alias:

```bash
alias bluehawk="node /path/to/bluehawk/index.js"
```

Then, in this directory (the project root), run:

```bash
for i in Examples/*; do
bluehawk -s "$i" -d ../../source/examples/generated
done
```

This processes each test file and outputs generated example code blocks to the
`source/examples/generated/` directory. These files map directly from the `:snippet-start:`
comments in each file.

For example, the annotated code block above generates the following includable code example:

```js
async function myExample() {
  // Lines not in a hide block (including this comment!) will remain in the generated code.
  return await doSomethingFancy();
}
```

Bluehawk currently generates a lot of files, but this project only uses those in
`/source/examples/generated/code/start/`.

### Include Generated Code Examples in the Docs

The generated code is now available within any `.txt` or `.rst` file via the `.. literalinclude::`
directive.

```restructuredtext
.. literalinclude:: /examples/generated/code/start/authenticate.snippet.my-example.js
   :language: javascript
```

## Rejoice!

If all went according to plan, you have now included your unit tested code examples in the docs. Huzzah!

## Questions

Please direct questions or support requests to #docs-realm or @developer-education-team on Slack.
