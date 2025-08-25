# August 9, 2024

## C++ SDK

- Sync Data/Manage Sync Subscriptions: Add a warning about the query size limit when using Device Sync.

## Node.js SDK

- Update some examples based on fixed tests

## Consolidation Project

- 4 PRs merged
  - Custom User Data page
  - Delete Page
  - Swift Filter Data page
  - Link User Identities page

## Other

- Throughout the SDK Docs: Update the "Flexible Sync RQL Requirements and Limitations" section to include the query size limit when using Device Sync.

## Internal

- Fixed failing tests in Node SDK test suite
- Added a new GitHub Action that generates staging links and inserts them into the PR description.

# August 2, 2024

## .NET SDK

- Create
  - New C# API descriptions for "Create an unmanaged copy of an object" and "Copy an object to another database" advising developers to use third-party libraries for this functionality.
- Fix typo of incorrect .NET SDK version

## React Native SDK

- Fix typo per reported feedback.

## Other

- Fix the jest node test (for v12) CI, so it fails when jest tests fail.
- Re-add path to Node v12 CI checks. Update RN CI checks to use same logic as Node. Clean up legacy node CI checks. Use `checkout@4` to remove warnings.

# July 26, 2024

## Flutter SDK

- Sync Device Data: Add information about converting a non-synced realm to a synced realm.

## .NET SDK

- Sync Data:
  - Suspend or Resume a Sync Session: Add additional context to the existing code snippet that demonstrates calling the `Start()` and `Stop()` methods.
  - Throughout the section: Update pages to reflect that converting to a Synced Realm is only supported in Partition Based Sync.

## Node.js SDK

- Model Data/Data Types/Counters: Fix typos on the Node.js SDK Counters page.

## Swift SDK

- Sync Data/Configure & Open a Synced Realm: Add information about converting a non-synced realm to a synced realm.

# July 19, 2024

## Flutter SDK

- Realm Database/Serialization: Add new page for serialization of objects to and from EJSON.

## Node.js SDK

- Model Data/Data Types
  - Counters: Create page to document the addition of the `Counter` class and data type to the Node.js SDK and update the Table of Contents to reflect the addition.
  - Field Types: Add `counter` as a supported data type.

# July 12, 2024

## .NET SDK

- Sync Data/Check Upload & Download Progress: Updates to "Monitor Sync Progress" section for compatibility with Flexible Sync.

## React Native SDK

- Manage Users
  - Authenticate Users: Update information and code example for logging in with an API key.
  - Create & Manage User API Keys: Update information and code examples for creating, deleting, enabling, and disabling API keys from the client.

## Other

- SDK Landing Pages: Update illustrations for 2024 branding and compatibility with dark mode.

# June 28, 2024

## Flutter SDK

- Logging: Update content and code examples to use the newer Logger.
- Internal
  - Update Flutter SDK test suite to match latest `realm_dart` version.
  - Fix Flutter SDK tests and regenerate code snippets.

## Swift SDK

- Model Data/Define an Object Model: Correct the SDK version number specified for "Model Unstructured Data" section.
- Model Data/Supported Types: Correct the SDK version number specified for "RealmAny" section.

## Other

- Example Projects: Add Airbnb project to table as "Searchable Offline Collection".
- Throughout the SDK docs: Fixed "the the" typo and added meta data.

# June 21, 2024

## Kotlin SDK

- Realm/Model Data
  - Define an Object Model: Add new "Define Unstructured Data" section outlining support for Collections as Mixed feature.
  - Supported Data Types: Update "RealmAny" section to indicate support for holding lists and dictionaries. Add a new "Collections as Mixed" section with details about modeling unstructured or variable data.

## .NET SDK

- Model Data
  - Define an Object Model: Add new "Define Unstructured Data" section outlining support for Collections as Mixed feature.
  - Supported Data Types > RealmValue: Update page to indicate support for holding lists and dictionaries. Add a new "Collections as Mixed" section with details about modeling unstructured or variable data.

## Node.js SDK

- Model Data
  - Define an Object Model: Add new "Define Unstructured Data" section outlining support for Collections as Mixed feature.
  - Supported Data Types/Mixed: Update page to indicate support for holding lists and dictionaries. Add a new "Collections as Mixed" section with details about modeling unstructured or variable data.

## React Native SDK

- Model Data
  - Define an Object Model: Add new "Define Unstructured Data" section outlining support for Collections as Mixed feature.
  - Supported Data Types/Mixed: Update page to indicate support for holding lists and dictionaries. Add a new "Collections as Mixed" section with details about modeling unstructured or variable data.

## Swift SDK

- Model Data
  - Define an Object Model: Add new "Define Unstructured Data" section outlining support for Collections as Mixed feature.
  - Supported Types: Update "AnyRealmValue" section to indicate support for holding lists and dictionaries. Add a new "Collections as Mixed" section with details about modeling unstructured or variable data.

# June 14, 2024

## .NET SDK

- Compatibility: Add note with minimum framework requirements when using the new source model generator.

## React Native SDK

- Atlas App Services: Fix a monospace formatting typo for an instance of the word "App".

## Swift SDK

- Install: Remove outdated information. Rename "Static Framework" install instructions to "Dynamic Framework."

# June 7, 2024

## Kotlin SDK

- Realm/Read & Write Data/Read: Fix typo.

## Other

- Internal: Update Node version to 18.x for compatibility with Bluehawk.

# May 31, 2024

## Other

- Internal: Update test suite dependencies to resolve security vulnerability alerts.

# May 24, 2024

## Java SDK

- Throughout the SDK: Note that new App Services Apps cannot use `RealmAny` with the Java SDK due to an incompatible protocol version.

## .NET SDK

- Application Services/Connect to an App Services App: Add a section on updating the `baseURL` during runtime.

# May 17, 2024

## C++ SDK

- Landing Page: Add "Learning Paths" section with links to the C++ quick start, template app, and tutorial.

## Swift SDK

- SwiftUI/Handle Sync Errors: New page demonstrating how to set and use a sync error handler in SwiftUI.

## Other

- Example Projects: Add the C++ template app to the SDK template app list.
- Internal: Update test suite dependencies to resolve security vulnerability alerts.

# May 10, 2024

## C++ SDK

- Quick Start: Fix omitted `namespace` line in the object model.

## Flutter SDK

- Install: Add new "Apple Privacy Manifest" section with information on the manifest included with SDK v2.2.0.
- Realm Database/React to Changes: Update "Register Collection Change Listeners" section:
  - Document the `isCollectionDeleted` property for list, set, and map collections.
  - Document the `isCleared` property for map collections.
- Atlas App Services/Connect to App Services
  - New "Connect to a Specific Server" section with baseURL info.
  - New "Connect to a Different Server During Runtime" subsection with info about the experimental API.
- Sync Device Data/Manage Sync Session: Updates to "Monitor Sync Upload and Download Progress" section for compatibility with Flexible Sync.
- SDK Telemetry: Add new "Apple Privacy Manifest" section to clarify the SDK does not collect telemetry on builds for the App Store.

## Kotlin SDK

- Install: Update listed SDK version.
- Connect to Atlas/Connect to App Services
  - New "Connect to a Specific Server" section with baseUrl info.
  - New "Connect to a Different Server During Runtime" subsection with info about the experimental API.

## Node.js SDK

- App Services/Connect to an Atlas App Services Backend: Add new sections and examples for updating the baseUrl, including during runtime.

## React Native SDK

- App Services/Connect to an Atlas App Services App: Add new sections that address updating the baseUrl.

## Swift SDK

- Application Services/Connect to an App Services App
  - New "Connect to a Specific Server" section with baseURL info.
  - New "Connect to a Different Server During Runtime" subsection with info about the new experimental API.
- Sync Data/Manage Sync Sessions: Updates to "Upload and Download Progress Notifications" section for compatibility with Flexible Sync.

# May 3, 2024

## Swift SDK

- Install:
  - Update the Swift Package Manager and Privacy Manifest sections with information about building as a dynamic framework and linking only to one package.
  - Drop Xcode 14 support. Refactor minimum OS and Xcode requirements to remove duplicate information.
- Test and Debug: Add information about how to resolve an error related to linking to both `Realm` and `RealmSwift`.

# April 26, 2024

## Flutter SDK

- Atlas App Services/Query Atlas GraphQL API: Remove set up information for using the Atlas GraphQL API.

## React Native SDK

- Debugging with Flipper: Remove page, its TOC entry, and associated redirects.

# April 19, 2024

## Internal

- Flutter SDK: Remove the GraphQL Dart/Flutter test and package dependency.
- Web SDK: Update package dependencies.
- Domain updates: Add redirects for top-level docs pages from `/docs/realm/` to `/docs/atlas/device-sdks/`.
- Name update: Update name in sidebar from `Atlas Device SDK` to `Atlas Device SDKs`.

# April 12, 2024

## Internal

- Update dependencies in Web SDK test suite.

# April 5, 2024

## Java SDK

- Atlas App Services/Connect to an App Services App: Update to indicate that the `urlPrefix` is no longer cached in the AppConfiguration object.
- Troubleshooting: Document getting started with the Java SDK with custom Android ROMs.

## Kotlin SDK

- Connect to Atlas/Connect to App Services: Update to indicate that the `baseUrl` is no longer cached in the AppConfiguration object.
- Troubleshooting: Document getting started with the Kotlin SDK with custom Android ROMs.

## .NET SDK

- Application Services/Connect to an App Services App: Update to indicate that the `baseUri` is no longer cached in the AppConfiguration object.

## React Native SDK

- Throughout: Standardize "provider" capitalization to support translation needs.

# March 29, 2024

## Flutter SDK

- Install: Add note regarding the breaking change to how data model class files generate, and update "Prerequisites" section with updated version and platform requirements.
- Realm Database/Model Data:
  - Define a Realm Object Schema: Add note regarding the breaking change to how
    data model class files generate.
  - Data Types: Update code examples with `dynamic.getList()`, `dynamic.getSet()`, and `dynamic.getMap()` methods.
- Throughout Flutter docs: Update any `.g.dart` file extensions to the new `.realm.dart` extension.

## Internal

- Add the `:orphan:` directive to several flagged pages to prevent build errors.

# March 22, 2024

## C++ SDK

- Realm Files/Configure & Open a Realm: Fix truncated "Open a Realm at a File Path" code example.

## Flutter SDK

- Quick Start: Update the Flutter data models to be consistent with Dart version.
- Realm Database
  - Model Data
    - Define an Object Schema: Add a new "Modeled Unstructured Data" section with a tested, Bluehawked code example to document nested collections of mixed data.
    - Data Types: Update RealmValue section to document the new support for nested collections of mixed data and additional changes to the data type. Update or add tested, Bluehawked code examples.
  - CRUD/Read: Add new "Query Nested Collections of Mixed Data" section with a tested, Bluehawked code example to document new RQL queries for nested collections.
- Throughout Flutter docs: Update Bluehawked code snippets to use the new `.realm.dart` part file extension.

## Kotlin SDK

- Realm/Connect to Atlas/Connect to App Services: Add new "Enable Platform Networking" section with Bluehawked code example detailing the new feature.

## Swift SDK

- Install: Remove API info from the privacy manifest details and link out to the manifests themselves.
- Sync/Partition-Based Sync: Correctly display a Partition-Based Sync example of opening a realm instead of a Flexible Sync example.

# March 15, 2024

## Other

Throughout Device SDK docs:

- Add deprecation notices to pages with substantial GraphQL content.
- Remove high-level references to our GraphQL API to make the feature less discoverable.

## Internal

- Update dependencies in Web SDK test suite.

# March 8, 2024

## Node.js SDK

- Landing Page: Remove link to outdated Electron guide.
- Integration Guides: Remove outdated Integration Guides section from TOC until we have time to update the guides.

# March 1, 2024

## React Native SDK

- Model Data/Data Types/Dictionaries: Fix bullet list formatting.

## Other

- Realm Query Language: Update RQL reference with information on querying with full-text search.

# February 23, 2024

## Kotlin SDK

- Realm/Configure & Open a Realm: Fix a broken hyperlink.

# February 16, 2024

## Flutter SDK

- Realm Database/React to Changes: Add new "Register a User Instance Change Listener" section documenting how to listen for user changes with a tested, Bluehawked code example.
- Manage Users: Add "Listen for User Changes" section with link to React to Changes page.

## React Native SDK

- Bootstrap with Expo: Update shell commands and clarify how to get an Expo app working.

## Swift SDK

- Model Data/Supported Data Types: Add a section with information about persisting geospatial data types.
- CRUD
  - Read: New section with information and tested, Bluehawked code examples about querying geospatial data.
  - Filter: New sections for both query engines with information and tested, Bluehawked code examples about querying geospatial data.
- SwiftUI/Quick Start: Change bold code-related elements to monospace for the documentation translation project.

# February 9, 2024

## Flutter SDK

- Realm Database/CRUD/Read: Add information and tested, Bluehawked code examples detailing how to find linked objects using the new `getBacklinks()` method and how to find backlink objects using the RQL backlink query syntax.
- Atlas App Services/Connect to App Services: Note that, starting in v1.8.0, you can update the `baseUrl` in the `AppConfiguration` because the App client no longer caches it.

## Node.js SDK

- Atlas App Services/Connect to an App Services App: Note that, starting in v12.6.0, you can update the `baseUrl` in the `AppConfiguration` because the App client no longer caches it.

## React Native SDK

- Atlas App Services/Connect to an App Services App:
  - Note that, starting in v12.6.0, you can update the `baseUrl` in the `AppConfiguration` because the App client no longer caches it.
  - Update examples to use new auth hooks.
- API Reference/App Provider: Update `useApp` example to remove old auth pattern.

## Other

- Realm Query Language: Fix example comment on 'Dictionary Operators' section based on user feedback.

# February 2, 2024

## Flutter SDK

- Realm Database/Model Data/Data Types: Add new documentation for the `RealmMap` data type, which supports native Dart maps.
- Atlas App Services/Connect to App Services: Add new "Get App by ID" section with tested, Bluehawked code example that documents how to access an App instance on a background isolate.

## React Native SDK

- Model Data/Relationships & Embedded Objects: Typo fix.

# January 26, 2024

## C++ SDK

- CRUD/Threading: Fix a broken API reference link.

## Flutter SDK

- Quick Start: Move rules out of "Enable Device Sync" steps. Add more details about rules. Update to current rules structure.
- Realm Database
  - CRUD/Read: Fix a broken API reference link.
  - React to Changes: Add information on registering a change listener on a `RealmMap`.
- Manage Users/Get an Access Token: Fix a broken link to a Dart API reference document.

## Node.js SDK

- Sync Data/Set the Client Log Level: Correct the JS SDK version number for using the old syntax from 11.9.0 to 11.10.2.

## React Native SDK

- Sync Data/Set the Client Log Level: Correct the JS SDK version number for using the old syntax from 11.9.0 to 11.10.2.

## Swift SDK

- Install: New "Apple Privacy Manifest" section detailing what's covered in the SDK privacy manifest, additional disclosures that developers may need to make, and links out to the Apple documentation.
- Realm Files/Configure & Open a Realm: Note that as of 10.46.0, you can use in-memory realms with `syncConfiguration`.
- Sync Data/Configure & Open a Synced Realm: New "Open a Synced Realm In Memory" section with details and a tested, Bluehawked code example.
- SwiftUI/Quick Start: Move rules out of "Enable Device Sync" steps. Add more details about rules. Update to current rules structure.
- Application Services/Connect to an App Services App
  - Add a note that developers may need to make additional disclosures about data collection in the privacy manifest, and link to the new section on the Install page.
  - Note that starting in 10.46.0, you can change a `baseURL` and the App client no longer uses the cached value.
- SDK Telemetry: Note that the SDK's privacy manifest does not cover SDK telemetry, since builds submitted to the App Store do not collect analytics.

# January 12, 2024

## C++ SDK

Prepare docs for C++ GA release, including:

- Remove "Preview" from naming.
- Move Bluehawked, tested code examples out of the experimental namespace, and generate updated examples.
- Remove tabs for "Current" and "Deprecated" (Beta and Alpha) syntaxes.
- Remove `.. versionadded::` and `.. versionchanged::` directives to reset for GA release.
- Update API reference links.
- Update the Google authentication examples for updated naming in v0.6.0-preview.
- Add new documentation and Bluehawked code examples for new functionality and API changes in GA:
  - Quick Start
    - New section about closing a realm.
    - Remove sync session initialization and method call from the "Open a Synced Realm" example.
  - Realm Files
    - Configure & Open a Realm: New section about closing a realm.
    - Reduce Realm File Size: New page about compacting a realm.
  - Application Services/Call a Function: Update the example to remove BSON and use the new string-based API.
  - Manage Users
    - Authenticate Users: Update the Custom Function User example to remove BSON and use the new string-based API.
    - Custom User Data: Update examples that call a Function to create, update, and delete user data to remove BSON and use the new string-based API.
  - Sync Device Data
    - Manage Sync Sessions: Add new sync control methods.
    - Handle Sync Errors: New "Client Reset" section with info and code examples for client resets.

## Kotlin SDK

- Connect to Atlas/Connect to App Services: Document new session multiplexing and sync timeout configuration options with Bluehawked, tested code examples.
- Sync Device Data/Configure & Open a Synced Realm: Update "Configure a Synced Realm" section with information on the new sync timeout configuration options.

## React Native SDK

- Quick Start: Rewrite the Quick Start to use the latest `@realm/react` conventions and Realm.js v12 features.

## Swift SDK

- Internal: Update test suite versions.

## Web SDK

- Internal: Upgrade test suite dependencies and fix failing test.

## Other

- Throughout Docs
  - Update base URL (realm.mongodb.com) to new App Services base URL (services.cloud.mongodb.com).

# January 5, 2024

## Flutter SDK

- Sync Device Data/Manage Subscriptions: Document the new Subscribe API with tested, Bluehawked code examples.

## React Native SDK

- Model Data/Data Types/Dictionaries: Typo fix.
- Throughout: Fix highlighting in code examples.

# December 21, 2023

## C++ SDK

- CRUD/Threading: Add a "Pass Immutable Copies Across Threads" section with tested, Bluehawked code examples for freeze/thaw.

## Flutter SDK

- Realm Database
  - Model Data/Geospatial Data: New page with info and tested, Bluehawked code examples for persisting and querying geospatial data.
  - Read & Write Data: Break out the single page to a new CRUD section.
  - CRUD/Read
    - New "Convert Lists or Sets to Results" section with tested, Bluehawked code example demonstrating the functionality.
    - Full Text Search: New information and code example for using prefixes.
- Sync/Manage A Sync Session
  - Add documentation for `App.reconnect()`.
  - Add `cancellationToken` parameter to `Session.wait` methods.
- Internal/Code Example Unit Tests:
  - Update dependencies.
  - Fix failing code example tests related to SDK changes.

## Kotlin SDK

- Realm
  - Model Data/Geospatial Data: Add version change information describing support for geospatial data in Atlas Device Sync.
  - React to Changes: Add a new "Register a Key Path Change Listener" section with details and tested, Bluehawked code examples for key path filtering.
- Sync Device Data/Manage Subscriptions: Add version change information to Subscribe to Object Types subsection to note that you can create subscriptions to geospatial queries.

## .NET SDK

- Model Data/Supported Data Types/Geospatial Data: Add version change information describing support for geospatial data in Atlas Device Sync. Add important callout to clarify that you cannot currently persist geospatial data types with the SDK.
- Sync Data/Manage Flexible Sync Subscriptions: Add version change information to Manage Your Subscriptions section to note that you can create subscriptions to geospatial queries.

## Node.js SDK

- Model Data/Data Types/Geospatial Data:Add version change information describing support for geospatial data in Atlas Device Sync.
- Sync Data/Manage Flexible Sync Subscriptions: Add version change information to Subscribe to Queries section to note that you can create subscriptions to geospatial queries.

## React Native SDK

- Model Data/Data Types/Geospatial Data: Add version change information describing support for geospatial data in Atlas Device Sync.
- Sync Data/Manage Flexible Sync Subscriptions: Add version change information to Subscribe to Queries section to note that you can create subscriptions to geospatial queries.

## Swift SDK

- CRUD/Threading: Typo fix.
- Sync Data/Manage Sync Sessions: New "Wait for Changes to Upload or Download" section with Bluehawked, tested code examples.

## Other

- Example Projects Page: Update page title and description to reflect new Atlas Device SDK naming.

# December 15, 2023

## Kotlin SDK

- Internal: Update unit test suite for SDK v 1.13.0.

## .NET SDK

- Manage Users/Authenticate Users: Add information and example for new `User.Changed` method that observes user object changes.

## Node.js SDK

- Sync Data/Configure & Open a Synced Realm: Fix a small typo.

## React Native SDK

- Install: Document configuration for using Proguard with an Android app.

## Internal

- Throughout docs: Fix broken links.

# December 8, 2023

## Flutter SDK

- Realm Database/Model Data/Define a Realm Object Schema: Note that asymmetric objects support linking to Realm objects starting in v1.6.0.

## Kotlin SDK

- Realm/Model Data/Define an Object Model: Note that asymmetric objects support linking to Realm objects starting in v1.12.0.

## .NET SDK

- Manage Users/Manage Email/Password Users: Add an example for the new `App.EmailPassword.retryCustomConfirmation` method and the older, undocumented, `App.EmailPassword.ResendConfirmationEmailAsync` method.
- Sync Data/Stream Data to Atlas: Note that asymmetric objects support linking to Realm objects starting in v11.6.0.

## Node.js SDK

- Model Data/Define an Object Model: Note that asymmetric objects support linking to Realm objects starting in v12.2.1.

## React Native SDK

- Model Data/Define an Object Model: Note that asymmetric objects support linking to Realm objects starting in v12.2.1.

## Realm Studio

- Landing Page: Add a bullet listing the ability to connect, view, and modify data using Device Sync.
- View Data with Device Sync: New page describing how to use Realm Studio to test subscriptions and view Atlas data changes in real time with Device Sync.

# December 1, 2023

## C++ SDK

- CRUD
  - Read: Add a "Sort Lists and Query Results" section with tested, Bluehawked code examples for sorting in C++ SDK.
  - Filter Data: Remove the note about not yet supporting sort, and link to the sort example on the Read page.
- Application Services/Connect to an App Services App: Add a "Use an HTTP Proxy with Realm" section with details and Bluehawked code example.
- Sync Data/Write to a Synced Realm: New page similar to other SDKs with tested, Bluehawked code examples about sync subscriptions, permissions, and compensating writes.
- Throughout Docs for the SDK
  - Update App init examples to use realm::App(configuration).
  - Add version changed details to specify realm::App(...) deprecation in favor of realm::App(configuration) in v0.4.0-preview.

## Kotlin SDK

- Realm/Model Data
  - Model Data with Device Sync: Add new page with tested, Bluehawked code examples that describes how to map data from the Device Sync App Services schema to the Realm schema used by the Kotlin SDK.
  - Property Annotations: Update Primary Key section to note that Device Sync requires a primary key named `_id`.
- Sync Device Data/Add Sync to an App: Add note pointing users to the new Model Data with Device Sync page to learn more about mapping data between Atlas and the Kotlin SDK.

## React Native SDK

- Model Data/Data Types/UUID: Fix object model example that erroneously used BSON.ObjectId instead of BSON.UUID.
- Manage Users/Authenticate Users: Update page with new examples and copy for Custom JWT, Custom Function, Offline Login, Get a User Access Token, and Facebook, Google, and Apple Authentication.

## Swift SDK

- Landing Page: Add the "Integrating In-App Purchases" example app to the Example Projects cards.

## Other

- Example Projects: Add Intelligent Cache (.NET) and Integrating In-App Purchases (Swift) projects. Move Template Apps to top of table and edit header titles to "Source Code for Available SDKs".

# November 24, 2023

## Internal

- Update Readability workflow to use upstream `docdoctor` repo with new build syntax.
- Add `meta::description` to relevant pages to improve SEO for top 250 docs pages.
- Remove the `genre` tag from landing pages to improve docs search results.

# November 17, 2023

## Flutter SDK

- Landing Page: Add section for a selection of the SDK's example projects from the Example Projects page.
- Realm Database/Model Data/Manage Realm Files/Encrypt a Realm: Add note that you must encrypt a realm on first open, or use `writeCopy` to create an encrypted realm.

## Kotlin SDK

- Realm/Manage Realm Files/Encrypt a Realm: Add information on encryption for local and synced realms.
- Connect to Atlas/Connect to App Services: Add information on encryption for app metadata.
- Internal: Rename Kotlin Multiplatform Mobile (KMM) to Kotlin Multiplatform (KMP) in Kotlin template app `README.md`, as KMM is deprecated.

## .NET SDK

- Realm Files/Encrypt a Realm: Add note that you cannot encrypt an existing unencrypted realm.

## Node.js SDK

- Landing Page: Add section for a selection of the SDK's example projects from the Example Projects page.
- Realm Files/Encrypt a Realm: Add note that you can encrypt a realm the first time you open it or copy the unencrypted realm to a new encrypted realm.

## React Native SDK

- Landing Page: Add section for a selection of the SDK's example projects from the Example Projects page.
- Realm Files/Encrypt a Realm: Add note that you cannot encrypt an existing unencrypted realm.

## Swift SDK

- Realm Files/Encrypt a Realm: Add note that you cannot encrypt an existing unencrypted realm.
- CRUD/Threading: Recommend using `ThreadSafeReference` instead of frozen objects with Swift Actors.
- React to Changes: Clarify details on observing notifications across Swift Actors.
- Use Realm with Actors: Add more details about how to use Realm across actors based on docs feedback.
- Swift Concurrency: Add information on difference between methods for asynchronous writes (`writeAsync()` and `asyncwrite()`) and concurrency code that is not actor-isolated.

## Web SDK

- Landing Page: Add section for a selection of the SDK's example projects from the Example Projects page.

# November 10, 2023

## C++ SDK

- Realm Files/Encrypt a Realm: New page with tested, Bluehawked code examples for encrypting a realm, similar to other SDKs.
- App Services/Connect to App Services: New "Encrypt App Metadata" section with code example and details. Update custom HTTP section for deprecated `realm::App(...)`.

## Flutter SDK

- Landing Page: Add "Example Projects" section with relevant project links.

## Kotlin SDK

- Realm
  - Model Data/Supported Data Types: Add details about `RealmAny` converting Kotlin types internally to `int_64`. Add `RealmAny` aggregation and sort options.
  - Read & Write Data
    - Update: Add new examples and details for updating `RealmSet`, `RealmAny`, relationship properties, and inverse relationship properties.
    - Delete: Change "items" to "objects" or "elements" respectively to clarify wording.

## Node.js SDK

- Landing Page: Add "Example Projects" section with relevant project links.
- Realm Files/Encrypt a Realm: New "Encrypt App Services App Metadata" section with a link to the "Connect to App Services" page for details.
- App Services/Connect to App Services: New "Encrypt App Metadata" section with code examples and details.

## React Native SDK

- Landing Page: Add "Example Projects" section with relevant project links.
- Realm Files/Encrypt a Realm: New "Encrypt App Services App Metadata" section with a link to the "Connect to App Services" page for details.
- App Services/Connect to App Services: New "Encrypt App Metadata" section with code examples and details.

## Web SDK

- Landing Page: Add "Example Projects" section with relevant project links.

# November 3, 2023

## C++ SDK

- Model Data
  - Object Types and Schemas: Note that as of version v0.4.0-preview, asymmetric objects can link to non-embedded objects.
  - Supported Data Types: Add documentation for new set data type.
- CRUD
  - Create: New "Create an Object with a Set Property" section with info and tested, Bluehawked code example.
  - Read: New "Read a Set Property" section with info and tested, Bluehawked code example.
  - Update: New "Update a Set Property" section with info and tested, Bluehawked code example.
  - Delete: New "Delete Set Values" section with info and tested, Bluehawked code example.
- React to Changes: Note that collection notifications are provided for both set and map in addition to list.

## Java SDK

- Landing Page: Add note that the SDK no longer receives new development or non-critical bug fixes. Recommend Kotlin SDK, or using both SDKs together in a project.
- Install: Add note that the SDK no longer receives new development or non-critical bug fixes. Recommend Kotlin SDK, or using both SDKs together in a project.

## React Native SDK

- Update code examples throughout docs:
  - Change syntax for `useQuery()` when used with `.filtered()` and `.sorted()` to improve performance.
  - Remove unnecessary `onError` from configuration object.
- Internal: Fix an issue in the docs test suite.

## Swift SDK

- Sync Data/Manage Sync Sessions: Add documentation for `SyncSession.reconnect()`.

# October 20, 2023

## Kotlin SDK

- Landing Page: Add card for Offline Login project to Example Projects section.
- Realm/Read & Write Data/Delete: Update page with sections on embedded objects, RealmSet elements, RealmAny properties, and objects and their related objects. Update code examples.

## .NET SDK

- Model Data/Define an Object Model: Update Default Field Values section to note that you cannot set default values for collections.

## React Native SDK

- Install Realm: Clarify that the install instructions are geared towards developers working with a bare React Native app. Include links to "Bootstrap with Expo" page for install instructions for developers using Expo.
- Bootstrap with Expo: Add link to compatibility chart to determine which version of Expo is compatible with a React Native SDK version.
- Manage Users
  - Authenticate Users: Add new reference table for `useAuth` and update page with new information on authentication hooks.
  - Manage Email/Password Users: Update examples and content with new information on authentication hooks and add new reference table for `userEmailPasswordAuth`.
  - Link User Identities: Add new procedure with updated examples for authentication hooks.
- API Reference/@realm/react Package Reference: Add instructions for creating a new app with `@realm/react`.
- Internal: Update metro bundler dependencies to fix simulator runtime problems.

# October 13, 2023

## Node.js SDK

- Install Realm for Node.js: Fix incorrect syntax in Realm import example.

## Other

- Example Projects: Add ObjectAsAPI, Flexible Sync Playground, Connection State Change, and Offline Support and Realm Access projects.

# October 6, 2023

## C++ SDK

- Configure & Open a Realm: Update guidance for asymmetric sync for 0.3.0-preview to account for a breaking change.
- React to Changes: Note that changes in nested documents deeper than four levels down do not trigger change notifications, as well as workarounds.
- Sync Data/Stream Data to Atlas: Update guidance for asymmetric sync for 0.3.0-preview to account for a breaking change.

## Flutter SDK

- Realm Database/Model Data/React to Changes: Note that changes in nested documents deeper than four levels down do not trigger change notifications, as well as workarounds.
- Sync Device Data/Troubleshooting: Add information about enabling Apple Extended Virtual Addressing entitlement to resolve virtual memory issues.

## Java SDK

- React to Changes: Note that changes in nested documents deeper than four levels down do not trigger change notifications, as well as workarounds.

## Kotlin SDK

- Realm
  - Read & Write Data
    - Landing Page: Convert the landing page to a container page. Move content to relevant child pages.
    - Create: Update object models and add information on creating objects with the specific properties or relationships (dictionary property, inverse relationship, etc.).
  - React to Changes: Note that changes in nested documents deeper than four levels down do not trigger change notifications, as well as workarounds.
- Sync Device Data
  - Landing Page: Change to a container page.
  - Add Sync to an App: Add this new page to document adding sync to an app.
  - Troubleshooting: Add new page with information about enabling Apple Extended Virtual Addressing entitlement to resolve virtual memory issues.
- Throughout documentation for the SDK: Rename Kotlin Multiplatform Mobile (KMM) to Kotlin Multiplatform (KMP), as KMM is deprecated.

## .NET SDK

- Realm Files/Reduce Realm File Size: Fix manual compaction example so file will compact if less than 50% of file size is used.
- React to Changes: Note that changes in nested documents deeper than four levels down do not trigger change notifications, as well as workarounds.
- Troubleshooting: Add information about enabling Apple Extended Virtual Addressing entitlement to resolve virtual memory issues.

## Node.js SDK

- Realm Files/Reduce Realm File Size: Fix manual compaction example so file will compact if less than 50% of file size is used.
- React to Changes: Note that changes in nested documents deeper than four levels down do not trigger change notifications, as well as workarounds.
- Sync Data/Handle Sync Errors: Fix incorrect file paths for compensating write error examples.
- Throughout documentation for the SDK: Update object models in accordance with JSv12 standards.

## React Native SDK

- Realm Files/Reduce Realm File Size: Fix manual compaction example so file will compact if less than 50% of file size is used.
- Model Data/Relationships & Embedded Objects: Update inverse relationship examples for JSv12.
- React to Changes: Note that changes in nested documents deeper than four levels down do not trigger change notifications, as well as workarounds.
- Test & Debug/Troubleshooting: Add information about enabling Apple Extended Virtual Addressing entitlement to resolve virtual memory issues.
- Throughout documentation for the SDK: Update object models in accordance with JSv12 standards.
- Internal: Add React Native testing guidance for creating and testing code.

## Swift SDK

- Model Data/Define an Object Model: Note that asymmetric objects can now link to non-embedded types.
- React to Changes: Note that changes in nested documents deeper than four levels down do not trigger change notifications, as well as workarounds.
- Test & Debug: Add information about Apple Extended Virtual Addressing entitlement to resolve virtual memory issues.
- Logging: Clarify requirement to set a logger before initializing an App.
- Sync Data
  - Manage Flexible Sync Subscriptions: Document Flex Sync Subscribe API.
  - Stream Data to Atlas: Improve wording to direct users to information on defining an asymmetric object.

## Other

- Example Projects: Add Netflix-like Movie App project and Split Data into Multiple Realms core project.

# September 29, 2023

## Kotlin SDK

- Realm/Model Data

  - Define an Object Model: Wording improvements around embedded objects. Update code example.
  - Relationships: Wording improvements, code example updates, and link cleanup.
  - Supported Types: Add details about optional properties and default values.
  - Property Annotations: Wording improvements, code example updates, and link cleanup.

- Manage Users
  - Landing Page: Convert the landing page to a container page with no content. Move content onto relevant child pages.
  - Create & Authenticate Users: Move info on creating users onto the "Authenticate Users" page. Rename it to "Create and Authenticate Users."
  - Delete Users: Rename page from "Create and Delete Users" to "Delete Users." Move content about creating users off of page.
  - Manage Custom User Data: Rename title from "Custom User Data" to match verb-based page names. Minor rewrites.
  - Manage User Metadata: Rename title from "user Metadata" to match verb-based page names. Minor rewrites.
  - Manage Multi-User Apps: New page with tested, Bluehawked code examples describing how to manage multiple users on a device.

## .NET SDK

- Internal: Bump Nuget package version. Update unit test.

## Node.js SDK

- Model Data/Define a Realm Object Model: New "Set a Full-Text Search Index" section with tested, Bluehawked code example showing how to set a Full-Text Search index on a property.
- CRUD/Query Data: New "Filter with Full-Text Search" section with tested, Bluehawked code examples describing how to query with Full-Text Search.

## React Native SDK

- Sync Data/Handle Sync Errors: Add an example of handling a `CompensatingWriteError`.

## Other

- Add an App Services docs-wide banner with a link to the blog post announcing that "Realm is now Atlas Device SDK."
- Add manual facet tags with relevant keywords to improve docs search results.

# September 22, 2023

## Flutter SDK

- Realm Database/Model Data/Define a Realm Object Schema: Add new section for defining an asymmetric object.
- Sync Device Data/Stream Data to Atlas: Create new page with information on using Data Ingest with the Flutter SDK.

## Kotlin SDK

- Realm/Model Data
  - Landing Page: Unlist landing page and turn it into a container in the TOC.
  - Define an Object Model: Update code examples and move relevant content from landing page to this page.
- Sync Device Data/Manage Sync Session: Add details for `.reconnect()` method, which manually triggers an attempt to reconnect to Sync.
- Atlas App Services/Connect to App Services: Add information about custom HTTP headers and additional configuration details about `app.close()`.

## .NET SDK

- Sync Data/Manage Flexible Sync Subscriptions: Add information about the Flexible Sync `SubscribeAsync` API.

## Node.js SDK

- Sync Data/Handle Sync Errors: Add information for updates on handling compensating write errors.

## React Native SDK

- Sync Data/Manage Flexible Sync Subscriptions: Add documentation for new subscribe API and update code examples for v12.
- Model Data/Define an Object Model: Add documentation for setting a full-text search index.
- CRUD/Query Data: Add documentation for full-text search functionality on filtering.

## Other

- Realm Landing Page: Add link to Atlas App Services in introductory content and move the App Services card higher up on the page.
- Realm Example Projects: Add Vehicle Simulator and Controller, Analytics, and Smart Factory Interface projects.

# September 15, 2023

## C++ SDK

- Model Data/Supported Types: Add Decimal128 to supported types.
- Configure & Open a Realm
  - Remove verbiage about the open a realm overload not taking a `db::config`
  - Add a new "Provide a Subset of Classes to a Realm" section similar to Swift SDK docs.
  - Add a new "Set Custom HTTP Headers When Using a Synced Realm" section.
- Application Services/Connect to an App Services App: Add a new "Set Custom HTTP Headers" section.
- Manage Users/Authenticate Users: Add new `app::get_current_user()` and `user::is_logged_in()` methods.
- Sync Data/Stream Data to Atlas: Note that Device Sync manages the lifecycle of asymmetric objects on the device, and no cleanup is required.

## Kotlin SDK

- Realm Database
  - Configure & Open a Realm: Move relevant info from the former Manage Realm Files landing page. Update examples. Move the page out of "Manage Realm Files" to a top-level table of contents entry within Realm Database section.
  - Manage Realm Files
    - Landing Page: Convert landing page to container page that expands the table of contents but does not open to page content.
- Sync Device Data/Stream Data to Atlas: Note that Device Sync manages the lifecycle of asymmetric objects on the device, and no cleanup is required.

## .NET SDK

- Model Data
  - Relationships: Define `IList<T>` with only a getter; no need to initialize in a constructor. Update `Task` model to `Item`.
  - Supported Data Types/Embedded Objects: Embedded objects should implement the `IEmbeddedObject` interface, not derive from `EmbeddedObject` class.
- CRUD
  - Create: Delete text that had been moved into an `include` and was showing twice on the page.
  - Read: Streamline page copy.
  - Filter: Rename page from "Query, Filter, and Sort Data" to "Filter and Sort Data."
- Sync Data/Stream Data to Atlas: Note that Device Sync manages the lifecycle of asymmetric objects on the device, and no cleanup is required.

## Node.js SDK

- Sync Data
  - Handle Sync Errors: Add a new "Handle Compensating Write Errors" section.
  - Stream Data to Atlas: Note that Device Sync manages the lifecycle of asymmetric objects on the device, and no cleanup is required.

## React Native SDK

- Sync Data/Stream Data to Atlas: Note that Device Sync manages the lifecycle of asymmetric objects on the device, and no cleanup is required.

## Swift SDK

- Sync Data/Stream Data to Atlas: Note that Device Sync manages the lifecycle of asymmetric objects on the device, and no cleanup is required.

## Other

- Realm Studio/Install Realm Studio: Add links to SDK release notes to simplify finding the appropriate version of Realm Studio. Remove and update outdated copy.
- Realm Example Projects: Update links to examples. Add Flutter examples. Add user online state example. Add section descriptions.

# September 8, 2023

## Flutter SDK

- Sync Device Data/Manage Subscriptions: Add a section for indexed queryable fields subscription requirements.

## Java SDK

- Sync Device Data/Manage Flexible Sync Subscriptions: Add a section for indexed queryable fields subscription requirements.

## Kotlin SDK

- Realm
  - Read & Write Data/Read: Update Full-Text Search documentation to include support for prefix searches.
  - Model Data/Property Annotations: Update Full-Text Search documentation to include support for prefix searches.
- Sync Device Data/ Manage Subscriptions: Add a section for indexed queryable fields subscription requirements.

## .NET SDK

- Sync Data/Manage Flexible Sync Subscriptions: Add a section for indexed queryable fields subscription requirements.

## Node.js SDK

- Model Data/Relationships & Embedded Objects: Update relationship model examples throughout page for JavaScript v12.
- Sync Data/Manage Flexible Sync Subscriptions: Add a section for indexed queryable fields subscription requirements.
- Many pages throughout the SDK: Update the API reference links for the new JavaScript v12 API reference structure.

## React Native

- Model Data/Define an Object Model: Fix incorrect optional properties examples to include both the `optional` and `?` syntax for marking a property as optional.
- Sync Data
  - Manage Flexible Sync Subscriptions: Add a section for indexed queryable fields subscription requirements.
  - Set the Client Log Level: Note that this is deprecated in v12 in favor of setting the Realm log level.
- Logging: Add new page about setting the Realm log level, which replaces the deprecated Sync client log level.

## Swift SDK

- Sync Data/Manage Flexible Sync Subscriptions: Add a section for indexed queryable fields subscription requirements.

## Web SDK

- Landing Page: Correct copy on page regarding support of Sync for the SDK.

## Other

- Internal: Add programmatically-generated facet tags to the repo for improved search indexing.

# September 1, 2023

## Flutter SDK

- Realm Database/Read & Write Data: Add a new filter example with an iterable argument.

## Kotlin SDK

- Realm
  - Model Data
    - Define an Object Model: Differentiate between property types and property annotations. Add examples moved out from data types section.
    - Data Types: Rewrite page with more complete coverage of supported data types. Add tested data type cheatsheets.
  - CRUD
    - Create: Correct `RealmMap` type name to `RealmDictionary`.
    - Update: Add a note about how to update Strings or Byte arrays.

## .NET SDK

- Model Data/Data Types/Geospatial: Note that Flexible Sync does not support geospatial queries.

## Node.js SDK

- Model Data/Data Types/Geospatial: Note that Flexible Sync does not support geospatial queries.
- Logging: New page with tested, Bluehawked code examples for the Realm logger API.
- Atlas App Services/Connect to an App Services App: Add a example showing configuring a `timeout` related to the new `cancelWaitsOnNonFatalErrors` Sync configuration setting.
- Sync Data
  - Configure & Open a Synced Realm: Add info for the new `cancelWaitsOnNonFatalErrors` Sync configuration setting.
  - Manage Flexible Sync Subscriptions: Document the new `.subscribe()` API, with tested, Bluehawked code examples.
  - Manage a Sync Session: Add info about waiting for uploads and downloads.
  - Set the Client Log Level: Warn that Sync.setLogLevel() is deprecated in Realm JS SDK v12.
- Many pages throughout the SDK: Update the API reference links for the new v12 API reference structure.

## React Native SDK

- Model Data/Data Types/Geospatial: Add new page on Geospatial Data Types with tested, Bluehawked examples.

## Swift SDK

- Install: Add visionOS to the list of supported operating systems.
- Application Services/Query MongoDB: Remove Partition-Based Sync from examples, update tests, add collapsible code blocks for example output.

## Other

- Realm Example Projects: Add new examples and reorganize tables.

# August 25, 2023

## C++ SDK

- Throughout the C++ docs, rename the "Experimental" tab to "Current" and the "Current" tab to "Deprecated" for code examples. Present the "Current" code examples first.

## Flutter SDK

- Model Data
  - Define a Realm Object Schema: Document mapping a property or class to a different name.
  - Property Annotations: Document mapping a property or class to a different name.

## Kotlin SDK

- Realm
  - Model Data
    - Define an Object Model: Move relevant `RealmSet` content from the Data Types page to this page.
    - Data Types: Remove `RealmSet` content from page to move content to relevant CRUD pages.
  - Read & Write Data
    - Create: Move content about creating a `RealmSet` from the Data Types page to this page.
    - Read: Move content about reading a `RealmSet` from the Data Types page to this page.
    - Update: Move content about updating a `RealmSet` from the Data Types page to this page.
    - Delete: Move content about deleting a `RealmSet` from the Data Types page to this page.
- Internal: Remove instances of the `:kotlin-sdk:` role and replace with a source constant in preparation for the newly defined kotlin roles.

## .NET SDK

- Landing Page: Add a section for .NET Device Sync example projects.

## Node.js SDK

- Quick Start: Correct an `ObjectID` link to link to the Field Types page.
- Model Data
  - Define an Object Model: Document mapping a property or class to a different name.
- Data Types/Geospatial Data: Document new geospatial data types for the SDK.

## Other

- Realm Example Projects: Update page with more Device Sync example projects.

# August 18, 2023

## C++ SDK

- Model Data/Supported Types: Add a link to the App Services documentation that shows how Realm models map to App Services schemas.
- Manage Users
  - Landing Page: Add a "User Sessions" section about how the SDKs manage access and refresh tokens for requests.
  - Authenticate Users: Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.

## Flutter SDK

- Realm Database/Model Data/Data Types: Add a link to the App Services documentation that shows how Realm models map to App Services schemas.
- Manage Users
  - Landing Page: Update the "User Object" section with details about how the SDKs manage access and refresh tokens for requests.
  - Authenticate Users: Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.
  - Get an Access Token: Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.

## Kotlin SDK

- Realm
  - Model Data/Supported Types
    - Add `RealmAny` to the list of supported types.
    - Add a link to the App Services documentation that shows how Realm models map to App Services schemas.
  - Read & Write Data Landing Page: Add a new "Managed vs. Unmanaged Objects" section with details about what these terms mean when we refer to them in the Realm API reference docs.
- Manage Users
  - Landing Page
    - Add information about reading user metadata, with a link to the new User Metadata page.
    - Add a "User Sessions" section about how the SDKs manage access and refresh tokens for requests.
  - Create and Delete Users: Update the page name from "Delete Users" and add details with code examples about creating, removing, and deleting users.
  - Authenticate Users
    - Add an "Offline Login" section.
    - Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.
    - Note that logging out an anonymous user removes the user from the device.
    - Update the `logOut()` code example to be consistent with the `delete()` and `remove()` users code examples.
  - User Metadata: New page about reading, configuring, and updating user metadata.

## .NET SDK

- Model Data/Supported Data Types/Field Types: Add a link to the App Services documentation that shows how Realm models map to App Services schemas.
- Manage Users
  - Landing Page: Add a "User Sessions" section about how the SDKs manage access and refresh tokens for requests.
  - Authenticate Users: Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.

## Node.js SDK

- Model Data/Data Types/Field Types: Add a link to the App Services documentation that shows how Realm models map to App Services schemas.
- Manage Users
  - Landing Page: Add a "User Sessions" section about how the SDKs manage access and refresh tokens for requests.
  - Authenticate Users: Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.

## React Native SDK

- Model Data/Data Types/Property Types: Add a link to the App Services documentation that shows how Realm models map to App Services schemas.
- Manage Users
  - Landing Page: Add a "User Sessions" section about how the SDKs manage access and refresh tokens for requests.
  - Authenticate Users: Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.
- Update relevant JS SDK API reference links throughout the docs to point to the `@realm/react` API reference documentation.
- Internal: Set up the v12 testing suite for docs code examples, move the v11 and older test suite to a `legacy` directory.

## Swift SDK

- Landing Page: Add a card for the "Offline Login and Realm Access" example app to the "Example Projects" section of the landing page.
- Model Data/Supported Types
  - Update the "Property Cheat Sheet" tables for Swift and Objective-C to use tested, Bluehawked code examples, add entries for missing property types.
  - Add a link to the App Services documentation that shows how Realm models map to App Services schemas.
- SwiftUI/Write Data: Clarify details about adding and removing objects in an `@ObservedResults` collection.
- Manage Users
  - Landing Page: Add a "User Sessions" section about how the SDKs manage access and refresh tokens for requests.
  - Authenticate Users: Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.
- Sync Data/Manage Sync Sessions: Consolidate the "Check the Network Connection" info from its own page onto this rollup page about managing Sync Sessions.

## Web SDK

- User Management
  - Landing Page: Add a "User Sessions" section about how the SDKs manage access and refresh tokens for requests.
  - Authenticate Users: Add a "Refresh Token Expiration" section with details about refresh token expiry, with a link to App Services docs to configure refresh token expiration.

## Other

- Realm Example Projects: New page with a table showing the curated Device Sync example apps.
- Fix links across docs that were incorrectly pointing to the wrong SDK.
- Remove "Key Concepts" from headers throughout docs.

# August 11, 2023

## C++ SDK

- Install Realm: Note minimum version for experimental namespace, which requires C++ SDK v0.2.0-preview or newer
- Quick Start: Note minimum version for experimental namespace, which requires C++ SDK v0.2.0-preview or newer
- Model Data/ Object Types and Schemas: Note minimum version for experimental namespace, which requires C++ SDK v0.2.0-preview or newer
- Model Data/ Supported Data Types: Add new "Collections Types" section to page

## Kotlin SDK

- Landing Page: Add project cards for the Property-Level Encryption, User's Online State, and Connection State Change & Error Handling example projects to the landing page
- Install Realm: Remove duplicate subheadings in tabbed procedure of install page
- Sync Device Data/ Sync Data in the Background: Add new page with information on syncing data in a background process

## React Native SDK

- CRUD/ Create: Update page examples with correct variables and create examples for different types of relationships

## Swift SDK

- SwiftUI/ Actor-Isolated Realms: Add clarification on when to use an actor-isolated realm and `@MainActor` functions

# August 4, 2023

## C++ SDK

- Update headings and heading levels throughout docs to be consistent with other SDKs

## Java SDK

- Sync Data
  - Landing Page: Remove Partition-Based Sync information
  - Configure & Open a Synced Realm: Remove Partition-Based Sync info and open a synced realm code examples, add Flexible Sync examples for opening a synced realm
  - Partition-Based Sync: New page containing info moved from the Sync landing page, content and examples for opening a synced realm, and a new section about updating client code after migrating from Partition-Based Sync to Flexible Sync

## Kotlin SDK

- Install Realm: Update page structure to remove duplicate headings in tabbed procedure
- Realm
  - Model Data
    - Relationships
      - Note that to-many relationship properties cannot be null and must be initialized with `realmListOf()`
      - Remove embedded object content
    - Define an Object Model: Move example of defining an embedded object onto this page
  - CRUD
    - Create: Move the example of creating an embedded object onto this page
    - Read: Move the example of querying an embedded object onto this page
    - Update: Move the example of updating an embedded object onto this page
    - Delete: Move the example of deleting an embedded object onto this page
- Sync Device Data
  - Manage Sync Session: New page with tested Bluehawked code examples for waiting for upload and download, pausing and resuming a sync session, checking connection state
  - Partition-Based Sync: New section with tested Bluehawked code examples for upload and download progress change listeners

## .NET SDK

- Sync Data
  - Landing Page: Remove Partition-Based Sync information
  - Configure & Open a Synced Realm: Remove Partition-Based Sync info and examples, update the "Synchronous Reads & Writes on the UI Thread" section to show Flexible Sync examples
  - Partition-Based Sync: New page containing info moved from the Sync landing page, content for opening a synced realm, and a new section about updating client code after migrating from Partition-Based Sync to Flexible Sync

## React Native SDK

- Update deprecated reactjs.org links throughout docs to use new react.dev links

## Swift SDK

- Landing Page: Add a new "Example Projects" section with the first two Device Sync curated examples

# July 28, 2023

## C++ SDK

- Install Realm: Add Windows install requirements

## Kotlin SDK

- Realm/Model Data/Define an Object Model: New "Unsupported Kotlin Language Features" section with info about Kotlin SDK limitations around Data Classes, Inheritance, and using a single primary constructor
- Sync Device Data
  - Landing page: Remove Partition-Based Sync content, link out to new Partition-Based Sync page
  - Open a Synced Realm
    - Add a link to the "Manage Sync Subscriptions" page
    - Remove Partition-Based-Sync-only examples
  - Manage Subscriptions: Major rewrites for the new `.subscribe()` API, including new tested Bluehawked code examples
  - Write Data to a Synced Realm: Move the section about grouping writes to improve Sync performance from the landing page to this more relevant page
  - Set the Client Log Level
    - Typo fix
    - Note this as deprecated in v1.8.0 and newer as it is superseded by the global `RealmLog` singleton
  - Partition-Based Sync: New page with moved info from the Sync landing page, moved Configure/Open content, a section about updating client code after migrating from Partition-Based Sync to Flexible Sync
- Logging: New page breaking out the v1.8.0 logging info from the Sync/Set the Client Log Level page

## .NET SDK

- Stream Data to Atlas: Update code example to use `IAsymmetricObject`

## Node.js SDK

- Sync Data
  - Landing Page: Remove Partition-Based Sync info, add tip recommending Flexible Sync and linking out to Partition-Based Sync page for older apps
  - Partition-Based Sync: Moved info from the Sync landing page, add a section about updating client code after migrating from Partition-Based Sync to Flexible Sync
- Minor updates to the Node.js docs code example test suite for v12

## React Native SDK

- Model Data/Define an Object Model: New "Define an Asymmetric Object" section with a tested Bluehawked code example for defining an asymmetric object
- CRUD/Read: Parameterize RQL queries
- Sync Data
  - Landing Page: Remove Partition-Based Sync info, add tip recommending Flexible Sync and linking out to Partition-Based Sync page for older apps
  - Partition-Based Sync: Moved info from the Sync landing page, add a section about updating client code after migrating from Partition-Based Sync to Flexible Sync
  - Stream Data to Atlas: Expand the page from a code example to a procedure similar to other SDKs

## Swift SDK

- Application Services/Connect to an App Services App: Add sections with Bluehawked code examples for "Sync Connection Sharing" and "Sync Timeout Options"
- Sync Data
  - Landing page: New "Sync Connection and Timeout Behaviors" section with link to App Services/Connect details for configuring these settings
  - Manage Sync Sessions: New "Sync Connection Behavior" section with link to App Services/Connect details for Sync Connection Sharing
  - Stream Data to Atlas: Clarify details about local realm incompatibility with `AsymmetricObject`

## Internal

- Add a GitHub Action to check for broken links in the docs
- Add a GitHub Action to check for broken redirects
- Fix broken links caught by the link checker GitHub Action

# July 21, 2023

## Flutter SDK

- Realm Database/Model Data/Relationships: Update `graphql` dependency and clarify how backlinks work with unmanaged objects
- Realm Database/Manage Realm Files/Encrypt a Realm: Note that the Flutter SDK supports multi-process encrypted realm access

## Java SDK

- Realm Files/Encrypt a Realm: Note that the Java SDK supports multi-process encrypted realm access

## Kotlin SDK

- Realm/Read & Write Data/Read: Parametrize RQL queries
- Sync Device Data/Write to a Synced Realm: Add information on how to write data to a synced realm and on `compensatingWriteError`
- Internal: Update prefix URLs for `kotlin-sync-prefix` and `kotlin-local-prefix`

## .NET SDK

- Add that the .NET SDK is compatible with Avalonia on the following pages:
- Landing Page
- Install Realm
- Model Data/Data Binding

## Node.js SDK

- CRUD/Read: Parametrize RQL queries
- CRUD/ Query Data: Parametrize RQL queries
- Internal: Fix Node.js bluehawking script for the updated test suite

# React Native SDK

- Remove angle brackets from provider references throughout the SDK pages to prevent confusion with placeholder variables

## Swift SDK

- For the following pages, add section on supported operating systems, to highlight that the Swift SDK does not support connecting to an App Services App from watchOS:
  - Application Services
  - Application Services/Connect to an App Services App
  - Sync Data
- SwiftUI/Model Data/Configure and Open a Realm: Add tip for automatically migrating from Partition-Based Sync to Flexible Sync
- SwiftUI/Model Data/Pass Realm Data Between Views: Add tip for automatically migrating from Partition-Based Sync to Flexible Sync
- Sync Data: Remove Partition-Based Sync (PBS) content, link out to new PBS page
- Sync Data/Partition-Based Sync: New page with Configure/Open content, Progress Notifications (which only work on PBS), and migration information
- Sync Data/Configure & Open a Synced Realm: Remove PBS-only examples
- Sync Data/Write to a Synced Realm: Moved "Group Writes" information from "Sync Data between Devices" page to this page
- Remove "Legacy Realm Open" page

# July 14, 2023

## C++ SDK

- Model Data/Supported Data Types/Map: Note that Realm disallows the use of `.` or `$` in map keys, add example showing percent encoding as a workaround
- CRUD/Create/Create an Object with a Map Property: Note that Realm disallows the use of `.` or `$` in map keys, add example showing percent encoding as a workaround

## Flutter SDK

- Install Realm: Bump the minimum Flutter requirement from 3.0.3 to 3.10.2, minimum Dart version from 2.17.5 to 3.0.2
- Internal: Update environment dependencies in test suite

## Kotlin SDK

- Realm
  - Model Data/Data Types/RealmDictionary/RealmMap: Note that Realm disallows the use of `.` or `$` in map keys, add example showing percent encoding as a workaround
  - Read & Write Data/Create/Create an Object with a Dictionary Property: Note that Realm disallows the use of `.` or `$` in map keys, add example showing percent encoding as a workaround

## .NET SDK

- Model Data/Supported Data Types/Dictionaries: Note that Realm disallows the use of `.` or `$` in map keys

## Node.js SDK

- Model Data/Data Types/Dictionaries: Note that Realm disallows the use of `.` or `$` in map keys, add example showing percent encoding as a workaround
- Internal: Move the existing Node.js test suite to a `legacy` directory, prepare a new test suite for v12

## React Native SDK

- Model Data/Data Types/Dictionaries: Note that Realm disallows the use of `.` or `$` in map keys, add example showing percent encoding as a workaround

## Swift SDK

- Model Data/Supported Data Types/Map/Dictionary: Note that Realm disallows the use of `.` or `$` in map keys, add example showing percent encoding as a workaround
- CRUD/Create/Create an Object with a Map Property: Note that Realm disallows the use of `.` or `$` in map keys, add example showing percent encoding as a workaround
- SwiftUI/Configure & Open a Realm: Fix an `@AutoOpen` example that should have been `@AsyncOpen` to match page copy

## Web SDK

- API Reference: Typo fix

## Other

- Realm Query Language: Correction: When using `SORT`, order is required, not optional

# July 3, 2023

## .NET SDK

- Quick Start: Update code examples to use a consistent `Item` object model
- CRUD
  - Create Data: Update code examples to use a consistent `Item` object model
  - Query, Filter, and Sort Data: Parameterize RQL code examples

# June 30, 2023

## Flutter SDK

- Realm Database/Model Data/Data Types: Add new binary data type to the Flutter docs and upgrade Realm Dart testing environment for the docs
- Sync Device Data/Handle Sync Errors: Expose Compensating Write error details and update relevant code examples

## .NET SDK

- Model Data/Supported Data Types/Geospatial Data: Add new page on Geospatial Data Types with examples

## Node.js SDK

- Realm Files/Open & Close a Realm: Move HTTP proxy info onto a docs page, as it will be removed from the main branch of the Realm.js repo
- Sync Data/Partition-Based Sync: Create new page dedicated to PBS content
- Update sync content on the following pages:
  - Realm Files/Bundle a Realm
  - Realm Files/Open & Close a Realm
  - Sync Data
  - Sync Data/Configure & Open a Synced Realm

## Web SDK

- Atlas Device Sync (Preview): Add getting started content for Realm Web and Atlas Device Sync

# June 23, 2023

## C++ SDK

- Update documentation for C++ SDK Preview, including:
  - Change Alpha naming to Preview
  - Add new `realm::experimental` code examples to:
    - Quick Start
    - Model Data pages
    - Configure and Open a Realm
    - CRUD pages
    - React to Changes
    - Sync/Stream Data to Atlas
  - Remove `.get_future()` from code examples showing APIs that now return `std::future` instead of `std::promise`:
    - App Services/Call a Function
    - Manage Users
    - Sync Data
    - Quick Start/Add Device Sync
  - Add inverse relationships:
    - Model Data/Relationships
    - CRUD/Create, Update, and Delete

## Other

- Fix broken links across 14 pages

# June 16, 2023

## Kotlin SDK

- Realm
  - Model Data/Property Annotations: Add a "Full-Text Search Indexes" section with info and tested, Bluehawked code example
  - Read & Write Data/Read: Add a "Filter with Full-Text Search" section with info and tested, Bluehawked code example

## .NET SDK

- Remove the `[Required]` attribute in code examples throughout docs, minor wording improvements for clarity throughout examples

## Node.js SDK

- Quick Start: Typo fix

## Swift SDK

- Install Realm: Add Xcode 15 compatibility information, provide more info about Swift concurrency support

## Other

- Realm Query Language: Replace queries with parameterized queries throughout examples, add a section about query formatting for parameterized or serialized queries
- Change "Realm Database" naming throughout docs pages to "Realm" and correct any incorrect usage of Realm vs. realm

# June 8, 2023

## Flutter SDK

- Realm Database
  - Model Data/Data Types: Add documentation for `Decimal128` type
  - React to Changes: Add information about `isCleared` property for the query
    change listener

## Kotlin SDK

- Realm Database
  - Model Data/Data Types: Add `RealmDictionary` to list of supported data types
  - Serialization: Remove `ObjectId` serializer from the API

## .NET SDK

- CRUD
  - Create: Add methods of creating a new Realm object in a `WriteAsync` transaction
  - Threading: Add details of the benefits of `WriteAsync` for threading
  - Transactions: Update overview description of transactions

## React Native SDK

- Remove 'Overview' headings from documentation pages for the SDK

# June 2, 2023

## C++ SDK

- Install Realm: Update CMake install instructions to use release version tags instead of a pre-release commit hash

## Flutter SDK

- Install Realm for Flutter: Update `flutter pub run realm generate` to `dart run realm generate`
- Quick Start: Update `flutter pub run realm generate` to `dart run realm generate`
- Realm Database/Model Data/Define a Realm Object Schema: Update `flutter pub run realm generate` to `dart run realm generate`
- Test & Debug: Update `flutter pub run realm install` to `dart run realm install`
- Logging: New page with details and tested, Bluehawked code examples for the Realm logging functionality based on Core Logging
- Sync Device Data/Set the Client Log Level: Note that the Sync logger is deprecated as of Realm Flutter SDK v1.1.0

## .NET SDK

- Model Data/Supported Data Types
  - Data Types: Remove generic "Collections", add "Results Collections" and "Lists"
  - Results Collections: Rename page from generic "Collections", move List content to new page, remove Summary section, clarify details about Results collections
  - Lists: New page with content moved from former "Collections" page, clarify details about Lists and nullability, add a new "Watch for Changes" section with Bluehawked code example
  - Dictionaries: Add a new "Watch for Changes" section with Bluehawked code example
  - Sets: Add a new "Watch for Changes" section with Bluehawked code example

## Swift SDK

- Install Realm: Note Realm Swift SDK v10.40.0 drops support for Xcode 13, remove Xcode 13 support table
- Model Data/Supported Types: Add missing supported types to `MutableSet` section
- Logging: New page with details and tested, Bluehawked code examples for the Realm logging functionality based on Core Logging
- Sync Data/Set the Client Log Level: Move the Logging info to the new page, note that the Sync logger is deprecated as of Realm Swift SDK v10.39.0

# May 26, 2023

## C++ SDK

- CRUD/Threading: Change `invoke()` override in custom scheduler code example to use `realm::Function` instead of `std::function` per SDK updates
- Sync Data
  - Handle Sync Errors: Remove `error_code` from `sync_error` per SDK updates
  - Set the Sync Client Log Level: New page with info and code example for setting the Sync client log level
- Logging: New page with info and code examples for setting the Realm log level and customizing the logging function

## Flutter SDK

- Read & Write Data: Add a "Limit Results" section with a tested Bluehawked code example showing how to limit results in the Realm Flutter SDK

## Kotlin SDK

- Realm Database
  - Manage Realm Files/Bundle a Realm: Add this page back with info and tested Bluehawked code examples for bundling a realm using the new `assetFile` functionality in Kotlin SDK v1.9.0
  - Read & Write Data/Update: Provide a more realistic code example in Upsert section per docs feedback, add info on `UpdatePolicy`
  - Serialization: Add info and tested Bluehawked code examples for the stable Realm Data Type serializers and experimental Full Document Serialization
- Sync Device Data/Configure & Open a Synced Realm: Add sections with tested Bluehawked code examples for waiting for download, conditionally waiting for download, and opening a synced realm offline
- Atlas App Services/Call an Atlas Function: Add a link to Serialization documentation, note serialization limitations apply pre-v1.9.0
- Manage Users
  - Authenticate Users: Add a note to the Custom Function authentication with a link to serialization docs for serializing a custom function credential using an EJSON encoder
  - Custom User Data: Add a note with a link to serialization docs for serializing custom user data using an EJSON encoder

## React Native SDK

- Model Data/Change an Object Model: Fix incorrect migration method name, update tests and code snippets

## Swift SDK

- CRUD/Read: Add a tested Bluehawked code example for Sort using the type-safe keyPath API per docs feedback

# May 19, 2023

## Java SDK

- Realm Files/Bundle a Realm: Move the `trimming` note to a shared include across SDKs, clarify that it applies only to Flexible Sync

## Kotlin SDK

- Manage Realm Files/Reduce Realm File Size: New page documenting compaction in the Realm Kotlin SDK similar to other SDK docs
- Internal: Add tests for authentication docs code examples

## .NET SDK

- Quick Start for Unity: Remove "`dynamic` Keyword Support" section
- Realm Files
  - Bundle a Realm: Move the `trimming` note to a shared include across SDKs, clarify that it applies only to Flexible Sync
  - Encrypt a Realm: Note that v11.0.0 supports opening an encrypted realm in multiple processes
- Add nullable annotations to code examples throughout docs

## Node.js SDK

- Quick Start: Add tested Bluehawked code examples for TypeScript, update JavaScript examples with improved tests
- Realm Files
  - Open & Close a Realm: Add tested Bluehawked code examples for TypeScript, update JavaScript examples with improved tests
  - Bundle a Realm: Move the `trimming` note to a shared include across SDKs, clarify that it applies only to Flexible Sync
- Manage Users/Authenticate Users: Update the code example for Offline Login with clearer syntax and improved tests
- Sync Data
  - Configure & Open a Synced Realm: Add tested Bluehawked code examples for TypeScript, update JavaScript examples with improved tests
  - Manage a Sync Session: New page consolidating content from these pages:
    - Check Network Connection
    - Pause or Resume a Sync Session
    - Check Upload & Download Progress
    - Multiplex Sync Sessions
  - Handle Sync Errors
    - Add tested Bluehawked code example for TypeScript, update JavaScript example with improved tests
    - Move Client Reset error information onto this page, remove separate Client Reset page
- Internal: Snyk dependency updates for code example test suite

## React Native SDK

- Realm Files/Landing Page: Add "Find a Realm File Path" section with tested, Bluehawked code example
- Manage Users/Authenticate Users: Update the code example for Offline Login with clearer syntax and improved tests
- Sync Data/Partition-Based Sync: Add tested Bluehawked code examples for TypeScript, update JavaScript examples with improved tests

## Swift SDK

- Realm Files/Bundle a Realm: Move the `trimming` note to a shared include across SDKs, clarify that it applies only to Flexible Sync
- Model Data/Supported Types: Remove incorrect optional syntax from `@Persisted` Property Cheat Sheet

## Realm Studio

- Open a Realm File: Update the JavaScript code example for finding a realm file

# May 12, 2023

## Kotlin SDK

- Realm Database/React to Changes: Mention and link to new "Authentication Changes as a Flow" section
- Manage Users/Authenticate Users: New "Authentication Changes as a Flow" section with info & tested Bluehawked code example

## .NET SDK

- Model Data
  - Define an Object Model: Improve "Indexes" wording, add a new "Full-Text Search Index" section with Bluehawked code example
  - Change an Object Model: Remove note about Unity not supporting the `dynamic` keyword when using `IL2CPP`
- CRUD/Query, Filter, and Sort Data: Rename page from "Filter and Sort Data", add new "Full Text Search" sections with Bluehawked code examples for both LINQ and RQL
- Update code examples on many pages as needed for 11.0.0 release

## Node.js SDK

- Realm Files/Reduce Realm File Size: Update compaction code example, refine wording on `.compact()` method
- Manage Users/Authenticate Users: Update docs code example tests and regenerate Bluehawked code examples
- Sync Data/Configure & Open a Synced Realm: New "Open Synced Realm at a Specific Path" section with info & tested Bluehawked code example

## React Native SDK

- Sync Data/Configure a Synced Realm: New "Open Synced Realm at a Specific Path" section with info & tested Bluehawked code examples

## Swift SDK

- Model Data/Define an Object Model: Clarify `PersistableEnum` details
- React to Changes: Update "Notification Delivery" section with details and Bluehawked `UITableViewController` code examples from realm-swift GitHub discussion
- Application Services/Query MongoDB: New "Find and Sort Documents" section with info & tested Bluehawked code examples for the new `sorting` API

# May 5, 2023

## C++ SDK

- CRUD/Filter Data: Note that the C++ SDK has not yet implemented sort, and using `std::sort` pulls the results set into memory

## Kotlin SDK

- Quick Start: Fix the `Item` model code example showing deprecated `ObjectId.create()` method
- Realm Database
  - Model Data/Property Annotations: Update `@PersistedName` annotation section to show remapping a class name in 10.8.0
  - Manage Realm Files/Encrypt a Realm: Note that v10.8.0 supports opening an encrypted realm in multiple processes
- Sync Device Data
  - Handle Sync Errors: Add a "Handle Client Reset" section similar to other SDKs
  - Set the Client Log Level: Update documentation for new unified Realm logger API

## .NET SDK

- Model Data/Define an Object Model: Minor clarifications related to nullability

## Node.js SDK

- Sync Data/Stream Data to Atlas: New page with info & tested Bluehawked code examples showing how to use Data Ingest to stream data to Atlas

## Swift SDK

- Updates across documentation with info and tested, Bluehawked code examples showing how to use async/actor-isolated realms including:
  - Realm Files/Configure & Open a Realm: New "Open a Realm with Swift Concurrency Features" section
  - CRUD
    - Create: New "Create an Object Asynchronously" section
    - Read: New "Read an Object Asynchronously" section
    - Update: New "Update an Object Asynchronously" section
    - Delete: New "Delete an Object Asynchronously" section
    - Threading: New "Actor-Isolated Realms" section pointing people to the new page for information
  - React to Changes: New "React to Changes in an Actor-Confined Realm" section
  - Actor-Isolated Realms: New page with details about using an actor-isolated realm
  - Swift Concurrency: Updates throughout page referring to new actor/async functionality
  - Sync Data/Configure and Open a Synced Realm: New section "Open a Synced Realm with Swift Concurrency Features"
- Add a reference table of Sendable, Non-Sendable and Thread-Confined types to the Threading & Swift Concurrency pages
- Sync Data/Set the Client Log Level: Update documentation for new unified Realm logger API

## Other

- Realm Query Language: Add a link from the page referring developers to the C++ Filter Data page for info about RQL operators supported in the C++ SDK Alpha

# April 28, 2023

## C++ SDK

- Manage Sync Sessions: Restore missing code example snippets

## Kotlin SDK

- Realm Database
  - Model Data
    - Data Types: New section with info & tested Bluehawked code example for defining an object with a `RealmDictionary`/`RealmMap` property
    - Relationships: Fix copy in the "To-One Relationship" section to match the code example
  - Manage Realm Files/Bundle a Realm: Temporarily remove the page pending the SDK's upcoming `assetFile` feature release
  - Read & Write Data
    - Create, Read, Update, and Delete pages: New sections with info & tested Bluehawked code examples for performing CRUD operations on a `RealmDictionary` property
  - React to Changes: Genericize the `List` change listener documentation to `Collection` and add tabs with details for RealmList, RealmSet, and Map notifications
- Manage Users: Minor updates to the "Create and Delete Users" section of the landing page
  - Manage Email/Password Users: New page with info & tested Bluehawked code examples

## .NET SDK

- Model Data
  - Define an Object Model: Update info for C# nullable reference types and nullable-aware context, add a Bluehawked code example
  - Data Binding: Move a section about data binding and MVVM from Define an Object Model to Data Binding page
- React to Changes: Add a callout with info about binding data to the UI and a link to the the Data Binding page

## Node.js SDK

- Realm Files/Open & Close a Realm: New "Open a Realm Without Providing a Schema" section with info & tested Bluehawked code example
- Manage Users/Authenticate Users: Minor updates to code examples for Realm/App Services naming & improved test resilience

## React Native SDK

- Realm Files
  - Configure a Realm: New "Access a Realm Without Providing a Schema" section with info & tested Bluehawked code example
  - Reduce Realm File Size: New page about compaction with info & Bluehawked code examples

## Swift SDK

- Sync Data/Record Realm Events: Note that Event Library requires Partition-Based Sync, fix incorrect info regarding the `EventConfiguration` `errorHandler`

## Other

- Get Help: Update the page with info about how to share docs feedback and add tabs for missing SDKs (C++, Flutter, Kotlin)
- Internal
  - Remove unused Bluehawk snippet markup from Kotlin test suite, clean up unused code example files
  - Snyk dependency updates

# April 21, 2023

## Flutter SDK

- Model Data/Update a Realm Object Schema: Fix "Delete a Schema" example referring to wrong model
- Update primary key in models & tested code examples on various pages from a string to ObjectId: Quick Start, Data Types, React to Changes

## Java SDK

- Update Information Architecture to match other SDKs, including:
  - Move "Fundamentals" content onto relevant topic-based pages and section landing pages
  - Rearrange table of contents to present topic-based navigation instead of content-typed navigation
  - Split long pages (Define an Object Model, Read & Write Data, Sync Changes Between Devices) into sections with smaller pages

## .NET SDK

- Sync Data/Write to a Synced Realm: New page similar to Flutter and Swift about determining which data synced & compensating writes

## Node.js SDK

- Quick Start: Fix an error in the Sync query code example
- Realm Files/Reduce Realm File Size: New page about compacting a realm similar to other SDKs with Bluehawked tested code examples
- Update Information Architecture to match other SDKs, including:
  - Move "Fundamentals" content onto relevant topic-based pages and section landing pages
  - Rearrange table of contents to present topic-based navigation instead of content-typed navigation
  - Split long pages (Define an Object Model, Read & Write Data, Sync Changes Between Devices) into sections with smaller pages

## React Native SDK

- Minor Information Architecture refinements across SDK docs, including:
  - Remove "Realm Database" section, move contents to top-level of table of contents
  - Make "App Services" a landing page with the concept information formerly on the "App Services Overview" page
  - Make "Manage Users" a landing page with concept information about working with the user object
  - Make "Model Data" a landing page with concept information about Realm objects, schemas, and relationships
  - Make a new "Realm Files" section with concept information on the landing page, move Bundle, Encrypt, and Open a Realm into this section
  - Consolidate several "Schema" pages onto "Define an Object Model Page" (Default Value, Index, Optional, Primary Key, Remap)
  - Consolidate Relationships and Embedded Objects content
- Model Data/Data Types:
  - Mixed: New section with tested, Bluehawked code example showing how to check a Mixed property's type
  - UUID: Clarify `UUID` is bundled with the Realm package as part of BSON
  - Sets: Capitalize `Set` data type, add links to API reference, clean up naming inconsistencies, update code examples
  - Embedded Objects: Change heading levels, fix some code example highlighting
- Sync/Stream Data to Atlas: Update feature naming to "Data Ingest," minor wording improvements

## Swift SDK

- Minor Information Architecture refinements to match other SDKs, including:
  - Move concept content onto section landing pages for "Realm Files," "Model Data," "CRUD," "Sync Data"
  - Remove "Key Concept" term from section headers
  - Minor updates to Table of Contents

# April 14, 2023

## C++ SDK

- Add a link to the Table of Contents pointing to the realm-cpp repository example projects

## Kotlin SDK

- Realm Database
  - Realm Database: Change this section container to a landing page, move content from "Overview" page onto this landing page
  - Rename the "Open and Close a Realm" page to "Configure & Open a Realm"
  - Rename the "Write Transactions" page to "Read & Write Data" and make it a landing page for the CRUD section
    - Merge the subsections of Create/Read/Update/Delete into a single page for each subsection
  - Manage Realm Files: Change the this section container to a landing page containing overview content
  - Database Internals: New page containing an include shared across all SDKs about Realm's database engine, file format, and design
  - Handle Realm Errors: New page with information about realm error exception types
- Sync Device Data
  - Handle Sync Errors: New page with Sync-specific error handling information moved from Errors/App Errors page
- Atlas App Services
  - Handle App Errors: New page with App-specific error handling information moved from errors/App Errors page
- Code examples throughout the docs: change `val` to `var` for any persisted fields

## .NET SDK

- Troubleshooting: Add troubleshooting info about the `AddDefaultTypes should be called before creating a Realm instance` exception

## Node.js SDK

- Advanced Guides/Encrypt a Realm: Update docs for encrypted realm multiprocess support

## React Native SDK

- Realm Database
  - Schemas/Dictionaries: Incorporate SDK engineering feedback to add and update examples and clarify details
  - Encrypt a Realm: Update docs for encrypted realm multiprocess support
- Atlas App Services/Query MongoDB: Update `.watch()` examples to use React Native Polyfills

## Swift SDK

- Realm Files/Encrypt a Realm: Update docs for encrypted realm multiprocess support

## Other

- Internal: Update Kotlin SDK version in docs test suite to 1.7.0

# April 07, 2023

## Kotlin SDK

- Custom User Data: Add new Custom User Data page
- Update information architecture
  - Manage Users: Create new Manage Users section and migrate relevant content
    from the App Services section.
  - Atlas App Services: Restructure the App Services section.
  - Device Sync: Restructure the Sync section.
  - Model Data and others: Restructure the Model Data section.
  - Install Realm: Update the Install section to a landing page of its own.

## .NET SDK

- Configure & Open a Synced Realm: Add code and explanation for new Sync Timeout
  options and handling events that timeout.

## React Native SDK

- Pages throughout the React Native SDK docs: Lots of small updates to content
  and code examples to make them easier to read and follow.
- Pages throughout the React Native SDK docs: Refactor examples to use
  `realm.create(objectType, {...})` instead of calling the model class with
  `new ObjectType(realm, {...})`.
- Define a Realm Object Model: Add information about TypeScript and required
  properties for object models.
- Bootstrap with Expo: Update references to the Expo template so that they go
  to the latest version.

## Other

- Pages throughout the docs set: Review all images and update those that were
  outdated.
- Pages throughout the docs set: Rename Asymmetric Sync to Data Ingest.

# March 31, 2023

## C++ SDK

- React to Changes: Add a "Register a Collection Change Listener" section with tested, Bluehawked code examples
- Sync Data/Handle Sync Errors: New page with tested, Bluehawked code example showing how to set a Sync error handler

## Flutter SDK

- Sync Device Data
  - Write Data to a Synced Realm: Add more details around compensating writes that don't match a query subscription vs. don't match permissions
  - Handle Sync Errors: Add a new "Test Client Reset Handling" section with details about terminating & re-enabling Sync to test client reset handling

## Java SDK

- Usage Examples
  - Bundle a Realm: Add a shared include about writeCopy only supporting same-type Sync configurations
  - Reset a Client Realm: Add a new "Test Client Reset Handling" section with details about terminating & re-enabling Sync to test client reset handling

## Kotlin SDK

- Realm Database/Manage Realm Database Files/Open & Close a Realm: Note that writeCopy only supports same-type Sync configurations

## .NET SDK

- Move "Install Realm" procedure to a shared include used on both Install and Quick Start pages
- Realm Files/Bundle a Realm: Add a shared include about writeCopy only supporting same-type Sync configurations
- Sync Data
  - Client Resets: Add a new "Test Client Reset Handling" section with details about terminating & re-enabling Sync to test client reset handling
  - Convert Between Non-Synced Realms and Synced Realms: Add a shared include about using writeCopy to convert between local and synced realms only supporting Partition-Based Sync

## Node.js SDK

- Usage Examples
  - Open & Close a Realm
    - Add a shared include about writeCopy only supporting same-type Sync configurations
    - Add a shared include about using writeCopy to convert between local and synced realms only supporting Partition-Based Sync
    - Fix a link
  - Reset a Client Realm: Add a new "Test Client Reset Handling" section with details about terminating & re-enabling Sync to test client reset handling
- Advanced Guides/Bundle a Realm: Add a shared include about writeCopy only supporting same-type Sync configurations

## React Native SDK

- Sync Data
  - Handle Sync Errors: Add a new "Test Client Reset Handling" section with details about terminating & re-enabling Sync to test client reset handling
  - Partition-Based Sync: Add a shared include about writeCopy only supporting same-type Sync configurations
- Test and Debug/Debugging with Flipper: Remove unnecessary and potentially outdated screenshots
- Minor refinements in code examples and code example highlighting throughout section

## Swift SDK

- Application Services/Query MongoDB: Add a "Watch for Changes" section with details & tested, Bluehawked code examples showing how to watch a collection for changes, filter and match on a `collection.watch()`, and watch a collection as an async sequence
- Sync Data
  - Configure & Open a Synced Realm
    - Move section about opening a Flexible Sync realm above the section about opening a Partition-Based Sync realm
    - Add a shared include about writeCopy only supporting same-type Sync configurations
    - Add a shared include about using writeCopy to convert between local and synced realms only supporting Partition-Based Sync
  - Handle Sync Errors: Add a new "Test Client Reset Handling" section with details about terminating & re-enabling Sync to test client reset handling
  - Write to a Synced Realm: Minor wording improvements based on corresponding Flutter page updates

# March 24, 2023

## C++ SDK

- Manage Users/Manage Email/Password Users: Minor tweaks based on what's currently supported

## Flutter SDK

- Realm Database/Manage Realm Database Files/Reduce Realm File Size
  - Note that you can compact either a non-synced or synced realm
  - Add information about automatic compaction, clarify details for manual compaction
- Manage Users/Email/Password Users: Update details around password reset, particularly around calling a password reset function

## Kotlin SDK

- Realm Database
  - Schemas/RealmSet: Minor clarifications, update the code example to fix a failing test
  - Manage Realm Database Files/Open & Close a Realm: Add a note about automatic compaction
- Sync/Set the Client Log Level: New page with tested, Bluehawked code examples showing how to set the log level and how to set a custom logger
- Update the Kotlin SDK version to 1.7.0
- Add Partition-Based Sync code examples for configuring and opening a realm that were erroneously deleted

## .NET SDK

- Quick Start: Add a line about quick start demonstrating adding Device Sync
- Quick Start for Unity: Rename "Integrate Realm with Unity" to "Quick Start for Unity", move it higher in the Table of Contents, move a note about multiprocess-sync-related crashes
- Realm Files/Reduce Realm File Size: Add information about automatic compaction, clarify details for manual compaction
- Manage Users/Manage Email/Password Users: Update details around password reset, particularly around calling a password reset function
- Use Realm in a Console App: Add details around Device Sync, update code example
- Compatibility: Add `tvOS` to the list of supported platforms

## Node.js SDK

- Usage Examples/Manage Email/Password Users: Update details around password reset, particularly around calling a password reset function

## React Native SDK

- Major rewrite across the SDK to use `@realm/react` in all code examples and accompanying text
- Manage Users/Manage Email/Password Users: Update details around password reset, particularly around calling a password reset function

## Swift SDK

- Realm Files/Reduce Realm File Size: Add information about automatic compaction, clarify details for manual compaction
- Manage Users/Manage Email/Password Users: Update details around password reset, particularly around calling a password reset function
- Sync Data/Handle Sync Errors: Fix an incorrect API reference link

## Web SDK

- Apollo GraphQL Client (React): Add a section with tested, Bluehawked code examples showing how to paginate data

## Other

- Internal
  - Add redirects to fix SEO-impact 404s
  - C++, Swift, and SwiftUI code example & unit test cleanup
  - Remove unused JS code snippets

# March 17, 2023

## Java SDK

- Usage Examples/Bundle a Realm: Change "advanced backend compaction" and related link to "trimming" where discussing client maximum offline time

## .NET SDK

- Realm Files/Bundle a Realm: Change "advanced backend compaction" and related link to "trimming" where discussing client maximum offline time

## Node.js

- Usage Examples/Query MongoDB: Add a new "Paginate Documents" section with information and a tested, Bluehawked code example to the "Aggregation Stages" documentation
- Advanced Guides/Bundle a Realm: Change "advanced backend compaction" and related link to "trimming" where discussing client maximum offline time

## React Native SDK

- Realm Database/Bundle a Realm: Change "advanced backend compaction" and related link to "trimming" where discussing client maximum offline time
- Atlas App Services/Query MongoDB: Add a new "Paginate Documents" section with information and a tested, Bluehawked code example to the "Aggregation Stages" documentation

## Swift SDK

- Install Realm: Add a prerequisite about requiring reflection to be enabled in the project
- Realm Files/Bundle a Realm: Change "advanced backend compaction" and related link to "trimming" where discussing client maximum offline time
- Model Data/Define an Object Model/Object Models: Add information to the "Key Concept: Properties" section about Realm using reflection to determine the properties in your models at runtime
- Test and Debug: Add a "No Properties are Defined for Model" section to "Troubleshooting" with information about resolving this crash when it is related to disabling reflection metadata
- Sync Data/Write to a Synced Realm: Add a new "Compensating Write Error Information" section with details and a Bluehawked code example about the new `.writeRejected` error code and the `RLMCompensatingWriteInfo` object

## Web SDK

- Query MongoDB: Add a new "Paginate Documents" section with information and a tested, Bluehawked code example to the "Aggregation Stages" documentation

## Other

- Internal
  - Remove unused Bluehawk snippet markup from Flutter test suite, clean up unused code example files
  - Snyk dependency updates

# March 10, 2023

## Other

- Internal
  - Snyk dependency updates
  - Add new metric, recommendations for readability scoring

# March 3, 2023

## C++ SDK

- Model Data/Object Types and Schemas: Note that class names are limited to a maximum of 57 UTF-8 characters
- CRUD/Threading: New page based on other SDK threading pages, with wording improvements and tested, Bluehawked code examples

## Flutter SDK

- Install Realm for Flutter: New "Supported Platforms" section
- Realm Database
  - Model Data/Define a Realm Object Schema: Note that class names are limited to a maximum of 57 UTF-8 characters
  - React to Changes: Add `RealmSet` to `RealmList` change listener section, add `isCleared` documentation
- Sync Device Data
  - Manage Sync Session: Add a "When to Pause a Sync Session" section to the "Pause" documentation with use cases and caveats for pausing sync in the client
  - Set Sync Log Level: New page with tested, Bluehawked code example showing how to set the log level

## Java SDK

- Usage Examples
  - Define a Realm Object Schema: Note that class names are limited to a maximum of 57 UTF-8 characters
  - Sync Changes Between Devices: Add a "When to Pause a Sync Session" section to the "Pause" documentation with use cases and caveats for pausing sync in the client

## Kotlin SDK

- Realm Database
  - Define an Object Model
    - Note that class names are limited to a maximum of 57 UTF-8 characters
    - New "Map a Property to a Different Name" section with Bluehawked code example showing how to use the `@PersistedName` annotation to remap a property name
  - Schemas/Remap a Field: New page with Bluehawked code example showing how to use the `@PersistedName` annotation to remap a property name
- Atlas App Services
  - Overview: Add sections for Device Sync and Call Atlas Functions
  - Call an Atlas Function: New page with tested, Bluehawked code example showing how to call an Atlas function from the Kotlin SDK

## .NET SDK

- Model Data/Define an Object Model: Note that class names are limited to a maximum of 57 UTF-8 characters
- CRUD/Threading: Wording improvements ported from new C++ Threading page
- Sync Data/Suspend or Resume a Sync Session: Add a "When to Pause a Sync Session" section with use cases and caveats for pausing sync in the client

## Node.js SDK

- Usage Examples
  - Define a Realm Object Schema: Note that class names are limited to a maximum of 57 UTF-8 characters
  - Sync Changes Between Devices: Add a "When to Pause a Sync Session" section to the "Pause" documentation with use cases and caveats for pausing sync in the client

## React Native SDK

- Realm Database/Define a Realm Object Model: Note that class names are limited to a maximum of 57 UTF-8 characters
- Sync Data/Pause or Resume a Sync Session: Add a "When to Pause a Sync Session" section with use cases and caveats for pausing sync in the client

## Swift SDK

- CRUD/Threading
  - Wording improvements ported from new C++ Threading page
  - Remove autorelease blocks in code examples showing DispatchQueues, update to `autoreleaseFrequency` parameter
- Sync Data/Suspend or Resume a Sync Session: Add a "When to Pause a Sync Session" section with use cases and caveats for pausing sync in the client

## Web SDK

- User Management/Authenticate Users
  - Change Google Auth argument from redirect URI to redirect URL
  - Remove try/catch blocks from code examples, switch to consistent `await` syntax in all examples

## Other

- Realm Query Language: Rename `Task` model to `Item` in examples to avoid naming collisions in some programming languages and match Template App
- Internal
  - Update realm-web unit test suite:
    - Update dependencies
    - Switch to existing shared backend App Services App used by other SDKs

# February 24, 2023

## C++ SDK

- Model Data/Object Types and Schemas: New "Define an Asymmetric Object" section with info and tested, Bluehawked code example
- CRUD/Create: New "Create an Asymmetric Object" section with info and tested, Bluehawked code example
- React to Changes: New section showing how to unregister a notification token
- Sync Data: New section with landing page derived from other SDKs
  - Manage Sync Subscriptions: Moved from top-level ToC into section
  - Manage Sync Sessions: New page with info and tested, Bluehawked code examples
  - Stream Data to Atlas: New page with info about Asymmetric Sync and tested, Bluehawked code examples

## Flutter SDK

- Sync Device Data/Write Data to a Synced Realm: Remove mentions of Device Sync permissions after rules unification release

## Kotlin SDK

- Realm Database/Manage Realm Database Files
  - Open & Close a Realm: New "Copy Data into a New Realm" section with info and tested, Bluehawked code examples for using the `writeCopyTo()` API
  - Bundle a Realm: New page with info and tested, Bluehawked code examples for bundling a local or synced realm with an app
- Atlas App Services/Authenticate Users: Add "Custom Function" and "Retrieve Current User" sections to page with Bluehawked code examples

## .NET SDK

- Working with Unity: Remove outdated Unity tutorial and link from page

## Swift SDK

- SwiftUI/React to Changes: New "Sort Observed Results" section with tested, Bluehawked code example
- Sync Data
  - Write to a Synced Realm: Remove mentions of Device Sync permissions after rules unification release
  - Handle Sync Errors: Add a link to the page on setting the client log level
  - Set the Client Log Level: New "Set a Custom Logger" section with Bluehawked code example

## Other

- Various Snyk dependency updates
- Update Atlas App Services firewall IP addresses

# February 17, 2023

## C++ SDK

- Landing Page: Update to the product landing page template used for the other SDK landing pages
- Model Data/Supported Data Types: Add `Map`
- CRUD
  - Create: New "Create an Object with a Map Property" section with tested, Bluehawked code example
  - Read: New "Read a Map Property" section with tested, Bluehawked code example
  - Update: New "Update a Map Property" section with tested, Bluehawked code example
  - Delete: New "Delete Map Keys/Values" section with tested, Bluehawked code example
- React to Changes: New "Register a Results Collection Change Listener" section with tested, Bluehawked code example
- SDK Telemetry: Add an SDK Telemetry page for the C++ SDK using the include shared across all SDKs

## Flutter SDK

- Fix circular redirects

## Swift SDK

- Sync Data/Record Realm Events: Update the documentation and code examples for the new `Scope` object, minor tweaks and improvements
- SwiftUI: Note that `@ObservedResults` is intended for use in a SwiftUI view across the following pages:
  - Configure & Open a Realm
  - Filter Data
  - React to Changes
  - Write Data

## Other

- Various Snyk dependency updates

# February 10, 2023

## C++ SDK

- Update existing Model Data and CRUD documentation pages to show the new C++ SDK declaration and usage syntax using CRTP
- Configure & Open a Realm: Update the documentation about opening a realm at a path based on SDK changes, update API links
- Add many new pages, including:
  - Quick Start: New page following the format of the other SDKs with tested, Bluehawked code examples
  - CRUD/Filter Data: New page following the format of the other SDKs with tested, Bluehawked code examples
  - React to Changes: New page following the format of the other SDKs with tested, Bluehawked code examples for watching an object for changes
  - Application Services: New Section
    - Connect to an App Services App: Minor updates to an existing page, move the page into this new section
    - Call a Function: New page following the format of the other SDKs with tested, Bluehawked code examples
  - Manage Users: New Section
    - Landing Page: Add a landing page that describes managing users in the C++ SDK, based on the functionality that is currently implemented
    - Authenticate Users: New page following the format of the other SDKs with tested, Bluehawked code examples
    - Manage Email/Password Users: Minor updates to an existing page, move the page into this new section
    - Custom User Data: New page with info and tested, Bluehawked code examples showing how to create, read, update, and delete custom user data
  - Manage Sync Subscriptions: Add a Manage Sync Subscriptions page following the format of the other SDKs with tested, Bluehawked code examples

## Flutter SDK

- Landing Page & Table of Contents: Remove "Release Candidate" and "RC" language for Flutter SDK's GA
- Realm Database/Manage Realm Database Files/Bundle a Realm: Add docs for bundling a synced realm
- Sync Device Data/Sync Multiple Processes: Add a new section with information about how to manually refresh realm data
- Fix a redirect loop for the Read & Write Data page
- Fix missing entries in the Table of Contents

## Java SDK

- Usage Examples/Query MongoDB: Add an introduction and prerequisites with links to corresponding setup docs in App Services documentation

## Kotlin SDK

- Realm Database/Schemas
  - Relationships: Add a paragraph with a brief description and link to the new Embedded Objects page
  - Embedded Objects: New page with tested, Bluehawked code examples showing how to create, read, update, delete, and query embedded objects in the Kotlin SDK
- Internal
  - Update the Kotlin documentation unit test suite to use Kotlin SDK version 1.6.1, fix a failing test

## .NET SDK

- Application Services/Query MongoDB: Add an introduction and prerequisites with links to corresponding setup docs in App Services documentation

## Node.js SDK

- Usage Examples/Query MongoDB: Add an introduction and prerequisites with links to corresponding setup docs in App Services documentation

## React Native SDK

- Quick Start: Fix a typo
- Atlas App Services/Query MongoDB: Add an introduction and prerequisites with links to corresponding setup docs in App Services documentation
- Manage Users/Multi-User Applications: Add information about user states, update code examples to show `@realm/react`

## Swift SDK

- Application Services/Query MongoDB: Update prerequisites and introduction with links to corresponding setup docs in App Services documentation

## Web SDK

- Query MongoDB: Add an introduction and prerequisites with links to corresponding setup docs in App Services documentation

## Other

- Realm Query Language: Clarify that comparing two lists, while valid RQL syntax, is not supported in Flexible Sync queries

# February 3, 2023

## Flutter SDK

- Realm Database/Model Data/Define a Realm Object Schema: New "Map Realm Model to a Different Name" section with info and example for `MapTo`

## Kotlin SDK

- Realm Database
  - Define an Object Model: New page with information and tested, Bluehawked code examples showing how to define an object model and use property annotations
  - Change an Object Model: New page with information and tested, Bluehawked code examples showing how to perform migrations
  - Schemas
    - Supported Types: Add `Decimal128` to supported types list
    - Ignore a Field: Add details about how ignored properties behave
    - Index a Field: Note that primary keys are indexed by default
    - Primary Keys: Link to API docs for the annotation, add details about primary key behavior and limitations
  - Manage Realm Database Files: Add information about providing object schemas when opening a realm, link to the Open a Synced Realm page
- Update the Kotlin SDK version to 1.6.0

## .NET SDK

- React to Changes: Reorganize page, add missing information, clarify code examples

## Web SDK

- Append "Web SDK" to page titles throughout section to improve search results
- User Management
  - Authenticate Users: Update Google credential code example for breaking change
  - Manage Email/Password Users: Update the "Call a Password Reset Function" code example syntax for passing additional arguments

## Other

- Realm Query Language: Update the Kotlin data type declaration to show valid `RealmList<Tasks>` syntax
- Various Snyk dependency updates

# January 27, 2023

## Flutter SDK

- Realm Database
  - Reorganize Table of contents and consolidate many existing entries into a new "Realm Database" section
  - Model Data/Data Types
    - Consolidate existing "Collections" content onto "Data Types" page
    - Add a "RealmSet Collections" section with tested Bluehawked code examples showing how to use it
  - Configure & Open a Realm: Add a "Copy Data into a New Realm" section with tested Bluehawked code examples showing how to use `writeCopy()`
- Test and Debug: New "Test and Debug" page with strategies and tested Bluehawked code examples for testing and debugging Flutter apps that use Realm

## Realm Studio

- Open a Realm File: Update the JS example for finding a Realm file to a tested Bluehawked code example

# January 20, 2023

## Flutter SDK

- Model Data/Update a Realm Object Schema: Update the "Rename a Property" code example to use correct code example
- Troubleshooting: New page containing existing info moved from other places in the docs to help troubleshoot common errors

## Kotlin SDK

- Install/Kotlin Multiplatform: Update Kotlin SDK version number in code examples
- Realm Database
  - Overview: Add "Room" to list of other mobile databases for which Realm is an alternative
  - Schemas/Relationships: New Inverse Relationships section with tested code examples showing how to define an inverse relationship
- Atlas App Services/Create & Manage User API Keys: New page with tested code examples showing how to manage user API keys

## Node.js SDK

- Usage Examples/Access User Metadata: New page with tested code examples showing how to read, configure, and update user metadata
- Advanced Guides/Access Custom User Data: Reorganize page and update code examples to use tested code examples

## Swift SDK

- Realm Files/Delete a Realm File: Update the code example to show deleting a realm file oustside the context of a client reset
- CRUD
  - Create: Add more code examples for Initializing Objects with a Value
  - Update: Add a code example showing batch updates using KVC
  - Delete: Add a code example illustrating deleting related objects
  - Threading: Update the Frozen Objects code example to use a model that's already used on this page
  - Filter Data: Move the Subqueries section to the bottom of each section, add Swift Query API examples for Set operators
- Sync Data
  - Write to a Synced Realm: New "Don't Write to a Synced Realm in an App Extension" section describing limitations and workarounds
  - Handle Sync Errors: Add back an Objective-C example for manually handling a client reset error

## Other

- Internal
  - Remove unused Swift & Objective-C tests and code examples from unit test suite
  - Update Kotlin API Key example in unit test to fix error

# January 13, 2023

## C++ SDK

- Model Data/Supported Types: Fix a bug in a property declaration, update property declarations to tested Bluehawked code examples

## Flutter SDK

- Model Data
  - Data Types: New section with tested Bluehawked code examples showing how to define and use `RealmValue` properties
  - Update a Realm Object Schema: Add a tip about bypassing migration during development by using `shouldDeleteIfMigrationNeeded`
- Read & Write Data: Add warning that Flutter SDK throws an error if you try to write the same object to multiple realms
- Sync Device Data/Handle Sync Errors: Add a tip linking to the Sync Errors page in the App Services documentation

## Java SDK

- Usage Examples/Sync Changes Between Devices: Add a tip linking to the Sync Errors page in the App Services documentation

## Kotlin SDK

- Quick Start: Add more details about `RealmConfiguration.create()`, update Bluehawk markup for a generated code example
- Handle Errors/Handle App Errors: Add a tip linking to the Sync Errors page in the App Services documentation

## .NET SDK

- Sync Data/Handle Sync Errors: Add a tip linking to the Sync Errors page in the App Services documentation

## Node.js SDK

- Usage Examples/Sync Changes Between Devices: Add a tip linking to the Sync Errors page in the App Services documentation

## React Native SDK

- Bootstrap with Expo: Update the link to the Realm Expo template to use npm
- Sync Data/Handle Sync Errors: Add a tip linking to the Sync Errors page in the App Services documentation

## Swift SDK

- CRUD/Filter Data:
  - Add Realm Swift Query API/type-safe query info & tested code examples for:
    - Collection operators `.in(_ collection:)` and `.containsAny(in:)`
    - Set operator examples for string and integer arrays
- Sync Data
  - Write to a Synced Realm: New page with details & code examples about how Device Sync permissions & Flexible Sync queries determine what data you can write. Explains Compensating Writes.
  - Handle Sync Errors: Add a tip linking to the Sync Errors page in the App Services documentation

## Web SDK

- Table of Contents: Move Next.js Integration Guide up in ToC, add Create & Manage User API Keys to User Management

## Other

- Internal
  - Update Kotlin SDK version, link to latest Kotlin API documentation
  - Replace the Kotlin unit test project logger Napier with Kermit
  - Remove over 1,000 unused files from repository, add CI to check for unused files in PRs

# January 6, 2023

## C++ SDK

- New "CRUD" section with Create, Read, Update, and Delete pages that contain info and tested code examples

## Flutter SDK

- Why Realm Database?: Expand page with details on Realm vs. other databases, live queries, and Realm Flutter SDK examples
- Quick Start: Update query code example to show `realm.query<Type>` syntax instead of `realm.all<Type>.query()` syntax
- Model Data
  - Data Types: Add a "Collections" section with a link out to the new Collections page
  - Collections: New page with details & tested code examples showing collection types & working with collections
- Read & Write Data: Various improvements including formatting improvements, test updates, and adding an example of finding an object by primary key
- Freeze Data: Fix typos in code examples, remove code example highlighting of specific lines

## Java SDK

- Usage Examples/Authenticate Users: New section with a tested code example showing how to get a User Access Token

## Kotlin SDK

- Install
  - Android: Update a reference from Sync to Device Sync for naming
  - Kotlin Multiplatform: Add information with a link to KMM documentation about environment setup, remove Gradle examples
- Quick Start: Link "Realm Object Models" to supported types instead of create a schema, make "Initial Subscription" note an "Important" callout
- Manage Realm Database Files: New section with existing Open & Close a Realm page moved into it, as well as two new pages:
  - Delete a Realm: New page with tested code examples showing how to delete a Realm when using the Kotlin SDK
  - Encrypt a Realm: New page with tested code example showing how to encrypt a Realm when using the Kotlin SDK
- Sync
  - Landing Page: Add details about Flexible Sync and Partition-Based Sync
  - Add Sync to an App: Add an "Important" callout with details about avoiding synchronous writes on the main thread
- Atlas App Services/Authenticate Users: New section with a tested code example showing how to get a User Access Token

## .NET SDK

- Update code examples across many pages to show support for source generators. Classes must now be defined as partial and should be declared implementing an interface (like `IRealmObject`)
- Model Data/Supported Data Types/Dictionaries: Update wording to specify that nullable values are not supported when using Device Sync, add mention of LINQ regarding querying a dictionary, code example naming tweaks and Realm .NET SDK version updates
- CRUD
  - Write Transactions: New "Check the Status of a Transaction" section with details and tested code example showing `TransactionState`
  - Threading: Update code example to show awaiting `realm.writeAsync()`, wording improvements to avoiding synchronous writes note
- Sync Data: Add a mention of LINQ alongside RQL regarding forming Flexible Sync queries
- Compatability: Small tweaks and improvements regarding supported .NET versions, table organization

## Node.js SDK

- Fundamentals
  - Realms: Replace code examples with tested, Bluehawked code snippet
  - Write Transactions: Replace code example with tested, Bluehawked code snippet, improve formatting
- Usage Examples/Define a Realm Object Schema: Typo fix in code example

## React Native SDK

- Schemas/Define an Asymmetric Object: Typo fix in code example

## Swift SDK

- Model Data/Supported Types: Add missing optional `NSUUID` to supported Objective-C types, fix a typo

## Web SDK

- Next.js Integration Guide: Fix a typo in a link to the npm package `nookies`

## Other

- Internal
  - Snyk updates
  - C++ Test Suite:
    - Add a `removeAll()` method to the C++ test suite to remove all realm objects as this is not yet implemented in the SDK
    - Add CI to run the C++ tests & report success/fail when a PR adds or changes a file in the test suite directory

# December 30, 2022

## Flutter SDK:

- Bug fix - "Flutter/User-Metadata" rST issue with title underline. The "User Metadata - Flutter SDK" page had a title underline that was too short.

## Kotlin SDK:

- Update Kotlin example in RQL docs to use `ObjectId`

## Node.js SDK:

- Bluehawkify Node.js code samples: Code samples on several pages were updated to match modern usage.
  - `node/install`: One minor code sample
  - `/node/examples/define-a-realm-object-model`: Many code sample changes
  - `/node/examples/connect-to-app-services-backend`: Several code sample changes

## Other

- Internal:
  - Refactor React Native SDK Create, Read, Update, and Delete pages. These are
    now focused on using `@realm/react`. Merged to a "feature" branch.

# December 23, 2022

## Flutter SDK:

- Add App Services tab to the Flutter landing page
- Add "User Metadata" page to Flutter
- Remove download progress notification from Flutter docs
- Add info about connecting Using Android 7 or Older
- Added info clarifying "completed subscription state"
- Update minimum Flutter and Dart SDK versions

## C++ SDK:

- Add information about building an app with Android
- Add "Manage Email/Password Users" page

## .NET SDK:

- Change capitalization of "Linq" to "LINQ" in QuickStart
- Added info clarifying "completed subscription state"

## Kotlin SDK:

- Added info clarifying "completed subscription state"

## React Native SDK:

- Added info clarifying "completed subscription state"

## Swift SDK :

- Added info clarifying "completed subscription state"

## Other:

- Internal:
  - Add shared backend source for the unit test suites
  - C++ SDK:
    - Change capitalization convention for constant variables in authentication unit tests
  - Swift SDK:
    - Use Swiftlint to fix linting errors
  - .NET SDK:
    - Replace "Task" model with "Item" model in unit test suite

# December 16, 2022

## C++ SDK

- Model Data: New section containing the following pages w/tested code examples:
  - Object Types & Schemas
  - Supported Data Types
  - Relationships
- Connect to App Services: New page showing how to connect to an App Services app

## Flutter SDK

- Install Realm for Flutter: New "Update Package Version" section showing how to update Flutter SDK or Dart Standalone SDK in your project
- Manage Users/Custom User Data: New page with tested code example showing how to write custom user data from an Atlas Function
- Atlas App Services/Query Atlas GraphQL API: New page with tested code examples showing how to query & mutate data in MongoDB Atlas from the client app using the Atlas GraphQL API
- Sync Device Data:
  - Manage Subscriptions: Add more information about how subscriptions relate to the backend app/queryable fields/RQL, and how subscriptions are stored
  - Write Data to a Synced Realm: New page detailing more explicitly Sync subscription behavior and permissions and compensating writes
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Java SDK

- Usage Examples/Sync Changes Between Devices: Add a note to the "Check Upload & Download Progress" section about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Kotlin SDK

- Quick Start: Fix broken link
- Realm Database
  - Schemas/Supported Types
    - Add `MutableRealmInt`, `RealmList<T>`, `RealmSet<T>`, and `BacklinksDelegate<T>` to the list of supported types
    - Add note about importing `ObjectId` from `org.mongodb.kbson.ObjectId` in Realm Kotlin SDK version 1.5.x or higher
  - Open & Close a Realm: New "Open an In Memory Realm" section with tested code example showing how to open a realm in memory
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## .NET SDK

- Working with Unity: Typo fix
- Sync Data/Check Upload & Download Progress: Add a note about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Node.js SDK

- Quick Start
  - Merge the local & sync quick starts into one quick start, with the optional step of Add Device Sync
  - Replace manual code examples with tested code examples generated with Bluehawk
- Usage Examples/Sync Changes Between Devices: Add a note to the "Check Upload & Download Progress" section about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## React Native SDK

- Quick Start
  - Merge the local & sync quick starts into one quick start, with the optional step of Add Device Sync
  - Replace manual code examples with tested code examples generated with Bluehawk
- Sync Data/Check Upload & Download Progress: Add a note about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Swift SDK

- Sync Data/Check Upload & Download Progress: Add a note about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Web SDK

- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Other

- Landing Page: Add card for C++ SDK
- Realm SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it
- Internal:
  - Created a new React Native unit test suite that is specific to React Native and uses components as well as `@realm/react`
    - Add tests & generate code snippets for the "Change an Object Model" page
  - Kotlin SDK
    - Fix bug in unit test suite
    - Switch to importing `ObjectId` from `org.mongodb.kbson.ObjectId`, change `ObjectId.create()` to `ObjectId()` in tests & generated code examples
  - Various Snyk and Dependabot upgrades and version bumps in example apps

# December 9, 2022

## C++ SDK

- Install Realm: New page with instructions for how to install the Realm C++ SDK using Swift Package Manager or CMake, remove "Install" instructions from landing page

## Flutter SDK

- Quick Start: Wording tweaks and typo fix
- Model Data/Define a Realm Object Schema: Typo fix
- Sync Device Data
  - Landing page: Add an explanation of what synced realms are, and how they differ from non-synced realms
  - Open Synced Realm: Further Reading: Add a link with some information about the new Manage Sync Subscriptions page
  - Manage Sync Sessions: Move content related to Flexible Sync subscriptions, focus on pause/resume, monitor upload/download progress, check network connection
  - Manage Sync Subscriptions: New page with existing content related to managing Flexible Sync subscriptions

## Java SDK

- Usage Examples/Sync Changes Between Devices: Typo fix

## Kotlin SDK

- Realm Database/Schemas: New "Realm Set" page with tested code examples showing how to use the `RealmSet()` data type

## .NET SDK

- Add content about Maui, tweak or remove content about Xamarin, from the following pages:
  - .NET SDK Landing Page
  - Install Realm
  - Realm Files
    - Bundle a Realm
    - Encrypt a Realm
  - Model Data/Define an Object Model
  - CRUD/Threading

## Node.js SDK

- Usage Examples/Authenticate Users: New section with a tested code example showing how to get a User Access Token

## React Native SDK

- Realm Database/Overview: Fix typos in a couple of links
- CRUD
  - Create: New tested code examples and content showing how to create objects using Realm React
  - Read: New tested code examples and content showing how to read objects using Realm React
- Manage Users/Authenticate Users: New section with a tested code example showing how to get a User Access Token

## Swift SDK

- Move "Manage User API Keys" page from "App Services" section to "Manage Users" section

## Web SDK

- Landing page: Fix broken link
- User Management/Authenticate Users: New section with a tested code example showing how to get a User Access Token

## Realm Studio

- Open a Realm File: Add tabs showing how to find the realm file path in the Flutter SDK & Kotlin SDK
- Modify Schema in Realm Studio: Add a tab for the Flutter SDK "Schema Versions & Migrations" page

## Other

- Remove a note about watching for collection notifications on serverless instances from Quick Starts, add it to Query MongoDB page
- Internal
  - Fix missing targets to address Snooty build errors and potentially fix broken links using those targets
  - Update the README for the C++ code example project with additional details & wording clarifications
  - Update the README for the Dart code example project to link to `realm-dart/main` instead of `realm-dart/master`
  - Add the contents of a now-archived external repository to this docs repository:
    - Realm SDK Reference Manual Landing Pages
    - CSVs & JSON containing reference info for Atlas App Services Public IPs & Realm Public IPs

# December 2, 2022

## C++ SDK

- Configure & Open a Realm: New page with tested code examples showing how to configure and open a realm

## Flutter SDK

- Install Realm for Flutter: Add a "Use Realm with the macOS App Sandbox" section with details about how to enable network requests while an app is in development
- Manage Realm Database Files
  - New section with landing page to organize content related to realm files
  - Move relevant pages into section: Configure & Open a Realm, Bundle a Realm, Compact a Realm, Encrypt a Realm
  - Delete a Realm: New page with a tested code example showing how to safely delete a realm
- User Management/Get an Access Token: New page with tested code examples showing how to get and refresh a user access token
- Sync Device Data/Add Sync to an App: New page showing the procedure & tested code examples for how to add Device Sync to an app
- Add the Dart/Flutter example projects repository to the navigation table of contents

## Kotlin SDK

- Quick Start: Fix a broken API reference doc link

## .NET SDK

- Quick Start
  - Update code examples to use `Task` model throughout, minor reorganization and removing outdated/unnecessary content
  - Minor copy/paste fixes
- CRUD/Filter and Sort Data: Add a new "Unsupported LINQ Operators" section listing LINQ operators that are not currently supported by the Realm .NET SDK
- Manage Users/Authenticate Users: Add a new "Get a User Access Token" section with an example function showing how to get a refreshed user access token
- Sync Data/Add Sync to an App: Fix a copy/paste artifact

## React Native SDK

- Install: Update "Prerequisites" to point to reactnative.dev docs, list a minimum required version, and link to the Compatability Chart in the realm-js repository
- Quick Start: Update "Prerequisites" to refer to the React Native SDK instead of the Node SDK
- Major Information Architecture refactor, including:
  - Move "Fundamentals" content onto relevant topic-based pages
  - Rearrange table of contents to present topic-based navigation instead of content-typed navigation
  - Split long pages (Define a Realm Object Model, Read & Write Data, Sync Changes Between Devices) into sections with smaller pages

## Swift SDK

- Realm Files/Configure & Open a Realm: Change a link to point to a more relevant section of the docs
- Model Data/Define an Object Model/Object Models: New "Remap a Property Name" section with a tested code example showing how to map a property name in your project to a different name - i.e. a snake-case Device Sync schema property name
- Manage Users/Authenticate Users: New "Get a User Access Token" section with tested code examples showing how to get and refresh a user access token

## Realm Studio

- Modify a Realm File: Add information about Realm Studio using the "Flatted" package, and how to parse it

## Other

- Add an `include` to be shared across docs about how to find an App ID, linking to the relevant page in App Services, and add this to all of the SDK Quick Starts
- Internal
  - Add a new checklist to the PR template
  - Add and update redirects from the .NET information architecture updates
  - Update dependencies in the readability GitHub workflow
  - Add a README.md to the C++ code example project explaining how to get set up, run the tests, and add examples
  - Change the C++ example project to use the Realm C++ SDK as a CMake/FetchContent dependency instead of a git submodule
  - Fix some broken external links causing Snooty build errors
  - Various Snyk upgrades and version bumps in example apps

# November 25, 2022

## Flutter SDK

- User Management: New landing page with high-level details about user management

## .NET SDK

- Major Information Architecture refactor, including:
  - Move "Fundamentals" content onto relevant topic-based pages
  - Rearrange table of contents to present topic-based navigation instead of content-typed navigation
  - Split long pages (Define an Object Model, Read & Write Data, Sync Changes Between Devices) into sections with smaller pages
  - Add new pages: Delete a Realm, Add Sync to an App

## Web SDK

- Install the Realm Web SDK: Update the CDN installation instructions to a base URL using a more recent version.
- Query MongoDB: Change `CLUSTER_NAME` to `DATA_SOURCE_NAME` in example

## Other

- Various Snyk and Dependabot upgrades and version bumps in example apps
- Typo fix in an include displayed across many pages

# November 18, 2022

## Flutter SDK

- Quick Start: Remove some content to match structure of other SDK quick starts
- Model Data: New section that organizes some pages from the top-level Flutter SDK navigation, adds a new top-level page with some concept information
  - Define a Realm Object Schema: Page moved from top level of Flutter SDK navigation, split some info out into smaller pages
  - Data Types: Page moved from top level of Flutter SDK navigation
  - Relationships: New page with existing content moved from Define a Realm Object Schema
  - Property Annotations: New page with existing content moved from Define a Realm Object Schema
  - Update a Realm Object Schema: Page moved from top level of Flutter SDK navigation
- Realm Database/Read & Write Data: New "Create Multiple Objects" section showing how to add multiple objects to a realm with the `Realm.addAll()` method
- Atlas App Services
  - Call a Function
    - Add the code for the App Services Function that the page calls in the example
    - Small updates to arguments when calling a function in `0.8.0+rc`
- Various pages
  - Update code examples to show using an `ObjectId` primary key
  - Update code examples to use `final` in variable declarations per preferred community practice

## React Native SDK

- Usage Examples/Debugging with Flipper: New page showing how to use the Flipper Debugger to debug Realm apps built with React Native

## Swift SDK

- Swift Concurrency: New page providing guidance about how to use Realm with Swift concurrency features
- SwiftUI
  - Write Data: New sections with code examples showing more complex write cases
  - Sync Data in the Background: New page showing how to use Apple's `.backgroundTask` to sync Realm data in the background
- Various pages: Refactor async code examples to show `@MainActor` where applicable

## Other

- Add several notes across all SDKs about:
  - Performance and storage implications of adding an Index
  - Advising developers using Sync to keep objects in memory until edits are complete to prevent excessive writes
  - Details about encrypting realms when using Sync or accessing encrypted realms from multiple processes

# November 11, 2022

## Flutter SDK

- Landing Page: Update "Beta" to "Release Candidate" or "RC" in landing page text and navigation
- Realm Database
  - Define a Realm Object Schema
    - Add supported data types to the "Indexed" section
    - New "Inverse Relationship" section with tested code example and details about backlinks
  - Data Types: Add `parent` property to Embedded Objects docs & code example
  - Compact a Realm: Update docs with details & tested code example for the `Realm.compact()` static method
- Sync Device Data
  - Manage a Sync Session: New section with tested code example showing how to remove all subscriptions to objects of a specific type
  - Handle Sync Errors: New Client Reset section with documentation & code examples for client reset with recovery
- Atlas App Services
  - Update landing page with a new section about calling Atlas functions
  - Call a Function: New page with tested code example for calling Atlas Functions from Flutter SDK

## Kotlin SDK

- Update Realm Kotlin version to 1.4.0
- Realm Database/Schemas/Index a Field: Add `RealmUUID` to supported indexable data types

## .NET SDK

- Install Realm for .NET: Remove an outdated note related to old versions
- Usage Examples/Sync Changes Between Devices: New "Cancel a Sync Session" section with details and code example showing how to use a CancellationToken

## Node.js SDK

- Usage Examples
  - Reset a Client Realm: Update documentation & code examples for client reset with recovery
  - Call a Function: Replace deprecated api key methods
  - Authenticate Users: Replace deprecated api key methods

## React Native SDK

- Usage Examples
  - Define a Realm Object Schema: Add `UUID` to supported indexable data types
  - Reset a Client Realm: Update documentation & code examples for client reset with recovery
  - Call a Function: Replace deprecated api key methods

## Swift SDK

- Install: Update the Carthage installation instructions to use xcframeworks
- SwiftUI/Quick Start: Remove Partition-Based Sync from Quick Start, update login/logout to async/await syntax
- Various pages: Update code examples to change "Task" object naming that conflicts with Swift `Task` keyword

## Web SDK

- User Management/Authenticate Users
  - Replace deprecated api key methods
  - Fix a typo

## Other

- Realm Docs Landing Page: Move Java SDK card to "below the fold", update language around Realm Database
- Remove unused files

# November 4, 2022

## Flutter SDK

- Realm Database
  - Open & Close a Realm: New subsection mentioning compacting a realm and linking to the new Compact a Realm page
  - Compact a Realm: New page with general info about compacting a realm & a code example showing the `shouldCompactCallback()` usage

## Kotlin SDK

- Install/Kotlin Multiplatform: Point to the correct Realm Kotlin dependency when used across Gradle Modules
- Sync/Open a Synced Realm: Switch the order of the Partition-Based Sync and Flexible Sync tabs to show Flexible Sync first
- Atlas App Services/Link User Identities: New page with tested code example showing how to link credentials

## .NET SDK

- Quick Start: Integrate Quick Start & Quick Start with Sync into one Quick Start, update for Flexible Sync
- Fundamentals
  - Write Transactions: Add info about `cancellationToken`
  - Atlas Device Sync: Add new section about Unidirectional Sync with link to new Unidirectional Sync page
  - Unidirectional Data Sync: New page with details and tested code example for how to use Asymmetric Sync

## React Native SDK

- Use Realm React: Add a note about version requirements for using Realm React with Realm JS Version 11

## Web SDK

- Apollo GraphQL Client (React): Update the method name and add details around refreshing the access token

## Other

- Realm Query Language: Remove `IN` operator from unsupported Flexible Sync operators; add details around using `IN` with Flexible Sync

# October 28, 2022

## Tutorials

- Removed section. Moved tutorials to Atlas App Services at: https://www.mongodb.com/docs/atlas/app-services/get-started/

## Flutter SDK

- Realm Database
  - Define a Realm Object Schema: Update Embedded Object support with details & link to Data Types page
  - Read & Write Data: New "Background Writes" section with details & tested code example for `writeAsync`
  - Data Types: New "Embedded Objects" section with details & tested code examples
- Sync Device Data/Open Synced Realm: New "Open a Realm After Downloading Changes" with async open details & tested code examples
- Various pages: Change styling of cross-links from "Tip" callout boxes to regular text links

## Java SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## .NET SDK

- Advanced Guides/Client Resets: Update client reset handler documentation for Client Recovery, with new tested code examples

## React Native SDK

- Install Realm for React Native: Add an optional step to React Native v.60+ install tab about enabling Hermes

## Swift SDK

- CRUD/Threading: Update the code example for using `@ThreadSafe` wrapper on a function parameter to show correct `@MainActor` usage
- Test Suite: Fix a failing test related to upgrading to Xcode 14.x

## Other

- Introduction: Remove tutorials from "Get Started" section, add links to SDK landing pages
- All SDK landing pages: Small tweaks to new styling & images to improve consistency
- Various Snyk dependency version updates

# October 21, 2022

## Flutter SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info
- Realm Database/Freeze Data: New page documenting the ability to freeze objects in the Flutter SDK, with tested code examples
- Various pages: Minor tweaks incorporating review feedback across several pages

## Node.js SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## React Native SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## Swift SDK

- Why Realm Database?: Add mention of sectioned results to "Live Queries"
- Model Data/Define an Object Model/Supported Types: Add details around SectionedResults/ResultsSection
- CRUD/Read: New "Section Query Results" section with details and tested code examples
- SwiftUI
  - React to Changes: New "Observe Sectioned Results" subsection with details and tested code examples for `@ObservedSectionedResults`
  - Filter Data: New "Section Filtered Results" section with details and tested code example for `@ObservedSectionedResults`
- Sync Data/Handle Sync Errors: Add documentation & code examples for client reset with recovery

# October 14, 2022

## Flutter SDK

- Realm Database

  - Data Types: Added that nullable types in lists are supported.
  - Define a Realm Object Schema: Added that primary keys are nullable
  - Read & Write Data: Added section on how to upsert an object using Realm.add()
  - Encrypt a Realm: Added documentation on encrypting a realm
  - Update a Realm Object Schema: Created this new page to add details on manual migration using the migrationCallback configuration
  - Open & Close a Realm: Added note about new 'Update a Realm Object Schema' page.

- User Management
  - Authenticate Users: Note about breaking change to email/password authentication when an app uses a version greater than 0.5.0. User will need to reset password or create a new account.
  - Authenticate Users: Documented API key user authentication

## C++ SDK

- Maintenance to landing page wording
- Added note about update for C++17 support

## Kotlin SDK

- Updated the landing page to create better getting started flow

## React Native SDK

- Define a Realm Object to Schema: Documented Asymetric Sync support in new section, 'Define an Asymmetric Object'.

## Web SDK

- Quick Start with React: Clarified name of the quick start from 'Realm - React Quick Start' to 'Quick Start with React'

## Other

- Added contribution guide to the documentation repository
- Realm Query Language: Added section on backlink query syntax
- Removed .. default-domain:: mongodb directive from the docs
- Updated Jest to version ^29.0.0 and realm to ^10.21.0

# October 7, 2022

## Flutter SDK

- Realm Database
  - Define a Realm Object Schema: Add details for how to declare Realm models across multiple files (public vs. private)
  - Bundle a Realm: New page with procedure and tested code examples showing how to bundle a Realm in a Flutter app
- Sync Device Data
  - Open Synced Realm: Add link to new Handle Sync Errors page, clarify details about opening a Flexible Sync realm
  - Handle Sync Errors: New page with info and code example showing how to handle sync errors

## Kotlin SDK

- Quick Start
  - Grammar and typo fixes
  - Change `user.identity` to `user.id`
- Realm Database/Schemas/UUID: New page with info & tested code example showing how to generate a `RealmUUID`
- Atlas App Services
  - Register Users: Change `user.identity` to `user.id`
  - Authenticate Users: Add details & code example to Anonymous documentation showing how to reuse an anonymous user
  - Delete Users: New page with info and tested code example showing how to delete users
- Bump Kotlin SDK version used in docs

## .NET SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## Swift SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## Web SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info
- Move the Next.js Integration Guide to a more prominent position in the table of contents

# September 30, 2022

## Web SDK

- Next.js Integration Guide: New page with code examples showing how devs can use Next.js with the Realm Web SDK

# September 23, 2022

## Tutorials

- Fix the return character in the CLI create template app command in Xamarin, Flutter, Kotlin and SwiftUI tutorials

## Flutter SDK

- Realm Database/Data Types: New `DateTime` subsection with information and code example

## Node.js SDK

- Usage Examples/Query Data: Add tested code example for constructing a query

## React Native SDK

- Usage Examples/Query Data: Add tested code example for constructing a query

## Swift SDK

- Model Data/Define an Object Model: New "Define an Asymmetric Object" section
- CRUD/Create: New "Create an Asymmetric Object" section
- Sync Data
  - Configure & Open a Synced Realm: Update note to specify not to use subscriptions with Asymmetric Sync
  - Flexible Sync: Add a note that Asymmetric Sync does not require a subscription
  - Stream Data to Atlas: New page with code examples about how to use Asymmetric Sync in the Swift SDK

## Other

- Realm Query Language: New "Nil Type" section

# September 16, 2022

## Flutter SDK

- Realm Database/Data Types: Remove outdated information about supported data types

## Kotlin SDK

- Fix broken links to API reference docs across various pages

## .NET SDK

- Install: General updates including updating screenshots, adding wording about installing the SDK for all projects, removing deprecated information
- Usage Examples/Modify an Object Schema: Typo fix

## React Native SDK

- Test & Debug: "Clean Up Tests": add suggestion and updated code example showing Jest's built-in `beforeEach()`
  and `afterEach()` hooks when testing

## Swift SDK

- Simplify the Quick Starts section, including:
  - Consolidate local and Sync Quick Starts into a single quick start for both local and Sync
  - Update Quick Start Sync details to show Flexible Sync
  - Move Xcode Playgrounds page to a top-level navigation item for Swift SDK
  - Remove the "Quick Starts" directory and instead point to the single consolidated quick start page
- SwifUI/Quick Start: Fix broken link to API reference doc
- Add a new Tip alongside async/await code examples to access Realm on the `@MainActor` to avoid threading-related crashes
- Update the iOS unit test suite for Xcode 14

## Other

- Set up a GitHub Workflow to run Dart unit tests for Flutter SDK code examples
- Update the iOS GitHub Workflow for Xcode 14

# September 9, 2022

## Tutorials

- Create new tutorials based on Template Apps using Flexible Sync for:
  - iOS with SwiftUI
  - Android with Kotlin
  - Xamarin (iOS and Android) with C#
  - React Native with JavaScript
  - Flutter with Dart
- Remove old Partition-Based Sync tutorials based on the clone-and-go backend

## C++ SDK

- New C++ section consisting of:
  - Landing page with installation instructions and usage examples
  - Generated API Reference using Doxygen
  - Link to the GitHub repository

## Flutter SDK

- Quick Start: Add new section with tested code example for adding Device Sync (Flexible Sync) to an app
- Install Realm: Add note about incompatibility with Dart 2.17.3
- Realm Database/Define a Realm Object Schema: Update supported primary key types to include `ObjectId` and `Uuid`

## .NET SDK

- Fundamentals/Data Binding: Formatting and grammar improvements

## Other

- Realm Query Language: New section with info and tested code examples for List comparisons
- Landing page: Fix broken link to Realm Introduction
- Replace smart quotes with mono quotes across several pages

# September 1, 2022

## Flutter SDK

- Open & Close a Realm: New section with tested code example for customizing the default configuration
- Sync Device Data/Sync Multiple Processes: New page showing how to use Realm with Sync from multiple processes

## Kotlin SDK

- Quick Start: Add new sections with tested code examples for:
  - Watch for Changes
  - Close a Realm
  - Adding Device Sync (Flexible Sync) to an app
- Sync/Subscribe to Queryable Fields: Styling bug fix in a section header

## .NET SDK

- Fundamentals/Data Binding: New page with tested code examples showing common data binding scenarios
- Advanced Guides/Convert Between Non-Synced Realms and Synced Realms: New page with tested code examples for using the WriteCopy API to copy Realms for different configurations

## Swift SDK

- Landing page: Add section with a SwiftUI example and link to SwiftUI docs
- SwiftUI Landing Page: Add link to template apps
- Move SwiftUI Quick Start to SwiftUI section

## Web SDK

- Re-organize the Web SDK table of contents to present a more task-based information architecture
- User Management: New page with information about managing users
- Atlas App Services: Add summaries of App Services features, with links to related documentation

## Other

- Improvements for the Readability GitHub workflow

# August 26, 2022

## Flutter SDK

- User Management/Authenticate Users
  - Add an example for multiple anonymous users
  - Add new auth provider documentation for Custom JWT, Custom Function, Facebook, Google, Apple

## Kotlin SDK

- Sync/Subscribe to Queryable Fields: Bug fix in the Update Subscription example

## Swift SDK

- Update deprecated RLM_ARRAY_TYPE to RLM_COLLECTION_TYPE macro in a few Objective-C code examples
- Convert SwiftUI docs page into a new SwiftUI docs section w/tested View code examples
- Update the iOS Test Suite README with information about creating & running the new SwiftUI tests

## Other

- Product naming updates across many pages to improve first/subsequent naming compliance and other naming issues
- General maintenance including: fix broken links, remove deprecated files, update CI

# August 19, 2022

## Flutter SDK

- User Management/Delete a User: New page documenting deleting users, with tested code example

## Swift SDK

- React to Changes: New "Notification Delivery" section describing notification delivery guarantees

## Other

- Java SDK & Kotlin SDK: Improved Gradle documentation and dependency management across example projects
- Various Snyk upgrades and version bumps in example apps

# August 12, 2022

## Node.js SDK

- Landing page: Bug fix in "Update Live Objects" code example

## Other

- Realm docs landing page: Update Hero image
- Various Snyk upgrades and version bumps in example apps

# August 5, 2022

## .NET SDK

- Usage Examples/React to Changes: Add a new section with tested code examples for "Check if the Collection Has Been Cleared"

## Node.js SDK

- Usage Examples
  - Open & Close a Realm: Add a note about `WriteCopy` only supporting Partition-Based Sync
  - Flexible Sync: Remove `reRunOnOpen` API from docs

## React Native SDK

- Usage Examples
  - Open & Close a Realm: Add a note about `WriteCopy` only supporting Partition-Based Sync
  - Flexible Sync: Remove `reRunOnOpen` API from docs

## Swift SDK

- Sync Data/Configure & Open a Synced Realm: Add a note about `writeCopy` only supporting Partition-Based Sync
- Code examples and docs updated across 10 pages related to Swift SDK IA updates (CRUD operations, data modeling, and Add Device Sync to an App)

# July 29, 2022

## .NET SDK

- Advanced Guides/Client Resets: Update client reset handler docs to reflect `DiscardLocalResetHandler` as default

## Node.js SDK

- Advanced Guides/Access Custom User Data: Update code block formatting to fix syntax highlighting

## Swift SDK

- Install: Typo fix
- Model Data/Model Data with Device Sync: Add section describing how to generate object models from schemas & vice versa
- React to Changes: Note collection change listener example does not support high-frequency updates

## Web SDK

- Install: New page with instructions to install the Web SDK

## Realm Studio

- Open a Realm File: Add an "Error Opening Realm File" section re: realm file version mismatch errors

## Other

- Realm Query Language: Add documentation for additional operators: type, dictionary, and date. Page formatting updates.
- Add Readability check to post readability scores on docs PRs

# July 22, 2022

## Java SDK

- Bump Java SDK version to 10.11.1

## Kotlin SDK

- React to Changes: New page with tested code examples for registering & unsubscribing change listeners

## Node.js SDK

- Fundamentals/Relationships & Embedded Objects: Add code example and docs for dynamically obtaining an inverse linked object

## React Native SDK

- Fundamentals/Relationships & Embedded Objects: Add code example and docs for dynamically obtaining an inverse linked object

## Other

- Various Snyk upgrades and version bumps in example apps
- Various dependabot version bumps in example apps
- Remove admonitions, switch to appropriate admonition types, clean up terms and source constants across all docs pages
- Switch all YAML step files to use new rST procedure directive

# July 15, 2022

## Flutter SDK

- App Services Overview: Add CTA button to "Create an App Services Account"
- Add ObjectID to Flutter RQL example

## Java SDK

- Landing Page: Add CTA button to "Create an Account"
- Fundamentals/Query Engine: Clarify language around RQL, add cross-links
- Usage Examples/Filter Data: Clarify language around RQL

## Kotlin SDK

- Landing Page: Add CTA button to "Create an Account"
- Realm Database/Schemas/Relationships: Update to-many relationship code example from `List` to `RealmList`
- Realm Database/Read/Filter Data: new page w/code example & link to RQL reference
- Update code example README and fix some tests that hang infinitely

## .NET SDK

- Landing Page: Add CTA button to "Create an Account"
- Fundamentals/Query Engine: Minor updates in line with RQL docs updates, removed aggregate operator reference & linked to RQL reference instead
- Fix typo in code examples

## Node.js SDK

- Landing Page: Add CTA button to "Create an Account"
- Usage Examples/Query Data: Move "Query Engine" from Advanced Guides to Usage Examples, refactor based on RQL docs updates

## React Native SDK

- Landing Page: Add CTA button to "Create an Account"
- Usage Examples/Query Data: Move "Query Engine" from Advanced Guides to Usage Examples, refactor based on RQL docs updates

## Swift SDK

- Landing Page: Add CTA button to "Create an Account"
- Install: Update instructions to remove fixed release version & instead link to SDK releases page
- Major Information Architecture refactor, including:
  - Move "Fundamentals" content onto relevant topic-based pages
  - Rearrange table of contents to present topic-based navigation instead of content-typed navigation
  - Split long pages (Define an Object Model, Read & Write Data, Sync Data Between Devices) into sections with smaller pages
  - Add new pages: Delete a Realm, Model Data with Device Sync, Add Sync to an App

## Web SDK

- Landing Page: Add CTA button to "Create an Account"

## Other

- Introduction to Realm
  - Update naming for product brand guidelines
  - Copy edits to reflect current state App Services
  - Update SDK references
- Realm Query Language
  - Added arithmatic operator section to page
  - Added parameterized queries section to page
  - Moved up the example section for clarity
  - Removed flex sync note from the top of the page
  - Clarified usage of BETWEEN operator
  - Moved the RQL page up a level in the IA
- Various Snyk upgrades and version bumps in example apps

# July 8, 2022

## Flutter SDK

- Sync Device Data/Manage Sync Session: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Java SDK

- Cleanup, standardize, and remove unnecessary callouts
- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Kotlin SDK

- Cleanup, standardize, and remove unnecessary callouts
- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page
- Update Kotlin SDK to 1.0.1

## .NET SDK

- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Node.js SDK

- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## React Native SDK

- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Swift SDK

- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Reference

- Realm Query Language: Document querying ObjectID & UUID

## Misc

- Update some Node.js/Web code examples based on feedback

# July 1, 2022

## Kotlin SDK

- Handle Errors: New Section w/overview of types of errors
  - Realm Errors: New Page w/tested code examples and guidance around error handling
  - App Errors: New page w/tested code examples and guidance around error handling

## Node.js SDK

- Usage Examples/Query MongoDB: Add Aggregation Operations w/tested code examples

## React Native SDK

- Install: Add note about Expo v45 not supported on Android.
- Usage Examples/Query MongoDB: Add Aggregation Operations w/tested code examples

## Swift SDK

- Landing Page & Install: Update Apple deployment targets and minimum Xcode version
- Usage Examples/Flexible Sync: Add note about Combine support for Flexible Sync
- Usage Examples/SwiftUI Guide
  - Open a Realm with a Configuration: Clarify using SwiftUI w/configurations based on docs feedback
  - Use Realm w/SwiftUI Previews: New section w/guidance & tested code examples

## Web SDK

- Atlas App Services/MongoDB Data Access: Add Aggregation Operations w/tested code examples

## Misc

- Add redirects for App Services/Reference content

# June 24, 2022

## .NET SDK

- Add "Work with Users" section, move authentication-related pages from Usage Examples and Advanced Guides into this section
  - Add information & code examples for deleting a user and deleting the user's Custom User Data
  - Add information & code examples for reading user metadata

## Node.js SDK

- Usage Examples/Flexible Sync: Add docs & code examples for initial subscriptions & reRunOnStartup

## React Native SDK

- Usage Examples/Flexible Sync: Add docs & code examples for initial subscriptions & reRunOnStartup

## Swift SDK

- Event Library: New page w/SDK implementation details for the Event Library

# June 17, 2022

## Tutorial

- Task Tracker (Web): Remove unnecessary dependencies that conflict with Create React App base config

## Flutter SDK

- Sync Device Data/Manage Sync Session: Update docs on behavior of updating a Flex Sync subscription, update tested code examples

## Kotlin SDK

- App Services/Authenticate Users: Link to related docs for auth examples on other platforms

## .NET SDK

- Usage Examples/Flexible Sync: Add info & code for bootstrapping realm with initial subscription

## Swift SDK

- Usage Examples
  - SwiftUI Guide: Clarify SwiftUI migration details based on user feedback
  - Flexible Sync: Update `rerunOnOpen` example to show re-computing vars
- Unit Tests: Add delays to Sync tests to fix failures
- Generate new code examples for updates renaming Realm App to App Services

## Reference

- Restore section after App Services docs split w/links to Glossary & Realm Query Language pages

# June 10, 2022

As the documentation is now split into separate repositories, and "App Services" is officially no longer directly associated with Realm Database SDKs, we're moving App Services release notes to the [App Services repository](https://github.com/mongodb/docs-app-services).

## Flutter SDK

- Realm Database
  - Define a Realm Object Schema: new sections for modifying realm schema, using schemas with Device Sync
  - Read & Write Data: Add info about being able to return from write transactions
  - Data Types: Add UUID & ObjectId data types
  - Database Internals: New page w/moved & new content describing details about how realm works
- App Services: new page describing SDK-related App Services for Flutter devs
- Connect to App Services backend: new page w/info & tested code examples
- User Management: new section
  - Authenticate Users: new page w/authentication overview info + examples
  - Email/Password Users: new page w/info & tested code examples
  - Work with Multiple Users: new page w/info & tested code examples
  - Link User Identities: new page w/info & tested code examples
  - Custom User Data: new page w/info & tested code examples
- Sync: New page w/overview info
  - Manage Sync Session: new page w/info & tested code examples
  - Open Synced Realm: new page w/info & tested code examples

## Kotlin SDK

- Update many pages for the Kotlin 1.0 release/GA
  - Generate updated code examples
  - Add links to API reference after 1.0 release/API published
- Sync
  - Overview: Add Flexible Sync info & tested code example
  - Open a Synced Realm: Add Flexible Sync info & tested code examples
  - Subscribe to Queryable Fields: new page w/Flexible Sync info & tested code examples
- App Services
  - Authenticate Users: add tested code examples for all the authentication methods the Kotlin SDK supports

## Java SDK

- Usage Examples/Flexible Sync: Remove note about Flexible Sync being in Preview

## .NET SDK

- Usage Examples
  - Sync Changes Between Devices: Update API reference link
  - Flexible Sync: Remove note about Flexible Sync being in Preview
- Advanced Guides/Client Resets: Add links to API reference

## Node.js SDK

- Usage Examples
  - Define a Realm Object Schema: new section for Define an Asymmetric object
  - Flexible Sync: remove note about Flexible Sync being in Preview

## React Native SDK

- Use Realm React
  - Code cleanup & updates to the `@realm/react` examples application + generate updated code examples
  - Add a new section about using the `AppProvider`/new Sync hooks
- Usage Examples/Flexible Sync: remove note about Flexible Sync being in Preview

## Swift SDK

- Quick Starts/SwiftUI Quick Start: Add Flexible Sync to the SwiftUI quick start
- Usage Examples
  - Flexible Sync
    - Update the docs & code examples for breaking API changes
    - Add ability to query all objects of a type
    - Add `initialSubscriptions` and `rerunOnOpen` examples
    - Remove note about Flexible Sync being in Preview
  - SwiftUI Guide: Update the "Open a Synced Realm" section w/Flexible Sync property wrappers

Many pages/Misc.

- Rename MongoDB Realm -> App Services
- Update title lines to fix Snooty build complaints
- Bump dependencies in tutorials

# May 27, 2022

## SDK Docs

Various changes related to separating App Services & SDK docs:

- Move SDKs up one level so each SDK is now an entry in the main ToC
- Remove Get Started section
- Move "Intro for Mobile Developers" to top-level ToC and call it "Introduction"
- Remove App Services-related tutorials (moved to App Services docs)
- Move Unity tutorial to .NET SDK docs to unify "Tutorials" to be only the Task Tracker tutorial
- Remove Release Notes from ToC; App Services now has Cloud-side release notes, and each SDK has its own release notes

### Java SDK

- Update generated API reference docs to fix incorrectly-rendered links related to characters that need to be escaped
- Update Java SDK version in unit tests

### Swift SDK

- Install: Add missing dependency to Static Framework install instructions

## MongoDB Cloud Docs

Various changes related to separating App Services & SDK docs:

- Landing page: Update cards w/App Services-relevant info
- Introduction: New page. Moved & consolidated from docs-realm Intro for Backend Developers/Intro for Web Developers
- Template Apps: Move page from Manage & Deploy Realm apps/Create to top-level nav
- Tutorials: New section w/App Services-relevant tutorials moved from docs-realm
- Realm SDKs: Add ToC link to Realm SDKs

### Realm Sync

- Realm Sync/What is Realm Sync/Realm Sync Overview: Remove "Preview" from Kotlin/Flutter SDK link descriptions

### Users & Authentication

- Users & Authentication: Fix incorrect refresh token length, add clarifications

### GraphQL API

- GraphQL API: Add note about mutations and custom resolvers using transactions
- GraphQL Types, Resolvers, and Operators
  - Add FindMany limit
  - Clarify that GraphQL represents undefined as an empty object
  - Note that GraphQL RelationInput cannot simultaneously create and link

### Reference

- Authenticate HTTP Client Requests: Fix incorrect refresh token length, add clarifications

Realm Admin API

- Add info to configure resume operation with `disable_token`
- Add Rules endpoint info for working with a linked data source:
  - Get all rules: GET /services/{DataSourceID}/rules
  - Create a rule: POST /services/{DataSourceID}/rules
  - Get a rule: GET /services/{DataSourceID}/rules/{RuleID}
  - Update a rule: PUT /services/{DataSourceID}/rules/{RuleID}
  - Delete a rule: DELETE /services/{DataSourceID}/rules/{RuleID}

# May 20, 2022

## SDK Docs

### Java SDK

- Usage Examples/Authenticate Users: Add "Offline Login" example

### Swift SDK

- Usage Examples/Read & Write Data: Add a new section "Perform a Background Write" that covers Swift async writes
- Advanced Guides/Threading: Add a "see also" to the page pointing to the new async write documentation
- Examples/README.md: Update with info about running the unit tests with SPM

### .NET SDK

- Advanced Guides/Client Reset: Update code examples for discard local client reset

### Node.js SDK

- Read & Write Data: Rephrase language around JS bulk update for accuracy

### React Native SDK

- Read & Write Data: Rephrase language around JS bulk update for accuracy

### Various Infrastructure Updates

- Remove MongoDB Cloud docs from docs-realm repository, add redirects
- Update unit tests to prepare for Bluehawk 1.0 release

## MongoDB Cloud Docs

### Manage & Deploy Realm Apps

- Deploy Manually/Roll Back Deployments: Add note that rolling back does not re-deploy hosted files

### Realm Sync

- Handle Errors/Sync Errors: Separate the information on handling sync errors and setting the client log level

### MongoDB Data Sources

- MongoDB Data Sources: Add information about limited Atlas Serverless support

### Users & Authentication

- Authentication: Add refresh token expiration after 30 days
- Authentication Providers/API Key Authentication: Add server API key limit

### HTTPS Endpoints

- HTTPS Endpoints: Add a new Return Types section

### Functions

- Functions: Consolidate procedures from Call a Function, Define a Function, update examples & refresh page

### Reference

- Authenticate HTTP Client Requests: Add refresh token expiration after 30 days
- Realm Admin API: Add GraphQL Endpoints
  - Run a query or mutation
  - Get custom resolvers
  - Create a custom resolver
  - Get a custom resolver
  - Modify a custom resolver
  - Delete a custom resolver
  - Get validation settings
  - Modify validation settings

# May 12, 2022

## SDK Docs

### Swift SDK

- Test and Debug: Add section to help diagnose and debug schema discovery errors

### Node.js SDK

- Quick Start: Typo fix

Usage Examples

- Reset a Client Realm: Fix incorrect syntax in client reset code examples
- Open and Close a Realm: Add "open a realm offline" examples
- Authenticate Users: Add "offline login" example

### React Native SDK

Usage Examples

- Reset a Client Realm
  - Fix title case in section title
  - Fix incorrect syntax in client reset code examples
- Open and Close a Realm: Add "open a realm offline" examples
- Authenticate Users: Add "offline login" example

## MongoDB Cloud Docs

MongoDB Data Access -> Rename to MongoDB Data Sources

- Move the content from the _Link a Data Source_ page onto _MongoDB Data Sources_ page
- Rearrange ToC so this section now includes the following pages:
  - CRUD & Aggregation APIs
  - Read Preference
  - Wire Protocol
  - Document Preimages
  - Internal Database Usage
- Various updates across pages within the section

Starting Wednesday, May 11, there was a publishing freeze on MongoDB Cloud Docs.
This is a temporary freeze while we do some infrastructure adjustments; we hope
to be publishing to these docs again next week.

# May 6, 2022

## SDK Docs

### Java SDK

Usage Examples

- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection

### Swift SDK

Usage Examples

- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection

### .Net SDK

Usage Examples

- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection
- Sync Changes Between Devices: Add new section about checking Connection State, related updates

### Node.js SDK

Usage Examples

- Open and Close a Realm: Clarify behavior if you write a copied realm to a realm file that already exists
- Reset a Client Realm: Add documentation for the Discard Unsynced Changes client reset strategy
- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection

Advanced Guides

- Manual Client Reset Data Recovery: New page showing how to manually recover unsynced changes after a client reset
- Multi-User Applications: Fix a code example include pointing at the wrong code snippet

### React Native SDK

Usage Examples

- Open and Close a Realm: Clarify behavior if you write a copied realm to a realm file that already exists
- Reset a Client Realm: Add documentation for the Discard Unsynced Changes client reset strategy
- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection

Advanced Guides

- Manual Client Reset Data Recovery: New page showing how to manually recover unsynced changes after a client reset
- Multi-User Applications: Fix a code example include pointing at the wrong code snippet

### Kotlin SDK

Realm Database

- Serialization: New page on using serialization methods from libraries that depend on reflection
- Schemas
  - New pages for:
    - Ignore a Field
    - Index a Field
    - Optional Fields
    - Primary Keys
    - Relationships
    - Timestamps
  - Supported Types: Update supported types
- Update/Update a Collection: New page about how to update a collection

### Flutter SDK

- Realm Database/Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships

## MongoDB Cloud Docs

Realm Sync

- Configure and Update Your Data Model/Enable or Disable Development Mode: Add note about user needing write access to data in order to use Dev Mode to update schema
- Data Access Patterns/Flexible Sync: Update eligible field types to clarify array support

Schemas

- Relationships: Add info about relationship limitations
- Remove a Schema: New page with procedure to remove a schema

Rules

- Configure Advanced Rules: Add link to relationship configuration reference

GraphQL API

- GraphQL Overview: Clarify how Realm GraphQL uses a code-first approach, add limitations

Functions

- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection
- Query MongoDB Atlas
  - Write: New page combining Insert, Update, Delete, Transactions, and Bulk Writes
  - MongoDB API Reference: Move & combine content from old location (MongoDB Actions)

Triggers

- Database Triggers: Add note about Project Expressions being inclusive only

Static Hosting

- Enable Hosting: Remove CLI from static hosting page as you can't currently use it w/static hosting

Reference

- Realm Admin API: Add API endpoints to get and update Realm Hosting config
- Realm Query Language: Remove `IN` and collection operators from unsupported Flexible Sync operators

- Remove legacy links from sidebars for SEO purposes

## Various Dependency Updates

- Bump async from 2.6.3 to 2.6.4
- Bump cross-fetch from 3.1.4 to 3.1.5
- Bump ejs from 3.1.6 to 3.1.7

# April 29, 2022

## SDK Docs

### .Net SDK

Usage Examples

- Open a Realm: Make `FlexibleSyncConfiguration` a link to API docs
- Authenticate Users: Add section about "Offline Login"

### Node.js SDK

- Usage Examples -> Open and Close a Realm: Add documentation for opening local realm as synced and synced realm as local
- Fix broken JS/TS tests

### React Native SDK

- Usage Examples -> Open and Close a Realm: Add documentation for opening local realm as synced and synced realm as local

### Flutter SDK

- Move Flutter SDK pages about Realm Database to a new Realm Database section

### Web SDK

- MongoDB Realm -> Manage Email/Password Users: Correct a link to retry a user confirmation function

## MongoDB Cloud Docs

### Schemas

- Enforce a Schema: add a section about validating null types
- Relationships: add a note about the fact that relationships cannot span partitions

### Functions

- JavaScript Support: New page that combines "Built-In Module Support" & "JavaScript Feature Compatibility"
- External Dependencies: New page that combines "Add External Dependencies" and "Import External Dependencies"

Query MongoDB Atlas

- Move the Query MongoDB Atlas section to Functions in the navigation
- Rename "Find Documents" to "Read Data from MongoDB Atlas - Functions" & expand an example
- Aggregate: Rename "Run Aggregation Pipelines" to "Aggregate Data in MongoDB Atlas - Functions", expand code example

### Logs

- View Logs in the Realm UI: New page

### Reference

- Realm Admin API: Add `unordered` field to DB triggers
- Realm Query Language: Remove `@avg` from Flex Sync supported operation on array fields
- Service Limitations: Update Request Traffic limits info

# April 22, 2022

## SDK Docs

### Java SDK

Usage Examples

- Display Collections: Refactor to improve readability
- Reset a Client Realm: Refactor to improve readability

### Node.js SDK

- Fundamentals -> Write Transactions: Refactor to improve readability

### React Native SDK

- Fundamentals -> Write Transactions: Refactor to improve readability
- Advanced Guides -> Bundle a Realm: Update the page for details specific to RN vs. Node.js process

## MongoDB Cloud Docs

### Realm Sync

Define Data Access Patterns

- Partition-Based Sync: Refactor to improve readability
- Flexible Sync: Update to add arrays of primitives as valid queryable fields

### MongoDB Data Access

Atlas Clusters & Data Lakes -> Document Preimages: Refactor to improve readability

### HTTPS Endpoints

- Create an HTTPS Endpoint: Clarify Webhook vs. HTTPS endpoint body behavior

### Functions

- Context: New page that combines "Access Function Context" and "Context Modules" pages
- Global Modules: New page that combines "Utility Packages" and "JSON & BSON" pages

### Triggers

- About Triggers: Refactor to improve readability

### Reference

- Realm Query Language: Update Flex Sync Unsupported Query Operators (Remove `BETWEEN`, `BEGINSWITH`, `ENDSWITH`, `CONTAINS` as these are now supported)

### Third-Party Services [Deprecated]

- Convert Webhooks to HTTPS Endpoints: Clarify Webhook vs. HTTPS endpoint body behavior

# April 15, 2022

## SDK Docs

### Swift SDK

- Fundamentals -> Realms: Typo fix
- Advanced Guides -> Client Reset: Incorporate tech review feedback
- Usage Examples -> Define a Realm Object Schema: add a note about to-one relationships being optional

### Node.js SDK

- Usage Examples
  - Sync Changes Between Devices: clarify session multiplexing, clarify description of params for syncSession.addProgressNotification()
  - Open & Close a Realm: Typo fix
- Fundamentals -> Realms: Typo fix

### React Native SDK

- Usage Examples
  - Sync Changes Between Devices: clarify session multiplexing, clarify description of params for syncSession.addProgressNotification()

### Web SDK

- Add API Reference docs to Web SDK sidebar
- Remove "Reference" from sidebar and move its two pages up to the main Web SDK sidebar menu
- Fix broken link on main page

### Flutter SDK

- Define Realm Object Schema: fix broken link

## MongoDB Cloud Docs

### MongoDB Data Access

- Atlas Clusters & Data Lakes
  - Rename "Specify Read Preference for a MongoDB Cluster" to "Read Preference"
  - Combine "Enable Wire Protocol Connections" and "Connect Over the Wire Protocol" into a new page called "Wire Protocol"
  - Rename "View & Disable Collection-level Preimages" to "Document Preimages"
  - New Internal Database Usage page with details about system-generated cluster users, transactional locks, and unsynced documents

### MongoDB Realm

- Users & Authentication
  - Authentication Providers: Refactor to improve readability
  - Custom JWT Authentication: Add a Firebase JWT Authentication guide
- Realm Sync: Add client reset warnings to pages that mention terminating sync
  - Define Data Access Patterns -> Partition-based Sync
  - Configure and Update Your Data Model -> Make Breaking Schema Changes
  - Handle Errors -> Client Resets: Add a note about upgrading a cluster causing a client reset
  - Reference -> Upgrade a Shared Tier Cluster

### Admin API

- Create Functions endpoint: update response body
- Create an Endpoint and Modify an Endpoint: fix broken links

Many Pages Across Docs

- Remove alt apostrophe character ’ and replace with '

# April 8, 2022

## SDK Docs

### Java SDK

- Removed no-longer-needed certificate warning for Android 6.0 and below
- Streamlined install page, added guidance on installation for projects that use Gradle's plugin syntax

### .Net SDK

- Fixed list of primary key/indexable types

### Node.JS SDK

- Fixed list of primary key/indexable types

### React Native SDK

- Fixed list of primary key/indexable types

## MongoDB Cloud Docs

### Reference -> Realm Query Language

- Fixed @count limitations

### Manage & Deploy Realm Apps -> Create -> Template Apps

- Cleaned up wording, typos, linkage in the Template Apps page

### Functions

- Updated wording of timeout description to make timeout period more discoverable

# April 1, 2022

## SDK Docs

### Java SDK

- Encrypt a Realm: Add a section about not accessing an encrypted realm from multiple processes
- Sync a Realm in the Background: New page w/tested code examples for syncing Realm in the background
- Link User Identities: Update info and code examples to provide additional guidance

### Swift SDK

- Encrypt a Realm: Add a note to the section about not accessing an encrypted realm which describes the error
- Update several pages with a version requirement table to use Swift async/await syntax/APIs
- Client Reset: Add docs for new client reset mode w/the ability to discard local changes for a seamless client reset
- SwiftUI Guide: Additional information around migration when using SwiftUI
- Threading
  - Add section about realm supporting only serial queues for background threads, not concurrent queues
  - Add note about ThreadSafeReference and @ThreadSafe wrapper conforming to `Sendable`

### .Net SDK

- Encrypt a Realm: Add a section about not accessing an encrypted realm from multiple processes
- Unity: Update known issues:
  - Remove "only supports Intel64 Macs"
  - Clarify issues with multiple processes; specify crashes are related to synced realms only, not local realms

### Node.js SDK

- Encrypt a Realm: Add a section about not accessing an encrypted realm from multiple processes

### React Native SDK

- Test & Debug: New page with recommendations and some basic guidance about testing & debugging
- Encrypt a Realm: Add a section about not accessing an encrypted realm from multiple processes
- Quick Start with Expo: New page w/code examples for using the Realm Expo template to initialize, build and run, and deploy a project
- Use Realm React: New page w/code examples about using the Realm React npm package to use realm through React hooks

### Flutter SDK

- React to Changes: New page about using change listeners w/tested, Bluehawked code examples
- Quick Start: Update Quick Start with tested, Bluehawked code examples for using change listeners

## MongoDB Cloud Docs

- Realm Sync/Define Data Access Patterns/Flexible Sync: Add section for reserved field names
- Users & Authentication
  - Authentication Providers/Anonymous Authentication: Remove refresh token expiration references, emphasize inactive user deletion & explicit logout
  - Enable User Metadata: Refactor to improve readability
- Rules/Expressions
  - Show $Operator over %operator when possible (on this page and in several others)
  - Provide additional information and examples about expansion variables
  - Restructure to remove tables
- Functions/Add External Dependencies: Update `node_module` size cap from 10MB to 15MB
- Values & Secrets: add a link to the info about accessing environment values in a function context
  - Access a Value: add a link to the info about accessing environment values in a function context

# March 25, 2022

## SDK Docs

### Java SDK

- Add note about ISRG Root X1 certificates for Android 6 and lower devices to Install and Troubleshooting pages
- Updates for the generated Java API reference (fix links, add titles to index pages for breadcrumb reasons)
- Updates based on feedback from engineering

### Swift SDK

- Quick Start - Realm in Xcode Playgrounds: New page describing how to use Realm in Xcode Playgrounds, organize Quick Starts under a ToC item
- Fundamentals -> Relationships: Refactor to improve readability
- Authenticate: Update Facebook Auth code example to use current version of FacebookLogin
- iOS Test Suite: Switch dependency manager from CocoaPods to Swift Package Manager
- Collections: Update AnyRealmCollection code example which broke in a recent release
- Update code example for encrypted realms which broke in a recent release
- Authenticate Users: Add code example for Google User showing ID Token authentication

### .Net SDK

- Sync Changes Between Devices: Add note about HelpLink and clarify wording of a few other notes

### Kotlin SDK

- Updates based on feedback from engineering

### Flutter SDK

- Open and Close a Realm: Add sections for read-only realm, in-memory realm, set custom FIFO special file path
- Read and Write Data: Add docs for querying RealmList of RealmObjects, remove note about fllutter for Linux desktop not being supported
- Data Types: New page listing supported data types
- Define a Realm Object Schema: New page describing how to define a Realm Object Schema

## MongoDB Cloud Docs

### Manage & Deploy Realm Apps

- Create -> Template Apps: Add SwiftUI template app to the list of available template apps
- Application Security
  - Add note clarifying the Firewall Configuration IP list only applies to outgoing requests from functions/triggers/HTTPS endpoints, not requests that originate from the Sync server
  - Add note about communication between Realm and Atlas being encrypted with x509 certificates

### Users & Authentication

- Authentication Providers -> Custom Function Authentication: Provide clearer guidance on `identities`, general updates & improvements

Many Docs Pages

- As part of the subdomain consolidation project, many folks updated many URLs across Realm docs pages. Nice work, everyone!
- Various dependabot updates

# March 18, 2022

## Get Started

- Getting Help: Expand description of Professional Support & Forums

## SDK Docs

### Java SDK

- Query Engine: Add link to RQL reference, info about when to use Java SDK Fluent Interface vs. RQL

### Swift SDK

- SwiftUI Guide:
  - Add migration section w/examples
  - Add section about Filtering w/new ObservedResults type-safe query example
- Rename "Reference Manual" in sidebar to "API Reference"

### .Net SDK

- Update Realm .Net version
- Query Engine: Add info for when to use LINQ and when to use RQL
- Flexible Sync: Add link to query engine page, provide info about `Add` method, clarify duplicate subscriptions note
- Rename "Reference Manual" in sidebar to "API Reference"
- Sync Changes Between Devices: Update API reference link and code example for setting log level

### Node.js SDK

- Query Engine: Add link to RQL reference
- Flexible Sync: Add info about supported queries, link to RQL Flex Sync Limitations
- Rename "Reference Manual" in sidebar to "API Reference"
- Update deprecated `serverApiKey` usage to `apiKey` in examples
- Refactor data type unit tests to simplify Bluehawk commands and remove persistent state

### React Native SDK

- Query Engine: Add link to RQL reference
- Flexible Sync: Add info about supported queries, link to RQL Flex Sync Limitations, update Flexible Sync subscription syntax
- Rename "Reference Manual" in sidebar to "API Reference"
- Update deprecated `serverApiKey` usage to `apiKey` in examples
- Refactor data type unit tests to simplify Bluehawk commands and remove persistent state

### Kotlin SDK

- Install process fixes - the definitive version
- Rename "Reference Manual" in sidebar to "API Reference"

### Flutter SDK

- Rename "Reference Manual" in sidebar to "API Reference"

## MongoDB Cloud Docs

### Users & Authentication

- Custom JWT Authentication: add kid header for JWKS

### Sync

- Flexible Sync:
  - Add link from Eligble Field Types to RQL Reference for Flex Sync query options
  - Add links to Node.js and RN Flexible Sync pages
- Choose Your Sync Mode: Update JS Flex Sync query syntax
- Sync Rules and Permissions:
  - Update permissions syntax, fix JSON errors in examples
  - Add info about session roles, expansions, client resets, add Flexible Sync Expansion quick-reference table
- Update Your Schema: Add workaround to avoid changing property name breaking change by using mapTo or similar API in the SDKs that offer it
- Make Breaking Schema Changes: Add early return to partner collection funcs to avoid errors
- Client Resets: Add information about Flex Sync session role changes that cause client resets

### Schemas

- Relationships: add embedded object relationship examples

### Reference

- Realm Query Language Reference: Add links to SDK-specific query pages

Many Docs Pages

- As part of the language update changing "additive" and "destructive" schema changes to "non-breaking" and "breaking" - update references on MANY pages across docs

# March 11, 2022

## Tutorial

- Set up the Backend: Add tutorial video as an embedded video
- iOS with Swift: Add tutorial videos as embedded videos to both Part 1 and Part 2
- Write a Serverless GitHub Contribution Tracker: Tutorial updated to use HTTPS endpoints

## SDK Docs

### Java SDK

- Install: bump required JDK version to 9

### Swift SDK

- Filter Data: Add `IN` type-safe query example per SDK 10.23.0 release

### .Net SDK

- Replace `SyncConfiguration` references with `PartitionSyncConfiguration`
  in copy and code examples

### Kotlin SDK

- Landing Page, Install, Quick Start: small improvements based on SDK team feedback

### Web SDK

- Add GitHub Action to run Web SDK unit tests on relevant PRs

### Flutter SDK

- Read & Write Data: new page with code examples
- Query Language: new page

## MongoDB Cloud Docs

### Sync

- Update a Schema: Major page refactor to more clearly communicate breaking/non-breaking changes to schema and object model
- Make Destructive Schema Changes: naming updated to "Make Breaking Schema Changes" & small tweaks throughout page for naming

### Realm Admin API

- adminGetLogs API endpoint: Add "type" enum and improve "error_only" information

# March 4, 2022

## SDK Docs

### Java SDK

- Switch Java API Reference to use Yokedox-generated output directly in docs site
- Query MongoDB: new section with use cases for querying MongoDB remotely

### Swift SDK

- Configure & Open a Realm: new sections for converting between local/synced
  realms/sync configurations
- Bundle a Realm: New procedures for bundling a synced realm
- Create and Delete Users: new page w/code examples for deleting a user
- Work with Users: new section about creating and deleting users
- Query MongoDB: new section with use cases for querying MongoDB remotely

### .Net SDK

- Query MongoDB: new section with use cases for querying MongoDB remotely

### Node.JS SDK

- Sync Changes Between Devices: Additional information about partition value
- Update Jest configuration to make tested code examples work with Realm Sync
- Query MongoDB: new section with use cases for querying MongoDB remotely

### React Native SDK

- Sync Changes Between Devices: Additional information about partition value
- Query MongoDB: new section with use cases for querying MongoDB remotely

### Kotlin SDK (alpha)

- Install: Additional info
- New section: Realm Database, covering CRUD operations, schemas, open & closing
  a realm, query language, write transactions, and concept information
- New section: Sync, covering concept overview and pening a synced realm
- Migrate from the Java SDK to the Kotlin SDK: New guide w/tested code examples

### Web SDK

- Create Bluehawked & tested code examples for:
  - Work with Multiple Users
  - Create & Manage API Keys
  - Authenticate a User
  - Manage Email/Password Users
  - Link User Identities

## MongoDB Cloud Docs

### Sync

- Sync Rules and Permissions: Flexible Sync: add links and minor tweaks

### Users

- Create a User: additional information about creating users
- Delete a User: new section about deleting users in the SDK

# Feb 25, 2022

## SDK Docs

### Android SDK

- Rename to Java SDK

### .NET SDK

- For `DateTimeOffset`, note that timezone information is lost

### Node.js SDK

- Fixes for Flexible Sync examples, new Add a Query Flex Sync example
- Add documentation for new .deleteUser() method

### React Native SDK

- Fixes for Flexible Sync examples, new Add a Query Flex Sync example
- Add documentation for new .deleteUser() method

### Kotlin SDK (alpha)

- Add page for Sync, including tested code examples

### Web SDK

- Add documentation for new .deleteUser() method
- Convert Apollo GraphQL code examples to tested, Bluehawked code snippets

## MongoDB Cloud Docs

### Sync

- Flexible Sync Roles renamed Flexible Sync Session Roles, more info to clarify Flexible Sync role & rule behavior
- Flexible Sync Configuration: Remove callout about shared clusters not running MDB 5.0

### Functions

- Define a Function: Clarify that you can define functions inside of nested folders

### Manage Realm Apps

- Export a Realm App with Realm API: Fixes for app export procedure

### Triggers

- Fix a redirect loop

### Realm Admin API

- Custom HTTPS endpoints APIs added
- Typo fixes, rearrange and simplify `tags`, and distinguish `summary` from `description` to improve Redoc implementation

# Feb 18, 2022

## SDK Docs

### Android SDK

- Add Flexible Sync callouts re: required subscription and object links

### Swift SDK

- Publish tutorial videos
- Update the tutorial copyright date
- Add a tip about deleting vs. migrating realm when in development
- Add more guidance around compacting
- Add Flexible Sync callouts re: required subscription and object links
- SwiftUI Quick Start improvements

### .NET SDK

- Add a tip about deleting vs. migrating realm when in development
- Add more guidance around compacting
- Add Flexible Sync callouts re: required subscription and object links

### Node.js SDK

- Add a tip about deleting vs. migrating realm when in development
- Add Flexible Sync callouts re: required subscription and object links
- Refactor Relationships & Embedded Objects page to improve readability

### React Native SDK

- Add a tip about deleting vs. migrating realm when in development
- Add Flexible Sync callouts re: required subscription and object links
- Refactor Relationships & Embedded Objects page to improve readability

### Web SDK

- Update examples to tested examples that use Bluehawk

## MongoDB Cloud Docs

### Logs

- Fix Application Log retention time

### HTTPS Endpoints

- Reorganize and expand the HTTPS Endpoints section
- Add HTTPS Authentication info
- Add migration guide to Convert Webhooks to HTTPS Endpoints
- Update configuration

### Third-Party Services

- Replace Services with npm Modules: Add some guidance + examples for Axios, Twilio, AWS

### Custom User Data

- Add size limit guidance
