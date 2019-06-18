.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Response Object
     - Type
     - Description

   * - ``azureDirectoryId``
     - string
     - Unique identifier of your Azure directory.

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
     - Indicates whether the project has MongoDB clusters deployed
       in the Azure VNet.
       
   * - ``region``
     - string
     - Azure region where the VNet resides.

   * - ``vnetName``
     - string
     - Name of the Azure VNet.