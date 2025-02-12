.. _atlas-api-sharedTierSnapshots:

=============================
atlas api sharedTierSnapshots
=============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and requests to download shared-tier database deployment snapshots.

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
     - help for sharedTierSnapshots

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

* :ref:`atlas-api-sharedTierSnapshots-downloadSharedClusterBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Requests one snapshot for the specified shared cluster.
* :ref:`atlas-api-sharedTierSnapshots-getSharedClusterBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details for one snapshot for the specified shared cluster.
* :ref:`atlas-api-sharedTierSnapshots-listSharedClusterBackups` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details for all snapshots for the specified shared cluster.


.. toctree::
   :titlesonly:

   downloadSharedClusterBackup </command/atlas-api-sharedTierSnapshots-downloadSharedClusterBackup>
   getSharedClusterBackup </command/atlas-api-sharedTierSnapshots-getSharedClusterBackup>
   listSharedClusterBackups </command/atlas-api-sharedTierSnapshots-listSharedClusterBackups>

