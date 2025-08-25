# August 9, 2024

## Tutorial

- GitHub webhook integration tutorial was missing the fact that the secret needs to be appended to the URL, not sent as a GitHub secret in the body.

# August 2, 2024

## Device Sync

- Getting Started: Add warning regarding Device Sync query size limit.

- Handle Errors/Sync Errors: Document the `LimitsExceeded` Error in the Flexible Sync Errors table.

## Connect to MongoDB Data Sources

- Internal Database Usage: Add additional option for unsyncable doc limit.

## Device Sync/Define and Update Your Data Model

- Update Your Data Model: Add additional option for unsyncable doc limit.

# July 26, 2024

## Device Sync

- Get Started: Rename references to "Realm" and adjust phrasing for clarity.
- Configure Sync/Sync Settings: Update page to indicate that the Sync Type field only displays for Partition-Based Sync apps and move the "Cluster to Sync" section to the top of the page.
- Go to Production with Sync/Optimize Sync Storage in Atlas: Remove references to disabling client maximum offline time and update Device Sync settings screenshot to remove Enable Max Offline Time field.
- Migrate Sync Modes: Update migration instructions and corresponding screenshots to reflect recent Device Sync UI changes.

## Authenticate & Manage Users

- Define User Metadata: Create a new section on updating permissions using custom user data.

## Define a Data Model

- Schemas/Schema Data Types: Add link to Node.js Counters page under the list of SDKs that support counters.

# July 12, 2024

## Tutorials

- All Device Sync Tutorials: Note that the downloaded .zip file may appear empty for Windows users, and recommend using a third-party zip utility as a workaround.

## Device Sync

- App Builder's Resources/Device Sync Permissions Guide: Fix a typo in "Create subscribeToUser Function" section and add metadata to the page.
- Go to Production with Sync/Compact an Atlas Volume: Remove outdated information and update procedure with link to the Test Primary Failover page in the Atlas documentation.

## Authenticate & Manage Users

- Define User Metadata: Fix a typo in "User Creation Function" section.

## Connect to MongoDB Data Sources

- CRUD & Aggregation APIs: Remove `$currentOp` from the list of aggregation pipelines stages.
- Internal Database Usage: Update "Unsynced Documents" section to note that with more than 100,000 unsyncable documents, users must manually terminate Sync, fix the documents, and re-enable Sync.

## Define a Data Model

- Schemas/Define & Enforce a Schema: Add screenshot of the "Schemas" UI to the "Define a Schema" procedure for the App Services UI.

## Monitor App Activity

- Activity Feed & Alerts: Add a link from the "Custom App Services Alerts" section to the App Services Metrics Reference.

## Reference

- App Services CLI: Regenerate and add updated documentation pages for App Services CLI and all children pages.
- Partition-Based Sync Mode: Added a link to the migration guide from PBS to Flexible Sync.

## Other

- Throughout the docs: Remove old mentions of `realm_config.json` and replace with current name, `root_config.json`.
- Internal: Update redirects for deprecated `realm-cli` pages to include the missing path directory.

# July 5, 2024

## Data API

- Data API Endpoints: Add note indicating that private endpoints do not support Data API Endpoints.
- Custom HTTPS Endpoints: Add note indicating that private endpoints do not support HTTPS Endpoints.

## Authenticate & Manage Users

- Define User Metadata: Fix typo and update references using "Realm" to "Atlas Device SDK."

## Secure Your App

- Use a VPC Private Endpoint (Preview): Remove guidance on migrating to HTTPS endpoints and Data API.

## Reference

- Billing:

  - Update formatting of free tier thresholds to represent independent threshold
    model.
  - Update page with new billing practice, including new daily free tier limits.

## Release Notes

- Update external changelog with release notes for the CLI, Atlas Events, and more.

## Internal

- Add files for Netlify workflow.

# June 28, 2024

## Device Sync

- Configure and Update Your Data Model/ Data Model Mapping: Correct the minimum Swift SDK version number listed in the Collections in Mixed note.

## Connect to MongoDB Data Sources

- CRUD & Aggregation APIs: Add `distinct` and `explain` to the list of unsupported database commands. Update descriptions for the `$search` and `$out` aggregation pipeline stages.

# June 21, 2024

## Other

- Throughout docs
  - Typo fixes: Change "the the" to "the" on several pages.
  - Add meta information for internal search improvements to pages with the typo fixes.
  - Replace images on the App Services, and Device Sync landing pages with images that are more compatible with upcoming dark mode support.

# June 14, 2024

## Device Sync

- Configure and Update Your Data Model/Data Model Mapping: Update note for `Mixed Properties` to specify the Collections in Mixed feature is only valid for App Services Apps created after `May 28, 2024`.
- Define a Data Model/Schemas/Schema Data Types: Update note for `Mixed` data type to specify the Collections in Mixed feature is only valid for App Services Apps created after `May 28, 2024`.

## Triggers

- Database Triggers: Fix typos and a formatting issue.

## Authenticate & Manage Users

- Authentication Providers/Custom JWT: Add note about escaping a period for the `path` metadata field and update link to Server documentation on dot notation.

## Release Notes

- Update external changelog with release notes for the updated Function Editor, Collections in Mixed, and more.

# June 7, 2024

## Device Sync

- Configure and Update Your Data Model
  - Create a Data Model: Updates for readability and clarity.
  - Data Model Mapping:
    - Add new "Mixed Properties" section.
    - Update "Example" section to demonstrate nested collections of mixed data.
    - Update "Geospatial" section with content moved from Schema Types page.
- Technical Details
  - Conflict Resolution:
    - Add new "Dictionaries" section to clarify how Device Sync handles conflicts with dictionary keys.
    - Add new "Nested Collections" section.

## Define a Data Model

- Schemas/Enforce a Schema: Update page title to "Define & Enforce a Schema".
- Schemas/Schema Types:
  - Update "Mixed" data type section to reflect new support for arrays and dictionaries in Apps created after May 22, 2024.
  - Add new "Counter" section to "Realm Database Types" to document counter data types and specify which SDKs support them.
  - Move Device Sync-specific geospatial query content to Data Model Mapping page.

# May 31, 2024

## Release Notes

- Update external changelog with release notes for Device Sync dashboard updates and a change for requests authenticated through Private Link.

# May 24, 2024

## Device Sync

- Configure Sync/Enable Atlas Device Sync: For the Admin API procedure, add a step for enabling Development Mode and clarify procedure steps for enabling Sync.

## Secure Your App

- Use a VPC Private Endpoint: Add a note about using VPC Private Endpoints with IP Access Lists.

# May 17, 2024

## Get Started

- Landing Page: Add a card for the C++ tutorial.
- C++ - Device Sync: New C++ tutorial based on the template app.

## Reference

- Release Notes: Update external changelog with release notes for new App Services CLI platform support for Linux Arm64 machines.
- Template Apps: Add the C++ template app ID and link to the GitHub repository. Minor procedure updates for UI changes, and minor naming tweaks.

## Other

- Internal: Update test suite dependencies to resolve security vulnerability alerts.

# May 3, 2024

## Release Notes

- Update external changelog with release notes for App Services CLI updates.

# April 26, 2024

## Tutorials

- Change "Get Started" TOC entry to "Tutorials".
- Flip the TOC construction for tutorial pages from "Device Sync Tutorial - " to " - Device Sync".
- Individual tutorial pages:
  - Update page titles to clearly indicate they're tutorials and include product names.
  - Add meta descriptions and keywords to those that didn't have them.

## Connect to MongoDB Data Sources

- CRUD & Aggregation APIs: Add `$setisSubset` to list of unsupported pipeline operators.

## Reference

- App Services CLI
  - `functions run`: Add `--use-local-app` flag.
  - `users list`: Add `--limit` flag.
  - `functions list`: New command to list all Functions in an app.

# April 19, 2024

## Develop & Deploy Apps

- Deployment Models & Regions: Correct GCP deployment region "Ohio" to "Iowa" per engineering updates. Remove AWS-style abbreviations.

## Authenticate & Manage Users

- Authentication Providers/Custom JWT: Increase token character limit from 2048 to 4096.

## Security

- Use a VPC Private Endpoint: Rewrite page to account for new Endpoint creation process with Legacy, General, and Sync Endpoints.

## Reference

- Admin API:
  - Update references for VPC private endpoints due to domain migration to `services.cloud.mongodb.com`.
  - Fix errors in the Admin API spec caught by the openapi linter.
- Release Notes: Update external changelog with release notes for new schema version selector, the service.cloud.mongodb.com domain change, and more.

# Other

- Domain Migration: Add SDK versions that use the new baseURL by default.

# April 12, 2024

## Authenticate & Manage Users

- Define User Metadata: Update page to note updated behavior for handling cached user authentication metadata.

## Data API

- Add new Constraints section documenting request timeout and response payload size limits.

## Functions

- Update existing Constraints section to increase the noted amount of memory a function may use from 256MB to 350MB.

# April 5, 2024

## Get Started

- Device Sync Tutorial - Flutter: Rename `lib/realm/schemas.g.dart` to `lib/realm/schemas.realm.dart` to reflect the new file extension generated in the upgraded Flutter Template App.

## Develop & Deploy Apps

- Create an App: Update the noted minimum MongoDB version from v4.4 to v5.0.

## Refernce

- GraphQL API (Deprecated)/Migrate to WunderGraph: New page that helps current GraphQL API users migrate to WunderGraph.

## Release Notes

- Update external changelog with release notes for sorted apps in the App Services UI and the service name for a data source now defaulting to the cluster name.

# March 29, 2024

## Device Sync

- Configure Sync/Pause or Terminate Sync: Remove `queryable_fields_version` field from the example configuration files, as the option is not user-editable.

## Reference

- App Services Admin API: Update "Get Flexible Sync information" endpoint with missing response fields.
- Configuration Files/Atlas Device Sync: Add `asymmetric_tables` to
  configuration file for Device Sync.

## Release Notes

- Update external change log with release notes for increased JWT token length
  limit, new `users count` CLI command, and several bug fixes.

## Other

- Throughout the docs: Add deprecation notes for GraphQL and Static Hosting where needed.

## Internal

- Add the `:orphan:` directive to several flagged pages to prevent build errors.

# March 15, 2024

## GraphQL

- Add GraphQL deprecation banner.
- Move GraphQL docs into Reference. Note in the table of contents that the service is deprecated.
- Add migration guides:
  - Migrate GraphQL to Hasura.
  - Migrate GraphQL to Apollo.

## Host Files

- Add static hosting deprecation banner.
- Move Host Files docs into Reference. Note in the table of contents that the service is deprecated.
- Add migration guides:
  - Migrate Static Hosting to Netlify
  - Migrate Static Hosting to Vercel
  - Migrate to Your Own S3 Bucket

## Reference

- App Services CLI:
  - schema: New commands for validating and generating schemas: `appservices schema validate` and `appservices schema generate`.
  - users: New command to display total number of app users: `appservices users count`.

## Other

- Landing page: Change "Realm SDKs" entry in sidebar to "Atlas Device SDK." Update naming throughout landing page.
- Introduction: Update Realm naming and positioning throughout landing page.
- Migrate Static Hosting and GraphQL From App Services: New landing page for the deprecated service migration guides. Only available through the deprecation banner.

Throughout the App Services docs:

- Add deprecation banners for GraphQL and Static Hosting where needed.
- Remove high-level references to our GraphQL API and Static Hosting service to make the features less discoverable.

# March 8, 2024

## Device Sync

- Handle Errors/Sync Errors: Update MongoDB Translator Errors section table to include `MaxIntegrationAttempts` error description and typical resolution.

## Functions

- MongoDB API Reference: Add note with example on finding one document in a sorted collection using `find()`, `sort()`, and `next()`.

## Triggers

- Landing Page: Add a section about diagnosing duplicate events.

## Connect to a MongoDB Data Sources

- Landing Page: Add note about x509 security certificate between Atlas App Services and Atlas data sources.

## Secure Your App

- Configure Network Security: Move note about x509 security certificate between Atlas App Services and Atlas data sources to a more appropriate spot higher up on the page.

## Reference

- Admin API
  - Metrics/Retrieve App Services metrics: Update endpoint to include `metrics` and its available enums as a query parameter.
  - Add new "Link multiple data sources" endpoint.
- Service Limitations: Add information about the 20 MB Device Sync websocket read limit.

## Release Notes

- Update external change log with release notes for new endpoint for linking multiple data sources and error fixes.

# March 1, 2024

## Authenticate & Manage Users

- Read User Metadata: Update procedure wording to match UI changes.
- Manage User Sessions
  - Fix the base URL to not include auth provider information.
  - Tweak placeholder spacing to be consistent.
  - Convert tab to space for correct spacing on some curl request examples.

## Reference

- App Services Admin API
  - Correct `/redeploy` operation type from `Get` to `Post`.

# February 23, 2024

## Device Sync

- Configure Sync/Sync Settings: Fix typo.

## Functions

- Landing Page: Fix typo.
- Test Function: Fix typo.

## Triggers

- Send Trigger Events to AWS EventBridge: Update page with new sections on error handling for Database Triggers.

## Monitor App Activity

- View Application Logs: Update page with new `trigger_error_handler` CLI log type in support of AWS EventBridge custom error handling.
- Forward Logs to a Service: Update list of supported CLI log types with new `trigger_error_handler` type in support of AWS EventBridge custom error handling.
- Log Types/Trigger Error Handler Logs: New page documenting the trigger error handler log type in support of AWS EventBridge custom error handling.

## Reference

- App Configuration Files/Triggers: Update database trigger configuration, including adding `event_processors` and `error_handler` configuration.
- App Services Admin API
  - Update `/adminGetLogs` endpoint with new `TRIGGER_ERROR_HANDLER` log type schema in support of AWS EventBridge custom error handling.
  - Add the new `error_handler` object property to Database type Trigger payloads in all relevant Trigger endpoints.
  - Update "Authenticate as an App Services adminstrator" endpoint with `mongodb-cloud` as the `ProviderType`, as `mongodb-cloud` is the only supported provider for this endpoint.
  - Fix syntax of schema for `ServiceResponse` and refine endpoint descriptions.
  - Add "Push App Configuration Files" and "Pull App Configuration Files" endpoints and update related schema definitions.
- App Services CLI/logs/list: Add `trigger_error_handler` as value for the `--type` flag in the Options table.
- Billing: Update App Services Requests section to include the new custom error function as an example of a Function Execution billing.

## Release Notes

- Update external change log with release notes for custom user data parsing and AWS EventBridge error handling.

# February 9, 2024

## Device Sync

- Get Started: Add info to the "Create queries in your client application" section about Sync ignoring custom collation when evaluating subscriptions.

## Develop & Deploy Apps

- Deploy Automatically with GitHub: Add tabs for CLI and API procedures. Update details about making changes from the CLI.

## Define Data Access Permissions

Device Sync-Compatible Permissions: Add information about Sync ignoring custom collation when evaluating permissions.

## Reference

- App Services CLI
  - appservices deploy: New section with details for the new CLI commands that enable you to manage automatic deployments of your app: `appservices deploy configure`, `appservices deploy describe,` `appservices deploy disable`, `appservices deploy enable`.

## Release Notes

- Update external change log with release notes for the Data Services logs UI, object model generation for dictionaries, and more.

# February 2, 2024

## Device Sync

- Migrate Device Sync Modes: Remove duplicate sentence.

## Define Data Access Permissions

- Role-based Permissions: Add note about security consideration for roles and filters for queries.
- Filter Incoming Queries: Add note about security consideration for roles and filters for queries.

## Reference

- App Services CLI: Updated the profile configuration file path in the "CLI Profiles" section to be nested under `$HOME` on macOS

# January 12, 2024

## Device Sync

- Configure & Update Your Data Model/Data Model Mapping: Add C++ Set to the list of SDK Set documentation links.
- Configure Sync/Sync Settings: Update dev mode breaking changes section to mention support can enable the feature for older Apps. Add more SDK versions.
- Handle Errors/Client Reset: Add the new C++ Client Reset page to the list of SDK pages for handling client resets.

## Other

- Domain Migration: Add new page that contains information about the base URL changes.
- Throughout Docs
  - Update base URL (realm.mongodb.com) to new App Services base URL (services.cloud.mongodb.com).

# January 5, 2024

## Functions

- Landing Page: Remove the note that nested functions are unsupported when using GitHub deployment.

## Define a Data Model

- Schemas/Schema Types: Add Flutter SDK to the list of SDKs that support geospatial data.

## Monitor App Activity

- Activity Feed & Alerts: Replace the Project Activity Feed screenshot with one that does not show a "Download to JSON" button.

# December 15, 2023

## Authenticate and Manage Users

- Authentication Providers/Custom JWT: Note that App Services specifies a 30 minute expiry for the access token even if expiry is defined by the Custom JWT's `exp` key.

## Reference

- App Services Admin API: Fix broken links in Endpoints/Create, Endpoints/Modify, Data API/Enable, Data API/Modify.

# December 8, 2023

## Device Sync

- Configure Sync/Sync Settings
  - Add Flutter SDK to the list of SDKs that support Data Ingest.
  - Note that attempting to change an indexed queryable field value on device causes a compensating write error. Link to the compensating write error documentation for more information.
- Handle Errors/Sync Errors: Add attempting to change an indexed queryable field value to the list of conditions that can trigger a compensating write error.

## Data API

- Data API Endpoints: Include that HTTP/1.1 is a requirement when making requests.
- Custom HTTPS Endpoints: Include that HTTP/1.1 is a requirement when making requests.

## Authenticate & Manage Users

- Authentication Providers/Custom JWT: Fix typo in diagram.

## Reference

- App Services Admin API
  - Schemas
    - List Schemas: Remove `schema` object from documentation to match the API implementation.
    - Create a Schema: Add details about JSON escaping to avoid errors when creating a schema.
  - Deployment/Create a Deployment Draft: Correct the 200 response code to 201 to match API implementation.
  - Applications/Create a New App and Get an App: Add `device-sync` to the product types for the GET and POST endpoints.
- Service Limitations: Add section for HTTP/1.1 requirement for Data API and HTTPS endpoints.
- Third Part Services (Deprecated)/Webhook Requests and Responses: Include that HTTP/1.1 is a requirement when making requests.

# December 1, 2023

## Get Started

- Device Sync Tutorial - React Native: Update tutorial to match upgrades to the template app.

## Reference

- Service Limitations: Add reasoning for request traffic limitations and assure that App Services can handle more requests than the set limits.

## Other

- Pages throughout the docs set: Partition-Based Sync (PBS) has been removed from the App services UI. As a result, remove mentions of PBS throughout the docs and move relevant PBS content to the Partition-Based Sync Mode reference page.

# November 24, 2023

## Get Started

- [All Tutorials]: Remove the --location flag from the App Services CLI procedure in the 'Start with the Template' section.

## Develop & Deploy Apps

- Create an App: Update App Services CLI procedure to use the new --provider-region flag instead of --location flag.
- Copy an App: Update App Services CLI example to use the new --provider-region flag instead of --location flag.

# November 17, 2023

## Define Data Access Permissions

- Data Access Role Examples: Update CRUD Permissions example screenshots and copyable JSON.

## Release Notes

- Update external change log with release notes for dark mode, disabling PBS in the UI, and more.

# November 10, 2023

## Functions

- Query MongoDB Atlas/Write: Fix discrepancy in output for the array update example.

## Triggers

- Landing Page: Refer to change stream instead of queue. Clarify wording and limitations. Link to maximum throughput documentation.
- Database Triggers: Refer to change stream instead of queue. Change maximum throughput from "up to 50,000" to "more than 10,000."

## Develop & Deploy Apps

- Get App Metadata: Re-add the "Find Your App" CLI procedure to the page with App Services CLI naming.

# November 3, 2023

## Triggers

- Database Triggers
  - Note that document preimages are supported on sharded clusters running 5.3 or later.
  - Add documentation for new database trigger options to target clusters or DBs, in addition to related changes.

## Secure Your App

- Use a VPC Private Endpoint: New "Change Access Restrictions" section with details about how to open access to requests from outside your PrivateLink connection.

## Reference

- App Configuration Files/Triggers: Update Database Triggers reference information with details about new valid operations.
- App Services Admin API: New "Toggle Non-VPC Requests" endpoint to allow or restrict non-VPC requests.
- App Services CLI:
  - New generated API reference documentation for App Services CLI. Replaces the deprecated Realm CLI.
  - New "CLI Profiles" section with information about adding and using profiles.
- Service Limitations
  - New "Connection Pooling" section with details about what determines connection pool size.
  - Remove the Device Sync Rules limitation that no longer applies.
- Realm CLI: Move the reference down in the navigation menu, and note that it is deprecated.

## Other

- Change references and commands from Realm CLI to the new App Services CLI throughout the documentation.

# October 20, 2023

## Define a Data Model

- Schemas/Schema Types: Document Device Sync support for geospatial data, including GeoJSON Points and querying.

## Reference

- App Services Admin API
  - Add adminListServices endpoint and update response objects for several endpoints.
  - Add `maximum_throughput` to Create Trigger and Get a Trigger.

# October 13, 2023

## Triggers

- Landing Page: Add note about increased maximum throughput for M10+ clusters.
- Database Triggers
  - Add configuration information about increased maximum throughput.
  - Add note about disabling Event Ordering to enable maximum throughput.

## Internal

- Update CLI config file documentation and internal references to reflect new configuration file version (20230101).

# October 6, 2023

## Data API

- Custom HTTPS Endpoints: Add more detail for creating a custom HTTPS endpoint function.

## Functions

- Landing Page: Add max async operations (1000 async operations) under "Constraints" section.

## Authenticate & Manage Users

- Authentication Providers/Custom JWT: Update the page and JWT diagram with more details on configuration types.

## Release Notes

- Update external change log with release notes for v20231004.

## Internal

- Deprecate the generated Realm CLI by moving it to a new URL path. Add new App Services CLI to main `/cli` path. Introduce new source constants to refer and link to App Services CLI throughout the docs.

# September 29, 2023

## Data API

- Data API OpenAPI Reference: Fix a semantic error in the spec. This resolves a HELP issue with a customer getting errors when trying to use the spec in an internal tool and in Swagger.

## Other

- Add an App Services docs-wide banner with a link to the blog post announcing that "Realm is now Atlas Device SDK."

# September 22, 2023

## Device Sync

- Configure Sync/Sync Settings: Development Mode: Add "Breaking Changes" subsection with details on an update that allows breaking changes in development mode.

## Data API

- Internal: Add programmatically generated facet tags to the landing page for improved search indexing.

## Monitor App Activity

- Activity Feed Alerts: Clarify list of default alerts on page.

# September 15, 2023

## Device Sync

- App Builder's Resources/Stream Data from Client to Atlas: Note that Device Sync manages the lifecycle of asymmetric objects on the device, and no cleanup is required.
- Configure Sync/Sync Settings: Data Ingest: Note that Device Sync manages the lifecycle of asymmetric objects on the device, and no cleanup is required.

## Reference

- App Services Admin API
  - Sync: Add documentation to `GET` Sync information for a Flexible Sync-enabled App.
  - Triggers/Create a Trigger: Update `POST` for creating a trigger to use `function_id` in example payload instead of `function_name` and `event_processors`.

# September 8, 2023

## Device Sync

- Configure and Update your Data Model/Update a Data Model: Fix small spelling typo.
- Configure Sync/Sync Settings: Update queryable fields documentation for Indexed Queryable Fields and Collection Queryable Fields.
- Handle Errors/Sync Errors: Update queryable fields documentation for Indexed Queryable Fields and Collection Queryable Fields.

## Authenticate and Manage Users

- Manage User Sessions: Update Get a User Access Token Over HTTPS steps for clarity.

## Reference

- App Services Admin API/Functions/Create a New Function: Add missing properties, `run_as_user_id` and `run_as_user_id_script_source`.

## Release Notes

- Update change log with release notes for v20230906.

## Internal

- Add programmatically generated facet tags to the repo for improved search indexing.

# September 1, 2023

## Triggers

- Database Triggers: Add supported version information for document preimages on sharded clusters.

## Reference

- App Configuration Files
  - GraphQL: Add `disable_schema_introspection` to the config object. Clarify details about `use_natural_pluralization`.
- App Services Admin API: Update documentation for the following endpoints:
  - GraphQL API
    - Get GraphQL API Configuration (GraphQL API GET and PUT): Add `disable_schema_introspection` to the config object. Clarify details about `use_natural_pluralization`.
  - Triggers
    - Resume a suspended trigger (Triggers/PUT): Correct the description for the `disable_token`.
    - Create a trigger (Triggers/POST): Add a missing `project` object parameter to the Trigger config details.

# August 25, 2023

## Get Started

- Landing Page: Change Xamarin to MAUI on C# template app card.
- Add link to Realm Example Projects page to "What's Next" section of each of the SDK Device Sync Tutorials.

## Device Sync

- App Builder's Resources/Example Projects: Add TOC Page for an external link to the Example Projects page on the Realm SDK site.

## Reference

- App Configuration Files/GraphQL: Add that `use_natural_pluralization` cannot be changed to false using realm-cli but can be when creating a new app with Admin API.
- App Services Admin API: Improve authentication documentation in the Admin API for the following sections:
  - Project & Application IDs
  - Get an Admin API Session Access Token
  - Refresh an Admin API Session Access Token
  - Administrator
    - List App Services Admin Auth Providers
    - Authenticate as an App Services administrator

# August 18, 2023

## Get Started

- Landing Page: Add a link to the "Using Template Apps in the Atlas UI" Learning Byte.

## Device Sync

- Landing Page: Add a link to the "Intro to Atlas Device Sync" Learning Byte.
- App Builder's Resources/Device Sync Permissions Guides: Add information to permissions templates that require custom user data about pausing and resuming Sync in the client SDK to trigger permissions updates.
- Configure Sync/Sync Settings: Note the side effects of enabling Development Mode (enabling anonymous authentication, disabling deployment drafts).
- Migrate a Local-Only App to a Sync-Enabled App: Move the page up in the Table of Contents, update existing diagram and add a new one, clarify wording and add details.

## Data API

- Authenticate Data API Requests: Add a note about how to find Bearer Authentication error information in the Application Logs.

## Functions

- Query MongoDB Atlas/Write: Add information and links to `findOneAndUpdate()`, `findOneAndReplace()`, and `findOneAndDelete()`.

## Triggers

- Database Triggers: Update the Twilio code example to use npm dependencies instead of 3rd party services.

## Authenticate & Manage Users

- Define User Metadata
  - Add `ObjectId` as a valid type for custom user data mapping to User ID.
  - Add a link to the new Kotlin SDK docs User Metadata page.

## Other

- Introduction: Add a link to the "Overview of App Services" Learning Byte.

# August 11, 2023

## Device Sync

- Configure and Update Your Data Model/ Update a Data Model: Note that required properties missing in a schema subset default to zero
- Configure and Update your Data Model/ Data Model Mapping: Update default property type description with information on default zero values for missing required properties on a client's schema subset
- Configure Sync/ Pause or Terminate Sync: Add procedures to pause and resume sync using the API
- Go to Production with Sync/ Production Checklist: Update and organize production checklist with new recommendations for oplog usage and recommended versions

## Reference

- App Configuration Files/ Create Template Configurations with Expansions: Note that template configuration expansions only support string values

# August 4, 2023

## Device Sync

- Configure and Update Your Data Model/Update a Data Model: New "Add a Default Value on a Property" section with details about new default value behavior
- Go to Production/Production Checklist: Organize items into categories, add recommendations for MongoDB version and NVMe minimum MongoDB version
- Migrate Sync Modes: Add links to new SDK documentation about updating the client codebase after migrating sync modes

## Develop & Deploy Apps

- Get App Metadata: Temporarily remove App ID CLI procedure pending a CLI bug fix
- Change Deployment Models
  - List minimum supported SDK versions for deployment model change
  - Add details about the consequences of changing deployment models

## Reference

- App Configuration Files/Create Template Configurations with Expansions: Clarify that template config expansions only support string values

# July 28, 2023

## Device Sync

- Go to Production with Sync: Rename "Optimize Sync Atlas Usage" page to "Optimize Sync Storage in Atlas" to better reflect the page contents

## Secure Your App

- Use a VPC Private Endpoint: Note that you cannot use public internet connections if you have a Private Endpoint enabled

## Reference

- Third Party Services [Deprecated]: Extend the HTTP/third-party service deprecation date from August 1, 2023 to November 1, 2024

## Internal

- Add a GitHub Action to check for broken links in the docs
- Add a GitHub Action to check for broken redirects

# July 21, 2023

## Device Sync

- App Builder's Resources/Stream Data from Client to Atlas: Add Kotlin to list of SDKs that support Data Ingest
- Configure Sync/Sync Settings: Add Kotlin to list of SDKs that support Data Ingest

## Functions

- Landing Page: Warn that nested functions are not allowed with auto GH deploy

## Define a Data Model

- Schemas/Enforce a Schema: Fix the depth of TOC on the page

## Define Data Access Permissions

- Filter Incoming Queries: Note that filters are not supported in Device Sync

## Release Notes

- Add 12 July 2023 and 28 June 2023 release notes

# July 3, 2023

## Triggers

- Database Triggers: Update text and images to match the UI changes for the `Last Execution` to `Last Heartbeat` term change

# June 30, 2023

## Triggers

- Database Triggers: Correct a variable misnaming (from `customer_id` to `customerId`) in a code example based on user feedback

## Define Data Access Permissions

- Rule Expressions: Add new expressions operators, `%stringToUuid` and `%uuidToString`, to convert EJSON values to JSON

## Reference

- App Services Admin API/Deployment/Deploy a Deployment Draft: Add missing payload for `adminDeployDraft` call

# June 23, 2023

## Get Started

- Device Sync Tutorial - React Native: Fix the highlighting in a code example

## Device Sync

- Migrate Sync Modes: Add .NET SDK v11.1.0 as a minimum SDK version that supports Partition-Based Sync to Flexible Sync migration

## Other

- Fix broken links across 15 files

# June 16, 2023

## Device Sync

- App Builder/Tiered Device Sync: Clarify the opening Tip about starting a PoC with a Template App to get an App pre-configured for Device Sync
- Migrate Sync Modes: Add the Node.js SDK and React Native SDK versions that support backend sync mode migration

# June 8, 2023

## GraphQL

- Landing Page: Note in Limitation section about when you can safely ignore schema title warnings

## Other

- Internal: Fixed broken links on various pages

# June 2, 2023

## Device Sync

- Get Started: Change "C++ SDK (Alpha)" name to "C++ SDK" for consistency with other references in App Services docs that omit the alpha/beta designation
- Tiered Device Sync Guide: Update `cloudSyncServerAuth` field name to `cloudSyncServerAuthSecret`
- Migrate Sync Modes: Add Realm Swift SDK v10.40.0 & Java SDK v10.16.0 as client SDKs that support Sync mode migration

## Authenticate & Manage Users

- Authentication Providers
  - Custom Function: Change "C++ SDK (Alpha)" name to "C++ SDK" for consistency with other references in App Services docs that omit the alpha/beta designation
  - Custom JWT: Clarify and add Custom JWT details, refresh page organization and content

## Other

- Internal: Add a missing redirect

# May 26, 2023

## Get Started

- Device Sync Tutorial - Flutter: Change `flutter pub run realm generate` to `dart run realm generate`
- Triggers and Atlas Search Tutorial: Change page name to "Build Reverse Search Into Your Application" and add details about the reverse search use case

## Device Sync

- Configure Sync/Pause or Terminate Sync: Add link to Kotlin SDK client reset docs
- Handle Errors/Client Reset: Add link to Kotlin SDK client reset docs
- Migrate Sync Modes: New page showing how to automatically migrate an App Services App from Partition-Based Sync to Flexible Sync

## Data API

- Data API Endpoints: Replace authentication code examples with tested, Bluehawked examples for Bearer Token, Email/Password, API Key, and Custom JWT
- Authenticate Data API Requests: Replace authentication code examples with tested, Bluehawked examples for Bearer Token, Email/Password, API Key, and Custom JWT

## Functions

- Landing Page
  - Reduce "On This Page" depth to avoid confusing users with "missing" sections for headings from tabs
  - Raise the request timeout limit from 270 to 300 seconds

## Authenticate & Manage Users

- Authentication Providers/Okta (Custom JWT): New page with information about configuring Okta JWT Authentication using the Custom JWT authentication provider

## Define Data Access Permissions

- Device Sync-Compatible Permissions: Remove outdated array queryable field limitation, clarify custom user data implications

## Reference

- Template Apps: Add the Atlas Data API + React template app to the list of available template apps

## Other

- Internal: Remove deprecated directives per DOP

# May 19, 2023

## Get Started

- Triggers and Atlas Search Tutorial: New page showing how to add a Trigger, Function, and Atlas Search query on top of the React Native template app

## Device Sync

- Tiered Device Sync Guide: Add `localhost` instructions, change `make down` to `make stop`
- Configure and Update Your Data Model/Data Model Mapping: Clarify the link title for the Kotlin dictionary docs

## Authenticate & Manage Users

- Authentication Providers
  - Custom JWT: Move the Firebase instructions to a dedicated page
  - Firebase (Custom JWT): New page moving the Firebase Custom JWT guide to its own page, adding instructions for the Admin API, and improving UI/CLI instructions

## Define Data Access Permissions

- Filter Incoming Queries: Update Filter procedures and screenshots for UI updates
- Configure Advanced Rules: Update "Convert to Advanced Mode" procedure and screenshot for UI updates

# May 12, 2023

## Device Sync

- Go to Production with Sync/Compact an Atlas Volume: Update `compact()` article link to public support link with info to contact Support for access

## Data API

- Data API Endpoints: Convert manual cURL examples to use an automated testing framework and extract them for docs with Bluehawk annotations
- Custom HTTPS Endpoints: Convert manual cURL examples to use an automated testing framework and extract them for docs with Bluehawk annotations
- Data API Examples
  - Update examples for Canonical vs. Relaxed EJSON
  - Convert manual cURL examples to use an automated testing framework and extract them for docs with Bluehawk annotations
- Data Formats: Add details and update examples for Canonical vs. Relaxed EJSON
- Data API OpenAPI Reference: Removes overspecified base types that were causing build warnings

## Triggers

- Landing Page: Rename "Maximum Executions Per Second" section to "Event Processing Throughput", add suggestions to increase Trigger throughput

## Develop & Deploy Apps

- Change Deployment Models: Add information about cleaning up after a migration, note VPC Private Endpoints are region-specific

## Define a Data Model

- Relationships: Fix invalid ref value in example

## Define Data Access Permissions

- Landing Page, Role-Based Permissions page, and Rule Expressions page: Clarifications and corrections related to the rules unification project

## Secure Your App

- Use a VPC Private Endpoint: New page with information about using a Private Endpoint to access Atlas App Services from within an AWS VPC via AWS PrivateLink

## Reference

- App Services Admin API/Security: Update VPC Private Endpoint `operationId`s for Create and List & update List example
- Billing: Note that trigger execution requests detailed in pricing include EventBridge forwarding
- Service Limitations: Add details about limitations for Private Endpoints

# May 5, 2023

## Device Sync

- Configure and Update Your Data Model/Update a Data Model: Add a diagram, substantial rewrites to reduce page length

## Data API

- Data API OpenAPI Reference: Use an OpenAPI bundler to include examples in Data API spec

## Functions

- JavaScript Support: Add a Note callout about axios support for sending HTTP requests

## Triggers

- Database Triggers: Clarify details around match expression

## Authenticate & Manage Users

- Manage User Sessions: Remove incorrect information about custom JWT expiration, clarify anonymous user account deletion
- Authentication Providers
  - Custom JWT Authentication: Update `exp` details to remove incorrect expiration info, clarify valid/invalid JWT details
  - API Key Authentication: Add links to SDK docs showing how to log in with an API key and create an API key

## Reference

- Service Limitations: Clarify max concurrent Device Sync connections vs. max concurrent requests

## Other

- Add a redirect for a subset of 404s related to URLs with spaces per the SEO team

# April 28, 2023

## Device Sync

- App Builder's Resources/Event Library: Add a note that Partition-based Sync is required to record events
- Add/update missing links to Realm SDKs across App Services docs to reflect new documentation/new feature support

## Data API

- Data API Endpoints: Remove "Endpoints" section, add a link to the Open API Reference to view all endpoints
- Data API Examples: New "Create, Read, Update, and Delete (CRUD) Operations" section with generated code snippets formerly on the "Endpoints" page
- Data API Open API Reference: New Open API spec documenting Data API endpoints

## Functions

- Landing Page: Raise the request timeout limit from 240 seconds to 270 seconds

## Authenticate & Manage Users

- Authentication Providers/Email/Password Authentication: Typo fix

# April 21, 2023

## Get Started

- SwiftUI Device Sync tutorial: Fix outdated `realmApp` naming
- Updates across all Device Sync tutorials: Remove steps related to updating queryable fields

## Device Sync

- Configure Sync/Pause or Terminate Sync: Note if using deployment drafts, you must deploy the draft to terminate Sync

## Define Data Access Permissions

- Device Sync-Compatible Permissions: Add a follow-up note about exporting a migrated configuration

## Reference

- App Services Admin API
  - Security: Add VPC Private Endpoint endpoints & examples for GET a list of private endpoints, GET a specific endpoint, GET a list of Private Endpoint services, POST create endpoint, PUT update endpoint, DELETE delete endpoint
- Service Limitations: Change maximum number of change streams for M50 and larger to 1000, remove `watch()` limitations

# April 14, 2023

## Triggers

- Database Triggers: Update Create/Configure steps to match new UI
- Scheduled Triggers: Update Create/Configure steps to match new UI

## Define Data Access Permissions

- Device Sync-Compatible Permissions: Fix a list formatting issue

# April 07, 2023

## Device Sync

- Pause or Terminate Sync: Add link to Flutter SDK Re-Enable Sync section.

## Authentication

- Email/Password Authentication: Document additional default parameter for password reset functions.

## Data API

- Atlas Data API: Add unit-tested Data API examples
  - Add a GitHub Action to automatically run the tests and `bluehawk check`

## Users

- Define Custom User Metadata: Add a link to the new Kotlin SDK Custom User Data page.

## Triggers

- Scheduled Triggers: Update Scheduled Triggers documentation to add information
  about skip events.

## Other

- Pages throughout the docs set: Review all images and update those that were outdated.
- Pages throughout the docs set: Rename Asymmetric Sync to Data Ingest.

# March 31, 2023

## Device Sync

- Configure and Update Your Data Model/Update a Data Model: Remove inapplicable SDK schema migration info from page
- Go to Production with Sync
  - Production Checklist: Recommend minimum `M10` dedicated cluster
  - Optimize Sync Atlas Usage: Remove Partition-Based Sync Backend Compaction details from page
- Tiered Device Sync Guide:
  - Update the Tiered Sync package URL
  - Rewrite procedures for a more generic context

## Functions

- External Dependencies: Update `--include-dependencies` flag to `--include-node-modules`

## Reference

- App Services Admin API
  - Endpoints: Remove `function_name` from the Endpoint request body schema
  - Logs: Add schemas with descriptions for all of the App Services Logs types
- Realm CLI: Remove Realm CLI v1 Reference from Table of Contents, add a redirect to a new orphaned page for legacy v1 users
- Service Limitations: Raise request timeout from 210 to 240 seconds
- Template Apps: Rename `Xamarin` to `MAUI` in the lists of template apps, add details about `realm-cli` to the IDs list
- Partition-Based Sync: Move Backend Compaction details from "Optimize Sync Atlas Usage" page

# March 24, 2023

## Device Sync

- Tiered Device Sync Guide: New unlisted page with information on running Tiered Sync, and details about connecting to a Tiered Sync server from a client

## GraphQL API

- GraphQL Types, Resolvers, and Operators: Add a section with code blocks showing how to implement pagination with `query`, `limit`, and `sortBy` operators

## Authenticate & Manage Users

- Landing Page: Add a diagram showing the interaction between client app, App Services App, and authentication providers when authenticating users
- Authentication Providers
  - Email/Password Authentication
    - Add diagrams for email/password login flow, registering an email/password user, and password reset flow
    - Expand and clarify password reset details
  - Custom Function Authentication: Add a diagram for custom function login flow
  - API Key Authentication: Add a diagram for API key login flow, clarify details, add information about the 20 API key limit per user
  - Facebook Authentication: Add a diagram for OAuth login flow
  - Google Authentication: Add a diagram for OAuth login flow
  - Apple ID Authentication: Add a diagram for OAuth login flow

## Reference

- Partition-Based Sync Mode: Remove unnecessary (malformed) link

## Other

- Pages throughout the docs set: Where the Realm SDKs are listed as tabs, change them to a list of bullets to address formatting issues

# March 17, 2023

## Get Started

- Device Sync Tutorial - Flutter: Small clarifications and improved instructions

## Device Sync

- Configure Sync
  - Enable Atlas Device Sync: Add a Tip callout about the new behavior that Sync pauses after 30d of inactivity
  - Pause or Terminate Sync: Add a line about the new behavior that Sync pauses after 30d of inactivity
- Go to Production with Sync/Optimize Sync Atlas Usage: Clarify language around trimming vs. backend compaction, remove unnecessary content

## Triggers

- Database Triggers: Clarify `$match` example, add test, set up GitHub Workflow to run Function tests when we add or change tests

## Authenticate & Manage Users

- Define Custom User Metadata: Update the App Services UI procedure with minor UI label changes
- Manage User Sessions: Add an App Services UI procedure to configure user session refresh token expiration

## Secure Your App

- Configure Network Security: Rename "Communicate from the Client to the Sync Server" section to "DNS Filtering" and improve the description

## Reference

- App Metrics: Update GraphQL metric naming to a consistent naming convention: `GRAPHQL_<METRIC>`
- App Services Admin API: Document the new endpoint to change an email/password user's email address
- Billing: Add a line about the new behavior that Sync pauses after 30d of inactivity
- Service Limitations
  - Move the existing info about concurrent Sync workloads into a new "Device Sync" section of the page
  - Add a section about Sync pausing due to inactivity, with a link to how to resume it

# March 10, 2023

## Device Sync

- Go to Production with Sync/Production Checklist: Add new "Disable or Manage Built-In Schema Validation" section

## Authenticate & Manage Users

- Authentication Providers/Email/Password Authentication: Add information about user confirmation, new flowcharts for login and registration flow

## Define a Data Model

- Schemas Landing Page
  - Add new "App Services Schema vs. Build-In Schema Validation" section with information and caveats about how to use both App Services schemas _and_ MongoDB's build-in schema validation
  - Fix a typo

## Define Data Access Permissions

- Role-based Permissions: Add new flowcharts showing permissions evaluation for reading documents, writing documents, and role assignment

## Other

- Internal: Remove unneeded redirect

# March 3, 2023

## Get Started

- Device Sync Tutorial for .NET, Kotlin, SwiftUI: Rename "Atlas" tab in procedure to "Data Services"
- Device Sync Tutorial - .NET Maui: Add details around the different ways to get the Template App client

## Device Sync

- Configure and Update Your Data Model
  - Landing Page: Fix a typo
  - Create a Data Model: Add a note that object type name cannot exceed 57 UTF-8 characters
  - Update a Data Model: Update details about which documents resync with additive changes
  - Data Model Mapping
    - Add a note that object type name cannot exceed 57 UTF-8 characters
    - Add a new "Databases, Collections, and Objects" describing how object names map to collections in databases with and without Development Mode enabled

## Functions

- Landing Page
  - Add link to relevant Kotlin SDK page
  - Update Constraints to reflect raised request timeout limit from 180 to 210 seconds

## Triggers

- Database Triggers: Add documentation for change stream preimages feature available in clusters running MongoDB 6.0 and newer

## Authenticate & Manage Users

- Authentication Providers/Custom Function Authentication: Add links out to relevant Kotlin SDK page, change SDK links from tabs to bullet list

## Connect to MongoDB Data Sources

- Document Preimages: Note that triggers use the change stream preimages feature available in clusters running MongoDB 6.0 and newer, while older versions store preimages directly in the oplog

## Define Data Access Permissions

- Device Sync-Compatible Permissions: Clarify that migration from old rules to new rules does not require manual migration

## Reference

- Upgrade a Shared Tier Cluster: Rename "Atlas" tab in procedure to "Data Services", update screenshot
- Third-Party Services/HTTP/http.post(): Add missing `encodeBodyAsJSON` parameter, specify it's required when the payload is an object

# February 24, 2023

## Device Sync

- Configure Sync/Sync Settings: Update list of SDKs that support Asymmetric Sync to include C++ SDK
- Update many pages across Device Sync documentation for the release of the rules unification project

## Authenticate & Manage Users

- Define User Metadata: Add missing ref targets, update links to SDK pages to use bullets instead of tabs
- Manage User Sessions: New page consisting of moved and new content. Moved get & refresh token and revoke user sessions content; new configure token expiration, verify & decode token, and end user session content.

## Define Data Access Permissions

- Update many pages across Rules documentation for the release of the rules unification project

## Reference

- App Configuration Files/MongoDB Data Sources: Remove Device Sync from description of when you would define collection-level rules in a collection's `rules.json` for the release of rules unification project

# February 17, 2023

## Get Started

- Minor CTA updates to all Device Sync Tutorials:
  - Update the CTA button wording from "Check out the Template Apps" to "Sign-up to Deploy a Template App"
  - Add an include shared across all tutorials with a link to the "Template Apps" page to learn more, or a sign-up button CTA to sign up for an Atlas account if you don't already have one

## Develop & Deploy Apps

- Get App Metadata: Add a new tab for finding your App ID with the CLI

## GraphQL API

- Authenticate GraphQL Requests: Add new includes about better bearer auth performance with an access token, not using API keys in user-facing clients

## Data API

- Data API Endpoints: Add new includes about better bearer auth performance with an access token, not using API keys in user-facing clients
- Custom HTTPS Endpoints: Add new includes about better bearer auth performance with an access token, not using API keys in user-facing clients
- Authenticate Data API Requests: Add new includes about better bearer auth performance with an access token, not using API keys in user-facing clients

## Authenticate & Manage Users

- Define User Metadata: Add info about user creation function to the UI custom user data procedure, improve page organization, add Admin API procedures across page
- Authentication Providers/Apple ID Authentication: Add a mobile app Sign-in with Apple procedure; previously docs only covered Sign-in with Apple for a web app

## Reference

- Template Apps: Update the CTA button wording from "Check out the Template Apps" to "Sign-up to Deploy a Template App"

## Other

- Update the Table of Contents to have fewer root-level entries by grouping content into use-case based sections, reorganize to better align with organizational priorities
  - Rename "Manage & Deploy Apps" to "Develop & Deploy Apps", move it down in the Table of Contents, reduce internal nesting and consolidate pages in the section
  - Rename "Users & Authentication" to "Authenticate & Manage Users", streamline section contents by consolidating and renaming pages
  - Rename "MongoDB Data Sources" to "Connect to MongoDB Data Sources", combine "Role-based Permissions" with "Define Roles & Permissions" and "Filter Incoming Queries" with "Filters"
  - Consolidate "Schemas", "Relationships", and "Values & Secrets" in a new "Define a Data Model" section, new landing page focusing on how these relate to data modeling
  - Rename "Rules" to "Define Data Access Permissions", consolidate pages in section
  - Consolidate "Logs" and "Activity Feed & Alerts" into a new "Monitor App Activity" section
  - Move security-related information out of former "Manage & Deploy Apps" section into a root-level "Secure Your App" section with information about configuring network security and managing developer access
  - Rename "Static Hosting" to "Host Files", move it down in the Table of Contents
  - Move App Services Admin API and CLI documentation into Reference
  - Move App Configuration files from former "Manage & Deploy Apps" section into Reference

# February 10, 2023

## Manage & Deploy Apps

- Deploy/Change Deployment Models: New page with information about how to change an App Services App's deployment models

## Device Sync

- Update SDK links on all the Auth Provider pages, Enable Custom User Data, Functions, and Create a User:
  - Add new C++ SDK page links
  - Change SDK links from tabs to a bullet list
  - Add links to other SDK pages where missing

## MongoDB Data Sources

- Query Atlas from Client Apps: New page with a setup procedure explaining MongoDB Data Access and how it relates to App Services / Realm SDKs

## Data API

- Landing Page: Remove BSON info from landing page, refresh information about how the Data API works and when to use it
- Data Formats: New page with information about BSON, JSON, and EJSON, with a list of Data API-supported BSON types

## Functions

- Context: Add a subsection with a link target for `context.environment.values` for easy linking from other documentation

## Values & Secrets

- Landing Page: Add a link to the new Functions / `context.environment.values` link target
- Access a Value: Add a link to the new Functions / `context.environment.values` link target

## App Services Admin API

- Deployment: Document new GET and PUT endpoints for getting and creating a deployment migration
- Users/List All Pending Users: Add docs for the `after` query parameter to address pagination beyond 50 users

## Reference

- Service Limitations: Update the Request Traffic limitation from 5,000 concurrent requests to 10,000 concurrent requests

# February 3, 2023

## Get Started

- Device Sync Tutorial - Kotlin: Add Learning Objectives, minor clarifications based on feedback

## Data API

- Data API Endpoints: Update the "Authenticate the Request" section to prefer Bearer authorization with an access token
- Custom HTTPS Endpoints: Update the "Authenticate the Request" section to prefer Bearer authorization with an access token

## Other

- Introduction: Minor updates based on feedback

# January 27, 2023

## Get Started

- Device Sync Tutorial - .NET MAUI: Replaces the previous Xamarin tutorial with a tutorial for building on the new MAUI template app
- Device Sync Tutorial - React Native: Minor tweak telling users where to go to install app dependencies to account for multiple client download options

## GraphQL API

- Authenticate GraphQL Requests
  - Update the page with more information about Bearer Authentication, Credential Headers, unify the structure so it parallels a similar page for Data API
  - Add information about getting and refreshing a user access token as a reusable block that can go on this page and the similar Data API page

## Data API

- Data API Endpoints: Update the "Authenticate the Request" section:
  - Add a link to the new Authenticate Data API Requests page
  - Add information about exchanging the user's login credentials for an access token that you can then include in a request header
- Authenticate Data API Requests: New page modeled on the updated "Authenticate GraphQL Requests" page

## App Services Admin API

- Users/Verify valid client access token: Update description, add and clarify details around 200 responses, add possible 400/401 responses

## Reference

- Remove the "Authenticate HTTP Client Requests" page which is superseded by information in the updated GraphQL/Data API "Authenticate" pages

# January 20, 2023

## Get Started

- Update Device Sync tutorials for Flutter, Kotlin, React Native, and SwiftUI for the new v2 template apps
- Temporarily remove Xamarin from Device Sync tutorials, to be replaced with Maui tutorial when the corresponding template app is live in the UI

## Device Sync

- Go to Production with Sync/Compact an Atlas Volume: Remove erroneous info about increasing an Atlas cluster size triggering a rolling resync

## Users & Authentication

- Enable User Metadata: Update the list of links to SDK documentation pages for accessing user metadata from a client

## MongoDB Data Sources

- Overview: Add info that App Services automatically handles opening and closing database connections

## Reference

- Template Apps: Update the list of available template apps and add a new Get a Template App Client section with info about UI ZIP download, Realm CLI, and GitHub repositories

# January 13, 2023

## Manage & Deploy Apps

- Configure/App Configuration Reference/Users & Authentication Providers: Update Custom User Data config with details about `on_user_creation_function_name`

## Users & Authentication

- Enable Custom User Data: New section with code example showing how to use a Function to create a user with custom metadata

## App Services Admin API

- Add Custom User Data endpoint documentation for `GET` and `PATCH` with request details and example response

## Other

- Internal: Remove over 100 unused files from repository, add CI to check for unused files in PRs

# January 6, 2023

## Device Sync

- Configure and Update Your Data Model/Create a Data Model: Add a link to the C++ SDK object model page
- Configure Sync/Pause or Terminate Sync: Add dropping a collection to the list of things that require you to terminate Sync

## Data API

- Data API Endpoints
  - Add an "Authorization" section with details about authorization schemes
  - Add an "Authorize The Request" section detailing authorization configuration options
- Custom HTTPS Endpoints: Add a section about the ability to define custom authorization schemes and `can_evaluate`, update code examples

## Reference

- Service Limitations: Updates and clarifications about using Device Sync with time series collections, required MongoDB versions for Device Sync, and performance implications of concurrent writes

## Other

- Update some pages to fix monospace in section subheads

# December 30, 2022

- Added examples for valid ISO-8601 start and end query parameters in `adminGetMetrics` endpoint

# December 23, 2022

- Device Sync:
  - Add link to C++ docs
  - Alphabetize SDK list

# December 16, 2022

## Device Sync

- App Builder's Resources: New section with new and moved pages
  - Flexible Sync Permissions Guide: Existing content moved from the "Configure Device Sync" section
  - Sync Atlas Data with Client: New page showing how to sync data that already exists in Atlas with a client app
  - Sync Client Data with Atlas: New page showing how to sync data in a client application with Atlas
  - Stream Data from Client to Atlas: New page showing how to use asymmetric sync to sync data unidirectionally from a client app to Atlas
  - Add Sync to a Local-Only App: Existing content moved from the top-level Device Sync navigation into this section

## Data API

- Custom HTTPS Endpoints: Add an end-to-end example for a custom HTTPS endpoint function

## Functions

- Landing Page: Update Atlas Function max timeout in "Constraints" section from 150 seconds to 180 seconds

## App Services Admin API

- Document new GET/PUT endpoints to get or set the user refresh token expiration time

# December 9, 2022

## Device Sync

- Configure and Update Your Data Model
  - Create a Data Model: Update a link to the React Native SDK
  - Update a Data Model: Add a link to the Swift SDK's new remap a property name feature
  - Data Model Mapping: Update a link to the React Native SDK
- Handle Errors/Sync Errors: Add links to the Flutter and Kotlin SDK pages for handling Sync errors

## Functions

- Landing page: Add a link to the Flutter SDK, update SDK names

## Triggers

- Send Trigger Events to AWS EventBridge: Add information about enabling the Extended JSON (EJSON) format

## Users & Authentication

- Delete or Prevent Users from Accessing an App: Add tabs for Flutter, Kotlin, and the Web SDK, update SDK names

## Realm CLI

- Landing page: Typo fix

## App Services Admin API

- Update the `AWS_EVENTBRIDGE` object's `extended_json_enabled` field to show that it defaults to `false`
- Metrics: Update the description & provide an example response for the `GET` metrics endpoint

## Reference

- Metrics Reference: New page with detailed information about metric format, units, and available metrics

## Other

- Landing page: Fix an incorrect Realm SDK naming reference

# December 2, 2022

## Manage & Deploy Apps

- Create
  - Realm CLI: Remove outdated Template App table, and link out to the Template App page for the list of current app templates
  - App Services API: Remove outdated Template App table, and link out to the Template App page for the list of current app templates
- Deploy
  - Deployment Models & Regions:
    - Cloud Deployment Regions: Add more details about global vs. local deployment region availability, deployment proximity, link to deployment model
    - Add new deployment region: `aws-us-east-2` (Ohio)
- Secure: Network Security/Firewall Configuration: Add new IP addresses for `aws-us-east-2` to AWS outbound requests list

## Reference

- Template Apps: Add Flexible Sync Rules guides to table of available app templates, update descriptions, alphabetize list
- Service Limitations: Remove "Maximum Number of Concurrent Listening Clients" and information about `watch()` limits from the Change Stream Limitations section

## App Services Admin API

- Applications:
  - Update description of `provider_region` and the `CloudProviderRegion` `id` with more details and link to Cloud Deployment Regions page
  - Add `aws-us-east-2` to the list of valid AWS deployment regions
- Data API & Endpoints: Add details and example of creating a base URL for Data API endpoints & custom HTPPS endpoints
- Unify credential support across the APIs by changing `-H 'api-key: <API Key>'` to `-H 'apiKey: <API Key>'`

# November 25, 2022

## Get Started

- Update Device Sync tutorials with prerequisites related to having an Atlas account, API key, and realm-cli

## Device Sync

- Streamline the Device Sync docs section, including:
  - Sync Settings: New page that details all the settings available in Sync.
  - Alter Your Sync Configuration: Remove page, merging relevant caveats into "Settings" and "Permissions" pages
  - Optimize Sync Atlas Usage: Move into the "Go to Production" section
  - Compact an Atlas Volume: Move into the "Go to Production" section
  - Various rewrites, touch-ups, and technical clarifications, with an emphasis on Flexible Sync usage
- Get Started: Add back a "Create Queries in Your Client Application" section that was removed in a recent refactoring

## Rules

- Expressions: Update json expansions to list the expansion first, fixing a broken closing parenthesis

## Other

- App Services Admin API
  - List pending user registrations
  - Update the auth provider endpoints to have full details for each provider type
- Add a Redocly OpenAPI lint config to turn off a couple of rules emitting warnings
- Add redirects for some moved pages to fix broken links
- Internal: update many pages to remove source constants, replace them with the product name

# November 18, 2022

## Manage & Deploy Apps

- Deploy/Deployment Models & Regions: Add São Paulo to the table of deployment regions
- Secure: Add São Paulo IP addresses to the "AWS Outbound IP Addresses" list

## Device Sync

- Configure and Update Your Data Model/Data Model Mapping: Add details about `Array`, `EmbeddedObject`, `Set`, and `Dictionaries`, as well as relationships, with links out to relevant documentation

## Users & Authentication

- Authentication Providers: Where pages show an authentication provider configuration, add a note that `name` is the same as its `type`

## Static Hosting

- File Metadata Attributes: Add `Website-Redirect-Location` to metadata info

## Other

- App Services Admin API
  - Applications: Add documentation for product types in the GET all Apps endpoint
  - Authentication Providers: where endpoints show an authentication provider configuration, add a note that `name` is the same as its `type`
  - Deployment: Add documentation for GET and PATCH deployment configuration
  - Environments: Add documentation for Set Environment & Environment Values endpoints
  - Add the São Paulo region ID to the list of available AWS deployment regions
- Release Notes: Add release notes for new São Paulo region, updates to the Admin API endpoint to fetch Atlas Triggers and Atlas Data API apps

# November 11, 2022

## Manage & Deploy Apps

- Configure/App Configuration Reference/Atlas Device Sync: Clarify that if a user has write permission, they also have read permission, regardless of the value of a `read` field or expression.
- Deploy/Deployment Models & Regions: Add `Region` column to Cloud Deployment Regions reference table

## Device Sync

- Configure and Update Your Data Model: Refactor section to improve clarity about schema/data modeling
  - Refactor Data Model Overview to be higher level
  - Change "Schema" to "Data Model" in navigation
  - Refer to "App Services Schema" instead of "Device Sync Schema"
  - Add a new "Data Model Mapping" page describing how Realm Objects map to the App Services Schema
- Configure Sync/Compact an Atlas Volume: New page with an overview and steps to compact an Atlas volume
- Handle Errors/Client Reset: Add a new tab with a link to the Flutter SDK client reset docs
- Throughout section: De-emphasize Partition-Based Sync. Where both apply, for example in configuration, present Flexible Sync first. Where possible, move Partition-Based Sync docs to a new Partition-Based Sync Mode page in the Reference section.

## Data API

- Data API Endpoints: Add `<Cloud>` to endpoint base URL example

## Triggers

- Disable a Trigger: New "Restoring from a Snapshot" section

## Users & Authentication

- Authentication Providers/API Key Authentication: Add more details about User vs. Server API keys

## Reference

- Template Apps: Remove note about how to get outdated UIKit template app; it only supports Partition-Based Sync and is not compatible with the Flexible Sync backend

## Other

- Admin API
  - Data API
    - Fix broken link to configuration reference docs
    - Add `validation_method` details to endpoints
  - GraphQL API: Fix broken link to configuration reference docs
  - Endpoints: Add `function_id` to config object details in create endpoint

# November 4, 2022

## Get Started

- Device Sync Tutorial/Flutter: Remove the step instructing users to delete app data; no longer needed after template app updates
- Triggers, Functions & Values Tutorial: Update the GitHub Issue Tracker tutorial to fix bugs, clarify wording, add info in places

## Device Sync

- Define Data Access Patterns/Flexible Sync Permissions Guide: Update permissions template names

## Triggers

- Triggers Code Examples: New link in the Table of Contents going to the Triggers examples GitHub repository
- Various pages: Link to the Triggers examples GitHub repository where relevant throughout section

## Users & Authentication

- Various pages: Add Flutter SDK to SDK tabs on authentication provider pages

## Reference

- Template Apps: Update template app descriptions in the table of available templates

## Other

- Admin API: Add new endpoint to retrieve App Services metrics
- New [atlas-app-services-examples GitHub repository in the MongoDB org](https://github.com/mongodb/atlas-app-services-examples/tree/main/triggers-examples) containing Triggers & Functions use cases and code examples, including integration tests

# October 28, 2022

## Get Started/Tutorials

- Change "Tutorials" to "Get Started" in the left navigation
- Create a "Get Started" landing page with information about template apps and cards for tutorials
- Move client tutorials from Realm docs to this section
- Device Sync Tutorial - Flutter: Incorporate feedback from a Google Developer Advocate's review

## Device Sync

- Landing Page: Create new Device Sync landing page, and apply small tweaks
- Get Started: Remove unnecessary text from "Overview" page, rename it to "Get Started"
- Define Data Access Patterns/Sync Rules and Permissions: Add `%stringToOid` to supported expansions
- Go to Production: New section
  - Production Load Testing: Existing page moved from the top-level navigation within the Sync section
  - Production Checklist: New page containing the "Best Practices" from the old "Overview" page
- Technical Details: New section containing the Sync Protocol & Conflict Resolution pages moved from "Learn" section
- Remove the "Learn" section

## Users & Authentication

- Authentication Providers/Custom JWT Authentication: Move former "JWT Tutorial" to a new "Walkthrough" section on this page

## MongoDB Data Sources

- CRUD & Aggregation APIs: Remove `arrayFilters` from unsupported options

## Reference

- Billing
  - Clarify free tier billing description
  - Add new "Free tier thresholds" subsection to improve information discoverability
  - Remove bold text after links to address styling bug

## Other

- Admin API: Add details for Trigger event processors
- Various: Update note about third-party service deprecation to reflect new date of **1 Aug 2023**

# October 21, 2022

## Manage & Deploy Apps

- Configure/App Configuration Reference/Triggers: Add the `tolerate_resume_errors` bool to the config documentation

## Device Sync

- What is Atlas Device Sync/Atlas Device Sync Overview: Update prerequisites to add details about MongoDB version required for Flexible Sync
- Configure Sync/Enable Atlas Device Sync: Remove unnecessary screenshots, remove steps from Asymmetric Sync details

## Functions

- Context: Add `context.app` to Function context, new "Get App Metadata" section with details

## Triggers

- Database Triggers: Add details about automatically resuming a suspended trigger

## MongoDB Data Sources

- Wire Protocol: Update Wire Protocol URLs to match new pattern

## Other

- Admin API: Add `tolerate_resume_errors` to trigger properties
- Release Notes: Add release notes for October 20, 2022 release

# October 14, 2022

## Functions

- JavaScript Support: Added BigInt to list of supported JS objects and alphabetized list of objects
- Query MongoDB Atlas, Aggregate Data
  - Find Data with Atlas Search: Made note about limitations to the $$SEARCH_META aggregation variable and under what conditions the variable is available for use
- Functions, Constraints: Raised request timeout from 120s to 150s

## MongoDB Data Sources

- CRUD & Aggregation APIs: Made note about limitations to the $$SEARCH_META aggregation variable and under what conditions the variable is available for use

## Manage & Deploy Apps

- Deployment Models & Regions: Removed Ohio and Sao Paulo from local regions list
- Secure, Firewall Configuration: Added AWS, Azure, and GCP IP addresses to firewall configuration

## Admin API

- Applications: Removed Ohio and Sao Paulo from local regions list

# October 7, 2022

## Manage & Deploy Apps

- Configure/App Configuration Reference/Atlas Device Sync: Update configuration details for Recovery Mode

## Device Sync

- What is Atlas Device Sync?/Atlas Device Sync Overview: Add link to Realm SDKs on first reference
- Configure and Update Your Data Model
  - Update a Schema: Specify that breaking changes prevent automatic client recovery and require client applications to implement a manual error handler
- Configure Sync
  - Enable Atlas Device Sync: Update procedure details with info about Client Max Offline Days and Recovery Mode
  - Pause or Terminate Sync: Remove "manual" from client reset mentions, add link to React Native SDK client reset docs
- Handle Errors
  - Client Reset: Update docs for client recovery, including:
    - Add information about automatic client recovery
    - Add a new procedure for how to enable or disable Recovery Mode
    - Provide details about the different client reset modes & client reset recovery rules
    - Update details about discard local - now discard unsynced changes
    - Cover how to handle breaking schema changes
  - Sync Errors: Clarify that `ErrorWriteNotAllowed` in older Realm SDK versions requires a manual client reset

## Static Hosting

- Landing page
  - Add note about static hosting requiring a paid tier
  - Remove reference docs links from landing page to reduce duplication & maintenance issues
- Enable Hosting: Add note about static hosting requiring a paid tier

## Values & Secrets

- Landing page: Remove reference docs links from landing page to reduce duplication & maintenance issues

## Logs

- Landing page: Remove reference docs links from landing page to reduce duplication & maintenance issues

## Other

- Admin API: Add endpoints for getting a single deploy and redeploying an app

# September 30, 2022

## Manage & Deploy Apps

- Create/Realm CLI: Remove deployment regions and link to new reference table
- Deploy
  - Deployment Models & Regions: Update Cloud Deployment Regions to be a comprehensive reference table
  - Automate Deployment/Deploy Automatically with GitHub: Remove outdated note that refers to v1 app structure/CLI
- App Configuration Reference/App Services App: Remove deployment regions and link to new reference table

## Device Sync

- What is Atlas Device Sync/Atlas Device Sync Protocol: Fix typo

## Triggers

- Triggers Landing Page: Move info from "Overview" page to create a Triggers landing page
- Database Triggers
  - Update Project Expression docs for inclusive/exclusive project expressions
  - Remove outdated version-specific note
  - Update details about supported functionality and use cases
  - Move usage example details onto page from "Usage Examples" section
- Authentication Triggers: Move usage example details onto page from "Usage Examples" section
- Scheduled Triggers: Move usage example details onto page from "Usage Examples" section
- Disable a Trigger: Move page from "Usage Examples" section to Triggers top-level navigation
- Send Trigger Events to AWS EventBridge: Move page from "Usage Examples" section to Triggers top-level navigation

## Other

- App Services Landing Page: Redesign landing page with new styling, task-focused content, and key features
- Admin API: Update Applications endpoints with details for current state of configuration object and provider regions

# September 23, 2022

## Manage & Deploy Apps

- Secure: Add Data API & GraphQL to bullet list of App Services secured by TLS 1.3

## Data API

- Data API Examples: New "Data Access Permissions" section with information about custom rules, with examples

## Functions

- Query MongoDB Atlas
  - Aggregate: New "Find Data with Atlas Search" section with information and example
  - MongoDB API Reference: New sections for `mongodb.admin()` and `mongodb.getDBNames()` methods to list the database names for a data source
- Handle Errors: New page with information and examples for how to handle errors in Functions

## Logs

- Landing Page: Update links in Log Entry bullet list, add bullets for Change Stream & Endpoint Requests

## Reference

- Third-Party Services/Replace Services with npm Modules: Fix AWS SDK code example

## Other

- Admin API
  - Data Sources & Services: Add service config definitions
  - Schemas: Add endpoints to get and set null schema type validation settings
  - Triggers: Add endpoint to get a list of all Triggers, update Trigger definitions and examples for each Trigger type
- Fix broken link in release notes
- Update references to "data lake" to use "data federation" across several pages

# September 9, 2022

## Tutorials

- Set up JWT Authentication: Replace mention of the now-deprecated backend tutorial with links to Template Apps and docs on how to create an App Services App

## Functions

- Query MongoDB Atlas/MongoDB API Reference: Add new `database.getCollectionNames()` section showing how to get a list of all collection names in the database

## Triggers

- Atlas Triggers Overview && Database Triggers: Add line about how Atlas Triggers run on a serverless compute layer

## Users & Authentication

- Authentication Providers/Email/Password Authentication: Add details about available email confirmation customization options

## Other

- Introduction: Update description of tutorials to match new tutorial structure
- Fix broken links across various pages

# September 1, 2022

## Device Sync

- Handle Errors/Sync Errors: New section with details about the Compensating Write error

## Data API

- Data API Examples: New page with examples demonstrating how to send requests to the Data API

## Other

- Admin API: Correct the success message for the `adminGetService` endpoint

# August 26, 2022

## Manage & Deploy Apps

- Deploy/Deployment Models & Regions: Add GCP regions

## Device Sync

- Overview: Clarify the Web SDK does not support Device Sync, but you can query via MongoDB Data Access or GraphQL

## Other

- Template Apps page: Update React Native description to include @realm/react library
- Product naming updates across many pages to improve first/subsequent naming compliance and other naming issues

# August 19, 2022

## Manage & Deploy Apps

- Secure: Add info about DNS Filtering when communicating from a Sync client to the Sync Server

## Device Sync

- Define Data Access Patterns/Sync Rules and Permissions: Restore collection-specific rule example and info

# August 12, 2022

## Manage & Deploy Apps

- Configure/App Configuration Reference/Create Template Configurations with Expansions: Document how to specify an environment

## Other

- Admin API: Document the new `GET` endpoint to list all available Atlas App cloud regions

# August 5, 2022

## Manage & Deploy Apps

- Configure/App Configuration Reference/Atlas Device Sync: Update Flexible Sync config for type-specific and field-level permissions

## Device Sync

- Define Data Access Patterns/Sync Rules & Permissions: Update Flexible Sync role information for type-specific and field-level permissions

## GraphQL API

- Landing Page: Update limitations to clarify the GraphQL API does not currently support relationships for fields inside arrays of embedded objects

## Functions

- Query MongoDB Atlas/Write: Add missing underscore to field name

## Schemas

- Relationships: Add "Important" callout about the GraphQL API not supporting embedded object relationships

# July 29, 2022

## Device Sync

- What is Atlas Device Sync/Atlas Device Sync Overview: Fix typos in Offline-First section

## Functions

- Query MongoDB Atlas/Read: Use ISODate format in Atlas Functions

## Other

- Template Apps: Add link targets for linking from realm-docs
- Fix broken links to .NET client reset page
- Remove outdated "App Services Security" page, redirect to Manage & Deploy Apps/Application Security page

# July 22, 2022

## Functions

- Functions Landing Page: Update socket limit from 5 to 25 using the net built-in module

## Other

- Switch all YAML step files to use new rST procedure directive

# July 15, 2022

## Manage & Deploy Apps

- Create/Atlas App Services UI: Update screenshots, remove source constants, wording improvements
- Configure/App Configuration Reference/MongoDB Data Sources: Typo fix

## Device Sync

- Configure & Update Your Data Model/Sync Schema Overview: Define JSON Schema title
- Define Data Access Patterns/Flexible Sync Permissions Guide
  - Update a name from "MongoDB Realm" to "Atlas Apps"
  - Add CTA button to "Deploy a Template App"
- Configure Sync/Optimize Sync Atlas Usage:
  - New section w/details about Trimming in Flexible Sync apps
  - Update docs for Client Maximum Offline Time setting to add default of 30 days for new apps

## Data API

- Landing Page: Add note that App Services does not support private endpoints

## Triggers

- Database Triggers: Clarify that an error condition shows as a `ChangeStreamHistoryLost` error in logs

## Users & Authentication

- Landing Page: Add note about Apple account deletion requirements
- Delete or Prevent Users From Accessing an App: Add deleteUser endpoints for Node.js & RN SDKs, add custom func example to delete users via Admin API
- Authentication Providers/Custom JWT Authentication: Updated JWT configuration to reflect multiple audiences

## Rules

- Role-based Permissions: Typo fix

## Logs

- Endpoint Logs: New page documenting endpoint logs in the style of the other logs pages

## Reference

- Known Issues & Workarounds: Add section about `ChangeStreamHistoryLost` errors
- Service Limitations: Add note that App Services does not support private endpoints

## Other

- App Services Landing Page: Add CTA button to "Create an Account"
- Template Apps
  - Add CTA button to "Check out the Template Apps"
  - Update the App Services UI screenshot
  - Wording improvements
- Update App Services Table of Contents to shift main "Atlas" services more prominently in the ToC
- Update page & section names per product naming guidelines

# July 8, 2022

## Atlas Device Sync

- What is Sync/Overview: Add guidance to Best Practices regarding splitting large write transactions
- Data Access Patterns/Choose a Sync Mode: Remove a mention of Flexible Sync being in preview

## Users & Authentication

- Authentication Providers/Email/Password Authentication: Refactor to improve readability

## GraphQL API

- Update naming at first mention on every page to `Atlas GraphQL API` to be consistent with naming guidance
- Reorder pages in table of contents based on order of use/relevance

## Data API

- Data API Landing Page: Add section with information about Supported Environments
- Data API Endpoints: Clarify that you can use Data API to query Atlas from a mobile application
- Custom HTTPS Endpoints: Clarify custom endpoint routes
- Correct Data API auth docs to use `runAsSystem` instead of `runAsSystemUser`

## Other

- Admin API: Add endpoint and info for Sampling and Validating Documents
- Update "Data Lake" naming to "Data Federation" across many docs

# July 1, 2022

## Manage & Deploy Apps

- Configure/App Configuration Reference: Add warning about reserved file names

## Atlas Device Sync

- Define Data Access Patterns
  - Choose Your Sync Mode: Specify devs can apply permissions on both document and field level
  - Sync Rules and Permissions: Add field-level permissions details
- Configure Sync/Enable Atlas Device Sync: Add link to new field-level permission info

## Functions

- Test Functions: New page w/guidance & tested code examples for testing Functions

## Triggers

- Authentication Triggers: Edits to improve readability

## Other

- Template Apps: Add Flexible Sync Template Apps to the list of available Template Apps
- Admin API
  - Move API reference from Reference to main sidebar navigation
  - Add Default Rules endpoints and info

# June 24, 2022

## Atlas Device Sync

- Define Data Access Patterns/Flexible Sync Permissions Guide: Add Flexible Sync permissions Template Apps to the page
- Event Library: Add docs for the Event Library w/link to Swift SDK client-side implementation details

## Users & Authentication

- Delete or Prevent Users from Accessing an App: Add link to .NET SDK docs for the delete a user API

## Data API

- Data API Endpoints: Remove Access-Control-Request-Headers from Data API examples

## Triggers

- Database Triggers: Change `operation_type` from snakecase to camelcase

# June 17, 2022

## Manage & Deploy Apps

- Configure/App Configuration Reference/MongoDB Data Sources: Add new section w/info for Default Rules

## Atlas Device Sync

- Define Data Access Patterns/Flexible Sync: Add link to Kotlin SDK Flexible Sync guide
- Add Sync to a Local-Only App: Update with Flexible Sync details, links to SDKs that have copy local-to-synced Realm methods

## Rules

- Rules: Add new section for Default Rules
- Role-based Permissions: Update procedures to define Roles & Permissions, add details about Document-level and Field-level Permissions, how permissions are applied

## Data API

- Data API Endpoints: Add new `API Versions` & `Choose an API Version` sections

## Functions

- Query MongoDB Atlas/MongoDB API Reference
  - Update `insertMany()` to include `options.ordered`
  - Fix monospace method titles

## Realm CLI

- Remove auto-generated message from each page stating that the pages are autogenerated
- Add missing flags (`--include-node-nodules` and `--include package-json`) to `realm-cli pull`

# June 10, 2022

The App Services docs release notes start here from week ending May 27, 2022. Prior to this, the App Services docs release notes were presented alongside the Realm docs release notes in the [Realm Database Docs repository](https://github.com/mongodb/docs-realm/blob/master/docs-release-notes.md).

## Manage & Deploy Apps

- Deploy/Deployment Models & Regions
  - Add new Azure deployment regions
  - Specify regions tha support only local deployment

## Atlas Device Sync

- Define Data Access Patterns
  - Choose Your Sync Mode: Remove Preview from Flexible Sync name & note about Flex Sync being in Preview
  - Flexible Sync
    - Add link to Flexible Sync Permissions Guide
    - Add section on Optimizing Sync with Asymmetric Sync
    - Add link to Flutter SDK re: creating queries in the client application
  - Sync Rules and Permissions: Add link to Flexible Sync Permissions Guide
  - Flexible Sync Permissions Guide
    - New page detailing Flexible Sync permissions patterns for common use cases, with setup procedures and code examples
    - Update Restricted News Feed permission strategy with a `subscribeToUser` Function
    - Add workaround note for Custom User Data
- Configure Sync
  - Enable Atlas Device Sync
    - Add section about configuring Asymmetric Sync to the Flexible Sync procedure
    - Remove note about Flexible Sync being in Preview

## Users & Authentication

- Create a User: Add links to relevant Kotlin SDK and Flutter SDK examples
- Enable Custom User Data: Add link to relevant Flutter SDK example
- Authentication Providers
  - Anonymous Authentication: Add links to relevant Kotlin SDK and Flutter SDK examples
  - Email/Password Authentication: Add links to relevant Kotlin SDK and Flutter SDK examples
  - Custom JWT Authentication: Add link to relevant Kotlin SDK example
  - API Key Authentication: Add link to relevant Kotlin SDK example
  - Facebook Authentication: Add link to relevant Kotlin SDK example
  - Google Authentication: Add link to relevant Kotlin SDK example
  - Apple ID Authentication: Add link to relevant Kotlin SDK example

## MongoDB Data Sources

- CRUD & Aggregation APIs: Add footnote about `allowDiskUse` being supported for system users

## Data API

- Landing page: New landing page for Data API
- Data API endpoints: New page containing content ported from Atlas with modifications for App Services
- Custom HTTPS Endpoints: Formerly the HTTPS Endpoints page, with content updated to align with generated endpoints

## Functions

- Overview: Add basic function example early in the page
- Query MongoDB Atlas
  - Read: Fix Find One example that wrongly shows Insert Many
  - MongoDB API Reference: Clarify that you can use evaluation, geospatial and bitwise in system functions

## Realm CLI

- Consolidate the "Realm CLI Authenticate with API Token" page formerly in the "Reference" section onto the main Realm CLI page

## Reference

- App Services Admin API: Add Data API endpoints for get/create/update Data API configs

Many Pages:

- Rename MongoDB Realm -> App Services
