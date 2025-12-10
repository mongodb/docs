.. procedure::
   :style: normal
     
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab.

   .. step:: Click the :guilabel:`Federated Database Instance / Online Archive` tab.   
      
   .. step:: Click the :guilabel:`Connect Existing Endpoint` button.    

   .. step:: Select |azure| as cloud provider.   
   
   .. step:: Enter your |azure| endpoint details:

      .. list-table::
         :widths: 20 80

         * - :guilabel:`Region`
           - Region where your endpoint is located. 

         * - :guilabel:`Private Endpoint ID`
           - Unique alphanumeric string identifier of the |azure| Endpoint. Find this
             value on the |azure| Private Endpoints dashboard in your |azure| account.

         * - :guilabel:`Comment`
           - Optional comment to associate with this endpoint, such as subnet ID, |vpc| ID,
             |azure| region, or other useful information.

         * - :guilabel:`Endpoint Private IP Address`
           - You Private IP Address can be found in the Azure Private Endpoints Dashboard.

      .. include:: /includes/admonitions/tips/tip-show-instructions-button.rst 


   .. step:: Click the :guilabel:`Confirm` button to add the existing private endpoint.





   
      