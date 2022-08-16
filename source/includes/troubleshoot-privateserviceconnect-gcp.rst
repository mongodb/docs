.. include:: /includes/fact-private-endpoint-status-intro.rst

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

    * - Deleted
      - You manually deleted the private endpoint from a region in 
        |service|. You must also delete the private endpoint in |gcp|
        to delete resources. Pending deletion of the region group. 

...
