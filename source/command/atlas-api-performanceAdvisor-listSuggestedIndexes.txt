.. _atlas-api-performanceAdvisor-listSuggestedIndexes:

=================================================
atlas api performanceAdvisor listSuggestedIndexes
=================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the indexes that the Performance Advisor suggests.

The Performance Advisor monitors queries that MongoDB considers slow and suggests new indexes to improve query performance. To use this resource, the requesting API Key must have the Project Read Only role. This command is invoking the endpoint with OperationID: 'listSuggestedIndexes'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Performance-Advisor/operation/listSuggestedIndexes

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api performanceAdvisor listSuggestedIndexes [options]

.. Code end marker, please don't delete this comment

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --duration
     - int
     - false
     - length of time expressed during which the query finds suggested indexes among the managed namespaces in the cluster
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - --groupId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies your project
   * - -h, --help
     - 
     - false
     - help for listSuggestedIndexes
   * - --includeCount
     - 
     - false
     - flag that indicates whether the response returns the total number of items (totalCount) in the response
   * - --itemsPerPage
     - int
     - false
     - number of items that the response returns per page
   * - --nExamples
     - int
     - false
     - maximum number of example queries that benefit from the suggested index
   * - --nIndexes
     - int
     - false
     - number that indicates the maximum indexes to suggest
   * - --namespaces
     - stringArray
     - false
     - namespaces from which to retrieve suggested indexes
   * - --output
     - string
     - false
     - preferred api format, can be ["json", go-template] This value defaults to "json".
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
   * - --pageNum
     - int
     - false
     - number of the page that displays the current set of the total objects that the response returns
   * - --pretty
     - 
     - false
     - flag that indicates whether the response body should be in the prettyprint format
   * - --processId
     - string
     - true
     - combination of host and port that serves the MongoDB process
   * - --since
     - int
     - false
     - date and time from which the query retrieves the suggested indexes
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2023-01-01"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2023-01-01".

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

