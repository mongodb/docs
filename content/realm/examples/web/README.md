# Realm Web Test Repo

Tests and code examples for the [Atlas Device SDK for Web (realm-web)](https://www.npmjs.com/package/realm-web).

This repo is based on the [Create React App TypeScript template](https://create-react-app.dev/docs/adding-typescript/).

## Set up

Currently, the team is evaluating the structure and maintenance of this test
project. It is not actively being maintained.

To avoid getting Snyk dependency update pull requests, we have renamed the
`package.json` file to `rename-me.json`. Before you can run the test suite,
rename this file back to `package.json` locally.

Then, set up the project by installing the npm packages:

```sh
yarn
```

You may also want to change the project's Realm app for testing functionality of
Realm App Services. You can change the `APP_ID` in `src/realm.config.json` to the
Realm app that you want to work with.

## Test

Tests are in the `src/__test__` directory.

Run tests with the command:

```sh
yarn test
```

## CI

While the test suite is under evaluation, we have temporarily removed the CI
that runs the tests in GitHub Actions. When/if we are ready to reinstate this
test suite, move the `web.yml` file in this directory to the `.github/workflows`
directory, and make any necessary updates, to reinstate the GitHub Action
that runs the tests on every PR that changes these files.
