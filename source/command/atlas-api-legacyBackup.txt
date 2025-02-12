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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Manages Legacy Backup snapshots, restore jobs, schedules and checkpoints.

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

* :ref:`atlas-api-legacyBackup-createLegacyBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Restores one legacy backup for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-deleteLegacySnapshot` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one legacy backup snapshot for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-getLegacyBackupCheckpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one legacy backup checkpoint for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-getLegacyBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one legacy backup restore job for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-getLegacySnapshot` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one legacy backup snapshot for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-getLegacySnapshotSchedule` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the snapshot schedule for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-listLegacyBackupCheckpoints` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all legacy backup checkpoints for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-listLegacyBackupRestoreJobs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all legacy backup restore jobs for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-listLegacySnapshots` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all legacy backup snapshots for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-updateLegacySnapshotRetention` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Changes the expiration date for one legacy backup snapshot for one cluster in the specified project.
* :ref:`atlas-api-legacyBackup-updateLegacySnapshotSchedule` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the snapshot schedule for one cluster in the specified project.


.. toctree::
   :titlesonly:

   createLegacyBackupRestoreJob </command/atlas-api-legacyBackup-createLegacyBackupRestoreJob>
   deleteLegacySnapshot </command/atlas-api-legacyBackup-deleteLegacySnapshot>
   getLegacyBackupCheckpoint </command/atlas-api-legacyBackup-getLegacyBackupCheckpoint>
   getLegacyBackupRestoreJob </command/atlas-api-legacyBackup-getLegacyBackupRestoreJob>
   getLegacySnapshot </command/atlas-api-legacyBackup-getLegacySnapshot>
   getLegacySnapshotSchedule </command/atlas-api-legacyBackup-getLegacySnapshotSchedule>
   listLegacyBackupCheckpoints </command/atlas-api-legacyBackup-listLegacyBackupCheckpoints>
   listLegacyBackupRestoreJobs </command/atlas-api-legacyBackup-listLegacyBackupRestoreJobs>
   listLegacySnapshots </command/atlas-api-legacyBackup-listLegacySnapshots>
   updateLegacySnapshotRetention </command/atlas-api-legacyBackup-updateLegacySnapshotRetention>
   updateLegacySnapshotSchedule </command/atlas-api-legacyBackup-updateLegacySnapshotSchedule>

