.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Response Parameter
     - Type
     - Description

   * - errorMessage
     - string
     - Error message pertaining to the {+az-pl+} Service. Returns
       ``null`` if there are no errors.

   * - id
     - string
     - Unique identifier of the {+az-pl+} Service.

   * - privateEndpoints
     - array of strings
     - All private endpoints that you have added to this {+az-pl+} Service.

   * - privateLinkServiceName
     - string
     - Name of the {+az-pl+} Service that |service| manages.

   * - privateLinkServiceResourceId
     - string
     - :azure:`Resource ID
       </azure-resource-manager/templates/template-functions-resource#resourceid>`
       of the {+az-pl+} Service that |service| manages.

       .. important::

          You must use this value when you create a private endpoint
          connection to an |azure| VNet.

   * - status
     - string
     - Status of the {+az-pl+} Service. Returns one of
       the following values:

       .. list-table::
          :header-rows: 1
          :stub-columns: 1
          :widths: 20 80

          * - Status
            - Description

          * - AVAILABLE
            - |service| created the load balancer and the Private Link
              Service.

          * - INITIATING
            - |service| is creating the load balancer and the Private
              Link Service.

          * - FAILED
            - |service| failed to create the load balancer and the
              Private Link Service.
