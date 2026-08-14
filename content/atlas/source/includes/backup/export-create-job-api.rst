To export one |service| backup snapshot, send a ``POST`` request to
the Cloud Backups :oas-bump-atlas-op:`Create One Snapshot Export Job
<creategroupclusterbackupexport>` endpoint with the ID of the snapshot
to export and the ID of your export bucket configuration. This creates
a snapshot export job.

To list the possible snapshots to export, send a ``GET`` request
to the Cloud Backups :oas-bump-atlas-op:`Return All Snapshots
<listgroupsnapshots>` endpoint with your cluster name and project ID.
To list possible export buckets and their IDs, send a ``GET`` request
to the Cloud Backups :oas-bump-atlas-op:`Return All Export Buckets
<listgroupbackupexportbuckets>` endpoint.
