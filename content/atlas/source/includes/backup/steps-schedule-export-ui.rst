.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-backup-details.rst

   .. step:: In the :guilabel:`Backup Policy` tab, go to the :guilabel:`Snapshot Export Policy` section.

      You can configure cloud storage bucket and automatic export 
      frequency for your snapshots. If you don't have any export 
      buckets, you can't schedule exports.

   .. step:: Under the :guilabel:`Export Buckets` section, confirm that you configured an export bucket for your snapshots.

      If you haven't configured an export bucket, see
      :ref:`cloud-backup-configure-export-bucket-ui`.

   .. step:: Under the :guilabel:`Export Schedule` section, apply the export bucket to an export schedule.

      a. Select the snapshot frequency from the :guilabel:`Snapshots`
         dropdown.

      b. Select the bucket from the corresponding
         :guilabel:`Export Buckets` dropdown.

   .. step:: Click :guilabel:`Review Changes`.

   .. step:: Click :guilabel:`Confirm`.

      This configures the auto-export policy.
