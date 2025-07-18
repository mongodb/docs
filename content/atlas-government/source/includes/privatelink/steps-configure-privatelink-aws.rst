.. procedure::
   :style: normal
      
      
   .. include:: /includes/atlas-nav/steps-network-access.rst
      
   .. step:: Create a private endpoint.
      
      a. Click the :guilabel:`Private Endpoint` tab.
      
      #. Click :guilabel:`Add Private Endpoint`.
      
   .. step:: Choose a cloud provider.
      
      Click the |aws| logo, then click :guilabel:`Next`.
      
   .. step:: Choose a region.
      
      a. From the :guilabel:`Atlas Region` list, select the region
         in which you want to create the private endpoint.
      
      #. Click :guilabel:`Next`.
      
      |cloudgov-short| creates |vpc| resources in the region
      you selected. This might take several minutes to complete.
      
   .. step:: Configure your private endpoint.
      
      a. Enter the following details about your |aws| |vpc|:
      
         .. list-table::
            :widths: 20 80
      
            * - :guilabel:`Your VPC ID`
              - Unique identifier of the peer |aws| |vpc|. Find this 
                value on the |vpc| dashboard in your |aws| account.
      
            * - :guilabel:`Your Subnet IDs`
              - Unique identifiers of the subnets your |aws| |vpc| uses. 
                Find these values on the :guilabel:`Subnet` dashboard in 
                your |aws| account.
      
                .. important::
      
                  You must specify at least one subnet. If you don't, 
                  |aws| won't provision an interface endpoint in
                  your |vpc|. An  is required for 
                  clients in your |vpc| to send traffic to the private endpoint.
      
      #. Copy the command the dialog displays and run it using the |aws| 
         CLI.
      
         .. note::
          
            You can't copy the command until |cloudgov-short| finishes
            creating |vpc| resources in the background.
      
            See :aws:`Creating an Interface Endpoint </vpc/latest/userguide/vpce-interface.html#create-interface-endpoint>` to perform this task using the |aws| CLI.
        
      #. You might receive an error like the following when you create 
         the private endpoint:
      
         .. code-block:: sh
            :copyable: false
      
            An error occurred (InvalidParameter) when calling the CreateVpcEndpoint 
            operation: The VPC endpoint service com.amazonaws.vpce.us-east-1.vpce-svc-<...> 
            does not support the availability zone of the subnet: subnet-<...>.
      
         If you receive this error, |cloudgov-short| has deployed |vpc| 
         resources into different availability zones than the ones to 
         which you deployed your |vpc| subnets. 
         Please contact MongoDB Support for assistance resolving this 
         error. To contact support, click :guilabel:`Support` from the 
         left-hand navigation bar of the |cloudgov-short| UI.
              
      #. Click :guilabel:`Next`.
      
   .. step:: Finalize your private endpoint connection.
      
      a. Enter your :guilabel:`VPC Endpoint ID`. This is a 
         22-character alphanumeric string that identifies your private 
         endpoint. Find this value on the |aws| VPC Dashboard under 
         :guilabel:`Endpoints` > :guilabel:`VPC ID`.
      
      #. Click :guilabel:`Create`.
      
   .. step:: Configure your resources' security groups to send traffic to and receive traffic from the interface endpoint.
      
      For each resource that needs to connect to your |cloudgov-short| 
      clusters using {+aws-pl+}, the resource's security group must allow 
      outbound traffic to the interface endpoint's private IP(s) on all 
      ports.
      
      See :aws:`Adding Rules to a Security Group </AWSEC2/latest/UserGuide/ec2-security-groups.html#adding-security-group-rule>` in the |aws| 
      documentation for more information.
      
   .. step:: Create a security group for your interface endpoint to allow resources to access it.
      
      This security group must allow inbound traffic on all ports from each 
      resource that needs to connect to your |cloudgov-short| clusters 
      using {+aws-pl+}:
      
      a. In the |aws| console, navigate to the :guilabel:`VPC Dashboard`. 
      
      #. Click :guilabel:`Security Groups`, then click 
         :guilabel:`Create security group`.
      
      #. Use the wizard to create a security group. Make sure you select 
         your VPC from the :guilabel:`VPC` list.
      
      #. Select the security group you just created, then click the 
         :guilabel:`Inbound Rules` tab.
      
      #. Click :guilabel:`Edit Rules`.
      
      #. Add rules to allow all inbound traffic from each resource in your
         VPC that you want to connect to your |cloudgov-short| cluster.
      
      #. Click :guilabel:`Save Rules`.
      
      #. Click :guilabel:`Endpoints`, then click the endpoint for your
         VPC.
      
      #. Click the :guilabel:`Security Groups` tab, then click 
         :guilabel:`Edit Security Groups`.
      
      #. Add the security group you just created, then click 
         :guilabel:`Save`.
      
      See :aws:`VPC security groups 
      </vpc/latest/userguide/VPC_SecurityGroups.html>` in the |aws| 
      documentation for more information.
      
   .. include:: /includes/atlas-nav/steps-network-access.rst
   
   .. step:: Verify that the private endpoint is available.
      
      You can connect to an |cloudgov-short| cluster using the {+aws-pl+} 
      private endpoint when all of the resources are configured and the 
      private endpoint becomes available.
      
      To verify that the {+aws-pl+} private endpoint is available:
      
      a. On the :guilabel:`Private Endpoint` tab, verify the following 
         statuses for the region that contains the cluster 
         you want to connect to using {+aws-pl+}:
      
         .. list-table::
            :widths: 20 80
      
            * - :guilabel:`Atlas Endpoint Service Status`
              - Ready for connection requests
               
            * - :guilabel:`Endpoint Status`
              - Available
      
      If you do not see these statuses, see 
      :ref:`privatelink-troubleshooting` for additional information.
      
