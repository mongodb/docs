To export one |service| backup snapshot, use the :atlascli:`atlas
api cloudBackups createBackupExport
</command/atlas-api-cloudBackups-createBackupExport/>` command with the
ID of the snapshot to export and the ID of the export bucket from your
export bucket configuration. This creates a snapshot export job that
exports the specified snapshot to the specified bucket.

To list possible snapshots to export, use the :atlascli:`atlas
backups snapshots list </command/atlas-backups-snapshots-list/>`
command with your cluster name and project ID. To list possible
export buckets, use the :atlascli:`atlas api cloudBackups
listExportBuckets
</command/atlas-api-cloudBackups-listExportBuckets/>` command with
your project ID.
