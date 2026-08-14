.. list-table::
   :header-rows: 1
   :widths: 35 15 50

   * - Atlas Administration API Endpoint
     - Request Type
     - Description

   * - :oas-bump-atlas-op:`Return All Snapshot Export Buckets
       <listgroupbackupexportbuckets>`
     - GET
     - Returns all export buckets associated with the specified
       project.

   * - :oas-bump-atlas-op:`Create One Snapshot Export Bucket
       <creategroupbackupexportbucket>`
     - POST
     - Creates a snapshot export bucket for an |aws| |s3| Bucket,
       {+az-bs+} Container, or {+gcs+} bucket. After you create
       it, you can export snapshots to the export bucket and its
       referenced |aws| |s3| Bucket, {+az-bs+} Container, or
       {+gcs+} bucket.

   * - :oas-bump-atlas-op:`Return One Snapshot Export Bucket
       <getgroupbackupexportbucket>`
     - GET
     - Returns one export bucket associated with the specified
       project.

   * - :oas-bump-atlas-op:`Update One Export Bucket Private
       Networking Settings <updategroupbackupexportbucket>`
     - PATCH
     - Updates the private networking settings for one snapshot
       export bucket in the specified project.

   * - :oas-bump-atlas-op:`Delete One Snapshot Export Bucket
       <deletegroupbackupexportbucket>`
     - DELETE
     - Deletes an export bucket. You must disable auto export on
       all {+clusters+} in the project that export to this export
       bucket before revoking access.

   * - :oas-bump-atlas-op:`Return All Snapshot Export Jobs
       <listgroupclusterbackupexports>`
     - GET
     - Returns all {+Cloud-Backup+} snapshot export jobs
       associated with the specified {+cluster+}.

   * - :oas-bump-atlas-op:`Create One Snapshot Export Job
       <creategroupclusterbackupexport>`
     - POST
     - Exports one backup snapshot for a dedicated {+cluster+}
       using {+Cloud-Backup+} to an export bucket.

   * - :oas-bump-atlas-op:`Return One Snapshot Export Job
       <getgroupclusterbackupexport>`
     - GET
     - Returns one {+Cloud-Backup+} snapshot export job
       associated with the specified {+cluster+}.

   * - :oas-bump-atlas-op:`Return Object Storage Private
       Endpoints for Cloud Backups for One Cloud Provider in One
       Project <listgroupbackupprivateendpoints>`
     - GET
     - Returns the private endpoints of the specified cloud
       provider for object storage backup operations.

   * - :oas-bump-atlas-op:`Create One Object Storage Private
       Endpoint for Cloud Backups for One Cloud Provider in One
       Project <creategroupbackupprivateendpoint>`
     - POST
     - Creates a private endpoint in the specified region for
       secure, private connectivity between {+service+} and
       cloud provider object storage services for backup
       operations.

   * - :oas-bump-atlas-op:`Return One Object Storage Private
       Endpoint for Cloud Backups for One Cloud Provider in One
       Project <getgroupbackupprivateendpoint>`
     - GET
     - Returns one private endpoint, identified by its ID, for
       object storage backup operations.

   * - :oas-bump-atlas-op:`Delete One Object Storage Private
       Endpoint for Cloud Backups for One Cloud Provider from One
       Project <deletegroupbackupprivateendpoint>`
     - DELETE
     - Deletes one private endpoint, identified by its ID, for
       object storage backup operations.
