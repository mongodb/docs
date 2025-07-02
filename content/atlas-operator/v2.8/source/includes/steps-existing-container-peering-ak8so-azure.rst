a. Specify the :setting:`spec.networkPeers` parameter in 
   the :ref:`atlasproject-custom-resource`. Replace the following placeholders with your values:

   .. list-table::
      :widths: 50 80
      :header-rows: 1

      * - Placeholder
        - Description

      * - ``spec.networkPeers.providerName``
        - Cloud provider name. Specify ``AZURE``.

      * - ``spec.networkPeers.containerId``
        - Unique identifier for the network peering container you want
          to use. If you don't specify ``containerId``, you must set
          ``atlasCIDRblock``. To learn more, see the 
          :guilabel:`Create New Container` section in this procedure.

      * - ``spec.networkPeers.accepterRegionName``
        - :ref:`Azure region <microsoft-azure>` for your 
          |vpc|.

      * - ``spec.networkPeers.azureSubscriptionId``
        - Unique identifier for your |azure| subscription. 
          |azure|
          displays the subscription ID on the subscription's
          details page.
                    
      * - ``spec.networkPeers.resourceGroupName``
        - Human-readable label that identifies the |azure|
          resource group that contains the |vpc|. |azure| displays the
          resource group name on the resource group's details page.

      * - ``spec.networkPeers.azureDirectoryId``
        - Unique identifier for your |azure| Active
          Directory tenant. |azure| displays this as the ``Tenant ID``
          on the tenant properties page.

      * - ``spec.networkPeers.vnetName``
        - Human-readable label that identifies your |azure| 
          VNET. |azure|
          displays the VNET name on your VNET's details page.

#. Run the following command:

   .. code-block:: sh
      :emphasize-lines: 8-15

      cat <<EOF | kubectl apply -f -
      apiVersion: atlas.mongodb.com/v1
      kind: AtlasProject
      metadata:
        name: my-project
      spec:
        name: Test Atlas Operator Project
        networkPeers:
        - providerName: "AZURE"
          containerID: "6dc5f17280eef56a459fa3fb"
          accepterRegionName: "US_EAST_2"
          azureSubscriptionId: "12345678"
          resourceGroupName: "my-group"
          azureDirectoryId: "x0xxx10-00x0-0x01-0xxx-x0x0x01xx100"
          vnetName: "my-vnet"
      EOF