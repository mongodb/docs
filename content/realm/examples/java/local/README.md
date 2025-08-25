# Realm Examples

The Realm Examples project contains Java and Kotlin code examples and unit tests for the Realm SDK.

This project uses local-only Realm that stores data on a client device.

## Get Started

### Install Android Studio

Before you can run this project, you need to install and set up Android Studio.
You can download Android Studio [here](https://developer.android.com/studio).

### Create an Android Virtual Device (AVD)

Because the Realm Android SDK doesn't support any Realm functionality in unit testing without
mocking the entire Realm API with Powermock/Mockito, this test suite actually relies on
**instrumented tests**. Thanks to some workarounds and brilliance on the part of Chris Bush,
many of these tests *appear* like unit tests, with Asserts and tested logic... but like any Android
instrumented tests, these tests run in activities on an AVD. You'll need such a
device to run the tests.

To create an AVD in Android Studio, follow the instructions [here](https://developer.android.com/studio/run/managing-avds#createavd).

### Open the Project

Open Android Studio and select `File > Open` from the application menu. Select the `android`
directory containing this README file. Because the project contains the `.idea` directory created
by Android Studio, after waiting a short time (30 seconds to a minute) you
should be able to run the "All Tests" target on a selected AVD using the green play button in the
toolbar.

#### Test via Android Studio

You can also run the "All Tests" target by right clicking on the `app/src/androidTest/java` directory
in Android Studio and selecting "Run 'All Tests'".

You can run test files individual by right clicking on them and selecting "Run '...Test'".

#### Test via CLI

You can run tests through the command line with the following command:

```
./gradlew :app:connectedAndroidTest
```

This runs the `connectedAndroidTest` task in the `app` submodule of this Gradle project.

Before you can run these tests, you'll need an environment where Gradle can execute the tests.
You can provide an environment in the following ways:

- Start an Android Emulator with AVD in Android Studio.
- Connect an Android device in developer mode.

### Understand the Project Structure

The following diagram shows the key items in the project directory:

| path                             | description                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| app/src/androidTest              | Examples and test cases in the blessed instrumented test directory. Add code here.                             |
| app/src/main                     | Source for the app that the tests run against, the Java/Kotlin quickstarts, and example application overrides. |
| build.gradle                     | The project level gradle build configuration. This is where you increment the realm version used in tests.     |
| app/src/build.gradle             | The app module level gradle build configuration. This is where you'll add most dependencies and tweak settings.|
| app/src/main/AndroidManifest.xml | Manifest that allows Android to discover various activities and application definitions in the project.        |
| README.md                        | This file.                                                                                                     |

In short, `src/androidTest/java/com/mongodb/realm/examples/java` should contain Java test code,
and `src/androidTest/java/com/mongodb/realm/examples/kotlin` should contain Kotlin test code.

## Develop

### Create a New Test Case File

If your new example does not fit well into one of the existing sections, you
should add a new test case file for your section.

Right click on either the `java` or `kotlin` bottom-level directories in `androidTest` and select
`File > New`. If you're writing a Java test, select "Java Class", and if you're writing a Kotlin
test, select "Kotlin File/Class".

Enter the name of your test case class (for consistency, it should end with "Test") and press ENTER.

In your new test file:

- make your new test class a subclass of `RealmTest` so you can run Realm SDK methods

Now all you have to do is add a method with a void return type and the `@Test` annotation
to create a new test!

### Add an Example

Find the relevant test case file for the section or category you wish to write
an example for.

Add a test method to it with the `@Test` annotation above the method. For example,
if the example shows how to open a realm, call the test function `testOpenRealm`.

Next, add the example code. If the example doesn't fit in the test function body
itself, you may want to put the code outside of the test case class entirely.

If your example uses synchronized realms or network calls like authentication, functions, etc.,
you'll need to run the example on the UI thread of `RealmTest`'s encapsulated sample activity. Use
the following snippet to run such code on the UI thread:

```
    @Test
    public void myTest() {
        // realm usually doesn't like you doing anything here
        activity.runOnUiThread(() -> {
            // realm network requests work here
        }
        // realm will probably yell at you if you do things here
    }

```

### Restore or Ignore State

These examples use a real backend, which means they can alter that backend's
state and cause the tests to be not exactly reproducible. Design your tests to
either clean up after themselves or not care whether a backend call really
succeeded, just that it completed.

### Wait for Asynchronous Callbacks

These examples are likely to use asynchronous methods, so you will need to use
our custom `Expectation` class to wait for the completion of calls. You can read the
source code for `Expectation` in `RealmTest.kt`. See the following steps on how to use `Expectation`:

1. Create an Expectation with `new Expectation()` in Java or `Expectation()` in Kotlin.

2. In an asynchronous callback, use the `expectation.fulfill()` method to confirm that the call completed.

3. After the asynchronous method call, use the `expectation.await()` method to block execution until
   the callback activates the `expectation.fulfill()` method.

## Code to Docs Pipeline

### Annotate for Bluehawk

Code examples are extracted using
[Bluehawk](https://github.com/MongoCaleb/bluehawk). In the source files, you can annotate code like so:

```swift
// :snippet-start: example
... some code for the code example ...

// :remove-start:
some code that should not be in the code example
// :remove-end:

... some more code for the code example ...
// :snippet-end:
```

where _example_ specified by the `code-block-start` tag is the name of the resulting code example when you run Bluehawk.

### Extract to Literalincludes

Since Bluehawk is currently in development, you cannot install it globally. For
now, you can clone the [repo](https://github.com/MongoCaleb/bluehawk) and follow the
instructions in Bluehawk's README to use the `bluehawk` command.

Then, in this directory, run the following snippet to output the example blocks to the `source/examples/generated/android/` directory:

```bash
bluehawk -s app/src/androidTest/java/com/mongodb/realm/examples/java/AuthenticationTest.java -d ../../../source/examples/generated/android
```

Run this on all of the files in the `androidTest` and `main` directories.

NOTE: Depending on your configuration, Bluehawk does not always play nicely with relative paths. If all else fails, use a full path.

Bluehawk currently generates a lot of files, but we care about those in `/source/examples/generated/android/generated/code/start/`:

```
AuthenticationTest.snippet.anonymous.java
AuthenticationTest.snippet.email-password.java
AuthenticationTest.snippet.api-key.java
...
```

These files correspond to the `:snippet-start:` commands in `AuthenticationTest.java`.

### Include in Docs Source

Now you can update `source/android/authentication.txt` to use these code examples:

```rst
Register a New User Account
---------------------------

.. tabs-realm-languages::

   .. tab::
      :tabid: java

      .. literalinclude:: /includes/android-example-snippets/code/start/AuthenticationTest.snippet.anonymous.java
         :language: java

   .. tab::
      :tabid: kotlin

      .. literalinclude:: /includes/android-example-snippets/code/start/AuthenticationTest.snippet.anonymous.kt
         :language: kotlin

...
```

Behold! You have pasted your unit tested code examples directly into the docs.
Rejoice!

## Questions

Please direct questions or support requests to #docs-realm or
@developer-education-team on Slack.
