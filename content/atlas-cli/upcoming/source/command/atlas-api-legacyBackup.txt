.. _atlas-api-legacyBackup:

======================
atlas api legacyBackup
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manages Legacy Backup snapshots, restore jobs, schedules and checkpoints.

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
     - help for legacyBackup

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

* :ref:`atlas-api-legacyBackup-createClusterRestoreJob` - Restores one legacy backup for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-deleteClusterSnapshot` - Removes one legacy backup snapshot for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-getClusterBackupCheckpoint` - Returns one legacy backup checkpoint for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-getClusterRestoreJob` - Returns one legacy backup restore job for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-getClusterSnapshot` - Returns one legacy backup snapshot for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-getClusterSnapshotSchedule` - Returns the snapshot schedule for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-listClusterBackupCheckpoints` - Returns all legacy backup checkpoints for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-listClusterRestoreJobs` - Returns all legacy backup restore jobs for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-listClusterSnapshots` - Returns all legacy backup snapshots for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-updateClusterSnapshot` - Changes the expiration date for one legacy backup snapshot for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-updateClusterSnapshotSchedule` - Updates the snapshot schedule for one cluster in the specified project.


.. toctree::
   :titlesonly:

   createClusterRestoreJob </command/atlas-api-legacyBackup-createClusterRestoreJob>
   deleteClusterSnapshot </command/atlas-api-legacyBackup-deleteClusterSnapshot>
   getClusterBackupCheckpoint </command/atlas-api-legacyBackup-getClusterBackupCheckpoint>
   getClusterRestoreJob </command/atlas-api-legacyBackup-getClusterRestoreJob>
   getClusterSnapshot </command/atlas-api-legacyBackup-getClusterSnapshot>
   getClusterSnapshotSchedule </command/atlas-api-legacyBackup-getClusterSnapshotSchedule>
   listClusterBackupCheckpoints </command/atlas-api-legacyBackup-listClusterBackupCheckpoints>
   listClusterRestoreJobs </command/atlas-api-legacyBackup-listClusterRestoreJobs>
   listClusterSnapshots </command/atlas-api-legacyBackup-listClusterSnapshots>
   updateClusterSnapshot </command/atlas-api-legacyBackup-updateClusterSnapshot>
   updateClusterSnapshotSchedule </command/atlas-api-legacyBackup-updateClusterSnapshotSchedule>
