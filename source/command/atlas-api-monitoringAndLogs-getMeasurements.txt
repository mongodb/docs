.. _atlas-api-monitoringAndLogs-getMeasurements:

===========================================
atlas api monitoringAndLogs getMeasurements
===========================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the Atlas Search hardware and status data series within the provided time range for one process in the specified project.

You must have the Project Read Only or higher role to view the Atlas Search metric types. This command is invoking the endpoint with OperationID: 'getMeasurements'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Monitoring-and-Logs/operation/getMeasurements

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api monitoringAndLogs getMeasurements [options]

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
   * - --end
     - string
     - false
     - date and time when MongoDB Cloud stops reporting the metrics
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - --granularity
     - string
     - true
     - duration that specifies the interval at which Atlas reports the metrics
   * - --groupId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies your project
   * - -h, --help
     - 
     - false
     - help for getMeasurements
   * - --metrics
     - stringArray
     - true
     - list that contains the metrics that you want MongoDB Atlas to report for the associated data series
   * - --output
     - string
     - false
     - preferred api format, can be ["json", go-template] This value defaults to "json".
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
   * - --period
     - string
     - false
     - duration over which Atlas reports the metrics
   * - --processId
     - string
     - true
     - combination of hostname and IANA port that serves the MongoDB process
   * - --start
     - string
     - false
     - date and time when MongoDB Cloud begins reporting the metrics
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

