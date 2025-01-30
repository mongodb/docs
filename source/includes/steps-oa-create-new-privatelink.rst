.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab and then the following tab.
      
      Click :guilabel:`Federated Database Instance / Online Archive` for
      a private endpoint for your {+fdi+} or online archive. 
      
   .. step:: Click the button to set up the private endpoint.
      
      Click :guilabel:`Create New Endpoint` button.
      
   .. step:: Choose an |aws| region.
      
      a. From the :guilabel:`AWS Region` list, select the region where you 
         want to create the private endpoint.
      
         You can select one of the following regions:
      
         .. list-table::
            :widths: 75 25
            :header-rows: 1
      
            * - {+adf+} Regions
              - |aws| Regions
      
            * - Northern Virginia, North America
              - us-east-1
      
            * - Oregon, North America
              - us-west-2
      
            * - Ireland, Europe
              - eu-west-1
      
            * - London, Europe
              - eu-west-2
      
            * - Frankfurt, Europe
              - eu-central-1
      
            * - Tokyo, Japan
              - ap-northeast-1
      
            * - Mumbai, Asia
              - ap-south-1
      
            * - Sydney, Australia
              - ap-southeast-2
      
            * - Montreal, Canada
              - ca-central-1
      
         To learn more, see :ref:`Atlas Data Federation Regions 
         <atlas-data-federation-regions>`.
      
      #. Click :guilabel:`Next`.
      
      .. note::
      
         If your organization has no payment information stored, |service| 
         prompts you to add it before continuing.
      
   .. step:: Configure your private endpoint.
      
      .. tip:: 
      
         Click and expand :guilabel:`Show instruction` for a screenshot of 
         the |aws| console where you can find the necessary information for
         the following settings.
      
      a. Enter the following details about your |aws| |vpc|:

         .. include:: /includes/fact-avoid-connection-interruptions.rst
      
         .. list-table::
            :widths: 20 80
      
            * - :guilabel:`Your VPC ID`
              - Unique identifier of the peer |aws| |vpc|. Find this value 
                on the |vpc| dashboard in your |aws| account.
      
            * - :guilabel:`Your Subnet IDs`
              - Unique identifiers of the subnets your |aws| |vpc| uses. 
                Find these values on the :guilabel:`Subnet` dashboard in 
                your |aws| account.
      
                :gold:`IMPORTANT:` You must specify at least one subnet. If you don't, 
                |aws| won't provision an :term:`interface endpoint` in
                your |vpc|. An interface endpoint is required for 
                clients in your |vpc| to send traffic to the private 
                endpoint.
      
      #. Copy the command the dialog box displays and run it using the |aws| 
         CLI.
      
         See :aws:`Creating an Interface Endpoint </vpc/latest/userguide/vpce-interface.html#create-interface-endpoint>` 
         to perform this task using the |aws| CLI.
      
      #. Enter your :guilabel:`VPC Endpoint ID`. This is a 22-character 
         alphanumeric string that identifies your private endpoint. Find 
         this value on the |aws| VPC Dashboard under :guilabel:`Endpoints` 
         > :guilabel:`VPC ID`.
      
      #. Enter the alpha-numeric DNS hostname associated with your private
         endpoint on |aws| in the :guilabel:`Your VPC Endpoint DNS Name`
         field. 
         If you have multiple DNS names for your private endpoint, copy and
         paste the first name from your list. To learn more, see
         :aws:`Manage DNS names for VPC endpoint services
         </vpc/latest/privatelink/manage-dns-names.html>`. 
      
      
   .. step:: Run the command to create your |vpc| interface endpoint.

      Copy the command the dialog box displays and run it using the 
      |aws| CLI.
      
   .. step:: Modify the private |dns| name to ensure that the hostname resolves to an address on your network.

      To ensure that the hostname resolves to an address on your network:
      
      a. Copy the command the dialog box displays and run it using the 
         |aws| CLI.
      #. **Optional**. Add a comment to associate with this endpoint.
      
   .. step:: Click :guilabel:`Finish endpoint creation`.
