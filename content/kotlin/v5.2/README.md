# MongoDB Kotlin Driver Documentation

This repository contains documentation for the MongoDB Kotlin Driver.

## File JIRA Tickets

Please file issue reports or requests at the [Documentation Jira Project](https://jira.mongodb.org/browse/DOCS).

## Building API Documentation

Build the API documentation docs for any major and minor version releases.

Use [Dokka](https://github.com/Kotlin/dokka) to generate the API documentation and publish it on GitHub Pages.

1. To execute a build, you must have Java JDK 17 or later installed. Use
   the following `brew` commands to install `jEnv` and `OpenJDK` to manage your Java versions:

```sh
brew install jenv
brew install openjdk@17
```

2. When you install `OpenJDK`, the log includes a command that starts with
   `sudo ln -sfn`. Execute this command to create a symbolic link. Then,
   run the following commands to add the JDK to your environment,
   modifying the path and version number to match the version of OpenJDK
   that you installed. For example, for version 17:

```sh
jenv add /Library/Java/JavaVirtualMachines/openjdk-17.jdk/Contents/Home/
jenv global 17.0
```

3. Fork and clone the
   [`mongo-java-driver`](https://github.com/mongodb/mongo-java-driver)
   repository. Navigate to the repository and run the following `gradle`
   command:

```sh
./gradlew dokkaHtml
```

4. If successful, this command generates API docs in `./build/docs/`.
   Check out the upstream `gh-pages` branch:

```sh
git checkout gh-pages
```

- To work in a feature branch, create one off of the
  `gh-pages` branch by checking out `gh-pages` and then running the
  following command:

  ```sh
  git checkout -b my-feature-branch
  ```

- If a directory for the API docs branch that you're building doesn't
  exist, create the directory. For example:

  ```sh
  mkdir -p 4.10/apidocs/
  ```

5. Move the contents of the `./build/docs/` directory into the target
   version directory. For example:

```sh
mv ./build/docs/* 4.10/apidocs/
```

6. Stage the newly-created docs in Git and ensure that the list of
   staged files only contains the pages you want. For example:

```sh
git add 4.10/apidocs
git status
```

7. Commit and push your changes to your feature branch. Then, create a
   PR against the official repository's `gh-pages`
   branch. After it is approved and you merge the PR, your changes will
   automatically be published to GitHub Pages.

To build the API documentation for all of the drivers, including the
Kotlin driver, that are based on the Java driver, see the `docs-java-other` [README
file](https://github.com/mongodb/docs-java-other#building-api-documentation).

## Licenses

All documentation is available under the terms of a [Creative Commons License](https://creativecommons.org/licenses/by-nc-sa/3.0/).

The MongoDB Documentation Project is governed by the terms of the
[MongoDB Contributor Agreement](https://www.mongodb.com/legal/contributor-agreement).

-- The MongoDB Docs Team
