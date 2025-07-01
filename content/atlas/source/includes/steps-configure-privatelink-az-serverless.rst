.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab and then the following tab.
      
      Click :guilabel:`Serverless Instance` to set up a private 
      endpoint for your |service| {+Serverless-instance+}.
      
   .. step:: Click the button to set up the private endpoint.
      
      Click the :guilabel:`Create New Endpoint` button.  
      
   .. step:: Choose a {+Serverless-instance+}.
      
      a. From the :guilabel:`{+Serverless-Instance+}` dropdown, select the 
         {+Serverless-instance+} to connect to using a private
         endpoint. The cloud provider and region for the 
         {+Serverless-instance+} populate automatically.
      #. Click :guilabel:`Confirm`. |service| begins allocating the
         endpoint service, which might take several minutes to complete.
         You can continue to the next steps while |service| allocates the
         endpoint service.
      
   .. step:: Configure your private endpoint.

      .. include:: /includes/fact-avoid-connection-interruptions.rst
      
      a. Enter the following details about your |azure| VNet:

         .. list-table::
            :widths: 20 80

            * - :guilabel:`Resource Group Name`
              - Human-readable label that identifies the resource group
                that contains the VNet that you want to use to connect 
                to |service|. Find this value on the 
                :guilabel:`Resource Group Properties` page on your 
                |azure| dashboard.

            * - :guilabel:`Virtual Network Name`
              - Human-readable label that identifies the VNet 
                that you want to use to connect to
                |service|. Find this value on the :guilabel:`Virtual
                Network` page on your |azure| dashboard.

            * - :guilabel:`Subnet Name`
              - Human-readable label that identifies the subnet in your 
                |azure| VNet. Find this value on the 
                :guilabel:`Virtual Network Subnets` page on your 
                |azure| dashboard.

      #. Enter a unique name for your private endpoint in the
         :guilabel:`Private Endpoint Name` field.

      #. Create the private endpoint in your VNet by copying the 
         ``az network private-endpoint create`` command the dialog box 
         displays and running it using the |azure| CLI.

         .. note::
        
            You can't copy the command until |service| finishes
            creating VNet resources in the background.

            For more information about this command, see the 
            `Azure documentation <https://docs.microsoft.com/en-us/cli/azure/network/private-endpoint?view=azure-cli-latest#az_network_private_endpoint_create>`__.

      #. You might receive an error like the following when you create 
         the private endpoint:

         .. code-block:: sh
            :copyable: false

            ServiceError: code: LinkedAuthorizationFailed - , The client has permission to perform action 'Microsoft.Network/privateLinkServices/PrivateEndpointConnectionsApproval/action' on scope '/subscriptions/<subscription-id>/resourceGroups/privatelink/providers/Microsoft.Network/privateEndpoints/privatelink', however the current tenant '<tenant-id>' is not authorized to access linked subscription '<tenant-id>'.

         If you receive this error, add the 
         ``--manual-request true`` parameter to the |azure| CLI command 
         you used to create the private endpoint, then run the command 
         again.
            
      #. Click :guilabel:`Next`.
      
   .. step:: Finalize your private endpoint connection.

      .. include:: /includes/fact-avoid-connection-interruptions.rst
      
      a. Enter the following details about your private endpoint:

         .. include:: /includes/list-table-azure-serverless-create-endpoint-in-az.rst

      #. Enter an optional description for the endpoint.
      #. Click :guilabel:`Create`.

   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Verify that the private endpoint is available.
      
      You can connect to an |service| cluster using the {+az-pl+} private 
      endpoint when all of the resources are configured and the private
      endpoint becomes available.
      
      To verify that the {+az-pl+} private endpoint is available:
      
      On the :guilabel:`Private Endpoint` tab, select a 
      {+database-deployment+} type and verify the following 
      statuses for the region that contains the cluster 
      you want to connect to using {+az-pl+}:
      
      .. list-table::
         :widths: 20 80
      
         * - :guilabel:`Atlas Endpoint Service Status`
           - Available
               
         * - :guilabel:`Endpoint Status`
           - Available
      
      To learn more about possible status values, see :ref:`pl-troubleshooting`.
      
      If you do not see these statuses, see :ref:`pl-troubleshooting` for
      additional information.     
