.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab and then the following tab.
      
      Click :guilabel:`Dedicated Cluster` for a private endpoint 
      for your dedicated |service| cluster. (default)
      
   .. step:: Click the button to set up the private endpoint.
      
      Click the :guilabel:`Add Private Endpoint` button. 

      .. note::

         You must provide the billing information in the :guilabel:`Edit
         Payment Method` form if you don't have payment method already
         configured for your organization.
      
   .. step:: Choose a cloud provider.
      
      Click the |aws| logo, then click :guilabel:`Next`.
      
   .. step:: Choose a region.
      
      a. From the :guilabel:`Atlas Region` list, select the region
         in which you want to create the private endpoint. 
      #. Click :guilabel:`Next`.
      
      .. note::
         If your organization has no payment information stored, |service| 
         prompts you to add it before continuing.
      
   .. step:: Configure your private endpoint.
      
      a. Enter the following details about your |aws| |vpc|:

         .. list-table::
            :widths: 20 80

            * - :guilabel:`Your VPC ID`
              - Unique identifier of the peer |aws| |vpc|. Find this
                value on the |vpc| dashboard in your |aws| account.

            * - :guilabel:`Your Subnet IDs`
              - Unique identifiers of the subnets your |aws| |vpc| 
                uses. 
                
                Find these values on the :guilabel:`Subnet` dashboard 
                in your |aws| account.

                You must specify at least one subnet. If you don't, 
                |aws| won't provision an :term:`interface endpoint` in
                your |vpc|. An interface endpoint is required for 
                clients in your |vpc| to send traffic to the private 
                endpoint.

      #. Copy the command the dialog box displays and run it using 
         the |aws| CLI.

         .. note::
        
            You can't copy the command until |service| finishes 
            creating |vpc| resources in the background.

         See :aws:`Creating an Interface Endpoint 
         </vpc/latest/userguide/vpce-interface.html#create-interface-endpoint>` 
         to perform this task using the |aws| CLI.
            
      #. Click :guilabel:`Next`.
      
   .. step:: Finalize your private endpoint connection.
      
      a. Enter your :guilabel:`VPC Endpoint ID`. This is a 
         22-character alphanumeric string that identifies your private 
         endpoint. Find this value on the |aws| VPC Dashboard under 
         :guilabel:`Endpoints` > :guilabel:`VPC ID`.

      #. Click :guilabel:`Create`.
      
   .. step:: Configure your resources' security groups to send traffic to and receive traffic from the :term:`interface endpoint`.
      
      For each resource that needs to connect to your |service| clusters
      using {+aws-pl+}, the resource's security group must allow outbound 
      traffic to the :term:`interface endpoint's <interface endpoint>` 
      private IP addresses on all ports.
      
      See :aws:`Adding Rules to a Security Group </AWSEC2/latest/UserGuide/ec2-security-groups.html#adding-security-group-rule>`
      for more information.
      
   .. step:: Create a security group for your interface endpoint to allow resources to access it.
      
      This security group must allow inbound traffic on all ports from each 
      resource that needs to connect to your |service| clusters using 
      {+aws-pl+}:
      
      a. In the |aws| console, navigate to the :guilabel:`VPC Dashboard`. 
      
      #. Click :guilabel:`Security Groups`, then click 
         :guilabel:`Create security group`.
      
      #. Use the wizard to create a security group. Make sure you select 
         your VPC from the :guilabel:`VPC` list.
      
      #. Select the security group you just created, then click the 
         :guilabel:`Inbound Rules` tab.
      
      #. Click :guilabel:`Edit Rules`.
      
      #. Add rules to allow all inbound traffic from each resource in your
         VPC that you want to connect to your |service| cluster.
      
      #. Click :guilabel:`Save Rules`.
      
      #. Click :guilabel:`Endpoints`, then click the endpoint for your
         VPC.
      
      #. Click the :guilabel:`Security Groups` tab, then click 
         :guilabel:`Edit Security Groups`.
      
      #. Add the security group you just created, then click 
         :guilabel:`Save`.
      
      To learn more about :aws:`VPC security groups 
      </vpc/latest/userguide/VPC_SecurityGroups.html>`, see the |aws| 
      documentation.
      
   .. include:: /includes/nav/steps-network-access.rst
   
   .. step:: Verify that the private endpoint is available.
      
      You can connect to an |service| {+database-deployment+} using the 
      {+aws-pl+} private endpoint when all of the resources are configured
      and the private endpoint becomes available.
      
      To verify that the {+aws-pl+} private endpoint is available:
      
      On the :guilabel:`Private Endpoint` tab, select a 
      {+database-deployment+} type and verify the following 
      statuses for the region that contains the {+database-deployment+} 
      you want to connect to using {+aws-pl+}:
      
      .. list-table::
         :widths: 20 80
      
         * - :guilabel:`Atlas Endpoint Service Status`
           - Available
               
         * - :guilabel:`Endpoint Status`
           - Available
      
      To learn more about possible status values, see :ref:`pl-troubleshooting`.
      
      If you do not see these statuses, see :ref:`pl-troubleshooting` for
      additional information.      
