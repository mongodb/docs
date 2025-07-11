.. procedure::
   :style: normal

   .. include:: /includes/atlas-nav/steps-network-access.rst 
      
   .. step:: Check the status of your {+aws-pl+} connections.
      
      Click the :guilabel:`Private Endpoint` tab, which lists each 
      private endpoint you've created. The 
      :guilabel:`Atlas Endpoint Service Status` and 
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
           - |cloudgov-short| is creating the network load balancer 
             and |vpc| resources. 
      
         * - Failed
           - A system failure has occurred. 
      
         * - Ready for connection requests
           - The |cloudgov-short| network load balancer and |vpc| 
             endpoint service are created and ready to receive connection 
             requests.
      
         * - Deleting
           - |cloudgov-short| is deleting the private endpoint service.
      
      :guilabel:`Endpoint Status`
      
      .. list-table::
         :widths: 30 70
         :header-rows: 1
      
         * - Status
           - Description
      
         * - Not configured
           - |cloudgov-short| created the network load balancer and |vpc| 
             endpoint 
             service, but |aws| hasn't yet created the interface endpoint.
             Click :guilabel:`Edit` and complete the wizard to create the
             interface endpoint.
      
         * - Pending acceptance
           - |aws| has received the connection request from your 
             interface endpoint to the |cloudgov-short| |vpc| endpoint 
             service.
           
         * - Pending
           - |aws| is establishing the connection between your
             interface endpoint and the |cloudgov-short| |vpc| endpoint 
             service.
      
         * - Failed
           - |aws| failed to establish a connection between 
             |cloudgov-short| 
             |vpc| resources and the interface endpoint in your |vpc|. 
             Click :guilabel:`Edit`, verify that the information you 
             provided is correct, and then create the private endpoint 
             again.
      
             .. important::
      
                If your interface endpoint fails, you might see
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
           - |cloudgov-short| |vpc| resources are connected to the 
             interface endpoint in your |vpc|. You can connect to 
             |cloudgov-short| clusters in this region using {+aws-pl+}.
      
         * - Deleting
           - |cloudgov-short| is removing the interface endpoint from the 
             private endpoint service.
      
   .. step:: Make sure that your security groups are configured properly.
      
      a. For each resource that needs to connect to your |cloudgov-short| 
         clusters using {+aws-pl+}, the resource's security group must 
         allow outbound traffic to the interface endpoint's private IP(s) 
         on all ports.
      
         See :aws:`Adding Rules to a Security Group </AWSEC2/latest/UserGuide/ec2-security-groups.html#adding-security-group-rule>`
         for more information.
      
      #. Your interface endpoint security group must allow inbound
         traffic on all ports from each resource that needs to connect to
         your |cloudgov-short| clusters using {+aws-pl+}.
      
         :aws:`Whitelist instance IP addresses or security groups </AWSEC2/latest/UserGuide/ec2-security-groups.html#adding-security-group-rule>`
         to allow traffic from them to reach the interface endpoint 
         security group.
      
