.. _atlas-api-shardingInsights:

==========================
atlas api shardingInsights
==========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns the cluster-level sharding state of one sharded cluster, including the balancer state, config server availability, and the configured balancing window.

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
     - help for shardingInsights

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

* :ref:`atlas-api-shardingInsights-getClusterShardMetric` - Returns the size, load and open alerts of one shard in one sharded cluster.
* :ref:`atlas-api-shardingInsights-getClusterShardingInsights` - Returns the cluster-level sharding state of one sharded cluster: the number of shards, the balancer state, the availability of the config servers, and the configured balancing window.
* :ref:`atlas-api-shardingInsights-getShardMetricMeasurements` - Returns time series of the requested measurements for one shard of the specified sharded cluster.
* :ref:`atlas-api-shardingInsights-listClusterShardMetrics` - Returns the size and load of every shard in one sharded cluster.
* :ref:`atlas-api-shardingInsights-listShardMetricMeasurements` - Returns time series of the requested measurements for every shard of the specified sharded cluster, one series per shard and measurement.


.. toctree::
   :titlesonly:

   getClusterShardMetric </command/atlas-api-shardingInsights-getClusterShardMetric>
   getClusterShardingInsights </command/atlas-api-shardingInsights-getClusterShardingInsights>
   getShardMetricMeasurements </command/atlas-api-shardingInsights-getShardMetricMeasurements>
   listClusterShardMetrics </command/atlas-api-shardingInsights-listClusterShardMetrics>
   listShardMetricMeasurements </command/atlas-api-shardingInsights-listShardMetricMeasurements>
