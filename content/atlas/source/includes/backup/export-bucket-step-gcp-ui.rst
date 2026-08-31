.. step:: Create an export bucket configuration in {+service+}.

   .. note::

      Before you can configure an export bucket in {+service+},
      complete the :ref:`prerequisites
      <cloud-backup-export-prereqs-gcp>` to set up |service| access to
      your {+gcs+} bucket.

   To enable {+service+} to export {+Cloud-Backup+} snapshots to
   {+gcs+}, create an export bucket configuration in {+service+} that
   references an existing {+gcs+} bucket. To learn more about setting up 
   |service| access to your {+gcs+} bucket, see 
   :ref:`manage-gcp-access`.

   a. In the :guilabel:`Backup Policy` tab, go to the
      :guilabel:`Snapshot Export Policy` section and click
      :guilabel:`+ Add Storage Destination`.

      This displays a dialog box with the cloud provider options for
      your export bucket configuration.

   #. Select :guilabel:`Google Cloud` as the cloud provider and click
      :guilabel:`Next`.

   #. Under :guilabel:`Atlas GCP Service Account`, select an existing service account.

      If you don't have an existing service account, click :guilabel:`authorize a new one`
      and complete Google Cloud Provider Access setup. To learn more, see
      :ref:`manage-gcp-access`.

   #. Enter the following information and click :guilabel:`Next`:

      .. list-table::
         :header-rows: 1
         :widths: 25 60 15

         * - Field
           - Value
           - Necessity
         * - Service Account
           - Name of the {+gcp+} Service Account that you created in the
             :ref:`prerequisites <cloud-backup-export-prereqs-gcp>`.
           - Required
         * - GCP bucket name
           - Name of the {+gcs+} Bucket that is authorized to receive
             |service| {+Cloud-Backup+} snapshots. To set up |service|
             access to this bucket, see the :ref:`Prerequisites
             <cloud-backup-export-prereqs-gcp>` section.
           - Required

   #. On the :guilabel:`Attach Policy` step, confirm that the bucket
      access role is granted to your {+gcp+} Service Account.

      You granted this role when you completed the :ref:`prerequisites
      <cloud-backup-export-prereqs-gcp>`. Compare the commands that
      :guilabel:`Grant bucket access using the Google Cloud Console`
      and :guilabel:`Verify access` display to the roles granted to
      your Service Account. If the grants differ, run the commands to
      update them.

   #. Select :guilabel:`I confirm I completed the required steps` and
      click :guilabel:`Add bucket`.

      Your configuration resembles the following:

      .. code-block:: json
         :linenos:

         {
            "bucketName": "<bucket>",
            "cloudProvider": "GCP",
            "roleId": "<selected-service-account-role-id>"
         }

      This adds the export bucket configuration to your {+service+} project.
