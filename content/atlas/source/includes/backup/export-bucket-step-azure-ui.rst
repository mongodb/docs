.. step:: Create an export bucket configuration in {+service+}.

   .. note::

      Before you can configure an export bucket in {+service+},
      complete the :ref:`prerequisites
      <cloud-backup-export-prereqs-azure>` to set up |service| access
      to your {+az-bs+} container.

   To enable {+service+} to export {+Cloud-Backup+} snapshots to
   {+az-bs+}, create an export bucket configuration in {+service+}
   that references an existing {+az-bs+} container. To learn more 
   about setting up |service| access to your {+az-bs+} container, 
   see :ref:`manage-azure-access`.

   a. In the :guilabel:`Backup Policy` tab, go to the
      :guilabel:`Snapshot Export Policy` section and click
      :guilabel:`+ Add Storage Destination`.

      This displays a dialog box with the cloud provider options for
      your export bucket configuration.

   #. Select :guilabel:`Azure` as the cloud provider and click
      :guilabel:`Next`.

   #. Under :guilabel:`Atlas Azure Service Principal`, select an existing principal.
   
      If you don't have an existing principal, click :guilabel:`authorize a new one` 
      and complete Azure Cloud Provider Access setup. To learn more, see 
      :ref:`manage-azure-access`.

   #. Enter the following information and click :guilabel:`Next`:

      .. list-table::
         :header-rows: 1
         :widths: 25 60 15

         * - Field
           - Value
           - Necessity
         * - Azure Service Principal
           - Name of the |azure| Service Principal that you created in the
             :ref:`prerequisites <cloud-backup-export-prereqs-azure>`.
           - Required
         * - Bucket Name
           - Name of the {+az-bs+} Container that is authorized to receive
             |service| {+Cloud-Backup+} snapshots. To set up |service|
             access to this container, see the :ref:`Prerequisites
             <cloud-backup-export-prereqs-azure>` section.

             Omit this field if you include the container name in the
             :guilabel:`Service URL`.

           - Optional
         * - Service URL
           - Service endpoint of your {+az-bs+} account. To learn more,
             see the :azure:`Azure documentation
             </storage/common/storage-account-get-info?tabs=azure-cli#get-service-endpoints-for-the-storage-account>`.
           - Required

   #. On the :guilabel:`Attach Policy` step, confirm that the storage
      roles are assigned to your |azure| Service Principal.

      You assigned these roles when you completed the
      :ref:`prerequisites <cloud-backup-export-prereqs-azure>`. Compare
      the commands that :guilabel:`Grant container access using Azure
      CLI` and :guilabel:`Verify access` display to the roles assigned
      to your Service Principal. If the assignments differ, run the
      commands to update them.

   #. Select :guilabel:`I confirm I completed the required steps` and
      click :guilabel:`Add bucket`.

      Your configuration resembles the following: 

      .. code-block:: json
         :linenos:

         {
            "bucketName": "<container>",
            "cloudProvider": "AZURE",
            "roleId": "<selected-service-principal-role-id>",
            "serviceUrl": "https://<storage-account>.blob.core.windows.net/<container>"
         }

      This adds the export bucket configuration to your {+service+} project.
