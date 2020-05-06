.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Response Field
     - Type
     - Description

   * - ``azureDirectoryId``
     - string
     - Unique identifier of your Azure AD directory.

   * - ``azureSubscriptionId``
     - string
     - Unique identifier of your Azure subscription.

   * - ``containerId``
     - string
     - Unique identifier of the |service| network peering container.

   * - ``errorState``
     - string
     - Description of the |service| error when
       ``"status" : "FAILED"``. Otherwise, |service| returns ``null``.

   * - ``id``
     - string
     - Unique identifier of the |service| network peeering connection.

   * - ``resourceGroupName``
     - string
     - Unique identifier of your Azure resource group.

   * - ``status``
     - string
     - Status of the |service| network peering connection:

       * ``ADDING_PEER``
       * ``AVAILABLE``
       * ``FAILED``
       * ``DELETING``

   * - ``vnetName``
     - string
     - Unique identifier of your |azure| VNet.
