.. _atlas-api-streams-downloadStreamTenantAuditLogs:

===============================================
atlas api streams downloadStreamTenantAuditLogs
===============================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Downloads the audit logs for the specified Atlas Streams Processing instance.

By default, logs cover periods of 30 days. To use this resource, the requesting API Key must have the Project Data Access roles, Project Owner role or Project Stream Processing Owner role. The API does not support direct calls with the json response schema. You must request a gzip response schema using an accept header of the format: "Accept: application/vnd.atlas.YYYY-MM-DD+gzip". This command is invoking the endpoint with OperationID: 'downloadStreamTenantAuditLogs'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Streams/operation/downloadStreamTenantAuditLogs

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api streams downloadStreamTenantAuditLogs [options]

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
   * - --endDate
     - int
     - false
     - timestamp that specifies the end point for the range of log messages to download
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
     - help for downloadStreamTenantAuditLogs
   * - --output
     - string
     - false
     - preferred api format, can be ["gzip"] This value defaults to "gzip".
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
   * - --startDate
     - int
     - false
     - timestamp that specifies the starting point for the range of log messages to download
   * - --tenantName
     - string
     - true
     - human-readable label that identifies the stream instance
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2023-02-01"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2023-02-01".

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

