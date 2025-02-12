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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, and edits pinned namespaces for the specified cluster or process.

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

* :ref:`atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespaceClusterMeasurements` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Get a list of the Coll Stats Latency cluster-level measurements for the given namespace.
* :ref:`atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespaceHostMeasurements` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Get a list of the Coll Stats Latency process-level measurements for the given namespace

This command is invoking the endpoint with OperationID: 'getCollStatsLatencyNamespaceHostMeasurements'.
* :ref:`atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespaceMetrics` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all available Coll Stats Latency metric names and their respective units for the specified project at the time of request.
* :ref:`atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespacesForCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Return the subset of namespaces from the given cluster sorted by highest total execution time (descending) within the given time window.
* :ref:`atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespacesForHost` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Return the subset of namespaces from the given process ranked by highest total execution time (descending) within the given time window.
* :ref:`atlas-api-collectionLevelMetrics-getPinnedNamespaces` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a list of given cluster's pinned namespaces, a set of namespaces manually selected by users to collect query latency metrics on.
* :ref:`atlas-api-collectionLevelMetrics-pinNamespacesPatch` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Add provided list of namespaces to existing pinned namespaces list for collection-level latency metrics collection for the given Group and Cluster

This command is invoking the endpoint with OperationID: 'pinNamespacesPatch'.
* :ref:`atlas-api-collectionLevelMetrics-pinNamespacesPut` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Pin provided list of namespaces for collection-level latency metrics collection for the given Group and Cluster.
* :ref:`atlas-api-collectionLevelMetrics-unpinNamespaces` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Unpin provided list of namespaces for collection-level latency metrics collection for the given Group and Cluster

This command is invoking the endpoint with OperationID: 'unpinNamespaces'.


.. toctree::
   :titlesonly:

   getCollStatsLatencyNamespaceClusterMeasurements </command/atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespaceClusterMeasurements>
   getCollStatsLatencyNamespaceHostMeasurements </command/atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespaceHostMeasurements>
   getCollStatsLatencyNamespaceMetrics </command/atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespaceMetrics>
   getCollStatsLatencyNamespacesForCluster </command/atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespacesForCluster>
   getCollStatsLatencyNamespacesForHost </command/atlas-api-collectionLevelMetrics-getCollStatsLatencyNamespacesForHost>
   getPinnedNamespaces </command/atlas-api-collectionLevelMetrics-getPinnedNamespaces>
   pinNamespacesPatch </command/atlas-api-collectionLevelMetrics-pinNamespacesPatch>
   pinNamespacesPut </command/atlas-api-collectionLevelMetrics-pinNamespacesPut>
   unpinNamespaces </command/atlas-api-collectionLevelMetrics-unpinNamespaces>

