.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Response Element
     - Type
     - Description

   * - ``atlasCidrBlock``
     - string
     - |cidr| block that |service| uses for the clusters in your
       project.

   * - ``azureSubscriptionId``
     - string
     - Unique identifer of the Azure subscription in which the
       VNet resides.

   * - ``id``
     - string
     - Unique identifier of the container.

   * - ``providerName``
     - string
     - Name of the cloud provider.

   * - ``provisioned``
     - boolean
     - Indicates whether the project has MongoDB clusters deployed in
       the Azure VNet.

   * - ``region``
     - string
     - Azure region where the VNet resides.

   * - ``vnetName``
     - string
     - Unique identifier of your |azure| VNet. The value is ``null`` if
       there are no network peering connections in the container.
