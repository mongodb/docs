.. step:: Create an export bucket configuration in {+service+}

   .. note::

      Before you can configure an export bucket in {+service+},
      complete the :ref:`prerequisites
      <cloud-backup-export-prereqs-aws>` to set up |service| access to
      your |aws| |s3| bucket.

   To enable {+service+} to export {+Cloud-Backup+} snapshots to
   |aws| |s3|, create an export bucket configuration in {+service+}
   that references an existing |aws| |s3| bucket. To export snapshots
   over |aws| PrivateLink, set ``requirePrivateNetworking`` to
   ``true`` so that {+service+} uses the private endpoint that you
   created in the prerequisites.

   .. include:: /includes/backup/export-bucket-config-lead-cli.rst

   .. include:: /includes/backup/export-bucket-fields-aws.rst

   .. include:: /includes/backup/export-bucket-config-response-note.rst
