# Realm Examples

The Realm Examples project contains the Swift, SwiftUI and iOS code examples 
for Realm and their unit and UI tests.

The Partition-Based Sync backend that this app hits is located in the [example-testers App Services app of the Realm Example Testers Atlas project of the Bushicorp Atlas organization](https://services.cloud.mongodb.com/groups/5f60207f14dfb25d23101102/apps/5f6020d292050452b72032e2/dashboard).

The Flexible Sync backend that this app hits is located in the [swift-flexible App Services app of the Realm Example Testers Atlas project of the Bushicorp Atlas Organization](https://services.cloud.mongodb.com/groups/5f60207f14dfb25d23101102/apps/61eeda562b57b7279f705b95/dashboard)

## Get Started

### Install SwiftLint

This project uses Swift Package Manager (SPM) to manage dependencies. As of
March 2022, there isn't a good way to install SwiftLint with SPM. Follow the
installation instructions from [SwiftLint](https://github.com/realm/SwiftLint)
to install it locally. SwiftLint runs when you run the tests, and if you don't
install it locally, you get an error and the project does not build.

### Run Unit Tests

The Swift and Objective-C iOS examples are tested with unit tests. To run the 
unit tests, open the RealmExamples.xcodeproj file with Xcode:

```bash
open RealmExamples.xcodeproj
```

If this is your first time opening the project, SPM will take a few minutes to
download dependencies before you can run.

To run the tests, ensure the "Test Examples" scheme is selected in the top left
and do one of the following:

- Press and hold the "Run" button (▶) to select "Test"
- In the Xcode menu, select Product > Test
- Type `⌘U`

Xcode will build the project and open a Simulator to host the test runners.

Check the Test navigator (`⌘6`) on the left panel in Xcode to see the results of
the tests. You can also re-run specific tests from this panel by clicking the
little ▶ button next to each test. You'll note this only runs the 
"RealmExamples" tests. To run the SwiftUI tests, see: *Run UI Tests* below.

### Run UI Tests

The SwiftUI View examples are tested with UI tests. To run the UI tests 
for the SwiftUI View examples, open the RealmExamples.xcodeproj file with Xcode:

```bash
open RealmExamples.xcodeproj
```

If this is your first time opening the project, SPM will take a few minutes to
download dependencies before you can run.

To run the tests, ensure the "SwiftUI Catalog" scheme is selected in the top left
and do one of the following:

- Press and hold the "Run" button (▶) to select "Test"
- In the Xcode menu, select Product > Test
- Type `⌘U`

Xcode will build the project and open a Simulator to host the test runners.

Check the Test navigator (`⌘6`) on the left panel in Xcode to see the results of
the tests. You can also re-run specific tests from this panel by clicking the
little ▶ button next to each test. You'll note this only runs the 
"SwiftUICatalogUITests" - to run the Swift, Objective-C & iOS tests, see:
*Run Unit Tests* above.


### Understand the Project Structure

The following diagram shows the key items in the project directory:

| path                       | description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| Examples/                  | Examples, test cases, and supporting source files. Add code here.                  |
| HostApp/                   | Source for the app that the tests run against. Do not modify.                      |
| QuickStartSwiftUI/         | Source for the SwiftUI quick start example app.                                    |
| RealmExamples.xcodeproj/   | Xcode project file.                                                                |
| RealmExamples.xcworkspace/ | Dependency-aware Xcode workspace. Use this instead of .xcproj after `pod install`. |
| README.md                  | This file.                                                                         |
| SwiftUICatalog             | Source for the app that the SwiftUI tests run against. Add examples to `Views` .   |
| SwiftUICatalogUITests      | Test cases to verify the View examples work as presented in the docs.              |
| SwiftUIFlexSyncExample     | Source for the SwiftUI quick start example app using Flexible Sync.                |

In short, `Examples/` should contain both Swift and Objective-C example and test code.

`QuickStartSwiftUI/` & `SwiftUIFlexSyncExample` contains the source for the SwiftUI quick start.

`SwiftUICatalog` contains SwiftUI View examples, and the test app that runs them.

## Develop Swift/Objective-C iOS Examples

### Create a New Test Case File

If your new example does not fit well into one of the existing sections, you
should add a new test case file for your section.

In the Xcode menu, select File > New... > File... (or press `⌘N`). Select "Unit
Test Case Class" from the template menu and click "Next".

Enter the name of your test case class, select either Swift or Objective-C, and
click "Next".

In the file selector window, navigate to the `Examples/` directory.

- Ensure "Group" is set to "Examples"
- Under "Targets", only "RealmExamples" should be selected.

Click "Create" to create the file.

### Add an Example

Find the relevant test case file for the section or category you wish to write
an example for.

Each file should have one `XCTestCase`-derived test case class. Add a test
method to it, which can be named anything starting with `test...`. For example,
if the example shows how to open a realm, call the test function
`testOpenRealm`.

Next, add the example code. If the example doesn't fit in the test function body
itself, you may want to put the code outside of the test case class entirely.
For instance, an example may declare a class or something that can't be declared
in a function body. Realm objects cannot be declared as subtypes of other
objects. So, feel free to write your example in another part of the file, and
then test that example by referring to it in the test function.

> ⚠️ **Avoid Polluting the Global Scope**
>
> You may want to write an example where you define some class and then write a
> function that uses it. You want the example to be one contiguous block, and you
> don't want other examples using and diluting your class. That's perfectly fine.
> Just one slight problem: a class or function declared in the global scope of
> one file will collide with the same named class or function declared in the
> global scope of another file. In other words, there can be only one global
> `Dog`, `Task`, or `Car` class in this project. To avoid this, consider the
> following techniques:
>
> - Keep it local to a function, struct, or class. Keep as much of the example
>   code in the test function scope as possible.
> - Use the `private` keyword in Swift to keep an object local to a file.
> - Name the class or function something particularly file-specific, so it is
>   unlikely to be used in another example. A little contrivance is not to bad.
>   Say your class is for an example about inverse relationships, you might make
>   a `DogWithInverseRelationship` class specifically for it.

### Restore or Ignore State

These examples use a real backend, which means they can alter that backend's
state and cause the tests to be not exactly reproducible. Design your tests to
either clean up after themselves or not care whether a backend call really
succeeded, just that it completed.

> 💡 For example, the "Confirm Email" example will always try to confirm the
> user email address with a fake token, but this will always fail. No matter,
> just consider it a success if it reported the expected error message ("invalid
> token data") and move on.

The `TestSetup` class is the "primary class" for the test suite, which means
Xcode will instantiate one before running any tests. This is where we call a
function to delete any users and clear the host app of any data.

### Shred the Anonymous User

The iOS SDK recycles the same anonymous user until you remove them from the
device. This can affect other test cases. If your test case signs in as an
anonymous user, please remove the user from the device in your test's tearDown()
method. See `MultipleUsers` for an example.

### Wait for Asynchronous Callbacks

These examples are likely to use asynchronous methods, so you will need to use
`XCTestExpectation` to wait for the completion of calls.

https://developer.apple.com/documentation/xctest/asynchronous_tests_and_expectations/testing_asynchronous_operations_with_expectations

## Develop SwiftUI Examples

### Realm + SwiftUI Quick Start

The `QuickStartSwiftUI` directory -- `QuickStartSwiftUI/QuickStart.swift` in
particular -- contains the code for the SwiftUI quick start. To run,
open the workspace in Xcode and select the "QuickStartSwiftUI" target.

The Sync implementation in the `QuickStartSwiftUI` app is Partition-Based Sync.
For the Flexible Sync version of this quick start, see the `SwiftUIFlexSyncExample`.
To run, open the workspace in Xcode and select the "SwiftUIFlexSyncExample" target.

> ⚠️ Note: you will need an iOS 14.0+ simulator or device to run this target.

### SwiftUI View Examples

The `SwiftUICatalog` directory contains the test app SwiftUI View examples
for all of the SwiftUI documentation beyond the quick start. 

#### Create a New Topic File

Take a look at the topic-based View collections in the `SwiftUICatalog/Views` 
directory. If your new example does not fit well into one of the existing 
topic pages, add a new Swift file for your topic.

In the Xcode menu, select File > New... > File... (or press `⌘N`). Select 
"Swift File" from the template menu and click "Next".

In the file selector window, navigate to the `SwiftUICatalog/Views` directory.

- Enter a descriptive topic name.
- Ensure "Group" is set to "Views"
- Under "Targets", select "SwiftUICatalog" and "SwiftUICatalogUITests"

Click "Create" to create the file.

After adding the file, select the `Views` directory in the project navigator.
Right-click and select `Sort by Name`. This keeps the topics in alphabetical
order for ease of organization.

#### Add a View Example

Find the relevant topic for the section or category you wish to write
an example for.

Add a SwiftUI View that illustrates the example. For the SwiftUI docs, 
the Views *are* the examples, so these View files are where you should add
Bluehawk markup and explanatory comments for the docs. The test code 
is separate from the Views, although you may still use Bluehawk `remove` to 
hide setup details.

When naming SwiftUI Views, consider potential naming collisions with other 
views. Some existing examples have names that would be reasonable for a 
production SwiftUI app, such as: "DogListView" or "DogDetailsView." Others 
have names that are specific to the concept that they illustrate, such as 
"OpenFlexibleSyncRealmView." 

As a general guide, use realistic-sounding names if showing an example that 
could come from the theoretical "DoggoDB" app used in the docs. If the example
shows general realm operations and does not have any code that fits with 
the "DoggoDB" example, such as authenticating or opening a realm, use a 
name that illustrates the realm functionality that the view encompasses.

You may need to add supplemental Views to test that the example works
as expected. For example, the "Pass Objects to View" examples go through 
a few views to illustrate the concept of passing objects between views, and
has tests to verify that the objects move through the views as we claim.

#### Create a Mapping for the UI Test

The `SwiftUICatalog` test app uses a `viewBuilder` that maps a string you 
specify in the UI test to a specific View in the `Views` directory. When 
you launch the app in the UI test, this mapping tells the test app which
SwiftUI View to use when running the test.

For example, the `testPassRealmObjects()` UI test refers to its starting view
with the string "PassRealmObjects" which we pass to the environment value
"MyCustomViewName". The `viewBuilder` maps this string to the `SetUpDogsView()`
with this line:

```swift
"PassRealmObjects": { AnyView(SetUpDogsView()) },
```

When you add new SwiftUI Views that you want to test, add a line to the
`static let viewBuilders` mapping to specify the View that your test will
use when it runs the app. You can also pass setup details, such as these examples: 

Pass in a Flexible Sync app instance:

```swift
"FSContentView": { AnyView(FlexibleSyncContentView(flexibleSyncApp: flexibleSyncApp!))},
```

Pass a realm populated with test data as an environment object:

```swift
"FilterTypeSafeQuery": { AnyView(FilterDogsViewTypeSafeQuery().environment(\.realm, SwiftUI_Dog.previewRealmJustDogs)) },
```

Pass in a specific test object:

```swift
"DogDetails": { AnyView(DogDetailView(dog: SwiftUI_Dog.dog1)) },
```

#### Add UI Tests

After adding new Views, add corresponding UI tests to verify that the views
function as claimed. The goal is not necessarily to test all edge cases,
but just to confirm in broad strokes that the docs details are correct.

To add a UI test, go to the `SwiftUICatalogUITests` directory. Currently,
there is just one file that encompasses all of the tests. Add a test method
to the `XCTestCase` which can be named anything starting with `test...`. 
For example, if the example shows how to filter an ObservedResults set with
the Type-Safe Query API, call the test function `testFilterTypeSafeQuery`.

Within the test file, you need to instantiate an instance of `XCUIApplication()`,
and configure the custom view details to use when launching the app. This looks
like these lines:

```swift
let app = XCUIApplication()
app.launchEnvironment["MyUITestsCustomView"] = "true"
app.launchEnvironment["MyCustomViewName"] = "FilterTypeSafeQuery"
app.launch()
```

When you set the `MyUITestsCustomView` launchEnvironment parameter to `true`, 
this launches the SwiftUICatalog test app using the view mapping that 
you specify in the `MyCustomViewName` parameter. This string should use
the mapping you created in "Create a Mapping for the UI Test" above.

Use XCTAssert and related methods to confirm that test data behaves as we
describe in the View code and corresponding docs. Unlike the Unit Tests,
the code here is not part of the example, so there is no need to add comments
or Bluehawk markup to these tests.

Each test function launches a new instance of XCUIApplication, so no state 
should persist between tests unless the test uses the backend.

## Code to Docs Pipeline

### Annotate for Bluehawk

Code examples are extracted using
[Bluehawk](https://github.com/MongoCaleb/bluehawk). In the source files, you can annotate code like so:

```swift
// :snippet-start: [id]
... some code for the code example ...

// :remove-start:
some code that should not be in the code example
// :remove-end:

... some more code for the code example ...
// :snippet-end:
```

where _id_ is the name of the resulting code example when you run Bluehawk.

### Extract Unit Tests to Literalincludes

This project uses [Bluehawk](https://github.com/mongodb-university/Bluehawk).
To extract the code examples for the Unit Tests, run:

```bash
bluehawk snip Examples/ManageEmailPasswordUsers.swift -o ../../source/examples/generated
```

to output the example blocks to the `source/examples/generated/` directory. Run this on all of the files in `Examples/`.

Bluehawk currently generates a lot of files, but we care about those in `/source/examples/generated/code/start/`:

```
ManageEmailPasswordUsers.snippet.reset-password.swift
ManageEmailPasswordUsers.snippet.confirm-new-user-email.swift
ManageEmailPasswordUsers.snippet.register-email.swift
```

These files correspond to the `:snippet-start:` commands in `Examples/ManageEmailPasswordUsers.swift`.

#### Include in Docs Source

Now you can update `source/ios/manage-email-password-users.txt` to use these code examples:

```rst
Register a New User Account
---------------------------

.. tabs-realm-languages::

   .. tab::
      :tabid: swift

      .. literalinclude:: /examples/generated/code/start/ManageEmailPasswordUsers.snippet.register-email.swift
         :language: swift

   .. tab::
      :tabid: objective-c

      .. literalinclude:: /examples/generated/code/start/ManageEmailPasswordUsers.snippet.register-email-objc.m
         :language: objective-c

...
```

Behold! You have pasted your unit tested code examples directly into the docs.
Rejoice!

### Extract SwiftUI View Examples to Literalincludes

This project uses [Bluehawk](https://github.com/mongodb-university/Bluehawk).
To extract the code examples for the SwiftUI Views, run:

```bash
bluehawk snip -o source/examples/generated/swiftui/ examples/ios/SwiftUICatalog
```

to output the example blocks to the `source/examples/generated/swiftui` directory. Run this on all of the files in `SwiftUICatalog/`.

You should see new and updated files similar to:

```
FilterData.snippet.nspredicate-filter.swift
FilterData.snippet.searchable.swift
FilterData.snippet.type-safe-query-filter.swift
```

These files correspond to the `:snippet-start:` commands in `SwiftUICatalog/Views/FilterData.swift`.

#### Include in Docs Source

Now you can update `source/sdk/swift/swiftui/filter-data.txt` to use these code examples:

```rst
Filter with an NSPredicate
~~~~~~~~~~~~~~~~~~~~~~~~~~

To filter ``@ObservedResults`` using the :ref:`NSPredicate Query API 
<ios-nspredicate-query>`, pass an :apple:`NSPredicate 
<documentation/foundation/nspredicate>` as an argument to ``filter``:

.. literalinclude:: /examples/generated/swiftui/FilterData.snippet.nspredicate-filter.swift
   :language: swift
```

Behold! You have pasted your tested SwiftUI View examples directly into the docs.
Rejoice!

## Questions

Please direct questions or support requests to #docs-realm or
@developer-education-team on Slack.
