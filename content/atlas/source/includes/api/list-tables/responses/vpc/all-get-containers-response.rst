.. list-table::
   :header-rows: 1
   :widths: 15 10 65 10

   * - Response Element
     - Type
     - Description
     - Provider

   * - ``atlasCidrBlock``
     - string
     - |cidr| block that |service| uses for your clusters.
     - AWS, Azure, GCP

   * - ``azureSubscriptionId``
     - string
     - Unique identifer of the Azure subscription in which the
       VNet resides.
     - Azure

   * - ``gcpProjectId``
     - string
     - Unique identifier of the |gcp| project in which the network peer
       resides. Returns ``null`` until a peering connection is created.
       Maps to the :guilabel:`Atlas GCP Project ID` field returned when
       you create a |vpc| in the |service| console.

       You must provide this value when you create a |vpc| in |gcp|.
     - GCP

   * - ``id``
     - string
     - Unique identifier of the Network Peering container.
     - AWS, Azure, GCP

   * - ``networkName``
     - string
     - Unique identifier of the Network Peering connection in the
       |service| project. Returns ``null`` until a peering connection
       is created. Maps to the :guilabel:`Atlas VPC Name` field
       returned when you create a |vpc| in the |service| console.

       You must provide this value when you create a |vpc| in |gcp|.
     - GCP

   * - ``providerName``
     - string
     - Cloud provider for this Network Peering connection.
     - AWS, Azure, GCP

   * - ``provisioned``
     - boolean
     - Flag that indicates if the project has clusters deployed in the
       Network Peering container or Azure VNet.
     - AWS, Azure, GCP

   * - ``region``
     - string
     - AWS region where the VCP resides or Azure region where the VNet
       resides.
     - AWS, Azure

   * - ``vnetName``
     - string
     - Unique identifier of your |azure| VNet. The value is ``null`` if
       there are no network peering connections in the container.
     - Azure

   * - ``vpcId``
     - string
     - Unique identifier of the project's Network Peering container.
     - AWS
