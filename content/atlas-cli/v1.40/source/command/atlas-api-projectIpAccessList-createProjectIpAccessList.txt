.. _atlas-api-projectIpAccessList-createProjectIpAccessList:

=======================================================
atlas api projectIpAccessList createProjectIpAccessList
=======================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Adds one or more access list entries to the specified project.

MongoDB Cloud only allows client connections to the cluster from entries in the project's IP access list. Write each entry as either one IP address or one CIDR-notated block of IP addresses. To use this resource, the requesting API Key must have the Project Owner or Project Charts Admin roles. This resource replaces the whitelist resource. MongoDB Cloud removed whitelists in July 2021. Update your applications to use this new resource. The /groups/{GROUP-ID}/accessList endpoint manages the database IP access list. This endpoint is distinct from the orgs/{ORG-ID}/apiKeys/{API-KEY-ID}/accesslist endpoint, which manages the access list for MongoDB Cloud organizations. This endpoint doesn't support concurrent POST requests. You must submit multiple POST requests synchronously. This command is invoking the endpoint with OperationID: 'createProjectIpAccessList'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Project-IP-Access-List/operation/createProjectIpAccessList

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api projectIpAccessList createProjectIpAccessList [options]

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
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - --file
     - string
     - false
     - path to the file which contains the api request contents
   * - --groupId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies your project
   * - -h, --help
     - 
     - false
     - help for createProjectIpAccessList
   * - --includeCount
     - 
     - false
     - flag that indicates whether the response returns the total number of items (totalCount) in the response
   * - --itemsPerPage
     - int
     - false
     - number of items that the response returns per page
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

