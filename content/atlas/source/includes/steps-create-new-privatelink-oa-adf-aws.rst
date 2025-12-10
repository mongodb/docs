.. procedure::
   :style: normal
   
   .. include:: /includes/nav/steps-network-access.rst
         
   .. step:: Click the :guilabel:`Private Endpoint` tab.
      
   .. step:: Click the :guilabel:`Federated Database Instance / Online Archive` button. 
      
   .. step:: Click the :guilabel:`Add Private Endpoint` button.
            
   .. step:: Choose a cloud provider and region.

      a. Click the :guilabel:`AWS` button.

      #. Click :guilabel:`Next`.
      
      #. From the :guilabel:`Choose a region` list, select the region where you 
         want to create the private endpoint.
      
         You can select one of the following regions:
      
         .. include:: /includes/list-table-adf-supported-aws-regions.rst
         
         To learn more, see :ref:`Atlas Data Federation Regions 
         <atlas-data-federation-regions>`.
      
      #. Click :guilabel:`Next`.
      
      .. note::
      
         If your organization has no payment information stored, |service| 
         prompts you to add it before continuing.
      
   .. step:: Configure your private endpoint.
      
      .. include:: /includes/admonitions/tips/tip-show-instructions-button.rst
      
      a. Enter the your |aws| |vpc| details:

         .. include:: /includes/fact-avoid-connection-interruptions.rst
      
         .. list-table::
            :widths: 20 80
      
            * - :guilabel:`VPC ID`
              - Unique, 22-character alphanumeric string identifier of the peer |aws|
                Virtual Private Cloud (|vpc|). Find this value on the |vpc| dashboard in
                your |aws| account.
      
            * - :guilabel:`Subnet IDs`
              - Unique identifiers of the subnets your |aws| |vpc| uses. 
                Find these values on the :guilabel:`Subnet` dashboard in 
                your |aws| account.

                :gold:`IMPORTANT:` You must specify at least one subnet. If you don't, 
                |aws| won't provision an :term:`interface endpoint` in
                your |vpc|. An interface endpoint is required for 
                clients in your |vpc| to send traffic to the private 
                endpoint.
      
      #. Click the :guilabel:`Next` button.

         The |service| UI displays a dialog box with a command with the new endpint's details.

      #. Copy the command the in the dialog box and run it using the |aws| 
         CLI.

         AWS creates the new endpoint for your |vpc|. 
      
         Alternatively, you can create the private endpoint using the
         |aws| console: 
      
         #. Enter your :guilabel:`VPC Endpoint ID` that identifies your private endpoint. Find 
            this value on the |aws| |vpc| Dashboard under :guilabel:`Endpoints` 
            > :guilabel:`VPC ID`.
         
         #. Enter your :guilabel:`DNS Name` associated with your private
            endpoint on |aws| in the :guilabel:`Your VPC Endpoint DNS Name`
            field. 
            
            If you have multiple DNS names for your private endpoint, copy and
            paste the first name from your list. To learn more, see
            :aws:`Manage DNS names for VPC endpoint services
            </vpc/latest/privatelink/manage-dns-names.html>`. 

            See :aws:`create-vpc-endpoint
            </cli/latest/reference/ec2/create-vpc-endpoint.html>` in the AWS documentation
            for more details on creating |vpc| endpoints through the AWS interface.
         
         #. If required, modify the private |dns| name to ensure that the hostname resolves to an address on your network.
      
   .. step:: Click the :guilabel:`Finish` button.