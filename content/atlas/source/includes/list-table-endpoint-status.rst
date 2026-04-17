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

   * - Failed / Rejected
     - |aws| failed to establish a connection between |service|
       |vpc| resources and the :term:`interface endpoint` in your
       |vpc|. This status may appear as :guilabel:`Failed` or
       :guilabel:`Rejected` depending on the failure reason.

       Common causes include:

       - Missing region from the accepted endpoint regions list
       - Incorrect VPC Endpoint ID
       - Transient |aws| issues

       If you have confirmed that your configuration is correct and
       the failure may be due to temporary |aws| delays, you can use
       the :guilabel:`Retry` button in the {+atlas-ui+} to retry the
       connection. If the issue persists, click :guilabel:`Edit` to
       correct the endpoint ID, or verify that the endpoint's region
       is included in the accepted endpoint regions.

       To learn more about troubleshooting failed endpoints, see
       :ref:`pl-troubleshooting`.

       :gold:`IMPORTANT:` If your Interface Endpoint fails, you might see
       the following message:

       .. code-block:: sh
          :copyable: false

          No dns entries found for endpoint vpce-<guid>,
          your endpoint must be provisioned in at least one subnet.
          Click "Edit" to fix the problem.

       This message indicates that you didn't specify
       a subnet when you created the {+aws-pl+}
       connection. To resolve this error:

       a. Click :guilabel:`Edit`.
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
