a. Specify the :setting:`spec.networkPeers` parameter in 
   the :ref:`atlasproject-custom-resource`. Replace the following placeholders with your values:

   .. list-table::
      :widths: 50 80
      :header-rows: 1

      * - Placeholder
        - Description

      * - ``spec.networkPeers.providerName``
        - Cloud provider name. Specify ``GCP``.

      * - ``spec.networkPeers.atlasCidrBlock``
        - |service| |cidr| block for which |ak8so| creates a new
          container.
          If you don't specify ``atlasCidrBlock``, you must
          specify the ``containerId`` of an existing container. To
          learn more, see the :guilabel:`Use Existing Container`
          section in this procedure.

      * - ``spec.networkPeers.containerRegion``
        - :ref:`Google Cloud region <google-gcp>` for your 
          |vpc|.
      * - ``spec.networkPeers.containerRegion``
        - :ref:`Google Cloud region <google-gcp>` in which 
          |ak8so| creates a new
          container. If you don't specify ``containerRegion``, you must
          specify the ``containerId`` of an existing container. To
          learn more, see the :guilabel:`Use Existing Container`
          section in this procedure.

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
          atlasCidrBlock: "10.8.0.0/21"
          gcpProjectId: "12345678"
          networkName: "my-vpc"
      EOF