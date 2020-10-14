.. list-table::
  :header-rows: 1
  :stub-columns: 1
  :widths: 20 14 66

  * - Response Parameter
    - Type
    - Description

  * - connectionStatus
    - string
    - Status of the interface endpoint. Returns one of the following 
      values:

      .. list-table::
         :header-rows: 1
         :stub-columns: 1
         :widths: 20 80

         * - Status
           - Description

         * - NONE
           - |service| created the network load balancer and |vpc| 
             endpoint service, but |aws| hasn't yet created the |vpc| 
             endpoint.

         * - PENDING_ACCEPTANCE
           - |aws| has received the connection request from your |vpc|
             endpoint to the |service| |vpc| endpoint service.

         * - PENDING
           - |aws| is establishing the connection between your
             |vpc| endpoint and the |service| |vpc| endpoint service.

         * - AVAILABLE
           - |service| |vpc| resources are connected to the |vpc| 
             endpoint in your |vpc|. You can connect to |service| 
             clusters in this region using {+aws-pl+}.

         * - REJECTED
           - |aws| failed to establish a connection between |service| 
             |vpc| resources to the |vpc| endpoint in your |vpc|. 

         * - DELETING
           - |service| is removing the interface endpoint from the
             private endpoint connection.

  * - deleteRequested
    - boolean
    - Flag that indicates whether |service| received a request to remove
      the interface endpoint from the private endpoint connection.

  * - errorMessage
    - string
    - Error message pertaining to the interface endpoint. |service|
      returns **null** if there are no errors. 

  * - interfaceEndpointId
    - string
    - Unique identifier of the interface endpoint.    
