.. list-table::
    :widths: 20 80

    * - :guilabel:`Resource ID`
      - Unique string that identifies the private endpoint in your 
        |azure| VNet. Find this value in one of
        the following ways:

        - Use the |azure| dashboard to retrieve this value. The 
          :guilabel:`Properties` page for your private
          endpoint on your |azure| dashboard displays this
          property in the :guilabel:`Resource ID` field.

        - Use the output from the ``azure network private-endpoint
          create`` command to create the
          private endpoint returns this value in the ``id`` field:

          .. literalinclude:: /includes/api/responses/az-network-private-endpoint-create.json
              :language: json
              :linenos:
              :copyable: false
              :emphasize-lines: 4

          You can also return this value using the `azure network private-endpoint list CLI command 
          <https://docs.microsoft.com/en-us/cli/azure/network/private-endpoint?view=azure-cli-latest#az-network-private-endpoint-list>`__.

    * - :guilabel:`Private IP`
      - Private IP address of the private endpoint network
        interface you created in your |azure| VNet. Find this
        value in one of the following ways:

        - Use the |azure| dashboard to retrieve this value. 
          The :guilabel:`Overview` page for your private
          endpoint on your |azure| dashboard displays this
          property in the :guilabel:`Private IP` field.

        - Use the |azure| CLI to retrieve this value:

          i. Use the output from the ``azure network private-endpoint
             create`` command to create the
             private endpoint includes the ID of the network
             interface in the ``networkInterfaces.id`` field:

             .. literalinclude:: /includes/api/responses/az-network-private-endpoint-create.json
                :language: json
                :linenos:
                :copyable: false
                :emphasize-lines: 33

          #. Run the `az network nic show --id {networkInterface.id}
             <https://docs.microsoft.com/en-us/cli/azure/network/nic?view=azure-cli-latest#az_network_nic_show>`__
             |azure| CLI command with the value of the
             ``networkInterfaces.id`` field to retrieve the
             ``ipConfigurations.privateIPAddress`` for the private
             endpoint network interface. The value of this field is
             your :guilabel:`Private IP`:

             .. code-block:: sh

                az network nic show --id /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/privatelink/providers/Microsoft.Network/networkInterfaces/privatelink.nic.00000000-0000-0000-0000-000000000000

             The response looks similar to the following:

             .. literalinclude:: /includes/api/responses/az-network-nic-show.json
                :language: json
                :linenos:
                :copyable: false
                :emphasize-lines: 25