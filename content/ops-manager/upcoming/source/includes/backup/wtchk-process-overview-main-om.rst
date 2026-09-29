The backup process takes a snapshot of the data directory at its
:ref:`scheduled snapshot intervals <edit-snapshot-schedule>`.

This process copies the data files in a MongoDB deployment, sending
them over the network via |mms| to your existing snapshot storage.

Your deployment can still handle read and write operations during the
copying process.

If you enabled :ref:`Direct to S3 Backup <om-direct-s3-backup>`,
{+mdbagent+} uploads snapshot blocks directly to S3 instead of
sending them through |mms|. |mms| provides the pre-signed URLs for
the upload and handles only the snapshot metadata. Direct to S3
Backup is available starting in |mms| 8.0.27.

With the new backup process, there are no longer initial syncs. As a
result of not having initial syncs, |mms| (using a |mongod| running
|fcv-link| 4.2) can support a wider array of customers such as those
heavily using :dbcommand:`renameCollection`.

