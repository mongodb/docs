.. _atlas-api-querySampling:

=======================
atlas api querySampling
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Starts, returns, and stops query sampling on one namespace of one cluster.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Sampled queries feed the shard key analysis for the namespace.

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
     - help for querySampling

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

* :ref:`atlas-api-querySampling-createClusterQuerySampling` - Starts query sampling on one namespace of the specified cluster.
* :ref:`atlas-api-querySampling-deleteClusterQuerySampling` - Stops query sampling on one namespace of the specified cluster.
* :ref:`atlas-api-querySampling-getClusterQuerySampling` - Returns the query sampling state of one namespace of the specified cluster, including counters for the operations sampled so far.


.. toctree::
   :titlesonly:

   createClusterQuerySampling </command/atlas-api-querySampling-createClusterQuerySampling>
   deleteClusterQuerySampling </command/atlas-api-querySampling-deleteClusterQuerySampling>
   getClusterQuerySampling </command/atlas-api-querySampling-getClusterQuerySampling>
