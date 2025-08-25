# Realm Examples

The Realm Examples project contains unit-tested JavaScript and TypeScript code examples for the
MongoDB Realm React Native SDK using @realm/react.

This project serves as the source of truth for generated code examples in
the React Native SDK documentation.

The project uses [Jest](https://jestjs.io/) and [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/) to run automated tests.

## Get Started

### Install Dependencies

This project uses [npm](https://www.npmjs.com/) to manage dependencies. To get started, run the following:

```bash
npm install
```

> **Warning**
> Currently, `npm install` fails in Node.js v16.17.0. We recommend using Node.js v16.14.0.

### Run Tests

This project defines a unit test suite that tests both JS and TS code examples. You can run them via:

```bash
npm run test
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

### Create a New Test Case File

The file structure in `__tests__/` is intended to match the IA structure in the
React Native docs. If you're adding a new code example to an existing page, add
an additional it/test block within the test file corresponding to that page.

If you're adding a new section in the TOC of the docs, create a
new folder under `__tests__`. For each page in that section, create a test file
within the new folder.

However, if you're just adding a new page, create a new page within the relevant
subfolder of `__test__`. For example, if you're creating examples for a new page
called "read.txt" that is under the "CRUD" section of the TOC in the docs, you
should create the file `__tests__/CRUD/read.tsx|jsx`. That new file should have
its own `describe` block labeled accordingly to the page.

The file can have any name, but for consistency, it should use the same name as
its corresponding page in the docs whenever possible.

For example, the code blocks on
https://www.mongodb.com/docs/realm/sdk/react-native/realm-database/crud/create/
live in `__tests__/crud/create.tsx|jsx`

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

Install Bluehawk globally:

```bash
npm install -g bluehawk
```

Then, in this directory (the project root), run the following:

```bash
bluehawk snip __tests__/ <your-directory-where-your-docs-are-stored>/docs-realm/source/examples/generated/react-native/

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
.. literalinclude:: /examples/generated/react-native/authenticate.snippet.my-example.js
   :language: typescript
```

## Rejoice!

If all went according to plan, you have now included your unit-tested code examples in the docs. Huzzah!

## Questions

Please direct questions or support requests to #docs-appx or @realmies on Slack.
