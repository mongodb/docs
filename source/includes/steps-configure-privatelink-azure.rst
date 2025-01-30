.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab and then the following tab.
      
      Click :guilabel:`Dedicated Cluster` for a private endpoint 
      for your dedicated |service| cluster. (default)
      
   .. step:: Click the button to set up the private endpoint.
      
      Click the :guilabel:`Add Private Endpoint` button. 

      .. note::

         You must provide the billing information in the 
         :guilabel:`Edit Payment Method` form if you don't have payment 
         method already configured for your organization.
      
   .. step:: Choose a cloud provider.
      
      Click the |azure| logo, then click :guilabel:`Next`.
      
   .. step:: Choose a region.
      
      a. From the :guilabel:`Atlas Region` list, select the region
         in which you want to create the private endpoint. 
      #. Click :guilabel:`Next`.
      
      .. note::
         If your organization has no payment information stored, |service| 
         prompts you to add it before continuing.
      
   .. step:: Configure your private endpoint.

      .. include:: /includes/fact-avoid-connection-interruptions.rst
      
      a. Enter the following details about your |azure| VNet:

         .. list-table::
            :widths: 20 80

            * - :guilabel:`Resource Group Name`
              - The name of the resource group that contains the VNet 
                that you want to use to connect to |service|. Find this 
                value on the :guilabel:`Resource Group Properties` page 
                on your |azure| dashboard.

            * - :guilabel:`Virtual Network Name`
              - The name of the VNet that you want to use to connect to
                |service|. Find this value on the 
                :guilabel:`Virtual Network` page on your |azure| 
                dashboard.

            * - :guilabel:`Subnet Name`
              - The name of the subnet in your |azure| VNet. Find this
                value on the :guilabel:`Virtual Network Subnets` page on
                your |azure| dashboard.

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

         If you receive this error, you must add the 
         ``--manual-request true`` parameter to the |azure| CLI command 
         you used to create the private endpoint, then run the command 
         again.
            
      #. Click :guilabel:`Next`.
      
   .. step:: Finalize your private endpoint connection.

      .. include:: /includes/fact-avoid-connection-interruptions.rst
      
      a. Enter the following details about your private endpoint:

         .. list-table::
            :widths: 20 80

            * - :guilabel:`Private Endpoint Resource ID`
              - The unique identifier of the private endpoint you 
                created in your |azure| VNet. Find this value in one of 
                the following ways:

                - The :guilabel:`Properties` page for your private
                  endpoint on your |azure| dashboard displays this
                  property in the :guilabel:`Resource ID` field.

                - The output from the following command that you ran   
                  earlier to create the private endpoint returns the 
                  highlighted value in the **id** field:

                  .. io-code-block::
                     :copyable: false

                     .. input::
                        :linenos:

                        azure network private-endpoint create

                     .. output:: /includes/api/responses/az-network-private-endpoint-create.json
                        :language: json
                        :linenos:
                        :emphasize-lines: 4

            * - :guilabel:`Private Endpoint IP Address`
              - The private IP address of the private endpoint network
                interface you created in your |azure| VNet. Find this
                value in one of the following ways:

                - Use the |azure| dashboard to retrieve this value. 
                  The :guilabel:`Overview` page for your private
                  endpoint on your |azure| dashboard displays this
                  property in the :guilabel:`Private IP` field.

                - Use the |azure| CLI to retrieve this value:

                  i. The output from the following command that you ran 
                     earlier to create the private endpoint includes 
                     the ID of the network interface in the highlighted 
                     **networkInterfaces.id** field:
                   
                     .. io-code-block::
                        :copyable: false

                        .. input::
                           :linenos:

                           azure network private-endpoint create

                        .. output:: /includes/api/responses/az-network-private-endpoint-create.json
                           :language: json
                           :linenos:
                           :emphasize-lines: 33

                  #. Run the `az network nic show --id {networkInterface.id}
                     <https://docs.microsoft.com/en-us/cli/azure/network/nic?view=azure-cli-latest#az_network_nic_show>`__
                     |azure| CLI command with the value of the
                     **networkInterfaces.id** field to retrieve the
                     **ipConfigurations.privateIPAddress** for the 
                     private endpoint network interface. The value of 
                     this field is your 
                     :guilabel:`Private Endpoint IP Address`. The input 
                     and output should look similar to the following. 
                     Note the highlighted value of the 
                     :guilabel:`Private Endpoint IP Address` field.
                   
                     .. io-code-block::
                        :copyable: true

                        .. input::
                           :language: sh
                           :linenos:
                         
                           az network nic show --id /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/privatelink/providers/Microsoft.Network/networkInterfaces/privatelink.nic.00000000-0000-0000-0000-000000000000

                        .. output:: /includes/api/responses/az-network-nic-show.json
                           :language: json
                           :linenos:
                           :emphasize-lines: 25

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
