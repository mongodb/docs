Add an Azure Blob Storage Connection through {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an |azure| Blob Storage connection to your {+spw+} through the
{+atlas-cli+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up Azure Service Principal Access

      Follow the procedure described in :ref:`Set Up and Manage Azure
      Service Principal Access <manage-azure-access>`.

      Ensure that you grant the following permissions:

      - ``Storage Blob Data Contributor`` for your storage account
      - ``Storage Blob Data Contributor`` for your blob storage
	containers
      - ``Reader`` permissions for the Azure Subscription containing
	both the storage account and blob containers.      

      Note the ``Service Principal ID`` you used for later in this procedure.	

   .. step:: Configure a Service Account

      .. include:: /includes/atlas-stream-processing/create-service-account.rst

   .. step:: Create the |azure| Blob Storage connection

      .. include:: /includes/extracts/atlas-streams-connections-create.rst

      In your configuration file, set the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``type``
           - ``"AzureBlobStorage"``

         * - ``servicePrincipalId``
           - Value of the ``Service Principal ID`` noted earlier.

	 * - ``storageAccountName``
	   - Name of the `Azure Storage Account
	     <https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview>`__
	     to which you want to connect.
