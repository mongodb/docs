.. list-table:: 
         :header-rows: 1
         :widths: 30 70 

         * - Column Name 
           - Description

         * - :guilabel:`Cloud Provider`
           - The cloud provider (|aws| or |azure|) hosting the |vpc| or |azure| virtual 
             network that |service| uses for the private endpoint.

         * - :guilabel:`Region`
           - The region where the cloud provider deploys the private endpoint.

         * - :guilabel:`Endpoint Status`
           -  The status of the private endpoint connection. Possible options:

              - :guilabel:`Pending`: The endpoint request is awaiting approval 
                from |service| or the set up process isn't complete.
              - :guilabel:`OK`: The endpoint is active and functioning correctly.
              - :guilabel:`Failed`: There was an error in setting up the endpoint
                and it is not operational. Click :guilabel:`Edit` to fix the problem.
              - :guilabel:`Deleting`: |service| is in the process of removing the endpoint.

         * - :guilabel:`VPC ID / Virtual Network Name`
           - The unique identifier of either the |aws| |vpc| or |azure| virtual 
             network used for the private endpoint. 

         * - :guilabel:`Description` 
           - The description you added when creating the private endpoint. 

         * - :guilabel:`Actions` 
           - The actions you can take on the private endpoint. You can: 

             - :ref:`edit-private-endpoint`
             - :ref:`delete-private-endpoint`