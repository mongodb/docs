.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Atlas CLI Command
     - Description

   * - :atlascli:`atlas api cloudBackups listExportBuckets
       </command/atlas-api-cloudBackups-listExportBuckets/>`
     - Returns all export buckets associated with the specified
       project.

   * - :atlascli:`atlas api cloudBackups createExportBucket
       </command/atlas-api-cloudBackups-createExportBucket/>`
     - Creates a snapshot export bucket for an |aws| |s3| Bucket,
       {+az-bs+} Container, or {+gcs+} bucket. After you create
       it, you can export snapshots to the export bucket and its
       referenced |aws| |s3| Bucket, {+az-bs+} Container, or
       {+gcs+} bucket.

   * - :atlascli:`atlas api cloudBackups getExportBucket
       </command/atlas-api-cloudBackups-getExportBucket/>`
     - Returns one export bucket associated with the specified
       project.

   * - :atlascli:`atlas api cloudBackups updateBackupExportBucket
       </command/atlas-api-cloudBackups-updateBackupExportBucket/>`
     - Updates the private networking settings for one snapshot
       export bucket in the specified project.

   * - :atlascli:`atlas api cloudBackups deleteExportBucket
       </command/atlas-api-cloudBackups-deleteExportBucket/>`
     - Deletes an export bucket. You must disable auto export on
       all {+clusters+} in the project that export to this export
       bucket before revoking access.

   * - :atlascli:`atlas api cloudBackups listBackupExports
       </command/atlas-api-cloudBackups-listBackupExports/>`
     - Returns all {+Cloud-Backup+} snapshot export jobs
       associated with the specified {+cluster+}.

   * - :atlascli:`atlas api cloudBackups createBackupExport
       </command/atlas-api-cloudBackups-createBackupExport/>`
     - Exports one backup snapshot for a dedicated {+cluster+}
       using {+Cloud-Backup+} to an export bucket.

   * - :atlascli:`atlas api cloudBackups getBackupExport
       </command/atlas-api-cloudBackups-getBackupExport/>`
     - Returns one {+Cloud-Backup+} snapshot export job
       associated with the specified {+cluster+}.

   * - :atlascli:`atlas api cloudBackups
       listBackupPrivateEndpoints
       </command/atlas-api-cloudBackups-listBackupPrivateEndpoints/>`
     - Returns the private endpoints of the specified cloud
       provider for object storage backup operations.

   * - :atlascli:`atlas api cloudBackups
       createBackupPrivateEndpoint
       </command/atlas-api-cloudBackups-createBackupPrivateEndpoint/>`
     - Creates a private endpoint in the specified region for
       secure, private connectivity between {+service+} and
       cloud provider object storage services for backup
       operations.

   * - :atlascli:`atlas api cloudBackups
       getBackupPrivateEndpoint
       </command/atlas-api-cloudBackups-getBackupPrivateEndpoint/>`
     - Returns one private endpoint, identified by its ID, for
       object storage backup operations.

   * - :atlascli:`atlas api cloudBackups
       deleteBackupPrivateEndpoint
       </command/atlas-api-cloudBackups-deleteBackupPrivateEndpoint/>`
     - Deletes one private endpoint, identified by its ID, for
       object storage backup operations.
