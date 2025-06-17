.. _atlas-api-cloudBackups:

======================
atlas api cloudBackups
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Manages Cloud Backup snapshots, snapshot export buckets, restore jobs, and schedules.

This resource applies only to clusters that use Cloud Backups.

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
     - help for cloudBackups

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

* :ref:`atlas-api-cloudBackups-cancelBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Cancels one cloud backup restore job of one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-createBackupExportJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Exports one backup Snapshot for dedicated Atlas cluster using Cloud Backups to an Export Bucket.
* :ref:`atlas-api-cloudBackups-createBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Restores one snapshot of one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-createExportBucket` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates a Snapshot Export Bucket for an AWS S3 Bucket or Azure Blob Storage Container.
* :ref:`atlas-api-cloudBackups-createServerlessBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Restores one snapshot of one serverless instance from the specified project.
* :ref:`atlas-api-cloudBackups-deleteAllBackupSchedules` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes all cloud backup schedules for the specified cluster.
* :ref:`atlas-api-cloudBackups-deleteExportBucket` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes an Export Bucket.
* :ref:`atlas-api-cloudBackups-deleteReplicaSetBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified snapshot.
* :ref:`atlas-api-cloudBackups-deleteShardedClusterBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one snapshot of one sharded cluster from the specified project.
* :ref:`atlas-api-cloudBackups-disableDataProtectionSettings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Disables the Backup Compliance Policy settings with the specified project.
* :ref:`atlas-api-cloudBackups-getBackupExportJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one Cloud Backup Snapshot Export Job associated with the specified Atlas cluster.
* :ref:`atlas-api-cloudBackups-getBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one cloud backup restore job for one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-getBackupSchedule` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the cloud backup schedule for the specified cluster within the specified project.
* :ref:`atlas-api-cloudBackups-getDataProtectionSettings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the Backup Compliance Policy settings with the specified project.
* :ref:`atlas-api-cloudBackups-getExportBucket` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one Export Bucket associated with the specified Project.
* :ref:`atlas-api-cloudBackups-getReplicaSetBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one snapshot from the specified cluster.
* :ref:`atlas-api-cloudBackups-getServerlessBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one snapshot of one serverless instance from the specified project.
* :ref:`atlas-api-cloudBackups-getServerlessBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one restore job for one serverless instance from the specified project.
* :ref:`atlas-api-cloudBackups-getShardedClusterBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one snapshot of one sharded cluster from the specified project.
* :ref:`atlas-api-cloudBackups-listBackupExportJobs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all Cloud Backup Snapshot Export Jobs associated with the specified Atlas cluster.
* :ref:`atlas-api-cloudBackups-listBackupRestoreJobs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all cloud backup restore jobs for one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-listExportBuckets` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all Export Buckets associated with the specified Project.
* :ref:`atlas-api-cloudBackups-listReplicaSetBackups` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all snapshots of one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-listServerlessBackupRestoreJobs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all restore jobs for one serverless instance from the specified project.
* :ref:`atlas-api-cloudBackups-listServerlessBackups` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all snapshots of one serverless instance from the specified project.
* :ref:`atlas-api-cloudBackups-listShardedClusterBackups` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all snapshots of one sharded cluster from the specified project.
* :ref:`atlas-api-cloudBackups-takeSnapshot` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Takes one on-demand snapshot for the specified cluster.
* :ref:`atlas-api-cloudBackups-updateBackupSchedule` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the cloud backup schedule for one cluster within the specified project.
* :ref:`atlas-api-cloudBackups-updateDataProtectionSettings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the Backup Compliance Policy settings for the specified project.
* :ref:`atlas-api-cloudBackups-updateSnapshotRetention` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Changes the expiration date for one cloud backup snapshot for one cluster in the specified project.


.. toctree::
   :titlesonly:

   cancelBackupRestoreJob </command/atlas-api-cloudBackups-cancelBackupRestoreJob>
   createBackupExportJob </command/atlas-api-cloudBackups-createBackupExportJob>
   createBackupRestoreJob </command/atlas-api-cloudBackups-createBackupRestoreJob>
   createExportBucket </command/atlas-api-cloudBackups-createExportBucket>
   createServerlessBackupRestoreJob </command/atlas-api-cloudBackups-createServerlessBackupRestoreJob>
   deleteAllBackupSchedules </command/atlas-api-cloudBackups-deleteAllBackupSchedules>
   deleteExportBucket </command/atlas-api-cloudBackups-deleteExportBucket>
   deleteReplicaSetBackup </command/atlas-api-cloudBackups-deleteReplicaSetBackup>
   deleteShardedClusterBackup </command/atlas-api-cloudBackups-deleteShardedClusterBackup>
   disableDataProtectionSettings </command/atlas-api-cloudBackups-disableDataProtectionSettings>
   getBackupExportJob </command/atlas-api-cloudBackups-getBackupExportJob>
   getBackupRestoreJob </command/atlas-api-cloudBackups-getBackupRestoreJob>
   getBackupSchedule </command/atlas-api-cloudBackups-getBackupSchedule>
   getDataProtectionSettings </command/atlas-api-cloudBackups-getDataProtectionSettings>
   getExportBucket </command/atlas-api-cloudBackups-getExportBucket>
   getReplicaSetBackup </command/atlas-api-cloudBackups-getReplicaSetBackup>
   getServerlessBackup </command/atlas-api-cloudBackups-getServerlessBackup>
   getServerlessBackupRestoreJob </command/atlas-api-cloudBackups-getServerlessBackupRestoreJob>
   getShardedClusterBackup </command/atlas-api-cloudBackups-getShardedClusterBackup>
   listBackupExportJobs </command/atlas-api-cloudBackups-listBackupExportJobs>
   listBackupRestoreJobs </command/atlas-api-cloudBackups-listBackupRestoreJobs>
   listExportBuckets </command/atlas-api-cloudBackups-listExportBuckets>
   listReplicaSetBackups </command/atlas-api-cloudBackups-listReplicaSetBackups>
   listServerlessBackupRestoreJobs </command/atlas-api-cloudBackups-listServerlessBackupRestoreJobs>
   listServerlessBackups </command/atlas-api-cloudBackups-listServerlessBackups>
   listShardedClusterBackups </command/atlas-api-cloudBackups-listShardedClusterBackups>
   takeSnapshot </command/atlas-api-cloudBackups-takeSnapshot>
   updateBackupSchedule </command/atlas-api-cloudBackups-updateBackupSchedule>
   updateDataProtectionSettings </command/atlas-api-cloudBackups-updateDataProtectionSettings>
   updateSnapshotRetention </command/atlas-api-cloudBackups-updateSnapshotRetention>

