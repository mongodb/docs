.. _atlas-performanceAdvisor-slowQueryLogs-list:

===========================================
atlas performanceAdvisor slowQueryLogs list
===========================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return log lines for slow queries that the Performance Advisor and Query Profiler identified.

The Performance Advisor monitors queries that MongoDB considers slow and suggests new indexes to improve query performance. The threshold for slow queries varies based on the average time of operations on your cluster to provide recommendations pertinent to your workload.
		
If you don't set the duration option or the since option, this command returns data from the last 24 hours.

To use this command, you must authenticate with a user account or an API key with the Project Data Access Read/Write role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas performanceAdvisor slowQueryLogs list [options]

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
     - Length of time in milliseconds for which you want to return results. If you specify the since option, the duration starts at the date and time specified. If you don't set the since option, this command returns data from the duration before the current time.
   * - -h, --help
     - 
     - false
     - help for list
   * - --nLog
     - int
     - false
     - Maximum number of log lines to return. This value defaults to 20000.
   * - --namespaces
     - strings
     - false
     - Namespaces from which to retrieve suggested slow query logs formatted as <database>.<collection>. Omit this parameter to return results for all namespaces.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --processName
     - string
     - true
     - Unique identifier for the host of a MongoDB process in the following format: {hostname}:{port}. You can obtain a list of possible values from the 'id' field when you run the 'atlas processes list' command.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --since
     - int
     - false
     - Date and time from which the query retrieves the suggested indexes. Specify this value as the number of seconds that have elapsed since the UNIX epoch. If you don't set the duration option, this command returns data from the since value to the current time.

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

Examples
--------

.. code-block::
   :copyable: false

   # Return a JSON-formatted list of log lines for collections with slow queries for the atlas-111ggi-shard-00-00.111xx.mongodb.net:27017 host in the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas performanceAdvisor slowQueryLogs list --processName atlas-111ggi-shard-00-00.111xx.mongodb.net:27017 --projectId 5e2211c17a3e5a48f5497de3 --output json
