.. list-table::
  :header-rows: 1
  :stub-columns: 1
  :widths: 20 14 66 

  * - Response Parameter
    - Type
    - Description

  * - deleteRequested
    - boolean
    - Flag that indicates whether |service| received a request to remove
      the delete the private endpoint connection.

  * - errorMessage
    - string
    - Error message pertaining to the private endpoint. |service|
      returns **null** if there are no errors.

  * - privateEndpointConnectionName
    - string
    - Name of the connection for this private endpoint that |service|
      generates.

  * - privateEndpointIpAddress
    - string
    - Private IP address of the private endpoint network interface.

  * - privateEndpointResourceId
    - string
    - Unique identifier of the private endpoint.

  * - status
    - string
    - Status of the interface endpoint. |service| returns one of the
      following values:

      .. list-table::
         :header-rows: 1
         :stub-columns: 1
         :widths: 20 80

         * - Status
           - Description

         * - FAILED
           - |service| failed to accept the connection your private
             endpoint.

         * - INITIATING
           - |service| has not yet accepted the connection to your
             private endpoint.

         * - AVAILABLE
           - |service| approved the connection to your private endpoint.

         * - DELETING
           - |service| is removing the connection to your private
             endpoint from the Private Link service.
