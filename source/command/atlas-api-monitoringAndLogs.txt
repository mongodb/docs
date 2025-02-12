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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns database deployment monitoring and logging data.

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

* :ref:`atlas-api-monitoringAndLogs-getAtlasProcess` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the processes for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getDatabase` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one database running on the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getDatabaseMeasurements` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the measurements of one database for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getDiskMeasurements` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the measurements of one disk or partition for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getHostLogs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a compressed (.gz) log file that contains a range of log messages for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getHostMeasurements` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns disk, partition, or host measurements per process for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-getIndexMetrics` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the Atlas Search metrics data series within the provided time range for one namespace and index name on the specified process.
* :ref:`atlas-api-monitoringAndLogs-getMeasurements` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the Atlas Search hardware and status data series within the provided time range for one process in the specified project.
* :ref:`atlas-api-monitoringAndLogs-listAtlasProcesses` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details of all processes for the specified project.
* :ref:`atlas-api-monitoringAndLogs-listDatabases` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the list of databases running on the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-listDiskMeasurements` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns measurement details for one disk or partition for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-listDiskPartitions` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the list of disks or partitions for the specified host for the specified project.
* :ref:`atlas-api-monitoringAndLogs-listIndexMetrics` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the Atlas Search index metrics within the specified time range for one namespace in the specified process.
* :ref:`atlas-api-monitoringAndLogs-listMetricTypes` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all Atlas Search metric types available for one process in the specified project.


.. toctree::
   :titlesonly:

   getAtlasProcess </command/atlas-api-monitoringAndLogs-getAtlasProcess>
   getDatabase </command/atlas-api-monitoringAndLogs-getDatabase>
   getDatabaseMeasurements </command/atlas-api-monitoringAndLogs-getDatabaseMeasurements>
   getDiskMeasurements </command/atlas-api-monitoringAndLogs-getDiskMeasurements>
   getHostLogs </command/atlas-api-monitoringAndLogs-getHostLogs>
   getHostMeasurements </command/atlas-api-monitoringAndLogs-getHostMeasurements>
   getIndexMetrics </command/atlas-api-monitoringAndLogs-getIndexMetrics>
   getMeasurements </command/atlas-api-monitoringAndLogs-getMeasurements>
   listAtlasProcesses </command/atlas-api-monitoringAndLogs-listAtlasProcesses>
   listDatabases </command/atlas-api-monitoringAndLogs-listDatabases>
   listDiskMeasurements </command/atlas-api-monitoringAndLogs-listDiskMeasurements>
   listDiskPartitions </command/atlas-api-monitoringAndLogs-listDiskPartitions>
   listIndexMetrics </command/atlas-api-monitoringAndLogs-listIndexMetrics>
   listMetricTypes </command/atlas-api-monitoringAndLogs-listMetricTypes>

