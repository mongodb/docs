.. _atlas-api-ephemeralClusters:

===========================
atlas api ephemeralClusters
===========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create and return Atlas Ephemeral clusters.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

An Ephemeral cluster is a temporary Atlas Free cluster that you can claim within 7 days to convert into a standard Free cluster.


Use of this API, including any resources created through it, is governed by MongoDB’s Cloud Terms of Service and Privacy Policy. By using this API to create an Ephemeral cluster, you agree to these terms.


To learn more about Ephemeral clusters, see Create an Atlas Ephemeral Cluster in the MongoDB Atlas documentation.

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
     - help for ephemeralClusters

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

* :ref:`atlas-api-ephemeralClusters-createEphemeralCluster` - Creates an Atlas Ephemeral cluster and returns its connection and claim details.
* :ref:`atlas-api-ephemeralClusters-getEphemeralCluster` - Returns the details for one Atlas Ephemeral cluster.


.. toctree::
   :titlesonly:

   createEphemeralCluster </command/atlas-api-ephemeralClusters-createEphemeralCluster>
   getEphemeralCluster </command/atlas-api-ephemeralClusters-getEphemeralCluster>
