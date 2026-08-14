.. step:: Create an export bucket configuration in {+service+}

   .. note::

      Before you can configure an export bucket in {+service+},
      complete the :ref:`prerequisites
      <cloud-backup-export-prereqs-azure>` to set up |service| access
      to your {+az-bs+} container.

   To enable {+service+} to export {+Cloud-Backup+} snapshots to
   {+az-bs+}, create an export bucket configuration in {+service+}
   that references an existing {+az-bs+} container.

   .. include:: /includes/backup/export-bucket-config-lead-api.rst

   .. include:: /includes/backup/export-bucket-fields-azure.rst

   .. include:: /includes/backup/export-bucket-config-response-note.rst
