.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab and then the following tab for the resource.
      
      :guilabel:`Federated Database Instance / Online Archive` to manage the 
      private endpoint for your {+fdi+} or online archive. 
      
   .. step:: Click the following button to set up the private endpoint.
      
      Click :guilabel:`Connect existing endpoint` button.
       
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
      
         Click and expand :guilabel:`Show more instructions` in the dialog box 
         for a visual clue as to where you can find the necessary 
         information in the |aws| console.
         
      
   .. step:: Add a comment to associate with this endpoint.
      You can enter your subnet ID, |vpc| ID, |aws| region, and other 
      information to associate with this endpoint here.
      
   .. step:: Click :guilabel:`Confirm` to add the existing private endpoint.
