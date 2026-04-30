Add an Azure Private Link Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an |azure| Blob Storage Private Link connection to your {+spw+} through the
{+atlas-ui+}, perform these steps:

.. procedure::
   :style: normal

   .. step:: Set up Azure Service Principal Access.

      Follow the procedure described in :ref:`Set Up and Manage Azure
      Service Principal Access <manage-azure-access>`.

      Grant your Service Principal the following permissions:

      - ``Storage Blob Data Contributor`` for your storage account
      - ``Storage Blob Data Contributor`` for your blob storage
	containers
      - ``Reader`` permissions for the Azure Subscription containing
	both the storage account and blob containers.

      Note the ``Service Principal ID`` you used for later in this procedure.

   .. step:: Enable {+service+} IP Access to Azure.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Return All Control Plane IP Addresses
      <listcontrolplaneipaddresses>`.
			 
      Note the values of the IP addresses in the
      ``outbound.aws.us-east-1`` field of the response.

      Configure your |azure| Storage Account to permit access to  as
      described in the :azure:`network security
      <storage/common/storage-network-security-overview>` page of the
      |azure| Blob Storage documentation, providing the IP addresses,
      stripped of CIDR notation, that you noted earlier.
      
   .. step:: Create your Azure private endpoint.

      Perform the procedure outlined on the :azure:`Create a private
      endpoint
      </private-link/create-private-endpoint-portal?tabs=dynamic-ip>`
      page of the |azure| documentation. Note the service endpoint ID
      for later in this procedure.
      
   .. include:: /includes/nav/steps-project-access-manager
      
   .. step:: Navigate to the {+atlas-sp+} private endpoint interface.

      a. In the sidebar, click :guilabel:`Private Endpoint`.

      #. Click the :guilabel:`{+atlas-sp+}` tab.

         If you have not created an {+atlas-sp+} private endpoint
         previously, click :guilabel:`Create endpoint`. If you have,
         click :guilabel:`Add ASP Endpoint`.

   .. step:: Create the Private Link endpoint.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`Azure`.

      #. Set :guilabel:`Vendor` to :guilabel:`Blob Storage`.

      #. Click :guilabel:`Next, enter service details`

      #. Provide the :guilabel:`Azure service endpoint ID` you noted
	 earlier.

      #. Provide the :guilabel:`Endpoint region` in which you created
	 the endpoint. {+atlas-sp+} supports |azure| Private Link
	 connections only in the same region as their respective endpoints.

      #. Provide the :guilabel:`Host name` of the :azure:`Azure Storage
	 Account </storage/common/storage-account-overview>` to which
	 you want to connect.	     
	     
      #. Click :guilabel:`Next, generate endpoint ID`

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Go to the :guilabel:`Connection Registry`.

      a. Locate the overview panel of the {+spw+} you want to modify
         and click :guilabel:`Manage`.

      #. In the sidebar, click :guilabel:`Connection Registry`.

   .. step:: Connect your stream processor to the |azure| Private Link endpoint.

      a. Click :guilabel:`+ Add connection`.
      
      #. Select an :guilabel:`Azure Blob Storage` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection name must be unique 
         within a {+spw+}.  This is the name used to reference the connection in 
         {+atlas-sp+} :ref:`aggregations <atlas-sp-aggregation>`.

      #. Click the :guilabel:`Private Link` button.

      #. Toggle :guilabel:`Enable Private Link Networking`
	 on.
	 
      #. From the dropdown menu, select the private endpoint you created earlier.

      #. From the :guilabel:`Azure Service Principal` dropdown, select
	 the service principal defined earlier in this procedure.
	      
      #. Provide the :guilabel:`Storage Account Name` for the
	 :azure:`Azure Storage Account </storage/common/storage-account-overview>`
	 to which you want to connect.

      #. Click :guilabel:`+ Add Connection`.
