.. _atlas-api-flexClusters:

======================
atlas api flexClusters
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes flex clusters.

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
     - help for flexClusters

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

* :ref:`atlas-api-flexClusters-createFlexCluster` - Creates one flex cluster in the specified project.
* :ref:`atlas-api-flexClusters-deleteFlexCluster` - Removes one flex cluster from the specified project.
* :ref:`atlas-api-flexClusters-getFlexCluster` - Returns details for one flex cluster in the specified project.
* :ref:`atlas-api-flexClusters-listFlexClusters` - Returns details for all flex clusters in the specified project.
* :ref:`atlas-api-flexClusters-tenantUpgrade` - Upgrades a flex cluster to a dedicated cluster (M10+) in the specified project.
* :ref:`atlas-api-flexClusters-updateFlexCluster` - Updates one flex cluster in the specified project.


.. toctree::
   :titlesonly:

   createFlexCluster </command/atlas-api-flexClusters-createFlexCluster>
   deleteFlexCluster </command/atlas-api-flexClusters-deleteFlexCluster>
   getFlexCluster </command/atlas-api-flexClusters-getFlexCluster>
   listFlexClusters </command/atlas-api-flexClusters-listFlexClusters>
   tenantUpgrade </command/atlas-api-flexClusters-tenantUpgrade>
   updateFlexCluster </command/atlas-api-flexClusters-updateFlexCluster>
