a. Specify the :setting:`spec.networkPeers` parameter in 
   the :ref:`atlasproject-custom-resource`. Replace the following placeholders with your values:

   .. list-table::
      :widths: 50 80
      :header-rows: 1

      * - Placeholder
        - Description

      * - ``spec.networkPeers.providerName``
        - Cloud provider name. Specify ``AWS``.

      * - ``spec.networkPeers.atlasCidrBlock``
        - |service| |cidr| block for which |ak8so| creates a new
          container.
          If you don't specify ``atlasCidrBlock``, you must
          specify the ``containerId`` of an existing container. To
          learn more, see the :guilabel:`Use Existing Container`
          section in this procedure.

      * - ``spec.networkPeers.containerRegion``
        - (Optional) |aws| region in which |ak8so| creates a new
          container. If you don't specify either a ``containerRegion``
          or a ``containerId``, |ak8so| creates a new container in the
          same region as the ``accepterRegionName``.

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
      :emphasize-lines: 8-15

      cat <<EOF | kubectl apply -f -
      apiVersion: atlas.mongodb.com/v1
      kind: AtlasProject
      metadata:
        name: my-project
      spec:
        name: Test Atlas Operator Project
        networkPeers:
        - providerName: "AWS"
          atlasCidrBlock: "10.8.0.0/21"
          containerRegion: "us-west-1"
          accepterRegionName: "us-east-2"
          awsAccountId: "12345678"
          routeTableCidrBlock: "10.0.0.0/24"
          vpcId: "vpc-12345678"
      EOF