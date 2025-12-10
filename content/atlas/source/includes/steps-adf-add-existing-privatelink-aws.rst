.. procedure::
   :style: normal      

   .. include:: /includes/nav/steps-network-access.rst
         
   .. step:: Click the :guilabel:`Private Endpoint` tab. 
      
   .. step:: Click the :guilabel:`Federated Database Instance / Online Archive` tab. 
      
   .. step:: Click the :guilabel:`Connect existing endpoint` button.

   .. step:: Select |aws| as cloud provider.
         
   .. step:: Enter your |aws| |vpc| details:
      
      .. list-table::
         :widths: 20 80

         * - :guilabel:`Region`
           - Region where your endpoint is located. 

         * - :guilabel:`VPC ID`
           - Unique, 22-character alphanumeric string identifier of the peer |aws| Virtual
             Private Cloud (|vpc|). Find this value on the |vpc| dashboard in your |aws|
             account.

         * - :guilabel:`Comment`
           - Optional comment to associate with this endpoint, such as subnet ID, |vpc| ID,
             |aws| region, or other useful information.

         * - :guilabel:`DNS Hostname`
           - Enter the alpha-numeric DNS hostname associated with your private endpoint on
             |aws| in the :guilabel:`Your VPC Endpoint DNS Name` field. 
         
             If you have multiple DNS names for your private endpoint, copy and paste the
             first name from your list. To learn more, see :aws:`Manage DNS names for VPC
             endpoint services </vpc/latest/privatelink/manage-dns-names.html>`. 
         
      .. tip:: 
         
         Click and expand :guilabel:`Show more instructions` in the dialog box 
         for a visual clue as to where you can find the necessary 
         information in the |aws| console.
         
      
   .. step:: Add a comment to associate with this endpoint. 
      
      You can enter your subnet ID, |vpc| ID, |aws| region, and other information to associate with this endpoint here.
      
   .. step:: Click :guilabel:`Confirm` to add the existing private endpoint.
