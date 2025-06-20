.. _atlas-api-monitoringAndLogs-getHostMeasurements:

===============================================
atlas api monitoringAndLogs getHostMeasurements
===============================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns disk, partition, or host measurements per process for the specified host for the specified project.

Returned value can be one of the following:



Throughput of I/O operations for the disk partition used for the MongoDB process


Percentage of time during which requests the partition issued and serviced


Latency per operation type of the disk partition used for the MongoDB process


Amount of free and used disk space on the disk partition used for the MongoDB process


Measurements for the host, such as CPU usage or number of I/O operations



To use this resource, the requesting API Key must have the Project Read Only role. This command is invoking the endpoint with OperationID: 'getHostMeasurements'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Monitoring-and-Logs/operation/getHostMeasurements

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api monitoringAndLogs getHostMeasurements [options]

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
     - help for getHostMeasurements
   * - --m
     - stringArray
     - false
     - one or more types of measurement to request for this MongoDB process
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
   * - --pretty
     - 
     - false
     - flag that indicates whether the response body should be in the prettyprint format
   * - --processId
     - string
     - true
     - combination of hostname and Internet Assigned Numbers Authority (IANA) port that serves the MongoDB process
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

