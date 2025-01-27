a. Specify the :setting:`spec.networkPeers` parameter in 
   the :ref:`atlasproject-custom-resource`. Replace the following placeholders with your values:

   .. list-table::
      :widths: 50 80
      :header-rows: 1

      * - Placeholder
        - Description

      * - ``spec.networkPeers.providerName``
        - Cloud provider name. Specify ``GCP``.

      * - ``spec.networkPeers.containerId``
        - Unique identifier for the network peering container you want
          to use. If you don't specify ``containerId``, you must set
          ``atlasCIDRblock`` and ``containerRegion``. To learn more,
          see the :guilabel:`Create New Container` section in this
          procedure.

      * - ``spec.networkPeers.gcpProjectId``
        - Unique identifier for your |gcp| project. |gcp|
          displays the project ID on the project's details
          page.
                    
      * - ``spec.networkPeers.routeTableCidrBlock``
        - |cidr| block for your |gcp| |vpc|. |gcp| displays
          the |cidr| block on your |vpc|'s details page.

      * - ``spec.networkPeers.networkName``
        - Human-readable label for your |gcp| |vpc|. |gcp|
          displays the network name on your |vpc|'s details page.

#. Run the following command:

   .. code-block:: sh
      :emphasize-lines: 8-12

      cat <<EOF | kubectl apply -f -
      apiVersion: atlas.mongodb.com/v1
      kind: AtlasProject
      metadata:
          name: my-project
      spec:
        name: Test Atlas Operator Project
        networkPeers:
        - providerName: "GCP"
          containerId: "6dc5f17280eef56a459fa3fb"
          gcpProjectId: "12345678"
          networkName: "my-vpc"
      EOF