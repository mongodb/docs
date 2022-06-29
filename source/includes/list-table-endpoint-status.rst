:guilabel:`Endpoint Status`
  
.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Status
     - Description

   * - Not configured
     - |service| created the network load balancer and |vpc| endpoint 
       service, but |aws| hasn't yet created the 
       :term:`interface endpoint`. Click :guilabel:`Edit` and complete 
       the wizard to create the interface endpoint.

   * - Pending acceptance
     - |aws| has received the connection request from your 
       :term:`interface endpoint` to the |service| |vpc| endpoint 
       service.
       
   * - Pending
     - |aws| is establishing the connection between your
       :term:`interface endpoint` and the |service| |vpc| endpoint 
       service.

   * - Failed
     - |aws| failed to establish a connection between |service| 
       |vpc| resources and the :term:`interface endpoint` in your
       |vpc|. Click :guilabel:`Edit`, verify that the information you 
       provided is correct, and then create the private endpoint 
       again.

       .. important::

          If your Interface Endpoint fails, you might see
          the following message:

          .. example::

             No dns entries found for endpoint vpce-<guid>, 
             your endpoint must be provisioned in at least one subnet 
             Click "Edit" to fix the problem.

          This message indicated that you didn't specify
          a subnet when you created the {+aws-pl+}
          connection. To resolve this error:
            
          1. Click :guilabel:`Edit`. 
          #. Click :guilabel:`Back`. 
          #. Specify at least one subnet.
          #. Follow the remaining instructions to create
             the {+aws-pl+} connection.

   * - Available
     - |service| |vpc| resources are connected to the 
       :term:`interface endpoint` 
       in your |vpc|. You can connect to |service| clusters in this
       region using {+aws-pl+}.

   * - Deleting
     - |service| is removing the interface endpoint from the private
       endpoint service.
