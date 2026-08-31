.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-backup-details.rst

   .. step:: In the :guilabel:`Backup Policy` tab, go to the :guilabel:`Snapshot Export Policy` section.

      You can configure cloud storage bucket and automatic export 
      frequency for your snapshots. You can add multiple export buckets. 
      You can configure automatic export of snapshots only if you have 
      added an export bucket.

   .. step:: Under the :guilabel:`Export Buckets` section, configure the export bucket for your snapshots.
    
      a. Click :guilabel:`+ Add Storage Destination`.

         This displays the :guilabel:`Add Export Bucket` dialog box.

      b. Configure the cloud provider for your export bucket.

         - To learn more about exporting snapshots to |aws| |s3|, see :ref:`cloud-backup-export-aws`,
         - To learn more about exporting snapshots to {+az-bs+}, see :ref:`cloud-backup-export-azure`.
         - To learn more about exporting snapshots to {+gcs+}, see :ref:`cloud-backup-export-gcp`.

      c. Click :guilabel:`Next` to attach the export bucket to a snapshot.

   .. step:: Click :guilabel:`Review Changes`.

   .. step:: Click :guilabel:`Confirm`.

      This adds the export bucket to your project.
