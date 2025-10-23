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

Manages Cloud Backup snapshots, snapshot export buckets, restore jobs, and schedules.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

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

* :ref:`atlas-api-cloudBackups-cancelBackupRestoreJob` - Cancels one cloud backup restore job of one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-createBackupExport` - Exports one backup Snapshot for dedicated Atlas cluster using Cloud Backups to an Export Bucket.
* :ref:`atlas-api-cloudBackups-createBackupRestoreJob` - Restores one snapshot of one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-createExportBucket` - Creates a Snapshot Export Bucket for an AWS S3 Bucket, Azure Blob Storage Container, or Google Cloud Storage Bucket.

* :ref:`atlas-api-cloudBackups-deleteBackupShardedCluster` - Removes one snapshot of one sharded cluster from the specified project.
* :ref:`atlas-api-cloudBackups-deleteClusterBackupSchedule` - Removes all cloud backup schedules for the specified cluster.
* :ref:`atlas-api-cloudBackups-deleteClusterBackupSnapshot` - Removes the specified snapshot.
* :ref:`atlas-api-cloudBackups-deleteExportBucket` - Deletes an Export Bucket.
* :ref:`atlas-api-cloudBackups-disableCompliancePolicy` - Disables the Backup Compliance Policy settings with the specified project.
* :ref:`atlas-api-cloudBackups-getBackupExport` - Returns one Cloud Backup Snapshot Export Job associated with the specified Atlas cluster.
* :ref:`atlas-api-cloudBackups-getBackupRestoreJob` - Returns one cloud backup restore job for one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-getBackupSchedule` - Returns the cloud backup schedule for the specified cluster within the specified project.
* :ref:`atlas-api-cloudBackups-getBackupShardedCluster` - Returns one snapshot of one sharded cluster from the specified project.
* :ref:`atlas-api-cloudBackups-getClusterBackupSnapshot` - Returns one snapshot from the specified cluster.
* :ref:`atlas-api-cloudBackups-getCompliancePolicy` - Returns the Backup Compliance Policy settings with the specified project.
* :ref:`atlas-api-cloudBackups-getExportBucket` - Returns one Export Bucket associated with the specified Project.

* :ref:`atlas-api-cloudBackups-listBackupExports` - Returns all Cloud Backup Snapshot Export Jobs associated with the specified Atlas cluster.
* :ref:`atlas-api-cloudBackups-listBackupRestoreJobs` - Returns all cloud backup restore jobs for one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-listBackupShardedClusters` - Returns all snapshots of one sharded cluster from the specified project.
* :ref:`atlas-api-cloudBackups-listBackupSnapshots` - Returns all snapshots of one cluster from the specified project.
* :ref:`atlas-api-cloudBackups-listExportBuckets` - Returns all Export Buckets associated with the specified Project.

* :ref:`atlas-api-cloudBackups-takeSnapshots` - Takes one on-demand snapshot for the specified cluster.
* :ref:`atlas-api-cloudBackups-updateBackupSchedule` - Updates the cloud backup schedule for one cluster within the specified project.
* :ref:`atlas-api-cloudBackups-updateBackupSnapshot` - Changes the expiration date for one cloud backup snapshot for one cluster in the specified project.
* :ref:`atlas-api-cloudBackups-updateCompliancePolicy` - Updates the Backup Compliance Policy settings for the specified project.

.. toctree::
   :titlesonly:

   cancelBackupRestoreJob </command/atlas-api-cloudBackups-cancelBackupRestoreJob>
   createBackupExport </command/atlas-api-cloudBackups-createBackupExport>
   createBackupRestoreJob </command/atlas-api-cloudBackups-createBackupRestoreJob>
   createExportBucket </command/atlas-api-cloudBackups-createExportBucket>

   deleteBackupShardedCluster </command/atlas-api-cloudBackups-deleteBackupShardedCluster>
   deleteClusterBackupSchedule </command/atlas-api-cloudBackups-deleteClusterBackupSchedule>
   deleteClusterBackupSnapshot </command/atlas-api-cloudBackups-deleteClusterBackupSnapshot>
   deleteExportBucket </command/atlas-api-cloudBackups-deleteExportBucket>
   disableCompliancePolicy </command/atlas-api-cloudBackups-disableCompliancePolicy>
   getBackupExport </command/atlas-api-cloudBackups-getBackupExport>
   getBackupRestoreJob </command/atlas-api-cloudBackups-getBackupRestoreJob>
   getBackupSchedule </command/atlas-api-cloudBackups-getBackupSchedule>
   getBackupShardedCluster </command/atlas-api-cloudBackups-getBackupShardedCluster>
   getClusterBackupSnapshot </command/atlas-api-cloudBackups-getClusterBackupSnapshot>
   getCompliancePolicy </command/atlas-api-cloudBackups-getCompliancePolicy>
   getExportBucket </command/atlas-api-cloudBackups-getExportBucket>

   listBackupExports </command/atlas-api-cloudBackups-listBackupExports>
   listBackupRestoreJobs </command/atlas-api-cloudBackups-listBackupRestoreJobs>
   listBackupShardedClusters </command/atlas-api-cloudBackups-listBackupShardedClusters>
   listBackupSnapshots </command/atlas-api-cloudBackups-listBackupSnapshots>
   listExportBuckets </command/atlas-api-cloudBackups-listExportBuckets>

   takeSnapshots </command/atlas-api-cloudBackups-takeSnapshots>
   updateBackupSchedule </command/atlas-api-cloudBackups-updateBackupSchedule>
   updateBackupSnapshot </command/atlas-api-cloudBackups-updateBackupSnapshot>
   updateCompliancePolicy </command/atlas-api-cloudBackups-updateCompliancePolicy>
