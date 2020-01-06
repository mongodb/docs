.. list-table::
  :header-rows: 1
  :widths: 15 10 75

  * - Field
    - Type
    - Description

  * - ``endpointServiceName``
    - string
    - Name of the PrivateLink endpoint service in |aws|. Returns ``null``
      while the endpoint service is being created.

  * - ``errorMessage``
    - string
    - Error message pertaining to the {+aws-pl+} connection. Returns 
      ``null`` if there are no errors. 

  * - ``id``
    - string
    - Unique identifier of the {+aws-pl+} connection. 

  * - ``interfaceEndpoints``
    - array of strings
    - Unique identifiers of the interface endpoints in your |vpc| that 
      you added to the {+aws-pl+} connection.       

  * - ``status``
    - string
    - Status of the {+aws-pl+} connection. Returns one of the following 
      values:

      .. list-table::
         :header-rows: 1

         * - Status
           - Description

         * - ``INITIATING``
           - |service| is creating the network load balancer and |vpc|
             endpoint service.

         * - ``WAITING_FOR_USER``
           - The |service| network load balancer and VPC endpoint 
             service are created and ready to receive connection 
             requests.

             When you receive this status, :doc:`create an interface endpoint 
             </reference/api/private-endpoint-create-one-interface-endpoint>`
             to continue configuring the {+aws-pl+} connection.

         * - ``FAILED``
           - A system failure has occurred.

         * - ``DELETING``
           - The {+aws-pl+} connection is being deleted.
