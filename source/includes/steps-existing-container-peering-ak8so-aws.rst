a. Specify the :setting:`spec.networkPeers` parameter in 
   the :ref:`atlasproject-custom-resource`. Replace the following placeholders with your values:

   .. list-table::
      :widths: 50 80
      :header-rows: 1

      * - Placeholder
        - Description

      * - ``spec.networkPeers.providerName``
        - Cloud provider name. Specify ``AWS``.

      * - ``spec.networkPeers.containerId``
        - Unique identifier for the network peering container you want
          to use. If you don't specify ``containerId``, you must set
          ``atlasCIDRblock``. To learn more, see the 
          :guilabel:`Create New Container` section in this procedure.

      * - ``spec.networkPeers.accepterRegionName``
        - :ref:`AWS region <amazon-aws>` for your |vpc|.

      * - ``spec.networkPeers.awsAccountId``
        - Unique identifier for your |aws| account. |aws|
          displays the account ID when you click
          the account name in the top right corner of the console home page.
                    
      * - ``spec.networkPeers.routeTableCidrBlock``
        - |cidr| block for your |aws| |vpc|. |aws| displays
          the |cidr| block on your |vpc|'s details page.

      * - ``spec.networkPeers.vpcId``
        - Unique identifier for your |aws| |vpc|. |aws|
          displays the |vpc| ID on your |vpc|'s details page.

#. Run the following command:

   .. code-block:: sh
      :emphasize-lines: 8-14

      cat <<EOF | kubectl apply -f -
      apiVersion: atlas.mongodb.com/v1
      kind: AtlasProject
      metadata:
        name: my-project
      spec:
        name: Test Atlas Operator Project
        networkPeers:
        - providerName: "AWS"
          containerID: "6dc5f17280eef56a459fa3fb"
          accepterRegionName: "us-east-2"
          awsAccountId: "12345678"
          routeTableCidrBlock: "10.0.0.0/24"
          vpcId: "vpc-12345678"
      EOF