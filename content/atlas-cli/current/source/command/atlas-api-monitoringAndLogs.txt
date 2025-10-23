.. _atlas-api-monitoringAndLogs:

===========================
atlas api monitoringAndLogs
===========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns database deployment monitoring and logging data.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.



Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -h, --help
     -
     - false
     - help for monitoringAndLogs

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

Related Commands
----------------

* :ref:`atlas-api-monitoringAndLogs-downloadClusterLog` - Returns a compressed (.gz) log file that contains a range of log messages for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getDatabase` - Returns one database running on the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getDatabaseMeasurements` - Returns the measurements of one database for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getGroupProcess` - Returns the processes for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getIndexMeasurements` - Returns the Atlas Search metrics data series within the provided time range for one namespace and index name on the specified process.
* :ref:`atlas-api-monitoringAndLogs-getProcessDisk` - Returns measurement details for one disk or partition for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getProcessDiskMeasurements` - Returns the measurements of one disk or partition for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getProcessMeasurements` - Returns disk, partition, or host measurements per process for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-listDatabases` - Returns the list of databases running on the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-listGroupProcesses` - Returns details of all processes for the specified project.
* :ref:`atlas-api-monitoringAndLogs-listHostFtsMetrics` - Returns all Atlas Search metric types available for one process in the specified project.
* :ref:`atlas-api-monitoringAndLogs-listIndexMeasurements` - Returns the Atlas Search index metrics within the specified time range for one namespace in the specified process.
* :ref:`atlas-api-monitoringAndLogs-listMeasurements` - Returns the Atlas Search hardware and status data series within the provided time range for one process in the specified project.
* :ref:`atlas-api-monitoringAndLogs-listProcessDisks` - Returns the list of disks or partitions for the specified host for the specified project.


.. toctree::
   :titlesonly:

   downloadClusterLog </command/atlas-api-monitoringAndLogs-downloadClusterLog>
   getDatabase </command/atlas-api-monitoringAndLogs-getDatabase>
   getDatabaseMeasurements </command/atlas-api-monitoringAndLogs-getDatabaseMeasurements>
   getGroupProcess </command/atlas-api-monitoringAndLogs-getGroupProcess>
   getIndexMeasurements </command/atlas-api-monitoringAndLogs-getIndexMeasurements>
   getProcessDisk </command/atlas-api-monitoringAndLogs-getProcessDisk>
   getProcessDiskMeasurements </command/atlas-api-monitoringAndLogs-getProcessDiskMeasurements>
   getProcessMeasurements </command/atlas-api-monitoringAndLogs-getProcessMeasurements>
   listDatabases </command/atlas-api-monitoringAndLogs-listDatabases>
   listGroupProcesses </command/atlas-api-monitoringAndLogs-listGroupProcesses>
   listHostFtsMetrics </command/atlas-api-monitoringAndLogs-listHostFtsMetrics>
   listIndexMeasurements </command/atlas-api-monitoringAndLogs-listIndexMeasurements>
   listMeasurements </command/atlas-api-monitoringAndLogs-listMeasurements>
   listProcessDisks </command/atlas-api-monitoringAndLogs-listProcessDisks>
