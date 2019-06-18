.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Response Object
     - Type
     - Description

   * - ``atlasCidrBlock``
     - string
     - CIDR block that |service| uses for the clusters in
       your project.

   * - ``azureSubscriptionId``
     - string
     - Unique identifer of the Azure subscription in which the
       VNet resides.

   * - ``id``
     - string
     - Unique identifier of the container.

   * - ``providerName``
     - string
     - The name of the cloud provider.

   * - ``provisioned``
     - boolean
     - Indicates whether the project has MongoDB clusters deployed
       in the Azure VNet.
       
   * - ``region``
     - string
     - The Azure region where the VNet resides.

   * - ``vnetName``
     - string
     - Unique identifier of your |azure| VNet. The value is ``null`` if
       there are no network peering connections in the container.