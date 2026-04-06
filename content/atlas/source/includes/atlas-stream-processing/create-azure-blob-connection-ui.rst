Add an Azure Blob Storage Connection through {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an |azure| Blob Storage connection to your {+spw+} through
{+atlas-ui+}, follow these steps:



.. procedure::
   :style: normal

   .. step:: Set up {+atlas-sp+} permissions.

      Ensure you have at least one of the following roles to manage
      connections:

      - :authrole:`Project Owner`
      - :authrole:`Project Stream Processing Owner`
	   
   .. step:: Set up Azure Service Principal Access.

      Follow the procedure described in :ref:`Set Up and Manage Azure
      Service Principal Access <manage-azure-access>`.

      Ensure that you grant the following permissions:

      - ``Storage Blob Data Contributor`` for your storage account
      - ``Storage Blob Data Contributor`` for your blob storage
	containers
      - ``Reader`` permissions for the Azure Subscription containing
	both the storage account and blob containers.

      Note the ``Service Principal ID`` you used for later in this procedure.

   .. include:: /includes/nav/steps-stream-processing.rst  
		
   .. step:: Go to the :guilabel:`Connection Registry`.  

      a. Locate the overview panel of the {+spw+} you want to  
         modify and click :guilabel:`Manage`.  

      #. Select the :guilabel:`Connection Registry` tab.  

   .. step:: Click :guilabel:`+ Add connection`.  

   .. step:: Add a new connection.  

      a. Select an :guilabel:`Azure Blob Storage` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection
         name must be unique within a {+spw+}.  This is the name
         used to reference the connection in {+atlas-sp+}
         :ref:`aggregations <atlas-sp-aggregation>`.

      #. From the :guilabel:`Azure Service Principal` dropdown, select
	 the service principal defined earlier in this procedure.
	      
      #. Provide the :guilabel:`Storage Account Name` for the
	 `Azure Storage Account <https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview>`__
	 to which you want to connect.

      #. Click :guilabel:`Add connection`.
