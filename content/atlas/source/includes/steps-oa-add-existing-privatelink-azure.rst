.. procedure::
   :style: normal
     
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab.

   .. step:: Click the :guilabel:`Federated Database Instance / Online Archive` tab.   
      
   .. step:: Click :guilabel:`Connect Existing Endpoint`.    
      
   .. step:: Enter your endpoint details.
      
      a. Click the :guilabel:`Azure` button.

      #. From the dropdown, select the region where you 
         want to create the private endpoint.
      
         You can select one of the following regions: 
      
         .. include:: /includes/list-table-adf-supported-azure-regions.rst
      
         To learn more, see :ref:`atlas-data-federation-regions`.

      #. Enter the 22-character alphanumeric string that identifies your private endpoint 
         in the :guilabel:`Your Private Endpoint ID` field. Find this value in your |azure| account.

         .. tip:: 
      
            You can click :guilabel:`Show instruction` in the {+atlas-ui+} for 
            the following settings to display a screenshot of the |azure| Dashboard 
            where you can find the value for the setting. 

      #. Add a comment to associate with this endpoint. You can enter your subnet ID, 
         VNet, |azure| region, and other information to associate with this endpoint.

      #. Enter the private IP address for your endpoint in the :guilabel:`Your Endpoint Private IP Address` 
         field. Find this value in your |azure| account.

      #. Click :guilabel:`Confirm` to add the existing private endpoint.
      