# Realm Dart Tests

## Setup

### Before You Begin

make sure you have Flutter 2.8 and Dart 2.15 flutter --version Flutter 2.8.1 • channel stable • https://github.com/flutter/flutter.git Framework • revision 77d935af4d (5 weeks ago) • 2021-12-16 08:37:33 -0800 Engine • revision 890a5fca2e Tools • Dart 2.15.1

### Steps

Run these commands to setup the application:

1. Disable Realm analytics. Set env variable `REALM_DISABLE_ANALYTICS=exists` either globally
   (for example, in `.zshrc`) or locally to this terminal only. I suggest globally not to forget about it and upload analytics unnecessarily.
1. Get all packages for the example project:

   ```sh
   dart pub get
   ```
1. Install Realm Dart SDK:

   ```sh
   dart run realm_dart install
   ```

1. Run the generator to generate the required Realm object definitions.
   (If asked "Found 4 declared outputs which already exist on disk.Delete these files?"
   use option 1. Delete):

   ```sh
   dart run realm_dart generate
   ```

1. Run the project's tests **without concurrency**:

   ```sh
   dart run test --concurrency=1
   ```

   Or run the test script:

   ```sh
   ./scripts/test.sh
   ```

   **Note**: If you do not use `--concurrency=1`, you will get a bunch of strange errors.

## API

For API usage, refer to the tests in the realm-dart repo: https://github.com/realm/realm-dart/blob/main/test/realm_test.dart

## Using Unpublished Version of realm_dart

Sometimes you may need to use an unpublished version of the `realm_dart` package
for testing features before a release. To do this, you must pull the unpublished version of the
realm_dart package locally, download the realm binary, and add it to the
realm-docs (this) project.

**Note:** All the files you add here won't be committed to git as they're already
in the `.gitignore` file in the `examples/dart` directory.

**Note:** In the future, the Realm Dart SDK team plans for pre-release versions
to be published to [pub.dev](https://pub.dev).

### 1. Add latest version of realm-dart to the realm-docs project

Get the latest version of the realm-dart project, and add it with this directory,
`examples/dart`.

```sh
git clone https://github.com/realm/realm-dart.git
```

### 2. Download the realm binary for your OS

Now you must download the realm binary that accompanies the release for your OS.

1. Go to the realm-dart Github repo [Realm Dart CI Github action](https://github.com/realm/realm-dart/actions/workflows/ci.yml).
1. Click the latest passing workflow run.
1. Scroll down to the bottom of the Workflow to the **Artifacts** section.
1. Download the artifact for your OS (ex. `librealm-macos`).
1. Unzip the binary. It has a name like `librealm_dart.dylib`.
1. Add this binary file to the following location within the `docs-realm` repo:
   `examples/dart/binary/<your OS>/librealm_dart.dylib`.
   The names for the OS folders are `macos`, `linux`, `windows`.

If you're using MacOS, the operating system may give you a security warning when you try
to run the file. You can address this by following [these steps](https://thewiredshopper.com/apple-cannot-check-for-malicious-software-error/).

### 3. Add local version of realm_dart to your pubspec.yaml

Update your `pubspec.yaml` to point to your local version of realm-dart.

```yaml
dependencies:
  realm_dart:
    path: ./realm-dart
```

In the future if you're changing the project to use the version of realm_dart
published to pub.dev, change this back to:

```yaml
dependencies:
  realm_dart: <my version number>
```
