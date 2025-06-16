.. _atlas-api-legacyBackup-listLegacySnapshots:

==========================================
atlas api legacyBackup listLegacySnapshots
==========================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all legacy backup snapshots for one cluster in the specified project.

To use this resource, the requesting API Key must have the Project Read Only role. Effective 23 March 2020, all new clusters can use only Cloud Backups. When you upgrade to 4.2, your backup system upgrades to cloud backup if it is currently set to legacy backup. After this upgrade, all your existing legacy backup snapshots remain available. They expire over time in accordance with your retention policy. Your backup policy resets to the default schedule. If you had a custom backup policy in place with legacy backups, you must re-create it with the procedure outlined in the Cloud Backup documentation. This command is invoking the endpoint with OperationID: 'listLegacySnapshots'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Legacy-Backup/operation/listLegacySnapshots

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api legacyBackup listLegacySnapshots [options]

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
   * - --clusterName
     - string
     - true
     - human-readable label that identifies the cluster
   * - --completed
     - string
     - false
     - human-readable label that specifies whether to return only completed, incomplete, or all snapshots
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
     - help for listLegacySnapshots
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

