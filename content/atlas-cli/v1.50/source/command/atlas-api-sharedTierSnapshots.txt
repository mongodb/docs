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

Returns and requests to download shared-tier database deployment snapshots.

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

* :ref:`atlas-api-sharedTierSnapshots-downloadClusterBackupTenant` - Requests one snapshot for the specified shared cluster.
* :ref:`atlas-api-sharedTierSnapshots-getBackupTenantSnapshot` - Returns details for one snapshot for the specified shared cluster.
* :ref:`atlas-api-sharedTierSnapshots-listClusterBackupSnapshots` - Returns details for all snapshots for the specified shared cluster.


.. toctree::
   :titlesonly:

   downloadClusterBackupTenant </command/atlas-api-sharedTierSnapshots-downloadClusterBackupTenant>
   getBackupTenantSnapshot </command/atlas-api-sharedTierSnapshots-getBackupTenantSnapshot>
   listClusterBackupSnapshots </command/atlas-api-sharedTierSnapshots-listClusterBackupSnapshots>
