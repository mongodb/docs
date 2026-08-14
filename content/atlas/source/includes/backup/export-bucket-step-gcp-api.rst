.. step:: Create an export bucket configuration in {+service+}

   .. note::

      Before you can configure an export bucket in {+service+},
      complete the :ref:`prerequisites
      <cloud-backup-export-prereqs-gcp>` to set up |service| access to
      your {+gcs+} bucket.

   To enable {+service+} to export {+Cloud-Backup+} snapshots to
   {+gcs+}, create an export bucket configuration in {+service+} that
   references an existing {+gcs+} bucket.

   .. include:: /includes/backup/export-bucket-config-lead-api.rst

   .. include:: /includes/backup/export-bucket-fields-gcp.rst

   .. include:: /includes/backup/export-bucket-config-response-note.rst
