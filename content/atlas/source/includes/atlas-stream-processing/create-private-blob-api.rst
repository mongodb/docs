Add an Azure Private Link Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an |azure| Blob Storage Private Link connection to your {+spw+} through the
{+atlas-admin-api+}, perform these steps:

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
      </storage/common/storage-network-security-overview>` page of the
      |azure| Blob Storage documentation, providing the IP addresses,
      stripped of CIDR notation, that you noted earlier.
     
   .. step:: Create your Azure private endpoint.

      Perform the procedure outlined on the :azure:`Create a private
      endpoint
      </private-link/create-private-endpoint-portal?tabs=dynamic-ip>`
      page of the |azure| documentation. Note the service endpoint ID
      for later in this procedure.

   .. include:: /includes/nav/steps-project-access-manager      
      
   .. step:: Configure a Service Account.

      .. include:: /includes/atlas-stream-processing/create-service-account.rst

   .. step:: Create the Private Link endpoint.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Private Link
      <creategroupstreamprivatelinkconnection>`.

      For an |azure| Blob Storage Private Link connection, set the
      following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``vendor``
           - ``"AZURE_BLOB_STORAGE"``

         * - ``provider``
           - ``"AZURE"``         
	     
         * - ``region``
           - The |azure| region in which you create the endpoint.

         * - ``serviceEndpointId``
           - The service endpoint ID you noticed earlier.

         * - ``dnsDomain``
           - The name of the
	     :azure:`Azure Storage Account </storage/common/storage-account-overview>`
	     to which you want to connect.

      Use :oas-bump-atlas-op:`Return All Private Link Connections
      <listgroupstreamprivatelinkconnections>` to check
      the ``state`` of your endpoint. When it reaches a ``DONE``
      state, note the value of the ``_id`` field.

   .. step:: Connect your stream processor to the |azure| Private Link endpoint.

      The {+atlas-admin-api+} provides an endpoint to
      :oas-bump-atlas-op:`Create One Stream Connection
      <creategroupstreamconnection>`.

      For an |azure| Blob Storage Private Link connection, set the
      following key-value pairs:

      .. list-table::
	 :widths: 35 65
	 :header-rows: 1

	 * - Key
	   - Value

	 * - ``name``
	   - Name you want to give to the connection.

	 * - ``region``
	   - The region in which you create the connection.
	     {+atlas-sp+} supports |azure| Private Link
	     connections only in the same region as their
	     respective endpoints.
	     
	 * - ``type``
	   - "AzureBlobStorage"

	 * - ``azure.servicePrincipalId``
	   - ``Service Principal`` ID that you noted earlier in
	     this procedure.

	 * - ``azure.storageAccountName``
	   - Name of the |azure| Storage Account to which to connect.		   

	 * - ``publicPrivateNetworking.access.type``
	   - "PRIVATE_LINK"

	 * - ``publicPrivateNetworking.access.connectionId``
	   - Value of ``_id`` in the response when you create
	     the Private Link connection.
