.. _atlas-api-collectionLevelMetrics:

================================
atlas api collectionLevelMetrics
================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, and edits pinned namespaces for the specified cluster or process.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Also returns collection level latency metric data.

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
     - help for collectionLevelMetrics

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

* :ref:`atlas-api-collectionLevelMetrics-getClusterNamespaces` - Return the subset of namespaces from the given cluster sorted by highest total execution time (descending) within the given time window.
* :ref:`atlas-api-collectionLevelMetrics-getProcessNamespaces` - Return the subset of namespaces from the given process ranked by highest total execution time (descending) within the given time window.
* :ref:`atlas-api-collectionLevelMetrics-listCollStatMeasurements` - Get a list of the Coll Stats Latency cluster-level measurements for the given namespace.
* :ref:`atlas-api-collectionLevelMetrics-listCollStatMetrics` - Returns all available Coll Stats Latency metric names and their respective units for the specified project at the time of request.
* :ref:`atlas-api-collectionLevelMetrics-listPinnedNamespaces` - Returns a list of given cluster's pinned namespaces, a set of namespaces manually selected by users to collect query latency metrics on.
* :ref:`atlas-api-collectionLevelMetrics-listProcessMeasurements` - Get a list of the Coll Stats Latency process-level measurements for the given namespace.
* :ref:`atlas-api-collectionLevelMetrics-pinNamespaces` - Pin provided list of namespaces for collection-level latency metrics collection for the given Group and Cluster.
* :ref:`atlas-api-collectionLevelMetrics-unpinNamespaces` - Unpin provided list of namespaces for collection-level latency metrics collection for the given Group and Cluster.
* :ref:`atlas-api-collectionLevelMetrics-updatePinnedNamespaces` - Add provided list of namespaces to existing pinned namespaces list for collection-level latency metrics collection for the given Group and Cluster.


.. toctree::
   :titlesonly:

   getClusterNamespaces </command/atlas-api-collectionLevelMetrics-getClusterNamespaces>
   getProcessNamespaces </command/atlas-api-collectionLevelMetrics-getProcessNamespaces>
   listCollStatMeasurements </command/atlas-api-collectionLevelMetrics-listCollStatMeasurements>
   listCollStatMetrics </command/atlas-api-collectionLevelMetrics-listCollStatMetrics>
   listPinnedNamespaces </command/atlas-api-collectionLevelMetrics-listPinnedNamespaces>
   listProcessMeasurements </command/atlas-api-collectionLevelMetrics-listProcessMeasurements>
   pinNamespaces </command/atlas-api-collectionLevelMetrics-pinNamespaces>
   unpinNamespaces </command/atlas-api-collectionLevelMetrics-unpinNamespaces>
   updatePinnedNamespaces </command/atlas-api-collectionLevelMetrics-updatePinnedNamespaces>
