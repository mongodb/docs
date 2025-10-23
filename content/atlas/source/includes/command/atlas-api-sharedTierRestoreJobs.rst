.. _atlas-api-sharedTierRestoreJobs:

===============================
atlas api sharedTierRestoreJobs
===============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns and adds restore jobs for shared-tier database deployments.

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
     - help for sharedTierRestoreJobs

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

* :ref:`atlas-api-sharedTierRestoreJobs-createBackupTenantRestore` - Restores the specified M2 or M5 cluster.
* :ref:`atlas-api-sharedTierRestoreJobs-getBackupTenantRestore` - Returns the specified restore job for the specified M2 or M5 cluster.
* :ref:`atlas-api-sharedTierRestoreJobs-listBackupTenantRestores` - Returns all restore jobs for the specified M2 or M5 cluster.


.. toctree::
   :titlesonly:

   createBackupTenantRestore </command/atlas-api-sharedTierRestoreJobs-createBackupTenantRestore>
   getBackupTenantRestore </command/atlas-api-sharedTierRestoreJobs-getBackupTenantRestore>
   listBackupTenantRestores </command/atlas-api-sharedTierRestoreJobs-listBackupTenantRestores>
