# Realm CPP Examples

This project contains code examples for the Realm C++ SDK and their unit and UI tests.

The first time you set up the project, run through **First-time Setup**.

When you're already set up but you have edited source code, start with
**Build the Project**.

If you just want to run the tests, go to **Run the Tests**.

The Flexible Sync backend that this app hits is the [cpp-tester App Services app in the Realm Example Testers Atlas project of the Bushicorp Atlas Organization](https://services.cloud.mongodb.com/groups/5f60207f14dfb25d23101102/apps/6388f860cb722c5a5e002425/dashboard)

## Unit Test Structure

The unit tests are broken out into three separate test suites:

- asymmetric: Examples for Asymmetric Sync/Data Ingest
- local: Examples that don't require Sync (basic CRUD, notifications, logging, data modeling, threading)
- sync: Examples that involve connecting to App Services and/or Device Sync (sync session, manage subscriptions, error handling, calling a function, managing users)

Separating local from Sync simplifies running the tests. When you run the Sync
test suite on macOS, you're prompted to enter your laptop user password to 
give permission to make network requests. Separating the local tests means
you don't have to deal with that prompt for tests that don't require network
access. It also makes running the local tests faster.

Separating asymmetric from Sync is required because asymmetric requires you
to explicity pass the asymmetric object types when opening the synced database,
while sync does not. Most of the Sync examples use the database open template
that does not require you to explicitly pass objects, which causes issues
when the project contains asymmetric object types.

The C++ GitHub workflow looks for changes in the corresponding directory,
and only runs the tests for the relevant test suite. For example, if you
only make changes in the `local` directory, GitHub only builds and runs the
`local` test suite when you make a PR. This speeds up the tests in CI.

Navigate to the relevant test suite when you need to add or make change to
tests.

## First-time Setup

The project uses [CMake](https://cmake.org/) to create build files (Makefile, .xcodeproj...) for the
project. To check if you have CMake installed run:

```shell
cmake
```

If you do have CMake installed, you should see the help documentation in your terminal. If
you don't, you can install CMake with brew or by downloading it directly from CMake.

```shell
brew install cmake
```

## Build the Project

Add a `build` directory to the relevant test suite directory - for example, 
`/examples/local/build`. The `build` directory is in `.gitignore`, so you
don't have to worry about accidentally committing build files.

```shell
# build/ is in .gitignore
mkdir build
cd build
```

From the relevant test suite directory - for example, `/examples/local/build`, 
run `cmake` to create a Makefile by reading `CMakeLists.txt` in the parent directory.

```shell
cmake ../
```

Use `ls` to see that a Makefile has been generated. Then, build the app:

```shell
cmake --build .
```

The first time you run `cmake --build .`, the process will take some time 
because it's doing a full build. On subsequent runs, `cmake --build .` does 
incremental builds, so rebuilding will be faster.

When the build is complete, `ls` should reveal an `examples-asymmetric`,
`examples-local`, or `examples-sync` executable at the root of the `build` 
directory, depending on which test suite you're running.

## Run the Tests

To run the tests, execute the relevant examples executable from the `build` 
directory - for example, `local/build`:

```shell
./examples-local
```

### How to Skip Tests

You can exclude tests from your test run. To exclude tests, pass a flag that
contains the tag or tags you want to exclude when you run the tests:

```shell
./examples ~[sync]
```

This requires us to tag every example consistently. For example, tag examples
using sync with the `sync` tag. When you create a new test case, you can specify
one or more tags for the test. For example, in the following test case declaration,
the tags are `realm` and `sync`:

```cpp
TEST_CASE("open a synced realm", "[realm][sync]")
```

## Update the Realm SDK Version

CMakeLists.txt has a FetchContent block that pulls in the `realm-cpp` repository
code as a dependency, and compiles it:

```shell
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/realm/realm-cpp.git
  GIT_TAG        f4f89d1c75d4c762a679f57d2e9f26e87ec1215b
)
```

To change the version of the SDK we use in the build, change the value
of the `GIT_TAG`. For an unreleased build containing new features, this is a 
commit hash, but it should be a version tag for a release version. For more
information, refer to the
[FetchContent Module docs](https://cmake.org/cmake/help/latest/module/FetchContent.html).

For best results, when changing the SDK version, delete everything in the
`build` directory. You could do this by recursively deleting the build 
directory. From the relevant unit test suite:

```
rm -rf build
```

Then, follow the instructions above to build and run the tests.

## Add a New Test File

To add a new test file, create a file with a `.cpp` extension in the relevant
test suite. For example, `my-new-test-file.cpp`.

Include the relevant headers. They probably look something like:

```cpp
#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
```

Write the test code.

Open `CMakeLists.txt` file. Find the `add_executable` function.
Add the new file name to the appropriate spot in the alphabetical list of files.
For example:

```txt
add_executable(examples-local
  crud.cpp
  my-new-test-file.cpp
  notifications.cpp
)
```

To verify your new test file works, [build the project](https://github.com/mongodb/docs-realm/tree/master/examples/cpp#build-the-project)
again and then [run the tests](https://github.com/mongodb/docs-realm/tree/master/examples/cpp#run-the-tests) again.

## Add a New Example

Find the relevant test case file for the section or category you wish to write
an example for.

Define a new `TEST_CASE`. This should have a unique string name - as in the
example below `"add a dog object to a realm"`, and a tag that designates it
as part of a relevant group of tests. In the example below, the test is tagged
with `"[write]"`.

To enable us to run a group of tests, or exclude a group of tests, use
relevant tags when creating new test cases. For example, tests that use
Device Sync could be tagged with `"[sync]"` so we can easily skip them or
run them specifically, depending on what we're testing.

```cpp
TEST_CASE("add a dog object to a realm", "[write]") {
    auto dog = Dog { .name = "Floof", .age = 3 };

    std::cout << "dog: " << dog << "\n";

    auto realm = realm::open<Person, Dog>();

    realm.write([&realm, &dog] {
        realm.add(dog);
    });
}
```

To verify your new example works, from the `/build` directory, run `cmake --build .` and then
[run the tests](https://github.com/mongodb/docs-realm/tree/master/examples/cpp#run-the-tests)
again.

## Build and Run for Xcode

If you want to use Xcode for breakpoints, debugging, and easy symbol lookup, 
you can build the project to run in Xcode.

From the `/build` directory, run CMake with a `-G Xcode` flag:

```shell
cmake ../ -G Xcode
```

If you have previously run `CMake` for this project, you may see this error:

```shell
CMake Error: Error: generator : Xcode
Does not match the generator used previously: Unix Makefiles
Either remove the CMakeCache.txt file and CMakeFiles directory or choose a different binary directory.
```

To address this error, you can run `cmake ../ -G Xcode` from a clean build directory,
create a new subdirectory for xcode (`/build/xcode`), or remove the files specified
in the error.

On a successful build, you should see the relevant xcodeproj file in the 
directory you tell Xcode to build to - for example, `examples-local.xcodeproj`.

Open the project in Xcode.

Inside the project, you'll see all the linked files, but the source files
for the examples are located in the `Source Files` folder in the directory 
that has the same name as the project executable - for example:

`examples-local/Source Files`

To build and run these source files in Xcode, select the `examples` executable
target and press the `Start` (▶) button. You should see the results and any
print output in the console.

## Generate Code Examples

The `cpp/scripts` directory has a bash script to generate Bluehawk snippets
for all of the test suites.

From this directory, run the bash script to generate updated Bluehawk snippets:

`./bluehawk.sh`
