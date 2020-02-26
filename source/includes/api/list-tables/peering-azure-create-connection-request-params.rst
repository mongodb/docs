.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Body Parameter
     - Type
     - Description

   * - ``azureDirectoryId``
     - string
     - Unique identifier for an Azure :abbr:`AD (Active Directory)` directory.

   * - ``azureSubscriptionId``
     - string
     - Unique identifer of the Azure subscription in which the
       VNet resides.

   * - ``containerId``
     - string
     - Unique identifier of the |service| network peering container
       for the region.

       You can create an |service| network peering container using the
       :doc:`Create Container </reference/api/vpc-create-container>`
       endpoint. You cannot create more than one container per region.

       To retrieve a list of container IDs, use the
       :doc:`Get list of VPC containers </reference/api/vpc-get-containers-list>`
       endpoint.

   * - ``providerName``
     - string
     - Name of the cloud provider.

   * - ``resourceGroupName``
     - string
     - Name of your Azure resource group.

   * - ``vnetName``
     - string
     - Name of your Azure VNet.
