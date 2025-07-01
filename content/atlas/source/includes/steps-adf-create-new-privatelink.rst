.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab.

   .. step:: Click the :guilabel:`Federated Database Instance / Online Archive` tab.   
      
   .. step:: Click the :guilabel:`Create New Endpoint` button.

   .. step:: Choose a cloud provider and region.
      
      a. Click the :guilabel:`AWS` button.

      #. From the dropdown, select the region where you 
         want to create the private endpoint.
      
         You can select one of the following regions: 
      
         .. include:: /includes/list-table-adf-supported-aws-regions.rst
      
         The following table shows the service names for the various 
         endpoints in each region: 
         
         .. include:: /includes/fact-adf-pvtlink-service-names.rst
      
         To learn more, see :ref:`atlas-data-federation-regions`.
      
      #. Click :guilabel:`Next`.
      
   .. step:: Configure your private endpoint.

      .. include:: /includes/fact-avoid-connection-interruptions.rst

      a. Enter the following details about your |aws| |vpc|:
      
         .. tip:: 
      
            You can click :guilabel:`Show instruction` for the following
            settings to display a screenshot of the |aws| console where you
            can find the value for the setting. 
      
         .. list-table::
            :widths: 20 80
      
            * - :guilabel:`Your VPC ID`
              - Unique 22-character alphanumeric string that identifies 
                the peer |aws| |vpc|. Find this value on the |vpc| 
                dashboard in your |aws| account.
      
            * - :guilabel:`Your Subnet IDs`
              - Unique strings that identify the subnets that your |aws| 
                |vpc| uses. Find these values on the :guilabel:`Subnet` 
                dashboard in your |aws| account.
      
                :gold:`IMPORTANT:` You must specify at least one subnet. If you don't, 
                |aws| won't provision an :term:`interface endpoint` in
                your |vpc|. An interface endpoint is required for 
                clients in your |vpc| to send traffic to the private 
                endpoint.
      
      #. Copy the command the dialog box displays and run it using the |aws| 
         CLI.
      
         .. note::
            
            If you skip this step, the interface endpoint for the 
            Private Endpoint service isn't created.
            
            You can't copy the command until |service| finishes 
            creating |vpc| resources in the background.
      
         See :aws:`Creating an Interface Endpoint </vpc/latest/userguide/vpce-interface.html#create-interface-endpoint>` 
         to perform this task using the |aws| CLI.
      
      #. Enter the 22-character alphanumeric string that identifies your 
         private endpoint in the :guilabel:`VPC Endpoint ID` field. Find 
         this value on the |aws| VPC Dashboard under 
         :guilabel:`Endpoints` > :guilabel:`VPC ID`.
      
      #. Enter the alpha-numeric DNS hostname associated with your private
         endpoint on |aws| in the :guilabel:`Your VPC Endpoint DNS Name`
         field. 
      
         If you have multiple DNS names for your private endpoint, copy and
         paste the first name from your list. To learn more, see
         :aws:`Manage DNS names for VPC endpoint services
         </vpc/latest/privatelink/manage-dns-names.html>`. 
            
   .. step:: Modify the private |dns| name to ensure that the hostname resolves to an address on your network.

      To ensure that the hostname resolves to an address on your network:
      
      a. Copy the command the dialog box displays and run it using the |aws| 
         CLI.
      #. **Optional**. Add a comment to associate with this endpoint.
      
   .. step:: Click :guilabel:`Finish endpoint creation`.
      
   .. step:: Configure your resources' security groups to send traffic to and receive traffic from the :term:`interface endpoint`.
      
      For each resource that needs to connect to your {+fdi+} using 
      {+aws-pl+}, the resource's security group must allow outbound 
      traffic to the :term:`interface endpoint's <interface endpoint>` 
      private IP addresses on port 27017.
      
      See :aws:`Adding Rules to a Security Group </AWSEC2/latest/UserGuide/ec2-security-groups.html#adding-security-group-rule>`
      for more information.
      
   .. step:: Create a security group for your interface endpoint to allow resources to access it.
      
      This security group must allow inbound traffic on port 27017 from each 
      resource that needs to connect to your {+fdi+} using {+aws-pl+}:
      
      a. In the |aws| console, navigate to the :guilabel:`VPC Dashboard`. 
      
      #. Click :guilabel:`Security Groups`, then click 
         :guilabel:`Create security group`.
      
      #. Use the wizard to create a security group. Make sure you select 
         your VPC from the :guilabel:`VPC` list.
      
      #. Select the security group you just created, then click the 
         :guilabel:`Inbound Rules` tab.
      
      #. Click :guilabel:`Edit Rules`.
      
      #. Add rules to allow all inbound traffic from each resource in your
         VPC that you want to connect to your {+fdi+}.
      
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
      
