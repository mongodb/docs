.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab and then the following tab.
      
      Click :guilabel:`Federated Database Instance / Online Archive` for
      a private endpoint for your {+fdi+} or online archive. 
      
   .. step:: Click the :guilabel:`Connect Existing Endpoint` button.
      
   .. step:: Choose a cloud provider and region.

      a. Click the |aws| button.
      
      #. From the :guilabel:`Choose a region` list, select the region where you 
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

   .. step:: Enter your VPC endpoint ID and DNS name.
      
      a. Enter the 22-character alphanumeric string that identifies your 
         private endpoint in the :guilabel:`Your VPC Endpoint ID` field.
      
      #. Enter the alpha-numeric DNS hostname associated with your private
         endpoint on |aws| in the :guilabel:`Your VPC Endpoint DNS Name`
         field. 
         If you have multiple DNS names for your private endpoint, copy and
         paste the first name from your list. To learn more, see
         :aws:`Manage DNS names for VPC endpoint services
         </vpc/latest/privatelink/manage-dns-names.html>`. 
      
      .. tip:: 
      
         Click and expand :guilabel:`Show instruction` in the dialog box 
         for a visual clue as to where you can find the necessary 
         information in the |aws| console.
      
   .. step:: Add a comment to associate with this endpoint.
      You can enter your subnet ID, |vpc| ID, |aws| region, and other 
      information to associate with this endpoint.
      
   .. step:: Click :guilabel:`Confirm` to add the existing private endpoint.
