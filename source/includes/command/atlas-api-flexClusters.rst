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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes flex clusters.

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

* :ref:`atlas-api-flexClusters-createFlexCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one flex cluster in the specified project.
* :ref:`atlas-api-flexClusters-deleteFlexCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one flex cluster from the specified project.
* :ref:`atlas-api-flexClusters-getFlexCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details for one flex cluster in the specified project.
* :ref:`atlas-api-flexClusters-listFlexClusters` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details for all flex clusters in the specified project.
* :ref:`atlas-api-flexClusters-updateFlexCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one flex cluster in the specified project.
* :ref:`atlas-api-flexClusters-upgradeFlexCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Upgrades a flex cluster to a dedicated cluster (M10+) in the specified project.


.. toctree::
   :titlesonly:

   createFlexCluster </command/atlas-api-flexClusters-createFlexCluster>
   deleteFlexCluster </command/atlas-api-flexClusters-deleteFlexCluster>
   getFlexCluster </command/atlas-api-flexClusters-getFlexCluster>
   listFlexClusters </command/atlas-api-flexClusters-listFlexClusters>
   updateFlexCluster </command/atlas-api-flexClusters-updateFlexCluster>
   upgradeFlexCluster </command/atlas-api-flexClusters-upgradeFlexCluster>

