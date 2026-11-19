.. _atlas-api-shardKeyAnalyzer:

==========================
atlas api shardKeyAnalyzer
==========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Analyzes how well a candidate shard key would distribute a collection across the shards of a cluster.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Analyzing a shard key samples documents on a live cluster and does not finish within one request, so it is submitted as a long-running operation: the request returns an operation to poll, and the completed analysis is a separate resource that the operation links to. To receive the most common shard key values, you must have the Project Data Access Read Only role or higher. Otherwise, MongoDB Cloud omits those values, because they come from the collection's data rather than from statistics about it.

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
     - help for shardKeyAnalyzer

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

* :ref:`atlas-api-shardKeyAnalyzer-createShardKeyAnalysis` - Analyzes how well one candidate shard key would distribute one collection across the shards of the specified cluster.
* :ref:`atlas-api-shardKeyAnalyzer-getAnalysisOperation` - Returns the progress of one shard key analysis for the specified cluster.
* :ref:`atlas-api-shardKeyAnalyzer-getShardKeyAnalysis` - Returns one completed shard key analysis for the specified cluster.
* :ref:`atlas-api-shardKeyAnalyzer-listAnalysisOperations` - Returns every shard key analysis attempt for the specified cluster, newest first, including attempts that are still running and attempts that failed.
* :ref:`atlas-api-shardKeyAnalyzer-listShardKeyAnalyses` - Returns all completed shard key analyses for the specified cluster, newest first.


.. toctree::
   :titlesonly:

   createShardKeyAnalysis </command/atlas-api-shardKeyAnalyzer-createShardKeyAnalysis>
   getAnalysisOperation </command/atlas-api-shardKeyAnalyzer-getAnalysisOperation>
   getShardKeyAnalysis </command/atlas-api-shardKeyAnalyzer-getShardKeyAnalysis>
   listAnalysisOperations </command/atlas-api-shardKeyAnalyzer-listAnalysisOperations>
   listShardKeyAnalyses </command/atlas-api-shardKeyAnalyzer-listShardKeyAnalyses>
