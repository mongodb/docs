.. _atlas-api-shardingRecommendations:

=================================
atlas api shardingRecommendations
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns Sharding Advisor recommendations for one cluster.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Recommendations describe changes that may improve the cluster's data distribution, such as adding shards or sharding a collection, together with the monitored conditions that produced them.

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
     - help for shardingRecommendations

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

* :ref:`atlas-api-shardingRecommendations-getClusterShardingRecommendations` - Returns the active Sharding Advisor recommendations for one cluster.


.. toctree::
   :titlesonly:

   getClusterShardingRecommendations </command/atlas-api-shardingRecommendations-getClusterShardingRecommendations>
