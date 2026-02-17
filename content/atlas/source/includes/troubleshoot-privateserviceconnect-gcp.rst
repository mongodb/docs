To view the status of each private endpoint:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Click the :guilabel:`Private Endpoint` tab.

   .. step:: Review the statuses.

      The :guilabel:`Atlas Endpoint Service Status` and 
      :guilabel:`Endpoint Status` fields show the status of each 
      private endpoint.

      Refer to the following statuses to help you determine the state of
      your private endpoint connections:

      :guilabel:`Atlas Endpoint Service Status`

      .. list-table::
          :widths: 30 70
          :header-rows: 1

          * - Status
            - Description

          * - Creating private link
            - |service| is creating the network load balancer and |vpc| 
              resources. 

          * - Failed
            - A system failure has occurred. 

          * - Available
            - |service| created the network load balancer and |vpc| endpoint
              service.
              The private endpoint service is ready to receive connection requests. 

          * - Deleting
            - |service| is deleting the private endpoint service.

      :guilabel:`Endpoint Status`

      .. list-table::
          :widths: 30 70
          :header-rows: 1

          * - Status
            - Description

          * - Initiating
            - |service| is not yet connected to your private endpoint and 
              has not yet accepted the endpoints.

          * - Waiting for User
            - |vpc| resources on |service| are ready for use. You must
              set up the endpoints within your |vpc| by running the shell 
              script.

          * - Verified
            - |service| verified the endpoints within your |vpc| but has not
              yet accepted the private endpoint 
              in your |gcp| |vpc|. It might take several minutes for the
              :guilabel:`Endpoint Status` to become ``Available``. 

          * - Available
            - The |service| |vpc| resources are connected to the private endpoint 
              in your |gcp| |vpc|. |service| has accepted the endpoints.
              You can connect to |service| clusters in this region using {+gcp-psc+}.

          * - Active
            - |service| is ready to use |vpc| resources. |service| has accepted the 
              endpoints. A VM is assigned to the private service 
              connection. 

          * - Failed
            - |gcp| failed to establish a connection between |service| 
              |vpc| resources and the private endpoint in your |gcp| |vpc|. 
              Click :guilabel:`Edit`, verify that the information you 
              provided is correct, and then create the private endpoint 
              again. 

              Note: If you see the error message "The endpoint could not be found in GCP. 
              Please verify the endpoint name is correct and is created in the correct 
              GCP project and try again," you might have mistyped your private endpoint name, 
              or you may still need to create it. To resolve this, click 
              :guilabel:`Edit` and make sure the fields are accurate.

          * - Deleted
            - You manually deleted the private endpoint from a region in 
              |service|. You must also delete the private endpoint in |gcp|
              to delete resources. Pending deletion of the region group. 

   .. step:: Make sure that your security groups are configured properly.

      For each resource that needs to connect to your |service| clusters using 
      GCP Private Service Connect, you must allow outbound traffic to the 
      forwarding rule's private IP addresses on all ports (1024-65535).
      See `Managing Consumer Security For PSC <https://docs.cloud.google.com/vpc/docs/manage-security-private-service-connect-consumers#firewall-rules>`_ for more information.