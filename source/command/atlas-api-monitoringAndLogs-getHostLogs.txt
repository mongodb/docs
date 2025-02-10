.. _atlas-api-monitoringAndLogs-getHostLogs:

=======================================
atlas api monitoringAndLogs getHostLogs
=======================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a compressed (.gz) log file that contains a range of log messages for the specified host for the specified project.

MongoDB updates process and audit logs from the cluster backend infrastructure every five minutes. Logs are stored in chunks approximately five minutes in length, but this duration may vary. If you poll the API for log files, we recommend polling every five minutes even though consecutive polls could contain some overlapping logs. This feature isn't available for M0 free clusters, M2, M5, flex, or serverless clusters. To use this resource, the requesting API Key must have the Project Data Access Read Only or higher role. The API does not support direct calls with the json response schema. You must request a gzip response schema using an accept header of the format: "Accept: application/vnd.atlas.YYYY-MM-DD+gzip". This command is invoking the endpoint with OperationID: 'getHostLogs'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Monitoring-and-Logs/operation/getHostLogs

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api monitoringAndLogs getHostLogs [options]

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
     - specifies the date and time for the ending point of the range of log messages to retrieve, in the number of seconds that have elapsed since the UNIX epoch
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
     - help for getHostLogs
   * - --hostName
     - string
     - true
     - human-readable label that identifies the host that stores the log files that you want to download
   * - --logName
     - string
     - true
     - human-readable label that identifies the log file that you want to return
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
     - specifies the date and time for the starting point of the range of log messages to retrieve, in the number of seconds that have elapsed since the UNIX epoch
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2023-01-01", "2023-02-01"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2023-02-01".

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

