1. Set up |azure| :ref:`Service Principal with access policy
   <manage-azure-access>` for your |service| project.

#. Assign the *Storage Blob Delegator* and *Storage Blob Data
   Contributor* roles to your |azure| :azure:`Service Principal
   </powershell/azure/create-azure-service-principal-azureps>`.

   To assign the roles to your Service Principal, you will need
   the following information:  

   - `Service Principal ID <https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-view-managed-identity-service-principal?pivots=identity-mi-service-principal-portal>`__
   - :azure:`Subscription ID </azure-portal/get-subscription-tenant-id>` 
   - :azure:`Resource Group Name </azure-resource-manager/management/manage-resource-groups-portal>`
   - :azure:`Storage Account Name </storage/common/storage-account-get-info>` 
   - :azure:`Container Name </storage/blobs/blob-containers-portal>` 

   .. list-table:: 
      :widths: 20 80 
      :header-rows: 1 

      * - Role 
	- Description

      * - Storage Blob Delegator
	- This allows the Service Principal to sign SAS tokens to
	  access the |azure| Storage Container. To assign this
	  role, run the following command: 

	  .. code-block:: shell 
	     : copyable: true 

	     az role assignment create --assignee-object-id <service-principal-id> --role "Storage Blob Delegator" --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Storage/storageAccounts/<storage-account-name>

      * - Storage Blob Data Contributor
	- This allows read, write, and delete blob access for the 
	  |azure| Storage Container. To assign this role, run the
	  following command:

	  .. code-block:: shell 
	     :copyable: true 

	     az role assignment create --assignee-principal-type ServicePrincipal --assignee-object-id <service-principal-id> --role "Storage Blob Data Contributor" --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Storage/storageAccounts/<storage-account-name>/blobServices/default/containers/<container-name>
